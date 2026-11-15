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
};

export default function SanctuaryTwoRiversProposalPage() {
  return (
    <div className="page-fade">
      <ProposalScroll />
      <ProposalContent />
    </div>
  );
}
