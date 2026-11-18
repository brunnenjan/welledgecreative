import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ProposalMotion from "../ProposalMotion";
import styles from "../proposal.module.css";
import own from "./brisa.module.css";

/**
 * Next steps for Brisa Bahía, written to Kary as a friend: Jan built their brand and website in
 * 2025 and spent two months at Brisa. After the August 2026 strategy workshop and the renovation by
 * another developer, this page shows in plain words what Jan would change, what each change does
 * for Kary, and a homepage mockup. Sources: brisabahia.com (checked 18 November 2026), Kary's mails
 * of August and September 2026, the Brand Foundation, the Property and Seasons sheets, Brisa's
 * Instagram and their own photo and video folder.
 */

const IMG = "/proposals/brisa-bahia";
const MOCKUP = "/en/proposals/brisa-bahia/homepage";

const STRIP = ["yoga-deck", "shala", "ig-hatchlings", "veranda", "season-culture", "ig-coast-walk"];

// What changes on the site, and what it does for Kary. Plain words, one line each.
const CHANGES = [
  {
    img: "beach-aerial",
    change: "The homepage opens with the bay itself.",
    why: "A facilitator feels how private and remote Brisa is before reading a single line. That is what makes you different from every other venue.",
  },
  {
    img: "dock",
    change: "Getting here, told step by step, with a map.",
    why: "Medellín, then Acandí or Capurganá, then the boat. The first worry of every facilitator is answered in a minute, without a call.",
  },
  {
    img: "suite",
    change: "Honest answers in your own words.",
    why: "No air conditioning, no hot water, cash only, seats on small planes. Said plainly up front, nobody is surprised, and the people who write to you already know what they are coming to.",
  },
  {
    img: "yoga-deck",
    change: "Six clear blocks: what Brisa holds, and what stays with the facilitator.",
    why: "Today that lives in your calls and your hosting guide. On the site, a facilitator sees at a glance how much you take off their plate.",
  },
  {
    img: "season-turtles-duo",
    change: "A calendar of the seasons, with your own pictures.",
    why: "Surf, reef, turtles, fruit, rest or local culture: they pick what their retreat is about and see the best months. It answers \"when should we come?\" for you.",
  },
  {
    img: "founders",
    change: "A short fit check before the first call.",
    why: "Group size, nights, how they fill it, which month. You know who is writing and whether it fits before you spend an hour on a call.",
  },
];

const ALIGN = [
  "The sea seasons read the same on every page. Today the FAQ and your seasons sheet say different things.",
  "The facilitator's free stay has one number. The homepage says from 8 guests, your hosting sheet from 6.",
  "Only upcoming retreats under Upcoming. A March 2026 retreat is still listed.",
  "No \"luxury\" wording, as in your brand foundation.",
];

const OFFER = {
  name: "Your facilitator-first website",
  intro: "About 6 to 7 weeks in two steps, with time for your feedback. On WordPress or a new custom site, whatever we decide together once I've seen the current setup.",
  steps: [
    {
      title: "Shape it together",
      time: "about 3 weeks · ideally at Brisa",
      items: ["Sit down with you and Nhung", "Final homepage, from this mockup", "Host a Retreat page and the fit check", "The honest answers, in your words", "You approve before I build"],
    },
    {
      title: "Build and launch",
      time: "about 3 to 4 weeks",
      items: ["The new homepage", "Host a Retreat with the fit check", "A proper map of the way in", "One version of every fact, site-wide", "Launch with redirects, nothing breaks"],
    },
  ],
};

