import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import ProposalScroll from "../../ProposalScroll";
import HomepageMockup from "./HomepageMockup";

// The homepage mockup shown inside the proposal, and on its own when opened full screen.
export const metadata: Metadata = {
  title: "The Sanctuary at Two Rivers | Homepage mockup by Well Edge Creative",
  description: "A homepage direction for The Sanctuary at Two Rivers, Costa Rica.",
  robots: { index: false, follow: false, nocache: true },
};

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function SanctuaryHomepageMockupPage() {
  return (
    <>
      <ProposalScroll />
      <HomepageMockup serif={serif.className} sans={sans.className} />
    </>
  );
}
