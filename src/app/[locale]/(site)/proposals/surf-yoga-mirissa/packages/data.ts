/**
 * Surf & Yoga Mirissa packages, exactly as listed on surfnyogasrilanka.com/packages (checked
 * 17 November 2026): four packages, six stay lengths, four room types, prices in EUR per person
 * including taxes. Nothing here is invented; the mockup only shows it differently.
 */

export const NIGHTS = [3, 5, 7, 10, 12, 14] as const;

export const ROOMS = [
  { key: "twin", name: "Shared twin or double room", short: "Twin / double", who: "Shared by two" },
  { key: "single", name: "Single private room", short: "Single", who: "Your own room" },
  { key: "triple", name: "Private triple room", short: "Triple", who: "Shared by three" },
  { key: "female", name: "Female room", short: "Female room", who: "Shared with other women" },
] as const;

export type PackageKey = "balance" | "yogi" | "surf" | "yoga";

export const PACKAGES: {
  key: PackageKey;
  name: string;
  line: string;
  surf: number; // share of surfing on the surf/yoga bar, 0 to 100
  yoga: (string | number)[];
  lessons: number[];
  prices: number[][]; // [nights index][room index]
}[] = [
  {
    key: "balance",
    name: "Balance",
    line: "For those who want it all: one surf lesson and one yoga class per day.",
    surf: 50,
    yoga: [2, 4, 6, 8, 10, 12],
    lessons: [2, 4, 6, 8, 10, 12],
    prices: [
      [281, 388, 246, 222],
      [527, 706, 468, 428],
      [750, 999, 666, 611],
      [1055, 1411, 936, 857],
      [1277, 1704, 1134, 1040],
      [1523, 2022, 1356, 1246],
    ],
  },
  {
    key: "yogi",
    name: "Yogi",
    line: "More yoga than surfing: the unlimited yoga pass, and a few waves.",
    surf: 25,
    yoga: ["Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
    lessons: [1, 2, 3, 4, 5, 6],
    prices: [
      [266, 372, 230, 206],
      [496, 674, 437, 397],
      [703, 952, 619, 564],
      [992, 1349, 874, 794],
      [1199, 1626, 1056, 961],
      [1429, 1928, 1263, 1152],
    ],
  },
  {
    key: "surf",
    name: "Surf Only",
    line: "For those who just want to surf: two lessons a day, plus the unlimited yoga pass.",
    surf: 85,
    yoga: ["Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
    lessons: [4, 8, 12, 18, 22, 26],
    prices: [
      [336, 444, 299, 277],
      [638, 816, 578, 539],
      [915, 1164, 832, 777],
      [1355, 1711, 1236, 1159],
      [1632, 2060, 1489, 1394],
      [1933, 2432, 1767, 1656],
    ],
  },
  {
    key: "yoga",
    name: "Yoga Only",
    line: "As much yoga as possible, with unlimited access to the class schedule.",
    surf: 0,
    yoga: ["Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
    lessons: [0, 0, 0, 0, 0, 0],
    prices: [
      [250, 357, 215, 190],
      [441, 619, 382, 342],
      [608, 857, 525, 469],
      [882, 1239, 763, 684],
      [1049, 1476, 906, 811],
      [1240, 1740, 1073, 962],
    ],
  },
];

/** Massages are the same in every package: none for 3 nights, then one, one, two, two, three. */
export const MASSAGES = [0, 1, 1, 2, 2, 3];

export function inclusions(pkg: (typeof PACKAGES)[number], n: number) {
  const nights = NIGHTS[n];
  const list = [`${nights} nights in the camp`];
  const yoga = pkg.yoga[n];
  list.push(yoga === "Unlimited" ? "Unlimited daily yoga classes" : `${yoga} yoga classes`);
  if (pkg.lessons[n] > 0) list.push(`${pkg.lessons[n]} semi-private surf lessons`);
  if (pkg.lessons[n] > 0) list.push(n === 0 && pkg.key === "yogi" ? "Surf theory" : "Video analysis and surf theory");
  if (pkg.lessons[n] > 0) list.push("Surf equipment and board insurance");
  if (MASSAGES[n] > 0) list.push(MASSAGES[n] === 1 ? "1 massage" : `${MASSAGES[n]} massages`);
  list.push("Breakfast, brunch and dinner every day");
  return list;
}
