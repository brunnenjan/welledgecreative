import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Well Edge Creative",
  description: "Rechtliche Anbieterkennzeichnung von Well Edge Creative.",
};

const MAIL = "info@well-edge-creative.com";

export default function ImprintPage() {
  return (
    <main className="relative z-[60] bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-24 lg:py-28">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Impressum
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Angaben gemäß § 5 TMG. Bitte ergänzen Sie die nachfolgenden Felder mit Ihren tatsächlichen Unternehmensdaten.
        </p>

        <div className="mt-10 grid gap-8 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Verantwortlich für den Inhalt</h2>
            <p className="mt-3">
              Well Edge Creative<br />
              Jan Brunnenkant<br />
              <span className="text-slate-500">
                (Bitte hier Ihre ladungsfähige Anschrift ergänzen)
              </span>
            </p>
            <p className="mt-3">
              E-Mail: <a className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900" href={`mailto:${MAIL}`}>{MAIL}</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Haftung für Inhalte</h2>
            <p className="mt-3">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
              Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
              übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
              eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
              jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
              entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Haftung für Links</h2>
            <p className="mt-3">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
              Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
              jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Urheberrecht</h2>
            <p className="mt-3">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
              beachtet und entsprechende Inhalte gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
              aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">EU-Streitschlichtung / Verbraucherstreitbeilegung</h2>
            <p className="mt-3">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              <a
                className="ml-1 underline decoration-slate-400 underline-offset-4 hover:text-slate-900"
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
