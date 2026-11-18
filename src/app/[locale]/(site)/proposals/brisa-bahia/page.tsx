import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import ProposalScroll from "../ProposalScroll";
import ProposalContent from "./ProposalContent";

const URL = `${SITE_URL}/en/proposals/brisa-bahia`;
const OG = `${SITE_URL}/proposals/brisa-bahia/og.jpg`;

// A proposal for one client: reachable by link only, never listed or indexed.
export const metadata: Metadata = {
  title: "Brisa Bahía × Well Edge Creative | Next steps for your website",
  description: "What I would do next for the Brisa Bahía website, with a homepage to scroll through.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: URL },
  // The card mail apps and messengers show when the link is shared.
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Well Edge Creative",
    title: "Brisa Bahía × Well Edge Creative",
    description: "What I would do next, with a homepage to scroll through.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Brisa Bahía: next steps by Well Edge Creative" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brisa Bahía × Well Edge Creative",
    description: "What I would do next, with a homepage to scroll through.",
    images: [OG],
  },
};

export default function BrisaProposalPage() {
  return (
    <div className="page-fade">
      <ProposalScroll />
      <ProposalContent />
    </div>
  );
}
