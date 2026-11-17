import Image from "next/image";
import Link from "next/link";
import { Newsreader } from "next/font/google";
import Header from "@/components/Header";
import ProposalMotion from "../ProposalMotion";
import styles from "../proposal.module.css";
import own from "./blueosa.module.css";

/**
 * Proposal for Blue Osa (Osa Peninsula, Costa Rica), for Yogi Aaron, who asked for more
 * information in December 2025 and signs as "MAT course". The focus is the 200-hour yoga teacher
 * training page. Facts were checked on blueosa.com on 16 November 2026; every photo and the logo
 * are theirs, and the logo stays unchanged.
 */

const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"] });

const CHECKED = "16 November 2026";
const IMG = "/proposals/blue-osa";
const MOCKUP = "/en/proposals/blue-osa/teacher-training";

const STRIP = ["ytt-group", "beach-jump", "aaron", "shala-group", "sunset-group", "team"];

const STRENGTHS = [
  {
    title: "A method nobody else teaches",
    text: "AYAMA™, developed by Yogi Aaron over 30+ years, gives every graduate something they can't learn anywhere else. That is a rare promise for a teacher training.",
  },
  {
    title: "Proof from the outside",
    text: "Travelers' Choice Best of the Best 2024, and features in BBC, Wall Street Journal, Outside and Travel + Leisure.",
  },
  {
    title: "Graduates who say it changed their lives",
    text: "“I never imagined I would find my life purpose in my retirement years!” Your graduates write like that.",
  },
  {
    title: "What already works on the page",
    text: "Five 2027 trainings with free spots sit right at the top, a menu lets people jump to each part, and your photos show real groups, real rooms and real food. All of that stays.",
  },
];

const FACTS = [
  { value: "200", label: "hours, Yoga Alliance RYT-200" },
  { value: "14", label: "days by the Pacific" },
  { value: "5", label: "trainings listed for 2027" },
  { value: "$2,990", label: "all-inclusive, from" },
];

const GAPS = [
  {
    title: "Walls of text, bold everywhere",
    text: "The 200-hour page is very long, well over 8,000 words, and a lot of it is set in bold. When almost every sentence is stressed, nothing stands out.",
  },
  {
    title: "Three sections say the same thing",
    text: "Why Choose, You Belong Here and Is This Right for You repeat the promise before the facts. The reader scrolls past the same message three times.",
  },
  {
    title: "The most important comes late",
    text: "Yogi Aaron and AYAMA™, the reason to choose Blue Osa, come after the accommodations. The price comes after the meals, the graduates near the very end.",
  },
  {
    title: "The place gets lost in the text",
    text: "Blue Osa is beautiful, and you have the pictures to prove it. On the training page, long paragraphs try to describe what a few of them would show at a glance.",
  },
  {
    title: "Buttons everywhere",
    text: "Apply Now and Book Now show up in almost every section, next to Book your call and a floating discovery call. When every section asks for a decision, none feels like the moment.",
  },
  {
    title: "Written for Google more than for people",
    text: "The phrase 200 hour yoga teacher training Costa Rica comes up again and again. Readers notice it, and it hides the warmth of your graduates' voices.",
  },
];

// Their sections today, in order, against the new order of the same content.
const ORDER_TODAY = [
  "Dates and Apply Now",
  "Welcome",
  "What you'll learn (4 modules)",
  "Why choose our training",
  "You belong here",
  "Is this program right for you?",
  "All-inclusive package",
  "Questions? We have answers",
  "Accommodations",
  "Meet Yogi Aaron",
  "Farm-to-table meals",
  "Begin your journey today",
  "Invest in your transformation (price)",
  "Risk-free guarantee",
  "Graduates and Google reviews",
];
const REPEATS = ["Why choose our training", "You belong here", "Is this program right for you?", "Begin your journey today"];

const ORDER_NEW = [
  { title: "Dates, price, deposit", text: "Everything needed to decide, on the first screen" },
  { title: "Yogi Aaron and AYAMA™", text: "Why Blue Osa, in his words" },
  { title: "Fourteen days at a glance", text: "Curriculum and the daily schedule" },
  { title: "Graduates", text: "Their own words, with name and year" },
  { title: "Price and what's included", text: "One table, one guarantee" },
  { title: "The place", text: "Rooms, meals and free time, in pictures" },
  { title: "Questions and apply", text: "A short FAQ and one form" },
];

