import Image from "next/image";
import Link from "next/link";
import { Newsreader } from "next/font/google";
import ProposalMotion from "../../ProposalMotion";
import DesktopFrame from "./DesktopFrame";
import { FAQ_LIVE_COUNT } from "../200-hour/faq-live";
import styles from "../../proposal.module.css";
import own from "./phase1.module.css";

/**
 * Phase 1 for Blue Osa: the 200-hour page, for the call on 25 November and as the written answers
 * Aaron asked for. The page itself is shown twice, at desktop and at phone width, both live and
 * scrollable. Every statement about speed and search points to Google's own documentation, and
 * the numbers for today are from PageSpeed Insights on 19 and 24 November 2026. Nothing promises rankings
 * or bookings; the promise is that the page does not get worse, with checks before and after.
 */

const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"] });

const PAGE = "/en/proposals/blue-osa/200-hour-v3";

const POINTS = [
  {
    n: "1",
    title: "Everything Google reads stays in place",
    items: [
      "The title stays exactly as it is: “200 Hour Yoga Teacher Training Costa Rica | 14-Day Blue Osa”. The URL and the meta description stay unchanged.",
      "The H1 stays word for word. So do your main headings: all five that carry the phrase keep their exact wording.",
      "All existing schema stays as Rank Math outputs it today: Course with price and schedule, FAQ, your three videos, breadcrumbs.",
      "Your text stays. The text of every section and every FAQ answer goes in word for word, unless you approve a change. It stays real text, never text inside images.",
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
      `The full FAQ: all ${FAQ_LIVE_COUNT} entries from your current page, word for word. Your three videos and your reviews stay too.`,
    ],
  },
  {
    n: "4",
    title: "Mobile, speed and a fixed price",
    items: [
      "The phone view in part 1: scroll it like on a phone. Book a call and Apply stay at the bottom of every screen.",
      "Speed goals and how they are checked: part 4.",
      "A fixed price for Phase 1 and the price of an extra revision round: part 5.",
    ],
  },
];

const CHANGES = [
  {
    title: "Apply and the call, together",
    today: "After the first scroll, a bar at the bottom offers the discovery call. Apply is not in it, and the Apply buttons stop about halfway down: there is none near the price, the reviews or the FAQ.",
    next: "Book a call and Apply stay at the bottom of every screen, side by side. You told me calls close at 30 to 50%, so the call keeps its place and Apply joins it.",
  },
  {
    title: "The dates",
    today: "The date list appears five times: three times with Apply, twice with Book Now, never with both.",
    next: "One list right below the first screen. Each date shows its spots, with Apply and Book now side by side.",
  },
  {
    title: "The length on a phone",
    today: "About 50 screens to scroll. The date list alone appears five times down the page.",
    next: "About 30 in the mockup, with your full text, every FAQ entry, all three films and both galleries in. Photos sit in a grid and open full screen.",
  },
];

const SHOTS = "/proposals/blue-osa/compare";
const PAIRS = [
  {
    key: "first",
    title: "The first screen",
    today: "The headline fills the screen.",
    next: "Headline, one sentence, both buttons.",
  },
  {
    key: "compare",
    title: "The 14-day comparison",
    today: "The table runs off the edge.",
    next: "Both answers side by side, nothing cut off.",
  },
  {
    key: "why",
    title: "Why choose Blue Osa",
    today: "Long paragraphs, one after the other.",
    next: "Five short points. Your full text opens on tap.",
  },
  {
    key: "price",
    title: "The price",
    today: "The call bar is there. Apply is not.",
    next: "Clear prices, with the call and Apply together.",
  },
];

const NUMBERS = [
  { big: "50 → 30", text: "phone screens to scroll, with your full text still on the page" },
  { big: "17 = 17", text: "times your exact search phrase is in the page text, today and on the new page" },
  { big: "Every screen", text: "has Apply and the call in reach. Today, Apply stops halfway down." },
];

const KEPT = [
  "Your title, URL and meta description",
  "The H1 and every heading with the phrase",
  "The full text of every section",
  `All ${FAQ_LIVE_COUNT} FAQ entries, word for word`,
  "All 14 room photos and 10 food photos",
  "Your three videos and your reviews",
  "All schema: Course, FAQ, videos, breadcrumbs",
  "Your Apply, Book Now and call links",
];

