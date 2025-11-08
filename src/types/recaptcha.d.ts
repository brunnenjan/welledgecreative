// reCAPTCHA type definitions

interface ReCaptchaEnterprise {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

interface ReCaptchaV3 {
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
  ready: (cb: () => void) => void;
}

declare global {
  interface Window {
    grecaptcha?: ReCaptchaV3 & {
      enterprise?: ReCaptchaEnterprise;
    };
  }
}

export {};
