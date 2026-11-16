import Image from "next/image";
import Link from "next/link";
import { Lora, Mulish } from "next/font/google";
import Header from "@/components/Header";
import ProposalMotion from "../ProposalMotion";
import styles from "../proposal.module.css";
import own from "./sonora.module.css";

/**
 * Proposal for Sonora Caribbean Jungle Retreat (Playa Negra, Puerto Viejo, Costa Rica). English,
 * like the conversation with Claire. Facts were checked on 15 and 16 November 2026 on their two
 * websites and Instagram; every photo is their own, the quotes are attributed. The logo stays as it is. Claire likes the idea, the owners have not
 * been spoken to yet, so the page also has to work when she forwards it to them.
 */

const serif = Lora({ subsets: ["latin"], style: ["normal", "italic"] });
const sans = Mulish({ subsets: ["latin"], weight: ["400", "600", "700"] });

const CHECKED = "15 and 16 November 2026";
const IMG = "/proposals/sonora";
const MOCKUP = "/en/proposals/sonora/homepage";

// People first: the hero strip shows life at Sonora before a single word of analysis.
const STRIP = ["ys-yoga-group", "ys-chef", "ig-guest-terrace", "ys-shala-pair", "ig-team", "ys-food-plate"];

const STRENGTHS = [
  {
    title: "Leaders love it and come back",
    text: "Kirby Yoga Retreats calls Sonora Kirby's favorite place to host retreats and consistently a favorite among guests. Three retreats are already listed for 2027.",
  },
  {
    title: "Guests already vouch for you",
    text: "734 reviews on Booking.com and 157 on Google (December 2025), and most guests come through personal recommendations. The trust is there.",
  },
  {
    title: "Everything a retreat needs, on site",
    text: "A 100 m² Yoga Shala in the garden, a saltwater pool, chefs cooking with organic ingredients from local farms, resident teachers, sound baths and healing massage.",
  },
  {
    title: "Guests leave in love",
    text: "Sonora was incredible, walking distance to the beach, and completely immersed in the jungle. I felt extremely safe and at home. Olivia Yarrow, retreat guest",
  },
];

// From the discovery call (22 December 2025) and the proposal call (23 January 2026).
const HEARD = [
  { title: "Contacts are not the problem", text: "Alessandra hears from new retreat leaders every day. Bookings and returning retreats are there." },
  { title: "Leaders find it hard to fill their retreats", text: "Some run half full or get cancelled. Not every leader is good at marketing, so Sonora's website should help them sell." },
  { title: "The first questions are answered too late", text: "Food, group size and price are what people ask first, and the website hides them." },
  { title: "It feels lifeless", text: "Clean and calm, but like a template. You don't feel anything, and the strong real-world experience doesn't come through." },
  { title: "Two sites should become one", text: "With room for every kind of retreat and all your amenities, not only yoga." },
];

const FACTS = [
  { value: "3", label: "retreats already listed for 2027" },
  { value: "30", label: "guests, one group at a time" },
  { value: "100 m²", label: "open-air Yoga Shala" },
  { value: "1", label: "home for all of it, under your mandala" },
];

// Everything Sonora already owns, spread over three places.
const SCATTERED = [
  {
    where: "sonoracostarica.com",
    what: "The hotel site that comes up first: rooms, Oasis restaurant, Host Your Retreat as text, a gallery from 2023.",
    img: "shala.webp",
  },
  {
    where: "puertoviejoyogaretreat.com",
    what: "Your second site, as Yoga Sonora with its own logo: group yoga, sound baths, food, a drone film, testimonials and three retreats for 2027. Not linked from the hotel site.",
    img: "ys-yoga-group.webp",
  },
  {
    where: "@sonora.jungleretreat",
    what: "Instagram, fresh every week: daily yoga, guests on their terraces, your team, the beach.",
    img: "ig-team.webp",
  },
];

const GAPS = [
  {
    title: "Your best content lives on a second website",
    text: "Group yoga, sound baths, the food, the drone film, guest testimonials and your 2027 retreats are on puertoviejoyogaretreat.com, under a second name and logo. The hotel site doesn't link to it, so most people never see it.",
  },
  {
    title: "The main site shows no retreat",
    text: "On sonoracostarica.com, Host Your Retreat is text with three small icons, and the Yoga Shala appears once, in the gallery, with nobody on the mats. A leader can't picture their group there.",
  },
  {
    title: "The gallery stops in 2023",
    text: "Fifteen photos, all uploaded in July 2023: rooms, garden, pool and a few single guests. Your Instagram shows daily yoga, guests and your team in 2026, and none of it reaches the website.",
  },
  {
    title: "The homepage speaks to holidaymakers",
    text: "The first screen says Beautiful beach, relaxing vacation, delicious food. The strongest facts for leaders (one group at a time, up to 30 guests) sit inside a paragraph on a subpage.",
  },
  {
    title: "Most of Sonora is missing from the page",
    text: "Sound baths, healing massage, the chef's food, your team and your guests' words appear nowhere on the main site. The rooms get one line each, and Host Your Retreat ends with For more information, click here.",
  },
  {
    title: "Old technology under the surface",
    text: "WordPress 5.4 from 2020, several major versions behind, no main heading on the homepage for Google, and a WhatsApp video at the top while a real drone film sits on the other site.",
  },
];

