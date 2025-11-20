import { redirect } from "next/navigation";
import { i18nConfig } from "@/i18n/config";

export default function IndexRedirect() {
  redirect(`/${i18nConfig.defaultLocale}`);
}
