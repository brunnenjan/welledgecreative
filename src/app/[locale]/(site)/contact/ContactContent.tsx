"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import ContactTrap from "@/components/ContactTrap";
import { useI18n } from "@/components/providers/I18nProvider";
import { postContact } from "@/lib/contact-client";
import { track } from "@/lib/track";
import styles from "./contact.module.css";

/** The 30-minute discovery call, the same event every page of the site links to. */
const CALENDLY = "https://calendly.com/well-edge-creative/30min";
const MAIL = "info@welledgecreative.com";

const COPY = {
  en: {
    eyebrow: "Contact",
    title: "Let's talk about your project.",
    lead: "Book a free 30-minute discovery call, or write me a few lines. I reply personally.",
    callTag: "Discovery call · 30 minutes",
    callTitle: "Book a time that suits you",
    callText: "We talk about your project, where you stand and what would help most. Free and without obligation.",
    callShow: "Show the calendar",
    callOpen: "Open in Calendly",
    callNote: "The calendar is loaded from Calendly (Calendly LLC, USA) only after you click.",
    formTag: "Write me",
    formTitle: "Prefer to write?",
    topicLabel: "What is it about?",
    topics: ["Retreat or wellness", "Website", "Branding", "Something else"],
    name: "Name",
    email: "Email",
    website: "Website (if you have one)",
    message: "Your message",
    messageHint: "Where do you stand, and what would you like to change?",
    privacy: "I use your details only to reply to you.",
    privacyLink: "Privacy policy",
    send: "Send message",
    sending: "Sending…",
    success: "Thank you! Your message has arrived, and a confirmation is on its way to your inbox.",
    error: "Your message could not be sent. Please try again in a moment or write to",
    direct: "Or write directly to",
  },
  de: {
    eyebrow: "Kontakt",
    title: "Lass uns über dein Projekt sprechen.",
    lead: "Buch dir einen kostenlosen Discovery Call von 30 Minuten oder schreib mir ein paar Zeilen. Ich antworte dir persönlich.",
    callTag: "Discovery Call · 30 Minuten",
    callTitle: "Such dir einen passenden Termin aus",
    callText: "Wir sprechen über dein Projekt, wo du gerade stehst und was dir am meisten helfen würde. Kostenlos und unverbindlich.",
    callShow: "Kalender anzeigen",
    callOpen: "In Calendly öffnen",
    callNote: "Der Kalender wird erst nach deinem Klick von Calendly (Calendly LLC, USA) geladen.",
    formTag: "Schreib mir",
    formTitle: "Lieber schreiben?",
    topicLabel: "Worum geht es?",
    topics: ["Retreat oder Wellness", "Website", "Branding", "Etwas anderes"],
    name: "Name",
    email: "E-Mail",
    website: "Website (falls vorhanden)",
    message: "Deine Nachricht",
    messageHint: "Wo stehst du gerade, und was möchtest du verändern?",
    privacy: "Ich nutze deine Angaben nur, um dir zu antworten.",
    privacyLink: "Datenschutz",
    send: "Nachricht senden",
    sending: "Wird gesendet…",
    success: "Danke! Deine Nachricht ist angekommen, und eine Bestätigung ist unterwegs in dein Postfach.",
    error: "Deine Nachricht konnte nicht gesendet werden. Bitte versuch es gleich noch einmal oder schreib an",
    direct: "Oder schreib direkt an",
  },
} as const;

