import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import ProposalScroll from "../../ProposalScroll";
import PhaseOneContent from "./PhaseOneContent";

const URL = `${SITE_URL}/en/proposals/blue-osa/phase-1`;
const OG = `${SITE_URL}/proposals/blue-osa/og.jpg`;

// Phase 1 for Blue Osa: reachable by link only, never listed or indexed.
export const metadata: Metadata = {
  title: "Blue Osa × Well Edge Creative | Phase 1: the 200-hour page",
  description: "Your four points answered, the page at desktop and phone size, speed and search with Google's sources, and the fixed price.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Well Edge Creative",
    title: "Blue Osa × Well Edge Creative: Phase 1",
    description: "The 200-hour page: faster, clearer, and never worse.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Blue Osa: proposal by Well Edge Creative" }],
  },
};

export default function BlueOsaPhaseOnePage() {
  return (
    <div className="page-fade">
      <ProposalScroll />
      <PhaseOneContent />
    </div>
  );
}
