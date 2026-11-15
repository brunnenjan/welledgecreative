import Image from "next/image";
import Link from "next/link";
import { Lora, Mulish } from "next/font/google";
import Header from "@/components/Header";
import ProposalMotion from "../ProposalMotion";
import styles from "../proposal.module.css";
import own from "./sonora.module.css";

/**
 * Proposal for Sonora Caribbean Jungle Retreat (Playa Negra, Puerto Viejo, Costa Rica). English,
 * like the conversation with Claire. Facts about their site were checked on 15 November 2026;
 * every photo is their own. The logo stays as it is. Claire likes the idea, the owners have not
 * been spoken to yet, so the page also has to work when she forwards it to them.
 */

const serif = Lora({ subsets: ["latin"], style: ["normal", "italic"] });
const sans = Mulish({ subsets: ["latin"], weight: ["400", "600", "700"] });

const CHECKED = "15 November 2026";
const IMG = "/proposals/sonora";
const MOCKUP = "/en/proposals/sonora/homepage";

const STRENGTHS = [
  {
    title: "The whole place, for one group",
    text: "Sonora is exclusive to one group at a time, for up to 30 guests. The pool, the terrace and the common areas belong to the group for the whole stay. Many retreat leaders look for exactly that.",
  },
  {
    title: "Jungle, stream and a quiet beach",
    text: "Playa Negra, much less crowded than other beaches on the Caribbean, hundred-year-old trees and a stream running through the land. A setting that feels far away and is easy to reach.",
  },
  {
    title: "Everything a retreat needs, on site",
    text: "A 100 m² Yoga Shala in the middle of the garden, a saltwater pool, chefs cooking with organic ingredients from local farms, and resident teachers for yoga, meditation and dance.",
  },
  {
    title: "Days that fill themselves",
    text: "Surf lessons, horseback rides, bee tours, waterfall hikes, kayak trips and cacao ceremonies can be added to every package, and the Oasis restaurant welcomes guests with dinner under the stars.",
  },
];

const GAPS = [
  {
    title: "The retreat page has no pictures",
    text: "Host Your Retreat is text with three small icons. The Yoga Shala appears once on the whole site, in the gallery, with mats laid out and nobody on them. A leader can't picture their own group there.",
  },
  {
    title: "The gallery stops in 2023",
    text: "Fifteen photos, all uploaded in July 2023: rooms, garden, pool and a few single guests. Meanwhile your Instagram shows daily yoga, guests and your team in 2026, and none of it reaches the website.",
  },
  {
    title: "The homepage speaks to holidaymakers",
    text: "The first screen says Beautiful beach, relaxing vacation, delicious food. Host Your Retreat is one of seven menu items, and the strongest facts (one group at a time, up to 30 guests) sit inside a paragraph on a subpage.",
  },
  {
    title: "Leaders have to ask for everything",
    text: "No rates from, no available dates, no venue sheet to share with a co-teacher. The page ends with For more information, click here and an empty contact form.",
  },
  {
    title: "Room pages say almost nothing",
    text: "Standard Room, Tropical Bungalow and Caribbean Studio each show a gallery and one line: The rate is based on double occupancy including breakfast. Size, beds and views are missing.",
  },
  {
    title: "Old technology under the surface",
    text: "The site runs on WordPress 5.4 from 2020, several major versions behind, the homepage has no main heading for Google, and the film at the top is a WhatsApp video. The English reads like a translation.",
  },
];

const CHANGES = [
  {
    today: "A retreat page without pictures, a gallery from 2023",
    change: "Real retreat pictures: groups practicing, eating and resting at Sonora, from the leaders' own Instagram with their permission, plus a drone flight over jungle, pool and Playa Negra",
    effect: "Leaders see their group here before they write. Every picture is proof that Sonora works for retreats.",
  },
  {
    today: "A homepage for holidaymakers",
    change: "Two doors on the first screen: Host your retreat and Stay with us, each with its own path",
    effect: "Retreat leaders, who bring 30 guests at once, find their way in seconds. Couples still find the rooms.",
  },
  {
    today: "Facts hidden in a paragraph, no rates",
    change: "A venue page with capacity, spaces, meals, activities, rates from, a downloadable venue sheet and a form that asks for dates and group size",
    effect: "Leaders can put Sonora on their shortlist without emailing first. Claire gets inquiries that already fit.",
  },
  {
    today: "No sign of the retreats that happen here",
    change: "A section for upcoming retreats at Sonora, with the leader's name, dates and a link to their booking",
    effect: "Guests can join a retreat, leaders get visibility for theirs, and the place looks alive all year.",
  },
  {
    today: "Room pages with one line",
    change: "Each room with size, beds, view, what's included and the Booking.com engine you already use",
    effect: "Fewer questions by mail, more direct bookings.",
  },
  {
    today: "WordPress 5.4, no main heading, a phone video",
    change: "An up-to-date, fast site with clean headings, short film loops from the drone and the retreats, and natural English and Spanish",
    effect: "Safer, faster, easier to find on searches like yoga retreat venue Costa Rica Caribbean.",
  },
];

