import Image from "next/image";
import { Cormorant_Garamond, Inter } from "next/font/google";
import styles from "./homepage.module.css";

/**
 * Homepage mockup for The Sanctuary at Two Rivers: their photos, facts and guest voices from
 * thesanctuarycostarica.com (15 November 2026), in a new structure and brand direction. Two
 * typefaces, one palette from river, teak and jungle, and every section leading to Host or Join.
 * Retreat dates are examples: their calendar only listed a retreat that had already taken place.
 */

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"] });
const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

const IMG = "/proposals/sanctuary-two-rivers";

function Mark({ size = 34 }: { size?: number }) {
  // Two rivers flowing into one: a sketch of a simplified mark for the mockup only.
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M8 4c0 12 12 14 12 24v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 4c0 12-12 14-12 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="36" r="1.6" fill="currentColor" />
    </svg>
  );
}

const SPACES = [
  { img: "pagoda", title: "The Yoga Pagoda", text: "1,200 sq ft of teak floor, screened and open to the jungle." },
  { img: "sunset-deck", title: "Open-air decks", text: "360° jungle views for sunrise practice and breathwork." },
  { img: "loft", title: "Zen Jungle Lofts", text: "Screened walls and observation decks, built from eco-harvested teak." },
  { img: "pool", title: "Pool and spa", text: "Massage and treatments to integrate the work of the day." },
];

const RETREATS = [
  { date: "Example · Feb 2027", title: "Respira", kind: "Breathwork and yoga", price: "from US$ ···" },
  { date: "Example · Mar 2027", title: "Heart Meditation", kind: "Meditation retreat", price: "from US$ ···" },
  { date: "Example · Apr 2027", title: "Jungle Yoga Week", kind: "Yoga for all levels", price: "from US$ ···" },
];

