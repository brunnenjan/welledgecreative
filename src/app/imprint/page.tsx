import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint / Impressum | Well Edge Creative",
  description: "Legal information and imprint for Well Edge Creative.",
};

const MAIL = "jan@well-edge-creative.de";

export default function ImprintPage() {
  return (
    <main className="relative z-[60] bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-24 lg:py-28">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Imprint / Impressum
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Information in accordance with § 5 TMG · Angaben gemäß § 5 TMG
        </p>

        <div className="mt-10 grid gap-8 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Responsible for Content / Verantwortlich für den Inhalt</h2>
            <p className="mt-3">
              Well Edge Creative · Jan Brunnenkant<br />
              Hauptstraße 15<br />
              78713 Schramberg<br />
              Deutschland / Germany
            </p>
            <p className="mt-3">
              E-Mail: <a className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900" href={`mailto:${MAIL}`}>{MAIL}</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">VAT Information / Umsatzsteuer-ID</h2>
            <p className="mt-3">
              As a small business owner according to § 19 UStG (German VAT Act), no sales tax is charged.<br />
              <span lang="de">Kleinunternehmer gemäß § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen.</span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Liability for Content / Haftung für Inhalte</h2>
            <p className="mt-3">
              <strong>EN:</strong> As a service provider, we are responsible for our own content on these pages under general law in accordance with § 7 para. 1 TMG. However, according to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. We reserve the right to remove content if we become aware of legal violations.
            </p>
            <p className="mt-3" lang="de">
              <strong>DE:</strong> Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Liability for Links / Haftung für Links</h2>
            <p className="mt-3">
              <strong>EN:</strong> Our website contains links to external websites over which we have no control. We cannot accept any liability for the content of these external sites. The respective provider or operator is always responsible for the content of linked pages. We will remove such links immediately if we become aware of legal violations.
            </p>
            <p className="mt-3" lang="de">
              <strong>DE:</strong> Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">Copyright / Urheberrecht</h2>
            <p className="mt-3">
              <strong>EN:</strong> The content and works on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of use beyond the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this page are only permitted for private, non-commercial use.
            </p>
            <p className="mt-3" lang="de">
              <strong>DE:</strong> Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">EU Dispute Resolution / EU-Streitschlichtung</h2>
            <p className="mt-3">
              <strong>EN:</strong> The European Commission provides a platform for online dispute resolution (ODR):
              <a
                className="ml-1 underline decoration-slate-400 underline-offset-4 hover:text-slate-900"
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . We are neither obliged nor willing to participate in dispute resolution procedures before a consumer arbitration board.
            </p>
            <p className="mt-3" lang="de">
              <strong>DE:</strong> Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
