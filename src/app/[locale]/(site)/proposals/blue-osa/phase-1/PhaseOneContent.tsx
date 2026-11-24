import Link from "next/link";
import { Newsreader } from "next/font/google";
import Header from "@/components/Header";
import ProposalMotion from "../../ProposalMotion";
import DesktopFrame from "./DesktopFrame";
import styles from "../../proposal.module.css";
import own from "./phase1.module.css";

/**
 * Phase 1 for Blue Osa: the 200-hour page, for the call on 25 November and as the written answers
 * Aaron asked for. The page itself is shown twice, at desktop and at phone width, both live and
 * scrollable. Every statement about speed and search points to Google's own documentation, and
 * the numbers for today are from PageSpeed Insights on 19 November 2026. Nothing promises rankings
 * or bookings; the promise is that the page does not get worse, with checks before and after.
 */

const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"] });

const PAGE = "/en/proposals/blue-osa/200-hour-v3";

const POINTS = [
  {
    n: "1",
    title: "Your rankings stay protected",
    items: [
      "The exact phrase “200 hour yoga teacher training Costa Rica” stays in the title, the H1 and the main headings.",
      "The URL and the meta description stay unchanged.",
      "All existing schema stays: Course, FAQ and anything else Rank Math outputs today.",
      "Everything stays real text that search engines can read. No text inside images.",
    ],
  },
  {
    n: "2",
    title: "Your team updates dates and spots",
    items: [
      "Dates and spots live in one Beaver Builder module, reused wherever dates appear. Change it once, it updates everywhere.",
      "Your Apply, Book Now and call booking links stay exactly as they are.",
      "A short guide for your team: dates, spots, prices and photos.",
      "The exact setup I confirm once I've seen your staging site.",
    ],
  },
  {
    n: "3",
    title: "Galleries, prices and the full FAQ",
    items: [
      "Room and food galleries with 10 photos in view on desktop and 8 on phones, every photo opening full screen.",
      "All three prices, the $300 deposit and your full guarantee.",
      "The full FAQ: every question from your current page, with FAQ schema.",
    ],
  },
  {
    n: "4",
    title: "Mobile, speed and a fixed price",
    items: [
      "The page above, at phone width: scroll it like on a phone. Book a call and Apply stay at the bottom of every screen.",
      "Speed targets and how they are checked: see below.",
      "A fixed price for Phase 1 and the price of an extra revision round: see below.",
    ],
  },
];

const TODAY = [
  { label: "Performance", mobile: "68", desktop: "66" },
  { label: "Largest content (lab)", mobile: "2.8 s", desktop: "0.6 s" },
  { label: "Real visitors, Core Web Vitals", mobile: "Not passed (LCP 2.6 s)", desktop: "Passed (LCP 2.0 s)" },
  { label: "SEO score", mobile: "100", desktop: "100" },
];

const GOOGLE = [
  {
    title: "What “fast enough” means",
    text: "Google's Core Web Vitals: the largest content should appear within 2.5 seconds, the page should react to a tap within 200 ms, and the layout should not jump (CLS 0.1 or less), for at least 75% of visits. Your page misses the first one on phones today, at 2.6 seconds.",
    source: "web.dev: Web Vitals",
    href: "https://web.dev/articles/vitals",
  },
  {
    title: "Relevance comes first",
    text: "Google states that Search always shows the most relevant content first, even when the page experience is not great, and that a good page experience helps where many helpful pages compete. So the content and your phrase stay, and speed is improved on top.",
    source: "Google Search Central: Page experience",
    href: "https://developers.google.com/search/docs/appearance/page-experience",
  },
  {
    title: "Why the hero film is handled carefully",
    text: "For a video, Google measures the poster image or the first frame as the largest content. A heavy film at the top can slow that down. So the new page shows a light picture first, and the film only joins on larger screens after the page has loaded. Phones get the picture.",
    source: "web.dev: Largest Contentful Paint",
    href: "https://web.dev/articles/lcp",
  },
  {
    title: "The title stays the main source",
    text: "Google uses the page title as the main source for the title shown in search results. That's why the title, with your phrase, stays exactly as it is.",
    source: "Google Search Central: Title links",
    href: "https://developers.google.com/search/docs/appearance/title-link",
  },
  {
    title: "FAQ schema: kept, without false hopes",
    text: "Google no longer shows FAQ rich results for most sites; it now limits them to well-known government and health sites. Your FAQ schema still stays, because it describes the page clearly to search engines and AI tools, but it won't bring back the FAQ dropdowns in Google.",
    source: "Google Search Central: FAQ structured data",
    href: "https://developers.google.com/search/docs/appearance/structured-data/faqpage",
  },
];

