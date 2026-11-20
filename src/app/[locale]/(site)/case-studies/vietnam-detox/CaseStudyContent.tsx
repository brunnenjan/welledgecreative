"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/components/providers/I18nProvider";
import { BRAND_COLORS, COPY, SITE } from "./content";
import styles from "./vietnamdetox.module.css";

/**
 * Vietnam Detox case study: the newest retreat project, with the live site. Their own colours and
 * type carry the page (forest, ivory, ember; Cormorant Garamond and Be Vietnam Pro). Screens are
 * from vietnamdetox.com, taken on 20 November 2026.
 */

const IMG = "/case-studies/vietnam-detox";
const PROJECTS = "/assets/misc/projects";

function Arrow() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CaseStudyContent({ fonts }: { fonts: string }) {
  const { locale } = useI18n();
  const c = COPY[locale === "de" ? "de" : "en"];

  return (
    <>
      <Header className={styles.header} />
      <main className={`${styles.page} ${fonts}`}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link href={`/${locale}`}>Well Edge Creative</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/${locale}/work`}>{c.crumbWork}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Vietnam Detox</span>
            </nav>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h1>{c.title}</h1>
            <p className={styles.lead}>{c.lead}</p>
            <a href={SITE} target="_blank" rel="noopener" className={styles.visit}>
              {c.visit} <Arrow />
            </a>
          </div>
          <div className={styles.wrap}>
            {/* The live homepage, desktop and phone, in plain frames. */}
            <div className={styles.stage}>
              <div className={styles.browser}>
                <div className={styles.browserBar}>
                  <i />
                  <i />
                  <i />
                  <span>vietnamdetox.com</span>
                </div>
                <Image src={`${IMG}/home-hero.webp`} alt={c.heroAlt} width={1440} height={796} priority sizes="(max-width: 900px) 100vw, 900px" />
              </div>
              <div className={`${styles.phone} ${styles.stagePhone}`}>
                <Image src={`${IMG}/home-m.webp`} alt={c.phoneAlts[0]} width={780} height={1688} priority sizes="220px" />
              </div>
            </div>
          </div>
          <dl className={`${styles.wrap} ${styles.facts}`}>
            {c.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Where we started */}
        <section className={styles.band}>
          <div className={`${styles.wrap} ${styles.split}`}>
            <div>
              <p className={styles.eyebrow}>{c.startEyebrow}</p>
              <h2>{c.startTitle}</h2>
            </div>
            <div className={styles.prose}>
              {c.start.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* What I did */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>{c.workEyebrow}</p>
            <h2>{c.workTitle}</h2>
            <ol className={styles.phases}>
              {c.phases.map((p, i) => (
                <li key={p.title}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The retreats */}
        <section className={styles.forest}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>{c.retreatsEyebrow}</p>
            <h2>{c.retreatsTitle}</h2>
            <p className={styles.intro}>{c.retreatsIntro}</p>
            <ul className={styles.retreats}>
              {c.retreats.map((r) => (
                <li key={r.name}>
                  <h3>{r.name}</h3>
                  <p className={styles.place}>{r.place}</p>
                  <p>{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Screens */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>{c.shotsEyebrow}</p>
            <h2>{c.shotsTitle}</h2>
            <div className={styles.shots}>
              {c.shots.map((s) => (
                <figure key={s.img} className={styles.shot}>
                  <div className={styles.browser}>
                    <div className={styles.browserBar}>
                      <i />
                      <i />
                      <i />
                    </div>
                    <Image src={`${IMG}/${s.img}.webp`} alt={s.alt} width={1440} height={900} sizes="(max-width: 900px) 100vw, 580px" />
                  </div>
                  <figcaption>
                    <strong>{s.label}</strong>
                    {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className={styles.phones}>
              <p>{c.phoneCaption}</p>
              <div className={styles.phoneRow}>
                {(["home-m", "an-m"] as const).map((img, i) => (
                  <div key={img} className={styles.phone}>
                    <Image src={`${IMG}/${img}.webp`} alt={c.phoneAlts[i]} width={780} height={1688} sizes="230px" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brand */}
        <section className={styles.band}>
          <div className={`${styles.wrap} ${styles.brand}`}>
            <div>
              <p className={styles.eyebrow}>{c.brandEyebrow}</p>
              <h2>{c.brandTitle}</h2>
              <p className={styles.brandText}>{c.brandText}</p>
              <ul className={styles.swatches}>
                {BRAND_COLORS.map((col) => (
                  <li key={col.hex} style={{ background: col.hex, color: col.light ? "#fefaf2" : "#1e3d20" }}>
                    <strong>{col.name}</strong>
                    <span>{col.hex}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.type}>
                <span className={styles.typeSample}>Aa</span>
                {c.brandType}
              </p>
            </div>
            <div className={styles.logo}>
              <Image src={`${PROJECTS}/vietnam-detox-logo-2026.webp`} alt={c.logoAlt} width={2286} height={1501} sizes="(max-width: 900px) 70vw, 340px" />
            </div>
          </div>
        </section>

        {/* What the site does now */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>{c.nowEyebrow}</p>
            <h2>{c.nowTitle}</h2>
            <ul className={styles.now}>
              {c.now.map((n) => (
                <li key={n.title}>
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                </li>
              ))}
            </ul>
            <p className={styles.teamNote}>{c.teamNote}</p>
          </div>
        </section>

        {/* Close */}
        <section className={styles.close}>
          <div className={styles.wrap}>
            <h2>{c.closeTitle}</h2>
            <p>{c.closeText}</p>
            <div className={styles.actions}>
              <Link href={`/${locale}/contact?type=discovery-call`} className="btn btn-primary">
                {c.closeCta} <Arrow />
              </Link>
              <a href={SITE} target="_blank" rel="noopener" className={styles.lightLink}>
                {c.closeVisit}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
