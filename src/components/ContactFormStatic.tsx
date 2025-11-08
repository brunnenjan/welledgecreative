"use client";

import Script from "next/script";

export default function ContactFormStatic() {
  return (
    <>
      <div id="contact-form-wrapper" className="contact-form-container" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <form id="contact-form" className="contact-form" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit" className="btn">Send</button>
          <p id="form-status" style={{ marginTop: "10px" }} />
        </form>
      </div>
      <Script id="contact-form-handler" strategy="afterInteractive">
        {`
          document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('contact-form');
            const status = document.getElementById('form-status');

            if (!form || !status) return;

            form.addEventListener('submit', function(e) {
              e.preventDefault();
              status.textContent = 'Sending...';
              status.style.color = '#fff';

              const formData = new FormData(form);

              fetch('https://well-edge-creative.com/contact.php', {
                method: 'POST',
                body: formData
              })
                .then(res => res.text())
                .then(txt => {
                  console.log('Response:', txt);
                  if (txt.includes('OK')) {
                    status.textContent = '✅ Message sent successfully!';
                    status.style.color = '#4ade80';
                    form.reset();
                  } else {
                    status.textContent = '⚠️ ' + txt;
                    status.style.color = '#fbbf24';
                  }
                })
                .catch(err => {
                  console.error('Error:', err);
                  status.textContent = '⚠️ Sending failed – please try again.';
                  status.style.color = '#f87171';
                });
            });
          });
        `}
      </Script>
    </>
  );
}