const SAFEGUARDS = [
  { title: "Before anything changes", text: "I record today's title, meta, headings, URL, canonical and schema, and run PageSpeed three times on mobile and desktop. With access to Search Console, I also note the clicks and position for your main phrase." },
  { title: "On staging", text: "The new page is built and tested on a copy of your site. Schema is checked with Google's Rich Results Test and the Schema validator." },
  { title: "The launch rule", text: "The page only goes live if it scores at least as well as today on mobile and desktop, and every SEO point matches the list from before. If it doesn't, it stays on staging until it does." },
  { title: "After launch", text: "PageSpeed on the live page the same day. Search Console checks after 1, 2 and 4 weeks. Your current page is saved, so it can be switched back within the hour if anything looks worse." },
];

const TARGETS = [
  { metric: "Performance, mobile", today: "68", target: "85 or higher" },
  { metric: "Performance, desktop", today: "66", target: "90 or higher" },
  { metric: "Largest content, mobile", today: "2.8 s (lab) · 2.6 s (real visitors)", target: "under 2.5 s" },
  { metric: "Layout shift", today: "0.003", target: "stays under 0.1" },
];

const INCLUDED = [
  "The page built on staging in Beaver Builder, desktop and mobile",
  "Room and food galleries, the comparison table and the full FAQ with schema",
  "Dates and spots as one editable module, and a short guide for your team",
  "SEO checks before and after: title, meta, headings, URL, schema",
  "Image optimization and the speed work, with the checks above",
  "Two rounds of revisions",
  "Launch, and a check of the live page after launch",
];

const NEED = [
  "Access to a staging copy (WordPress admin with Beaver Builder and Rank Math)",
  "Read access to Google Search Console, if possible, for the before and after",
  "Which room photos show the beachfront suites and which the garden rooms",
  "Your call booking link, so the call buttons open it directly",
];

