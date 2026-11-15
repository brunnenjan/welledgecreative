"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SanctuaryMark from "../SanctuaryMark";
import styles from "./homepage.module.css";

/**
 * Homepage mockup for The Sanctuary at Two Rivers. Every text, number, quote and photo comes from
 * thesanctuarycostarica.com (checked 15 November 2026); only the order, the design and the
 * scroll story are new. Retreat leaders and guests each get their own door.
 */

const IMG = "/proposals/sanctuary-two-rivers";

const ARRIVAL = [
  {
    img: "garden",
    label: "Arrive",
    text: "From the moment you arrive, after a serene 15-minute nature walk along the jungle and river paths, you’ll be enveloped in a world where countless species of vibrant flora and diverse fauna thrive.",
  },
  {
    img: "river",
    label: "Two rivers",
    text: "Nestled at the confluence of two rivers, Rio Lajas and Rio Cacao, is a revered Sangama location.",
  },
  {
    img: "waterfall",
    label: "Forty acres",
    text: "A secluded 40-acre paradise offering manicured tropical gardens, Jurassic jungle, and cascading waterfalls.",
  },
  {
    img: "sunset-deck",
    label: "Home",
    text: "A place to slow down, reconnect with your true self, and remember what it means to be home.",
  },
];

const NUMBERS = [
  { value: 40, label: "secluded acres" },
  { value: 2, label: "rivers and two waterfalls on site" },
  {
    value: 26,
    label: "guests in Jungle Lofts and Studio Houses",
    prefix: "up to ",
  },
  { value: 10, label: "years of hosting retreats", suffix: "+" },
];

const WHY_HOSTS = [
  {
    title: "Private & Exclusive",
    text: "Exclusive 40-acre estate, nestled between two rivers in pristine rainforest, just for your group.",
  },
  {
    title: "Spacious Accommodations",
    text: "Up to 26 guests in Jungle Lofts and Studio Houses with canopy views and rainwater showers.",
  },
  {
    title: "Nourishing Food",
    text: "Daily plant-based meals crafted fresh, with gluten-free and vegetarian options always included.",
  },
  {
    title: "Full Host Support",
    text: "Our on-site crew manages all logistics so you can focus entirely on guiding your group.",
  },
];

const HOSTING_STEPS = [
  {
    title: "Share Your Vision",
    text: "Tell us about your group, goals, and the experience you want to create.",
  },
  {
    title: "Plan With Our Team",
    text: "We collaborate on every detail, including schedule, meals, accommodations, and more.",
  },
  {
    title: "Lead Your Retreat",
    text: "Arrive, exhale, and lead. We handle everything behind the scenes.",
  },
];

const SPACES = [
  {
    img: "pagoda",
    name: "The Yoga Pagoda",
    line: "Your Tropical Zen Hub",
    text: "Our 1200 sq ft screened-in Pagoda features a rich teak floor & open design inviting jungle views.",
  },
  {
    img: "sunset-deck",
    name: "Open-Air Decks",
    line: "Your Retreat’s Natural Centerpiece",
    text: "Offering 360° jungle views, they are perfect for yoga, meditation, and breathwork.",
  },
  {
    img: "loft",
    name: "Accommodations",
    line: "Dwellings for Deep Connection",
    text: "Zen Jungle Lofts or private Studio Houses with screened walls, observation decks, and solar amenities.",
  },
  {
    img: "pool",
    name: "Pool & Spa",
    line: "Unwind, Rejuvenate, and Deeply Integrate",
    text: "Guests enjoy therapeutic massages and tailored treatments throughout their retreat.",
  },
  {
    img: "loft-deck",
    name: "Architecture",
    line: "Zen Design Meets Rainforest",
    text: "Crafted by local artisans from eco-harvested teak, guided by Vastu principles.",
  },
];

const JOURNEYS = [
  "Yoga",
  "Wellness",
  "Meditation",
  "Corporate",
  "Creative",
  "Coaching or Personal Development",
  "Other",
];

