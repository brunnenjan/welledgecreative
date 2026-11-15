import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Lora, Mulish } from "next/font/google";
import ProposalScroll from "../../ProposalScroll";
import HomepageMockup from "./HomepageMockup";

// The homepage mockup shown inside the proposal, and on its own when opened full screen.
export const metadata: Metadata = {
  title: "Sonora Caribbean Jungle Retreat | Homepage mockup by Well Edge Creative",
  description: "A homepage direction for Sonora Caribbean Jungle Retreat, Puerto Viejo, Costa Rica.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: `${SITE_URL}/en/proposals/sonora/homepage` },
};

const serif = Lora({ subsets: ["latin"], style: ["normal", "italic"] });
const sans = Mulish({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function SonoraHomepageMockupPage() {
  return (
    <>
      <ProposalScroll />
      <HomepageMockup serif={serif.className} sans={sans.className} />
    </>
  );
}
