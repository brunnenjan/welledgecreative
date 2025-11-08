import { NextRequest, NextResponse } from "next/server";

type ContactFormData = {
  name: string;
  email: string;
  projectType: string[];
  budget: string;
  message: string;
  recaptchaToken?: string;
};

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      if (!data.recaptchaToken) {
        return NextResponse.json(
          { error: "reCAPTCHA token missing" },
          { status: 400 }
        );
      }

      const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: data.recaptchaToken,
        }),
      });

      const recaptchaResult = (await recaptchaResponse.json()) as {
        success: boolean;
        score?: number;
        "error-codes"?: string[];
      };

      if (
        !recaptchaResult.success ||
        (typeof recaptchaResult.score === "number" && recaptchaResult.score < 0.5)
      ) {
        return NextResponse.json(
          { error: "Failed security verification" },
          { status: 400 }
        );
      }
    }

    const emailTo = process.env.EMAIL_TO ?? "info@well-edge-creative.com";
    const emailFrom =
      process.env.EMAIL_FROM ?? "Well Edge Creative <onboarding@resend.dev>";
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom,
          to: emailTo,
          reply_to: data.email,
          subject: `New enquiry from ${data.name}`,
          html: `
            <h2>New contact form submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Services:</strong> ${
              data.projectType.length ? data.projectType.join(", ") : "Not specified"
            }</p>
            <p><strong>Budget:</strong> ${data.budget || "Not specified"}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/gu, "<br />")}</p>
            <hr />
            <p>Submitted on ${new Date().toLocaleString()}</p>
          `,
        }),
      });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.text();
      console.error("Resend email error:", emailResponse.status, errorBody);
      return NextResponse.json(
        { error: "Failed to deliver email" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
