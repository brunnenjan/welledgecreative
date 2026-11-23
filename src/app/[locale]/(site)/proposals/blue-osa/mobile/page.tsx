import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import Header from "@/components/Header";
import ProposalScroll from "../../ProposalScroll";
import styles from "../../proposal.module.css";
import own from "./mobile.module.css";

/**
 * The 200-hour page (third version) as it looks on a phone. Each frame is the real page at phone
 * width, opened at one section, and can be scrolled. Asked for by Aaron for the call on 25 November.
 */

const PAGE = "/en/proposals/blue-osa/200-hour-v3";

const SCREENS = [
  { anchor: "top", title: "First screen", text: "The full phrase in the H1. Book a call and Apply stay one tap away at the bottom, on every screen." },
  { anchor: "dates-title", title: "Dates", text: "Every date with spots left, and Apply and Book now side by side." },
  { anchor: "curriculum", title: "Curriculum", text: "The four modules, each opening to its full list with a tap." },
  { anchor: "included", title: "Rooms", text: "Eight photos in view, all of them a tap away in full screen." },
  { anchor: "investment", title: "Your investment", text: "All three prices, the guarantee, and what is and isn't included." },
  { anchor: "faq", title: "Full FAQ", text: "Every question from your current page, in four groups." },
];

export const metadata: Metadata = {
  title: "Blue Osa × Well Edge Creative | The 200-hour page on a phone",
  description: "The new Blue Osa 200-hour page at phone size, section by section.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: `${SITE_URL}/en/proposals/blue-osa/mobile` },
};

export default function BlueOsaMobilePage() {
  return (
    <div className="page-fade">
      <ProposalScroll />
      <Header className={styles.header} />
      <main className={styles.page}>
        <section className={`${styles.wrap} ${styles.hero}`}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/en">Well Edge Creative</Link>
            <span aria-hidden="true">/</span>
            <Link href="/en/proposals/blue-osa/call">Blue Osa</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">On a phone</span>
          </nav>
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            Mobile view · the 200-hour page
          </p>
          <h1>The new page on a phone.</h1>
          <p className={styles.lead}>
            Each frame is the real page at phone width, opened at one section. Scroll inside any of them, or open the page on your
            own phone.
          </p>
          <div className={own.actions}>
            <a href={PAGE} target="_blank" rel="noopener" className={own.open}>
              Open the page ↗
            </a>
          </div>
        </section>

        <section className={`${styles.wrap} ${own.grid}`}>
          {SCREENS.map((s) => (
            <figure key={s.anchor} className={own.screen}>
              <div className={own.phone}>
                <iframe src={`${PAGE}#${s.anchor}`} title={`The 200-hour page on a phone: ${s.title}`} loading="lazy" />
              </div>
              <figcaption>
                <strong>{s.title}</strong>
                {s.text}
              </figcaption>
            </figure>
          ))}
        </section>

        <div className={styles.wrap}>
          <p className={own.rights}>Design concept by Well Edge Creative, shared for your review. The design passes to Blue Osa with the project.</p>
        </div>
      </main>
    </div>
  );
}
