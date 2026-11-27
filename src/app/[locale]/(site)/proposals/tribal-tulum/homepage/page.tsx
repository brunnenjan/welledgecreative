/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Figtree, Zen_Old_Mincho } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import ProposalScroll from "../../ProposalScroll";
import TribalMark from "../TribalMark";
import TribalMotion from "../TribalMotion";
import { PHOTO, passes, retreats } from "../data";
import s from "../tribal.module.css";

const display = Zen_Old_Mincho({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });
const body = Figtree({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

// The homepage mockup shown inside the proposal, and on its own when opened full screen.
export const metadata: Metadata = {
  title: "Tribal Tulum | Homepage mockup by Well Edge Creative",
  description: "A homepage direction for Tribal Tulum, with the words, prices and photos from tribaltulum.com.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: `${SITE_URL}/en/proposals/tribal-tulum/homepage` },
};

export default function TribalTulumHomepageMockup() {
  return (
    <>
      <ProposalScroll />
      <TribalMotion />
      <div className={`${s.site} ${s.full} ${body.className}`}>
          <div className={s.hero}>
            <img className={s.heroImg} data-parallax src={PHOTO.sand} alt="Yoga on the sand in Tulum, seen from above" />
            <div className={s.heroShade} />
            <div className={s.heroNav}>
              <span className={s.brand}>
                <TribalMark size={30} />
                TRIBAL TULUM
              </span>
              <span className={s.navLinks}>
                <span>Retreats</span>
                <span>Classes</span>
                <span>Contact</span>
              </span>
            </div>
            <div className={s.heroBody}>
              <p className={`${s.heroTitle} ${display.className}`}>Yoga retreats and daily classes in Tulum</p>
              <p className={s.heroSub}>
                Reconnect with yoga, meditation and mindfulness in a world class studio with incredible teachers.
              </p>
              <div className={s.doors}>
                <div className={s.door} data-rise={0}>
                  <p className={s.doorLabel}>Visiting Tulum</p>
                  <p className={`${s.doorTitle} ${display.className}`}>Come for a retreat</p>
                  <p className={s.doorText}>6 to 21 days, lodging included. From $1449 USD.</p>
                  <span className={s.btnTeal}>See the four retreats</span>
                </div>
                <div className={s.door} data-rise={1}>
                  <p className={s.doorLabel}>Living in Tulum</p>
                  <p className={`${s.doorTitle} ${display.className}`}>Come to class</p>
                  <p className={s.doorText}>Classes six days a week. 1800 MXN a month for 3 classes a week.</p>
                  <span className={s.btnTeal}>See this week’s classes</span>
                </div>
              </div>
            </div>
          </div>
          <div className={s.block}>
            <p className={s.eyebrow}>Retreats</p>
            <h2 className={`${s.h2} ${display.className}`}>Our retreats reconnect you</h2>
            <div className={s.retreats}>
              {retreats.map((r, i) => (
                <article key={r.name} className={s.retreat} data-rise={i}>
                  <div className={s.retreatPhoto}>
                    <img src={r.photo} alt={r.alt} loading="lazy" />
                    <span className={s.badge}>{r.length}</span>
                  </div>
                  <div className={s.retreatBody}>
                    <h3 className={`${s.retreatName} ${display.className}`}>{r.name}</h3>
                    <p className={s.retreatLine}>{r.best}</p>
                    <ul className={s.incl}>
                      {r.includes.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <div className={s.priceRow}>
                      <p className={s.priceMain}>{r.usd}</p>
                      <p className={s.priceSub}>{r.mxn}</p>
                    </div>
                    <span className={s.btnDark}>Ask about dates</span>
                  </div>
                </article>
              ))}
            </div>
            <p className={s.fine}>Prices as on tribaltulum.com today. Pesos are rounded at today’s rate.</p>
          </div>

          <div className={s.quote}>
            <img data-parallax src={PHOTO.studio} alt="The Tribal Tulum studio" loading="lazy" />
            <div className={s.quoteShade} />
            <blockquote className={display.className} data-rise={0}>
              “This yoga studio is a must when visiting Tulum. Highly recommended.”
              <cite className={body.className}>Dora F</cite>
            </blockquote>
          </div>
          <div className={`${s.block} ${s.tinted}`}>
            <div className={s.split}>
              <div data-rise={0}>
                <p className={s.eyebrow}>Daily classes</p>
                <h2 className={`${s.h2} ${display.className}`}>Class passes</h2>
                <ul className={s.passes}>
                  {passes.map((p) => (
                    <li key={p.name} className={s.pass}>
                      <div>
                        <p className={s.passName}>{p.name}</p>
                        <p className={s.passWhat}>{p.what}</p>
                      </div>
                      <div className={s.passPrice}>
                        <p className={s.priceMain}>{p.main}</p>
                        <p className={s.priceSub}>{p.sub}</p>
                      </div>
                      <span className={s.btnSmall}>Buy</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={s.formCard} data-rise={1}>
                <p className={s.eyebrow}>Retreats</p>
                <h2 className={`${s.h2} ${display.className}`}>Ask about dates</h2>
                <div className={s.field}>
                  <span className={s.label}>Which retreat?</span>
                  <span className={s.input}>Dive and Yoga</span>
                </div>
                <div className={s.fieldRow}>
                  <div className={s.field}>
                    <span className={s.label}>When would you like to come?</span>
                    <span className={s.input}>&nbsp;</span>
                  </div>
                  <div className={s.field}>
                    <span className={s.label}>How many people?</span>
                    <span className={s.input}>&nbsp;</span>
                  </div>
                </div>
                <div className={s.field}>
                  <span className={s.label}>Your name and email</span>
                  <span className={s.input}>&nbsp;</span>
                </div>
                <span className={s.btnDark}>Send my request</span>
              </div>
            </div>
          </div>

          <div className={s.closing}>
            <img data-parallax src={PHOTO.entrance} alt="The entrance of Tribal Tulum" loading="lazy" />
            <div className={s.quoteShade} />
            <div data-rise={0}>
              <p className={`${s.closingTitle} ${display.className}`}>We can’t wait to meet you</p>
              <p className={s.closingText}>
                Avenida Coba Sur, Tulum · Mon to Sun, 8 am to 8 pm
                <br />
                hello@tribaltulum.com · +52 984 135 4721
              </p>
            </div>
          </div>
        </div>
    </>
  );
}
