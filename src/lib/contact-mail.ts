import { SITE_URL } from "@/lib/site";

/**
 * The two mails of the contact forms, in the site's look: the enquiry for Jan and the
 * confirmation for the sender (German or English). Table layout and inline styles, so they
 * render the same in Gmail, Apple Mail and Outlook. Every visitor value is escaped.
 */

const CALENDLY = "https://calendly.com/well-edge-creative/30min";
const LOGO = `${SITE_URL}/assets/logo/email-logo.png`;
const ACCENT = "#f58222";
const INK = "#1a1a1a";
const SOFT = "#5c5852";

export interface Enquiry {
  name: string;
  email: string;
  topic: string;
  budget: string;
  message: string;
  pubName?: string;
  website?: string;
  isPub: boolean;
  german: boolean;
}

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const html = (value: string) => escapeHtml(value).replace(/\n/g, "<br>");

function layout(lang: string, preheader: string, body: string, footer: string) {
  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Well Edge Creative</title></head>
<body style="margin:0;padding:0;background:#f4efe8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe8"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden">
<tr><td bgcolor="${INK}" style="background:${INK};padding:26px 32px"><a href="${SITE_URL}" style="text-decoration:none"><img src="${LOGO}" width="150" height="73" alt="Well Edge Creative" style="display:block;border:0;width:150px;height:auto"></a></td></tr>
<tr><td style="height:4px;background:${ACCENT};font-size:0;line-height:0">&nbsp;</td></tr>
<tr><td style="padding:36px 32px 12px">${body}</td></tr>
<tr><td style="padding:8px 32px 32px">${footer}</td></tr>
</table>
<p style="margin:20px 0 0;font-size:12px;line-height:1.6;color:#8b8780">Well Edge Creative · Branding &amp; Web Design · <a href="${SITE_URL}" style="color:#8b8780">welledgecreative.com</a></p>
</td></tr></table></body></html>`;
}

const button = (href: string, label: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px"><tr><td bgcolor="${ACCENT}" style="border-radius:999px;background:${ACCENT}"><a href="${href}" style="display:inline-block;padding:14px 26px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px">${label}</a></td></tr></table>`;

const signature = (german: boolean) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="border-top:1px solid #ece6dc;padding-top:20px;width:100%"><tr><td style="padding-top:20px;font-size:14px;line-height:1.6;color:${SOFT}">
<strong style="color:${INK};font-size:15px">Jan Brunnenkant</strong><br>${german ? "Branding &amp; Webdesign" : "Branding &amp; Web Design"} · Well Edge Creative<br>
<a href="mailto:jan@welledgecreative.com" style="color:${INK}">jan@welledgecreative.com</a> · <a href="${SITE_URL}" style="color:${INK}">welledgecreative.com</a></td></tr></table>`;

function details(rows: [string, string][]) {
  const filled = rows.filter(([, v]) => v.trim());
  if (!filled.length) return "";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px">${filled
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 0;width:130px;vertical-align:top;font-size:13px;color:#8b8780">${escapeHtml(k)}</td><td style="padding:8px 0;font-size:15px;color:${INK};overflow-wrap:anywhere">${html(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

const messageBox = (label: string, message: string) =>
  `<p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#a94a00">${escapeHtml(label)}</p>
<div style="margin:0 0 28px;padding:18px 20px;background:#faf6f1;border-left:3px solid ${ACCENT};border-radius:0 12px 12px 0;font-size:15px;line-height:1.65;color:${INK};overflow-wrap:anywhere">${html(message)}</div>`;

/** The confirmation for the sender. */
export function confirmationMail(e: Enquiry) {
  const de = e.german;
  const subject = e.isPub
    ? de ? "Deine Anfrage zur Irish Pub Website" : "Your Irish Pub website enquiry"
    : de ? "Danke für deine Nachricht" : "Thank you for your message";
  const first = e.name.trim().split(/\s+/)[0] || e.name;
  const hello = de ? `Hallo ${first},` : `Hi ${first},`;
  const intro = e.isPub
    ? de
      ? "vielen Dank für deine Anfrage zur Irish Pub Website. Deine Nachricht ist bei mir angekommen, und ich melde mich persönlich bei dir."
      : "thank you for your Irish Pub website enquiry. Your message has arrived, and I will get back to you personally."
    : de
      ? "danke, dass du dich meldest. Deine Nachricht ist angekommen, und ich melde mich persönlich bei dir, meist innerhalb von 24 Stunden."
      : "thank you for reaching out. Your message has arrived, and I will get back to you personally, usually within 24 hours.";
  const callTitle = de ? "Lieber gleich sprechen?" : "Rather talk right away?";
  const callText = de
    ? "Buch dir einen kostenlosen Discovery Call von 30 Minuten zu einer Zeit, die dir passt."
    : "Book a free 30-minute discovery call at a time that suits you.";
  const rows: [string, string][] = [
    [e.isPub ? "Pub" : de ? "Thema" : "Topic", e.isPub ? e.pubName ?? "" : e.topic],
    [de ? "Budget" : "Budget", e.budget],
    ["Website", e.website ?? ""],
  ];
  const body = `<h1 style="margin:0 0 18px;font-size:26px;line-height:1.25;font-weight:700;letter-spacing:-0.5px;color:${INK}">${escapeHtml(subject)}</h1>
<p style="margin:0 0 14px;font-size:16px;line-height:1.65;color:${INK}">${escapeHtml(hello)}</p>
<p style="margin:0 0 26px;font-size:16px;line-height:1.65;color:${SOFT}">${escapeHtml(intro)}</p>
${details(rows)}${messageBox(de ? "Deine Nachricht" : "Your message", e.message)}
<p style="margin:0 0 6px;font-size:17px;font-weight:700;color:${INK}">${escapeHtml(callTitle)}</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${SOFT}">${escapeHtml(callText)}</p>
${button(CALENDLY, de ? "Discovery Call buchen" : "Book a discovery call")}
<p style="margin:26px 0 0;font-size:16px;line-height:1.65;color:${INK}">${de ? "Bis bald und viele Grüße" : "Talk soon and best regards"}</p>`;
  const text = [
    hello,
    intro,
    ...rows.filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v}`),
    `${de ? "Deine Nachricht" : "Your message"}:\n${e.message}`,
    `${callTitle} ${callText}\n${CALENDLY}`,
    `${de ? "Viele Grüße" : "Best regards"}\nJan Brunnenkant\nWell Edge Creative\njan@welledgecreative.com\n${SITE_URL}`,
  ].join("\n\n");
  return {
    subject,
    text,
    html: layout(de ? "de" : "en", intro, body, signature(de)),
  };
}

