"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import DiscoveryCTASection from "@/components/DiscoveryCTASection";

export default function HomeDiscoveryCTA() {
  const { t } = useI18n();

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <DiscoveryCTASection
          heading={t("homeDiscoveryCta.heading")}
          paragraph={t("homeDiscoveryCta.paragraph")}
          buttonText={t("homeDiscoveryCta.button")}
          href="https://calendly.com/well-edge-creative/30min"
          variant="dark"
        />
      </div>
    </div>
  );
}
