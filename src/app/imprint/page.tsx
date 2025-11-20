import { redirect } from "next/navigation";
import { i18nConfig } from "@/i18n/config";

export default function ImprintRedirect() {
  redirect(`/${i18nConfig.defaultLocale}/imprint`);
}
