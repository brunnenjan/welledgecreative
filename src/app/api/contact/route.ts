import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    const captchaToken = formData.get("g-recaptcha-response")?.toString() || "";

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

    // Validate reCAPTCHA token
    if (!captchaToken) {
      return NextResponse.json(
        { error: "No reCAPTCHA token found", code: "CAPTCHA_FAILED" },
        { status: 400, headers: corsHeaders }
      );
    }

    // === reCAPTCHA Enterprise Verification ===
    const recaptchaSiteKey = "6LfO5_wrAAAAABZZztKHdyxOpMYuJjayfy08yw_t";
    const recaptchaApiKey = "AIzaSyDQrkFXCJAK2Z623a-_Z8UOrEJmWjlB9M4";
    const recaptchaProjectId = "welledgecreative-1761883050337";

    const recaptchaData = {
      event: {
        token: captchaToken,
        expectedAction: "submit",
        siteKey: recaptchaSiteKey,
      },
    };

    const recaptchaUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${recaptchaProjectId}/assessments?key=${recaptchaApiKey}`;

    let recaptchaResult;
    try {
      const recaptchaResponse = await fetch(recaptchaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recaptchaData),
        signal: AbortSignal.timeout(10000),
      });
      if (!recaptchaResponse.ok) throw new Error("Assessment unavailable");
      recaptchaResult = await recaptchaResponse.json();
    } catch {
      console.error("reCAPTCHA assessment service unavailable");
      return NextResponse.json(
        { error: "Security service unavailable", code: "CAPTCHA_UNAVAILABLE" },
        { status: 503, headers: corsHeaders }
      );
    }

    // Check if token is valid
    if (!recaptchaResult.tokenProperties?.valid || recaptchaResult.tokenProperties?.action !== "submit") {
      console.error("Contact security verification rejected", { code: "CAPTCHA_INVALID_TOKEN", reason: recaptchaResult.tokenProperties?.invalidReason, actionMismatch: recaptchaResult.tokenProperties?.action !== "submit" });
      return NextResponse.json(
        { error: "Captcha verification failed", code: recaptchaResult.tokenProperties?.invalidReason === "BROWSER_ERROR" ? "CAPTCHA_BROWSER_ERROR" : "CAPTCHA_FAILED" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check score
    const score = recaptchaResult.riskAnalysis?.score || 0;
    if (score < 0.3) {
      console.error("Contact security verification rejected", { code: "CAPTCHA_LOW_SCORE", score });
      return NextResponse.json(
        { error: "Security check failed. Please try again.", code: "CAPTCHA_FAILED" },
        { status: 400, headers: corsHeaders }
      );
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

    // 1) Email to admin
    const adminMailOptions = {
      from: "noreply@well-edge-creative.com",
      to: "jan@well-edge-creative.de",
      replyTo: email,
      subject: "New Contact Form - Well Edge Creative",
      text: `New contact form submission:

Name: ${name}
Email: ${email}
Project Type: ${projectType || "Not specified"}
Budget Range: ${budget || "Not specified"}

Message:
${message}

---
Sent from: well-edge-creative.com
reCAPTCHA Score: ${score}`,
    };

    // 2) Confirmation email to client
    const clientMailOptions = {
      from: "Jan Brunnenkant <noreply@well-edge-creative.com>",
      to: email,
      replyTo: "jan@well-edge-creative.de",
      subject: "Thank you for reaching out - Well Edge Creative",
      text: `Hi ${name},

Thank you for reaching out! I received your message and will get back to you within 24 hours.

Here's a summary of what you sent:

Project Type: ${projectType || "Not specified"}
Budget Range: ${budget || "Not specified"}

Your Message:
${message}

---

Looking forward to discussing your project!

Best regards,
Jan Brunnenkant
Well Edge Creative
https://well-edge-creative.com`,
    };

    if (isPubInquiry) {
      const pubDetails = [pubName && `Pub: ${pubName}`, website && `Website: ${website}`].filter(Boolean).join("\n");
      adminMailOptions.subject = "Irish Pub Website: neue Anfrage";
      adminMailOptions.text = `Irish Pub Website Anfrage\n\nName: ${name}\nE-Mail: ${email}\n${pubDetails ? `\n${pubDetails}\n` : ""}\nNachricht:\n${message}`;
      clientMailOptions.subject = german ? "Deine Anfrage zur Irish Pub Website" : "Your Irish Pub website enquiry";
      clientMailOptions.text = german
        ? `Hallo ${name},\n\nvielen Dank für deine Anfrage zur Irish Pub Website. Deine Nachricht ist bei mir angekommen. Ich melde mich persönlich bei dir.\n\n${pubDetails ? `${pubDetails}\n\n` : ""}Deine Nachricht:\n${message}\n\nViele Grüße\nJan Brunnenkant\nWell Edge Creative\njan@well-edge-creative.de`
        : `Hi ${name},\n\nThank you for your Irish Pub website enquiry. I have received your message and will get back to you personally.\n\n${pubDetails ? `${pubDetails}\n\n` : ""}Your message:\n${message}\n\nBest regards,\nJan Brunnenkant\nWell Edge Creative\njan@well-edge-creative.de`;
      const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
      // Keep the plain-text alternative and escape every visitor-supplied value.
      const paragraphs = clientMailOptions.text.split("\n\n").map(paragraph => `<p style="margin:0 0 20px;line-height:1.65;overflow-wrap:anywhere">${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`).join("");
      Object.assign(clientMailOptions, { html: `<!doctype html><html lang="${german ? "de" : "en"}"><body style="margin:0;background:#f5f5f5;color:#171717;font-family:Arial,Helvetica,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #e5e5e5;border-top:5px solid #f58222;border-radius:12px"><tr><td style="padding:32px 24px"><p style="margin:0 0 28px;font-size:14px;font-weight:bold;letter-spacing:1px">WELL EDGE CREATIVE</p><h1 style="margin:0 0 24px;font-size:24px;line-height:1.3">${escapeHtml(clientMailOptions.subject)}</h1>${paragraphs}</td></tr></table></td></tr></table></body></html>` });
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
