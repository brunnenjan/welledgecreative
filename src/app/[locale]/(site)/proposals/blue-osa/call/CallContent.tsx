import Image from "next/image";
import Link from "next/link";
import { Newsreader } from "next/font/google";
import Header from "@/components/Header";
import ProposalMotion from "../../ProposalMotion";
import styles from "../../proposal.module.css";
import own from "./call.module.css";

/**
 * The page for the call with Aaron: his feedback of 18 November, point by point, each with what
 * changed and a link to the exact place in the second mockup. Prices and terms are exactly the
 * ones Jan sent on 19 November. No results, rankings or booking numbers are promised.
 */

const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"] });

const IMG = "/proposals/blue-osa";
const MOCKUP = "/en/proposals/blue-osa/200-hour";

const FEEDBACK = [
  {
    n: "1",
    title: "The depth stays",
    asked: "Room and food galleries, the 14-day vs traditional comparison, the full guarantee, “is this right for you”, an itemized “what to expect”, the full FAQ, and “Curriculum” as the label.",
    done: [
      "Room gallery with 14 photos and food gallery with 10, each opening full screen",
      "The full comparison as a real table, readable for search engines",
      "Your guarantee, word for word, next to the price",
      "“Is this program right for you?” and “What to expect”, step by step",
      "Your full FAQ in four groups, with every question from today's page",
      "Nothing from today's page is lost: why choose, the place film, your team, Google reviews and the contact form are all there",
      "“Curriculum”, with every module opening to its full list",
    ],
    links: [
      { label: "Curriculum", href: `${MOCKUP}#curriculum` },
      { label: "Galleries", href: `${MOCKUP}#included` },
      { label: "Full FAQ", href: `${MOCKUP}#faq` },
    ],
  },
  {
    n: "2",
    title: "Options and the path",
    asked: "Upcoming dates shown clearly, a link to the 300-hour training, and an easy way to compare your trainings.",
    done: [
      "All five 2027 dates right below the first screen, with spots left",
      "“From RYT-200 to RYT-500”: the 200-hour and 300-hour side by side",
      "A short note for people who are already certified, early on the page",
    ],
    links: [
      { label: "Dates", href: `${MOCKUP}#top` },
      { label: "The path", href: `${MOCKUP}#path` },
    ],
  },
  {
    n: "3",
    title: "Your rankings",
    asked: "“200 hour yoga teacher training Costa Rica” in the H1 and headings, the URL, the Course and FAQ schema, text search engines can read, and staging first.",
    done: [
      "H1 word for word: 200 Hour Yoga Teacher Training Costa Rica, with 14-Day Intensive YTT below",
      "The phrase kept in the main headings and the body text",
      "Everything is real text and real tables, no text in images",
      "Switch on “Show SEO notes” in the mockup to see each point on the page",
    ],
    links: [{ label: "Open with SEO notes", href: `${MOCKUP}?seo=1#top` }],
  },
  {
    n: "4",
    title: "Apply, Book a call, Book Now",
    asked: "Your calls close 30 to 50%, so the discovery call matters as much as Apply. Book Now stays next to Apply.",
    done: [
      "“Book a call” and “Apply now” side by side in the menu and on the first screen",
      "Every date has Apply and Book now, using your existing links",
      "A call band where questions come up, and your call booking near the end",
      "On phones, Book a call and Apply stay one tap away at the bottom",
    ],
    links: [{ label: "The three ways in", href: `${MOCKUP}#investment` }],
  },
  {
    n: "5",
    title: "Price after the details",
    asked: "Easy to find, but not leading. “Your investment” in the menu, the price after the program details, maybe a small all-inclusive line near the dates.",
    done: [
      "“Your investment” in the menu, the price section after the program details",
      "No price at the top. A small all-inclusive line near the dates links down to it",
      "A switch in the mockup turns that line on and off, so we can look at both layouts",
    ],
    links: [{ label: "Your investment", href: `${MOCKUP}#investment` }],
  },
];

