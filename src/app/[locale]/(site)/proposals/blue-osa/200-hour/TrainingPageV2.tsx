"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import base from "../teacher-training/training.module.css";
import styles from "./v2.module.css";
import {
  APPLY, CALL, COMPARE, CURRICULUM, DATES, DAY, EXPECT, FAMILY, FAQ, FAQ_COUNT, FOOD, GOOGLE, GUARANTEE, IMG, INCLUDED,
  LEARN, MEALS, NOT_INCLUDED, PATH, PLACE_FILM, PRICES, RIGHT_FOR, ROOMS, ROOM_TYPES, URL_300, V2, VOICES, WHY,
} from "./data";

/**
 * Second mockup of the Blue Osa 200-hour page, with Aaron's feedback of 18 November built in:
 * the full depth of the current page (galleries, comparison, guarantee, "right for you", what to
 * expect, full FAQ, "Curriculum"), the dates and the path to the 300-hour training, the H1 and
 * headings with "200 Hour Yoga Teacher Training Costa Rica", Apply, Book a call and Book Now side
 * by side, and the price after the program details. Two switches for the call: the SEO notes and
 * the small all-inclusive line near the dates (his layout test).
 */

const TRAINING_FILM = "https://www.youtube-nocookie.com/embed/U-cCEZdxw3c?autoplay=1&rel=0";

// Google's own "G", for the review cards.
function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function Seo({ on, children }: { on: boolean; children: React.ReactNode }) {
  return on ? <span className={styles.seo}>{children}</span> : null;
}

function Ctas({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <div className={compact ? styles.ctasCompact : styles.ctas}>
      <a href={APPLY} target="_blank" rel="noreferrer" className={base.btn}>Apply now</a>
      <a href={CALL} className={dark ? styles.btnLight : styles.btnOutline}>Book a discovery call</a>
    </div>
  );
}