export default function PhaseOneContent() {
  return (
    <>
      <Header className={styles.header} />
      <main className={styles.page}>
        {/* Hero */}
        <section className={`${styles.wrap} ${styles.hero}`}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/en">Well Edge Creative</Link>
            <span aria-hidden="true">/</span>
            <Link href="/en/proposals/blue-osa/call">Blue Osa</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Phase 1</span>
          </nav>
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            Phase 1 · the 200-hour page
          </p>
          <h1>
            Faster, clearer, <em className={serif.className}>and never worse.</em>
          </h1>
          <p className={styles.lead}>
            Your four points answered, the page at desktop and phone size, and how speed and search are protected, with Google&apos;s
            own sources.
          </p>
          <p className={styles.byline}>For Aaron and the Blue Osa team · Jan Brunnenkant, Well Edge Creative · November 2026</p>
          <nav className={styles.jumpNav} aria-label="Sections">
            <a href="#page">The page</a>
            <a href="#points">Your four points</a>
            <a href="#evidence">Speed and search</a>
            <a href="#price">Fixed price</a>
            <a href="#next">Next steps</a>
          </nav>
        </section>

        {/* The page, twice */}
        <section id="page" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                The page · third version
              </p>
              <h2>On a laptop and on a phone. Scroll both.</h2>
              <p>Both are the real page, live: tap the modules, open the galleries, try the buttons.</p>
            </div>
            <div className={own.devices}>
              <div className={own.desktop}>
                <div className={styles.browserBar}>
                  <span className={styles.lights}>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.address}>blueosa.com/14-day-200-hour-yoga-teacher-training-costa-rica/</span>
                  <a href={PAGE} target="_blank" rel="noopener" className={styles.fullscreen}>
                    Open full screen ↗
                  </a>
                </div>
                <DesktopFrame src={PAGE} title="The new 200-hour page at desktop width" className={own.desktopView} />
              </div>
              <div className={own.phoneCol}>
                <div className={own.phone}>
                  <iframe src={PAGE} title="The new 200-hour page at phone width" loading="lazy" />
                </div>
                <p className={own.phoneNote}>Phone width, 375 px</p>
              </div>
            </div>
            <a href={PAGE} className={own.openMobile}>
              Open the page ↗
            </a>
          </div>
        </section>

        {/* Four points */}
        <section id="points" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              Your four points
            </p>
            <h2>Answered, one by one.</h2>
          </div>
          <ol className={own.points}>
            {POINTS.map((p) => (
              <li key={p.n} className={own.point}>
                <span className={own.num}>{p.n}</span>
                <h3>{p.title}</h3>
                <ul>
                  {p.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* Evidence */}
        <section id="evidence" className={styles.darkBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                Speed and search
              </p>
              <h2>Where the page stands, what Google says, and how it never gets worse.</h2>
            </div>

            <h3 className={own.subhead}>Today, measured with Google PageSpeed Insights on 19 November 2026</h3>
            <div className={own.tableWrap}>
              <table className={own.table}>
                <thead>
                  <tr>
                    <th scope="col"><span className="sr-only">Measure</span></th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Desktop</th>
                  </tr>
                </thead>
                <tbody>
                  {TODAY.map((t) => (
                    <tr key={t.label}>
                      <th scope="row">{t.label}</th>
                      <td>{t.mobile}</td>
                      <td>{t.desktop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={own.note}>
              The SEO score of 100 means the technical basics are in place. It is the starting point we protect, not something to improve.
            </p>

            <h3 className={own.subhead}>What Google says</h3>
            <div className={own.sources}>
              {GOOGLE.map((g) => (
                <article key={g.title}>
                  <h4>{g.title}</h4>
                  <p>{g.text}</p>
                  <a href={g.href} target="_blank" rel="noopener">
                    Source: {g.source} ↗
                  </a>
                </article>
              ))}
            </div>

            <h3 className={own.subhead}>Targets</h3>
            <div className={own.tableWrap}>
              <table className={own.table}>
                <thead>
                  <tr>
                    <th scope="col">Measure</th>
                    <th scope="col">Today</th>
                    <th scope="col">Target</th>
                  </tr>
                </thead>
                <tbody>
                  {TARGETS.map((t) => (
                    <tr key={t.metric}>
                      <th scope="row">{t.metric}</th>
                      <td>{t.today}</td>
                      <td className={own.target}>{t.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={own.note}>
              The targets cover the page itself: layout, images, fonts and its own code. Scripts from other services (booking, reviews,
              chat, tracking) load from their servers and can pull a score down. If one of them is the reason a target is missed, I show
              you which one and what it costs. The final targets are confirmed in writing once I&apos;ve seen your staging site.
            </p>

            <h3 className={own.subhead}>How the page never gets worse</h3>
            <ol className={own.safe}>
              {SAFEGUARDS.map((s, i) => (
                <li key={s.title}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Price */}
        <section id="price" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              Fixed price
            </p>
            <h2>Phase 1: the 200-hour page.</h2>
          </div>
          <div className={own.price}>
            <div className={own.priceCard}>
              <span>Fixed price</span>
              <strong>$3,400</strong>
              <p>Each extra round of revisions: $350</p>
              <p>50% to start, 50% on your final approval before launch.</p>
            </div>
            <div>
              <h3>Included</h3>
              <ul className={own.check}>
                {INCLUDED.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className={own.small}>
                After the final payment, the custom design and the finished page belong to Blue Osa. Your photos and content were always
                yours. I&apos;d only ask to show the project in my portfolio.
              </p>
            </div>
          </div>
        </section>

        {/* Next */}
        <section id="next" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section} ${own.next}`}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                Next steps
              </p>
              <h2>What I need to start.</h2>
              <ul className={own.need}>
                {NEED.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
            <ol className={own.timeline}>
              <li><strong>Our call</strong>We go through this page and your questions.</li>
              <li><strong>After the call</strong>You confirm Phase 1 and send staging access.</li>
              <li><strong>Start</strong>The first 50%, then the record of today&apos;s page and the build on staging.</li>
              <li><strong>Launch</strong>After your final approval, and only when the checks above are met.</li>
            </ol>
          </div>
        </section>

        <div className={styles.wrap}>
          <p className={own.rights}>Design concept by Well Edge Creative, shared for your review. The design passes to Blue Osa with the project.</p>
        </div>
      </main>
      <ProposalMotion selector={[own.point, own.sources, own.safe, own.price, styles.browser].map((c) => `.${c}`).join(",")} />
    </>
  );
}
