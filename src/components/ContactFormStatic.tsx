"use client";

import Script from "next/script";

const FALLBACK_SITE_KEY = "6LfO5_wrAAAAABZZztKHdyxOpMYuJjayfy08yw_t";

export default function ContactFormStatic() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? FALLBACK_SITE_KEY;

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" />
      <div id="contact-form-wrapper" className="contact-form-container" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <form id="contact-form" action="./contact.php" method="POST" className="contact-form" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response" />
          <button type="submit" className="btn">Send</button>
          <p id="form-status" style={{ marginTop: "10px" }} />
        </form>
      </div>
      <Script id="contact-form-handler" strategy="afterInteractive">
        {`
          document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('contact-form');
            const status = document.getElementById('form-status');

            if (!form || !status || !window.grecaptcha) return;

            form.addEventListener('submit', function(e) {
              e.preventDefault();
              status.textContent = 'Verifying...';

              window.grecaptcha.ready(() => {
                window.grecaptcha.execute('${siteKey}', { action: 'submit' }).then(token => {
                  const tokenField = document.getElementById('g-recaptcha-response');
                  if (tokenField) {
                    tokenField.value = token;
                  }

                  fetch(form.action, { method: 'POST', body: new FormData(form) })
                    .then(res => res.text())
                    .then(txt => {
                      if (txt.includes('OK')) {
                        status.textContent = '✅ Message sent successfully!';
                        form.reset();
                      } else {
                        status.textContent = '⚠️ ' + txt;
                      }
                    })
                    .catch(err => {
                      console.error(err);
                      status.textContent = '⚠️ Sending failed – please try again.';
                    });
                });
              });
            });
          });
        `}
      </Script>
    </>
  );
}
