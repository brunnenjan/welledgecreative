// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/free-mode";
import "@/styles/swiper-custom.css";
import ScrollSmootherInit from "@/components/ScrollSmootherInit";
import CookieConsent from "@/components/CookieConsent";
import Preloader from "@/components/Preloader";
import LandscapeOverlay from "@/components/LandscapeOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.well-edge-creative.de"),
  title: "Well Edge Creative | Branding & Web Design by Jan Brunnenkant",
  description: "Well Edge Creative – Branding & Web Design by Jan Brunnenkant. Purpose-driven brand strategy, clean visual identities, and websites that create clarity and emotional connection.",
  keywords: [
    "branding",
    "web design",
    "logo design",
    "brand strategy",
    "website development",
    "Next.js",
    "GSAP animation",
    "brand identity",
    "digital design",
    "Germany",
  ],
  authors: [{ name: "Jan Brunnenkant" }],
  creator: "Jan Brunnenkant",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.well-edge-creative.de",
    title: "Well Edge Creative | Branding & Web Design by Jan Brunnenkant",
    description: "Strategy with depth, design with clarity. I craft brands and websites that tell your story and connect with your audience.",
    siteName: "Well Edge Creative",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Well Edge Creative — Branding & Web Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Well Edge Creative | Branding & Web Design by Jan Brunnenkant",
    description: "Strategy with depth, design with clarity. I craft brands and websites that tell your story and connect with your audience.",
    images: ["/assets/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: [
      { url: "/assets/favicon/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/icon.png?v=2", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico?v=2", type: "image/x-icon" },
    ],
    apple: [{ url: "/assets/favicon/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico?v=2"],
  },
  manifest: "/assets/favicon/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.well-edge-creative.de/#person",
        name: "Jan Brunnenkant",
        url: "https://www.well-edge-creative.de",
        image: "https://www.well-edge-creative.de/assets/profile/profile-jan.webp",
        jobTitle: "Brand & Web Designer",
        description: "Designer, strategist, and storyteller specializing in branding and web design that connects deeply.",
        email: "info@well-edge-creative.com",
        sameAs: [
          "https://www.behance.net/welledgecreative",
          "https://www.linkedin.com/in/jan-well-edge-creative",
          "https://www.instagram.com/well_edge_creative",
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://www.well-edge-creative.de/#organization",
        name: "Well Edge Creative",
        url: "https://www.well-edge-creative.de",
        logo: "https://www.well-edge-creative.de/assets/logo/well-edge-logo-retina.webp",
        description: "Branding and web design agency that helps founders turn ideas into brands that connect deeply and perform beautifully online.",
        founder: {
          "@id": "https://www.well-edge-creative.de/#person",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@well-edge-creative.com",
          contactType: "Customer Service",
          availableLanguage: ["German", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.well-edge-creative.de/#website",
        url: "https://www.well-edge-creative.de",
        name: "Well Edge Creative",
        description: "Branding & Web Design That Tells Your Story",
        publisher: {
          "@id": "https://www.well-edge-creative.de/#organization",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.well-edge-creative.de/#service",
        name: "Well Edge Creative",
        image: "https://www.well-edge-creative.de/assets/logo/well-edge-logo-retina.webp",
        url: "https://www.well-edge-creative.de",
        telephone: "",
        email: "info@well-edge-creative.com",
        priceRange: "€€€",
        address: {
          "@type": "PostalAddress",
          addressCountry: "DE",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "6",
        },
        serviceType: ["Branding", "Logo Design", "Web Design", "Web Development", "Brand Strategy"],
      },
      {
        "@type": "Review",
        "@id": "https://www.well-edge-creative.de/#review-reutter",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Viktoria & Stefan Reutter",
        },
        reviewBody:
          "Jan was doing a great job designing our company’s logo. Starting our strawberry farm in Saskatchewan Canada, we had a lot of ideas what our logo should represent. Jan was taking all our business values into consideration and creating a comprehensive and beautiful logo. Never being left out of the work progress, it was always great to work with Jan, reliable, on time and always available. Even after the project was finished, he was there for small adjustments for business cards etc.",
        datePublished: "2025-01-01",
        itemReviewed: {
          "@id": "https://www.well-edge-creative.de/#organization",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} body-base antialiased`}>
        <LandscapeOverlay />
        <Preloader />
        <a href="#hero" className="skip-link">
          Skip to main content
        </a>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
          </div>
        </div>
        <ScrollSmootherInit />
        <CookieConsent />
      </body>
    </html>
  );
}
