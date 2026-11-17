import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import ProposalScroll from "../ProposalScroll";
import ProposalContent from "./ProposalContent";

const URL = `${SITE_URL}/en/proposals/surf-yoga-mirissa`;
const OG = `${SITE_URL}/proposals/surf-yoga-mirissa/og.jpg`;

// A proposal for one client: reachable by link only, never listed or indexed.
export const metadata: Metadata = {
  title: "Surf & Yoga Mirissa × Well Edge Creative | Ideas for your packages page",
  description: "Three ideas for the Surf & Yoga Mirissa packages page, with a first mockup.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: URL },
  // The card mail apps and messengers show when the link is shared.
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Well Edge Creative",
    title: "Surf & Yoga Mirissa × Well Edge Creative",
    description: "Three ideas for your packages page, as promised.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Surf & Yoga Mirissa: ideas by Well Edge Creative" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surf & Yoga Mirissa × Well Edge Creative",
    description: "Three ideas for your packages page, as promised.",
    images: [OG],
  },
};

export default function SurfYogaProposalPage() {
  return (
    <div className="page-fade">
      <ProposalScroll />
      <ProposalContent />
    </div>
  );
}
