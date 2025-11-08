"use client";

import { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/smoothScroll";

const FOOTER_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#how-i-work", label: "How I Work" },
  { href: "#selected-projects", label: "Selected Projects" },
  { href: "#logos", label: "Logos & Brandings" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact-section", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/imprint", label: "Imprint" },
  { href: "/privacy", label: "Privacy" },
];

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/jan-brunnenkant-9564b579/", label: "LinkedIn" },
  { href: "https://www.instagram.com/welledgecreative/", label: "Instagram" },
];

export default function Footer() {
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
              Ready to create something meaningful together.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-white/70">
            I design brands and digital experiences that feel as deep as they are clear. Tell me about your next project and I&rsquo;ll help decide where to dive first.
          </p>
          <p className="text-sm text-white/60">
            Working remotely as a digital nomad with clients worldwide.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <a
              href="https://calendly.com/well-edge-creative/30min"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary text-sm uppercase tracking-[0.2em]"
            >
              Book a call
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
        <nav aria-label="Footer navigation" className="text-white/70">
          <ul className="flex flex-wrap items-center justify-center gap-2 text-sm">
            {FOOTER_LINKS.map((link, index) => (
              <li key={link.href} className="flex items-center gap-2">
                <a
                  href={link.href}
                  className="footer-link hover:text-white transition-colors"
                  onClick={(event) => handleAnchorClick(event, link.href)}
                >
                  {link.label}
                </a>
                {index < FOOTER_LINKS.length - 1 && (
                  <span className="text-white/30" aria-hidden="true">·</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <nav aria-label="Social links" className="text-white/70">
          <ul className="flex items-center justify-center gap-6 text-sm">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="footer-link hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal Row */}
        <div className="border-t border-white/10 pt-6 text-xs text-white/50 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>© {currentYear} Well Edge Creative</span>
            <span className="text-white/30" aria-hidden="true">·</span>
            {LEGAL_LINKS.map((link, index) => (
              <span key={link.href} className="flex items-center gap-2">
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/90 transition-colors underline-offset-4 hover:underline"
                >
                  {link.label}
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
