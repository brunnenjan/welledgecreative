"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./homepage.module.css";

/**
 * Homepage mockup for Sonora Caribbean Jungle Retreat. Every text, fact and photo comes from
 * sonoracostarica.com (checked 15 November 2026) and the logo is theirs, unchanged; only the
 * order, the design and the scroll story are new. Where planned retreat and drone pictures go,
 * the mockup says so instead of inventing them.
 */

const IMG = "/proposals/sonora";

const ARRIVAL = [
  {
    img: "path-bridge",
    label: "Arrive",
    text: "Sonora was born from a unique land, with the jungle, with the aroma of nature that surrounds you.",
  },
  {
    img: "bridge",
    label: "The stream",
    text: "A land divided by a stream, a beautiful place surrounded by the silence of the jungle.",
  },
  {
    img: "ig-beach",
    label: "Playa Negra",
    text: "A very beautiful beach, much less crowded than others in the Caribbean, embraced by hundred-year-old trees, colorful flowers and the sound of animals.",
  },
  {
    img: "ig-guest-terrace",
    label: "Slow down",
    text: "Come slow down, reconnect with nature, and let the jungle work its magic.",
  },
];

const NUMBERS = [
  { value: 1, label: "group at a time, the whole place is yours" },
  { value: 30, label: "guests in on-site accommodations", prefix: "up to " },
  { value: 100, label: "Yoga Shala in the middle of the garden", suffix: " m²" },
  { value: 3, label: "room types, all with a/c and Wi-Fi" },
];

const HOST = [
  { title: "Yoga Shala", text: "Our 100 m² Yoga Shala studio is located in the middle of the garden: an intimate, spacious, and peaceful space to practice." },
  { title: "Nutrition", text: "Soul-nourishing food provided by our chefs. Ingredients come from local farms that use organic and sustainable farming methods." },
  { title: "On-site experts", text: "Personalized assistance at every step: marketing strategies, travel arrangements, meals and group excursions." },
  { title: "Resident teachers", text: "Qualified to teach yoga, meditation, dance, and a variety of disciplines." },
];

const ACTIVITIES = ["Surf lessons", "Horseback rides", "Bee tours", "Waterfall hikes", "Kayak trips", "Cacao ceremonies"];

const LIFE: { img?: string; slot?: string; caption: string }[] = [
  { img: "ig-yoga-class", caption: "Daily yoga at Sonora" },
  { img: "ig-guest-terrace", caption: "Ready for sunny days" },
  { img: "lounge", caption: "Common areas, exclusively yours" },
  { img: "ig-team", caption: "The beloved people who bring Sonora to life" },
  { img: "ig-heliconia", caption: "A little burst of red, blooming under the Sonora sun" },
  { img: "breakfast", caption: "Breakfast in the garden" },
  { img: "ig-beach", caption: "The colors of the Caribbean" },
  { slot: "Drone flight", caption: "Jungle, stream and Playa Negra from above" },
];

const ROOMS = [
  { img: "room", name: "Standard Room" },
  { img: "bungalow", name: "Tropical Bungalow" },
  { img: "studio", name: "Caribbean Studio" },
];

const KINDS = ["Yoga", "Meditation", "Training", "Adventure", "Relaxation", "Other"];

