/**
 * Facts for the homepage mockup, all from Brisa Bahía's own material: brisabahia.com
 * (checked 18 November 2026), the Brand Foundation, the Property and Seasons sheets, and Kary's
 * answers of 22 August 2026. The nightly rate stays out on purpose: Kary shares pricing only after
 * an inquiry.
 */

export const FACTS = [
  { label: "One group", value: "The whole property, every time" },
  { label: "Group size", value: "8 to 12 is the sweet spot, up to 24" },
  { label: "Arrival", value: "Plane, then boat. No road in" },
  { label: "Power", value: "100% solar, mountain spring water" },
];

export const WE_HOLD = [
  { title: "The place", items: ["The whole property, only for your group", "4 private rooms and 4 suites, all with ocean view"] },
  { title: "The food", items: ["Three meals a day from Nhung's kitchen", "Snacks, fruit, teas and Colombian coffee"] },
  { title: "The practice", items: ["Yoga shala and deck, with mats, blocks, straps and a speaker", "Spa area, cold plunge and pool"] },
  { title: "The journey", items: ["Pickup and a hotel night in Medellín", "Flight seats and the boat into the bay"] },
  { title: "A day out", items: ["One guided half-day excursion for your group"] },
  { title: "Your marketing", items: ["Your retreat page on our site", "Instagram collaborations, directory listings and our marketing guide"] },
];

export const YOU_HOLD = [
  "Your program, your teaching, your vision",
  "Filling your group, with our support",
  "Your retreat price, guest registration and payments",
  "Your guests' flights to Medellín",
];

export const QUESTIONS: { q: string; a: string; confirm?: boolean }[] = [
  {
    q: "Can I fill a retreat this far away?",
    a: "Every retreat gets a full page on our website, collaborative Instagram posts, listings on retreat directories and our retreat marketing guide. You stay responsible for filling the group; we give you the platform and the material. And if you would rather share the work, the Gather network connects you with a co-facilitator.",
  },
  {
    q: "How do my guests get here?",
    a: "Fly into Medellín, then a one-hour flight to Acandí or Capurganá, and a short boat ride into the bay. From most US cities that means one night in Medellín and arriving the next morning. We arrange everything after Medellín.",
  },
  {
    q: "What if a flight is delayed?",
    a: "There is more than one way in. Flights to Acandí run Monday to Friday, charter flights go to Capurganá, and boats leave Necoclí for Capurganá every morning. Your group spends the first night in Medellín, so the hop to the coast starts fresh the next day. If a flight moves, we look at the other routes together.",
    confirm: true,
  },
  {
    q: "Is it safe?",
    a: "Capurganá is considered one of the safest destinations on Colombia's Caribbean coast. Nobody arrives at the bay by accident, only one group is ever on the property, and we live here full time. If something goes sideways at eleven at night, we are the ones handling it.",
  },
  {
    q: "The forecast shows rain every day. Should we worry?",
    a: "It is warm all year, 24 to 30 °C, with the sea around 28 to 29 °C. December to April is drier; May to November brings bright mornings and the occasional afternoon rain. There is no month we would advise against. What changes is the character of the sea, the jungle and what's ripe.",
  },
  {
    q: "Is there air conditioning and hot water?",
    a: "No, and we would rather say it plainly. The bungalows have tall Dutch-gable ceilings, a ceiling fan over every bed and good natural airflow. The place is called Brisa Bahía because there is almost always a breeze.",
  },
  {
    q: "Are there costs my guests won't expect?",
    a: "Lodging, all meals and one guided excursion are part of the retreat. Guests bring cash for small trail entry fees, a boat taxi to Capurganá if they want to visit the village, and optional extras like snorkeling or diving. Boat transfers have a luggage weight limit, and extra kilos are charged. There are no ATMs in the area.",
    confirm: true,
  },
  {
    q: "Who will I be dealing with?",
    a: "With us, Kary and Nhung. Every email, every call and every change to your itinerary comes back from one of us. There is no sales desk in between.",
  },
];

export const WAY = [
  { k: "Day one", title: "Fly to Medellín", text: "An international flight you would book anyway. We arrange the pickup and a night in El Poblado or Laureles.", ours: "Airport transfer coordinated by us" },
  { k: "Next morning · 1 hour", title: "A short hop to the coast", text: "From Olaya Herrera, the in-city airport ten minutes from your hotel. Flights go to Acandí on weekdays, charter flights to Capurganá on Mondays and Fridays. We tell you which one fits your dates.", ours: "Seats held for your group" },
  { k: "The last minutes", title: "Arrive by sea", text: "From Acandí, twenty minutes by boat into the bay. From Capurganá, five to ten minutes. Either way, the last stretch is on the water.", ours: "We meet you at the dock" },
  { k: "The bay", title: "No road reaches us. That is the point.", text: "Nobody arrives here by accident. This is where the retreat begins.", ours: null },
];

