import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { getDictionary } from "@/i18n/get-dictionary";
import { i18nConfig, isLocale, type Locale } from "@/i18n/config";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);

  return <I18nProvider locale={locale as Locale} dictionary={dictionary}>{children}</I18nProvider>;
}
