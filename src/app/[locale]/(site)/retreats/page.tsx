import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import RetreatsContent from "./RetreatsContent";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = (isLocale(locale) ? locale : "en") as Locale;
  const dictionary = await getDictionary(resolvedLocale);
  const meta = dictionary.retreatsPage?.meta as { title?: string; description?: string } | undefined;

  return {
    title: meta?.title ?? "Branding & Web Design for Retreat Centers | Well Edge Creative",
    description:
      meta?.description ??
      "I help retreat centers, wellness destinations and retreat founders turn their experience into a brand and website people understand, trust and book.",
  };
}

export default function RetreatsPage() {
  return (
    <div className="page-fade">
      <RetreatsContent />
    </div>
  );
}
