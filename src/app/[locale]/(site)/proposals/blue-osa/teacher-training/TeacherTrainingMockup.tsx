"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./training.module.css";

/**
 * Mockup of the Blue Osa 200-hour yoga teacher training page. Every fact, price, date, quote and
 * photo comes from blueosa.com (checked 16 November 2026) and the logo is theirs, unchanged. Only
 * the order and the length are new, in their own fonts and colours: the answers a future teacher
 * needs come first. Their own films carry the page: a silent loop from the film about the place on
 * the first screen, their "what to expect" training video, and the full place film further down.
 */

const IMG = "/proposals/blue-osa";
// Their own films: the place film from blueosa.com and the training video from their YouTube channel.
const PLACE_FILM = "https://www.blueosa.com/wp-content/uploads/2022/01/spritual-home-in-costa-rica-blue-osa.mp4";
const TRAINING_FILM = "https://www.youtube-nocookie.com/embed/U-cCEZdxw3c?autoplay=1&rel=0";

const STAY = [
  { img: "room", title: "Your room", text: "Beachfront eco-friendly rooms: single, double or triple." },
  { img: "food", title: "Your meals", text: "Three delicious, locally sourced meals daily, family-style." },
  { img: "pool-sanctuary", title: "Your free time", text: "The pool, ocean breezes and a private beach 50 meters away." },
];

const DATES = [
  { dates: "Apr 24 to May 8, 2027", note: "9 spots left" },
  { dates: "Jun 5 to 19, 2027", note: "15 spots left" },
  { dates: "Jun 26 to Jul 10, 2027", note: "10 spots left" },
  { dates: "Sep 25 to Oct 9, 2027", note: "15 spots left" },
  { dates: "Oct 30 to Nov 13, 2027", note: "15 spots left" },
];

const CURRICULUM = [
  { hours: 80, title: "Techniques, training and practice", text: "Asana, pranayama and meditation, the foundation of a rock solid practice." },
  { hours: 30, title: "Applied Yoga Anatomy + Muscle Activation™", text: "AYAMA™, a science-backed approach to anatomy and alignment you can't learn anywhere else." },
  { hours: 30, title: "History, philosophy and ethics", text: "The rich Himalayan Yoga tradition, and what it means to teach." },
  { hours: 65, title: "Teaching methodology and practicum", text: "Sequence engaging classes, cater to different levels, and guide students safely." },
];

const DAY = [
  { time: "4:45", what: "Morning meditation" },
  { time: "6:15", what: "Breakfast, tea and coffee" },
  { time: "8:00", what: "Training and practice" },
  { time: "11:30", what: "Lunch and free time" },
  { time: "3:30", what: "Training and practice" },
  { time: "6:30", what: "Communal dinner" },
  { time: "7:30", what: "Free time and study" },
];

const VOICES = [
  { quote: "I made friends that will last a lifetime and am now teaching weekly yoga classes. I never imagined I would find my life purpose in my retirement years!", by: "Adrian, YTT graduate" },
  { quote: "I am so grateful for Yogi Aaron! I am now living a pain-free life. My yoga teacher training experience was magical and transformational.", by: "Alexis, YTT graduate, 2022" },
  { quote: "I am still in awe of everything I experienced in those two weeks. The wisdom you imparted upon us was simply life changing.", by: "Stuart, YTT graduate, 2023" },
  { quote: "Regardless of whether you want to teach yoga or not, it'll be greatly beneficial to your life!", by: "Hong, YTT graduate, 2022" },
];

const PRICES = [
  { room: "Triple occupancy", price: "$2,990" },
  { room: "Double occupancy", price: "$3,390" },
  { room: "Single occupancy", price: "$5,190" },
];

const INCLUDED = [
  "Beachfront eco-friendly room",
  "Three farm-to-table meals daily, tea, coffee and fruit all day",
  "Training manual and Yoga Alliance certification",
  "Pool, beach and yoga props",
];

const NOT_INCLUDED = ["Flights and airport shuttles", "Spa treatments and excursions", "Laundry and drinks"];

const FAQ = [
  { q: "Can I come alone?", a: "Yes. 60 to 70% of our guests travel solo, and many solo guests form lifelong friendships at Blue Osa." },
  { q: "How do I get here?", a: "From San José: a 40-minute domestic flight to Puerto Jiménez, a shared shuttle or a private transfer. We arrange it with you." },
  { q: "What if my plans change?", a: "We refund your deposit in full if you cancel in writing at least 12 weeks before your training begins, no questions asked." },
];

