"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/components/providers/I18nProvider";
import { i18nConfig, type Locale } from "@/i18n/config";

const FLAG_BY_LOCALE: Record<Locale, string> = {
  en: "🇬🇧",
  de: "🇩🇪",
};

const storageKey = "preferred-locale";

const buildLocalizedPath = (pathname: string | null, nextLocale: Locale) => {
  if (!pathname || pathname === "/") {
    return `/${nextLocale}`;
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  const maybeLocale = segments[0] as Locale;
  if (i18nConfig.locales.includes(maybeLocale)) {
    const remaining = segments.slice(1).join("/");
    return remaining ? `/${nextLocale}/${remaining}` : `/${nextLocale}`;
  }

  const remaining = segments.join("/");
  return `/${nextLocale}/${remaining}`;
};

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const updateLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;
      const destination = buildLocalizedPath(pathname, nextLocale);

      try {
        localStorage.setItem(storageKey, nextLocale);
      } catch {
        // ignore storage errors
      }
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
      router.push(destination);
    },
    [locale, pathname, router]
  );

  return (
    <div
      className={`language-switcher inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-2 py-1 text-xs font-semibold uppercase text-white backdrop-blur-sm ${className ?? ""}`}
      role="group"
      aria-label={t("languageSwitcher.label")}
    >
      {i18nConfig.locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => updateLocale(code as Locale)}
          className={`flex items-center gap-1 rounded-full px-2 py-1 transition ${
            locale === code ? "bg-white text-black" : "text-white/80 hover:text-white"
          }`}
          aria-pressed={locale === code}
        >
          <span aria-hidden>{FLAG_BY_LOCALE[code as Locale]}</span>
          <span className="sr-only">
            {code === "en" ? t("languageSwitcher.english") : t("languageSwitcher.german")}
          </span>
        </button>
      ))}
    </div>
  );
}
