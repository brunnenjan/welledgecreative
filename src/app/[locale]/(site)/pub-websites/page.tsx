"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/providers/I18nProvider";

type Card = { title: string; body: string; price?: string };
type Shot = { file: string; title: string; alt: string };
type FAQ = { question: string; answer: string };

export default function PubWebsitesPage() {
  const { t, getValue, locale } = useI18n();
  const text = (key: string) => t(`pubWebsitesPage.${key}`);
  const list = <T,>(key: string) => getValue<T[]>(`pubWebsitesPage.${key}`) ?? [];
  const actions = (
    <div className="mt-8 flex flex-wrap gap-4">
      <a href="mailto:info@well-edge-creative.com" className="btn btn-primary">{text("emailCta")}</a>
      <Link href={`/${locale}/contact`} className="btn btn-secondary">{text("contactCta")}</Link>
    </div>
  );
  return (
    <main className="bg-white text-black">
      <section id="hero" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">{text("eyebrow")}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">{text("heading")}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/70">{text("intro")}</p>
        <p className="mt-5 max-w-2xl font-semibold">{text("proof")}</p>
        {actions}
      </section>
      <div className="mx-auto max-w-6xl space-y-20 px-6 pb-20">
        <section aria-labelledby="showcase-title">
          <h2 id="showcase-title" className="text-3xl font-bold">{text("showcase.title")}</h2>
          <p className="mt-4 max-w-3xl text-black/70">{text("showcase.body")}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {list<Shot>("showcase.items").map((shot) => (
              <figure key={shot.file} className="overflow-hidden rounded-2xl border">
                <a href={`/assets/misc/pub-websites/${shot.file}`} target="_blank" rel="noopener noreferrer">
                  <Image src={`/assets/misc/pub-websites/${shot.file}`} alt={shot.alt} width={1600} height={1000} sizes="(max-width: 768px) 100vw, 560px" className="h-auto w-full" />
                </a>
                <figcaption className="p-5 font-semibold">{shot.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold">{text("what.title")}</h2>
          <p className="mt-4 max-w-3xl text-black/70">{text("what.body")}</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">{list<string>("what.items").map(item => <li key={item} className="rounded-2xl border p-6">{item}</li>)}</ul>
        </section>
        <section className="rounded-2xl border p-6 md:p-10">
          <h2 className="text-3xl font-bold">{text("package.title")}</h2>
          <p className="mt-4 max-w-3xl text-black/70">{text("package.body")}</p>
          <p className="mt-6 text-4xl font-extrabold text-accent">{text("package.price")}</p>
          <ul className="mt-6 list-disc space-y-2 pl-5">{list<string>("package.items").map(item => <li key={item}>{item}</li>)}</ul>
          <p className="mt-6 text-black/70">{text("package.note")}</p>
          <h3 className="mt-10 text-xl font-bold">{text("package.extrasTitle")}</h3>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">{list<{title: string; price: string}>("package.extras").map(extra => <div key={extra.title} className="flex flex-wrap justify-between gap-3 rounded-2xl border p-4"><dt>{extra.title}</dt><dd className="font-bold">{extra.price}</dd></div>)}</dl>
        </section>
        <section>
          <h2 className="text-3xl font-bold">{text("care.title")}</h2>
          <p className="mt-4 max-w-3xl text-black/70">{text("care.body")}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">{list<Card>("care.plans").map((plan, index) => <div key={plan.title} className={`rounded-2xl border p-6 ${index === 1 ? "border-accent" : ""}`}>
            {index === 1 && <p className="mb-3 text-sm font-semibold text-accent">{text("care.recommended")}</p>}
            <h3 className="text-xl font-bold">{plan.title}</h3><p className="mt-3 text-3xl font-bold">{plan.price}</p><p className="mt-4 text-black/70">{plan.body}</p>
          </div>)}</div>
          <p className="mt-6 text-sm text-black/70">{text("care.note")}</p>
        </section>
        <section>
          <h2 className="text-3xl font-bold">{text("why.title")}</h2><p className="mt-4 max-w-3xl text-black/70">{text("why.body")}</p>
          <ul className="mt-6 list-disc space-y-3 pl-5">{list<string>("why.items").map(item => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="rounded-2xl border p-6 md:p-10">
          <h2 className="text-3xl font-bold">{text("reference.title")}</h2><p className="mt-4 max-w-3xl text-black/70">{text("reference.body")}</p><p className="mt-4 text-sm text-black/70">{text("reference.note")}</p>
          <a href="https://rocklore.de" target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-6">{text("liveCta")}</a>
        </section>
        <section>
          <h2 className="text-3xl font-bold">{text("process.title")}</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{list<Card>("process.steps").map((step, index) => <li key={step.title} className="rounded-2xl border p-5"><span className="text-3xl font-extrabold text-accent">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-4 font-bold">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-black/70">{step.body}</p></li>)}</ol>
        </section>
        <section className="rounded-2xl border p-6 md:p-10">
          <h2 className="text-3xl font-bold">{text("investment.title")}</h2><p className="mt-4 text-black/70">{text("investment.body")}</p><p className="mt-6 font-semibold">{text("investment.example")}</p><p className="mt-4 text-sm text-black/70">{text("investment.note")}</p>
        </section>
        <section>
          <h2 className="text-3xl font-bold">{text("faq.title")}</h2>
          <div className="mt-8 space-y-3">{list<FAQ>("faq.items").map(faq => <details key={faq.question} className="rounded-2xl border p-5"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-4 max-w-3xl leading-relaxed text-black/70">{faq.answer}</p></details>)}</div>
        </section>
        <section><h2 className="text-3xl font-bold">{text("about.title")}</h2><p className="mt-4 max-w-3xl leading-relaxed text-black/70">{text("about.body")}</p></section>
        <section className="rounded-2xl border border-accent p-6 md:p-10"><h2 className="max-w-3xl text-3xl font-bold md:text-4xl">{text("closing.title")}</h2><p className="mt-4 max-w-2xl text-black/70">{text("closing.body")}</p>{actions}</section>
      </div>
    </main>
  );
}
