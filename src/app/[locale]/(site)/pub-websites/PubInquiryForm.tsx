"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { postContact } from "@/lib/contact-client";
import ContactTrap from "@/components/ContactTrap";
import Link from "next/link";
import { useI18n } from "@/components/providers/I18nProvider";
import styles from "./pub-websites.module.css";


export default function PubInquiryForm() {
  const { t, locale } = useI18n();
  const text = (key: string) => t(`pubWebsitesPage.form.${key}`);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "confirmationFailed" | "error" | "serverError" | "networkError">("idle");
  const submitting = useRef(false);
  const startedAt = useRef(0);
  const complete = status === "success" || status === "confirmationFailed";

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || complete) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    submitting.current = true;
    setStatus("sending");
    try {
      data.set("inquiryType", "irish-pub-website");
      data.set("locale", locale);
      const { response, result, ok } = await postContact(data, startedAt.current);
      if (!ok) {
        setStatus(response.status >= 500 ? "serverError" : "error");
        return;
      }
      setStatus(result?.confirmationSent === false ? "confirmationFailed" : "success");
      form.reset();
    } catch (error) {
      console.error("Pub enquiry failed", error);
      setStatus("networkError");
    } finally {
      submitting.current = false;
    }
  }

  return <>
    <p className={styles.formIntro}>{text("intro")}</p>
    <form onSubmit={submit} className={styles.inquiryForm} aria-busy={status === "sending"}>
      <ContactTrap />
      <fieldset disabled={status === "sending" || complete}>
        <div className={styles.formRow}>
          <label htmlFor="pub-inquiry-name">{text("name")}<input id="pub-inquiry-name" name="name" autoComplete="name" required maxLength={120} /></label>
          <label htmlFor="pub-inquiry-email">{text("email")}<input id="pub-inquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        </div>
        <div className={styles.formRow}>
          <label htmlFor="pub-inquiry-pub">{text("pubName")}<input id="pub-inquiry-pub" name="pubName" autoComplete="organization" maxLength={120} /></label>
          <label htmlFor="pub-inquiry-website">{text("website")}<input id="pub-inquiry-website" name="website" type="text" inputMode="url" autoComplete="url" maxLength={500} placeholder="www.example.com" /></label>
        </div>
        <label htmlFor="pub-inquiry-message">{text("message")}<textarea id="pub-inquiry-message" name="message" rows={4} required maxLength={5000} placeholder={text("placeholder")} /></label>
      </fieldset>
      <p className={styles.small}>{text("privacy")} <Link href={`/${locale}/privacy`} target="_blank" rel="noopener noreferrer">{text("privacyLink")}</Link></p>
      <button type="submit" className="btn btn-primary" disabled={status === "sending" || complete}>{status === "sending" ? text("sending") : text("submit")}</button>
      <div role="status" aria-live="polite" aria-atomic="true">{status !== "idle" && <p className={`${styles.formStatus} ${complete ? styles.formSuccess : ""}`}>{text(status)}</p>}</div>
    </form>
  </>;
}
