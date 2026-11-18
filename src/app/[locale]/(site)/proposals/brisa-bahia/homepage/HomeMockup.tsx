"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ADD_ONS, FACTS, FILL, INCLUDED, INSTAGRAM, INTENTS, KITCHEN, MONTHS, NIGHTS, NOT_PRETEND, QUESTIONS, RETREATS, REVIEWS, ROOMS, ROOM_FACTS, SIZES, USPS, WAY, WE_HOLD, YOU_HOLD } from "./data";
import styles from "./home.module.css";

/**
 * Homepage mockup for Brisa Bahía. The place leads: a quiet opening, the journey in told while
 * you scroll, then the stay, the kitchen, the seasons and the honest answers facilitators need,
 * before the two paths (host or guest) split. Logo (the current one), colours
 * and type are Brisa's own (Brand Foundation, Sheet 3); photos are from brisabahia.com and stills
 * from the 2025 header film.
 */

const IMG = "/proposals/brisa-bahia";
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Writes the scroll progress (0 to 1) of a tall section with a sticky stage into `--p`. */
function useScrollProgress(ref: RefObject<HTMLElement | null>, onProgress?: (p: number) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = reduce || total <= 0 ? 1 : Math.min(1, Math.max(0, -r.top / total));
      el.style.setProperty("--p", p.toFixed(4));
      onProgress?.(p);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** A schematic of the way in: the flight, then the last stretch by boat in a magnified inset. */
function WayMap({ step }: { step: number }) {
  return (
    <svg className={styles.map} viewBox="0 0 420 520" role="img" aria-label="Map: a flight from Medellín to Acandí or Capurganá, then a boat along the coast to Bahía El Aguacate">
      <text x="236" y="34" className={styles.mapSea}>CARIBBEAN SEA</text>
      <text x="4" y="120" className={styles.mapLand}>PANAMA</text>
      <text x="96" y="430" className={styles.mapLand}>COLOMBIA</text>
      <g className={styles.mapNorth}>
        <path d="M24 500V470m0 0-6 9m6-9 6 9" />
        <text x="19" y="462">N</text>
      </g>

      <path className={`${styles.mapFlight} ${step >= 1 ? styles.on : ""}`} pathLength={1} d="M341 452Q170 330 70 180" />
      <circle cx="341" cy="452" r="5" className={styles.mapDot} />
      <text x="330" y="478" textAnchor="end" className={styles.mapLabel}>Medellín</text>
      <circle cx="70" cy="180" r="4" className={`${styles.mapDot} ${step >= 1 ? styles.on : ""}`} />
      <text x="82" y="198" className={styles.mapLabel}>Acandí</text>
      <text x="82" y="214" className={styles.mapSmall}>or Capurganá</text>
      <text x="214" y="318" className={styles.mapNote} transform="rotate(44 214 318)">1 hour flight</text>

      <path className={styles.mapLink} d="M74 176 208 118" />
      <circle cx="290" cy="130" r="92" className={styles.mapInset} />
      <text x="290" y="62" textAnchor="middle" className={styles.mapNote}>the last minutes, by boat</text>
      <path className={`${styles.mapBoat} ${step >= 2 ? styles.on : ""}`} pathLength={1} d="M344 186Q318 138 268 118" />
      <circle cx="344" cy="186" r="4" className={styles.mapDot} />
      <text x="336" y="206" textAnchor="end" className={styles.mapLabel}>Acandí</text>
      <path className={`${styles.mapBoat} ${step >= 2 ? styles.on : ""}`} pathLength={1} d="M236 90Q256 96 266 112" />
      <circle cx="236" cy="90" r="4" className={styles.mapDot} />
      <text x="248" y="86" className={styles.mapLabel}>Capurganá</text>
      <text x="212" y="112" textAnchor="end" className={styles.mapSmall}>5 to 10 min</text>
      <circle cx="268" cy="118" r="7" className={`${styles.mapBay} ${step >= 3 ? styles.on : ""}`} />
      <text x="282" y="124" className={styles.mapLabelGold}>Brisa Bahía</text>
      <text x="300" y="166" className={styles.mapSmall}>20 min</text>
    </svg>
  );
}

type Fit = { size: number | null; nights: number | null; fill: number | null; month: number | null };

function fitNotes(f: Fit) {
  const notes: string[] = [];
  if (f.size === 0) notes.push("We host groups from 6 guests. If yours is smaller, tell us anyway and we'll talk it through.");
  if (f.size === 1) notes.push("6 to 7 guests works well. The whole place is still yours.");
  if (f.size === 2) notes.push("8 to 12 guests is our sweet spot.");
  if (f.size === 3) notes.push("Up to 24 guests fit, depending on how the rooms are shared.");
  if (f.nights === 0) notes.push("We host retreats of 5 nights or more, so the journey here is worth it.");
  if (f.nights !== null && f.nights > 0) notes.push("A good length for a retreat this far from home.");
  if (f.fill === 2) notes.push("Still building your community? Our marketing guide and the Gather network can help.");
  if (f.fill === 3) notes.push("Bringing a co-facilitator is how some of our best retreats happened.");
  if (f.month !== null) notes.push(`${MONTHS[f.month].m}: ${MONTHS[f.month].line}`);
  return notes;
}

export default function HomeMockup({ fonts }: { fonts: string }) {
  const [standalone, setStandalone] = useState(false);
  const [step, setStep] = useState(0);
  const [fit, setFit] = useState<Fit>({ size: null, nights: null, fill: null, month: null });
  const [sent, setSent] = useState(false);
  const [intent, setIntent] = useState(1);
  const [month, setMonth] = useState<number | null>(null);
  const way = useRef<HTMLElement>(null);

  useEffect(() => setStandalone(window.self === window.top), []);
  useScrollProgress(way, (p) => setStep(Math.min(WAY.length - 1, Math.floor(p * WAY.length))));

  const set = (key: keyof Fit, i: number) => {
    setSent(false);
    setFit((f) => ({ ...f, [key]: f[key] === i ? null : i }));
  };
  const notes = fitNotes(fit);
  const answered = Object.values(fit).filter((v) => v !== null).length;
  const season = INTENTS[intent];

  // No backend in a mockup: the answers open as an email draft to Brisa.
  const sendFit = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const lines = [
      fit.size !== null && `Guests: ${SIZES[fit.size]}`,
      fit.nights !== null && `Nights: ${NIGHTS[fit.nights]}`,
      fit.fill !== null && `Filling the group: ${FILL[fit.fill]}`,
      fit.month !== null && `Month: ${MONTHS[fit.month].m}`,
      "",
      String(data.get("about") ?? ""),
      "",
      String(data.get("name") ?? ""),
    ].filter((l) => l !== false);
    window.location.href = `mailto:info@brisabahia.com?subject=${encodeURIComponent("Hosting a retreat at Brisa Bahía")}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  return (
    <div className={`${styles.site} ${fonts}`}>
      {/* The site's cookie banner is not part of this mockup. */}
      <style>{".cookie-banner{display:none!important}"}</style>

      {/* 1. Opening: the bay, quietly */}
      <section id="top" className={styles.opening}>
        <Image src={`${IMG}/beach-aerial.webp`} alt="Brisa Bahía from above: a beach between rainforest and the Caribbean" fill priority sizes="100vw" className={styles.openingImg} />
        <div className={styles.stageShade} />

        <header className={styles.nav}>
          <a href="#top" className={styles.brand} aria-label="Brisa Bahía">
            <Image src={`${IMG}/brisa-mark-gold.svg`} alt="" width={54} height={54} priority unoptimized />
          </a>
          <nav className={styles.links} aria-label="Mockup navigation">
            <a href="#stay">Stay</a>
            <a href="#seasons">When to come</a>
            <a href="#way">Getting here</a>
            <a href="#answers">Honest answers</a>
            <a href="#retreats">Retreats</a>
          </nav>
          <a href="#host" className={styles.navCta}>
            Host your retreat
          </a>
        </header>

        <div className={styles.reveal}>
          <p className={styles.script}>Between the jungle and the sea</p>
          <h1>A bay with no road in. One group at a time.</h1>
          <p className={styles.revealText}>
            A private, off-grid retreat center on Colombia&apos;s Caribbean coast, near Capurganá. The whole
            place belongs to a single retreat.
          </p>
          <div className={styles.ctas}>
            <a href="#host" className={styles.gold}>
              Host your retreat
            </a>
            <a href="#retreats" className={styles.ghostLight}>
              Join a retreat
            </a>
          </div>
        </div>
      </section>

      <ul className={styles.facts}>
        {FACTS.map((f) => (
          <li key={f.label}>
            <span>{f.label}</span>
            {f.value}
          </li>
        ))}
      </ul>

      {/* 3. What is here */}
      <section id="place" className={`${styles.wrap} ${styles.section}`}>
        <p className={styles.kicker}>What you find here</p>
        <h2>Jungle on three sides. The Caribbean on the fourth.</h2>
        <div className={styles.usps}>
          {USPS.map((u, i) => (
            <article key={u.title}>
              <div className={styles.uspImg}>
                <Image src={`${IMG}/${u.img}.webp`} alt="" fill sizes="(max-width: 860px) 80vw, 20vw" />
              </div>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* A breath: the quiet */}
      <section className={styles.interlude}>
        <Image src={`${IMG}/between.webp`} alt="Palms, sand and surf from above" fill sizes="100vw" />
        <div className={styles.interludeShade} />
        <p>
          <span className={styles.script}>Roadless and wild</span>
          No traffic, no nightlife, no crowds. Sea, rain, birds, monkeys, wind.
        </p>
      </section>

      {/* 4. Stay */}
      <section id="stay" className={`${styles.wrap} ${styles.section}`}>
        <p className={styles.kicker}>Where you sleep</p>
        <h2>Eight bungalows, all facing the sea.</h2>
        <div className={styles.rooms}>
          {ROOMS.map((r) => (
            <article key={r.name}>
              <div className={styles.roomImg}>
                <Image src={`${IMG}/${r.img}.webp`} alt="" fill sizes="(max-width: 860px) 100vw, 45vw" />
              </div>
              <span>{r.who}</span>
              <h3>{r.name}</h3>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
        <div className={styles.comfort}>
          <ul>
            {ROOM_FACTS.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p>
            <strong>Good to know.</strong> The bungalows are naturally ventilated, not air-conditioned, and
            there is no hot water. Tall ceilings and the sea breeze do the work. The place is called Brisa
            Bahía because there is almost always a breeze.
          </p>
        </div>
      </section>

      {/* 5. The kitchen */}
      <section className={styles.kitchen}>
        <div className={`${styles.wrap} ${styles.kitchenWrap}`}>
          <div className={styles.kitchenImg}>
            <Image src={`${IMG}/fruit.webp`} alt="A bowl of fruit from the bay: mango, zapote, banana" fill sizes="(max-width: 860px) 100vw, 45vw" />
            <div className={styles.kitchenInset}>
              <Image src={`${IMG}/ig-nhung.webp`} alt="Nhung at the table with a plate from her kitchen" fill sizes="240px" />
            </div>
          </div>
          <div>
            <p className={styles.kicker}>Nhung&apos;s kitchen</p>
            <h2>Food built around how it makes you feel.</h2>
            <p className={styles.textLight}>
              Nhung runs the kitchen. Twenty years in restaurants taught her the craft; here she cooks for
              one group at a time. Abundant and tropical, grown organically and wild in our gardens and
              across the bay.
            </p>
            <ul>
              {KITCHEN.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Days and seasons */}
      <section id="seasons" className={`${styles.wrap} ${styles.section}`}>
        <p className={styles.kicker}>When to come</p>
        <h2>There is no bad season. Only different ones.</h2>
        <p className={styles.text}>Warm all year, 24 to 30 °C, with the sea around 28 to 29 °C. What changes is the sea, the rain and what&apos;s ripe.</p>

        <div className={styles.season}>
          <div className={styles.intents} role="tablist" aria-label="What is your retreat about?">
            {INTENTS.map((it, i) => (
              <button key={it.name} type="button" role="tab" aria-selected={i === intent} className={i === intent ? styles.intentOn : styles.intent} onClick={() => { setIntent(i); setMonth(null); }}>
                {it.name}
              </button>
            ))}
          </div>
          <div className={styles.seasonBody}>
            <p className={styles.seasonBest}>{month === null ? season.best : MONTH_NAMES[month]}</p>
            <p className={styles.seasonText} aria-live="polite">{month === null ? season.text : MONTHS[month].line}</p>
            <div className={styles.year}>
              {MONTHS.map((m, i) => (
                <button key={m.m} type="button" className={`${season.months.includes(i) ? styles.monthBest : styles.month} ${month === i ? styles.monthPicked : ""}`} onClick={() => setMonth(month === i ? null : i)} aria-pressed={month === i}>
                  {m.m}
                </button>
              ))}
            </div>
            <p className={styles.seasonHint}>Tap a month to see what it is like.</p>
            <figure className={styles.seasonPhoto}>
              {INTENTS.map((it, i) => (
                <Image key={it.img} src={`${IMG}/${it.img}.webp`} alt={it.caption} fill sizes="(max-width: 860px) 100vw, 50vw" className={i === intent ? styles.on : ""} />
              ))}
              <figcaption>
                {season.caption}
                {season.todo && <span className={styles.todo}>{season.todo}</span>}
              </figcaption>
            </figure>
          </div>
        </div>

        <div className={styles.days}>
          <div>
            <h3>One guided excursion is part of every retreat</h3>
            <ul className={styles.included}>
              {INCLUDED.map((x) => (
                <li key={x.name}>
                  <strong>{x.name}</strong>
                  {x.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>And if your group wants more</h3>
            <ul className={styles.addOns}>
              {ADD_ONS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. The way in, told while you scroll */}
      <section id="way" ref={way} className={styles.way}>
        <div className={styles.wayStage}>
          <div className={`${styles.wayPhoto} ${step === 2 ? styles.on : ""}`}>
            <Image src={`${IMG}/dock.webp`} alt="Boats at the dock, seen from above" fill sizes="100vw" />
          </div>
          <div className={`${styles.wayPhoto} ${step === 3 ? styles.on : ""}`}>
            <Image src={`${IMG}/bay-from-sea.webp`} alt="Bahía El Aguacate from the sea" fill sizes="100vw" />
          </div>
          <div className={styles.wayShade} />

          <div className={`${styles.wrap} ${styles.wayGrid}`}>
            <div className={styles.wayText}>
              <p className={styles.kicker}>Getting here</p>
              <h2>Two flights and a boat ride.</h2>
              <div className={styles.waySteps}>
                {WAY.map((w, i) => (
                  <div key={w.title} className={`${styles.wayStep} ${i === step ? styles.on : ""}`} aria-hidden={i !== step}>
                    <span>{w.k}</span>
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                    {w.ours && <em>{w.ours}</em>}
                  </div>
                ))}
              </div>
            </div>
            <WayMap step={step} />
          </div>
        </div>
      </section>

      {/* 7. Honest answers */}
      <section id="answers" className={`${styles.wrap} ${styles.section}`}>
        <p className={styles.kicker}>Honest answers</p>
        <h2>What facilitators ask us first.</h2>
        <div className={styles.answers}>
          <div className={styles.qa}>
            {QUESTIONS.map((q, i) => (
              <details key={q.q} open={i === 0}>
                <summary>{q.q}</summary>
                <p>{q.a}</p>
                {q.confirm && <p className={styles.todo}>Drafted from your site. To confirm with Kary.</p>}
              </details>
            ))}
          </div>
          <aside className={styles.pretend}>
            <h3>What we will not pretend</h3>
            <ul>
              {NOT_PRETEND.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p>None of that is difficult. It is a trip that rewards a little planning, and the planning is our job.</p>
          </aside>
        </div>
      </section>

      {/* 5. Two paths */}
      <section id="host" className={styles.host}>
        <div className={styles.wrap}>
          <p className={styles.kicker}>For facilitators</p>
          <h2>You bring your people. We hold the place.</h2>
          <p className={styles.textLight}>Six things you don&apos;t have to carry.</p>
          <div className={styles.holds}>
            {WE_HOLD.map((h, i) => (
              <article key={h.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{h.title}</h3>
                <ul>
                  {h.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className={styles.handle}>
            <div className={styles.ownersImg}>
              <Image src={`${IMG}/ig-owners.webp`} alt="Kary and Nhung looking out at the sea" fill sizes="(max-width: 860px) 100vw, 40vw" />
            </div>
            <div>
              <blockquote>
                &ldquo;If something goes sideways at eleven at night in a place you have never been, we are the
                ones handling it.&rdquo;
                <cite>Kary &amp; Nhung, owners, on site from the dock to departure</cite>
              </blockquote>
              <h3>What stays with you</h3>
              <ul>
                {YOU_HOLD.map((y) => (
                  <li key={y}>{y}</li>
                ))}
              </ul>
            </div>
          </div>

          <div id="fit" className={styles.fitWrap}>
            <div>
              <h3 className={styles.fitTitle}>Is Brisa Bahía right for your retreat?</h3>
              <p className={styles.textLight}>Four quick questions. You&apos;ll see right away how it fits, and Kary gets your answers with your note.</p>
              {(
                [
                  ["How many guests do you expect?", "size", SIZES],
                  ["How many nights?", "nights", NIGHTS],
                  ["How will you fill it?", "fill", FILL],
                ] as const
              ).map(([label, key, options]) => (
                <div key={key} className={styles.q}>
                  <h4>{label}</h4>
                  <div className={styles.chips}>
                    {options.map((s, i) => (
                      <button key={s} type="button" className={fit[key] === i ? styles.chipOn : styles.chip} onClick={() => set(key, i)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className={styles.q}>
                <h4>Which month are you thinking of?</h4>
                <div className={styles.months}>
                  {MONTHS.map((m, i) => (
                    <button key={m.m} type="button" className={fit.month === i ? styles.chipOn : styles.chip} onClick={() => set("month", i)}>
                      {m.m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <form className={styles.fitCard} aria-live="polite" onSubmit={(e) => { e.preventDefault(); sendFit(e.currentTarget); }}>
              <p className={styles.script}>Your retreat at Brisa</p>
              {notes.length === 0 ? (
                <p className={styles.fitEmpty}>Pick an answer on the left to see how your retreat fits.</p>
              ) : (
                <ul>
                  {notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}
              <label className={styles.field}>
                <span>Your name</span>
                <input type="text" name="name" placeholder="First name" required />
              </label>
              <label className={styles.field}>
                <span>Tell us about your retreat</span>
                <textarea name="about" rows={3} placeholder="Your practice, your community, your dates" />
              </label>
              <button type="submit" className={styles.send} disabled={answered === 0}>
                {sent ? "Your email draft is open. Thank you." : "Send to Kary"}
              </button>
              <p className={styles.small}>Mockup: opens an email draft. On the real site it goes to your inbox or CRM.</p>
            </form>
          </div>
        </div>
      </section>

      <section id="retreats" className={`${styles.wrap} ${styles.section}`}>
        <p className={styles.kicker}>For guests</p>
        <h2>Come with a retreat.</h2>
        <p className={styles.text}>Each retreat is led by its own facilitator, who takes your questions and your booking.</p>
        <ul className={styles.retreats}>
          {RETREATS.map((r) => (
            <li key={r.name}>
              <a href={r.href} target="_blank" rel="noopener">
                <span>{r.dates}</span>
                <strong>{r.name}</strong>
                <i aria-hidden="true">→</i>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Lately in the bay: their own Instagram */}
      <section className={`${styles.wrap} ${styles.section} ${styles.insta}`}>
        <div className={styles.instaHead}>
          <div>
            <p className={styles.kicker}>Lately in the bay</p>
            <h2>The bay, in our own pictures.</h2>
          </div>
          <a href="https://www.instagram.com/brisa.bahia/" target="_blank" rel="noopener" className={styles.instaLink}>
            @brisa.bahia on Instagram →
          </a>
        </div>
        <div className={styles.instaGrid}>
          {INSTAGRAM.map((p) => (
            <a key={p.img} href={p.href} target="_blank" rel="noopener" aria-label={p.alt}>
              <Image src={`${IMG}/${p.img}.webp`} alt="" fill sizes="(max-width: 860px) 50vw, 25vw" />
            </a>
          ))}
        </div>
      </section>

      {/* From people who stayed */}
      <section className={styles.proof}>
        <div className={styles.wrap}>
          <p className={styles.kicker}>From people who stayed</p>
          <div className={styles.reviews}>
            {REVIEWS.map((r) => (
              <figure key={r.name}>
                <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption>{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerGrid}`}>
          <div>
            <Image src={`${IMG}/brisa-lockup-gold.svg`} alt="Brisa Bahía" width={230} height={124} unoptimized />
            <p className={styles.script}>a place to remember who you truly are</p>
          </div>
          <nav aria-label="Footer">
            <h4>The bay</h4>
            <a href="#way">Getting here</a>
            <a href="#stay">Stay</a>
            <a href="#seasons">When to come</a>
            <a href="#answers">Honest answers</a>
          </nav>
          <nav aria-label="Retreats">
            <h4>Retreats</h4>
            <a href="#host">Host your retreat</a>
            <a href="#fit">Fit check</a>
            <a href="#retreats">Upcoming retreats</a>
            <a href="https://network.brisabahia.com/" target="_blank" rel="noopener">Gather network</a>
          </nav>
          <div>
            <h4>Contact</h4>
            <a href="mailto:info@brisabahia.com">info@brisabahia.com</a>
            <a href="https://www.instagram.com/brisa.bahia/" target="_blank" rel="noopener">@brisa.bahia</a>
            <p>Bahía El Aguacate · Capurganá, Chocó, Colombia</p>
          </div>
        </div>
        <p className={styles.draftLabel}>First mockup by Well Edge Creative · not a finished design</p>
      </footer>
      {standalone && (
        <Link className={styles.back} href="/en/proposals/brisa-bahia#mockup">
          ← Proposal
        </Link>
      )}
    </div>
  );
}
