import type { Metadata } from "next";
import HomepageMockup from "./HomepageMockup";

// The homepage mockup shown inside the proposal, and on its own when opened full screen.
export const metadata: Metadata = {
  title: "The Sanctuary at Two Rivers | Homepage mockup by Well Edge Creative",
  description: "A homepage direction for The Sanctuary at Two Rivers, Costa Rica.",
  robots: { index: false, follow: false, nocache: true },
};

export default function SanctuaryHomepageMockupPage() {
  return <HomepageMockup />;
}
