/**
 * Sends an event to Google Analytics. It only does something once the visitor has accepted
 * analytics in the cookie banner, because gtag is not loaded before that.
 */
type Params = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", event, { page_path: window.location.pathname, ...params });
}