const CHANGES = [
  {
    today: "Two websites, two names, two logos",
    change: "One home on sonoracostarica.com under your mandala logo: hotel, retreats, food and experiences together",
    effect: "Every leader and every guest sees all of Sonora in one place. Google sees one strong site instead of two weak ones.",
  },
  {
    today: "A main site with no people on it",
    change: "Your group yoga, sound baths, food, team and Instagram pictures on the homepage, with your drone film as the first moving picture",
    effect: "People see the real Sonora before they arrive: groups, food, faces. The website finally looks like the place.",
  },
  {
    today: "Leaders sell Sonora on their own",
    change: "A page for every retreat at Sonora that leaders send to their guests: the place, the rooms, the food, the shala and real guest voices",
    effect: "Guests fall in love before they book, so leaders fill their retreats more easily and fewer run half full.",
  },
  {
    today: "A homepage for holidaymakers, only yoga",
    change: "Two doors on the first screen, Host your retreat and Stay with us, and room for every kind of retreat: yoga, meditation, dance, training, ceremonies",
    effect: "Retreat leaders and travellers each find their Sonora in seconds.",
  },
  {
    today: "2027 retreats hidden on the second site",
    change: "Upcoming retreats on the homepage, with leader, dates and a link to book",
    effect: "The calendar you already have becomes visible, so the place looks as alive online as it is.",
  },
  {
    today: "Food, group size and price answered too late",
    change: "The first questions answered first: capacity, meals, rates from, experiences and a venue sheet, plus the words of Kirby and her guests",
    effect: "A leader understands in 50 seconds what they get with Sonora, and Claire answers fewer basic questions.",
  },
  {
    today: "WordPress 5.4, no main heading",
    change: "An up-to-date, fast site with clean headings and natural English and Spanish",
    effect: "Safer, faster, easier to find on searches like yoga retreat venue Costa Rica Caribbean.",
  },
];

const CONTENT = [
  {
    img: "ys-yoga-stretch.webp",
    tag: "Already yours",
    title: "Your yoga site",
    text: "Group classes, sound baths, massage, the chef and the food. Beautifully shot, it only needs to move to the main site where people actually look.",
  },
  {
    img: "ig-guest-terrace.webp",
    tag: "Already yours",
    title: "Your Instagram",
    text: "Fresh every week: daily yoga, guests on their terraces, your team, the beach. A simple routine brings the best posts onto the website too.",
  },
  {
    img: "ys-shala-pair.webp",
    tag: "From your leaders",
    title: "Your retreat leaders",
    text: "Kirby and the other leaders post their retreats at Sonora. With their permission we add group moments and credit them, so they get visibility and you get proof.",
  },
  {
    img: "ys-drone-grounds.webp",
    tag: "Already yours",
    title: "Your drone film",
    text: "The aerials on your yoga site open the new homepage, jungle and pool from above. If you ever want fresh ones or a photo day during a retreat, that's an option, not a must.",
  },
];

const HOMEPAGE = [
  { title: "A group in the shala, first", text: "Your own group yoga photo on the first screen, with your words and two doors: Host your retreat or Stay with us." },
  { title: "The walk in, like a film", text: "The path, the stream from above, Playa Negra, a guest on her terrace. People feel the place before they read about it." },
  { title: "Leaders, with proof", text: "Everything a host needs, the activities to add, and Kirby's words about Sonora." },
  { title: "Your 2027 retreats", text: "Here & Now, UPLIFT and Mommy + Me, with dates and leaders, so the place looks alive all year." },
  { title: "Life, food and experiences", text: "Group practice, the chef, your food, sound baths and massage, and a guest's own words." },
  { title: "Rooms, your team, one form", text: "Three rooms, the people who bring Sonora to life, and one inquiry form with dates and group size." },
];

const PALETTE = [
  { name: "Mint", hex: "#A9E2CB", role: "From your mandala: highlights, calm surfaces", ink: "#1e2f2a" },
  { name: "Driftwood", hex: "#857B73", role: "From your wordmark: text and lines", ink: "#fff" },
  { name: "Jungle", hex: "#1E2F2A", role: "Deep backgrounds, the leaders' world", ink: "#fff" },
  { name: "Caribbean", hex: "#2D7F7B", role: "Buttons and links", ink: "#fff" },
  { name: "Sand", hex: "#F6F1EA", role: "Paper and light pages", ink: "#1e2f2a" },
];

