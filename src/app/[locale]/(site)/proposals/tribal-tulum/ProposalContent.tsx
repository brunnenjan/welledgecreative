/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Zen_Old_Mincho } from "next/font/google";
import Header from "@/components/Header";
import ProposalMotion from "../ProposalMotion";
import { PHOTO } from "./data";
import styles from "../proposal.module.css";

/**
 * Proposal for Tribal Tulum (Tulum, Mexico), after Joanne's yes to the three ideas mail.
 * English only. Facts about their site were checked in a browser on 26 November 2026.
 * Prices: set `price` on a package to show it; without one the card says the fixed price is
 * confirmed in writing.
 */

const serif = Zen_Old_Mincho({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const CHECKED = "26 November 2026";
const MOCKUP = "/en/proposals/tribal-tulum/homepage";

const CHANGES = [
  { today: "One entrance for everyone", change: "Two doors: retreat or class", effect: "Each visitor is on the right page in one click." },
  { today: "Retreat dates out of date", change: "Four cards with length, price and current dates", effect: "Guests compare in seconds." },
  { today: "“Learn more” opens an empty form", change: "“Ask about dates” with two short questions", effect: "Inquiries you can answer at once." },
  { today: "Class passes go straight to payment", change: "Price shown first, in dollars and pesos", effect: "Fewer people leave at the checkout." },
  { today: "New tabs, two phone numbers", change: "Same tab, one number", effect: "Guests stay on their path." },
];

type Package = { name: string; tag: string; intro: string; items: string[]; featured?: boolean; price?: string };

const PACKAGES: Package[] = [
  {
    name: "Tune-up",
    tag: "On your current site",
    intro: "The changes from this page, built into the Squarespace site you already have.",
    items: [
      "Two doors on the home page",
      "Retreat overview with current dates",
      "“Ask about dates” form for the retreats",
      "Class passes with price and content",
      "Same-tab links, one phone number, pop-up tidied",
    ],
  },
  {
    name: "Everything",
    tag: "Recommended",
    intro: "Site and brand together, so the website, Instagram and the studio speak with one voice.",
    items: [
      "Everything in Tune-up and Brand",
      "Prices in dollars and pesos",
      "A page of its own for each retreat",
      "Launch support and a review of the first inquiries",
    ],
    featured: true,
  },
  {
    name: "Brand",
    tag: "Logo and identity",
    intro: "For a look people recognise before they read the name.",
    items: [
      "Logo and a logo set for every size",
      "Colour palette from sand, door and cenote",
      "Two typefaces and clear rules for using them",
      "Short brand guide for your team",
    ],
  },
];

function Arrow() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const cover = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } as const;

export default function ProposalContent() {
  return (
    <>
      <Header className={styles.header} />
      <main className={styles.page}>
        {/* Hero */}
        <section className={`${styles.wrap} ${styles.hero}`}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/en">Well Edge Creative</Link>
            <span aria-hidden="true">/</span>
            <span>Proposals</span>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Tribal Tulum</span>
          </nav>
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            Proposal for Tribal Tulum
          </p>
          <h1>
            A website that says
            <br />
            who it is for, and what to do next.
          </h1>
          <p className={styles.lead}>
            For Joanne: the three ideas I promised, shown on your own page, and a few more things I noticed on the way.
            You already have the hard part: a real studio, four retreats with honest prices, and photos of your own.
          </p>
          <p className={styles.byline}>Jan Brunnenkant · Well Edge Creative · November 2026</p>
          <nav className={styles.jumpNav} aria-label="Sections">
            <a href="#help">What I would change</a>
            <a href="#mockup">Your new homepage</a>
            <a href="#brand">A mark of your own</a>
            <a href="#options">Options</a>
          </nav>
        </section>

        {/* Changes and effects */}
        <section id="help" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              What I would change
            </p>
            <h2>Five changes, one job: make it easier to say yes to you.</h2>
            <p>Checked on your site on {CHECKED}.</p>
          </div>
          <div className={styles.changeTable} role="table" aria-label="What changes and what it does">
            <div className={styles.changeHead} role="row">
              <span role="columnheader">Today</span>
              <span role="columnheader">What I would change</span>
              <span role="columnheader">What it does for you</span>
            </div>
            {CHANGES.map((c) => (
              <div key={c.today} className={styles.changeRow} role="row">
                <p role="cell" className={styles.today}>
                  <span className={styles.cellLabel}>Today</span>
                  {c.today}
                </p>
                <p role="cell">
                  <span className={styles.cellLabel}>What I would change</span>
                  {c.change}
                </p>
                <p role="cell" className={styles.effect}>
                  <span className={styles.cellLabel}>What it does for you</span>
                  {c.effect}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Homepage mockup */}
        <section id="mockup" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                A first look · homepage only
              </p>
              <h2>Your new homepage</h2>
              <p>
                Built with your own photos, words and prices. Nothing was added. Scroll inside it, or open it full
                screen.
              </p>
            </div>
            <p className={styles.draftNote}>
              <strong>A first mockup, not a finished design.</strong> It shows the direction: the structure and the
              feel. Peso amounts are rounded at the exchange rate of {CHECKED}, only to show how both currencies could
              sit side by side.
            </p>
            <div className={styles.browser}>
              <div className={styles.browserBar}>
                <span className={styles.lights}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.address}>tribaltulum.com</span>
                <a href={MOCKUP} target="_blank" rel="noopener" className={styles.fullscreen}>
                  Open full screen ↗
                </a>
              </div>
              <iframe src={MOCKUP} title="Homepage mockup for Tribal Tulum" className={styles.frame} loading="lazy" />
              {/* On phones a page inside a page cannot be scrolled well, so it opens on its own. */}
              <a href={MOCKUP} className={styles.phonePoster}>
                <img src={PHOTO.sand} alt="" style={cover} />
                <span className={styles.posterShade} />
                <span className={styles.posterText}>
                  <span className={`${styles.posterTitle} ${serif.className}`}>Yoga retreats and daily classes in Tulum</span>
                  <span className={styles.posterButton}>Open the homepage mockup →</span>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Brand */}
        <section id="brand" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              Your brand · a thought for later
            </p>
            <h2>A mark of your own.</h2>
            <p>
              Today the name stands as plain text. A simple mark would let people recognise Tribal Tulum on Instagram,
              on a flyer and at the door, before they read the name. I have not drawn one here on purpose: a logo
              should come out of a conversation with you, not out of a guess.
            </p>
          </div>

          <div className={styles.brandBoard}>
            <div className={`${styles.brandTile} ${styles.tileLogo}`} style={{ background: "#edebe3", color: "#0e5a5f" }}>
              <div className={`${styles.lockup} ${serif.className}`}>
                <span>
                  Tribal Tulum
                  <small>Yoga · Retreats</small>
                </span>
              </div>
              <span className={styles.tileLabel}>Your name, in the typeface you already use</span>
            </div>
            <div className={`${styles.brandTile} ${styles.tileDark}`} style={{ background: "#2a211c", color: "#f3dccb" }}>
              <div className={`${styles.stacked} ${serif.className}`}>
                <span>Tribal Tulum</span>
                <small>Yoga · Retreats</small>
              </div>
              <span className={styles.tileLabel}>On a dark background</span>
            </div>
            <div className={`${styles.brandTile} ${styles.tileTeak}`} style={{ background: "#0e5a5f", color: "#fff" }}>
              <span
                aria-hidden="true"
                style={{ width: 84, height: 84, borderRadius: "50%", border: "1.5px dashed rgba(255,255,255,.7)", display: "block" }}
              />
              <span className={styles.tileLabel}>Your mark: developed with you</span>
            </div>
          </div>
        </section>

        {/* Options */}
        <section id="options" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={`${styles.sectionHead} ${styles.center}`}>
              <p className={`${styles.eyebrow} ${styles.centerEyebrow}`}>
                <span className={styles.dot} />
                Your options
              </p>
              <h2>Start small on the site you have, or do it all at once.</h2>
            </div>
            <div className={styles.packages}>
              {PACKAGES.map((p) => (
                <article key={p.name} className={`${styles.package} ${p.featured ? styles.featured : ""}`}>
                  <span className={styles.tag}>{p.tag}</span>
                  <h3>{p.name}</h3>
                  {p.price && <p className={styles.price}>{p.price}</p>}
                  <p className={styles.packageIntro}>{p.intro}</p>
                  <ul>
                    {p.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className={styles.priceNote}>
              Every package is a fixed price, confirmed in writing before we start. No hourly surprises.
            </p>
          </div>
        </section>

        {/* Close */}
        <section className={styles.darkBand}>
          <div className={`${styles.wrap} ${styles.section} ${styles.close}`}>
            <h2>Let’s make Tribal Tulum as easy to book as it is to love.</h2>
            <p>
              Thank you, Joanne, for your yes. The ideas on this page are yours to keep. If you would like a hand with
              them, I’d love to walk you through this in a short call.
            </p>
            <div className={styles.actions}>
              <Link href="/en/contact?type=discovery-call" className="btn btn-primary">
                Book a 30-minute call <Arrow />
              </Link>
              <a href="mailto:jan@welledgecreative.com" className={styles.lightLink}>
                jan@welledgecreative.com
              </a>
              <a href="https://wa.me/4915789150323" className={styles.lightLink}>
                WhatsApp
              </a>
            </div>
            <p className={styles.sign}>Jan Brunnenkant · Branding & Web Design · Well Edge Creative</p>
          </div>
        </section>
      </main>
      <ProposalMotion
        selector={[styles.shortItem, styles.card, styles.changeRow, styles.browser, styles.brandTile, styles.swatch, styles.app, styles.caseCard, styles.package, styles.extra]
          .map((c) => `.${c}`)
          .join(",")}
      />
    </>
  );
}
