"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { inclusions, NIGHTS, PACKAGES, ROOMS } from "./data";
import styles from "./packages.module.css";

/**
 * Mockup of the Surf & Yoga Mirissa packages page. Today the page lists four packages for six stay
 * lengths one after the other and then four price tables. Here a guest answers three questions and
 * sees one price with everything it includes. Prices, inclusions, photos, logo, font and colours
 * are theirs (surfnyogasrilanka.com, checked 17 November 2026).
 */

const IMG = "/proposals/surf-yoga-mirissa";

const EVERY = [
  "Arrive any day, for any number of nights",
  "Breakfast, brunch and dinner, family style",
  "Free Sri Lankan cooking class and Sinhalese lesson",
  "Pool, jungle garden and co-working space",
];

const LIFE = [
  { img: "lesson-shake", caption: "First surf lesson" },
  { img: "yoga-deck", caption: "Yoga in the garden" },
  { img: "dinner-vibe", caption: "Family-style dinner" },
  { img: "surf-coach", caption: "In the water with your coach" },
  { img: "aerial", caption: "Aerial yoga, seasonal" },
  { img: "sunset-board", caption: "Sunset at Mirissa" },
];

const euro = (n: number) => `€${n.toLocaleString("en-US")}`;

export default function PackagesMockup({ font }: { font: string }) {
  const [pick, setPick] = useState(0);
  const [nights, setNights] = useState(2);
  const [room, setRoom] = useState(0);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => setStandalone(window.self === window.top), []);

  const pkg = PACKAGES[pick];
  const price = pkg.prices[nights][room];
  const perNight = Math.round(price / NIGHTS[nights]);

  return (
    <div className={`${styles.site} ${font}`}>
      {/* The site's cookie banner is not part of this mockup. */}
      <style>{".cookie-banner{display:none!important}"}</style>

      <header className={styles.nav}>
        <a href="#top" className={styles.brand} aria-label="Surf & Yoga Mirissa">
          <Image src={`${IMG}/logo-white.png`} alt="" width={200} height={47} priority />
        </a>
        <nav className={styles.links} aria-label="Mockup navigation">
          <a href="#finder">Packages</a>
          <a href="#rooms">Rooms</a>
          <a href="#life">The camp</a>
        </nav>
        <a href="#finder" className={styles.navCta}>
          Book now
        </a>
      </header>

      {/* 1. Short first screen: the page is about choosing */}
      <section id="top" className={styles.hero}>
        <Image src={`${IMG}/hero-boards.webp`} alt="Guests walking to the water with their boards in Mirissa" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroText}>
          <p className={styles.kicker}>All-inclusive packages</p>
          <h1>Find your package in three steps</h1>
          <p>Arrive any day, for any number of nights. Prices per person, taxes included.</p>
        </div>
      </section>

      {/* 2. The finder */}
      <section id="finder" className={styles.finder}>
        <div className={styles.wrap}>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>1</span>
              <h2>What would you like to do most?</h2>
              <div className={styles.pkgGrid}>
                {PACKAGES.map((p, i) => (
                  <button
                    key={p.key}
                    type="button"
                    className={i === pick ? styles.pkgOn : styles.pkg}
                    onClick={() => setPick(i)}
                    aria-pressed={i === pick}
                  >
                    <strong>{p.name}</strong>
                    <span className={styles.bar} aria-hidden="true">
                      <i style={{ width: `${p.surf}%` }} />
                    </span>
                    <span className={styles.barLabels} aria-hidden="true">
                      <small>Surf</small>
                      <small>Yoga</small>
                    </span>
                    <p>{p.line}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNum}>2</span>
              <h2>How many nights?</h2>
              <div className={styles.chips}>
                {NIGHTS.map((n, i) => (
                  <button key={n} type="button" className={i === nights ? styles.chipOn : styles.chip} onClick={() => setNights(i)}>
                    {n}
                  </button>
                ))}
              </div>
              <p className={styles.hint}>A different length, like 4 nights? You can still book it.</p>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <h2>Where would you like to sleep?</h2>
              <div className={styles.rooms}>
                {ROOMS.map((r, i) => (
                  <button key={r.key} type="button" className={i === room ? styles.roomOn : styles.room} onClick={() => setRoom(i)}>
                    <strong>{r.short}</strong>
                    <span>{r.who}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* The answer */}
          <aside className={styles.result} aria-live="polite">
            <p className={styles.resultLabel}>Your package</p>
            <h3>
              {pkg.name} · {NIGHTS[nights]} nights
            </h3>
            <p className={styles.resultRoom}>{ROOMS[room].name}</p>
            <p className={styles.price}>
              {euro(price)}
              <small> per person</small>
            </p>
            <p className={styles.perNight}>about {euro(perNight)} per night, everything included</p>
            <ul>
              {inclusions(pkg, nights).map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <a href="#finder" className={styles.book}>
              Book this package
            </a>
            <p className={styles.small}>Continues in your booking system.</p>
          </aside>
        </div>
      </section>

      {/* 3. Included in every package */}
      <section className={`${styles.wrap} ${styles.every}`}>
        <h2>Included in every package</h2>
        <ul>
          {EVERY.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </section>

      {/* 4. Rooms */}
      <section id="rooms" className={styles.roomsBand}>
        <div className={`${styles.wrap} ${styles.roomsWrap}`}>
          <div className={styles.roomPhoto}>
            <Image src={`${IMG}/room.webp`} alt="A room at Surf & Yoga Mirissa" fill sizes="(max-width: 860px) 100vw, 45vw" />
          </div>
          <div>
            <p className={styles.kicker}>Rooms</p>
            <h2>A true Sri Lankan home</h2>
            <p className={styles.text}>
              Simply and tastefully decorated, with air conditioning, fans, safes, hot water and
              mosquito nets.
            </p>
            <table className={styles.roomTable}>
              <thead>
                <tr>
                  <th>Room</th>
                  <th>7 nights, Balance</th>
                </tr>
              </thead>
              <tbody>
                {ROOMS.map((r, i) => (
                  <tr key={r.key}>
                    <td>
                      <strong>{r.name}</strong>
                      <span>{r.who}</span>
                    </td>
                    <td>{euro(PACKAGES[0].prices[2][i])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Life at the camp */}
      <section id="life" className={styles.life}>
        <div className={styles.wrap}>
          <h2>Life at the camp</h2>
        </div>
        <div className={styles.lifeGrid}>
          {LIFE.map((l) => (
            <figure key={l.img}>
              <div className={styles.lifeImg}>
                <Image src={`${IMG}/${l.img}.webp`} alt={l.caption} fill sizes="(max-width: 860px) 50vw, 17vw" />
              </div>
              <figcaption>{l.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 6. Not sure yet */}
      <section className={`${styles.wrap} ${styles.unsure}`}>
        <div>
          <h2>Want something different?</h2>
          <p>Build your own package from any combination of activities and rooms, or send us a message and we&apos;ll help you choose.</p>
        </div>
        <div className={styles.unsureCtas}>
          <a href="#finder" className={styles.book}>
            Create your own package
          </a>
          <a href="#finder" className={styles.ghost}>
            Ask us
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <Image src={`${IMG}/logo-white.png`} alt="Surf & Yoga Mirissa" width={180} height={42} />
        <p>Mirissa · Sri Lanka</p>
        <p className={styles.draftLabel}>First mockup by Well Edge Creative · not a finished design</p>
      </footer>
      {standalone && (
        <Link className={styles.back} href="/en/proposals/surf-yoga-mirissa#mockup">
          ← Proposal
        </Link>
      )}
    </div>
  );
}