export default function HomepageMockup() {
  return (
    <div className={`${styles.site} ${sans.className}`}>
      {/* The site's cookie banner is not part of this mockup. */}
      <style>{".cookie-banner{display:none!important}"}</style>

      <header className={styles.nav}>
        <a className={`${styles.brand} ${serif.className}`} href="#top">
          <Mark />
          <span>
            The Sanctuary
            <small>at Two Rivers</small>
          </span>
        </a>
        <nav className={styles.links} aria-label="Mockup navigation">
          <a href="#host">Host a retreat</a>
          <a href="#join">Join a retreat</a>
          <a href="#place">The place</a>
          <a href="#stay">Stay</a>
        </nav>
        <a className={styles.navCta} href="#plan">
          Plan your retreat
        </a>
      </header>

      {/* 1. First screen: the place and two doors */}
      <section id="top" className={styles.hero}>
        <Image src={`${IMG}/river.webp`} alt="Rio Lajas running through the jungle at The Sanctuary" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroText}>
          <p className={styles.kicker}>Yoga & meditation retreat center · Uvita, Costa Rica</p>
          <h1 className={serif.className}>
            Where two rivers meet,
            <br />
            <em>people come back to themselves.</em>
          </h1>
          <p className={styles.heroLead}>
            Forty secluded acres of jungle, gardens and waterfalls, a 15-minute nature walk from the
            nearest road. No traffic, no crowds, no cities.
          </p>
          <div className={styles.doors}>
            <a href="#host" className={styles.doorPrimary}>
              <span>For retreat leaders</span>
              Host your retreat
            </a>
            <a href="#join" className={styles.door}>
              <span>For guests</span>
              Join a retreat
            </a>
          </div>
        </div>
        <p className={styles.trust}>
          ★ 4.9 / 5 traveller rating · Featured in The New York Times, Yoga Journal and USA Today
        </p>
      </section>

      {/* 2. The place in three facts */}
      <section id="place" className={`${styles.wrap} ${styles.story}`}>
        <div>
          <p className={styles.kicker}>The place</p>
          <h2 className={serif.className}>Rio Lajas and Rio Cacao meet on our land.</h2>
          <p>
            In Vedic tradition the meeting of two rivers is a <em>sangama</em>, a place of power. Here
            it comes with year-round waterfalls, Jurassic jungle and a mild climate with cool breezes,
            made for deep inner work and real rest.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt className={serif.className}>40</dt>
              <dd>secluded acres</dd>
            </div>
            <div>
              <dt className={serif.className}>2</dt>
              <dd>rivers on site</dd>
            </div>
            <div>
              <dt className={serif.className}>2</dt>
              <dd>waterfalls to swim in</dd>
            </div>
          </dl>
        </div>
        <div className={styles.storyImages}>
          <div className={styles.imgTall}>
            <Image src={`${IMG}/waterfall.webp`} alt="One of the two waterfalls at The Sanctuary" fill sizes="(max-width: 800px) 100vw, 30vw" />
          </div>
          <div className={styles.imgSmall}>
            <Image src={`${IMG}/garden.webp`} alt="Tropical gardens and a jungle loft" fill sizes="(max-width: 800px) 100vw, 25vw" />
          </div>
        </div>
      </section>

      {/* 3. Host: the door for retreat leaders */}
      <section id="host" className={styles.hostBand}>
        <div className={`${styles.wrap} ${styles.host}`}>
          <div className={styles.hostImage}>
            <Image src={`${IMG}/session.webp`} alt="A workshop on the teak floor of the Yoga Pagoda" fill sizes="(max-width: 800px) 100vw, 45vw" />
          </div>
          <div>
            <p className={styles.kickerLight}>For retreat leaders</p>
            <h2 className={serif.className}>Bring your group. We take care of everything else.</h2>
            <ul className={styles.hostFacts}>
              <li><strong>Up to 26 guests</strong> in Zen Jungle Lofts and Studio Houses</li>
              <li><strong>Yoga Pagoda</strong> of 1,200 sq ft plus open-air decks</li>
              <li><strong>Plant-based meals</strong> from ingredients grown steps from the table</li>
              <li><strong>Every detail handled</strong>, from logistics to curated excursions</li>
            </ul>
            <ol className={styles.hostSteps}>
              <li><span>1</span>Tell us your dates and group size</li>
              <li><span>2</span>Get availability and a clear quote</li>
              <li><span>3</span>Arrive. Focus on your group.</li>
            </ol>
            <div className={styles.hostCtas}>
              <a href="#plan" className={styles.btnLight}>Check dates for your group</a>
              <a href="#host" className={styles.linkLight}>Download the venue sheet (PDF)</a>
            </div>
            <blockquote className={styles.hostQuote}>
              “Leading my workshop here was seamless. The staff’s support and the land’s energy made it
              unforgettable for my participants.”
              <cite>Robert, retreat leader</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 4. Join: the door for guests */}
      <section id="join" className={`${styles.wrap} ${styles.join}`}>
        <div className={styles.joinHead}>
          <div>
            <p className={styles.kicker}>For guests</p>
            <h2 className={serif.className}>Join a retreat</h2>
          </div>
          <a href="#join" className={styles.link}>See the full calendar →</a>
        </div>
        <div className={styles.retreats}>
          {RETREATS.map((r) => (
            <article key={r.title} className={styles.retreat}>
              <span className={styles.date}>{r.date}</span>
              <h3 className={serif.className}>{r.title}</h3>
              <p>{r.kind}</p>
              <div className={styles.retreatFoot}>
                <span>{r.price}</span>
                <a href="#join">Register</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. The spaces */}
      <section id="stay" className={styles.spacesBand}>
        <div className={styles.wrap}>
          <p className={styles.kicker}>Spaces and stay</p>
          <h2 className={serif.className}>Tropical modern, built by hand from teak.</h2>
          <div className={styles.spaces}>
            {SPACES.map((s) => (
              <figure key={s.title} className={styles.space}>
                <div className={styles.spaceImg}>
                  <Image src={`${IMG}/${s.img}.webp`} alt={s.title} fill sizes="(max-width: 800px) 100vw, 25vw" />
                </div>
                <figcaption>
                  <strong>{s.title}</strong>
                  {s.text}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Rituals and food */}
      <section className={`${styles.wrap} ${styles.rituals}`}>
        <div className={styles.ritualImg}>
          <Image src={`${IMG}/loft-deck.webp`} alt="A loft deck with a hammock above the jungle" fill sizes="(max-width: 800px) 100vw, 50vw" />
        </div>
        <div>
          <p className={styles.kicker}>Rituals</p>
          <h2 className={serif.className}>Every meal is a ritual. Every day ends at the water.</h2>
          <p>
            Plant-based, farm-to-table food in the open-air dining space. Sound healing, waterfall
            rituals and cacao ceremonies on site, and the river pools a few steps away.
          </p>
        </div>
      </section>

      {/* 7. Voices */}
      <section className={styles.voicesBand}>
        <div className={`${styles.wrap} ${styles.voices}`}>
          <blockquote className={serif.className}>
            “A space where transformation flows as freely as the rivers.”
            <cite className={sans.className}>Radha Rita, Heart Meditation facilitator</cite>
          </blockquote>
          <div className={styles.voiceRow}>
            <p>
              “I’ve been to many retreats, but none compare. The food was incredible, the staff were
              angels.”<span>Mayra, guest</span>
            </p>
            <p>
              “The yoga, the tranquility, the connection to nature. It’s everything I needed.”
              <span>Emily, guest</span>
            </p>
          </div>
        </div>
      </section>

      {/* 8. The people, getting here and one form */}
      <section id="plan" className={`${styles.wrap} ${styles.plan}`}>
        <div className={styles.people}>
          <div className={styles.peopleImg}>
            <Image src={`${IMG}/team.webp`} alt="The Sanctuary team in the gardens" fill sizes="(max-width: 800px) 100vw, 35vw" />
          </div>
          <p className={styles.kicker}>Your hosts</p>
          <h2 className={serif.className}>People who know every corner of the land</h2>
          <p>
            Tamara, the resident host, Perrey, owner and founder, and Kathryn, your booking guide. You
            talk to the people who will welcome you.
          </p>
          <p className={styles.small}>
            Getting here: arrive in Uvita, then a 15-minute nature walk along the jungle and river
            paths.
          </p>
        </div>
        <form className={styles.form} aria-label="Retreat inquiry (mockup)">
          <h3 className={serif.className}>Plan your retreat</h3>
          <div className={styles.toggle}>
            <span className={styles.on}>I want to host a group</span>
            <span>I want to join</span>
          </div>
          <label>Dates<input placeholder="e.g. 12 to 18 March 2027" readOnly /></label>
          <label>Group size<input placeholder="e.g. 16" readOnly /></label>
          <label>Email<input placeholder="you@example.com" readOnly /></label>
          <button type="button">Check availability</button>
          <p className={styles.small}>Your inquiry goes straight to Kathryn.</p>
        </form>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.brand} ${serif.className}`}>
          <Mark size={28} />
          <span>
            The Sanctuary<small>at Two Rivers</small>
          </span>
        </div>
        <p>Uvita, Puntarenas, Costa Rica · retreats@thesanctuarycostarica.com</p>
      </footer>
    </div>
  );
}