export const USPS = [
  { img: "yoga-deck", title: "One group, one sanctuary", text: "The whole property belongs to one retreat. No second group, no strangers at breakfast." },
  { img: "ig-coast-walk", title: "Roadless and wild", text: "Protected rainforest meets Caribbean reef. Howler monkeys, waterfalls, a trail that walks toward Panama." },
  { img: "fruit", title: "Nhung's kitchen", text: "Anti-inflammatory whole foods, grown organically and wild. Gluten-free, no refined seed oils." },
  { img: "bungalows", title: "Off-grid and regenerative", text: "One hundred percent solar, mountain spring water, and a beach where sea turtles nest." },
  { img: "founders", title: "Owners on site", text: "Kary and Nhung live here full time, from the dock to departure." },
];

export const NOT_PRETEND = [
  "There is no road in. The last leg is a boat.",
  "There is no air conditioning and no hot water. There is a ceiling fan over every bed and almost always a breeze.",
  "There are no ATMs in the area. Bring the cash you need.",
  "Seats on the Acandí flight are limited, so we book your group's early.",
  "Wildlife is seasonal and never promised.",
];

export const RETREATS = [
  { name: "Space to Breathe", dates: "Feb 21 to 28, 2027", href: "https://brisabahia.com/event/space-to-breathe/" },
  { name: "Nervous System Reset Immersion", dates: "Mar 22 to 26, 2027", href: "https://brisabahia.com/event/nervous-system-reset-immersion/" },
  { name: "SHINE: Expanding Joy in Colombia", dates: "Mar 27 to Apr 2, 2027", href: "https://brisabahia.com/event/shine-expanding-joy-in-colombia/" },
  { name: "Embodied Expansion", dates: "Nov 1 to 8, 2027", href: "https://brisabahia.com/event/embodied-expansion/" },
];

export const PROCESS = [
  { title: "Tell us about your retreat", text: "The fit check, a few lines about your work and your dates." },
  { title: "Talk with Kary", text: "A call about your vision. You get our hosting guide with pricing and details." },
  { title: "Visit, if you like", text: "A facilitator site visit, so you can walk the place before you commit." },
  { title: "Hold your dates", text: "A deposit holds the week. Your retreat page goes live on our site." },
];

export const SIZES = ["Under 6", "6 to 7", "8 to 12", "13 to 24"];
export const NIGHTS = ["3 to 4", "5 to 6", "7 or more"];
export const FILL = ["My own community", "Mailing list or social", "Still building it", "With a co-facilitator"];

export const MONTHS = [
  { m: "Jan", line: "Big north swell and the best surf of the year. Dry, clear skies." },
  { m: "Feb", line: "Peak surf season and the driest month. Carnival in Capurganá late in the month." },
  { m: "Mar", line: "A bridge month: the swell eases, the first rains return, the jungle wakes up." },
  { m: "Apr", line: "The ocean calms and warms. Snorkeling and diving season opens." },
  { m: "May", line: "Loggerhead turtles start nesting on our beach. Mango season begins." },
  { m: "Jun", line: "Mango peak and calm, clear water. Turtles nesting regularly." },
  { m: "Jul", line: "The best diving of the year. Virgen del Carmen on July 16." },
  { m: "Aug", line: "Hatchlings may head to sea. The heaviest rains, waterfalls full." },
  { m: "Sep", line: "Lush and quiet. Diving still very good." },
  { m: "Oct", line: "Festival de la Cigua in Capurganá. The last great month for diving." },
  { m: "Nov", line: "The north swell returns. Calm-water windows still possible." },
  { m: "Dec", line: "Surf energy returns, with Afro-Colombian drumming and celebrations." },
];

export const REVIEWS = [
  { name: "Georgia Austin", text: "Never have I felt so connected to nature and the rhythm of the natural world as I did here." },
  { name: "Martine Neang", text: "During our 5-week stay, we never got tired of waking up to the sound of ocean waves." },
  { name: "Przemyslaw Arczewski", text: "You can fully disconnect, relax in very comfortable conditions, and enjoy the calming sound of the sea." },
];

