import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import ProposalScroll from "../ProposalScroll";
import ProposalContent from "./ProposalContent";

const URL = `${SITE_URL}/en/proposals/sonora`;
const OG = `${SITE_URL}/proposals/sonora/og.jpg`;

// A proposal for one client: reachable by link only, never listed or indexed.
export const metadata: Metadata = {
  title: "Sonora Caribbean Jungle Retreat × Well Edge Creative | Proposal",
  description: "A website and content proposal for Sonora Caribbean Jungle Retreat, Puerto Viejo, Costa Rica.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: URL },
  // The card mail apps and messengers show when the link is shared.
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Well Edge Creative",
    title: "Sonora Caribbean Jungle Retreat × Well Edge Creative",
    description: "Show what happens at Sonora. A proposal by Well Edge Creative.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Sonora Caribbean Jungle Retreat: proposal by Well Edge Creative" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonora Caribbean Jungle Retreat × Well Edge Creative",
    description: "Show what happens at Sonora.",
    images: [OG],
  },
};

export default function SonoraProposalPage() {
  return (
    <div className="page-fade">
      <ProposalScroll />
      <ProposalContent />
    </div>
  );
}
