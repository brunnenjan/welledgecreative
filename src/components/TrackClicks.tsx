"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Counts the steps that lead to an enquiry: a click on the mail address, on a link to the
 * discovery call or to the contact page, and a call that was really booked in the Calendly
 * embed. Nothing is sent unless analytics were accepted in the cookie banner.
 */
export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const label = (a.textContent ?? "").trim().slice(0, 60);
      if (href.startsWith("mailto:")) track("contact_click", { method: "email", link_text: label });
      else if (href.includes("calendly.com")) track("book_call_click", { link_text: label });
      else if (/^\/(en|de)\/contact\b|^\/contact\b/.test(href)) track("cta_click", { link_text: label });
    };
    // Calendly tells the page when a visitor has booked a slot in the embedded calendar.
    const onMessage = (e: MessageEvent) => {
      if (!/^https:\/\/(www\.)?calendly\.com$/.test(e.origin)) return;
      const name = (e.data as { event?: string } | null)?.event;
      if (name === "calendly.event_scheduled") track("generate_lead", { method: "discovery_call" });
    };
    document.addEventListener("click", onClick);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("message", onMessage);
    };
  }, []);
  return null;
}
