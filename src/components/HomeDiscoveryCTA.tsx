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
      variant="dark"
      className="mx-4 my-16 md:mx-10 md:my-24"
    />
  );
}
