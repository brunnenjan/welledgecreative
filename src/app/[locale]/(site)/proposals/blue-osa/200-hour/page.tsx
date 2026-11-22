import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Open_Sans, Roboto } from "next/font/google";
import ProposalScroll from "../../ProposalScroll";
import TrainingPageV2 from "./TrainingPageV2";

// The second 200-hour mockup, with Aaron's feedback built in. Shown inside the call page, and on its own.
export const metadata: Metadata = {
  title: "Blue Osa | 200-hour page, second mockup by Well Edge Creative",
  description: "The Blue Osa 200-hour yoga teacher training page with your feedback built in.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: `${SITE_URL}/en/proposals/blue-osa/200-hour` },
};

// Blue Osa's own type: Roboto for headings, Open Sans for text.
const heading = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });
const body = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function BlueOsaTrainingV2Page() {
  return (
    <>
      <ProposalScroll />
      <TrainingPageV2 heading={heading.className} body={body.className} />
    </>
  );
}
