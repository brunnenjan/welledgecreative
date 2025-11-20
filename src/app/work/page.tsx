import { redirect } from "next/navigation";
import { i18nConfig } from "@/i18n/config";

export default function WorkRedirect() {
  redirect(`/${i18nConfig.defaultLocale}/work`);
}
