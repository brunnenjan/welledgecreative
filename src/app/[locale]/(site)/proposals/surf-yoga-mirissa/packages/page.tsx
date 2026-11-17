import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Montserrat } from "next/font/google";
import ProposalScroll from "../../ProposalScroll";
import PackagesMockup from "./PackagesMockup";

// The packages page mockup shown inside the proposal, and on its own when opened full screen.
export const metadata: Metadata = {
  title: "Surf & Yoga Mirissa | Packages page mockup by Well Edge Creative",
  description: "A packages page direction for Surf & Yoga Mirissa, Sri Lanka.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: `${SITE_URL}/en/proposals/surf-yoga-mirissa/packages` },
};

// Their own type: Montserrat.
const font = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function SurfYogaPackagesMockupPage() {
  return (
    <>
      <ProposalScroll />
      <PackagesMockup font={font.className} />
    </>
  );
}
