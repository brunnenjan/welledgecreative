import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import ProposalScroll from "../../ProposalScroll";
import CallContent from "./CallContent";

const URL = `${SITE_URL}/en/proposals/blue-osa/call`;
const OG = `${SITE_URL}/proposals/blue-osa/og.jpg`;

// The page for the call with Aaron: reachable by link only, never listed or indexed.
export const metadata: Metadata = {
  title: "Blue Osa × Well Edge Creative | Your feedback, built in",
  description: "Your feedback on the 200-hour page, built into a second version, with answers to your questions.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Well Edge Creative",
    title: "Blue Osa × Well Edge Creative: your feedback, built in",
    description: "The 200-hour page, second version, with every point you raised.",
    images: [{ url: OG, width: 1200, height: 630, alt: "Blue Osa: proposal by Well Edge Creative" }],
  },
};

export default function BlueOsaCallPage() {
  return (
    <div className="page-fade">
      <ProposalScroll />
      <CallContent />
    </div>
  );
}
