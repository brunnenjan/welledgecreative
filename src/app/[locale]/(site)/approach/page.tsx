"use client";

import { useI18n } from "@/components/providers/I18nProvider";

export default function Approach() {
  const { t, getValue } = useI18n();
  const steps = getValue<Array<{ title: string; text: string }>>("approachPage.steps") ?? [];
  return (
    <div className="bg-white text-black">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold">{t("approachPage.heading")}</h1>
        <p className="mt-4 max-w-2xl text-black/70">
          {t("approachPage.description")}
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border p-5">
              <b>{index + 1} · {step.title}</b>
              <div className="text-black/70 mt-1">{step.text}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
