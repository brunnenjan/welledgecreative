"use client";

import { useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import Link from "next/link";
import { useI18n } from "@/components/providers/I18nProvider";
import styles from "./pub-websites.module.css";

const SITE_KEY = "6LfO5_wrAAAAABZZztKHdyxOpMYuJjayfy08yw_t";

export default function PubInquiryForm() {
  const { t, locale } = useI18n();
  const text = (key: string) => t(`pubWebsitesPage.form.${key}`);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "confirmationFailed" | "error">("idle");
  const submitting = useRef(false);
  const complete = status === "success" || status === "confirmationFailed";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || complete) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    submitting.current = true;
    setStatus("sending");
    try {
      if (!window.grecaptcha?.enterprise) throw new Error("Captcha unavailable");
      const token = await window.grecaptcha.enterprise.execute(SITE_KEY, { action: "submit" });
      if (!token) throw new Error("Captcha unavailable");
      data.set("inquiryType", "irish-pub-website");
      data.set("locale", locale);
      data.set("g-recaptcha-response", token);
      const response = await fetch("/api/contact", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok || result.message !== "OK") throw new Error("Send failed");
      setStatus(result.confirmationSent === false ? "confirmationFailed" : "success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  return <>
    <Script src={`https://www.google.com/recaptcha/enterprise.js?render=${SITE_KEY}`} strategy="afterInteractive" onReady={() => setReady(true)} onError={() => setStatus("error")} />
    <p className={styles.formIntro}>{text("intro")}</p>
    <form onSubmit={submit} className={styles.inquiryForm}>
      <fieldset disabled={status === "sending" || complete}>
        <div className={styles.formRow}>
          <label htmlFor="pub-inquiry-name">{text("name")}<input id="pub-inquiry-name" name="name" autoComplete="name" required maxLength={120} /></label>
          <label htmlFor="pub-inquiry-email">{text("email")}<input id="pub-inquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        </div>
        <label htmlFor="pub-inquiry-message">{text("message")}<textarea id="pub-inquiry-message" name="message" rows={4} required maxLength={5000} placeholder={text("placeholder")} /></label>
      </fieldset>
      <p className={styles.small}>{text("privacy")} <Link href={`/${locale}/privacy`} target="_blank" rel="noopener noreferrer">{text("privacyLink")}</Link></p>
      <p className={styles.small}>{text("captcha")} <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{text("captchaPrivacy")}</a> · <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">{text("captchaTerms")}</a></p>
      <button type="submit" className="btn btn-primary" disabled={!ready || status === "sending" || complete}>{status === "sending" ? text("sending") : text("submit")}</button>
      <div role="status" aria-live="polite">{status !== "idle" && <p className={`${styles.formStatus} ${complete ? styles.formSuccess : ""}`}>{text(status)}</p>}</div>
    </form>
  </>;
}
