"use client";

import { useState, FormEvent } from "react";
import Script from "next/script";

const PROJECT_TYPES = [
  "Branding & Logo Design",
  "Website Design",
  "Website Development",
  "Full Brand & Web Package",
  "Strategy & Consultation",
  "Other",
];

const BUDGET_RANGES = ["< €2k", "€2–5k", "€5–10k", "€10k+", "Not sure yet"];
const RECAPTCHA_SITE_KEY = "6LfO5_wrAAAAABZZztKHdyxOpMYuJjayfy08yw_t";

export default function ContactFormStatic() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: [] as string[],
    budget: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setStatus("Verifying...");

    try {
      // Get reCAPTCHA token
      if (!window.grecaptcha?.enterprise) {
        console.error("reCAPTCHA not loaded");
        setStatus("⚠️ reCAPTCHA not loaded. Please refresh and try again.");
        setIsSubmitting(false);
        return;
      }

      const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action: "submit" });

      if (!token) {
        throw new Error("Failed to get reCAPTCHA token");
      }

      setStatus("Sending...");

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
        setStatus("✅ Message sent successfully! Check your email for confirmation.");
        setFormData({ name: "", email: "", projectType: [], budget: "", message: "" });
      } else {
        setStatus(`⚠️ ${text}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("⚠️ Sending failed – please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Load reCAPTCHA Enterprise Script */}
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />

      <div className="contact-form-container" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit} className="contact-form" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Name & Email */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
            style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
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
            What can I help you with?
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem" }}>
            {PROJECT_TYPES.map((type) => (
              <label key={type} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", color: "#fff" }}>
                <input
                  type="checkbox"
                  checked={formData.projectType.includes(type)}
                  onChange={() => handleProjectTypeChange(type)}
                  disabled={isSubmitting}
                  style={{ cursor: "pointer" }}
                />
                <span style={{ fontSize: "0.9rem" }}>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" style={{ display: "block", marginBottom: "0.5rem", color: "#fff", fontWeight: "600" }}>
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            disabled={isSubmitting}
            style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer" }}
          >
            <option value="">Select budget range</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range} style={{ background: "#1a1a1a", color: "#fff" }}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" style={{ display: "block", marginBottom: "0.5rem", color: "#fff", fontWeight: "600" }}>
            Tell me about your project *
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Share your vision, goals, timeline, or any questions..."
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
          {isSubmitting ? "Sending..." : "Send Message"}
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
