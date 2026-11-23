import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Open_Sans, Roboto } from "next/font/google";
import ProposalScroll from "../../ProposalScroll";
import TrainingPageV2 from "../200-hour/TrainingPageV2";

// Third version of the 200-hour mockup, for the call on 25 November: fuller galleries and the
// complete FAQ. The second version stays unchanged at /200-hour.
export const metadata: Metadata = {
  title: "Blue Osa | 200-hour page, third mockup by Well Edge Creative",
  description: "The Blue Osa 200-hour yoga teacher training page: fuller galleries and the complete FAQ.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: `${SITE_URL}/en/proposals/blue-osa/200-hour-v3` },
};

const heading = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });
const body = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function BlueOsaTrainingV3Page() {
  return (
    <>
      <ProposalScroll />
      <TrainingPageV2 heading={heading.className} body={body.className} version={3} />
    </>
  );
}