export default function TeacherTrainingMockup({ heading, body }: { heading: string; body: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [standalone, setStandalone] = useState(false);
  const [picked, setPicked] = useState(0);
  const [trainingFilm, setTrainingFilm] = useState(false);

  useEffect(() => setStandalone(window.self === window.top), []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          `.${styles.heroImg}`,
          { scale: 1.1 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: `.${styles.hero}`, start: "top top", end: "bottom top", scrub: true } },
        );
        gsap.from(`.${styles.heroText} > *`, { y: 26, opacity: 0, duration: 1, stagger: 0.12, ease: "power2.out", delay: 0.2 });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((r) =>
          gsap.from(r, { y: 32, opacity: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: r, start: "top 88%", once: true } }),
        );
      });
    }, el);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className={`${styles.site} ${body}`}>
      {/* The site's cookie banner is not part of this mockup. */}
      <style>{".cookie-banner{display:none!important}"}</style>

      <header className={styles.nav}>
        <a href="#top" className={styles.brand} aria-label="Blue Osa">
          <Image src={`${IMG}/logo-white-v4.png`} alt="" width={120} height={62} priority />
        </a>
        <nav className={styles.links} aria-label="Mockup navigation">
          <a href="#training">Teacher training</a>
          <a href="#aaron">Yogi Aaron</a>
          <a href="#price">Price</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#apply" className={styles.navCta}>
          Apply now
        </a>
      </header>

      {/* 1. First screen */}
      <section id="top" className={styles.hero}>
        <div className={styles.heroImg}>
          {/* Their own drone film, the first seconds over the coast, as a silent loop. */}
          <video
            src={`${IMG}/drone-loop.mp4`}
            poster={`${IMG}/drone-poster.webp`}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Blue Osa from the air: the Osa Peninsula coast and the retreat in the rainforest"
          />
        </div>
        <div className={styles.heroShade} />
        <div className={styles.heroText}>
          <p className={styles.kicker}>Yoga Alliance RYT-200 certified · Osa Peninsula, Costa Rica</p>
          <h1 className={heading}>
            200 Hour Yoga Teacher Training
            <br />
            <strong>14-Day Intensive</strong>
          </h1>
          <p className={styles.heroLead}>
            Complete your 200-hour certification in just two weeks at our beachfront retreat, with the
            AYAMA™ method you can&apos;t learn anywhere else.
          </p>
          <div className={styles.heroCtas}>
            <a href="#apply" className={styles.btn}>
              Apply now
            </a>
            <a href="#film" className={styles.btnGhost}>
              ▶ Watch what to expect
            </a>
          </div>
        </div>
      </section>

      {/* 2. The decision bar: every answer that matters, before any paragraph */}
      <section className={styles.decision} aria-label="At a glance">
        <div className={styles.wrap}>
          <div className={styles.decisionGrid}>
            <div className={styles.decisionDates}>
              <span className={styles.label}>Next dates</span>
              {DATES.map((d, i) => (
                <button
                  key={d.dates}
                  type="button"
                  className={i === picked ? styles.dateOn : styles.date}
                  onClick={() => setPicked(i)}
                >
                  <strong>{d.dates}</strong>
                  <span>{d.note}</span>
                </button>
              ))}
            </div>
            <div>
              <span className={styles.label}>Price</span>
              <p className={`${styles.big} ${heading}`}>from $2,990</p>
              <p className={styles.small}>All-inclusive: room, three meals, certification</p>
            </div>
            <div>
              <span className={styles.label}>Reserve</span>
              <p className={`${styles.big} ${heading}`}>$300 deposit</p>
              <p className={styles.small}>Full refund up to 12 weeks before</p>
            </div>
            <a href="#apply" className={styles.btnDark}>
              Apply for {DATES[picked].dates.split(",")[0]}
            </a>
          </div>
        </div>
      </section>

      {/* 3. Why Blue Osa: Aaron and AYAMA */}
      <section id="aaron" className={`${styles.wrap} ${styles.aaron}`}>
        <div className={styles.aaronImg} data-reveal>
          <Image src={`${IMG}/aaron.webp`} alt="Yogi Aaron" fill sizes="(max-width: 860px) 100vw, 40vw" />
        </div>
        <div data-reveal>
          <p className={styles.kicker}>Why Blue Osa</p>
          <h2 className={heading}>Learn from Yogi Aaron, and a method you can&apos;t learn anywhere else.</h2>
          <blockquote className={heading}>
            “I built Blue Osa to host yoga immersions in a safe, wild, and nurturing environment.”
          </blockquote>
          <p>
            30+ years of yoga experience, countless teacher trainings, and AYAMA™: Applied Yoga Anatomy +
            Muscle Activation. It eliminates pain by activating weak muscles rather than stretching tight
            ones, and gives you a competitive edge as a teacher.
          </p>
          <ul className={styles.badges}>
            <li>Travelers&apos; Choice Best of the Best 2024</li>
            <li>Featured in BBC, Wall Street Journal, Outside</li>
          </ul>
        </div>
      </section>

      {/* 4. Fourteen days at a glance */}
      <section id="training" className={styles.trainingBand}>
        <div className={styles.wrap}>
          <div className={styles.head} data-reveal>
            <p className={styles.kickerLight}>Fourteen days at a glance</p>
            <h2 className={heading}>What you&apos;ll learn</h2>
          </div>
          <div className={styles.curriculum}>
            {CURRICULUM.map((c) => (
              <article key={c.title} data-reveal>
                <span className={heading}>{c.hours}</span>
                <small>hours</small>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
          <div className={styles.day} data-reveal>
            <h3 className={heading}>A day in the training</h3>
            <ol>
              {DAY.map((d) => (
                <li key={d.time}>
                  <span>{d.time}</span>
                  {d.what}
                </li>
              ))}
            </ol>
          </div>
          <div id="film" className={styles.filmRow} data-reveal>
            <div>
              <h3 className={heading}>See it before you decide</h3>
              <p>What to expect at a Blue Osa Yoga Teacher Training.</p>
            </div>
            <div className={styles.film}>
              {trainingFilm ? (
                <iframe
                  src={TRAINING_FILM}
                  title="What to expect at a Blue Osa Yoga Teacher Training"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button type="button" onClick={() => setTrainingFilm(true)} aria-label="Play: What to expect at a Blue Osa Yoga Teacher Training">
                  <Image src={`${IMG}/film-ytt.webp`} alt="" fill sizes="(max-width: 860px) 100vw, 60vw" />
                  <span className={styles.play} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Graduates, with faces */}
      <section className={`${styles.wrap} ${styles.voices}`}>
        <div className={styles.head} data-reveal>
          <p className={styles.kicker}>Graduates</p>
          <h2 className={heading}>Two weeks that changed their lives.</h2>
        </div>
        <div className={styles.voiceGrid}>
          <div className={styles.voicePhoto} data-reveal>
            <Image src={`${IMG}/beach-jump.webp`} alt="Teacher training students jumping on the beach at Blue Osa" fill sizes="(max-width: 860px) 100vw, 45vw" />
          </div>
          <div className={styles.quotes}>
            {VOICES.map((v) => (
              <blockquote key={v.by} data-reveal>
                <p className={heading}>“{v.quote}”</p>
                <cite>{v.by}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Price, simply */}
      <section id="price" className={styles.priceBand}>
        <div className={`${styles.wrap} ${styles.price}`}>
          <div data-reveal>
            <p className={styles.kicker}>All-inclusive</p>
            <h2 className={heading}>One price for everything that matters.</h2>
            <div className={styles.priceTable}>
              {PRICES.map((p) => (
                <div key={p.room}>
                  <span>{p.room}</span>
                  <strong className={heading}>{p.price}</strong>
                </div>
              ))}
            </div>
            <p className={styles.small}>Reserve your spot with a $300 deposit.</p>
          </div>
          <div className={styles.includes} data-reveal>
            <h3>Included</h3>
            <ul className={styles.yes}>
              {INCLUDED.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <h3>Not included</h3>
            <ul className={styles.no}>
              {NOT_INCLUDED.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. The place: their full film, then what the two weeks include */}
      <section id="place" className={`${styles.wrap} ${styles.place}`}>
        <div className={styles.head} data-reveal>
          <p className={styles.kicker}>Where the rainforest meets the sea</p>
          <h2 className={heading}>Train on the Osa Peninsula, home to 2.5% of the planet&apos;s biodiversity.</h2>
        </div>
        <div className={styles.film} data-reveal>
          <video
            src={PLACE_FILM}
            poster={`${IMG}/film-place.webp`}
            controls
            playsInline
            preload="none"
            aria-label="The Blue Osa film: the place, the rooms, the food and the Osa Peninsula"
          />
        </div>
        <p className={styles.filmNote}>The Blue Osa film · 2:32</p>
        <div className={styles.stay}>
          {STAY.map((c) => (
            <article key={c.title} data-reveal>
              <div className={styles.stayImg}>
                <Image src={`${IMG}/${c.img}.webp`} alt="" fill sizes="(max-width: 860px) 100vw, 33vw" />
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 8. FAQ */}
      <section id="faq" className={`${styles.wrap} ${styles.faq}`}>
        <h2 className={heading} data-reveal>Questions future teachers ask</h2>
        <div>
          {FAQ.map((f) => (
            <details key={f.q} data-reveal>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 9. One form */}
      <section id="apply" className={styles.applyBand}>
        <div className={`${styles.wrap} ${styles.apply}`}>
          <div data-reveal>
            <h2 className={heading}>Ready to take the leap?</h2>
            <p>Apply for an upcoming program and get a free preview. Or book a call to get all your questions answered: travel, rooms, location, food.</p>
          </div>
          <form className={styles.form} aria-label="Apply (mockup)" data-reveal>
            <label>
              Your dates
              <select defaultValue={DATES[picked].dates}>
                {DATES.map((d) => (
                  <option key={d.dates}>{d.dates}</option>
                ))}
              </select>
            </label>
            <label>
              Name
              <input placeholder="Your name" readOnly />
            </label>
            <label>
              Email
              <input placeholder="you@example.com" readOnly />
            </label>
            <button type="button">Apply now</button>
            <a href="#apply" className={styles.callLink}>
              Or book a call with the team →
            </a>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <Image src={`${IMG}/logo-white-v4.png`} alt="Blue Osa" width={110} height={57} />
        <p>Osa Peninsula · Costa Rica</p>
        <p className={styles.draftLabel}>First mockup by Well Edge Creative · not a finished design</p>
      </footer>
      {standalone && (
        <Link className={styles.back} href="/en/proposals/blue-osa#mockup">
          ← Proposal
        </Link>
      )}
    </div>
  );
}
