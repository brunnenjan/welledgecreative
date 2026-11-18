import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Hanken_Grotesk, Marcellus, Pinyon_Script } from "next/font/google";
import ProposalScroll from "../../ProposalScroll";
import HomeMockup from "./HomeMockup";

// The homepage mockup shown inside the proposal, and on its own when opened full screen.
export const metadata: Metadata = {
  title: "Brisa Bahía | Homepage mockup by Well Edge Creative",
  description: "A homepage direction for Brisa Bahía, Colombia.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: `${SITE_URL}/en/proposals/brisa-bahia/homepage` },
};

// Their own type: Marcellus for titles, Pinyon Script as a rare accent, Hanken Grotesk for text
// as in their own sheets.
const title = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-title" });
const script = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-script" });
const body = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

export default function BrisaHomeMockupPage() {
  return (
    <>
      <ProposalScroll />
      <HomeMockup fonts={`${title.variable} ${script.variable} ${body.variable}`} />
    </>
  );
}
