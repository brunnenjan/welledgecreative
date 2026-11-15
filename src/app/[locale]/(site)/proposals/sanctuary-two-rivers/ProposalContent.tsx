import Image from "next/image";
import Link from "next/link";
import { Fraunces, Manrope } from "next/font/google";
import Header from "@/components/Header";
import ProposalMotion from "./ProposalMotion";
import SanctuaryMark from "./SanctuaryMark";
import styles from "./proposal.module.css";

/**
 * Proposal for The Sanctuary at Two Rivers (Uvita, Costa Rica). English only, like the
 * conversation with Kathryn. Facts about their site were checked on 15 November 2026.
 * Prices: set `price` on a package to show it; without one the card says the fixed price is
 * confirmed in writing.
 */

const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz", "SOFT"] });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500"] });

const CHECKED = "15 November 2026";
const MOCKUP = "/en/proposals/sanctuary-two-rivers/homepage";

const STRENGTHS = [
  {
    title: "A place nobody can copy",
    text: "Forty secluded acres where Rio Lajas and Rio Cacao meet, with two rivers and two waterfalls on your own land. Most retreat centers would build their whole brand on one of those.",
  },
  {
    title: "Proof that guests trust you",
    text: "A 4.9 out of 5 traveller rating, and retreat leaders who write that their guests still talk about the place.",
  },
  {
    title: "Spaces made for groups",
    text: "The 1,200 sq ft teak Yoga Pagoda, open-air decks, pool and spa, Zen Jungle Lofts and Studio Houses, built by local artisans on Vastu principles.",
  },
  {
    title: "A team that hosts",
    text: "Tamara and Perrey on site and Kathryn guiding bookings, so retreat leaders can focus on their group while you handle the rest.",
  },
];

const GAPS = [
  {
    title: "Two audiences share one path",
    text: "Retreat leaders who want to host and guests who want to join land on the same homepage, which asks them to click 37 different links. Neither gets one clear next step.",
  },
  {
    title: "The first screen doesn't say what makes you rare",
    text: "Your hero film opens high above the coast. The meeting of two rivers inside the jungle, the thing nobody else has, only appears further down.",
  },
  {
    title: "Hosts can't size you up quickly",
    text: "The hosting page has no rates, no availability and no venue sheet. Capacity reads 18 to 22 guests on the homepage and up to 26 on the hosting page. Leaders comparing venues need these facts in one place.",
  },
  {
    title: "The calendar looks empty",
    text: "The retreat calendar lists one retreat, Respira from 7 to 12 November 2026, which has already taken place. A guest who checks it sees nothing to book.",
  },
  {
    title: "The brand feels assembled",
    text: "Six different typefaces and a lavender accent that says little about river, teak or jungle. Press from The New York Times and Yoga Journal sits in a row of logos. The place looks more premium in person than online.",
  },
  {
    title: "Heavy and hard to read for Google",
    text: "The main heading sits in the page code eight times, the homepage loads 91 images and runs to more than 10,000 characters. Search engines and visitors both lose the thread.",
  },
];

const CHANGES = [
  {
    today: "One homepage for leaders and guests, 37 links",
    change: "Two doors on the first screen: Host your retreat and Join a retreat, each with its own path and one button at the end",
    effect: "Every visitor knows in seconds where to go. More inquiries reach Kathryn, fewer get lost on the way.",
  },
  {
    today: "No rates, availability or venue sheet for hosts",
    change: "A venue kit: capacity, spaces, what's included, rates from, a downloadable venue sheet and a form that asks for dates and group size",
    effect: "Leaders can put you on their shortlist without emailing first. Inquiries arrive qualified, so Kathryn spends her time on groups that fit.",
  },
  {
    today: "A calendar with one past retreat",
    change: "A retreat calendar with dates, leader, price from and a register button, easy for your team to keep current",
    effect: "Guests can book the moment they decide, instead of writing and waiting.",
  },
  {
    today: "Coastline first, the two rivers later",
    change: "The story told in the order it happens: the meeting of two rivers, then forty acres, two waterfalls, the walk in",
    effect: "People remember you after one visit, and you stop competing on price with every jungle retreat.",
  },
  {
    today: "Six typefaces, a lavender accent, press hidden",
    change: "A calm identity: a simplified mark, one palette from river, teak and jungle, two typefaces, press and the 4.9 rating up front",
    effect: "The site feels as premium as a stay with you, which supports your rates and the leaders who bring groups.",
  },
  {
    today: "Eight main headings, 91 images, English only",
    change: "One heading per page, compressed images, clean titles, and a site prepared for a second language",
    effect: "Faster pages, better chances on searches like yoga retreat center Costa Rica, and a door to leaders in new markets.",
  },
];

