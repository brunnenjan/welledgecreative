import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import ProposalScroll from "../ProposalScroll";
import ProposalContent from "./ProposalContent";

const URL = `${SITE_URL}/en/proposals/blue-osa`;
const OG = `${SITE_URL}/proposals/blue-osa/og.jpg`;

// A proposal for one client: reachable by link only, never listed or indexed.
export const metadata: Metadata = {
  title: "Blue Osa × Well Edge Creative | Proposal",
  description: "A proposal for the Blue Osa yoga teacher training pages, Osa Peninsula, Costa Rica.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: URL },
  // The card mail apps and messengers show when the link is shared.
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Well Edge Creative",
    title: "Blue Osa × Well Edge Creative",
    description: "Your place speaks for itself. Let the pages say less. A proposal by Well Edge Creative.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Blue Osa: proposal by Well Edge Creative" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Osa × Well Edge Creative",
    description: "Your place speaks for itself. Let the pages say less.",
    images: [OG],
  },
};

export default function BlueOsaProposalPage() {
  return (
    <div className="page-fade">
      <ProposalScroll />
      <ProposalContent />
    </div>
  );
}
