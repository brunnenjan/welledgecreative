export const i18nConfig = {
  defaultLocale: "en",
  locales: ["en", "de"],
} as const;

export type Locale = (typeof i18nConfig)["locales"][number];

export const isLocale = (value: string): value is Locale =>
  i18nConfig.locales.includes(value as Locale);