const EXTRAS = ["Moving off WordPress", "A facilitator story page", "A fresh look at the retreat pages", "Monthly care: dates and small changes"];

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
            <span aria-current="page">Brisa Bahía</span>
          </nav>
          <Image src={`${IMG}/brisa-lockup-jungle.svg`} alt="Brisa Bahía" width={230} height={124} className={own.heroLogo} priority unoptimized />
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            For Kary and Nhung
          </p>
          <h1>
            Here&apos;s what I would
            <br />
            do next.
          </h1>
          <p className={styles.lead}>
            Hey Kary, after our workshop in August and your renovation, I sat down with everything you sent
            me. Here is how I would make the website work for facilitators, what each change does for you,
            and a homepage you can scroll through.
          </p>
          <p className={styles.byline}>Jan · November 2026</p>
          <nav className={styles.jumpNav} aria-label="Sections">
            <a href="#changes">What changes</a>
            <a href="#mockup">The homepage</a>
            <a href="#visit">Coming back</a>
            <a href="#options">The offer</a>
          </nav>
        </section>

        <div className={own.strip} aria-label="Brisa Bahía">
          {STRIP.map((img) => (
            <div key={img} className={own.stripImg}>
              <Image src={`${IMG}/${img}.webp`} alt="" fill sizes="(max-width: 900px) 50vw, 17vw" />
            </div>
          ))}
        </div>
        <p className={own.stripNote}>Only your own pictures: your site, your Instagram, your photo folder and our film.</p>

        {/* What changes, and why */}
        <section id="changes" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              What changes, and what it does for you
            </p>
            <h2>Six changes. Each one takes a question off your plate.</h2>
            <p>
              Your new homepage already answers travel and safety well, and Experiences and Gather are great.
              I would build on that.
            </p>
          </div>
          <ol className={own.changes}>
            {CHANGES.map((c, i) => (
              <li key={c.change} className={own.changeItem}>
                <div className={own.changeImg}>
                  <Image src={`${IMG}/${c.img}.webp`} alt="" fill sizes="(max-width: 900px) 100vw, 22vw" />
                </div>
                <div>
                  <span className={own.changeNum}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{c.change}</h3>
                  <p>{c.why}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={own.align}>
            <h3>And a few small things, so every page says the same</h3>
            <ul>
              {ALIGN.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Mockup */}
        <section id="mockup" className={styles.softBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                Scroll through it
              </p>
              <h2>Your homepage, the way I see it.</h2>
              <p>All six changes in one page, with your logo, colours, type and pictures. Tap through the calendar and try the fit check.</p>
            </div>
            <p className={styles.draftNote}>
              <strong>A first draft, not a finished design.</strong> Every fact comes from your site, your
              sheets or your mails to me. Your $135 rate stays out, as you asked. Two answers, flight delays
              and extra costs, I drafted from your FAQ; please check them.
            </p>
            <div className={styles.browser}>
              <div className={styles.browserBar}>
                <span className={styles.lights}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.address}>brisabahia.com</span>
                <a href={MOCKUP} target="_blank" rel="noopener" className={styles.fullscreen}>
                  Open full screen ↗
                </a>
              </div>
              <iframe src={MOCKUP} title="Homepage mockup for Brisa Bahía" className={styles.frame} loading="lazy" />
              {/* On phones a page inside a page cannot be used well, so it opens on its own. */}
              <a href={MOCKUP} className={styles.phonePoster}>
                <Image src={`${IMG}/beach-aerial.webp`} alt="" fill sizes="100vw" />
                <span className={styles.posterShade} />
                <span className={styles.posterText}>
                  <span className={styles.posterTitle}>A bay with no road in. One group at a time.</span>
                  <span className={`${styles.posterButton} ${own.posterButton}`}>Open the homepage →</span>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Coming back */}
        <section id="visit" className={`${styles.wrap} ${styles.section}`}>
          <div className={own.onSite}>
            <div className={own.onSiteImg}>
              <Image src={`${IMG}/bay-from-sea.webp`} alt="Brisa Bahía seen from the sea" fill sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                Coming back
              </p>
              <h2>I&apos;d happily come back for this.</h2>
              <p className={own.onSiteText}>
                After my two months with you, I know how much of Brisa only makes sense on the ground. If it
                works for you, I&apos;d come back for the first step and work on it with you and Nhung at the
                table: the answers, the pictures, the details that only you know.
              </p>
              <p className={own.onSiteText}>
                If the timing doesn&apos;t fit, we do it remotely, the way we did the workshop. Dates and how we
                arrange it, we figure out together.
              </p>
            </div>
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
              <h2>One project. Two steps. You approve before I build.</h2>
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
                <span className={styles.tag}>Later, if you like</span>
                <h3>Extras</h3>
                <p className={styles.packageIntro}>Not needed to start.</p>
                <ul>
                  {EXTRAS.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </article>
            </div>
            <p className={styles.priceNote}>
              A fixed price in writing after the kickoff, once I&apos;ve seen the setup from the inside. Paid in
              two parts: at the start and at launch.
            </p>
          </div>
        </section>

        {/* Close */}
        <section className={`${styles.darkBand} ${own.closeBand}`}>
          <div className={`${styles.wrap} ${styles.section} ${styles.close}`}>
            <h2>Let&apos;s make hosting at Brisa feel easy before anyone books a flight.</h2>
            <p>Have a look, scroll through the homepage, and tell me what you think. Happy to walk you and Nhung through it on a call.</p>
            <div className={styles.actions}>
              <Link href="/en/contact?type=discovery-call" className="btn btn-primary">
                Book a call <Arrow />
              </Link>
              <a href="mailto:jan@welledgecreative.com" className={styles.lightLink}>
                jan@welledgecreative.com
              </a>
              <a href="https://wa.me/4915789150323" className={styles.lightLink}>
                WhatsApp
              </a>
            </div>
            <p className={styles.sign}>Jan · Well Edge Creative</p>
          </div>
        </section>
      </main>
      <ProposalMotion
        selector={[styles.browser, styles.package, own.changeItem]
          .map((c) => `.${c}`)
          .join(",")}
      />
    </>
  );
}
