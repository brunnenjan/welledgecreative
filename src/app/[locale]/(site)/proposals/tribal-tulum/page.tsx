import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import ProposalScroll from "../ProposalScroll";
import ProposalContent from "./ProposalContent";

// A proposal for one client: reachable by link only, never listed or indexed.
export const metadata: Metadata = {
  title: "Tribal Tulum × Well Edge Creative | Proposal",
  description: "A website and brand proposal for Tribal Tulum, Mexico.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: `${SITE_URL}/en/proposals/tribal-tulum` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/en/proposals/tribal-tulum`,
    siteName: "Well Edge Creative",
    title: "Tribal Tulum × Well Edge Creative",
    description: "A website that says who it is for, and what to do next. A proposal by Well Edge Creative.",
  },
};

export default function TribalTulumProposalPage() {
  return (
    <div className="page-fade">
      <ProposalScroll />
      <ProposalContent />
    </div>
  );
}
