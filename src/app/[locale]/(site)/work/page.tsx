"use client";

import WorkGrid from "@/components/WorkGrid";
import { useI18n } from "@/components/providers/I18nProvider";

export default function WorkPage() {
  const { t } = useI18n();
  return (
    <div className="bg-white text-black">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold">{t("workPage.heading")}</h1>
        <p className="mt-3 max-w-2xl text-black/70">{t("workPage.description")}</p>
        <div className="mt-8">
          <WorkGrid />
        </div>
      </section>
    </div>
  );
}
