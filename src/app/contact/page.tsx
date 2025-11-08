"use client";

import { useState } from "react";
import Script from "next/script";

type Segment = "retreat" | "startup" | "smb";
const RECAPTCHA_SITE_KEY = "6LfO5_wrAAAAABZZztKHdyxOpMYuJjayfy08yw_t";

interface ReCaptchaEnterprise {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: {
      enterprise: ReCaptchaEnterprise;
    } & any;
  }
}

export default function Contact() {
  const [segment, setSegment] = useState<Segment>("retreat");
  const [form, setForm] = useState({ name:"", email:"", website:"", budget:"", timeline:"", goals:"", extra:"" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Wait for reCAPTCHA to be ready
      if (!window.grecaptcha?.enterprise) {
        console.error("reCAPTCHA not loaded yet");
        setMessage({ type: "error", text: "reCAPTCHA lädt noch. Bitte warten Sie einen Moment und versuchen Sie es erneut." });
        setIsSubmitting(false);
        return;
      }

      // Get reCAPTCHA token
      console.log("Getting reCAPTCHA token...");
      const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action: "submit" });
      console.log("Token received:", token ? "✓" : "✗");

      if (!token) {
        throw new Error("Failed to get reCAPTCHA token");
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("website", form.website);
      formData.append("segment", segment);
      formData.append("budget", form.budget);
      formData.append("timeline", form.timeline);
      formData.append("goals", form.goals);
      formData.append("extra", form.extra);
      formData.append("g-recaptcha-response", token);

      console.log("Sending form data to /contact.php...");

      // Send to backend
      const response = await fetch("/contact.php", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (response.ok) {
        setMessage({ type: "success", text: "Nachricht erfolgreich gesendet!" });
        setForm({ name:"", email:"", website:"", budget:"", timeline:"", goals:"", extra:"" });
      } else {
        setMessage({ type: "error", text: `Fehler: ${responseText}` });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />

      <div className="bg-white text-black">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Ready to talk</h1>
          <p className="mt-3 text-black/70">Free 20-minute intro call. I&apos;ll map your next steps.</p>

          {message && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={submit} className="mt-8 grid gap-5">
            <fieldset className="grid gap-3">
              <legend className="text-sm font-bold tracking-wider" style={{ color:"var(--accent)" }}>Project type</legend>
              <div className="flex flex-wrap gap-3">
                {(["retreat","startup","smb"] as Segment[]).map((s) => (
                  <label key={s} className={`cursor-pointer rounded-full border px-4 py-2 ${segment===s?"bg-black text-white border-black":"border-black/20"}`}>
                    <input type="radio" name="segment" value={s} checked={segment===s} onChange={() => setSegment(s)} className="hidden" />
                    {s==="retreat" ? "Retreat Center" : s.toUpperCase()}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-lg border border-black/20 p-3" placeholder="Name" required value={form.name} onChange={update("name")} disabled={isSubmitting} />
              <input className="rounded-lg border border-black/20 p-3" placeholder="Email" type="email" required value={form.email} onChange={update("email")} disabled={isSubmitting} />
            </div>

            <input className="rounded-lg border border-black/20 p-3" placeholder="Website (if any)" value={form.website} onChange={update("website")} disabled={isSubmitting} />
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-lg border border-black/20 p-3" placeholder="Budget (range)" value={form.budget} onChange={update("budget")} disabled={isSubmitting} />
              <input className="rounded-lg border border-black/20 p-3" placeholder="Timeline (e.g. 6–8 weeks)" value={form.timeline} onChange={update("timeline")} disabled={isSubmitting} />
            </div>
            <textarea className="rounded-lg border border-black/20 p-3" rows={5} placeholder="Goals / What would success look like?" value={form.goals} onChange={update("goals")} disabled={isSubmitting} />
            <textarea className="rounded-lg border border-black/20 p-3" rows={3} placeholder="Anything else I should know?" value={form.extra} onChange={update("extra")} disabled={isSubmitting} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-block px-5 py-3 text-black font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background:"var(--accent)" }}
            >
              {isSubmitting ? "Wird gesendet..." : "Send"}
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
