import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import CaseStudyContent from "./CaseStudyContent";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return locale === "de"
    ? {
        title: "Vietnam Detox: Marke und Website für Fastenretreats | Well Edge Creative",
        description: "Wie Vietnam Detox eine neue Marke und eine dreisprachige Website bekam: eine Seite pro Retreat, echte Termine und Preise, ein klarer Weg zur Buchung.",
      }
    : {
        title: "Vietnam Detox: brand and website for fasting retreats | Well Edge Creative",
        description: "How Vietnam Detox got a new brand and a website in three languages: one page per retreat, real dates and prices, and a clear way to book.",
      };
}

// Their own type: Cormorant Garamond for headlines, Be Vietnam Pro for text.
const title = Cormorant_Garamond({ subsets: ["latin", "vietnamese"], weight: ["500", "600"], variable: "--font-vd-title" });
const body = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700"], variable: "--font-vd-body" });

export default function VietnamDetoxCaseStudyPage() {
  return (
    <div className="page-fade">
      <CaseStudyContent fonts={`${title.variable} ${body.variable}`} />
    </div>
  );
}