// One project with one checkpoint: simpler to say yes to than two separate phases.
const OFFER = {
  name: "The new Sonora website",
  intro: "One project, about 5 to 6 weeks, built from this proposal and what you already have.",
  steps: [
    {
      title: "Shape it together",
      time: "about 2 weeks",
      items: [
        "Kickoff with Claire and Alessandra",
        "Final structure for leaders and guests, from this mockup",
        "Homepage and key pages designed, text written with you",
        "Review call: you approve before anything is built",
      ],
    },
    {
      title: "Build and launch",
      time: "about 3 to 4 weeks",
      items: [
        "Both sites merged into sonoracostarica.com",
        "A page for every retreat that leaders can share",
        "Rooms with your KrossBooking engine, English and Spanish",
        "Fast and up to date, launched and handed over to your team",
      ],
    },
  ],
};

const EXTRAS = [
  "A photo day during a retreat",
  "Fresh drone aerials",
  "Designed venue sheet (PDF) for leaders",
  "Monthly care: new retreats and small changes",
];

const OWNERS = [
  { q: "What is it?", a: "One website for all of Sonora that shows the place as it really is and helps your retreat leaders fill their groups. One project, one fixed price." },
  { q: "Why now?", a: "Your best content sits on a second site most people never see, while the main site runs on 2020 technology and feels empty. The place has moved on, the website hasn't." },
  { q: "Isn't this a big project?", a: "About 5 to 6 weeks in total, and most of the work is mine. No photo shoot is needed, because the pictures already exist. You need a kickoff, a review call and access to both sites." },
  { q: "What if we don't like it?", a: "Nothing is built before you approve the design in the review call. If you stop there, you keep the structure and designs and pay only for that first step." },
];

