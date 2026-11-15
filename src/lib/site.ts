/** The one public address of Well Edge Creative. Every other domain redirects here (middleware.ts). */
export const SITE_HOST = "www.welledgecreative.com";
export const SITE_URL = `https://${SITE_HOST}`;

/** Pages in both languages, for canonical links, hreflang and the sitemap. */
export const SITE_PAGES = [
  "",
  "/about",
  "/approach",
  "/services",
  "/work",
  "/retreats",
  "/pub-websites",
  "/case-studies/brisa-bahia",
  "/contact",
  "/imprint",
  "/privacy",
] as const;

/** Canonical and language links for one page, e.g. pageAlternates("de", "/retreats"). */
export function pageAlternates(locale: string, path: string) {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      en: `${SITE_URL}/en${path}`,
      de: `${SITE_URL}/de${path}`,
      "x-default": `${SITE_URL}/en${path}`,
    },
  };
}

type LocaleParams = { params: Promise<{ locale: string }> };

/** generateMetadata for a route layout: the page's own canonical and language links. */
export function alternatesFor(path: string) {
  return async ({ params }: LocaleParams) => {
    const { locale } = await params;
    return { alternates: pageAlternates(locale === "de" ? "de" : "en", path) };
  };
}