// Four rules behind the new page; the order itself is shown in the structure section.
const CHANGES = [
  {
    today: "Walls of text, bold everywhere",
    change: "One idea per section, one highlight at most, and the longer texts kept further down in an FAQ, so nothing useful is lost",
    effect: "The page looks as calm and premium as the place, and it becomes easy to read.",
  },
  {
    today: "Dates on top, price far below",
    change: "Your dates stay on top, with price, deposit and refund right next to them",
    effect: "Future teachers get the four answers they need before a single paragraph.",
  },
  {
    today: "Paragraphs describing the place",
    change: "Pictures before paragraphs: your own photos of the groups, the rooms and the food lead each section",
    effect: "People feel Blue Osa in seconds. Words only have to confirm what they already saw.",
  },
  {
    today: "Buttons in almost every section",
    change: "One action, Apply now, only where a decision makes sense, with Book a call as the gentle second door",
    effect: "The next step is always clear, without the page pushing for it in every section.",
  },
];

const PAGE = [
  { title: "Dates and price first", text: "All five 2027 dates with free spots, price, deposit and refund on the first screen." },
  { title: "Aaron and AYAMA™ early", text: "Why this training is different, in his words and with his portrait." },
  { title: "Fourteen days, at a glance", text: "The curriculum in four blocks and the real daily schedule." },
  { title: "Graduates, in their words", text: "Your own testimonials, with name and year, next to photos of the groups." },
  { title: "Price, simply", text: "Triple, double and single in one table, what's included and what isn't." },
  { title: "The place, in pictures", text: "Rooms, meals and free time, shown instead of described." },
];

const OFFER = {
  name: "Your teacher training pages",
  intro: "One project, about 6 weeks with time for your feedback. Built on your current site or handed to your team, decided together once I've seen your setup.",
  steps: [
    {
      title: "Shape it together",
      time: "about 2 weeks",
      items: [
        "Kickoff with Aaron and the team",
        "Final structure for the 200-hour page, from this mockup",
        "Text shortened and sharpened with you, your voice kept",
        "Your logo stays: clean white and transparent versions for photos and dark backgrounds",
        "Review call: you approve before anything is built",
      ],
    },
    {
      title: "Build and launch",
      time: "about 4 weeks",
      items: [
        "The 200-hour page rebuilt, designed for phones first",
        "The same system applied to the 300-hour page and the training overview",
        "Apply and Book a call connected to the systems you already use",
        "Launched with you or your team, the way that fits your setup",
      ],
    },
  ],
};

const EXTRAS = [
  "Retreat and group pages in the same style",
  "Monthly care: new dates and small changes",
];

const STEPS = [
  { title: "Talk it through", text: "A 30-minute call where we go through this page and you tell me what matters most for the trainings." },
  { title: "Confirm", text: "I send one fixed price in writing, and we pick a start date." },
  { title: "Start", text: "Kickoff with you. About two weeks later you review and approve the design, then I build." },
];

