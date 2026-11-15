import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { STARTED_FIELD, TRAP_FIELD, checkSubmission } from "@/lib/contact-guard";
import { confirmationMail, enquiryMail, type Enquiry } from "@/lib/contact-mail";

// Recent enquiries per sender, for the rate limit. Lives as long as the server instance.
const recentSenders = new Map<string, number[]>();

// Force Node.js runtime (required for nodemailer)
export const runtime = 'nodejs';
export const maxDuration = 60;

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle OPTIONS request
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const projectType = formData.get("projectType")?.toString().trim() || "";
    const budget = formData.get("budget")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";
    const pubName = formData.get("pubName")?.toString().trim() || "";
    const website = formData.get("website")?.toString().trim() || "";
    const isPubInquiry = formData.get("inquiryType") === "irish-pub-website";
    const german = formData.get("locale") === "de";
    if (isPubInquiry && (pubName.length > 120 || website.length > 500 || name.length > 120 || email.length > 254 || message.length > 5000 || /[\r\n]/.test(email))) {
      return NextResponse.json({ error: "Invalid enquiry" }, { status: 400, headers: corsHeaders });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400, headers: corsHeaders }
      );
    }

    // General length limits, so no field can carry a flood of text.
    if (name.length > 120 || email.length > 254 || projectType.length > 200 || budget.length > 100 || message.length > 6000 || /[\r\n]/.test(email)) {
      return NextResponse.json({ error: "Invalid enquiry" }, { status: 400, headers: corsHeaders });
    }

    // Spam protection on our own server (src/lib/contact-guard.ts), no outside service.
    const guard = checkSubmission(
      {
        trap: formData.get(TRAP_FIELD)?.toString() || "",
        startedAt: formData.get(STARTED_FIELD)?.toString() || "",
        sender: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || email.toLowerCase(),
        now: Date.now(),
      },
      recentSenders,
    );
    if (!guard.ok) {
      // A bot that filled the hidden field gets a normal answer, so it does not try again.
      if (guard.code === "SPAM") return NextResponse.json({ message: "OK" }, { status: 200, headers: corsHeaders });
      console.error("Contact form rejected", { code: guard.code });
      return NextResponse.json({ error: "Please try again in a moment.", code: guard.code }, { status: 429, headers: corsHeaders });
    }

    // === Send Emails with nodemailer ===
    const transporter = nodemailer.createTransport({
      host: "smtp.strato.de",
      port: 587,
      secure: false,
      requireTLS: true,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: {
        user: "noreply@well-edge-creative.com",
        pass: "FiuPP_3#MJ*xYwX",
      },
    });

    const enquiry: Enquiry = { name, email, topic: projectType, budget, message, pubName, website, isPub: isPubInquiry, german };
    const toJan = enquiryMail(enquiry);
    const toSender = confirmationMail(enquiry);
    const adminMailOptions = { from: "Well Edge Creative <noreply@well-edge-creative.com>", to: "jan@welledgecreative.com", replyTo: email, ...toJan };
    const clientMailOptions = { from: "Jan Brunnenkant <noreply@well-edge-creative.com>", to: email, replyTo: "jan@welledgecreative.com", ...toSender };

    if (isPubInquiry) {
      const delivery = await transporter.sendMail(adminMailOptions);
      if (!delivery.accepted?.length) throw new Error("Enquiry recipient rejected");
      let confirmationSent = true;
      try {
        const confirmation = await transporter.sendMail(clientMailOptions);
        if (!confirmation.accepted?.length) throw new Error("Confirmation recipient rejected");
      } catch {
        confirmationSent = false;
        console.error("Pub enquiry received, confirmation delivery failed");
      }
      return NextResponse.json({ message: "OK", confirmationSent }, { status: 200, headers: corsHeaders });
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return NextResponse.json({ message: "OK" }, { status: 200, headers: corsHeaders });
  } catch (error) {
    const mailError = error as { code?: string; responseCode?: number; command?: string };
    console.error("Contact form delivery failed", { code: mailError.code, responseCode: mailError.responseCode, command: mailError.command });
    return NextResponse.json(
      { error: "Failed to send email", code: "DELIVERY_FAILED" },
      { status: 500, headers: corsHeaders }
    );
  }
}
