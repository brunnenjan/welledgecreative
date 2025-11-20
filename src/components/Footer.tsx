"use client";

import { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { useI18n } from "@/components/providers/I18nProvider";

const FOOTER_LINKS = [
  { href: "#hero", labelKey: "navigation.home" },
  { href: "#how-i-work", labelKey: "navigation.howIWork" },
  { href: "#selected-projects", labelKey: "navigation.projects" },
  { href: "#logos", labelKey: "navigation.logos" },
  { href: "#testimonials", labelKey: "navigation.testimonials" },
  { href: "#contact-section", labelKey: "navigation.contact" },
];

const LEGAL_LINKS = [
  { href: "/imprint", labelKey: "footer.legal.imprint" },
  { href: "/privacy", labelKey: "footer.legal.privacy" },
];

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/jan-brunnenkant-9564b579/", labelKey: "footer.social.linkedin" },
  { href: "https://www.instagram.com/welledgecreative/", labelKey: "footer.social.instagram" },
];

export default function Footer() {
  const { t, locale } = useI18n();
  const currentYear = new Date().getFullYear();
  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();

    if (typeof window === "undefined" || !hash.startsWith("#")) {
      return;
    }

    const targetId = hash.slice(1);
    smoothScrollTo(targetId);
  };
  return (
    <footer
      id="footer"
      className="footer-section"
      style={{
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: 0,
      }}
      aria-labelledby="footer-title"
    >
      <div className="footer-content mx-auto flex max-w-6xl flex-col gap-12 px-6 pt-16 pb-12">
        <div className="flex flex-col gap-6 text-white">
          <div className="flex items-center gap-4">
            <Image src="/assets/logo/well-edge-logo-retina.webp" alt="Well Edge Creative" width={56} height={56} className="h-14 w-auto" />
            <h2 id="footer-title" className="text-xl font-semibold tracking-wide">
              {t("footer.heading")}
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-white/70">
            {t("footer.description")}
          </p>
          <p className="text-sm text-white/60">
            {t("footer.remote")}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <a
              href="https://calendly.com/well-edge-creative/30min"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary text-sm uppercase tracking-[0.2em]"
            >
              {t("cta.bookCall")}
            </a>
            <a
              href="mailto:info@well-edge-creative.com"
              className="mt-3 text-sm text-white/70 underline decoration-white/40 underline-offset-4 hover:text-white sm:mt-0"
            >
              info@well-edge-creative.com
            </a>
          </div>
        </div>

        {/* Mini Nav */}
        <nav aria-label={t("footer.navAria")} className="text-white/70">
          <ul className="flex flex-wrap items-center justify-center gap-2 text-sm">
            {FOOTER_LINKS.map((link, index) => (
              <li key={link.href} className="flex items-center gap-2">
                <a
                  href={link.href}
                  className="footer-link hover:text-white transition-colors"
                  onClick={(event) => handleAnchorClick(event, link.href)}
                >
                  {t(link.labelKey)}
                </a>
                {index < FOOTER_LINKS.length - 1 && (
                  <span className="text-white/30" aria-hidden="true">·</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <nav aria-label={t("footer.socialAria")} className="text-white/70">
          <ul className="flex items-center justify-center gap-6 text-sm">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="footer-link hover:text-white transition-colors">
                  {t(link.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal Row */}
        <div className="border-t border-white/10 pt-6 text-xs text-white/50 text-center space-y-3">
          <p className="text-sm text-white/60">
            {t("footer.legalLine")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>© {currentYear} Well Edge Creative</span>
            <span className="text-white/30" aria-hidden="true">·</span>
            {LEGAL_LINKS.map((link, index) => (
              <span key={link.href} className="flex items-center gap-2">
                <Link
                  href={`/${locale}${link.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/90 transition-colors underline-offset-4 hover:underline"
                >
                  {t(link.labelKey)}
                </Link>
                {index < LEGAL_LINKS.length - 1 && (
                  <span className="text-white/30" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
