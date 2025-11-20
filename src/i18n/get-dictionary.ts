"use server";

import type { Locale } from "./config";

const dictionaries = {
  en: () => import("../../locales/en/common.json").then((module) => module.default),
  de: () => import("../../locales/de/common.json").then((module) => module.default),
} as const;

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export const getDictionary = async (locale: Locale) => {
  const loadDictionary = dictionaries[locale];
  return loadDictionary();
};