function Arrow() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
            <span aria-current="page">Blue Osa</span>
          </nav>
          <Image src={`${IMG}/logo.png`} alt="Blue Osa" width={200} height={103} className={own.heroLogo} priority />
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            Proposal for Blue Osa · Yoga Teacher Training
          </p>
          <h1>
            Your place speaks for itself.
            <br />
            Let the pages say less.
          </h1>
          <p className={styles.lead}>
            For Aaron: you asked me for more information last December. Here it is. Your place,
            your photos and your method are strong. What holds the pages back is the amount of text and the
            order. Here is what I would change, with a first mockup of the 200-hour page.
          </p>
          <p className={styles.byline}>Jan Brunnenkant · Well Edge Creative · November 2026</p>
          <nav className={styles.jumpNav} aria-label="Sections">
            <a href="#see">What you have</a>
            <a href="#gaps">What holds it back</a>
            <a href="#help">What I would change</a>
            <a href="#mockup">The new page</a>
            <a href="#options">The offer</a>
          </nav>
        </section>

        {/* Life at Blue Osa first */}
        <div className={own.strip} aria-label="Life at Blue Osa">
          {STRIP.map((img) => (
            <div key={img} className={own.stripImg}>
              <Image src={`${IMG}/${img}.webp`} alt="" fill sizes="(max-width: 900px) 50vw, 17vw" />
            </div>
          ))}
        </div>
        <p className={own.stripNote}>All photos from blueosa.com.</p>

        {/* In short */}
        <section className={`${styles.wrap} ${styles.short}`} aria-label="In short">
          <div className={styles.shortItem}>
            <span>What I see</span>
            <p>A beautiful place and a strong method, hidden under far too much text.</p>
          </div>
          <div className={styles.shortItem}>
            <span>What I would do</span>
            <p>Keep your brand and your best words. Cut the rest, and put it in the order people decide.</p>
          </div>
          <div className={styles.shortItem}>
            <span>What it brings</span>
            <p>A page that is easy to read, shows Blue Osa at its best and makes the next step obvious.</p>
          </div>
        </section>

        {/* Strengths */}
        <section id="see" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              What you already have
            </p>
            <h2>The ingredients are strong. I wouldn&apos;t rebuild everything.</h2>
          </div>
          <div className={own.strengths}>
            <div className={own.strengthPhoto}>
              <Image src={`${IMG}/ytt-adjust.webp`} alt="Yogi Aaron guiding a trainee at Blue Osa" fill sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
            <div className={own.strengthList}>
              {STRENGTHS.map((s) => (
                <article key={s.title} className={styles.card}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Facts */}
        <div className={`${styles.wrap} ${own.facts}`}>
          {FACTS.map((f) => (
            <div key={f.label}>
              <strong className={serif.className}>{f.value}</strong>
              <span>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Gaps */}
        <section id="gaps" className={styles.darkBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                What holds it back
              </p>
              <h2>Too much text, in the wrong order. It hides how good Blue Osa is.</h2>
              <p>Checked on {CHECKED}, on the 200-hour yoga teacher training page and the homepage.</p>
            </div>
            <ol className={styles.gapList}>
              {GAPS.map((g, i) => (
                <li key={g.title}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{g.title}</h3>
                    <p>{g.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Order: today against new */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              The structure
            </p>
            <h2>Fifteen sections become seven. Same content, the order people decide in.</h2>
          </div>
          <div className={own.order}>
            <div className={own.orderCol}>
              <span className={own.orderHead}>Your 200-hour page today</span>
              <ol>
                {ORDER_TODAY.map((o) => (
                  <li key={o} className={REPEATS.includes(o) ? own.repeat : undefined}>
                    {o}
                  </li>
                ))}
              </ol>
              <p className={own.orderNote}>Highlighted: sections that repeat the promise</p>
            </div>
            <div className={own.orderArrow} aria-hidden="true">→</div>
            <div className={`${own.orderCol} ${own.orderNew}`}>
              <span className={own.orderHead}>The new page</span>
              <ol>
                {ORDER_NEW.map((o) => (
                  <li key={o.title}>
                    <strong>{o.title}</strong>
                    <span>{o.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Changes */}
        <section id="help" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              What I would change
            </p>
            <h2>Four rules for the new page.</h2>
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

        {/* Mockup */}
        <section id="mockup" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                A first look · the 200-hour page
              </p>
              <h2>Your new teacher training page</h2>
              <p>In your own fonts and colours, with your photos, dates, prices and graduates&apos; words. Scroll inside it, or open it full screen.</p>
            </div>
            <p className={styles.draftNote}>
              <strong>A first mockup, not a finished design.</strong> It keeps your brand and your
              content, and shows the new order and feel. Your logo stays exactly as it is. The
              videos in it are your own, placed only to show the idea. Every detail is shaped together
              with you.
            </p>
            <div className={styles.browser}>
              <div className={styles.browserBar}>
                <span className={styles.lights}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.address}>blueosa.com/200-hour-yoga-teacher-training</span>
                <a href={MOCKUP} target="_blank" rel="noopener" className={styles.fullscreen}>
                  Open full screen ↗
                </a>
              </div>
              <iframe src={MOCKUP} title="Teacher training page mockup for Blue Osa" className={styles.frame} loading="lazy" />
              {/* On phones a page inside a page cannot be scrolled well, so it opens on its own. */}
              <a href={MOCKUP} className={styles.phonePoster}>
                <Image src={`${IMG}/drone-poster.webp`} alt="" fill sizes="100vw" />
                <span className={styles.posterShade} />
                <span className={styles.posterText}>
                  <span className={`${styles.posterTitle} ${serif.className}`}>
                    200 Hour Yoga Teacher Training, <em>14-Day Intensive</em>
                  </span>
                  <span className={`${styles.posterButton} ${own.posterButton}`}>Open the page mockup →</span>
                </span>
              </a>
            </div>
            <ol className={styles.mockPoints}>
              {PAGE.map((s, i) => (
                <li key={s.title}>
                  <span className={styles.blueprintNum}>{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Work */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              Retreat work
            </p>
            <h2>I build retreat pages that show a retreat the way it deserves to be shown.</h2>
          </div>
          <div className={styles.cases}>
            <article className={styles.caseCard}>
              <div className={styles.caseImage}>
                <Image src="/assets/misc/projects/vietnam-detox-relaunch-hero.webp" alt="The Vietnam Detox homepage" fill sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <span className={styles.tag}>Vietnam · three languages</span>
              <h3>Vietnam Detox: one clear page for every retreat</h3>
              <p>
                Guided Buchinger fasting retreats in Vietnam. Each retreat got its own page that
                shows what it is, who it is for and when it runs, in English, Vietnamese and German.
              </p>
              <a href="https://vietnamdetox.com" target="_blank" rel="noopener" className={styles.textLink}>
                Visit vietnamdetox.com <Arrow />
              </a>
            </article>
            <article className={styles.caseCard}>
              <div className={styles.caseImage}>
                <Image src="/case-studies/brisa-bahia/mockup-big-screen-tablet-mobile-webiste.webp" alt="The Brisa Bahía website on a large screen, tablet and mobile" fill sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <span className={styles.tag}>Colombia · Caribbean coast</span>
              <h3>Brisa Bahía: a guest journey and a facilitator journey</h3>
              <p>
                A remote eco-retreat that needed to speak to guests and to retreat leaders at once.
                The new site brought the first retreat bookings and facilitator inquiries.
              </p>
              <Link href="/en/case-studies/brisa-bahia" className={styles.textLink}>
                Read the Brisa Bahía case study <Arrow />
              </Link>
            </article>
          </div>
        </section>

        {/* Offer */}
        <section id="options" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={`${styles.sectionHead} ${styles.center}`}>
              <p className={`${styles.eyebrow} ${styles.centerEyebrow}`}>
                <span className={styles.dot} />
                The offer
              </p>
              <h2>One project. One price. You approve before I build.</h2>
            </div>
            <div className={own.offer}>
              <article className={`${styles.package} ${styles.featured}`}>
                <span className={styles.tag}>Recommended</span>
                <h3>{OFFER.name}</h3>
                <p className={styles.packageIntro}>{OFFER.intro}</p>
                <div className={own.offerSteps}>
                  {OFFER.steps.map((st, i) => (
                    <div key={st.title}>
                      <span className={own.offerNum}>{i + 1}</span>
                      <h4>{st.title}</h4>
                      <p className={own.offerTime}>{st.time}</p>
                      <ul>
                        {st.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
              <article className={styles.package}>
                <span className={styles.tag}>Optional, any time</span>
                <h3>Extras</h3>
                <p className={styles.packageIntro}>Nice to have, not needed to launch.</p>
                <ul>
                  {EXTRAS.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </article>
            </div>
            <p className={styles.priceNote}>
              One fixed price, confirmed in writing before we start, paid in two parts: at the start
              and at launch.
            </p>
          </div>
        </section>

        {/* Next steps */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              How we move forward
            </p>
            <h2>Three simple steps.</h2>
          </div>
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className={styles.stepNum}>{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Close */}
        <section className={styles.darkBand}>
          <div className={`${styles.wrap} ${styles.section} ${styles.close}`}>
            <h2>Let&apos;s make the page as transformative as the two weeks.</h2>
            <p>Thank you, Aaron, for asking. I&apos;d love to walk you through this in a short call.</p>
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
        selector={[styles.shortItem, styles.card, styles.changeRow, styles.browser, styles.caseCard, styles.package]
          .map((c) => `.${c}`)
          .join(",")}
      />
    </>
  );
}
