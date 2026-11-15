import { STARTED_FIELD, TRAP_FIELD } from "@/lib/contact-guard";

export type ContactResult = { message?: string; code?: string; confirmationSent?: boolean } | null;

/**
 * Sends an enquiry to /api/contact with the two hidden protection fields (src/lib/contact-guard.ts).
 * `startedAt` is when the form was shown, in milliseconds.
 */
export async function postContact(data: FormData, startedAt: number) {
  data.set(STARTED_FIELD, String(startedAt));
  if (!data.has(TRAP_FIELD)) data.set(TRAP_FIELD, "");
  const response = await fetch("/api/contact", { method: "POST", body: data, signal: AbortSignal.timeout(65000) });
  const result = (await response.json().catch(() => null)) as ContactResult;
  return { response, result, ok: response.ok && result?.message === "OK" };
}
