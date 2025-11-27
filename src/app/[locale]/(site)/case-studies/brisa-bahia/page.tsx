import type { Metadata } from "next";
import CaseStudyContent from "./CaseStudyContent";

export const metadata: Metadata = {
  title: "Brisa Bahía — Retreat Center Branding & Website Transformation",
  description:
    "How I transformed Brisa Bahía from an outdated lodge website into a premium retreat center brand with a custom identity, website, and facilitator-focused user experience.",
};

export default function BrisaBahiaCaseStudyPage() {
  return (
    <div className="page-fade">
      <CaseStudyContent />
    </div>
  );
}