const CONTENT = [
  {
    img: "ig-yoga-class.webp",
    tag: "Already there",
    title: "Your own Instagram",
    text: "Daily yoga, guests on their terraces, your team, the beach: your account already shows the life the website is missing. These pictures go straight onto the new site, next to your best website photos.",
  },
  {
    img: "lounge.webp",
    tag: "From your groups",
    title: "Retreat pictures from Instagram",
    text: "The leaders who host at Sonora post their retreats too. We ask them for permission, pick the best group moments and credit them on the site. They get visibility, you get real pictures of whole groups at Sonora.",
  },
  {
    img: "grounds.webp",
    tag: "New",
    title: "A drone flight",
    text: "A drone pilot I know is in the area. Jungle, stream, pool and Playa Negra from above, as photos and short film loops for the first screen.",
  },
  {
    img: "yoga-guest.webp",
    tag: "New",
    title: "A day with a group",
    text: "With a leader's consent, one session, one meal and one evening photographed during a real retreat. After that, a simple routine so new pictures keep coming in.",
  },
];

const HOMEPAGE = [
  { title: "Your Caribbean Jungle Retreat", text: "Your own words on the first screen, with the garden behind them and two doors: Host your retreat or Stay with us." },
  { title: "The walk in, like a film", text: "The picture holds while the story moves on: the path, the stream, the shala, the pool. People feel the place before they read about it." },
  { title: "The facts leaders look for", text: "One group at a time, up to 30 guests, a 100 m² Yoga Shala, a saltwater pool. Counted up as you scroll." },
  { title: "Life at Sonora", text: "Daily yoga, guests, your team and the beach, straight from your Instagram, with one place marked for the drone flight." },
  { title: "Rooms, the Oasis and your team", text: "Three rooms with what's included, the restaurant with dinner under the stars, and the people who bring Sonora to life." },
  { title: "One inquiry form", text: "Dates, group size and the kind of retreat, so Claire can answer with availability right away." },
];

const PALETTE = [
  { name: "Mint", hex: "#A9E2CB", role: "From your mandala: highlights, calm surfaces", ink: "#1e2f2a" },
  { name: "Driftwood", hex: "#857B73", role: "From your wordmark: text and lines", ink: "#fff" },
  { name: "Jungle", hex: "#1E2F2A", role: "Deep backgrounds, the leaders' world", ink: "#fff" },
  { name: "Caribbean", hex: "#2D7F7B", role: "Buttons and links", ink: "#fff" },
  { name: "Sand", hex: "#F6F1EA", role: "Paper and light pages", ink: "#1e2f2a" },
];

type Package = { name: string; tag: string; intro: string; items: string[]; featured?: boolean };

const PACKAGES: Package[] = [
  {
    name: "Content",
    tag: "Pictures and film",
    intro: "For a site that finally shows retreats happening at Sonora, usable everywhere from day one.",
    items: [
      "Retreat pictures gathered from your groups, with permission",
      "Drone flight: photos and short film loops",
      "A photo day during a retreat",
      "Selection and editing of your existing photos",
    ],
  },
  {
    name: "Everything",
    tag: "Recommended",
    intro: "New pictures and a new website together, so the site launches full of life.",
    items: [
      "Everything in Content and Website",
      "Designed venue sheet (PDF) for retreat leaders",
      "Brand system around your existing logo",
      "Launch support and a review of the first inquiries",
    ],
    featured: true,
  },
  {
    name: "Website",
    tag: "New structure and build",
    intro: "For more inquiries from retreat leaders and more direct room bookings.",
    items: [
      "Host and Stay paths with their own pages",
      "Venue page with an inquiry form for dates and group size",
      "Upcoming retreats your team can update",
      "Room pages with your Booking.com engine",
      "English and Spanish, fast and up to date",
    ],
  },
];

