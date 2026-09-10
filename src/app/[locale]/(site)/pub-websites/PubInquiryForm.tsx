"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CaptchaUnavailable, postPubInquiry, loadInquiryCaptcha } from "@/lib/pub-inquiry-client";
import Link from "next/link";
import { useI18n } from "@/components/providers/I18nProvider";
import styles from "./pub-websites.module.css";


export default function PubInquiryForm() {
  const { t, locale } = useI18n();
  const text = (key: string) => t(`pubWebsitesPage.form.${key}`);
  const [ready, setReady] = useState(false);
  const [loadingCaptcha, setLoadingCaptcha] = useState(true);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "confirmationFailed" | "error" | "securityError" | "securityLoadError" | "securityServiceError" | "serverError" | "networkError">("idle");
  const submitting = useRef(false);
  const securityProblem = ["securityError", "securityLoadError", "securityServiceError"].includes(status);
  const complete = status === "success" || status === "confirmationFailed";

  useEffect(() => {
    let active = true;
    setLoadingCaptcha(true);
    setReady(false);
    loadInquiryCaptcha().then(() => {
      if (active) {
        setReady(true);
        setStatus(current => ["securityError", "securityLoadError", "securityServiceError"].includes(current) ? "idle" : current);
      }
    }).catch(() => { if (active) setStatus("securityLoadError"); })
      .finally(() => { if (active) setLoadingCaptcha(false); });
    return () => { active = false; };
  }, [loadAttempt]);

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
      const { response, result } = await postPubInquiry(data);
      if (!response.ok || result?.message !== "OK") {
        setStatus(result?.code === "CAPTCHA_UNAVAILABLE" ? "securityServiceError" : ["CAPTCHA_FAILED", "CAPTCHA_BROWSER_ERROR"].includes(result?.code) ? "securityError" : response.status >= 500 ? "serverError" : "error");
        return;
      }
      setStatus(result.confirmationSent === false ? "confirmationFailed" : "success");
      form.reset();
    } catch (error) {
      setStatus(error instanceof CaptchaUnavailable ? (error.stage === "load" ? "securityLoadError" : "securityError") : "networkError");
    } finally {
      submitting.current = false;
    }
  }

  return <>
    <p className={styles.formIntro}>{text("intro")}</p>
    {securityProblem && <p className={styles.small}><a href={`https://www.welledgecreative.${locale === "de" ? "de" : "com"}/${locale}/pub-websites`}>{text("liveForm")}</a></p>}
    <form onSubmit={submit} className={styles.inquiryForm} aria-busy={status === "sending"}>
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
      <p className={styles.small}>{text("captcha")} <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{text("captchaPrivacy")}</a> · <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">{text("captchaTerms")}</a></p>
      {loadingCaptcha && <p role="status" className={styles.small}>{text("loading")}</p>}
      {securityProblem && !loadingCaptcha && <button type="button" className="btn btn-secondary" onClick={() => setLoadAttempt(attempt => attempt + 1)}>{text("retrySecurity")}</button>}
      <button type="submit" className="btn btn-primary" disabled={!ready || status === "sending" || complete}>{status === "sending" ? text("sending") : text("submit")}</button>
      <div role="status" aria-live="polite" aria-atomic="true">{status !== "idle" && <p className={`${styles.formStatus} ${complete ? styles.formSuccess : ""}`}>{text(status)}</p>}</div>
    </form>
  </>;
}
