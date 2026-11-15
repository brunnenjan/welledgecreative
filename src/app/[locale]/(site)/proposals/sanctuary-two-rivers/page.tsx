import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import ProposalScroll from "../ProposalScroll";
import ProposalContent from "./ProposalContent";

// A proposal for one client: reachable by link only, never listed or indexed.
export const metadata: Metadata = {
  title: "The Sanctuary at Two Rivers × Well Edge Creative | Proposal",
  description: "A brand and website proposal for The Sanctuary at Two Rivers, Costa Rica.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: `${SITE_URL}/en/proposals/sanctuary-two-rivers` },
  // The card mail apps and messengers show when the link is shared.
  openGraph: {
    type: "website",
    url: `${SITE_URL}/en/proposals/sanctuary-two-rivers`,
    siteName: "Well Edge Creative",
    title: "The Sanctuary at Two Rivers × Well Edge Creative",
    description: "A brand and website as rare as the place itself. A proposal by Well Edge Creative.",
    images: [{ url: `${SITE_URL}/proposals/sanctuary-two-rivers/og.jpg`, width: 1200, height: 630, alt: "The Sanctuary at Two Rivers: proposal by Well Edge Creative" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sanctuary at Two Rivers × Well Edge Creative",
    description: "A brand and website as rare as the place itself.",
    images: [`${SITE_URL}/proposals/sanctuary-two-rivers/og.jpg`],
  },
};

export default function SanctuaryTwoRiversProposalPage() {
  return (
    <div className="page-fade">
      <ProposalScroll />
      <ProposalContent />
    </div>
  );
}