const OWNERS = [
  { q: "What is it?", a: "New pictures of retreats at Sonora and a new website built around them, so retreat leaders choose Sonora more often." },
  { q: "Why now?", a: "The site still runs on 2020 technology and shows none of the retreats that happen here. Every month it stays that way, leaders compare Sonora on photos of empty rooms." },
  { q: "What does it ask of you?", a: "One kick-off call, a few approvals along the way, and access to the current site. Claire and I handle the rest." },
  { q: "Can we start small?", a: "Yes. Content and Website work on their own. Each package is a fixed price, confirmed in writing before anything starts." },
];

const STEPS = [
  { title: "Talk it through", text: "A 30-minute call with Claire and the owners, where we go through this page and you tell me what matters most." },
  { title: "Shape the package", text: "You pick a package or we adjust one. I confirm scope, timeline and a fixed price in writing." },
  { title: "Start", text: "Permissions from your retreat leaders, the drone flight, then the new site structure to review." },
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
            <span aria-current="page">Sonora</span>
          </nav>
          <Image src={`${IMG}/logo.png`} alt="Sonora Caribbean Jungle Retreat" width={150} height={150} className={own.heroLogo} priority />
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            Proposal for Sonora Caribbean Jungle Retreat
          </p>
          <h1>
            Retreats happen at Sonora
            <br />
            all year. Let&apos;s show them.
          </h1>
          <p className={styles.lead}>
            For Claire and the owners of Sonora: what I see today, what I would change, and how new
            pictures and a new website bring more retreat leaders to Playa Negra.
          </p>
          <p className={styles.byline}>Jan Brunnenkant · Well Edge Creative · November 2026</p>
          <nav className={styles.jumpNav} aria-label="Sections">
            <a href="#owners">In one minute</a>
            <a href="#see">What I see</a>
            <a href="#help">What I would change</a>
            <a href="#content">New pictures</a>
            <a href="#mockup">Your new homepage</a>
            <a href="#brand">Your brand</a>
            <a href="#options">Options</a>
          </nav>
        </section>

        {/* In short */}
        <section className={`${styles.wrap} ${styles.short}`} aria-label="In short">
          <div className={styles.shortItem}>
            <span>What I see</span>
            <p>A place made for retreats, and a website with no picture of a retreat on it.</p>
          </div>
          <div className={styles.shortItem}>
            <span>What I would do</span>
            <p>Real retreat pictures and a drone flight, then a homepage with two doors: Host and Stay.</p>
          </div>
          <div className={styles.shortItem}>
            <span>What it brings</span>
            <p>Leaders who see their group at Sonora before they write, and inquiries that already fit.</p>
          </div>
        </section>

        {/* For the owners */}
        <section id="owners" className={`${styles.wrap} ${own.owners}`}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              For the owners · in one minute
            </p>
            <h2>The short version, if this page was forwarded to you.</h2>
          </div>
          <dl className={own.ownerList}>
            {OWNERS.map((o) => (
              <div key={o.q}>
                <dt>{o.q}</dt>
                <dd>{o.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Strengths */}
        <section id="see" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              What you already have
            </p>
            <h2>Sonora has what retreat leaders look for.</h2>
          </div>
          <div className={own.strengths}>
            <div className={own.strengthPhoto}>
              <Image src={`${IMG}/ig-guest-terrace.webp`} alt="A guest on her terrace at Sonora" fill sizes="(max-width: 900px) 100vw, 45vw" />
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

        {/* Gaps */}
        <section className={styles.darkBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                What holds it back online
              </p>
              <h2>Your website shows the rooms. It doesn&apos;t show the retreats.</h2>
              <p>Checked on {CHECKED}, on your homepage, the Host Your Retreat page, the rooms and the gallery.</p>
            </div>
            <div className={own.compare}>
              <figure>
                <div className={own.compareImg}>
                  <Image src={`${IMG}/shala.webp`} alt="The Yoga Shala at Sonora with mats laid out and nobody on them" fill sizes="(max-width: 900px) 100vw, 40vw" />
                </div>
                <figcaption>
                  <span>On your website</span>
                  The only picture of the Yoga Shala, in the gallery. Beautiful, and empty.
                </figcaption>
              </figure>
              <figure>
                <div className={own.compareImg}>
                  <Image src={`${IMG}/ig-yoga-class.webp`} alt="A class in the Yoga Shala, posted on Sonora's Instagram" fill sizes="(max-width: 900px) 100vw, 40vw" />
                </div>
                <figcaption>
                  <span className={own.live}>On your Instagram</span>
                  Daily yoga at Sonora. The same shala, alive. This is what leaders need to see.
                </figcaption>
              </figure>
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

        {/* Changes and effects */}
        <section id="help" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              What I would change
            </p>
            <h2>Each change has one job: more retreat leaders choosing Sonora.</h2>
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

        {/* Content plan */}
        <section id="content" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                The full program · new pictures
              </p>
              <h2>A site full of life, without waiting for a photo shoot.</h2>
              <p>
                The pictures that make leaders say yes already exist: on your own Instagram and on
                the accounts of the groups you host. Together with a drone flight, the new site
                launches full.
              </p>
            </div>
            <div className={own.contentGrid}>
              {CONTENT.map((c) => (
                <article key={c.title} className={own.contentCard}>
                  <div className={own.contentImg}>
                    <Image src={`${IMG}/${c.img}`} alt="" fill sizes="(max-width: 900px) 100vw, 25vw" />
                    <span className={own.contentTag}>{c.tag}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </article>
              ))}
            </div>
            <p className={own.contentNote}>
              Every photo in this proposal is yours: from your current website and your own
              Instagram, @sonora.jungleretreat. Pictures from retreat leaders and the drone are
              planned and only used with permission.
            </p>
          </div>
        </section>

        {/* Homepage mockup */}
        <section id="mockup" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              A first look · homepage only
            </p>
            <h2>Your new homepage</h2>
            <p>
              Built with your own logo, photos, Instagram and words, in the new structure. Scroll inside it, or
              open it full screen.
            </p>
          </div>
          <p className={styles.draftNote}>
            <strong>A first mockup, not a finished design.</strong> It shows the direction: the
            structure, the story and the feel. Many pictures come from your own Instagram; where
            drone footage will go, the mockup says so. Layout, copy and photos are shaped together
            with you.
          </p>
          <div className={styles.browser}>
            <div className={styles.browserBar}>
              <span className={styles.lights}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.address}>sonoracostarica.com</span>
              <a href={MOCKUP} target="_blank" rel="noopener" className={styles.fullscreen}>
                Open full screen ↗
              </a>
            </div>
            <iframe src={MOCKUP} title="Homepage mockup for Sonora Caribbean Jungle Retreat" className={styles.frame} loading="lazy" />
            {/* On phones a page inside a page cannot be scrolled well, so it opens on its own. */}
            <a href={MOCKUP} className={styles.phonePoster}>
              <Image src={`${IMG}/path-bridge.webp`} alt="" fill sizes="100vw" />
              <span className={styles.posterShade} />
              <span className={styles.posterText}>
                <span className={`${styles.posterTitle} ${serif.className}`}>
                  Your Caribbean <em>Jungle Retreat</em>
                </span>
                <span className={`${styles.posterButton} ${own.posterButton}`}>Open the homepage mockup →</span>
              </span>
            </a>
          </div>
          <p className={styles.mockNote}>
            First mockup of the homepage only. The other pages follow once the direction is agreed.
          </p>
          <ol className={styles.mockPoints}>
            {HOMEPAGE.map((s, i) => (
              <li key={s.title}>
                <span className={styles.blueprintNum}>{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Brand */}
        <section id="brand" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                Your brand · the logo stays
              </p>
              <h2>Your mandala stays. Everything around it gets calmer.</h2>
              <p>
                The Sonora logo is already recognisable, so it stays exactly as it is. What changes is
                the system around it: colours taken from the logo itself, two typefaces and clear
                rules, so website, Instagram and the venue sheet look like one place.
              </p>
            </div>
            <p className={styles.draftNote}>
              <strong>First direction, not final.</strong> Colours, typefaces and the examples below
              are refined together with you.
            </p>
            <div className={own.brandRow}>
              <div className={`${own.logoTile} ${own.logoLight}`}>
                <Image src={`${IMG}/logo.png`} alt="Sonora logo on sand" width={220} height={220} />
                <span>Your logo, unchanged · on Sand</span>
              </div>
              <div className={`${own.logoTile} ${own.logoDark}`}>
                <Image src={`${IMG}/logo-light.png`} alt="Sonora logo on Jungle" width={220} height={220} />
                <span>Light version · on Jungle</span>
              </div>
              <div className={own.typeTile}>
                <p className={`${own.typeBig} ${serif.className}`}>
                  Your Caribbean <em>Jungle Retreat</em>
                </p>
                <p className={own.typeMeta}>Lora · headlines and quotes</p>
                <p className={`${own.typeBody} ${sans.className}`}>
                  Sonora is exclusive to one group at a time and can accommodate up to 30 guests.
                </p>
                <p className={own.typeMeta}>Mulish · text and buttons, close to your wordmark</p>
              </div>
            </div>
            <div className={styles.palette}>
              {PALETTE.map((c) => (
                <div key={c.name} className={styles.swatch} style={{ background: c.hex, color: c.ink }}>
                  <strong className={serif.className}>{c.name}</strong>
                  <span>{c.hex}</span>
                  <small>{c.role}</small>
                </div>
              ))}
            </div>
            <div className={own.venueSheet}>
              <div className={own.sheet}>
                <Image src={`${IMG}/logo.png`} alt="" width={64} height={64} />
                <div className={own.sheetPhoto}>
                  <Image src={`${IMG}/pool-hut.webp`} alt="" fill sizes="260px" />
                </div>
                <p className={`${own.sheetTitle} ${serif.className}`}>Host your retreat at Sonora</p>
                <ul className={own.sheetFacts}>
                  <li>One group at a time</li>
                  <li>Up to 30 guests</li>
                  <li>100 m² Yoga Shala</li>
                </ul>
              </div>
              <div>
                <h3>A venue sheet leaders can forward</h3>
                <p>
                  One designed page with capacity, spaces, meals, activities and rates from, in your
                  colours and with your logo. Retreat leaders share it with co-teachers and put Sonora
                  on their shortlist without writing first. Sketch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              Retreat work
            </p>
            <h2>I have done this for other retreats.</h2>
          </div>
          <div className={styles.cases}>
            <article className={styles.caseCard}>
              <div className={styles.caseImage}>
                <Image
                  src="/case-studies/brisa-bahia/mockup-big-screen-tablet-mobile-webiste.webp"
                  alt="The Brisa Bahía website on a large screen, tablet and mobile"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <span className={styles.tag}>Colombia · Caribbean coast</span>
              <h3>Brisa Bahía: a guest journey and a facilitator journey, side by side</h3>
              <p>
                A remote place in Capurganá that needed to speak to guests and to retreat leaders at
                once. A new retreat brand and a website with both paths side by side brought the first
                retreat bookings and facilitator inquiries. The same idea fits your Host and Stay.
              </p>
              <Link href="/en/case-studies/brisa-bahia" className={styles.textLink}>
                Read the Brisa Bahía case study <Arrow />
              </Link>
            </article>
            <article className={styles.caseCard}>
              <div className={styles.caseImage}>
                <Image
                  src="/assets/misc/projects/vietnam-detox-relaunch-hero.webp"
                  alt="The Vietnam Detox homepage"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <span className={styles.tag}>Vietnam · three languages</span>
              <h3>Vietnam Detox: one brand, three retreats, real dates</h3>
              <p>
                Guided Buchinger fasting retreats in Vietnam. A premium brand and a booking-ready
                website with its own page for each retreat, real dates and availability, in English,
                Vietnamese and German.
              </p>
              <a href="https://vietnamdetox.com" target="_blank" rel="noopener" className={styles.textLink}>
                Visit vietnamdetox.com <Arrow />
              </a>
            </article>
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
              <h2>Start with the pictures, or do it all at once.</h2>
            </div>
            <div className={styles.packages}>
              {PACKAGES.map((p) => (
                <article key={p.name} className={`${styles.package} ${p.featured ? styles.featured : ""}`}>
                  <span className={styles.tag}>{p.tag}</span>
                  <h3>{p.name}</h3>
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
              Every package is a fixed price, confirmed in writing before we start. No hourly
              surprises.
            </p>
          </div>
        </section>

        {/* Next steps */}
        <section id="next" className={`${styles.wrap} ${styles.section}`}>
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
            <h2>Let&apos;s show the world what happens at Sonora.</h2>
            <p>
              Thank you, Claire, for our conversation. I&apos;d love to walk you and the owners
              through this in a short call.
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
        selector={[styles.shortItem, styles.card, styles.changeRow, styles.browser, styles.swatch, styles.caseCard, styles.package, own.contentCard, own.logoTile]
          .map((c) => `.${c}`)
          .join(",")}
      />
    </>
  );
}
