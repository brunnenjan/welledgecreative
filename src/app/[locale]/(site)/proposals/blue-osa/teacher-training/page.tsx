import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Open_Sans, Roboto } from "next/font/google";
import ProposalScroll from "../../ProposalScroll";
import TeacherTrainingMockup from "./TeacherTrainingMockup";

// The teacher training page mockup shown inside the proposal, and on its own when opened full screen.
export const metadata: Metadata = {
  title: "Blue Osa | 200-hour teacher training mockup by Well Edge Creative",
  description: "A page direction for the Blue Osa 200-hour yoga teacher training.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: `${SITE_URL}/en/proposals/blue-osa/teacher-training` },
};

// Blue Osa's own type: Roboto for headings, Open Sans for text.
const heading = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });
const body = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function BlueOsaTeacherTrainingMockupPage() {
  return (
    <>
      <ProposalScroll />
      <TeacherTrainingMockup heading={heading.className} body={body.className} />
    </>
  );
}
