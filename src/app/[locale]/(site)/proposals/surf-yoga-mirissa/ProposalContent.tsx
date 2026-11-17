import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ProposalMotion from "../ProposalMotion";
import styles from "../proposal.module.css";
import own from "./surfyoga.module.css";

/**
 * Ideas for Surf & Yoga Mirissa (Sri Lanka). Ameila said yes in February 2026 to a few concrete
 * ideas; Jan's follow-up in September named the packages page. This page delivers exactly that:
 * three ideas and a working mockup. Facts were checked on surfnyogasrilanka.com on 17 November
 * 2026; photos, logo, font and colours are theirs.
 */

const IMG = "/proposals/surf-yoga-mirissa";
const MOCKUP = "/en/proposals/surf-yoga-mirissa/packages";

const STRIP = ["lesson-shake", "yoga-deck", "dinner-vibe", "walk-in", "aerial", "pool-friends"];

const STRENGTHS = [
  {
    title: "Real photos of real guests",
    text: "Your site is full of fresh pictures from the camp: first lessons, yoga in the garden, dinners at the long table. Many places would pay a photographer for that.",
  },
  {
    title: "A package for everyone",
    text: "Surf, yoga or both, any arrival day, any length of stay, all meals included. The offer itself is generous and flexible.",
  },
  {
    title: "Surf coaching that goes further",
    text: "Video analysis and surf theory are part of the lessons. That is a real difference to a board rental with a quick lesson.",
  },
  {
    title: "A camp with character",
    text: "The jungle garden and pool, Loose Keys coffee, themed dinners, and a free cooking class and Sinhalese lesson with every booking.",
  },
];

const IDEAS = [
  {
    num: "01",
    title: "Let guests choose in three steps",
    today: "Today the page lists every package for every stay length, one after the other, and then four price tables. To find their price, a guest has to compare long lists and the right cell in the right table.",
    idea: "Three simple questions: what would you like to do most, how many nights, which room. The answer is one price with everything it includes, and one button to book.",
    img: "lesson-shake",
  },
  {
    num: "02",
    title: "Make the package names explain themselves",
    today: "Balance, Yogi, Surf Only and Yoga Only sound clear, but Surf Only also includes unlimited yoga, and the differences only show when you read the lists side by side.",
    idea: "One short line under each name and a simple surf and yoga bar, so the difference is visible at a glance.",
    img: "yoga-deck",
  },
  {
    num: "03",
    title: "Show the rooms before the price",
    today: "The room decides the price, but the rooms are only shown later in the booking system. Guests choose a column in a price table without knowing what it looks like.",
    idea: "The room types with what they are, a photo and a price example, right on the packages page.",
    img: "room",
  },
];

const SMALL = [
  "The footer still says Copyright 2022 and links to Covid-19 safety rules.",
  "Some menu links use a long number in their address. They still work, but look broken when shared.",
  "The free cooking class and Sinhalese lesson only appear in a small banner. They deserve a place in every package.",
];

const OFFER = {
  name: "Your packages page",
  intro: "One project, about 4 to 5 weeks with time for your feedback. Built on your current site or handed to your team, decided together once I've seen your setup.",
  steps: [
    {
      title: "Shape it together",
      time: "about 2 weeks",
      items: [
        "Kickoff with you",
        "Final structure of the packages page, from this mockup",
        "Package names and short texts sharpened with you",
        "Review call: you approve before anything is built",
      ],
    },
    {
      title: "Build and launch",
      time: "about 2 to 3 weeks",
      items: [
        "The package finder with your real prices",
        "Room types shown on the page",
        "Linked to the booking system you already use",
        "Launched with you or your team, the way that fits your setup",
      ],
    },
  ],
};

const EXTRAS = ["The same approach for your other camps", "Small fixes across the site, like the footer and menu links", "Monthly care: price updates and small changes"];