export default function HomepageMockup({
  serif,
  sans,
}: {
  serif: string;
  sans: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [space, setSpace] = useState(0);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => setStandalone(window.self === window.top), []);

  // On phones the spaces are a swipe row; the dots follow the card in view.
  function onSwipe() {
    const t = track.current;
    const first = t?.firstElementChild as HTMLElement | null;
    if (!t || !first) return;
    setSpace(Math.min(SPACES.length - 1, Math.round(t.scrollLeft / (first.offsetWidth + 14))));
  }

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        el.classList.add(styles.animated);

        // Hero: the river slowly settles as you scroll, the words rise in.
        gsap.fromTo(
          `.${styles.heroImg}`,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: `.${styles.hero}`,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        gsap.from(`.${styles.heroText} > *`, {
          y: 28,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.2,
        });

        // The arrival, like a film: the scene sticks while the story moves on (CSS sticky, so
        // nothing below has to be moved out of the way).
        const stage = el.querySelector(`.${styles.arrivalScroll}`);
        const pics = gsap.utils.toArray<HTMLElement>(`.${styles.arrivalImg}`);
        const texts = gsap.utils.toArray<HTMLElement>(`.${styles.arrivalStep}`);
        const dots = gsap.utils.toArray<HTMLElement>(
          `.${styles.arrivalDots} span`,
        );
        gsap.set(pics.slice(1), { opacity: 0 });
        gsap.set(texts.slice(1), { opacity: 0, y: 40 });
        const film = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });
        for (let i = 1; i < ARRIVAL.length; i++) {
          film
            .to(pics[i - 1], { opacity: 0, duration: 1 })
            .to(pics[i], { opacity: 1, duration: 1 }, "<")
            .to(texts[i - 1], { opacity: 0, y: -40, duration: 0.6 }, "<")
            .to(texts[i], { opacity: 1, y: 0, duration: 0.6 }, "<0.6")
            .to(dots[i - 1], { opacity: 0.35, duration: 0.2 }, "<")
            .to(dots[i], { opacity: 1, duration: 0.2 }, "<")
            .to({}, { duration: 0.6 });
        }

        // Numbers count up once they come into view.
        gsap.utils.toArray<HTMLElement>(`.${styles.count}`).forEach((n) => {
          const target = Number(n.dataset.value);
          const state = { v: 0 };
          gsap.to(state, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: n, start: "top 85%", once: true },
            onUpdate: () => {
              n.textContent = String(Math.round(state.v));
            },
          });
        });

        // The spaces drift past sideways on wide screens, inside a sticky scene.
        const track = el.querySelector<HTMLElement>(`.${styles.spaceTrack}`);
        mm.add("(min-width: 861px)", () => {
          if (!track) return;
          gsap.to(track, {
            x: () => -Math.max(0, track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: `.${styles.spacesScroll}`,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });
        });

        // Everything else rises in gently.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((r) =>
          gsap.from(r, {
            y: 36,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: r, start: "top 88%", once: true },
          }),
        );
      });
    }, el);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className={`${styles.site} ${sans}`}>
      {/* The site's cookie banner is not part of this mockup. */}
      <style>{".cookie-banner{display:none!important}"}</style>

      <header className={styles.nav}>
        <a className={`${styles.brand} ${serif}`} href="#top">
          <SanctuaryMark />
          <span>
            The Sanctuary
            <small>at Two Rivers</small>
          </span>
        </a>
        <nav className={styles.links} aria-label="Mockup navigation">
          <a href="#host">Host a Retreat</a>
          <a href="#join">Join a Retreat</a>
          <a href="#place">Retreat Center</a>
          <a href="#spaces">Accommodations</a>
        </nav>
        <a className={styles.navCta} href="#inquire">
          Inquire now
        </a>
      </header>

      {/* 1. First screen */}
      <section id="top" className={styles.hero}>
        <div className={styles.heroImg}>
          <Image
            src={`${IMG}/river.webp`}
            alt="Rio Lajas running through the jungle at The Sanctuary"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroShade} />
        <div className={styles.heroText}>
          <p className={styles.kicker}>
            Yoga & Meditation Retreat Center in Costa Rica
          </p>
          <h1 className={serif}>
            Where Two Rivers Meet,
            <br />
            <em>Nature Heals</em>
          </h1>
          <p className={styles.heroLead}>
            Far away from the noise of the world. No traffic, no crowds, no
            cities.
          </p>
          <div className={styles.doors}>
            <a href="#host" className={styles.doorPrimary}>
              <span>For retreat leaders</span>
              Host a Retreat
            </a>
            <a href="#join" className={styles.door}>
              <span>For guests</span>
              Join a Retreat
            </a>
          </div>
        </div>
        <p className={styles.trust}>
          <strong>★ 4.9/5</strong> Traveller rating
          <span>
            Featured in The New York Times · Yoga Journal · USA Today · Glamour
          </span>
        </p>
      </section>

      {/* 2. The arrival, told like a film */}
      <section id="place" className={styles.arrivalScroll}>
        <div className={styles.arrival}>
          <div className={styles.arrivalPics}>
            {ARRIVAL.map((a) => (
              <div key={a.img} className={styles.arrivalImg}>
                <Image
                  src={`${IMG}/${a.img}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 860px) 100vw, 60vw"
                />
              </div>
            ))}
          </div>
          <div className={styles.arrivalCopy}>
            <p className={styles.kicker}>A Place of Power & Transformation</p>
            <div className={styles.arrivalSteps}>
              {ARRIVAL.map((a, i) => (
                <div key={a.label} className={styles.arrivalStep}>
                  <span className={`${styles.stepLabel} ${serif}`}>
                    {String(i + 1).padStart(2, "0")} · {a.label}
                  </span>
                  <p className={serif}>{a.text}</p>
                </div>
              ))}
            </div>
            <div className={styles.arrivalDots} aria-hidden="true">
              {ARRIVAL.map((a, i) => (
                <span key={a.label} style={{ opacity: i === 0 ? 1 : 0.35 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. The facts that matter, counting up */}
      <section className={`${styles.wrap} ${styles.numbers}`}>
        {NUMBERS.map((n) => (
          <div key={n.label} data-reveal>
            <span className={`${styles.number} ${serif}`}>
              {n.prefix && <small>{n.prefix}</small>}
              <span className={styles.count} data-value={n.value}>
                {n.value}
              </span>
              {n.suffix}
            </span>
            <span className={styles.numberLabel}>{n.label}</span>
          </div>
        ))}
      </section>

      {/* 4. Door one: retreat leaders */}
      <section id="host" className={styles.hostBand}>
        <div className={`${styles.wrap} ${styles.host}`}>
          <div className={styles.hostIntro} data-reveal>
            <p className={styles.kickerLight}>Host a Retreat</p>
            <h2 className={serif}>
              A Retreat Setting Designed Around Your Vision
            </h2>
            <p>
              A private eco-retreat center on 40 acres, with over 10 years of
              experience hosting retreats across wellness, yoga, connection, and
              more. Every detail is cared for, so you can focus on what matters
              most: your retreat.
            </p>
            <div className={styles.hostImage}>
              <Image
                src={`${IMG}/session.webp`}
                alt="A workshop on the teak floor of the Yoga Pagoda"
                fill
                sizes="(max-width: 860px) 100vw, 40vw"
              />
            </div>
          </div>
          <div>
            <h3 className={`${styles.subhead} ${serif}`}>
              Why Hosts Choose The Sanctuary
            </h3>
            <div className={styles.whyGrid}>
              {WHY_HOSTS.map((w) => (
                <div key={w.title} data-reveal>
                  <strong>{w.title}</strong>
                  <p>{w.text}</p>
                </div>
              ))}
            </div>
            <h3 className={`${styles.subhead} ${serif}`}>How Hosting Works</h3>
            <ol className={styles.hostSteps}>
              {HOSTING_STEPS.map((s, i) => (
                <li key={s.title} data-reveal>
                  <span className={serif}>0{i + 1}</span>
                  <strong>{s.title}</strong>
                  {s.text}
                </li>
              ))}
            </ol>
            <div className={styles.hostCtas}>
              <a href="#inquire" className={styles.btnLight}>
                Inquire now
              </a>
              <a href="#host" className={styles.linkLight}>
                Venue sheet (PDF)
              </a>
            </div>
            <blockquote className={`${styles.hostQuote} ${serif}`} data-reveal>
              “The Sanctuary totally exceeded our expectations. The space is
              magical, and the team is incredible. Our guests left transformed.”
              <cite className={sans}>Jessica T., Yoga Retreat Leader</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 5. Door two: guests */}
      <section id="join" className={`${styles.wrap} ${styles.join}`}>
        <div className={styles.joinHead} data-reveal>
          <div>
            <p className={styles.kicker}>Join a Retreat</p>
            <h2 className={serif}>Retreats Calendar</h2>
          </div>
          <a href="#join" className={styles.link}>
            See all retreats →
          </a>
        </div>
        <article className={styles.retreat} data-reveal>
          <div className={styles.retreatImg}>
            <Image
              src={`${IMG}/pagoda.webp`}
              alt=""
              fill
              sizes="(max-width: 860px) 100vw, 40vw"
            />
          </div>
          <div>
            <span className={styles.date}>Nov 07, 2026 to Nov 12, 2026</span>
            <h3 className={serif}>Respira</h3>
            <p>
              One card per retreat: dates, the retreat leader, price from and a
              button to register.
            </p>
            <a href="#join" className={styles.register}>
              Details & register
            </a>
          </div>
        </article>
        <p className={styles.note}>
          Layout shown with the last retreat listed on your calendar.
        </p>
      </section>

      {/* 6. The spaces drift past */}
      <section id="spaces" className={styles.spacesScroll}>
        <div className={styles.spacesBand}>
          <div className={styles.spacesHead}>
            <p className={styles.kicker}>Retreat Center & Accommodations</p>
            <h2 className={serif}>Tropical Modern Zen Eco-Chic</h2>
          </div>
          <div ref={track} className={styles.spaceTrack} onScroll={onSwipe}>
            {SPACES.map((s) => (
              <figure key={s.name} className={styles.space}>
                <div className={styles.spaceImg}>
                  <Image
                    src={`${IMG}/${s.img}.webp`}
                    alt={s.name}
                    fill
                    sizes="(max-width: 860px) 80vw, 30vw"
                  />
                </div>
                <figcaption>
                  <span>{s.name}</span>
                  <strong className={serif}>{s.line}</strong>
                  {s.text}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className={styles.swipeHint} aria-hidden="true">
            Swipe to explore →
            <span className={styles.swipeDots}>
              {SPACES.map((s, i) => (
                <span key={s.name} className={i === space ? styles.dotOn : undefined} />
              ))}
            </span>
          </p>
        </div>
      </section>

      {/* 7. Food and rituals */}
      <section className={`${styles.wrap} ${styles.rituals}`}>
        <div className={styles.ritualImg} data-reveal>
          <Image
            src={`${IMG}/loft-deck.webp`}
            alt="A loft deck with a hammock above the jungle"
            fill
            sizes="(max-width: 860px) 100vw, 50vw"
          />
        </div>
        <div data-reveal>
          <p className={styles.kicker}>Nourish Your Soul</p>
          <h2 className={serif}>Every meal at the Sanctuary is a ritual.</h2>
          <p>
            We prepare plant-based, farm-to-table dishes using ingredients grown
            steps from your plate, food that restores as much as it nourishes.
          </p>
          <p className={styles.ritualList}>
            Sound Healing · Waterfall Rituals · Cacao Ceremonies
          </p>
        </div>
      </section>

      {/* 8. Voices */}
      <section className={styles.voicesBand}>
        <div className={`${styles.wrap} ${styles.voices}`}>
          <blockquote className={serif} data-reveal>
            “A space where transformation flows as freely as the rivers.”
            <cite className={sans}>
              Radha Rita, Heart Meditation Facilitator
            </cite>
          </blockquote>
          <div className={styles.voiceRow}>
            <p data-reveal>
              “Our guests still talk about the magic of this place. It allowed
              us to go deeper as a group and create something truly special.”
              <span>Daniel B., Breathwork Facilitator</span>
            </p>
            <p data-reveal>
              “I’ve been to many retreats, but none compare to this yoga and
              meditation retreat center in Costa Rica. The food was incredible,
              the staff were angels.”
              <span>Mayra, Yoga & Meditation Practitioner</span>
            </p>
          </div>
        </div>
      </section>

      {/* 9. The people and one form */}
      <section id="inquire" className={`${styles.wrap} ${styles.plan}`}>
        <div className={styles.people} data-reveal>
          <div className={styles.peopleImg}>
            <Image
              src={`${IMG}/team.webp`}
              alt="The Sanctuary team in the gardens"
              fill
              sizes="(max-width: 860px) 100vw, 40vw"
            />
          </div>
          <p className={styles.kicker}>Dedicated Hearts</p>
          <h2 className={serif}>Bring Your Retreat to Life in Costa Rica</h2>
          <p>
            Meet Tamara (resident host) and Perrey (owner & founder), dedicated
            to crafting transformative retreats with mindful intention,
            nourishing both hosts & guests.
          </p>
        </div>
        <form
          className={styles.form}
          aria-label="Retreat inquiry (mockup)"
          data-reveal
        >
          <h3 className={serif}>Your Retreat Begins Here</h3>
          <p className={styles.small}>
            Share your dates and group size and our team will follow up with
            availability and next steps.
          </p>
          <fieldset className={styles.chips}>
            <legend>What kind of journey are you called to lead?</legend>
            {JOURNEYS.map((j, i) => (
              <span key={j} className={i === 0 ? styles.chipOn : undefined}>
                {j}
              </span>
            ))}
          </fieldset>
          <label>
            Dates you’re looking to host
            <input placeholder="Dates" readOnly />
          </label>
          <div className={styles.formRow}>
            <label>
              Are your dates flexible?
              <input placeholder="Yes · No · Somewhat" readOnly />
            </label>
            <label>
              How many people will you be guiding?
              <input placeholder="Group size" readOnly />
            </label>
          </div>
          <label>
            Email address
            <input placeholder="Email" readOnly />
          </label>
          <button type="button">Inquire now</button>
        </form>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.brand} ${serif}`}>
          <SanctuaryMark size={28} />
          <span>
            The Sanctuary<small>at Two Rivers</small>
          </span>
        </div>
        <p>Costa Rica · retreats@thesanctuarycostarica.com</p>
        <p className={styles.draftLabel}>First mockup by Well Edge Creative · not a finished design</p>
      </footer>
      {standalone && (
        <a className={styles.back} href="/en/proposals/sanctuary-two-rivers#mockup">
          ← Proposal
        </a>
      )}
    </div>
  );
}
