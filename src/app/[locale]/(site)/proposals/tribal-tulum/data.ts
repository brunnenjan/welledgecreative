// Every word, price and photo is taken from tribaltulum.com or its payment links (read on 26 Nov 2026).
// Peso and dollar equivalents are rounded at 19.64 MXN per USD (open.er-api.com, 26 Nov 2026).
const CDN = "https://images.squarespace-cdn.com/content/v1/586eacaddb29d6faf61a8a1e";
const img = (path: string, w = 1500) => `${CDN}/${path}?format=${w}w`;
export const PHOTO = {
  sand: img("1681579924139-WGGHWE8Q5ZJWAYUCYDIZ/JOblue.jpg"),
  entrance: img("1678730483904-7CRBRLT9LID8NJ1Y7YR3/Carito+Photography-Mexico+Photographer-Tribal+Tulum-HQ-188.jpg"),
  studio: img("a19aac70-1833-4316-93f7-ba8340e27f27/studio2.png"),
  downdog: img("53e21517-8723-4bb5-80d8-674bfbce27c7/2021.Mariana.JoanneDownfdog+%282%29.jpg", 1000),
  stairs: img("4f52369d-45eb-4682-babb-e34fb00602cc/2021.Azul.HallwayStairs.jpg", 1000),
  mural: img("1678644652197-0FNU2OJ3XSVMTMV2T66O/DSC_6107.jpg", 1000),
  group: img("2bb4decb-4241-4135-a371-f8f35438973e/Mariana+teaching+lunge+copy.jpg", 1000),
};

export const retreats = [
  {
    name: "Personal Yoga Retreat",
    length: "Your dates",
    best: "Build your days around yoga, over dates that work for you.",
    includes: ["Lodging and amenities", "Daily yoga practice", "Mayan purification ceremony"],
    usd: "from $1449",
    mxn: "approx. 28,500 MXN",
    photo: PHOTO.downdog,
    alt: "Downward dog in the Tribal Tulum studio",
  },
  {
    name: "Renew and Reconnect",
    length: "6 days, 5 nights",
    best: "Perfect for larger groups that want the intimate retreat experience.",
    includes: ["Private room at Samsara", "Daily yoga and meditation", "Cenote excursion"],
    usd: "$2399",
    mxn: "approx. 47,100 MXN",
    photo: PHOTO.group,
    alt: "A class in the Tribal Tulum studio",
  },
  {
    name: "21 Days in Tulum",
    length: "21 days, 20 nights",
    best: "For a longer, more relaxed pace. Create the habit of practice.",
    includes: ["Central loft style apartment", "Daily yoga and meditation", "Bike for exploring Tulum"],
    usd: "from $1900",
    mxn: "approx. 37,300 MXN",
    photo: PHOTO.stairs,
    alt: "Stairway with dreamcatchers at Tribal Tulum",
  },
  {
    name: "Dive and Yoga",
    length: "6 days, 5 nights",
    best: "Connect to your breath through yoga and diving in Tulum’s cenotes.",
    includes: ["3 days of cenote diving", "Daily yoga, 4 pre-dive meditations", "Lodging"],
    usd: "from $1689",
    mxn: "approx. 33,200 MXN",
    photo: PHOTO.mural,
    alt: "Mural of a diver in meditation at Tribal Tulum",
  },
];

export const passes = [
  { name: "Drop in", what: "One studio class", main: "$19", sub: "approx. 370 MXN" },
  { name: "3 class pass", what: "Three studio classes", main: "$49", sub: "approx. 960 MXN" },
  { name: "10 class pass", what: "Ten studio classes", main: "$119", sub: "approx. 2,340 MXN" },
  { name: "All month", what: "3 classes a week", main: "1800 MXN", sub: "approx. $92" },
  { name: "Private session", what: "For up to 4 people", main: "$109", sub: "approx. 2,140 MXN" },
];