function Arrow() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactContent() {
  const { locale } = useI18n();
  const c = COPY[locale === "de" ? "de" : "en"];
  const [showCalendar, setShowCalendar] = useState(false);
  const [topic, setTopic] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const website = String(fields.get("website") ?? "").trim();
    const data = new FormData();
    data.set("name", String(fields.get("name") ?? ""));
    data.set("email", String(fields.get("email") ?? ""));
    data.set("projectType", c.topics[topic]);
    data.set("message", [String(fields.get("message") ?? ""), website && `Website: ${website}`].filter(Boolean).join("\n\n"));
    data.set("locale", locale);
    data.set("company_url", String(fields.get("company_url") ?? ""));
    setStatus("sending");
    try {
      const { ok } = await postContact(data, startedAt.current);
      setStatus(ok ? "success" : "error");
      if (ok) {
        // The enquiry itself: this is the number that says which pages bring clients.
        track("generate_lead", { method: "contact_form", topic: c.topics[topic] });
        form.reset();
      }
    } catch (error) {
      console.error("Contact form failed", error);
      setStatus("error");
    }
  }

  const calendlySrc = `${CALENDLY}?hide_gdpr_banner=1&primary_color=f58222&embed_type=Inline&embed_domain=www.welledgecreative.com`;

  return (
    <>
      <Header className={styles.header} />
      <main className={styles.page}>
        <section className={`${styles.wrap} ${styles.hero}`}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            {c.eyebrow}
          </p>
          <h1>{c.title}</h1>
          <p className={styles.lead}>{c.lead}</p>
        </section>

        <section className={`${styles.wrap} ${styles.grid}`}>
          {/* The call */}
          <article className={`${styles.card} ${styles.callCard}`} id="call">
            <span className={styles.tag}>{c.callTag}</span>
            <h2>{c.callTitle}</h2>
            <p className={styles.cardText}>{c.callText}</p>
            {showCalendar ? (
              <iframe src={calendlySrc} title="Calendly" className={styles.calendar} loading="lazy" />
            ) : (
              <div className={styles.callActions}>
                <button type="button" className="btn btn-primary" onClick={() => setShowCalendar(true)}>
                  {c.callShow}
                  <Arrow />
                </button>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
                  {c.callOpen}
                  <Arrow />
                </a>
              </div>
            )}
            <p className={styles.note}>{c.callNote}</p>
          </article>

          {/* The form */}
          <article className={styles.card}>
            <span className={styles.tag}>{c.formTag}</span>
            <h2>{c.formTitle}</h2>
            {status === "success" ? (
              <p className={styles.success} role="status">
                {c.success}
              </p>
            ) : (
              <form className={styles.form} onSubmit={submit} aria-busy={status === "sending"}>
                <ContactTrap />
                <fieldset className={styles.topics}>
                  <legend>{c.topicLabel}</legend>
                  {c.topics.map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      className={i === topic ? styles.topicOn : styles.topic}
                      aria-pressed={i === topic}
                      onClick={() => setTopic(i)}
                    >
                      {label}
                    </button>
                  ))}
                </fieldset>
                <div className={styles.row}>
                  <label>
                    {c.name}
                    <input name="name" autoComplete="name" required maxLength={120} />
                  </label>
                  <label>
                    {c.email}
                    <input name="email" type="email" autoComplete="email" required maxLength={254} />
                  </label>
                </div>
                <label>
                  {c.website}
                  <input name="website" inputMode="url" autoComplete="url" maxLength={300} placeholder="www.example.com" />
                </label>
                <label>
                  {c.message}
                  <textarea name="message" rows={5} required maxLength={5000} placeholder={c.messageHint} />
                </label>
                <p className={styles.note}>
                  {c.privacy}{" "}
                  <Link href={`/${locale}/privacy`} target="_blank" rel="noopener noreferrer">
                    {c.privacyLink}
                  </Link>
                </p>
                <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
                  {status === "sending" ? c.sending : c.send}
                  {status !== "sending" && <Arrow />}
                </button>
                {status === "error" && (
                  <p className={styles.error} role="alert">
                    {c.error} <a href={`mailto:${MAIL}`}>{MAIL}</a>.
                  </p>
                )}
              </form>
            )}
          </article>
        </section>

        <p className={`${styles.wrap} ${styles.direct}`}>
          {c.direct} <a href={`mailto:${MAIL}`}>{MAIL}</a>
        </p>
      </main>
    </>
  );
}