const STEPS = [
  { title: "Talk it through", text: "A short call where we go through these ideas and you tell me what matters most for you." },
  { title: "Confirm", text: "I send a written offer with a price range, and we pick a start date. The fixed price follows after the kickoff, once I've seen your setup." },
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
            <span aria-current="page">Surf &amp; Yoga Mirissa</span>
          </nav>
          <Image src={`${IMG}/logo-teal.png`} alt="Surf & Yoga Mirissa" width={240} height={56} className={own.heroLogo} priority />
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            Ideas for Surf &amp; Yoga Mirissa
          </p>
          <h1>
            You said yes.
            <br />
            Here are my ideas.
          </h1>
          <p className={styles.lead}>
            For Ameila: in February you said yes to a few concrete ideas for your website. Here they
            are, for your packages page, with a first mockup you can click through.
          </p>
          <p className={styles.byline}>Jan Brunnenkant · Well Edge Creative · November 2026</p>
          <nav className={styles.jumpNav} aria-label="Sections">
            <a href="#see">What works</a>
            <a href="#ideas">Three ideas</a>
            <a href="#mockup">Try the mockup</a>
            <a href="#options">The offer</a>
          </nav>
        </section>

        <div className={own.strip} aria-label="Life at the camp">
          {STRIP.map((img) => (
            <div key={img} className={own.stripImg}>
              <Image src={`${IMG}/${img}.webp`} alt="" fill sizes="(max-width: 900px) 50vw, 17vw" />
            </div>
          ))}
        </div>
        <p className={own.stripNote}>All photos from surfnyogasrilanka.com.</p>

        {/* Strengths */}
        <section id="see" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              What already works
            </p>
            <h2>The camp is great, and your site already shows it.</h2>
            <p>So I wouldn&apos;t rebuild everything. The one page I would work on is the packages page, where guests decide.</p>
          </div>
          <div className={styles.grid2}>
            {STRENGTHS.map((s) => (
              <article key={s.title} className={styles.card}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Ideas */}
        <section id="ideas" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                Three ideas for your packages page
              </p>
              <h2>Make choosing as easy as being there.</h2>
              <p>Checked on 17 November 2026 on surfnyogasrilanka.com/packages.</p>
            </div>
            <div className={own.ideas}>
              {IDEAS.map((i) => (
                <article key={i.num} className={own.idea}>
                  <div className={own.ideaImg}>
                    <Image src={`${IMG}/${i.img}.webp`} alt="" fill sizes="(max-width: 900px) 100vw, 30vw" />
                    <span>{i.num}</span>
                  </div>
                  <div className={own.ideaText}>
                    <h3>{i.title}</h3>
                    <p className={own.today}>
                      <strong>Today</strong>
                      {i.today}
                    </p>
                    <p className={own.idealine}>
                      <strong>The idea</strong>
                      {i.idea}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <div className={own.small}>
              <h3>And a few small things I noticed</h3>
              <ul>
                {SMALL.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Mockup */}
        <section id="mockup" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              Try it · your packages page
            </p>
            <h2>Pick a package, nights and a room. See your price.</h2>
            <p>Your real prices and inclusions, your photos, logo, font and colours. Click through it here, or open it full screen.</p>
          </div>
          <p className={styles.draftNote}>
            <strong>A first mockup, not a finished design.</strong> All prices and inclusions are
            taken from your current packages page. Layout and texts are shaped together with you.
          </p>
          <div className={styles.browser}>
            <div className={styles.browserBar}>
              <span className={styles.lights}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.address}>surfnyogasrilanka.com/packages</span>
              <a href={MOCKUP} target="_blank" rel="noopener" className={styles.fullscreen}>
                Open full screen ↗
              </a>
            </div>
            <iframe src={MOCKUP} title="Packages page mockup for Surf & Yoga Mirissa" className={styles.frame} loading="lazy" />
            {/* On phones a page inside a page cannot be used well, so it opens on its own. */}
            <a href={MOCKUP} className={styles.phonePoster}>
              <Image src={`${IMG}/hero-boards.webp`} alt="" fill sizes="100vw" />
              <span className={styles.posterShade} />
              <span className={styles.posterText}>
                <span className={styles.posterTitle}>Find your package in three steps</span>
                <span className={`${styles.posterButton} ${own.posterButton}`}>Open the mockup →</span>
              </span>
            </a>
          </div>
        </section>

        {/* Work */}
        <section className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
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
                <p>A remote eco-retreat that needed to speak to guests and to retreat leaders at once, with both paths side by side.</p>
                <Link href="/en/case-studies/brisa-bahia" className={styles.textLink}>
                  Read the Brisa Bahía case study <Arrow />
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* Offer */}
        <section id="options" className={`${styles.wrap} ${styles.section}`}>
          <div className={`${styles.sectionHead} ${styles.center}`}>
            <p className={`${styles.eyebrow} ${styles.centerEyebrow}`}>
              <span className={styles.dot} />
              The offer
            </p>
            <h2>One page. One project. You approve before I build.</h2>
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
              <p className={styles.packageIntro}>Nice to have, not needed to start.</p>
              <ul>
                {EXTRAS.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </article>
          </div>
          <p className={styles.priceNote}>
            A fixed price, confirmed in writing after the kickoff once I&apos;ve seen your setup, paid in
            two parts: at the start and at launch.
          </p>
        </section>

        {/* Next steps */}
        <section className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
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
          </div>
        </section>

        {/* Close */}
        <section className={styles.darkBand}>
          <div className={`${styles.wrap} ${styles.section} ${styles.close}`}>
            <h2>Let&apos;s make choosing a package as easy as the first wave.</h2>
            <p>Thank you, Ameila, for your yes. I&apos;d love to walk you through this in a short call.</p>
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
        selector={[styles.card, styles.browser, styles.caseCard, styles.package, own.idea]
          .map((c) => `.${c}`)
          .join(",")}
      />
    </>
  );
}
