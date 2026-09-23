"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import DiscoveryCTASection from "@/components/DiscoveryCTASection";

export default function HomeDiscoveryCTA() {
  const { t, locale } = useI18n();

  return (
    <DiscoveryCTASection
      heading={t("homeDiscoveryCta.heading")}
      paragraph={t("homeDiscoveryCta.paragraph")}
      buttonText={t("homeDiscoveryCta.button")}
      href={`/${locale}/retreats`}
      variant="hero"
    />
  );
}
