"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "wec-analytics-consent";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-SYMEEV6EY4";

type ConsentState = "unknown" | "accepted" | "declined";

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>("unknown");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      setConsent("accepted");
    } else if (stored === "denied") {
      setConsent("declined");
    }
    setIsReady(true);
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "granted");
    }
    setConsent("accepted");
  };

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "denied");
    }
    setConsent("declined");
  };

  const shouldLoadAnalytics = consent === "accepted" && GA_MEASUREMENT_ID;

  return (
    <>
      {shouldLoadAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}

      {isReady && consent === "unknown" && (
        <div
          className="cookie-banner"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie settings"
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Cookies &amp; Analytics</h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              I use optional cookies to measure traffic, understand how the site is used, and improve marketing efforts. You can change your decision at any time in the privacy policy.
            </p>
          </div>
          <div className="cookie-banner__buttons">
            <button
              type="button"
              className="cookie-banner__button cookie-banner__button--secondary"
              onClick={handleDecline}
            >
              Decline
            </button>
            <button
              type="button"
              className="cookie-banner__button cookie-banner__button--primary"
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
