import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import styles from "./proposal.module.css";

/**
 * Proposal for The Sanctuary at Two Rivers (Uvita, Costa Rica). English only, like the
 * conversation with Kathryn. Facts about their site were checked on 15 November 2026.
 * Prices: set `price` on a package to show it; without one the card says the fixed price is
 * confirmed in writing.
 */

const CHECKED = "15 November 2026";

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
    title: "The first screen shows the coast",
    text: "Your hero film opens on the coastline near Uvita. What makes you rare, the meeting of two rivers in the jungle, only appears further down.",
  },
  {
    title: "Hosts can't size you up quickly",
    text: "The hosting page has no rates, no availability and no venue sheet. Capacity reads 18 to 22 guests on the homepage and up to 26 on the hosting page. Leaders comparing venues need these facts in one place.",
  },
  {
    title: "The brand feels assembled",
    text: "The site uses six different typefaces and a lavender accent that says little about river, teak or jungle. The place looks more premium in person than online.",
  },
  {
    title: "Heavy and hard to read for Google",
    text: "The main heading sits in the page code eight times, the homepage loads 91 images and runs to more than 10,000 characters. Search engines and visitors both lose the thread.",
  },
  {
    title: "English only",
    text: "A second language, for example Spanish or German, would let you reach retreat leaders who market to their groups in their own language.",
  },
];

const HELP = [
  {
    tag: "Brand",
    title: "An identity as calm as the place",
    text: "We keep the spirit of your current mark and simplify it so it works from a sign at the gate to a browser tab. One palette taken from river, teak and jungle, two typefaces instead of six, and a short brand guide your team can actually use.",
  },
  {
    tag: "Website",
    title: "Two clear doors: Host and Join",
    text: "A structure built around your two audiences. Retreat leaders follow one path to a qualified inquiry, guests follow another to the retreat calendar and registration. Every page ends in one button, not ten.",
  },
  {
    tag: "Retreat leaders",
    title: "A venue kit that answers before they ask",
    text: "Capacity, room types, what's included, sample rates or ranges, and a downloadable venue sheet. The inquiry form asks for dates and group size, so Kathryn starts every conversation with what she needs.",
  },
  {
    tag: "Guests",
    title: "A retreat calendar people trust",
    text: "Upcoming retreats with dates, the leader, the price from and a clear register button, kept easy to update for your team.",
  },
  {
    tag: "Reach",
    title: "Multilingual from the start",
    text: "Built so a second language can be added without rebuilding anything, the way I set up Vietnam Detox in English, Vietnamese and German.",
  },
  {
    tag: "Speed",
    title: "Fast and findable",
    text: "One main heading per page, compressed images, clean page titles and descriptions, so Google understands what you offer and visitors on a jungle-strength connection still see it quickly.",
  },
];

const HOMEPAGE = [
  { title: "First screen", text: "The confluence of the two rivers from above, your name, one line and two doors: Host a retreat, Join a retreat." },
  { title: "The place in three facts", text: "Forty acres, two rivers, two waterfalls. Short, visual, unforgettable." },
  { title: "Host your retreat here", text: "Why leaders choose you, capacity, what's included, rates from, and the venue sheet." },
  { title: "Join a retreat", text: "The next three retreats with dates and price from, and the full calendar." },
  { title: "The spaces", text: "Pagoda, decks, lofts, pool and spa in large photos with one line each." },
  { title: "Voices", text: "Retreat leaders and guests, with the 4.9 rating up front." },
  { title: "The people", text: "Tamara, Perrey and Kathryn, so a group knows who will look after them." },
  { title: "Getting here and one form", text: "The 15-minute nature walk in, how to arrive, and a single inquiry form." },
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
            <a href="#help">What I would do</a>
            <a href="#work">Retreat work</a>
            <a href="#options">Options</a>
            <a href="#next">Next steps</a>
          </nav>
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

        {/* Help */}
        <section id="help" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              What I would do
            </p>
            <h2>One calm brand, two clear paths, and every visitor led to a booking or an inquiry.</h2>
          </div>
          <div className={styles.grid3}>
            {HELP.map((h) => (
              <article key={h.title} className={styles.card}>
                <span className={styles.tag}>{h.tag}</span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Homepage blueprint */}
        <section className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section} ${styles.blueprint}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                Your new homepage
              </p>
              <h2>Eight sections, each with one job.</h2>
              <p>
                Big photos, few words, and every section pointing to Host or Join. The other pages, the
                copy and the photos would be finalised together with you.
              </p>
            </div>
            <ol className={styles.blueprintList}>
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
              <div className={styles.caseImage}>
                <Image
                  src="/assets/misc/projects/vietnam-detox-device-mockup-2026.webp"
                  alt="The relaunched Vietnam Detox website on desktop, tablet and mobile"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <span className={styles.tag}>Vietnam · Asian market</span>
              <h3>Vietnam Detox: one brand, three retreats, three languages</h3>
              <p>
                Guided Buchinger fasting retreats in Vietnam for more than ten years. I built a premium
                brand and a booking-ready website with its own page for each retreat, real dates and
                availability, in English, Vietnamese and German, so it speaks to guests in Asia and in
                Europe alike.
              </p>
              <Link href="/en/retreats#case-studies" className={styles.textLink}>
                More on the retreat page <Arrow />
              </Link>
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
              <a href="mailto:jan@well-edge-creative.com" className={styles.lightLink}>
                jan@well-edge-creative.com
              </a>
              <a href="https://wa.me/4915789150323" className={styles.lightLink}>
                WhatsApp
              </a>
            </div>
            <p className={styles.sign}>Jan Brunnenkant · Branding & Web Design · Well Edge Creative</p>
          </div>
        </section>
      </main>
    </>
  );
}