// From the Seasons sheet and the live Experiences page (month indexes, January = 0).
export const INTENTS: { name: string; img: string; caption: string; todo?: string; best: string; months: number[]; text: string }[] = [
  { name: "Surf and movement", img: "season-surf", caption: "The north swell on the rocks of the bay", best: "January to March", months: [0, 1, 2], text: "Strong trade winds and a north swell that hits the beach directly. Dry, windy and alive." },
  { name: "Calm sea and reef", img: "season-reef", caption: "Snorkeling over the reef in front of the bay", best: "June to September", months: [5, 6, 7, 8], text: "The swell fades, the water clears and the reef opens up. Turtles and dolphins show up underwater too." },
  { name: "Sea turtles", img: "season-turtles-duo", caption: "Hatchlings on our beach, and a green turtle on the reef", best: "May to September", months: [4, 5, 6, 7, 8], text: "Loggerhead turtles nest on our beach from May. From August, hatchlings may make their way to the sea. Seasonal, never promised." },
  { name: "Jungle and fruit", img: "season-coconuts", caption: "Coconuts on the palms at Brisa", best: "April to September", months: [3, 4, 5, 6, 7, 8], text: "Rain feeds the jungle and everything grows fast. Mango, avocado, guanábana, zapote and mabolo each have their moment." },
  { name: "Deep rest", img: "season-rest", caption: "Palms and the shala by the sea", best: "Any month", months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], text: "No cars, no roads, one group at a time. The stillness does not change with the season." },
  { name: "Local culture", img: "season-culture", caption: "The painted town sign on Capurganá's waterfront", best: "October and July 16", months: [6, 9], text: "Festival de la Cigua in October: four days of food, music and dancing. On July 16, Virgen del Carmen, the boats are blessed at sea." },
];

export const ROOMS = [
  { img: "veranda", name: "Eco-Bungalow Rooms", who: "4 private rooms · up to 2 guests each", text: "Raised on stilts to catch the breeze, each with its own balcony, hammock and ocean view." },
  { img: "suite", name: "Eco-Bungalow Suites", who: "4 suites · up to 4 guests each", text: "Two beds under a tall open-beam ceiling, with a veranda onto the garden and the sea." },
];

export const ROOM_FACTS = ["Ocean view, balcony and hammock", "Private bath with a river-stone shower", "Bamboo sheets and organic linens", "A ceiling fan over every bed", "Filtered mountain spring water", "Wi-Fi"];

export const INCLUDED = [
  { name: "Playa Amarilla", text: "A hike to a secluded beach" },
  { name: "El Cielo", text: "Through the jungle to a waterfall and its rock pool" },
  { name: "La Coquerita", text: "Natural pools by the sea" },
  { name: "Sapzurro and La Miel", text: "Across the border into Panama, on foot" },
];

export const ADD_ONS = ["Snorkeling on the reef", "Scuba diving and freediving", "Surfing", "A cooking class with Nhung", "Sunset bonfire on the beach", "Fishing", "Coconut craft workshop", "Fruit walk with Manuel"];

export const KITCHEN = ["Gluten-free, with no refined seed oils, processed sugars or additives", "Pescatarian, vegetarian and vegan as standard, never as a favor", "Three meals a day, plus fruit, herbal teas and Colombian coffee", "Six kinds of banana, papaya, coconut, starfruit, limes and yuca all year"];

// Posts from @brisa.bahia (covers and frames saved 18 November 2026); each tile opens the post.
export const INSTAGRAM = [
  { img: "ig-not-bali", href: "https://www.instagram.com/brisa.bahia/reel/DehWghajyD3/", alt: "Reel: the bay from above, titled This is not Bali" },
  { img: "ig-owl", href: "https://www.instagram.com/brisa.bahia/p/Df2XmYoIL7T/", alt: "Post: meet Brisa, the owl that lives at the retreat center" },
  { img: "ig-bungalows", href: "https://www.instagram.com/brisa.bahia/reel/DfC055HlGwE/", alt: "Reel: Kary shows the bungalows" },
  { img: "ig-nhung", href: "https://www.instagram.com/brisa.bahia/reel/DeMy5ecCBAC/", alt: "Reel: Nhung at the table" },
  { img: "ig-coast-walk", href: "https://www.instagram.com/brisa.bahia/reel/DUMTPKWko8J/", alt: "Reel: walking the coast trail under the palms" },
  { img: "ig-shala", href: "https://www.instagram.com/brisa.bahia/reel/DfXYlzcEQ6X/", alt: "Reel: the shala by the sea" },
  { img: "ig-hatchlings", href: "https://www.instagram.com/reel/DWgnnKokkZg/", alt: "Reel: turtle hatchlings on the beach, on their way to the sea" },
  { img: "ig-green-turtle", href: "https://www.instagram.com/brisa.bahia/reel/C_JuPC0soH2/", alt: "Reel: a green sea turtle on the reef" },
];