const HOMEPAGE = [
  { title: "Where Two Rivers Meet, Nature Heals", text: "Your own headline moves to the first screen, with the river behind it, the rating and your press, and two doors: Host or Join." },
  { title: "The arrival, like a film", text: "The picture holds while the story moves on: the walk in, the two rivers, forty acres, home. People feel the place before they read about it." },
  { title: "Numbers that stay", text: "40 acres, 2 rivers and 2 waterfalls, up to 26 guests, over 10 years of hosting. Counted up as you scroll." },
  { title: "A door for retreat leaders", text: "Why hosts choose you, your three hosting steps, Jessica's words and one clear inquiry button." },
  { title: "A door for guests", text: "One card per retreat with dates, leader, price from and register." },
  { title: "Spaces, rituals, voices, people", text: "The spaces drift past sideways, then food and ceremonies, guest voices, Tamara and Perrey, and your real inquiry form." },
];

const PALETTE = [
  { name: "River", hex: "#2F5D58", role: "Main colour, links, calm surfaces", ink: "#fff" },
  { name: "Jungle", hex: "#17241C", role: "Deep backgrounds, the host world", ink: "#fff" },
  { name: "Teak", hex: "#A8643A", role: "The one accent: every main button", ink: "#fff" },
  { name: "Stone", hex: "#F4EFE6", role: "Paper, pages, light backgrounds", ink: "#1f2420" },
  { name: "Mist", hex: "#E7ECE4", role: "Quiet sections and cards", ink: "#1f2420" },
];

const BRAND_INCLUDES = [
  "Logo refined with you, in a full set: horizontal, stacked, mark only, light and dark",
  "Colour and type system with clear rules",
  "A photo style guide, so new pictures feel like the place",
  "Templates: venue sheet, retreat flyer, Instagram posts and stories",
  "A short brand guide (PDF) your team and retreat leaders can use",
];

type Package = {
  name: string;
  tag: string;
  intro: string;
  items: string[];
  featured?: boolean;
  price?: string;
};

const PACKAGES: Package[] = [
  {
    name: "Brand",
    tag: "Identity refresh",
    intro: "For a look that matches the place, used across website, Instagram, signs and print.",
    items: [
      "Refined logo and a logo set for every size",
      "Colour palette from river, teak and jungle",
      "Two typefaces and clear rules for using them",
      "Short brand guide for your team",
    ],
  },
  {
    name: "Everything",
    tag: "Recommended",
    intro: "Brand and website built together, so every part speaks with one voice from day one.",
    items: [
      "Everything in Brand and Website",
      "Designed venue sheet (PDF) for retreat leaders",
      "Website prepared for a second language",
      "Launch support and a review of the first inquiries",
    ],
    featured: true,
  },
  {
    name: "Website",
    tag: "New structure and build",
    intro: "For more inquiries from retreat leaders and more registrations from guests.",
    items: [
      "Host and Join journeys with their own pages",
      "Venue kit page and an inquiry form with dates and group size",
      "Retreat calendar your team can update",
      "Speed and search basics on every page",
      "Built on WordPress, so your team keeps working the way it does today",
    ],
  },
];

const EXTRAS = [
  { title: "Second language", text: "Spanish, German or another language, fully translated and set up." },
  { title: "Venue sheet", text: "A designed PDF for retreat leaders, also on its own without a new site." },
  { title: "Care plan", text: "Monthly updates, new retreat dates and small changes handled for you." },
];