const STEPS = [
  { title: "Talk it through", text: "A 30-minute call with Claire, Alessandra and Francis, where we go through this page and you tell me what matters most." },
  { title: "Confirm", text: "I send one fixed price in writing, and we pick a start date." },
  { title: "Start", text: "Kickoff with Claire and Alessandra. About two weeks later you review and approve the design, then I build." },
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
            Sonora is full of life.
            <br />
            Let&apos;s show it in one place.
          </h1>
          <p className={styles.lead}>
            For Claire, Alessandra and Francis, building on our calls in December and January: you
            already have the groups, the pictures and the guests who love you. Here is how one website shows Sonora as it really is: alive, full of
            people, and all in one place.
          </p>
          <p className={styles.byline}>Jan Brunnenkant · Well Edge Creative · November 2026</p>
          <nav className={styles.jumpNav} aria-label="Sections">
            <a href="#owners">In one minute</a>
            <a href="#see">What I see</a>
            <a href="#help">What I would change</a>
            <a href="#scattered">Already yours</a>
            <a href="#mockup">Your new homepage</a>
            <a href="#brand">Your brand</a>
            <a href="#options">Options</a>
          </nav>
        </section>

        {/* Life at Sonora, before any analysis */}
        <div className={own.strip} aria-label="Life at Sonora">
          {STRIP.map((img) => (
            <div key={img} className={own.stripImg}>
              <Image src={`${IMG}/${img}.webp`} alt="" fill sizes="(max-width: 900px) 50vw, 17vw" />
            </div>
          ))}
        </div>
        <p className={own.stripNote}>All from Sonora&apos;s own websites and Instagram.</p>

        {/* In short */}
        <section className={`${styles.wrap} ${styles.short}`} aria-label="In short">
          <div className={styles.shortItem}>
            <span>What I see</span>
            <p>Groups, food, guests and a full 2027 calendar, spread over two websites and Instagram.</p>
          </div>
          <div className={styles.shortItem}>
            <span>What I would do</span>
            <p>One new website under your mandala, full of your own pictures, that helps your leaders sell.</p>
          </div>
          <div className={styles.shortItem}>
            <span>What it brings</span>
            <p>A website that feels like a day at Sonora, so what people see online matches what they find when they arrive.</p>
          </div>
        </section>

        {/* For the owners */}
        {/* A div, not a section: the site's global section padding would flatten the box. */}
        <div id="owners" className={`${styles.wrap} ${own.owners}`}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              For Alessandra and Francis · in one minute
            </p>
            <h2>The short version, for the two of you.</h2>
          </div>
          <dl className={own.ownerList}>
            {OWNERS.map((o) => (
              <div key={o.q}>
                <dt>{o.q}</dt>
                <dd>{o.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* What we heard */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              What we heard from you
            </p>
            <h2>The website&apos;s real job: help your leaders fill their retreats.</h2>
            <p>From our calls on 22 December and 23 January.</p>
          </div>
          <ol className={own.heard}>
            {HEARD.map((h, i) => (
              <li key={h.title}>
                <span className={serif.className}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              </li>
            ))}
          </ol>
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

        {/* The facts, at a glance */}
        <div className={`${styles.wrap} ${own.facts}`}>
          {FACTS.map((f) => (
            <div key={f.label}>
              <strong className={serif.className}>{f.value}</strong>
              <span>{f.label}</span>
            </div>
          ))}
        </div>

        {/* In their own words */}
        <section className={`${styles.wrap} ${own.voices}`}>
          <div className={own.phone}>
            <video
              src={`${IMG}/voices.mp4`}
              poster={`${IMG}/voices-poster.webp`}
              controls
              playsInline
              preload="none"
              aria-label="Gabrielle, a retreat leader, talks about Sonora"
            />
          </div>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              In their own words
            </p>
            <h2>“When a place inspires the people you guide, you just keep coming back.”</h2>
            <p className={own.voicesText}>
              Gabrielle, a retreat leader who keeps returning, in a reel on your own Instagram. It is
              exactly the kind of proof a new leader looks for, and today it lives only on Instagram.
            </p>
            <blockquote className={own.voicesQuote}>
              “Kirby&apos;s favorite place to host retreats and consistently a favorite among guests.”
              <cite>Kirby Yoga Retreats</cite>
            </blockquote>
          </div>
        </section>

        {/* Already yours, in three places */}
        <section id="scattered" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                The good news
              </p>
              <h2>You already have everything. It&apos;s just in three places.</h2>
              <p>
                Most retreat centers would need a photo shoot to look like you. You only need to bring
                together what you already own.
              </p>
            </div>
            <div className={own.scattered}>
              {SCATTERED.map((x) => (
                <article key={x.where} className={own.scatterCard}>
                  <div className={own.scatterImg}>
                    <Image src={`${IMG}/${x.img}`} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
                  </div>
                  <span className={own.scatterWhere}>{x.where}</span>
                  <p>{x.what}</p>
                </article>
              ))}
            </div>
            <p className={own.scatterArrow}>
              <span>Three places</span> → <strong>one home on sonoracostarica.com</strong>
            </p>
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
              <h2>Your main website shows the rooms. It doesn&apos;t show the retreats.</h2>
              <p>Checked on {CHECKED}, on sonoracostarica.com, puertoviejoyogaretreat.com and Instagram.</p>
            </div>
            <div className={own.compare}>
              <figure>
                <div className={own.compareImg}>
                  <Image src={`${IMG}/shala.webp`} alt="The Yoga Shala at Sonora with mats laid out and nobody on them" fill sizes="(max-width: 900px) 100vw, 40vw" />
                </div>
                <figcaption>
                  <span>On sonoracostarica.com</span>
                  The only picture of the Yoga Shala, in the gallery. Beautiful, and empty.
                </figcaption>
              </figure>
              <figure>
                <div className={own.compareImg}>
                  <Image src={`${IMG}/ys-yoga-group.webp`} alt="A group class in the Yoga Shala, from Sonora's yoga site" fill sizes="(max-width: 900px) 100vw, 40vw" />
                </div>
                <figcaption>
                  <span className={own.live}>On your yoga site</span>
                  The same shala, full of people. This is what leaders need to see, on the site they
                  actually find.
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
            <h2>Each change has one job: the website shows Sonora as it really is.</h2>
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
                The full program · pictures
              </p>
              <h2>No photo shoot needed to launch.</h2>
              <p>
                The pictures that show Sonora as it is already exist. We bring them together, add your
                retreat leaders&apos; moments with permission, and keep it fresh with a simple routine.
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
              Every photo in this proposal is yours: from sonoracostarica.com, puertoviejoyogaretreat.com
              and @sonora.jungleretreat. Quotes are from your yoga site and Kirby Yoga Retreats.
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
            structure, the story and the feel. Every picture comes from your own websites and
            Instagram. Layout, copy and photos are shaped together with you.
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
              <Image src={`${IMG}/ys-yoga-group.webp`} alt="" fill sizes="100vw" />
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
                rules, so website, Instagram and the venue sheet look like one place. Yoga Sonora,
                today with its own gold logo, becomes part of Sonora under the mandala.
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
                  colours and with your logo. Retreat leaders share it with their co-teachers and guests,
                  so everyone arrives knowing what to expect. Sketch.
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
              Thank you, Claire, for our conversation. I&apos;d love to walk you, Alessandra and
              Francis through this in a short call.
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