export default function TrainingPageV2({ heading, body }: { heading: string; body: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [standalone, setStandalone] = useState(false);
  const [seo, setSeo] = useState(false);
  const [priceLine, setPriceLine] = useState(true);
  const [panel, setPanel] = useState(false);
  const [film, setFilm] = useState(false);
  const [box, setBox] = useState<{ set: string[]; i: number } | null>(null);

  useEffect(() => {
    setStandalone(window.self === window.top);
    // Opened from the call page with ?seo=1 shows the SEO notes straight away.
    if (new URLSearchParams(window.location.search).get("seo") === "1") setSeo(true);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(`.${base.heroText} > *`, { y: 26, opacity: 0, duration: 1, stagger: 0.12, ease: "power2.out", delay: 0.2 });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((r) =>
          gsap.from(r, { y: 28, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: r, start: "top 90%", once: true } }),
        );
      });
    }, el);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  const step = useCallback((d: number) => setBox((b) => (b ? { ...b, i: (b.i + d + b.set.length) % b.set.length } : b)), []);
  useEffect(() => {
    if (!box) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [box, step]);

  const gallery = (set: string[], label: string) => (
    <div className={styles.gallery}>
      {set.slice(0, 5).map((img, i) => (
        <button key={img} type="button" className={i === 0 ? styles.galleryMain : styles.galleryThumb} onClick={() => setBox({ set, i })} aria-label={`Open ${label} photo ${i + 1} of ${set.length}`}>
          <Image src={`${V2}/${img}.webp`} alt="" fill sizes={i === 0 ? "(max-width: 860px) 100vw, 50vw" : "(max-width: 860px) 50vw, 25vw"} />
          {i === 4 && <span className={styles.galleryMore}>+{set.length - 5} photos</span>}
        </button>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`${base.site} ${styles.root} ${body}`}>
      <style>{".cookie-banner{display:none!important}"}</style>

      {/* Their menu, with "Your investment" kept, and both ways in */}
      <header className={base.nav}>
        <a href="#top" className={base.brand} aria-label="Blue Osa">
          <Image src={`${IMG}/logo-white-v4.png`} alt="" width={120} height={62} priority />
        </a>
        <nav className={`${base.links} ${styles.links}`} aria-label="Mockup navigation">
          <a href="#curriculum">Curriculum</a>
          <a href="#right-for-you">Who it&apos;s for</a>
          <a href="#included">What&apos;s included</a>
          <a href="#investment">Your investment</a>
          <a href="#graduates">Testimonials</a>
          <a href="#faq">FAQ</a>
          <a href="#call">Contact</a>
        </nav>
        <a href={CALL} className={styles.navCall}>Book a call</a>
        <a href={APPLY} target="_blank" rel="noreferrer" className={base.navCta}>Apply now</a>
      </header>

      {/* 1. First screen: the H1 keeps the full search phrase */}
      <section id="top" className={base.hero}>
        <div className={base.heroImg}>
          <video src={`${IMG}/drone-loop.mp4`} poster={`${IMG}/drone-poster.webp`} autoPlay muted loop playsInline aria-label="Blue Osa from the air: the Osa Peninsula coast and the retreat in the rainforest" />
        </div>
        <div className={base.heroShade} />
        <div className={`${base.heroText} ${styles.heroText}`}>
          <p className={base.kicker}>Yoga Alliance RYT-200 certified · Osa Peninsula</p>
          <h1 className={heading}>
            200 Hour Yoga Teacher Training Costa&nbsp;Rica
            <br />
            <strong>14-Day Intensive YTT</strong>
          </h1>
          <Seo on={seo}>H1 unchanged: &quot;200 Hour Yoga Teacher Training Costa Rica&quot; · URL /14-day-200-hour-yoga-teacher-training-costa-rica/ kept</Seo>
          <p className={base.heroLead}>Complete your 200-hour certification in just two weeks at our beachfront retreat, with the AYAMA™ method you can&apos;t learn anywhere else.</p>
          <Ctas dark />
        </div>
      </section>

      {/* 2. Dates first, three ways in for each date */}
      <section className={styles.datesBand} aria-labelledby="dates-title">
        <div className={base.wrap}>
          <div className={styles.datesCard}>
            <div className={styles.datesHead}>
              <div>
                <h2 id="dates-title" className={heading}>Upcoming dates</h2>
                <p className={styles.datesSub}>Apply now for an upcoming program and get a free preview.</p>
              </div>
              {priceLine && (
                <p className={styles.priceLine}>
                  All-inclusive: room, three meals, training and certification. <a href="#investment">See your investment ↓</a>
                </p>
              )}
            </div>
            <ul className={styles.dates}>
              {DATES.map((d) => (
                <li key={d.dates}>
                  <div>
                    <strong>{d.dates}</strong>
                    <span className={d.spots < 12 ? styles.spotsLow : styles.spots}>Only {d.spots} spots remaining</span>
                  </div>
                  <div className={styles.dateActions}>
                    <a href={APPLY} target="_blank" rel="noreferrer" className={styles.dateApply}>Apply</a>
                    <a href={d.book} target="_blank" rel="noreferrer" className={styles.dateBook}>Book now</a>
                  </div>
                </li>
              ))}
            </ul>
            <p className={styles.datesFoot}>
              Not sure yet? <a href={CALL}>Book a free discovery call</a> and get all your questions answered: travel, rooms, location, food. Full refund of your deposit if you cancel in writing at least 12 weeks before your training.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Welcome, with the phrase in the H2 */}
      <section className={`${base.wrap} ${styles.welcome}`}>
        <div data-reveal>
          <p className={base.kicker}>Welcome</p>
          <h2 className={heading}>Welcome to Our Transformational 14-Day Yoga Teacher Training</h2>
          <Seo on={seo}>H2 · body text keeps &quot;200 hour yoga teacher training Costa Rica&quot;</Seo>
        </div>
        <div data-reveal>
          <p>Blue Osa&apos;s 200 hour yoga teacher training in Costa Rica is an intensive 14-day immersion on the pristine Osa Peninsula. Our Yoga Alliance-certified program combines traditional yogic wisdom with the AYAMA™ methodology, offering you the fastest path to becoming a certified yoga teacher.</p>
          <blockquote className={heading}>“I made friends that will last a lifetime and am now teaching weekly yoga classes. I never imagined I would find my life purpose in my retirement years!”<cite>Adrian, YTT graduate</cite></blockquote>
        </div>
      </section>

      {/* 3b. Why choose, and the place in their own film */}
      <section className={styles.whyBand}>
        <div className={base.wrap}>
          <div className={base.head} data-reveal>
            <p className={base.kicker}>Why Blue Osa</p>
            <h2 className={heading}>Why Choose Our 14-Day, 200 Hour Yoga Teacher Training Costa Rica?</h2>
            <Seo on={seo}>H2 with the full phrase, as today</Seo>
          </div>
          <ol className={styles.why}>
            {WHY.map((w, i) => (
              <li key={w.title} data-reveal>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{w.title}</strong>
                {w.text}
              </li>
            ))}
          </ol>
          <div className={styles.placeFilm} data-reveal>
            <div className={base.film}>
              <video src={PLACE_FILM} poster={`${IMG}/film-place.webp`} controls playsInline preload="none" aria-label="The Blue Osa film: the place, the rooms, the food and the Osa Peninsula" />
            </div>
            <p className={base.filmNote}>The Blue Osa film · where the rainforest meets the sea</p>
          </div>
        </div>
      </section>

      {/* 4. Curriculum, every module opens to its full list */}
      <section id="curriculum" className={base.trainingBand}>
        <div className={base.wrap}>
          <div className={base.head} data-reveal>
            <p className={base.kickerLight}>Curriculum</p>
            <h2 className={heading}>What You&apos;ll Learn in This 200-Hour Yoga Teacher Training</h2>
            <Seo on={seo}>Course schema kept: the four curriculum modules</Seo>
            <ul className={styles.learn}>
              {LEARN.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
          <div className={styles.modules}>
            {CURRICULUM.map((c) => (
              <details key={c.title} className={styles.module} data-reveal>
                <summary>
                  <span className={`${styles.hours} ${heading}`}>{c.hours}<small>hours</small></span>
                  <span className={styles.moduleText}>
                    <em>Part {c.part} · {c.sub}</em>
                    <strong>{c.title}</strong>
                  </span>
                  <span className={styles.plus} aria-hidden="true" />
                </summary>
                <ul>
                  {c.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </details>
            ))}
          </div>
          <div id="film" className={base.filmRow} data-reveal>
            <div>
              <h3 className={heading}>See it before you decide</h3>
              <p>What to expect at a Blue Osa Yoga Teacher Training.</p>
            </div>
            <div className={base.film}>
              {film ? (
                <iframe src={TRAINING_FILM} title="What to expect at a Blue Osa Yoga Teacher Training" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              ) : (
                <button type="button" onClick={() => setFilm(true)} aria-label="Play: What to expect at a Blue Osa Yoga Teacher Training">
                  <Image src={`${IMG}/film-ytt.webp`} alt="" fill sizes="(max-width: 860px) 100vw, 60vw" />
                  <span className={base.play} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Is this program right for you? */}
      <section id="right-for-you" className={`${base.wrap} ${styles.rightFor}`}>
        <div data-reveal>
          <p className={base.kicker}>Who it&apos;s for</p>
          <h2 className={heading}>Is This 200 Hour Yoga Teacher Training Costa Rica Program Right for You?</h2>
          <p className={styles.muted}>This intensive program is perfect for:</p>
        </div>
        <ul className={styles.rightList}>
          {RIGHT_FOR.map((r) => (
            <li key={r.title} data-reveal><strong>{r.title}</strong>{r.text}</li>
          ))}
        </ul>
        <div className={styles.which} data-reveal>
          <p><strong>Already certified?</strong> The 28-day 300-hour training takes you to RYT-500.</p>
          <a href="#path">Compare the trainings ↓</a>
        </div>
      </section>

      {/* 6. What to expect, itemized */}
      <section className={styles.expectBand}>
        <div className={base.wrap}>
          <div className={base.head} data-reveal>
            <p className={base.kicker}>What to expect</p>
            <h2 className={heading}>Your 14 days, step by step</h2>
          </div>
          <div className={styles.expect}>
            <ol className={styles.schedule} data-reveal>
              <li className={styles.scheduleHead}>Your daily sample schedule</li>
              {DAY.map((d) => <li key={d.time}><span>{d.time}</span>{d.what}</li>)}
            </ol>
            <ul className={styles.expectList}>
              {EXPECT.map((e) => <li key={e.title} data-reveal><strong>{e.title}</strong>{e.text}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. The comparison, as a real table */}
      <section className={`${base.wrap} ${styles.compare}`}>
        <div className={base.head} data-reveal>
          <p className={base.kicker}>Why 14 days</p>
          <h2 className={heading}>14-Day Intensive vs Traditional 6-Month Programs</h2>
          <Seo on={seo}>Real HTML table, readable for search engines and AI answers</Seo>
        </div>
        <div className={styles.tableWrap} data-reveal>
          <table>
            <thead>
              <tr><th scope="col"><span className="sr-only">Feature</span></th><th scope="col">Blue Osa 14-Day Intensive</th><th scope="col">Traditional weekend programs</th></tr>
            </thead>
            <tbody>
              {COMPARE.map(([f, a, b]) => <tr key={f}><th scope="row">{f}</th><td>{a}</td><td>{b}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. A call, where questions come up */}
      <section className={styles.callBand}>
        <div className={`${base.wrap} ${styles.callInner}`} data-reveal>
          <div>
            <h2 className={heading}>Questions? We have answers!</h2>
            <p>Wondering what a day in training looks like, what to pack, or if you&apos;re &quot;ready enough&quot;? Book a call with us.</p>
          </div>
          <a href={CALL} className={styles.btnLight}>Book a discovery call</a>
        </div>
      </section>

      {/* 9. Rooms, a real gallery */}
      <section id="included" className={`${base.wrap} ${styles.stay}`}>
        <div className={styles.stayText} data-reveal>
          <p className={base.kicker}>Accommodations</p>
          <h2 className={heading}>Your Home During Your 200 Hour Yoga Teacher Training</h2>
          <ul className={styles.types}>
            {ROOM_TYPES.map((r) => <li key={r.title}><strong>{r.title}</strong>{r.text}</li>)}
          </ul>
          <p className={styles.muted}>Single, double and triple occupancy.</p>
        </div>
        <div data-reveal>{gallery(ROOMS, "room")}</div>
      </section>

      {/* 10. Food, a real gallery */}
      <section className={styles.foodBand}>
        <div className={`${base.wrap} ${styles.stay} ${styles.stayFlip}`}>
          <div data-reveal>{gallery(FOOD, "food")}</div>
          <div className={styles.stayText} data-reveal>
            <p className={base.kicker}>Farm-to-table</p>
            <h2 className={heading}>Nourish Your Training with Farm-to-Table Meals</h2>
            <ul className={styles.checks}>
              {MEALS.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* 11. Yogi Aaron */}
      <section id="aaron" className={`${base.wrap} ${base.aaron}`}>
        <div className={base.aaronImg} data-reveal>
          <Image src={`${IMG}/aaron.webp`} alt="Yogi Aaron" fill sizes="(max-width: 860px) 100vw, 40vw" />
        </div>
        <div data-reveal>
          <p className={base.kicker}>Your lead instructor</p>
          <h2 className={heading}>Meet Yogi Aaron, Founder of the AYAMA™ Methodology</h2>
          <blockquote className={heading}>“I built Blue Osa to host yoga immersions in a safe, wild, and nurturing environment.”</blockquote>
          <p>30+ years of yoga experience and countless teacher trainings, in the direct lineage of the Himalayan Tradition, infused with AYAMA, Vinyasa, Hatha, Restorative and Bhakti Yoga.</p>
          <ul className={base.badges}>
            <li>Travelers&apos; Choice Best of the Best 2024</li>
            <li>Featured in BBC, Wall Street Journal, Outside</li>
          </ul>
        </div>
      </section>

      {/* 11b. The Blue Osa family */}
      <section className={`${base.wrap} ${styles.family}`}>
        <div className={styles.familyImg} data-reveal>
          <Image src={`${IMG}/team.webp`} alt="The Blue Osa team" fill sizes="(max-width: 860px) 100vw, 50vw" />
        </div>
        <div data-reveal>
          <p className={base.kicker}>Your Blue Osa family</p>
          <h3 className={heading}>Forget &quot;staff&quot;. At Blue Osa we have family.</h3>
          <p>{FAMILY}</p>
        </div>
      </section>

      {/* 12. Graduates */}
      <section id="graduates" className={styles.voicesBand}>
        <div className={base.wrap}>
          <div className={base.head} data-reveal>
            <p className={base.kicker}>Real stories</p>
            <h2 className={heading}>What Our 200 Hour Yoga Teacher Training Graduates Say</h2>
          </div>
          <div className={styles.voices}>
            {VOICES.map((v) => (
              <figure key={v.by} data-reveal>
                <div className={styles.voiceImg}><Image src={`${IMG}/${v.img}.webp`} alt="" fill sizes="(max-width: 860px) 100vw, 25vw" /></div>
                <strong className={heading}>{v.tag}</strong>
                <blockquote>“{v.quote}”</blockquote>
                <figcaption>{v.by}</figcaption>
              </figure>
            ))}
          </div>
          <div className={styles.googleHead} data-reveal>
            <GoogleG size={22} />
            <strong>Google reviews</strong>
            <span className={styles.gStars} aria-hidden="true">★★★★★</span>
            <span className={styles.googleNote}>Guests of the 200-hour training and the retreat</span>
          </div>
          <div className={styles.google} data-reveal>
            {GOOGLE.map((g) => (
              <figure key={g.by} className={styles.gCard}>
                <div className={styles.gTop}>
                  <span className={styles.gAvatar} style={{ background: g.color }} aria-hidden="true">{g.by[0]}</span>
                  <div>
                    <strong>{g.by}</strong>
                    <span>{g.date}</span>
                  </div>
                  <GoogleG />
                </div>
                <div className={styles.gRating}>
                  <span className={styles.gStars} aria-label="5 out of 5 stars">★★★★★</span>
                  <span className={styles.gVerified} title="Verified review">✓</span>
                </div>
                <details className={styles.gText}>
                  <summary>
                    <blockquote>{g.text}</blockquote>
                    <span className={styles.gMore}>Read more</span>
                  </summary>
                  <blockquote>{g.text}</blockquote>
                </details>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Your investment: after the details, easy to find from the menu */}
      <section id="investment" className={base.priceBand}>
        <div className={`${base.wrap} ${base.price}`}>
          <div data-reveal>
            <p className={base.kicker}>Your investment</p>
            <h2 className={heading}>Invest in Your Transformation</h2>
            <div className={base.priceTable}>
              {PRICES.map((p) => <div key={p.room}><span>{p.room}</span><strong className={heading}>{p.price}</strong></div>)}
            </div>
            <p className={base.small}>Reserve your spot with a $300 deposit. Space is limited.</p>
            <div className={styles.guarantee}>
              <h3>Our Risk-Free Guarantee</h3>
              {GUARANTEE.map((g) => <p key={g.slice(0, 20)}>{g}</p>)}
            </div>
          </div>
          <div className={base.includes} data-reveal>
            <h3>What&apos;s included</h3>
            <ul className={base.yes}>{INCLUDED.map((i) => <li key={i}>{i}</li>)}</ul>
            <h3>Not included</h3>
            <ul className={base.no}>{NOT_INCLUDED.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        </div>
        <div className={base.wrap}>
          <div className={styles.threeWays} data-reveal>
            <div><strong>Apply</strong><p>For an upcoming date, with a free preview of the training.</p><a href={APPLY} target="_blank" rel="noreferrer" className={base.btn}>Apply now</a></div>
            <div><strong>Talk to us</strong><p>Travel, rooms, food or whether you&apos;re ready: ask the team first.</p><a href={CALL} className={styles.btnOutline}>Book a discovery call</a></div>
            <div><strong>Book now</strong><p>Know your date? Reserve it with a $300 deposit.</p><a href="#top" className={styles.btnOutline} onClick={(e) => { e.preventDefault(); document.querySelector(`.${styles.datesBand}`)?.scrollIntoView({ behavior: "smooth" }); }}>Choose your date</a></div>
          </div>
        </div>
      </section>

      {/* 14. The path from one level to the next */}
      <section id="path" className={`${base.wrap} ${styles.path}`}>
        <div className={base.head} data-reveal>
          <p className={base.kicker}>Your path</p>
          <h2 className={heading}>From RYT-200 to RYT-500</h2>
        </div>
        <div className={styles.pathGrid}>
          {PATH.map((p) => (
            <article key={p.level} className={p.here ? styles.pathHere : styles.pathCard} data-reveal>
              <span className={styles.pathLevel}>{p.level}{p.here && " · you are here"}</span>
              <h3 className={heading}>{p.name}</h3>
              <dl>
                <div><dt>Certification</dt><dd>{p.cert}</dd></div>
                <div><dt>Length</dt><dd>{p.length}</dd></div>
                <div><dt>For</dt><dd>{p.for}</dd></div>
                <div><dt>Price</dt><dd>{p.price}, all-inclusive</dd></div>
                <div><dt>Dates</dt><dd>{p.dates}</dd></div>
              </dl>
              {p.here ? <a href={APPLY} target="_blank" rel="noreferrer" className={base.btn}>Apply now</a> : <a href={URL_300} target="_blank" rel="noreferrer" className={styles.btnOutline}>See the 300-hour training</a>}
            </article>
          ))}
        </div>
      </section>

      {/* 15. The full FAQ, grouped */}
      <section id="faq" className={styles.faqBand}>
        <div className={`${base.wrap} ${styles.faq}`}>
          <div data-reveal>
            <p className={base.kicker}>FAQ</p>
            <h2 className={heading}>FAQs About Our 200 Hour Yoga Teacher Training Costa Rica</h2>
            <Seo on={seo}>FAQ schema: all {FAQ_COUNT} questions</Seo>
            <p className={styles.muted}>Still have a question? <a href={CALL}>Book a call with our team.</a></p>
          </div>
          <div>
            {FAQ.map((g) => (
              <div key={g.group} className={styles.faqGroup}>
                <h3>{g.group}</h3>
                {g.items.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. The discovery call: their own booking form sits here */}
      <section id="call" className={base.applyBand}>
        <div className={`${base.wrap} ${base.apply}`}>
          <div data-reveal>
            <h2 className={heading}>Begin Your 200 Hour Yoga Teacher Training Journey</h2>
            <p>Ready to book but want to talk logistics first? Schedule a free call with us. We&apos;ll walk you through everything and answer all your questions.</p>
            <Ctas dark />
          </div>
          <div className={styles.callBox} data-reveal>
            <span className={styles.callIcon} aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4" /><path d="m9 15 2 2 4-4" /></svg>
            </span>
            <strong>Book your free discovery call</strong>
            <p>Travel, rooms, food, or whether you&apos;re ready: our team answers every question in 30 minutes.</p>
            <a href={CALL} className={base.btn}>Choose a time</a>
            <small>Your existing Simplero booking and the contact form sit here, unchanged.</small>
          </div>
        </div>
      </section>

      <footer className={base.footer}>
        <Image src={`${IMG}/logo-white-v4.png`} alt="Blue Osa" width={110} height={57} />
        <p>Playa Tamales · Puerto Jiménez · Osa Peninsula · Costa Rica</p>
        <p className={base.draftLabel}>Second mockup by Well Edge Creative, with your feedback built in · not a finished design</p>
        <p className={styles.rights}>Design concept by Well Edge Creative, shared for your review. The design passes to Blue Osa with the project.</p>
      </footer>

      {/* On phones: both ways in, always one tap away */}
      <div className={styles.mobileBar}>
        <a href={CALL}>Book a call</a>
        <a href={APPLY} target="_blank" rel="noreferrer">Apply now</a>
      </div>

      {/* Switches for the call */}
      <div className={styles.panel} data-open={panel}>
        <button type="button" className={styles.panelToggle} onClick={() => setPanel(!panel)} aria-expanded={panel}>
          {panel ? "Hide" : "Mockup switches"}
        </button>
        {panel && (
          <>
            <label><input type="checkbox" checked={seo} onChange={(e) => setSeo(e.target.checked)} /> Show SEO notes</label>
            <label><input type="checkbox" checked={priceLine} onChange={(e) => setPriceLine(e.target.checked)} /> All-inclusive line near the dates</label>
          </>
        )}
      </div>

      {box && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Photo gallery" onClick={() => setBox(null)}>
          <div className={styles.lightboxImg} onClick={(e) => e.stopPropagation()}>
            <Image src={`${V2}/${box.set[box.i]}.webp`} alt="" fill sizes="90vw" />
          </div>
          <button type="button" className={styles.lbPrev} onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo">‹</button>
          <button type="button" className={styles.lbNext} onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo">›</button>
          <button type="button" className={styles.lbClose} onClick={() => setBox(null)} aria-label="Close gallery">×</button>
          <span className={styles.lbCount}>{box.i + 1} / {box.set.length}</span>
        </div>
      )}

      {standalone && <Link className={base.back} href="/en/proposals/blue-osa/call">← Back to the overview</Link>}
    </div>
  );
}
