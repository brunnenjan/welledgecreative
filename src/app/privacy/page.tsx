import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Well Edge Creative",
  description: "Informationen über die Verarbeitung personenbezogener Daten bei Well Edge Creative.",
};

const MAIL = "info@well-edge-creative.com";

export default function PrivacyPolicyPage() {
  return (
    <main className="relative z-[60] bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-24 lg:py-28">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Datenschutzerklärung
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Diese Datenschutzerklärung erläutert Art, Umfang und Zweck der Verarbeitung personenbezogener Daten innerhalb dieser Website. Bitte prüfen Sie die Angaben und ergänzen Sie fehlende Informationen (z.&nbsp;B. Anschrift oder Ansprechpartner) gemäß Ihren tatsächlichen Verhältnissen.
        </p>

        <div className="mt-10 grid gap-8 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">1. Verantwortliche Stelle</h2>
            <p className="mt-3">
              Well Edge Creative<br />
              Jan Brunnenkant<br />
              <span className="text-slate-500">(Bitte hier Ihre ladungsfähige Anschrift eintragen)</span>
            </p>
            <p className="mt-3">
              E-Mail: <a href={`mailto:${MAIL}`} className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900">{MAIL}</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">2. Erhobene Daten und Zwecke</h2>
            <p className="mt-3">
              Wir verarbeiten personenbezogene Daten, die Sie uns zur Verfügung stellen oder die beim Besuch dieser Website automatisch erhoben werden, zu folgenden Zwecken:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              <li>Bereitstellung und Optimierung der Website (Server-Logfiles, technisch notwendige Cookies).</li>
              <li>Kommunikation über das Kontaktformular (Name, E-Mail-Adresse, Projektinformationen).</li>
              <li>Terminvereinbarung über Calendly.</li>
              <li>Reichweitenmessung und Marketing durch Google Analytics (sofern Sie zuvor eingewilligt haben).</li>
              <li>Sicherheitsmaßnahmen (z.&nbsp;B. Google reCAPTCHA) zur Abwehr missbräuchlicher Nutzung.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">3. Rechtsgrundlagen</h2>
            <p className="mt-3">
              Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a, b und f DSGVO. Die Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) holen wir über ein Cookie-/Consent-Banner ein, bevor Analyse- oder Marketing-Tools aktiviert werden. Die Verarbeitungen, die zur Bereitstellung der Website erforderlich sind, stützen sich auf berechtigte Interessen gemäß Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">4. Kontaktformular</h2>
            <p className="mt-3">
              Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir die von Ihnen eingegebenen Daten, um Ihre Anfrage zu beantworten. Pflichtfelder sind entsprechend gekennzeichnet. Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung und zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. a und b DSGVO). Wir verwenden den Dienst Resend (Resend, Inc., USA) zur technischen Abwicklung des E-Mail-Versands. Ein entsprechender Auftragsverarbeitungsvertrag sowie Standardvertragsklauseln wurden abgeschlossen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">5. Calendly</h2>
            <p className="mt-3">
              Zur Terminvereinbarung binden wir Calendly (Calendly LLC, USA) ein. Wenn Sie einen Termin buchen, werden die eingegebenen Daten an Calendly übermittelt. Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO). Calendly verarbeitet Daten in den USA auf Basis von Standardvertragsklauseln. Weitere Informationen: <a className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900" href="https://calendly.com/privacy" target="_blank" rel="noreferrer">https://calendly.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">6. Google Analytics</h2>
            <p className="mt-3">
              Diese Website verwendet Google Analytics, einen Webanalysedienst der Google Ireland Limited. Google Analytics setzt Cookies ein und überträgt dabei Daten auch in die USA. Die Nutzung erfolgt ausschließlich nach Ihrer ausdrücklichen Einwilligung über das Consent-Banner. IP-Adressen werden anonymisiert verarbeitet. Sie können Ihre Einwilligung jederzeit widerrufen. Weitere Informationen: <a className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900" href="https://support.google.com/analytics/answer/6004245?hl=de" target="_blank" rel="noreferrer">https://support.google.com/analytics/answer/6004245?hl=de</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">7. Google reCAPTCHA</h2>
            <p className="mt-3">
              Zum Schutz vor missbräuchlicher Nutzung unserer Formulare verwenden wir reCAPTCHA v3 von Google. Der Dienst analysiert das Verhalten des Besuchers und erhebt dabei Nutzungsdaten. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO), Missbrauch vorzubeugen. Weitere Informationen: <a className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">https://policies.google.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">8. Server-Logfiles & Hosting</h2>
            <p className="mt-3">
              Der Hosting-Anbieter (z.&nbsp;B. Strato oder Vercel) verarbeitet Logfile-Daten (Browsertyp, Betriebssystem, IP-Adresse, Uhrzeit des Zugriffs) zur Sicherstellung eines stabilen Betriebs. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden nach einer definierten Aufbewahrungsfrist automatisch gelöscht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">9. Speicherdauer</h2>
            <p className="mt-3">
              Wir speichern personenbezogene Daten nur so lange, wie es für die jeweiligen Zwecke erforderlich ist oder wie es gesetzliche Aufbewahrungspflichten vorsehen. Danach werden die Daten gelöscht oder anonymisiert.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">10. Ihre Rechte</h2>
            <p className="mt-3">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie das Recht auf Widerspruch gegen die Verarbeitung Ihrer Daten. Außerdem haben Sie das Recht, eine erteilte Einwilligung jederzeit zu widerrufen. Wenden Sie sich hierzu an <a href={`mailto:${MAIL}`} className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900">{MAIL}</a>. Zudem steht Ihnen ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">11. Aktualisierung der Datenschutzerklärung</h2>
            <p className="mt-3">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder bei Änderungen des Dienstes sowie der Datenverarbeitung anzupassen. Bitte überprüfen Sie diese Seite regelmäßig, um über den aktuellen Stand informiert zu bleiben.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
