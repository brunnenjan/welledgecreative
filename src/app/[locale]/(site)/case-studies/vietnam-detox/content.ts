/**
 * Vietnam Detox case study, English and German. Every fact is either on vietnamdetox.com (checked
 * 20 November 2026) or already published on the Retreats page of this site. No results, visitor
 * numbers or booking figures: the page shows what was built, not what it earned.
 */

export const SITE = "https://vietnamdetox.com";

export const BRAND_COLORS = [
  { name: "Forest", hex: "#1E3D20", light: true },
  { name: "Ivory", hex: "#FEFAF2", light: false },
  { name: "Sand", hex: "#F5E8D0", light: false },
  { name: "Amber", hex: "#F5A030", light: false },
  { name: "Ember", hex: "#E06420", light: true },
];

type Shot = { img: string; label: string; caption: string; alt: string };

export type Copy = {
  crumbWork: string;
  eyebrow: string;
  title: string;
  lead: string;
  visit: string;
  heroAlt: string;
  facts: { label: string; value: string }[];
  startEyebrow: string;
  startTitle: string;
  start: string[];
  workEyebrow: string;
  workTitle: string;
  phases: { title: string; text: string }[];
  retreatsEyebrow: string;
  retreatsTitle: string;
  retreatsIntro: string;
  retreats: { name: string; place: string; text: string }[];
  shotsEyebrow: string;
  shotsTitle: string;
  shots: Shot[];
  phoneCaption: string;
  phoneAlts: [string, string];
  brandEyebrow: string;
  brandTitle: string;
  brandText: string;
  brandType: string;
  logoAlt: string;
  nowEyebrow: string;
  nowTitle: string;
  now: { title: string; text: string }[];
  teamNote: string;
  closeTitle: string;
  closeText: string;
  closeCta: string;
  closeVisit: string;
};

