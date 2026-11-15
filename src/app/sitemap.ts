import type { MetadataRoute } from "next";
import { SITE_PAGES, SITE_URL } from "@/lib/site";

// Every public page in English and German, on welledgecreative.com. Proposals are not listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PAGES.flatMap((path) =>
    (["en", "de"] as const).map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: { en: `${SITE_URL}/en${path}`, de: `${SITE_URL}/de${path}` },
      },
    })),
  );
}