/** The enquiry for Jan, with everything at a glance and one-click reply. */
export function enquiryMail(e: Enquiry) {
  const subject = e.isPub ? `Irish Pub Website: neue Anfrage von ${e.name}` : `Neue Anfrage von ${e.name}`;
  const rows: [string, string][] = [
    ["Name", e.name],
    ["E-Mail", e.email],
    [e.isPub ? "Pub" : "Thema", e.isPub ? e.pubName ?? "" : e.topic],
    ["Budget", e.budget],
    ["Website", e.website ?? ""],
    ["Sprache", e.german ? "Deutsch" : "Englisch"],
  ];
  const reply = `mailto:${encodeURIComponent(e.email)}?subject=${encodeURIComponent(`Re: ${e.isPub ? "Irish Pub Website" : "Deine Anfrage"}`)}`;
  const body = `<p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#a94a00">${e.isPub ? "Irish Pub Website" : "Kontaktformular"}</p>
<h1 style="margin:0 0 22px;font-size:26px;line-height:1.25;font-weight:700;letter-spacing:-0.5px;color:${INK}">Neue Anfrage von ${escapeHtml(e.name)}</h1>
${details(rows)}${messageBox("Nachricht", e.message)}
${button(reply, `${escapeHtml(e.name.split(" ")[0] || e.name)} antworten`)}`;
  const text = [
    `Neue Anfrage über ${e.isPub ? "das Irish-Pub-Formular" : "das Kontaktformular"}`,
    ...rows.filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v}`),
    `Nachricht:\n${e.message}`,
  ].join("\n\n");
  return {
    subject,
    text,
    html: layout("de", `${e.name}: ${e.message.slice(0, 90)}`, body, `<p style="margin:0;font-size:12px;color:#8b8780">Gesendet über welledgecreative.com</p>`),
  };
}