const GOOGLE = [
  {
    title: "What “fast enough” means",
    text: "Google's Core Web Vitals: the largest content should appear within 2.5 seconds, the page should react to a tap within 200 ms, and the layout should not jump (CLS 0.1 or less), for at least 75% of visits. Your page misses the first one on phones today, at 2.7 seconds.",
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
    title: "Folded text still counts",
    text: "Google's guidance for phones: “Instead of removing content, consider moving content into accordions or tabs to save space.” What Google does not load is content that only arrives after a click. On the new page the full text is in the page from the start and only folded on screen, like your FAQ today.",
    source: "Google Search Central: Mobile-first indexing",
    href: "https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing",
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

const RECORD = [
  { k: "Title", v: "200 Hour Yoga Teacher Training Costa Rica | 14-Day Blue Osa" },
  { k: "H1", v: "200 Hour Yoga Teacher Training Costa Rica 14-Day Intensive YTT" },
  { k: "Main headings", v: "19 H2 headings. Five carry the phrase, four of them in its exact form." },
  { k: "The phrase in the text", v: "17 times in its exact form, and 8 more times as “in Costa Rica”. Once more in the title." },
  { k: "Text", v: "About 9,000 words, including the reviews and the FAQ." },
  { k: "FAQ", v: "21 entries with about 2,900 words. 12 of them are in the FAQ schema." },
  { k: "Schema", v: "Course (price, schedule, review), FAQ, three videos, article, breadcrumbs, resort and place." },
  { k: "Media", v: "Three YouTube videos, 14 room photos, 10 food photos." },
];

const SAFEGUARDS = [
  { title: "Before anything changes", text: "I record today's title, meta, headings, URL, canonical and schema, and run PageSpeed three times on mobile and desktop. With access to Search Console, I also note the clicks and position for your main phrase." },
  { title: "On staging", text: "The new page is built and tested on a copy of your site. Schema is checked with Google's Rich Results Test and the Schema validator." },
  { title: "The launch rule", text: "The page only goes live if it scores at least as well as today on mobile and desktop, and every point on the record matches: title, headings, text, schema. If it doesn't, it stays on staging until it does." },
  { title: "After launch", text: "PageSpeed on the live page the same day. Search Console checks after 1, 2 and 4 weeks. Your current page is saved, so it can be switched back within the hour if anything looks worse." },
];

const TARGETS = [
  { metric: "Real visitors on phones: main content (LCP)", today: "2.7 s, not passed", target: "under 2.5 s" },
  { metric: "Real visitors on phones: reaction to a tap (INP)", today: "154 ms, passed", target: "stays under 200 ms" },
  { metric: "Real visitors on phones: layout shift (CLS)", today: "0, passed", target: "stays under 0.1" },
  { metric: "Real visitors on desktop: Core Web Vitals", today: "Passed (LCP 2.0 s)", target: "stays passed" },
  { metric: "Performance score, mobile (lab test)", today: "57 to 68", target: "at least as good, aim: higher" },
  { metric: "Performance score, desktop (lab test)", today: "59 to 66", target: "at least as good, aim: higher" },
  { metric: "SEO score", today: "100", target: "stays 100" },
];

const QUESTIONS = [
  {
    q: "Does Google still read the text behind “Read the full text”?",
    a: "Yes. The text is in the page from the first moment, it is only folded on screen, the same way your FAQ is folded today. Google's own advice for phones is to move content into accordions or tabs instead of removing it (source in the appendix). And if you want a section fully open, that is one switch per section.",
  },
  {
    q: "Can you guarantee our rankings?",
    a: "No, and nobody honestly can: rankings depend on Google and on your competitors. What I can guarantee is that everything Google reads on the page stays in place (title, headings, URL, meta, schema, the text), that the page is at least as fast as today, and that your current page stays saved, so it can be switched back within the hour.",
  },
  {
    q: "What if the new page scores worse on staging?",
    a: "Then it doesn't go live. I keep working on it until it meets the launch rule, and that work is part of the fixed price.",
  },
  {
    q: "Does anything change on the live site while you build?",
    a: "No. Everything is built and tested on the staging copy. Your live page stays untouched until you approve the launch.",
  },
  {
    q: "What if we want changes after the two rounds?",
    a: "Each extra round is $350. Dates, spots, prices and photos your team changes themselves, at no cost, with the guide I write for them.",
  },
  {
    q: "What about the 300-hour page and the overview?",
    a: "They come as Phase 2, if you like, quoted separately once Phase 1 is live. The modules built in Phase 1 can be reused there.",
  },
  {
    q: "Who do we work with?",
    a: "Directly with me, from the first call to the launch. No account managers and no handoffs.",
  },
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

const NOT_INCLUDED = [
  "Other pages of blueosa.com (the 300-hour page and the overview come as Phase 2, if you like)",
  "New photography or video",
  "Changes inside third-party tools such as booking, reviews or chat",
  "Hosting, WordPress and plugin licences",
];

const CONFIRM_STEPS = [
  { title: "You confirm", text: "A short reply is enough: “Yes, let's start Phase 1.”" },
  { title: "Agreement and invoice", text: "I send a one-page agreement with everything on this page, and the invoice for the first 50%." },
  { title: "Staging access", text: "You send access to the staging copy. I record today's page, then the build starts." },
];

const AGENDA = [
  { title: "The new page", text: "On a laptop and on a phone" },
  { title: "What gets better", text: "Today and new, side by side" },
  { title: "Your four points", text: "Answered, one by one" },
  { title: "Speed and search", text: "Today, the goals, the never-worse rule" },
  { title: "Fixed price", text: "Phase 1, payment, what is included" },
  { title: "Fair questions", text: "Short answers" },
  { title: "How we start", text: "Three steps and the timeline" },
];

const NEED = [
  "Access to a staging copy (WordPress admin with Beaver Builder and Rank Math)",
  "Read access to Google Search Console, if possible, for the before and after",
  "Which room photos show the beachfront suites and which the garden rooms",
  "Your call booking link, so the call buttons open it directly",
];

function Part({ n, light, children }: { n: number; light?: boolean; children: React.ReactNode }) {
  return (
    <p className={`${styles.eyebrow} ${own.part} ${light ? own.partLight : ""}`}>
      <span>{n}</span>
      {children}
    </p>
  );
}

export default function PhaseOneContent() {
  return (
    <>
      <main className={styles.page}>
        {/* Hero */}
        <section className={`${styles.wrap} ${styles.hero} ${own.docHero}`}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            Phase 1 · the 200-hour page
          </p>
          <h1>
            Faster, clearer, <em className={serif.className}>and never worse.</em>
          </h1>
          <p className={styles.lead}>
            Your 200-hour page, rebuilt in Beaver Builder: the same title, URL and schema, a clearer path to Apply and Book a call, and nothing
            lost. It only goes live if it is at least as good as today.
          </p>
          <p className={styles.byline}>For Aaron and the Blue Osa team · Jan Brunnenkant, Well Edge Creative · November 2026</p>
          <ol className={own.agenda}>
            {AGENDA.map((a, i) => (
              <li key={a.title}>
                <span>{i + 1}</span>
                <strong>{a.title}</strong>
                {a.text}
              </li>
            ))}
          </ol>
        </section>

        {/* The page, twice */}
        <section id="page" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <Part n={1}>The new page</Part>
              <h2>On a laptop and on a phone. Scroll both.</h2>
              <p>
                The design is done. Both views are the real page, live: tap the modules, open the galleries, try the buttons. Phase 1
                turns this into your page on blueosa.com.
              </p>
              <p className={own.mockNote}>
                Every section shows a short version first. &quot;Read the full text&quot; opens your text from today&apos;s page, word
                for word. The headings, the FAQ and all three films are yours too. Only the reviews are examples here: on your
                site, your own reviews section stays.
              </p>
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
          </div>
        </section>

        {/* What gets better, nothing lost */}
        <section id="changes" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <Part n={2}>What gets better</Part>
            <h2>Easier to use, with nothing lost.</h2>
            <p>
              Your live page and the new page, on the same phone-sized screen. The pictures and every number under
              &quot;Today&quot; were taken from your page on 24 November 2026.
            </p>
          </div>
          <dl className={own.numbers}>
            {NUMBERS.map((n) => (
              <div key={n.big}>
                <dt>{n.big}</dt>
                <dd>{n.text}</dd>
              </div>
            ))}
          </dl>
          <div className={own.pairs}>
            {PAIRS.map((p) => (
              <figure key={p.key} className={own.pair}>
                <figcaption>{p.title}</figcaption>
                <div>
                  <div className={own.shot}>
                    <span>Today</span>
                    <Image src={`${SHOTS}/today-${p.key}.jpg`} alt={`Your live page on a phone: ${p.today}`} width={750} height={1624} sizes="(max-width: 900px) 45vw, 230px" />
                    <p>{p.today}</p>
                  </div>
                  <div className={`${own.shot} ${own.shotNew}`}>
                    <span>New page</span>
                    <Image src={`${SHOTS}/new-${p.key}.jpg`} alt={`The new page on a phone: ${p.next}`} width={750} height={1624} sizes="(max-width: 900px) 45vw, 230px" />
                    <p>{p.next}</p>
                  </div>
                </div>
              </figure>
            ))}
          </div>
          <ul className={own.changes}>
            {CHANGES.map((c) => (
              <li key={c.title}>
                <h3>{c.title}</h3>
                <dl>
                  <div>
                    <dt>Today</dt>
                    <dd>{c.today}</dd>
                  </div>
                  <div className={own.new}>
                    <dt>New page</dt>
                    <dd>{c.next}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <div className={own.kept}>
            <h3>What stays exactly as it is</h3>
            <ul>
              {KEPT.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Four points */}
        <section id="points" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <Part n={3}>Your four points</Part>
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
          </div>
        </section>

        {/* Evidence */}
        <section id="evidence" className={styles.darkBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <Part n={4} light>Speed and search</Part>
              <h2>Where the page stands, where it goes, and how it never gets worse.</h2>
              <p>No promises about rankings or bookings. Only numbers that can be measured, and a rule for the launch.</p>
            </div>

            <h3 className={own.subhead}>Today and the goals</h3>
            <div className={own.tableWrap}>
              <table className={own.table}>
                <thead>
                  <tr>
                    <th scope="col">Measure</th>
                    <th scope="col">Today</th>
                    <th scope="col">Goal</th>
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
              Today: Google PageSpeed Insights, measured on 19 and 24 November 2026. The first four rows are real visitors over the
              last 28 days (Chrome UX Report), and these are the numbers Google uses. The Performance score is a single lab test and
              moves from run to run: 68 and 57 on mobile, 66 and 59 on desktop, five days apart. That&apos;s why I don&apos;t promise a
              score. I measure three times before and after, and the page only goes live if it is at least as good.
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

            <p className={own.note}>
              The record of your page today and Google&apos;s own statements, with sources, are in the appendix at the end.
            </p>
          </div>
        </section>

        {/* Price */}
        <section id="price" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <Part n={5}>Fixed price</Part>
            <h2>Phase 1: the 200-hour page.</h2>
            <p>You have seen the result in part 1. One fixed price turns it into your real page, from staging to launch.</p>
          </div>
          <div className={own.price}>
            <div className={own.priceCol}>
            <div className={own.priceCard}>
              <span>Fixed price · US dollars</span>
              <strong>$3,400</strong>
              <p className={own.priceSub}>for the 200-hour page, from staging to launch</p>
              <dl className={own.terms}>
                <div><dt>To start</dt><dd>$1,700</dd></div>
                <div><dt>On your final approval, before launch</dt><dd>$1,700</dd></div>
                <div><dt>Each extra round of revisions</dt><dd>$350</dd></div>
              </dl>
            </div>
            <div className={own.sideCard}>
              <h3>The never-worse rule</h3>
              <p>
                The new page only goes live if it scores at least as well as today and every SEO point matches. Your current page
                stays saved and can be switched back within the hour.
              </p>
            </div>
            <div className={own.sideCard}>
              <h3>For scale</h3>
              <p>
                One place in a double room at your training is $3,390. Phase 1 costs about as much as one student. I can&apos;t
                promise bookings, and I won&apos;t. But that is the size of the decision.
              </p>
            </div>
            </div>
            <div>
              <h3>Included</h3>
              <ul className={own.check}>
                {INCLUDED.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <h3 className={own.notHead}>Not included</h3>
              <ul className={own.not}>
                {NOT_INCLUDED.map((i) => (
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

        {/* Questions, all open */}
        <section id="questions" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <Part n={6}>Fair questions</Part>
            <h2>Fair questions, short answers.</h2>
          </div>
          <div className={own.qList}>
            {QUESTIONS.map((x) => (
              <div key={x.q}>
                <h3>{x.q}</h3>
                <p>{x.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How we start */}
        <section id="start" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <Part n={7}>How we start</Part>
              <h2>Three steps, then about four weeks.</h2>
            </div>
            <ol className={own.confirmSteps}>
              {CONFIRM_STEPS.map((c, i) => (
                <li key={c.title}>
                  <span>{i + 1}</span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </li>
              ))}
            </ol>
            <div className={own.next}>
              <div>
                <h3>What I need to start</h3>
                <ul className={own.need}>
                  {NEED.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>The timeline</h3>
                <ol className={own.timeline}>
                  <li><strong>Week 1</strong>The record of today&apos;s page, and the setup on staging.</li>
                  <li><strong>Weeks 2 and 3</strong>The build, with your two rounds of feedback.</li>
                  <li><strong>Week 4</strong>Final checks, your approval, launch. Only when the launch rule is met.</li>
                  <li className={own.estimate}>An estimate: about four weeks from staging access. I confirm the timeline in writing once I&apos;ve seen staging.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Appendix: the details behind part 4, all open */}
        <section id="appendix" className={styles.darkBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                Appendix · for your team
              </p>
              <h2>The details behind part 4.</h2>
            </div>
            <h3 className={own.subhead}>A. Your page today, on record</h3>
            <div className={own.serp}>
              <span>https://www.blueosa.com › 14-day-200-hour-yoga-teacher-training-costa-rica</span>
              <strong>200 Hour Yoga Teacher Training Costa Rica | 14-Day Blue Osa</strong>
              <p>
                Complete your 200 hour yoga teacher training Costa Rica certification in 14 days. Intensive beachfront Osa Peninsula
                YTT, Yoga Alliance RYT-200. All-inclusive.
              </p>
            </div>
            <p className={own.note}>
              Your URL, title and meta description, as you give them to Google today. All three stay exactly as they are. The mockup
              can&apos;t carry them itself, because it sits on my domain and is hidden from search engines.
            </p>
            <dl className={own.record}>
              {RECORD.map((r) => (
                <div key={r.k}>
                  <dt>{r.k}</dt>
                  <dd>{r.v}</dd>
                </div>
              ))}
            </dl>
            <p className={own.note}>
              Read from your live page on 24 November 2026. This is the list the new page is compared against, on staging and again
              after launch. Nothing on it gets shorter or disappears unless you decide it should.
            </p>
            <h3 className={own.subhead}>B. What holds the page back today</h3>
            <p className={own.note}>
              From the same PageSpeed report: scripts that block the page (1.4 seconds on phones in the latest
              test), about 680 KiB of unused JavaScript, and a slow first answer from the server for real visitors on phones (1.5
              seconds). Much of that comes from plugins, tracking and hosting across the whole site, not from this one page. On staging
              I show you what the page itself can win and what would need a decision about a plugin or script.
            </p>
            <h3 className={own.subhead}>C. What Google says, with sources</h3>
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
          </div>
        </section>

        <div className={styles.wrap}>
          <p className={own.work}>
            Recent retreat work:{" "}
            <Link href="/en/case-studies/vietnam-detox" target="_blank">
              Vietnam Detox, brand and website ↗
            </Link>
          </p>
        </div>
        <div className={styles.wrap}>
          <p className={own.rights}>Design concept by Well Edge Creative, shared for your review. The design passes to Blue Osa with the project.</p>
        </div>
      </main>
      <ProposalMotion selector={[own.point, own.sources, own.safe, own.price, own.confirmSteps, own.next, own.agenda, own.changes, own.kept, own.pair, own.numbers, own.qList, styles.browser].map((c) => `.${c}`).join(",")} />
    </>
  );
}
