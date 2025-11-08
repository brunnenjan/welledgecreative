"use client";

import { useState, FormEvent } from "react";

export default function ContactFormStatic() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!");

    setIsSubmitting(true);
    setStatus("Sending...");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("message", formData.message);

      console.log("Sending to backend...");

      const response = await fetch("https://well-edge-creative.com/contact.php", {
        method: "POST",
        body: data
      });

      const text = await response.text();
      console.log("Response:", text);

      if (text.includes("OK")) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
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
    <div className="contact-form-container" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} className="contact-form" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={isSubmitting}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isSubmitting}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          disabled={isSubmitting}
        />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
        {status && (
          <p style={{
            marginTop: "10px",
            color: status.includes("✅") ? "#4ade80" : status.includes("⚠️") ? "#fbbf24" : "#fff"
          }}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