export default function HomepageMockup({ serif, sans }: { serif: string; sans: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => setStandalone(window.self === window.top), []);

  // On phones the life strip is a swipe row; the dots follow the card in view.
  function onSwipe() {
    const t = track.current;
    const first = t?.firstElementChild as HTMLElement | null;
    if (!t || !first) return;
    setSlide(Math.min(LIFE.length - 1, Math.round(t.scrollLeft / (first.offsetWidth + 14))));
  }

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        el.classList.add(styles.animated);

        gsap.fromTo(
          `.${styles.heroImg}`,
          { scale: 1.12 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: `.${styles.hero}`, start: "top top", end: "bottom top", scrub: true } },
        );
        gsap.from(`.${styles.heroText} > *`, { y: 28, opacity: 0, duration: 1, stagger: 0.12, ease: "power2.out", delay: 0.2 });

        // The walk in, like a film: the scene sticks while the story moves on.
        const stage = el.querySelector(`.${styles.arrivalScroll}`);
        const pics = gsap.utils.toArray<HTMLElement>(`.${styles.arrivalImg}`);
        const texts = gsap.utils.toArray<HTMLElement>(`.${styles.arrivalStep}`);
        const dots = gsap.utils.toArray<HTMLElement>(`.${styles.arrivalDots} span`);
        gsap.set(pics.slice(1), { opacity: 0 });
        gsap.set(texts.slice(1), { opacity: 0, y: 40 });
        const film = gsap.timeline({ scrollTrigger: { trigger: stage, start: "top top", end: "bottom bottom", scrub: 0.8 } });
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

        // Life at Sonora drifts past sideways on wide screens, inside a sticky scene.
        mm.add("(min-width: 861px)", () => {
          const t = track.current;
          if (!t) return;
          gsap.to(t, {
            x: () => -Math.max(0, t.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: { trigger: `.${styles.lifeScroll}`, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((r) =>
          gsap.from(r, { y: 36, opacity: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: r, start: "top 88%", once: true } }),
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
        <a className={styles.brand} href="#top" aria-label="Sonora Caribbean Jungle Retreat">
          <Image src={`${IMG}/logo-light.png`} alt="" width={74} height={74} priority />
        </a>
        <nav className={styles.links} aria-label="Mockup navigation">
          <a href="#host">Host your retreat</a>
          <a href="#stay">Rooms</a>
          <a href="#life">Life at Sonora</a>
          <a href="#oasis">Oasis restaurant</a>
        </nav>
        <span className={styles.lang}>EN · ES</span>
        <a className={styles.navCta} href="#inquire">
          Inquire
        </a>
      </header>

      {/* 1. First screen */}
      <section id="top" className={styles.hero}>
        <div className={styles.heroImg}>
          <Image src={`${IMG}/pool-hut.webp`} alt="The saltwater pool and garden at Sonora" fill priority sizes="100vw" />
        </div>
        <div className={styles.heroShade} />
        <div className={styles.heroText}>
          <p className={styles.kicker}>Playa Negra · Puerto Viejo · Costa Rica</p>
          <h1 className={serif}>
            Your Caribbean
            <br />
            <em>Jungle Retreat</em>
          </h1>
          <p className={styles.heroLead}>
            Exclusive to one group at a time, for up to 30 guests, between the jungle and the sea.
          </p>
          <div className={styles.doors}>
            <a href="#host" className={styles.doorPrimary}>
              <span>For retreat leaders</span>
              Host your retreat
            </a>
            <a href="#stay" className={styles.door}>
              <span>For travellers</span>
              Stay with us
            </a>
          </div>
        </div>
        <p className={styles.slotNote}>Planned: a short drone film loop of the grounds here</p>
      </section>

      {/* 2. The walk in */}
      <section className={styles.arrivalScroll}>
        <div className={styles.arrival}>
          <div className={styles.arrivalPics}>
            {ARRIVAL.map((a) => (
              <div key={a.img} className={styles.arrivalImg}>
                <Image src={`${IMG}/${a.img}.webp`} alt="" fill sizes="(max-width: 860px) 100vw, 60vw" />
              </div>
            ))}
          </div>
          <div className={styles.arrivalCopy}>
            <p className={styles.kicker}>Welcome in Puerto Viejo</p>
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

      {/* 3. The facts leaders look for */}
      <section className={`${styles.wrap} ${styles.numbers}`}>
        {NUMBERS.map((n) => (
          <div key={n.label} data-reveal>
            <span className={`${styles.number} ${serif}`}>
              {n.prefix && <small>{n.prefix}</small>}
              <span className={styles.count} data-value={n.value}>
                {n.value}
              </span>
              {n.suffix && <small className={styles.unit}>{n.suffix}</small>}
            </span>
            <span className={styles.numberLabel}>{n.label}</span>
          </div>
        ))}
      </section>

      {/* 4. Door one: retreat leaders */}
      <section id="host" className={styles.hostBand}>
        <div className={`${styles.wrap} ${styles.host}`}>
          <div data-reveal>
            <p className={styles.kickerLight}>Host your retreat</p>
            <h2 className={serif}>An easy and successful retreat, for you and your guests.</h2>
            <p className={styles.hostLead}>
              Whether your focus is on a yoga retreat or training, adventure, or relaxation, we are the
              perfect place for you. Sonora is exclusive to one group at a time.
            </p>
            <div className={styles.hostImage}>
              <Image src={`${IMG}/ig-yoga-class.webp`} alt="A class in the Yoga Shala at Sonora" fill sizes="(max-width: 860px) 100vw, 40vw" />
            </div>
          </div>
          <div>
            <div className={styles.hostGrid}>
              {HOST.map((h) => (
                <div key={h.title} data-reveal>
                  <strong>{h.title}</strong>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
            <h3 className={`${styles.subhead} ${serif}`}>Add to your package</h3>
            <ul className={styles.activities}>
              {ACTIVITIES.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className={styles.hostCtas}>
              <a href="#inquire" className={styles.btnLight}>
                Check dates for your group
              </a>
              <a href="#host" className={styles.linkLight}>
                Venue sheet (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Life at Sonora */}
      <section id="life" className={styles.lifeScroll}>
        <div className={styles.lifeBand}>
          <div className={styles.lifeHead}>
            <p className={styles.kicker}>Life at Sonora</p>
            <h2 className={serif}>Retreats happen here all year.</h2>
          </div>
          <div ref={track} className={styles.lifeTrack} onScroll={onSwipe}>
            {LIFE.map((l, i) => (
              <figure key={i} className={styles.lifeCard}>
                {l.img ? (
                  <div className={styles.lifeImg}>
                    <Image src={`${IMG}/${l.img}.webp`} alt={l.caption} fill sizes="(max-width: 860px) 80vw, 30vw" />
                  </div>
                ) : (
                  <div className={styles.lifeSlot}>
                    <span>{l.slot}</span>
                    <p>New picture goes here</p>
                  </div>
                )}
                <figcaption>{l.caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className={styles.swipeHint} aria-hidden="true">
            Swipe to explore →
            <span className={styles.swipeDots}>
              {LIFE.map((l, i) => (
                <span key={i} className={i === slide ? styles.dotOn : undefined} />
              ))}
            </span>
          </p>
        </div>
      </section>

      {/* 6. Door two: stay */}
      <section id="stay" className={`${styles.wrap} ${styles.stay}`}>
        <div className={styles.stayHead} data-reveal>
          <div>
            <p className={styles.kicker}>Stay with us</p>
            <h2 className={serif}>Rooms in harmony with the jungle</h2>
          </div>
          <p className={styles.small}>
            Wi-Fi, air conditioning, high-quality bedding. Rates based on double occupancy, breakfast
            included.
          </p>
        </div>
        <div className={styles.rooms}>
          {ROOMS.map((r) => (
            <article key={r.name} className={styles.room} data-reveal>
              <div className={styles.roomImg}>
                <Image src={`${IMG}/${r.img}.webp`} alt={r.name} fill sizes="(max-width: 860px) 100vw, 33vw" />
              </div>
              <h3 className={serif}>{r.name}</h3>
              <p className={styles.small}>Size, beds and view to be added with Claire</p>
              <a href="#stay" className={styles.roomLink}>
                Check availability →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Oasis */}
      <section id="oasis" className={styles.oasisBand}>
        <div className={`${styles.wrap} ${styles.oasis}`}>
          <div className={styles.oasisImg} data-reveal>
            <Image src={`${IMG}/restaurant.webp`} alt="The Oasis restaurant at Sonora" fill sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
          <div data-reveal>
            <p className={styles.kicker}>Oasis restaurant</p>
            <h2 className={serif}>A fusion of culture and nature.</h2>
            <p>
              Enjoy a dinner under the stars or a panoramic lunch in our garden, where each dish becomes
              a multisensory experience.
            </p>
            <p className={styles.oasisLine}>Soul-nourishing food · Local organic farms · International cuisine</p>
          </div>
        </div>
      </section>

      {/* 8. The people */}
      <section className={styles.peopleBand}>
        <div className={`${styles.wrap} ${styles.people}`}>
          <div className={styles.peopleImg} data-reveal>
            <Image src={`${IMG}/ig-team.webp`} alt="The Sonora team in the garden, with the house cat" fill sizes="(max-width: 860px) 100vw, 45vw" />
          </div>
          <div data-reveal>
            <p className={styles.kicker}>The people</p>
            <blockquote className={serif}>
              “Sonora wouldn&apos;t be Sonora without the beloved people who bring it to life every
              day.”
            </blockquote>
            <p>
              They&apos;re a key part of Sonora&apos;s daily life, its energy, its rhythm, and the
              experience we create together.
            </p>
            <div className={styles.peopleSmall}>
              <Image src={`${IMG}/ig-host.webp`} alt="A member of the Sonora team in the garden" fill sizes="160px" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. One form */}
      <section id="inquire" className={`${styles.wrap} ${styles.plan}`}>
        <div data-reveal>
          <p className={styles.kicker}>Pura Vida</p>
          <h2 className={serif}>Welcome to the magical Caribbean.</h2>
          <p className={styles.planText}>
            Tell us about your group and your dates, and we&apos;ll come back with availability and
            what&apos;s included.
          </p>
          <p className={styles.small}>Playa Negra 70403 · Puerto Viejo de Talamanca · Costa Rica</p>
        </div>
        <form className={styles.form} aria-label="Retreat inquiry (mockup)" data-reveal>
          <h3 className={serif}>Host your retreat at Sonora</h3>
          <fieldset className={styles.chips}>
            <legend>Your retreat</legend>
            {KINDS.map((k, i) => (
              <span key={k} className={i === 0 ? styles.chipOn : undefined}>
                {k}
              </span>
            ))}
          </fieldset>
          <div className={styles.formRow}>
            <label>
              Dates
              <input placeholder="Arrival to departure" readOnly />
            </label>
            <label>
              Group size
              <input placeholder="Up to 30 guests" readOnly />
            </label>
          </div>
          <label>
            Email
            <input placeholder="Email" readOnly />
          </label>
          <button type="button">Check availability</button>
        </form>
      </section>

      <footer className={styles.footer}>
        <Image src={`${IMG}/logo-light.png`} alt="Sonora Caribbean Jungle Retreat" width={64} height={64} />
        <p>Playa Negra · Puerto Viejo de Talamanca · Costa Rica</p>
        <p className={styles.draftLabel}>First mockup by Well Edge Creative · not a finished design</p>
      </footer>
      {standalone && (
        <Link className={styles.back} href="/en/proposals/sonora#mockup">
          ← Proposal
        </Link>
      )}
    </div>
  );
}
