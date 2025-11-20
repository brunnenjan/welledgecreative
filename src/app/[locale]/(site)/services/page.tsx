'use client';

import { useI18n } from "@/components/providers/I18nProvider";

export default function Services() {
  const { t, getValue } = useI18n();
  const services = getValue<Array<{ title: string; items: string[]; price: string }>>("servicesPage.cards") ?? [];
  return (
    <div className="bg-white text-black">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold">{t("servicesPage.heading")}</h1>
        <p className="mt-4 max-w-2xl text-black/70">{t("servicesPage.description")}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-2xl border p-6">
              <h3 className="font-semibold">{service.title}</h3>
              <ul className="mt-3 list-disc pl-5 text-black/80">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-black/60">{service.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border p-6">
          <h2 className="text-xl font-bold">{t("servicesPage.cta.title")}</h2>
          <p className="mt-2 text-black/70">{t("servicesPage.cta.body")}</p>
        </div>
      </section>
    </div>
  );
}
