"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { smoothScrollTo } from "@/lib/smoothScroll";
import Link from "next/link";
import { useI18n } from "@/components/providers/I18nProvider";
import styles from "./pub-websites.module.css";

type Card = { title: string; body: string; price?: string };
type Shot = { file: string; title: string; alt: string };
type FAQ = { question: string; answer: string };

function Arrow() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function PubWebsitesPage() {
  const { t, getValue, locale } = useI18n();
  const text = (key: string) => t(`pubWebsitesPage.${key}`);
  const list = <T,>(key: string) => getValue<T[]>(`pubWebsitesPage.${key}`) ?? [];
  const shots = list<Shot>("showcase.items");
  const galleryRef = useRef<HTMLDialogElement>(null);
  const [activeShot, setActiveShot] = useState(0);
  const galleryImages = [
    { src: "/assets/misc/projects/irish-pub-websites-mockup.webp", title: text("reference.title"), alt: text("interactive.mockupAlt"), width: 1440, height: 1080 },
    ...shots.map(shot => ({ src: `/assets/misc/pub-websites/${shot.file}`, title: shot.title, alt: shot.alt, width: 1280, height: 800 })),
  ];
  const currentShot = galleryImages[activeShot];
  const moveShot = (direction: number) => setActiveShot(index => (index + direction + galleryImages.length) % galleryImages.length);
  const openShot = (index: number) => {
    setActiveShot(index);
    galleryRef.current?.showModal();
  };
  const actions = (
    <div className={styles.actions}>
      <a href="mailto:info@well-edge-creative.com" className="btn btn-primary">{text("emailCta")}<Arrow /></a>
      <Link href={`/${locale}/contact`} className={styles.textLink}>{text("contactCta")}<Arrow /></Link>
    </div>
  );
  const label = (key: string) => <p className={styles.eyebrow}>{text(`labels.${key}`)}</p>;

  return (
    <>
    <Header className={styles.header} />
    <main className={styles.page}>
      <section id="hero" className={`${styles.wrap} ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.dot} />{text("eyebrow")}</p>
          <h1>{text("headingStart")} <span>{text("headingAccent")}</span></h1>
          <p className={styles.lead}>{text("intro")}</p>
          {actions}
          <div className={styles.heroPrice}><strong>{text("package.price")}</strong><span>{text("labels.onePage")}</span></div>
        </div>
        <div className={styles.heroVisual}>
          <button type="button" onClick={() => openShot(0)} aria-label={`${text("interactive.enlarge")}: ${text("interactive.mockupAlt")}`} aria-haspopup="dialog" className={styles.mockupLink}>
            <Image src="/assets/misc/projects/irish-pub-websites-mockup.webp" alt={text("interactive.mockupAlt")} width={1600} height={1200} priority sizes="(max-width: 900px) 100vw, 55vw" className={styles.heroImage} />
            <span className={styles.mockupCta}>{text("interactive.enlarge")}<Arrow /></span>
          </button>
          <div className={styles.proof}><span className={styles.dot} /><p>{text("proof")}</p></div>
        </div>
      </section>

      <nav className={`${styles.wrap} ${styles.jumpNav}`} aria-label={text("interactive.navLabel")}>
        {[{id: "pub-showcase", key: "reference"}, {id: "pub-package", key: "package"}, {id: "pub-faq", key: "faq"}].map(item => (
          <a key={item.id} href={`#${item.id}`} onClick={event => { event.preventDefault(); smoothScrollTo(item.id); }}>{text(`interactive.${item.key}`)}<Arrow /></a>
        ))}
      </nav>
      <section className={styles.promiseBand}>
        <div className={`${styles.wrap} ${styles.promiseGrid}`}>
          <div>{label("what")}<h2>{text("what.title")}</h2></div>
          <div><p className={styles.lead}>{text("what.body")}</p><ul className={styles.checkList}>{list<string>("what.items").map(item => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>

      <section id="pub-showcase" className={`${styles.wrap} ${styles.section}`} aria-labelledby="showcase-title">
        <div className={styles.sectionHead}><div>{label("reference")}<h2 id="showcase-title">{text("showcase.title")}</h2></div><p>{text("showcase.body")}</p></div>
        <div className={styles.showcaseGrid}>{shots.map((shot, index) => (
          <figure key={shot.file} className={styles.shot}>
            <button type="button" onClick={() => openShot(index + 1)} aria-label={`${text("interactive.enlarge")}: ${shot.title}`} aria-haspopup="dialog" className={styles.shotImage}>
              <Image src={`/assets/misc/pub-websites/${shot.file}`} alt={shot.alt} width={1280} height={800} sizes="(max-width: 700px) 100vw, 50vw" />
              <span className={styles.zoomHint}>{text("interactive.enlarge")}<Arrow /></span>
            </button>
            <figcaption><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><h3>{shot.title}</h3><Arrow /></figcaption>
          </figure>
        ))}</div>
        <div className={styles.referenceNote}><div><h3>{text("reference.title")}</h3><p>{text("reference.body")}</p><p className={styles.small}>{text("reference.note")}</p></div><a href="https://rocklore.de" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">{text("liveCta")}<Arrow /></a></div>
      </section>

      <section id="pub-package" className={styles.softBand}>
        <div className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}><div>{label("package")}<h2>{text("package.title")}</h2></div><p>{text("package.body")}</p></div>
          <div className={styles.packageGrid}>
            <div className={styles.baseCard}>
              <p className={styles.eyebrow}>{text("labels.base")}</p><p className={styles.price}>{text("package.price")}</p>
              <ul className={styles.checkList}>{list<string>("package.items").map(item => <li key={item}>{item}</li>)}</ul>
              <p className={styles.small}>{text("package.note")}</p>
              <a href="mailto:info@well-edge-creative.com" className="btn btn-primary">{text("labels.packageCta")}<Arrow /></a>
            </div>
            <div className={styles.extras}><h3>{text("package.extrasTitle")}</h3><p className={styles.small}>{text("labels.extras")}</p><dl>{list<{title: string; price: string}>("package.extras").map(extra => <div key={extra.title}><dt>{extra.title}</dt><dd>{extra.price}</dd></div>)}</dl></div>
          </div>
          <div className={styles.investment}><h3>{text("investment.title")}</h3><div><p>{text("investment.body")}</p><p className={styles.example}>{text("investment.example")}</p><p className={styles.small}>{text("investment.note")}</p></div></div>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.section} ${styles.careLayout}`}>
        <div>{label("care")}<h2>{text("care.title")}</h2><p className={styles.lead}>{text("care.body")}</p><p className={styles.small}>{text("care.note")}</p></div>
        <div className={styles.careGrid}>{list<Card>("care.plans").map((plan, index) => <div key={plan.title} className={`${styles.careCard} ${index === 1 ? styles.recommended : ""}`}>
          <p className={styles.planLabel}>{index === 1 ? text("care.recommended") : text("labels.essential")}</p>
          <h3>{plan.title}</h3><p className={styles.carePrice}>{plan.price}</p><p>{plan.body}</p>
        </div>)}</div>
      </section>

      <section className={styles.whyBand}><div className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.sectionHead}><div>{label("why")}<h2>{text("why.title")}</h2></div><p>{text("why.body")}</p></div>
        <ul className={styles.benefits}>{list<string>("why.items").map((item, index) => <li key={item}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ul>
      </div></section>

      <section className={`${styles.wrap} ${styles.section} ${styles.processLayout}`}>
        <div>{label("process")}<h2>{text("process.title")}</h2></div>
        <ol className={styles.steps}>{list<Card>("process.steps").map((step, index) => <li key={step.title}><span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
      </section>

      <section id="pub-faq" className={`${styles.wrap} ${styles.section} ${styles.faqLayout}`}>
        <div>{label("faq")}<h2>{text("faq.title")}</h2></div>
        <div className={styles.questions}>{list<FAQ>("faq.items").map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true" className={styles.plus}>+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className={`${styles.wrap} ${styles.about}`}>
        <div>{label("about")}<h2>{text("about.title")}</h2><p className={styles.lead}>{text("about.body")}</p><p className={styles.signature}>Jan <span>Well Edge Creative</span></p></div>
      </section>

      <section className={`${styles.wrap} ${styles.closing}`}><div className={styles.closingCard}>
        <p className={styles.eyebrow}>{text("labels.closing")}</p><h2>{text("closing.title")}</h2><p className={styles.lead}>{text("closing.body")}</p>{actions}
      </div></section>
      <dialog ref={galleryRef} className={styles.gallery} aria-labelledby="pub-gallery-title" onClick={event => { if (event.target === event.currentTarget) galleryRef.current?.close(); }} onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); moveShot(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); moveShot(-1); }
      }}>
        {currentShot && <div className={styles.galleryContent}>
          <div className={styles.galleryTop}><h2 id="pub-gallery-title">{currentShot.title}</h2><button type="button" onClick={() => galleryRef.current?.close()} aria-label={text("interactive.close")} autoFocus>×</button></div>
          <Image src={currentShot.src} alt={currentShot.alt} width={currentShot.width} height={currentShot.height} sizes="95vw" />
          <div className={styles.galleryControls}>
            <button type="button" onClick={() => moveShot(-1)}>{text("interactive.previous")}</button>
            <span aria-live="polite">{activeShot + 1} / {galleryImages.length}</span>
            <button type="button" onClick={() => moveShot(1)}>{text("interactive.next")}</button>
          </div>
        </div>}
      </dialog>
    </main>
    </>
  );
}