const STEPS = [
  { title: "Talk it through", text: "A 30-minute call where we go through this page together and you tell me what matters most." },
  { title: "Shape the package", text: "You pick a package or we adjust one. I confirm scope, timeline and a fixed price in writing." },
  { title: "Start", text: "A short kick-off with your team, then first brand directions and the new site structure to review." },
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
            <span aria-current="page">The Sanctuary at Two Rivers</span>
          </nav>
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            Proposal for The Sanctuary at Two Rivers
          </p>
          <h1>
            A brand and website
            <br />
            as rare as the place itself.
          </h1>
          <p className={styles.lead}>
            For Kathryn, Tamara and Perrey: what I see today, what I would change, and how it brings
            more retreat leaders and guests to book with you.
          </p>
          <p className={styles.byline}>Jan Brunnenkant · Well Edge Creative · November 2026</p>
          <nav className={styles.jumpNav} aria-label="Sections">
            <a href="#see">What I see</a>
            <a href="#help">What I would change</a>
            <a href="#mockup">Your new homepage</a>
            <a href="#brand">Your brand</a>
            <a href="#work">Retreat work</a>
            <a href="#options">Options</a>
            <a href="#next">Next steps</a>
          </nav>
        </section>

        {/* In short */}
        <section className={`${styles.wrap} ${styles.short}`} aria-label="In short">
          <div className={styles.shortItem}>
            <span>What I see</span>
            <p>A place nobody can copy, and a website that hides it behind 37 links and six typefaces.</p>
          </div>
          <div className={styles.shortItem}>
            <span>What I would do</span>
            <p>A calm brand from river, teak and jungle, and a homepage with two doors: Host and Join.</p>
          </div>
          <div className={styles.shortItem}>
            <span>What it brings</span>
            <p>More qualified inquiries from retreat leaders, and guests who can book the moment they decide.</p>
          </div>
        </section>

        {/* Strengths */}
        <section id="see" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              What you already have
            </p>
            <h2>Most retreat centers would love to have your starting point.</h2>
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

        {/* Gaps */}
        <section className={styles.darkBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                What holds it back online
              </p>
              <h2>Your website doesn&apos;t show what your place does to people yet.</h2>
              <p>Checked on {CHECKED}, on your homepage and the hosting page.</p>
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
            <h2>Each change has one job: more of the right people booking with you.</h2>
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
                Built with your own photos, facts and guest voices, in the new structure and brand
                direction. Scroll inside it, or open it full screen.
              </p>
            </div>
            <p className={styles.draftNote}>
              <strong>A first mockup, not a finished design.</strong> It shows the direction: the
              structure, the story and the feel. Layout, copy and photos are shaped together with
              you before anything is built.
            </p>
            <div className={styles.browser}>
              <div className={styles.browserBar}>
                <span className={styles.lights}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.address}>thesanctuarycostarica.com</span>
                <a href={MOCKUP} target="_blank" rel="noopener" className={styles.fullscreen}>
                  Open full screen ↗
                </a>
              </div>
              <iframe
                src={MOCKUP}
                title="Homepage mockup for The Sanctuary at Two Rivers"
                className={styles.frame}
                loading="lazy"
              />
            </div>
            <p className={styles.mockNote}>
              First mockup of the homepage only. The retreat card uses your last listed retreat as an
              example. The other pages follow once the direction is agreed.
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
          </div>
        </section>

        {/* Brand */}
        <section id="brand" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              Your brand · a first direction
            </p>
            <h2>A mark for the place where two rivers become one.</h2>
            <p>
              Two lines flow together and continue as one, the way Rio Lajas and Rio Cacao meet on your
              land. This is the sketch from the mockup taken one step further. In the Brand package we
              develop it with you into a complete identity.
            </p>
          </div>
          <p className={styles.draftNote}>
            <strong>First sketches, not final designs.</strong> The mark, colours, typefaces and the
            examples below, like the business cards, show the direction we would take. Every detail
            is developed and refined together with you in the Brand phase.
          </p>

          <div className={styles.brandBoard}>
            <div className={`${styles.brandTile} ${styles.tileLogo}`}>
              <div className={`${styles.lockup} ${serif.className}`}>
                <SanctuaryMark size={64} stroke={1.6} />
                <span>
                  The Sanctuary
                  <small>at Two Rivers</small>
                </span>
              </div>
              <span className={styles.tileLabel}>Primary logo</span>
            </div>
            <div className={`${styles.brandTile} ${styles.tileDark}`}>
              <div className={`${styles.stacked} ${serif.className}`}>
                <SanctuaryMark size={58} stroke={1.6} />
                <span>The Sanctuary</span>
                <small>at Two Rivers</small>
              </div>
              <span className={styles.tileLabel}>Stacked, on Jungle</span>
            </div>
            <div className={`${styles.brandTile} ${styles.tileTeak}`}>
              <SanctuaryMark size={88} stroke={1.4} />
              <span className={styles.tileLabel}>Mark only: favicon, signage, stamps</span>
            </div>
            <div className={`${styles.brandTile} ${styles.tileType}`}>
              <div>
                <span className={`${styles.typeBig} ${serif.className}`}>Aa</span>
                <p className={`${styles.typeSample} ${serif.className}`}>
                  Where Two Rivers Meet, <em>Nature Heals</em>
                </p>
                <p className={styles.typeMeta}>Fraunces · headlines and quotes</p>
              </div>
              <div>
                <p className={`${styles.typeBody} ${sans.className}`}>
                  Daily plant-based meals crafted fresh, with gluten-free and vegetarian options always
                  included.
                </p>
                <p className={styles.typeMeta}>Manrope · text, buttons and forms</p>
              </div>
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

          <h3 className={styles.appsHead}>In use · first sketches</h3>
          <div className={styles.apps}>
            <figure className={styles.app}>
              <div className={styles.sheet}>
                <div className={`${styles.sheetTop} ${serif.className}`}>
                  <SanctuaryMark size={26} stroke={1.6} />
                  <span>The Sanctuary<small>at Two Rivers</small></span>
                </div>
                <div className={styles.sheetPhoto}>
                  <Image src="/proposals/sanctuary-two-rivers/pagoda.webp" alt="" fill sizes="260px" />
                </div>
                <p className={`${styles.sheetTitle} ${serif.className}`}>Venue sheet for retreat leaders</p>
                <ul className={styles.sheetFacts}>
                  <li>40 acres</li>
                  <li>Up to 26 guests</li>
                  <li>1,200 sq ft Pagoda</li>
                </ul>
              </div>
              <figcaption>Venue sheet for retreat leaders · sketch</figcaption>
            </figure>
            <figure className={styles.app}>
              <div className={styles.post}>
                <Image src="/proposals/sanctuary-two-rivers/river.webp" alt="" fill sizes="300px" />
                <div className={styles.postShade} />
                <p className={serif.className}>“A space where transformation flows as freely as the rivers.”</p>
                <span className={styles.postMark}>
                  <SanctuaryMark size={22} stroke={1.8} />
                </span>
              </div>
              <figcaption>Instagram post with a guest voice · sketch</figcaption>
            </figure>
            <figure className={styles.app}>
              <div className={styles.cards}>
                <div className={`${styles.bizFront} ${serif.className}`}>
                  <SanctuaryMark size={40} stroke={1.6} />
                </div>
                <div className={styles.bizBack}>
                  <strong className={serif.className}>Kathryn Page</strong>
                  <span>Retreat Booking Guide</span>
                  <small>retreats@thesanctuarycostarica.com</small>
                </div>
              </div>
              <figcaption>Business card, front and back · sketch</figcaption>
            </figure>
          </div>

          <div className={styles.includes}>
            <h3>What the full brand includes</h3>
            <ul>
              {BRAND_INCLUDES.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Work */}
        <section id="work" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              Retreat work
            </p>
            <h2>I have solved these exact problems for other retreats.</h2>
          </div>
          <div className={styles.cases}>
            <article className={styles.caseCard}>
              <div className={styles.vdVisual}>
                <div className={`${styles.miniBrowser} ${styles.vdMain}`}>
                  <div className={styles.miniBar}>
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className={styles.miniShot}>
                    <Image
                      src="/assets/misc/projects/vietnam-detox-relaunch-hero.webp"
                      alt="The Vietnam Detox homepage: German Buchinger Fasting, Vietnamese Healing Wisdom"
                      fill
                      sizes="(max-width: 900px) 90vw, 40vw"
                    />
                  </div>
                </div>
                <div className={`${styles.miniBrowser} ${styles.vdSide}`}>
                  <div className={styles.miniBar}>
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className={`${styles.miniShot} ${styles.miniShotWide}`}>
                    <Image
                      src="/assets/misc/projects/vietnam-detox-relaunch-booking.webp"
                      alt="Vietnam Detox retreat dates shown by month"
                      fill
                      sizes="(max-width: 900px) 70vw, 28vw"
                    />
                  </div>
                </div>
                <div className={styles.langs} aria-label="Languages">
                  <span>EN</span>
                  <span>VI</span>
                  <span>DE</span>
                </div>
              </div>
              <span className={styles.tag}>Vietnam · Asian market</span>
              <h3>Vietnam Detox: one brand, three retreats, three languages</h3>
              <p>
                Guided Buchinger fasting retreats in Vietnam for more than ten years. I built a premium
                brand and a booking-ready website with its own page for each retreat, real dates and
                availability, in English, Vietnamese and German, so it speaks to guests in Asia and in
                Europe alike.
              </p>
              <a
                href="https://vietnamdetox.com"
                target="_blank"
                rel="noopener"
                className={styles.textLink}
              >
                Visit vietnamdetox.com <Arrow />
              </a>
            </article>
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
                A remote location in Capurganá that needed to speak to guests and to retreat leaders at
                once. A new retreat brand and a website with both paths side by side brought the first
                retreat bookings and facilitator inquiries. The same idea fits your Host and Join.
              </p>
              <Link href="/en/case-studies/brisa-bahia" className={styles.textLink}>
                Read the Brisa Bahía case study <Arrow />
              </Link>
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
              <h2>Start with what matters most, or do it all at once.</h2>
            </div>
            <div className={styles.packages}>
              {PACKAGES.map((p) => (
                <article
                  key={p.name}
                  className={`${styles.package} ${p.featured ? styles.featured : ""}`}
                >
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
              Every package is a fixed price, confirmed in writing before we start. No hourly
              surprises.
            </p>
            <div className={styles.extras}>
              <h3>Add when you need it</h3>
              <div className={styles.grid3}>
                {EXTRAS.map((e) => (
                  <div key={e.title} className={styles.extra}>
                    <strong>{e.title}</strong>
                    <p>{e.text}</p>
                  </div>
                ))}
              </div>
            </div>
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
            <h2>Let&apos;s make The Sanctuary look online the way it feels on the ground.</h2>
            <p>
              Thank you, Kathryn, for your yes. I&apos;d love to walk Tamara, Perrey and you through
              this in a short call.
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