const ANSWERS = [
  {
    q: "What is the price range, and what does it include?",
    a: "The 200-hour page about $2,800 to $3,500. All three pages (200-hour, 300-hour and the training overview) about $5,000 to $6,500, with one consistent design and including SEO and AI discoverability work. Included in both: desktop and mobile layouts, image and gallery optimization, your existing booking links kept, SEO migration checks, staging and launch testing, and two review rounds. These are preliminary ranges: after looking at your setup, I send a fixed price.",
  },
  {
    q: "Would you build in our WordPress, or hand the design to your team?",
    a: "My preference is to do both design and build in your WordPress, with Beaver Builder where practical, so your team can keep editing the content afterwards. A design handover is possible too, at an adjusted price.",
  },
  {
    q: "Mobile, page speed and the Apply and booking links?",
    a: "The page is designed for phones as much as for desktop. I measure the speed before and after with Google PageSpeed. Today the 200-hour page scores 68 on mobile and 66 on desktop for performance. Your Apply, Book Now and call booking links stay exactly as they are.",
  },
  {
    q: "Who owns the design files and photos?",
    a: "After the final payment, the custom design files and the finished pages belong to Blue Osa. Your photos and content were always yours. I'd only ask to show the project in my portfolio.",
  },
  {
    q: "Would the 300-hour page and the overview follow the same design?",
    a: "Yes. They use the same design system and building blocks. We can also go in phases: the 200-hour page first, then the others.",
  },
];

const STEPS = [
  { title: "Staging copy", text: "A copy of your site where everything is built and tested, while the live site stays untouched." },
  { title: "Check what ranks today", text: "Rank Math settings, schema, headings, URL and the current content, written down before anything changes." },
  { title: "Build and review", text: "The page is built on staging. You review it in two rounds, on your phone and your laptop." },
  { title: "Test, then launch", text: "Links, forms, speed and schema are tested on staging. Then the page goes live under the same URL." },
];

const NEED = [
  "Access to a staging copy (WordPress, Beaver Builder, Rank Math)",
  "Which room photos show the beachfront suites and which the garden rooms",
  "Your call booking link, so the call button opens it directly",
  "The training schools you've been looking at for the overview page",
  "Whether to start with the 200-hour page or all three",
];

