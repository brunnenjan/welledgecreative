/**
 * Spam protection for the contact forms, checked on our own server. It replaces Google
 * reCAPTCHA, which failed whenever its allowed domains did not match the site's address, so no
 * outside service can stop a real enquiry any more.
 *
 * - A hidden field people never see. Bots fill it; such a submission is dropped quietly.
 * - A minimum time between opening the form and sending it. Bots send instantly.
 * - At most a few enquiries per sender address in a short window.
 */

/** Names of the two hidden fields every form sends (see src/lib/contact-client.ts). */
export const TRAP_FIELD = "company_url";
export const STARTED_FIELD = "form_started";

export const GUARD = {
  minSeconds: 2,
  maxAgeHours: 24,
  perWindow: 5,
  windowMinutes: 10,
} as const;

export type GuardResult = { ok: true } | { ok: false; code: "SPAM" | "TOO_FAST" | "RATE_LIMITED" };

export function checkSubmission(
  input: { trap: string; startedAt: string; sender: string; now: number },
  recent: Map<string, number[]>,
): GuardResult {
  if (input.trap.trim() !== "") return { ok: false, code: "SPAM" };

  const started = Number(input.startedAt);
  if (Number.isFinite(started) && started > 0) {
    const seconds = (input.now - started) / 1000;
    if (seconds < GUARD.minSeconds) return { ok: false, code: "TOO_FAST" };
    if (seconds > GUARD.maxAgeHours * 3600) return { ok: false, code: "TOO_FAST" };
  }

  const windowStart = input.now - GUARD.windowMinutes * 60_000;
  const times = (recent.get(input.sender) ?? []).filter((t) => t > windowStart);
  if (times.length >= GUARD.perWindow) return { ok: false, code: "RATE_LIMITED" };
  times.push(input.now);
  recent.set(input.sender, times);
  return { ok: true };
}
