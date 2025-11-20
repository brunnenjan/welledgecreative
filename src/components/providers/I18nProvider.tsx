"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type Messages = Record<string, unknown>;

const I18nContext = createContext<{
  locale: Locale;
  t: (key: string) => string;
  getValue: <T = unknown>(key: string) => T | undefined;
} | null>(null);

const resolveKey = (messages: Messages, key: string) => {
  const segments = key.split(".");
  let current: unknown = messages;

  for (const segment of segments) {
    if (typeof current !== "object" || current === null) {
      return key;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  return current;
};

type ProviderProps = {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
};

export function I18nProvider({ children, dictionary, locale }: ProviderProps) {
  const [messages, setMessages] = useState<Messages>(dictionary);
  const [activeLocale, setActiveLocale] = useState<Locale>(locale);

  useEffect(() => {
    setMessages(dictionary);
    setActiveLocale(locale);
  }, [dictionary, locale]);

  const value = useMemo(() => {
    const resolver = (key: string) => resolveKey(messages, key);
    return {
      locale: activeLocale,
      t: (key: string) => {
        const resolved = resolver(key);
        return typeof resolved === "string" ? resolved : key;
      },
      getValue: <T,>(key: string) => resolver(key) as T | undefined,
    };
  }, [activeLocale, messages]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
};