export default function CallContent() {
  return (
    <>
      <Header className={styles.header} />
      <main className={styles.page}>
        {/* Hero */}
        <section className={`${styles.wrap} ${styles.hero}`}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/en">Well Edge Creative</Link>
            <span aria-hidden="true">/</span>
            <Link href="/en/proposals/blue-osa">Blue Osa proposal</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Your feedback, built in</span>
          </nav>
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            For our call · Blue Osa × Well Edge Creative
          </p>
          <h1>
            Your feedback, <em className={serif.className}>built in.</em>
          </h1>
          <p className={styles.lead}>
            Aaron, thank you for the detailed notes. Instead of only answering them, I put every point into a second version of
            the 200-hour page, so we can look at the real thing together.
          </p>
          <p className={styles.byline}>Jan Brunnenkant · Well Edge Creative · November 2026</p>
          <nav className={styles.jumpNav} aria-label="Sections">
            <a href="#page">The new page</a>
            <a href="#feedback">Your five points</a>
            <a href="#questions">Your questions</a>
            <a href="#how">How we&apos;d build it</a>
            <a href="#next">Next steps</a>
          </nav>
        </section>

        {/* The page */}
        <section id="page" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                Second version · the 200-hour page
              </p>
              <h2>Everything you asked for, on one page.</h2>
              <p>Your fonts, colours, photos, dates, prices, guarantee and FAQ. Scroll inside it, or open it full screen. The switches at the bottom left show the SEO notes and the two price layouts.</p>
            </div>
            <div className={styles.browser}>
              <div className={styles.browserBar}>
                <span className={styles.lights}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.address}>blueosa.com/14-day-200-hour-yoga-teacher-training-costa-rica/</span>
                <a href={MOCKUP} target="_blank" rel="noopener" className={styles.fullscreen}>
                  Open full screen ↗
                </a>
              </div>
              <iframe src={MOCKUP} title="Second mockup of the Blue Osa 200-hour page" className={styles.frame} loading="lazy" />
              {/* On phones a page inside a page cannot be scrolled well, so it opens on its own. */}
              <a href={MOCKUP} className={styles.phonePoster}>
                <Image src={`${IMG}/drone-poster.webp`} alt="" fill sizes="100vw" />
                <span className={styles.posterShade} />
                <span className={styles.posterText}>
                  <span className={`${styles.posterTitle} ${serif.className}`}>
                    200 Hour Yoga Teacher Training Costa Rica, <em>14-Day Intensive YTT</em>
                  </span>
                  <span className={`${styles.posterButton} ${own.posterButton}`}>Open the page →</span>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Five points */}
        <section id="feedback" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              Your five points
            </p>
            <h2>What you asked for, and where it is now.</h2>
          </div>
          <ol className={own.points}>
            {FEEDBACK.map((f) => (
              <li key={f.n} className={own.point}>
                <span className={own.num}>{f.n}</span>
                <div className={own.pointHead}>
                  <h3>{f.title}</h3>
                  <p className={own.asked}>
                    <span>You asked</span>
                    {f.asked}
                  </p>
                </div>
                <div className={own.pointBody}>
                  <span className={own.doneLabel}>In the new page</span>
                  <ul className={own.done}>
                    {f.done.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <div className={own.links}>
                    {f.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener">
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Questions */}
        <section id="questions" className={styles.darkBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                Your questions
              </p>
              <h2>Straight answers.</h2>
            </div>
            <div className={own.answers}>
              {ANSWERS.map((a) => (
                <div key={a.q}>
                  <h3>{a.q}</h3>
                  <p>{a.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How */}
        <section id="how" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              How we&apos;d build and test it
            </p>
            <h2>Your live page stays untouched until everything is tested.</h2>
          </div>
          <ol className={own.steps}>
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className={own.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className={own.speed}>
            <div>
              <h3>Where the 200-hour page stands today</h3>
              <p>Google PageSpeed Insights, 19 November 2026. The starting point we measure against after launch.</p>
            </div>
            <dl>
              <div><dt>Performance</dt><dd>68 mobile · 66 desktop</dd></div>
              <div><dt>Accessibility</dt><dd>74</dd></div>
              <div><dt>SEO</dt><dd>100</dd></div>
              <div><dt>Real-visitor check, mobile</dt><dd>Not passed (largest content 2.6 s)</dd></div>
            </dl>
          </div>
        </section>

        {/* Overview */}
        <section className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section} ${own.overview}`}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                The training overview
              </p>
              <h2>Let&apos;s shape it from the examples you like.</h2>
              <p className={own.muted}>
                The path block on the new page is the first building block: the trainings side by side, with length, certification,
                who it&apos;s for, price and dates. On the overview page it can grow to every program you offer. I&apos;d love to see the
                schools you&apos;ve been looking at in the call.
              </p>
            </div>
            <div className={own.miniPath} aria-hidden="true">
              <div className={own.miniHere}><span>200-hour</span><strong>14 days</strong><em>RYT-200</em></div>
              <i>→</i>
              <div><span>300-hour</span><strong>28 days</strong><em>RYT-500 path</em></div>
            </div>
          </div>
        </section>

        {/* Next */}
        <section id="next" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              Next steps
            </p>
            <h2>What would help me send you a fixed price.</h2>
          </div>
          <div className={own.next}>
            <ul className={own.need}>
              {NEED.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <ol className={own.timeline}>
              <li><strong>Our call</strong>We go through the page and your questions together.</li>
              <li><strong>After the call</strong>You send staging access and the open details.</li>
              <li><strong>Within three working days</strong>I send the fixed price and a timeline.</li>
              <li><strong>Start</strong>50% to begin, 50% on your final approval before launch.</li>
            </ol>
          </div>
        </section>
        <div className={styles.wrap}>
          <p className={own.rights}>Design concept by Well Edge Creative, shared for your review. The design passes to Blue Osa with the project.</p>
        </div>
      </main>
      <ProposalMotion selector={[own.point, own.answers, styles.browser, own.steps, own.speed, own.next].map((c) => `.${c}`).join(",")} />
    </>
  );
}
