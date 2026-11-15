import type { Metadata } from "next";
import ProposalContent from "./ProposalContent";

// A proposal for one client: reachable by link only, never listed or indexed.
export const metadata: Metadata = {
  title: "The Sanctuary at Two Rivers × Well Edge Creative | Proposal",
  description: "A brand and website proposal for The Sanctuary at Two Rivers, Costa Rica.",
  robots: { index: false, follow: false, nocache: true },
};

export default function SanctuaryTwoRiversProposalPage() {
  return (
    <div className="page-fade">
      <ProposalContent />
    </div>
  );
}
