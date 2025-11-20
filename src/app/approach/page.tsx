import { redirect } from "next/navigation";
import { i18nConfig } from "@/i18n/config";

export default function ApproachRedirect() {
  redirect(`/${i18nConfig.defaultLocale}/approach`);
}
