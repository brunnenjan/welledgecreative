"use client";

import { useState, FormEvent, useEffect } from "react";
import Script from "next/script";
import { useI18n } from "@/components/providers/I18nProvider";

const PROJECT_TYPE_KEYS = [
  "contactForm.projectTypes.branding",
  "contactForm.projectTypes.websiteDesign",
  "contactForm.projectTypes.websiteDev",
  "contactForm.projectTypes.fullPackage",
  "contactForm.projectTypes.strategy",
  "contactForm.projectTypes.other",
] as const;

const RECAPTCHA_SITE_KEY = "6LfO5_wrAAAAABZZztKHdyxOpMYuJjayfy08yw_t";

export default function ContactFormStatic() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: [] as string[],
    budget: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadRecaptcha, setLoadRecaptcha] = useState(false);

  // Lazy load reCAPTCHA when contact section is visible
  useEffect(() => {
    const contactEl = document.getElementById("contact-section");
    if (!contactEl) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoadRecaptcha(true);
        observer.disconnect();
      }
    });

    observer.observe(contactEl);

    return () => observer.disconnect();
  }, []);

  const handleProjectTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      projectType: prev.projectType.includes(type)
        ? prev.projectType.filter(t => t !== type)
        : [...prev.projectType, type]
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus(t("contactForm.status.verifying"));

    try {
      // Get reCAPTCHA token
      if (!window.grecaptcha?.enterprise) {
        console.error("reCAPTCHA not loaded");
        setStatus(t("contactForm.status.recaptchaError"));
        setIsSubmitting(false);
        return;
      }

      const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action: "submit" });

      if (!token) {
        throw new Error("Failed to get reCAPTCHA token");
      }

      setStatus(t("contactForm.status.sending"));

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("projectType", formData.projectType.join(", "));
      data.append("budget", formData.budget);
      data.append("message", formData.message);
      data.append("g-recaptcha-response", token);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: data
      });

      const text = await response.text();

      if (text.includes("OK")) {
        setStatus(t("contactForm.status.success"));
        setFormData({ name: "", email: "", projectType: [], budget: "", message: "" });
      } else {
        setStatus(`${t("contactForm.status.errorPrefix")} ${text}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus(t("contactForm.status.failure"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Load reCAPTCHA Enterprise Script only when contact section is visible */}
      {loadRecaptcha && (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      <div className="contact-form-container" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit} className="contact-form" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Name & Email */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder={t("contactForm.labels.name")}
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
            style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff" }}
          />
          <input
            type="email"
            name="email"
            placeholder={t("contactForm.labels.email")}
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isSubmitting}
            style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff" }}
          />
        </div>

        {/* Project Type Checkboxes */}
        <div>
          <label style={{ display: "block", marginBottom: "0.75rem", color: "#fff", fontWeight: "600" }}>
            {t("contactForm.labels.projectTypes")}
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem" }}>
            {PROJECT_TYPE_KEYS.map((key) => {
              const label = t(key);
              return (
                <label key={key} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", color: "#fff" }}>
                <input
                    type="checkbox"
                    checked={formData.projectType.includes(label)}
                    onChange={() => handleProjectTypeChange(label)}
                    disabled={isSubmitting}
                    style={{ cursor: "pointer" }}
                  />
                  <span style={{ fontSize: "0.9rem" }}>{label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" style={{ display: "block", marginBottom: "0.5rem", color: "#fff", fontWeight: "600" }}>
            {t("contactForm.labels.budget")}
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            disabled={isSubmitting}
            placeholder={t("contactForm.labels.budgetPlaceholder")}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff" }}
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" style={{ display: "block", marginBottom: "0.5rem", color: "#fff", fontWeight: "600" }}>
            {t("contactForm.labels.message")}
          </label>
          <textarea
            id="message"
            name="message"
            placeholder={t("contactForm.labels.messagePlaceholder")}
            required
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            disabled={isSubmitting}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff", resize: "vertical" }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          style={{
            minWidth: "160px",
            opacity: isSubmitting ? 0.6 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer"
          }}
        >
          {isSubmitting ? t("contactForm.status.sending") : t("contactForm.labels.submit")}
        </button>

        {/* Status Message */}
        {status && (
          <p style={{
            textAlign: "center",
            padding: "1rem",
            borderRadius: "0.5rem",
            background: status.includes("✅") ? "rgba(74, 222, 128, 0.1)" : "rgba(251, 191, 36, 0.1)",
            color: status.includes("✅") ? "#4ade80" : "#fbbf24",
            fontWeight: "600"
          }}>
            {status}
          </p>
        )}
      </form>
    </div>
    </>
  );
}