export const COPY: Record<"en" | "de", Copy> = {
  en: {
    crumbWork: "Work",
    eyebrow: "Case study · Vietnam Detox",
    title: "Three retreats, one brand, one clear way to book.",
    lead: "Vietnam Detox has run guided Buchinger fasting retreats in Vietnam for over ten years. Together we rebuilt the brand and the website, so each retreat has its own page and guests can find dates, prices and the right retreat for them.",
    visit: "Visit vietnamdetox.com",
    heroAlt: "The Vietnam Detox homepage: German Buchinger Fasting, Vietnamese Healing Wisdom",
    facts: [
      { label: "Client", value: "Vietnam Detox, Vietnam" },
      { label: "Work", value: "Strategy, brand, web design, booking journey" },
      { label: "Languages", value: "English, Vietnamese, German" },
      { label: "Status", value: "Live since autumn 2026" },
    ],
    startEyebrow: "Where we started",
    startTitle: "Ten years of retreats, and a website that didn't show it.",
    start: [
      "Vietnam Detox had loyal guests and strong feedback, but the brand and the website didn't carry that depth to an international audience.",
      "Three different retreats, in three different places, were presented as one. Each needed its own clear identity inside one system, and guests needed a simple way to compare them and book.",
    ],
    workEyebrow: "What I did",
    workTitle: "Five steps, from the first questions to the live site.",
    phases: [
      { title: "Discovery", text: "Analysis, positioning, sitemap, page layouts and the booking journey, before any design." },
      { title: "Booking and conversion", text: "The booking flow, the price structure and a booking summary that guests can follow line by line." },
      { title: "Brand", text: "A redesigned logo with the flame mark, colour and type, and compact guidelines for web and print." },
      { title: "Relaunch", text: "Messaging, content and page design for the new site, built together with Vietnam Detox's own developer." },
      { title: "Refinement", text: "After launch: shorter and more distinctive retreat pages, clearer programme information and a simple gallery." },
    ],
    retreatsEyebrow: "The retreats",
    retreatsTitle: "Each retreat got its own page.",
    retreatsIntro: "Same method, different settings. Every page carries real dates, availability and per-person prices.",
    retreats: [
      { name: "Yên Retreat", place: "Alba Wellness Valley, Huế", text: "A gentle fast and hot spring reset." },
      { name: "An Retreat", place: "Legacy Yên Tử MGallery", text: "Five guided days in the mountains of Yên Tử." },
      { name: "Hồi Retreat", place: "Fusion Resort & Villas Da Nang", text: "Five days of guided fasting on the coast." },
      { name: "Private and corporate retreats", place: "Huế, or a place chosen together", text: "Built around one guest or group, for five to fourteen days." },
    ],
    shotsEyebrow: "The live site",
    shotsTitle: "Four screens from vietnamdetox.com today.",
    shots: [
      { img: "overview-2", label: "Retreat overview", caption: "Guests choose their travel month and see which retreats run then.", alt: "Retreat overview with a month picker" },
      { img: "an", label: "An Retreat", caption: "One retreat, one page: next date, length, what is included and the package price.", alt: "An Retreat page at Legacy Yên Tử MGallery" },
      { img: "an-2", label: "The An experience", caption: "The Vietnamese character behind the name, and what the days look like.", alt: "An Retreat page section explaining the character An" },
      { img: "booking", label: "Booking", caption: "\"Plan your journey\": retreat, date and room on the left, a summary that updates on the right.", alt: "Booking page with retreat dates and an investment summary" },
    ],
    phoneCaption: "Designed for phones first.",
    phoneAlts: ["Vietnam Detox homepage on a phone", "An Retreat page on a phone"],
    brandEyebrow: "The brand",
    brandTitle: "Forest green, ivory and ember.",
    brandText: "A calm, warm palette for a place of rest, with the flame mark as a small sign of energy returning. It works next to the hotel brands Vietnam Detox partners with.",
    brandType: "Cormorant Garamond for headlines, Be Vietnam Pro for text, so Vietnamese reads as well as English and German.",
    logoAlt: "The Vietnam Detox logo with the flame mark",
    nowEyebrow: "What the site does now",
    nowTitle: "Clear for guests, in three languages.",
    now: [
      { title: "One page per retreat", text: "Guests no longer have to work out which retreat is which." },
      { title: "Dates and prices up front", text: "Real dates, availability and per-person prices on every retreat page." },
      { title: "Help with choosing", text: "A month picker and a short question about what guests are looking for." },
      { title: "A booking path guests can follow", text: "Retreat, date and room in one place, with a summary that updates as they choose." },
    ],
    teamNote: "Technical implementation: Vietnam Detox's own developer. Strategy, brand, design and coordination: Well Edge Creative.",
    closeTitle: "Running retreats and a website that doesn't show them yet?",
    closeText: "I'm happy to take a look and tell you honestly what I would change.",
    closeCta: "Book a 30-minute call",
    closeVisit: "See the live site",
  },
  de: {
    crumbWork: "Arbeiten",
    eyebrow: "Case Study · Vietnam Detox",
    title: "Drei Retreats, eine Marke, ein klarer Weg zur Buchung.",
    lead: "Vietnam Detox veranstaltet seit über zehn Jahren geführte Buchinger-Fastenretreats in Vietnam. Gemeinsam haben wir Marke und Website neu aufgebaut, damit jedes Retreat seine eigene Seite hat und Gäste Termine, Preise und das passende Retreat finden.",
    visit: "vietnamdetox.com ansehen",
    heroAlt: "Die Startseite von Vietnam Detox: German Buchinger Fasting, Vietnamese Healing Wisdom",
    facts: [
      { label: "Kunde", value: "Vietnam Detox, Vietnam" },
      { label: "Leistung", value: "Strategie, Marke, Webdesign, Buchungsweg" },
      { label: "Sprachen", value: "Englisch, Vietnamesisch, Deutsch" },
      { label: "Stand", value: "Live seit Herbst 2026" },
    ],
    startEyebrow: "Der Ausgangspunkt",
    startTitle: "Zehn Jahre Retreats, und eine Website, die das nicht zeigte.",
    start: [
      "Vietnam Detox hatte Stammgäste und starkes Feedback, aber Marke und Website vermittelten diese Tiefe einem internationalen Publikum nicht.",
      "Drei verschiedene Retreats an drei verschiedenen Orten wurden wie eines dargestellt. Jedes brauchte eine eigene, klare Identität innerhalb eines Systems, und Gäste brauchten einen einfachen Weg, sie zu vergleichen und zu buchen.",
    ],
    workEyebrow: "Was ich gemacht habe",
    workTitle: "Fünf Schritte, von den ersten Fragen bis zur Live-Seite.",
    phases: [
      { title: "Discovery", text: "Analyse, Positionierung, Sitemap, Seitenlayouts und der Buchungsweg, noch vor dem Design." },
      { title: "Buchung und Conversion", text: "Der Buchungsablauf, die Preisstruktur und eine Buchungsübersicht, der Gäste Zeile für Zeile folgen können." },
      { title: "Marke", text: "Ein überarbeitetes Logo mit der Flamme, Farben und Schrift sowie kompakte Richtlinien für Web und Druck." },
      { title: "Relaunch", text: "Botschaften, Inhalte und Seitendesign für die neue Website, umgesetzt zusammen mit dem Entwickler von Vietnam Detox." },
      { title: "Feinschliff", text: "Nach dem Launch: kürzere und eigenständigere Retreat-Seiten, klarere Programminfos und eine einfache Galerie." },
    ],
    retreatsEyebrow: "Die Retreats",
    retreatsTitle: "Jedes Retreat hat seine eigene Seite bekommen.",
    retreatsIntro: "Dieselbe Methode, verschiedene Orte. Jede Seite zeigt echte Termine, Verfügbarkeit und Preise pro Person.",
    retreats: [
      { name: "Yên Retreat", place: "Alba Wellness Valley, Huế", text: "Sanftes Fasten und heiße Quellen." },
      { name: "An Retreat", place: "Legacy Yên Tử MGallery", text: "Fünf geführte Tage in den Bergen von Yên Tử." },
      { name: "Hồi Retreat", place: "Fusion Resort & Villas Da Nang", text: "Fünf Tage geführtes Fasten an der Küste." },
      { name: "Private und Firmen-Retreats", place: "Huế oder ein gemeinsam gewählter Ort", text: "Ganz auf einen Gast oder eine Gruppe zugeschnitten, für fünf bis vierzehn Tage." },
    ],
    shotsEyebrow: "Die Live-Seite",
    shotsTitle: "Vier Ansichten von vietnamdetox.com heute.",
    shots: [
      { img: "overview-2", label: "Retreat-Übersicht", caption: "Gäste wählen ihren Reisemonat und sehen, welche Retreats dann stattfinden.", alt: "Retreat-Übersicht mit Monatsauswahl" },
      { img: "an", label: "An Retreat", caption: "Ein Retreat, eine Seite: nächster Termin, Dauer, Leistungen und Paketpreis.", alt: "Seite des An Retreats im Legacy Yên Tử MGallery" },
      { img: "an-2", label: "Das An-Erlebnis", caption: "Das vietnamesische Schriftzeichen hinter dem Namen, und wie die Tage aussehen.", alt: "Abschnitt der An-Retreat-Seite, der das Schriftzeichen An erklärt" },
      { img: "booking", label: "Buchung", caption: "„Plan your journey“: Retreat, Termin und Zimmer links, rechts eine Übersicht, die sich mit aktualisiert.", alt: "Buchungsseite mit Retreat-Terminen und einer Kostenübersicht" },
    ],
    phoneCaption: "Zuerst fürs Handy gestaltet.",
    phoneAlts: ["Startseite von Vietnam Detox auf einem Handy", "Seite des An Retreats auf einem Handy"],
    brandEyebrow: "Die Marke",
    brandTitle: "Waldgrün, Ivory und Ember.",
    brandText: "Eine ruhige, warme Palette für einen Ort der Erholung, mit der Flamme als kleinem Zeichen für zurückkehrende Energie. Sie funktioniert neben den Hotelmarken, mit denen Vietnam Detox zusammenarbeitet.",
    brandType: "Cormorant Garamond für Überschriften, Be Vietnam Pro für Text, damit Vietnamesisch so gut lesbar ist wie Englisch und Deutsch.",
    logoAlt: "Das Logo von Vietnam Detox mit der Flamme",
    nowEyebrow: "Was die Seite jetzt leistet",
    nowTitle: "Klar für Gäste, in drei Sprachen.",
    now: [
      { title: "Eine Seite pro Retreat", text: "Gäste müssen nicht mehr herausfinden, welches Retreat welches ist." },
      { title: "Termine und Preise vorne", text: "Echte Termine, Verfügbarkeit und Preise pro Person auf jeder Retreat-Seite." },
      { title: "Hilfe bei der Auswahl", text: "Eine Monatsauswahl und eine kurze Frage, wonach Gäste gerade suchen." },
      { title: "Ein Buchungsweg, dem man folgen kann", text: "Retreat, Termin und Zimmer an einem Ort, mit einer Übersicht, die sich mit aktualisiert." },
    ],
    teamNote: "Technische Umsetzung: der Entwickler von Vietnam Detox. Strategie, Marke, Design und Koordination: Well Edge Creative.",
    closeTitle: "Ihr veranstaltet Retreats, und die Website zeigt das noch nicht?",
    closeText: "Ich schaue gerne drauf und sage ehrlich, was ich ändern würde.",
    closeCta: "30-Minuten-Call buchen",
    closeVisit: "Live-Seite ansehen",
  },
};
