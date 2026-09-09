export const RECAPTCHA_SITE_KEY = "6LfO5_wrAAAAABZZztKHdyxOpMYuJjayfy08yw_t";
const SCRIPT_ID = "pub-inquiry-recaptcha";
let pending: Promise<void> | undefined;

export class CaptchaUnavailable extends Error {
  constructor(readonly stage: "load" | "token" = "load") { super("Captcha unavailable"); }
}

export function loadInquiryCaptcha(): Promise<void> {
  if (pending) return pending;
  pending = new Promise<void>((resolve, reject) => {
    let finished = false;
    let readyRequested = false;
    let script: HTMLScriptElement | null = null;
    const finish = (error?: Error) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      clearInterval(poll);
      script?.removeEventListener("error", failed);
      if (error) {
        // Only remove the script owned by this form, never another page's script.
        if (script?.id === SCRIPT_ID) script.remove();
        reject(error);
      } else resolve();
    };
    const failed = () => finish(new CaptchaUnavailable());
    const check = () => {
      const captcha = window.grecaptcha?.enterprise;
      if (!captcha || readyRequested) return;
      readyRequested = true;
      try { captcha.ready(() => finish()); } catch { failed(); }
    };
    const timeout = setTimeout(failed, 12000);
    const poll = setInterval(check, 100);
    script = document.querySelector<HTMLScriptElement>('script[src*="/recaptcha/enterprise.js"]');
    if (!script && !window.grecaptcha?.enterprise) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.addEventListener("error", failed, { once: true });
      document.head.appendChild(script);
    } else script?.addEventListener("error", failed, { once: true });
    check();
  }).catch(error => {
    pending = undefined;
    throw error;
  });
  return pending;
}

export async function getInquiryCaptchaToken(): Promise<string> {
  await loadInquiryCaptcha();
  return new Promise<string>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new CaptchaUnavailable("token")), 15000);
    const failed = () => { clearTimeout(timeout); reject(new CaptchaUnavailable("token")); };
    try {
      const captcha = window.grecaptcha?.enterprise;
      if (!captcha) { failed(); return; }
      captcha.execute(RECAPTCHA_SITE_KEY, { action: "submit" }).then(token => {
        clearTimeout(timeout);
        if (token) resolve(token); else failed();
      }, failed);
    } catch { failed(); }
  });
}

// Retry only a confirmed browser verification failure, before any email is sent.
// Never retry an ambiguous network failure or a mail delivery response.
export async function postPubInquiry(data: FormData) {
  for (let attempt = 0; attempt < 2; attempt++) {
    data.set("g-recaptcha-response", await getInquiryCaptchaToken());
    const response = await fetch("/api/contact", {
      method: "POST", body: data, signal: AbortSignal.timeout(65000),
    });
    const result = await response.json().catch(() => null);
    if (attempt === 0 && response.status === 400 && result?.code === "CAPTCHA_BROWSER_ERROR") {
      await new Promise(resolve => setTimeout(resolve, 800));
      continue;
    }
    return { response, result };
  }
  throw new CaptchaUnavailable("token");
}
