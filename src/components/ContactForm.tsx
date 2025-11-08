"use client";

import { useState, useRef, useEffect, FormEvent, ChangeEvent, FocusEvent } from "react";

type FormData = {
  name: string;
  email: string;
  projectType: string[];
  budget: string;
  message: string;
  honeypot: string; // spam prevention
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const PROJECT_TYPES = [
  "Branding & Logo Design",
  "Website Design",
  "Website Development",
  "Full Brand & Web Package",
  "Strategy & Consultation",
  "Other",
];

const BUDGET_RANGES = ["< €2k", "€2–5k", "€5–10k", "€10k+", "Not sure yet"];

export default function ContactForm() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectType: [],
    budget: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formStartTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!recaptchaSiteKey || typeof window === "undefined") {
      return;
    }

    const scriptId = "google-recaptcha-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [recaptchaSiteKey]);

  const validateField = (key: keyof FormData, value: string): string | undefined => {
    switch (key) {
      case "name":
        if (!value.trim()) return "Please enter your name";
        return undefined;
      case "email":
        if (!value.trim()) return "Please enter your email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        return undefined;
      case "message": {
        const trimmed = value.trim();
        if (!trimmed) return "Please tell me about your project";
        if (trimmed.length < 20) return "Please provide more details (at least 20 characters)";
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.name = validateField("name", formData.name);
    newErrors.email = validateField("email", formData.email);
    newErrors.message = validateField("message", formData.message);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const fieldKey = name as keyof FormData;
    if (fieldKey === "name" || fieldKey === "email" || fieldKey === "message") {
      const fieldError = validateField(fieldKey, value);
      setErrors((prev) => ({ ...prev, [fieldKey]: fieldError }));
    } else if (errors[fieldKey]) {
      setErrors((prev) => ({ ...prev, [fieldKey]: undefined }));
    }
  };

  const handleProjectTypeChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(type)
        ? prev.projectType.filter((t) => t !== type)
        : [...prev.projectType, type],
    }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldKey = name as keyof FormData;
    if (fieldKey === "name" || fieldKey === "email" || fieldKey === "message") {
      const fieldError = validateField(fieldKey, value);
      setErrors((prev) => ({ ...prev, [fieldKey]: fieldError }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Spam prevention checks
    if (formData.honeypot) {
      return; // Silently fail for bots
    }

    const timeTaken = Date.now() - formStartTime.current;
    if (timeTaken < 3000) {
      return; // Too fast, likely a bot
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage(null);

    let recaptchaToken: string | undefined;

    if (recaptchaSiteKey) {
      if (!window.grecaptcha) {
        setSubmitStatus("error");
        setErrorMessage("Security challenge is still loading. Please try again in a moment.");
        setIsSubmitting(false);
        return;
      }

      try {
        await new Promise<void>((resolve) => window.grecaptcha?.ready(resolve));
        recaptchaToken = await window.grecaptcha?.execute(recaptchaSiteKey, { action: "contact" });
      } catch (error) {
        console.error("reCAPTCHA execution error:", error);
        setSubmitStatus("error");
        setErrorMessage("Could not verify reCAPTCHA. Please refresh and try again.");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message,
          recaptchaToken,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          projectType: [],
          budget: "",
          message: "",
          honeypot: "",
        });
        setErrorMessage(null);
      } else {
        const { error } = await response.json().catch(() => ({ error: undefined }));
        setSubmitStatus("error");
        setErrorMessage(
          error ??
            "There was a problem delivering your message. Please try again or use the email below."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setErrorMessage("Unexpected error. Please try again or use the email below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        {/* Honeypot field (hidden from users) */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
        />

        {/* Name */}
        <div className="form-group">
          <label htmlFor="contact-name" className="form-label">
            Name <span className="form-required">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input${errors.name ? " has-error" : ""}`}
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span id="name-error" className="form-error">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="contact-email" className="form-label">
            Email <span className="form-required">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input${errors.email ? " has-error" : ""}`}
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className="form-error">
              {errors.email}
            </span>
          )}
        </div>

        {/* Project Type (multi-select) */}
        <div className="form-group">
          <fieldset className="form-fieldset">
            <legend className="form-label">Services of interest</legend>
            <div className="form-checkbox-group">
              {PROJECT_TYPES.map((type) => (
                <label key={type} className="form-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.projectType.includes(type)}
                    onChange={() => handleProjectTypeChange(type)}
                    className="form-checkbox"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Budget */}
        <div className="form-group">
          <label htmlFor="contact-budget" className="form-label">
            Budget range (optional)
          </label>
          <select
            id="contact-budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select a range</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="contact-message" className="form-label">
            Tell me about your project <span className="form-required">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={6}
            minLength={20}
            className={`form-input form-textarea${errors.message ? " has-error" : ""}`}
            required
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <span id="message-error" className="form-error">
              {errors.message}
            </span>
          )}
        </div>

        {/* Privacy Note */}
        <p className="form-privacy">
          Your data is handled with care. See my{" "}
          <a href="/privacy" className="form-link">
            privacy policy
          </a>
          .
        </p>

        {/* Submit Button */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full md:w-auto"
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
          <p className="text-sm text-white/70 md:text-base">
            I typically reply within 1–2 business days.
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="form-message form-message-success" role="alert">
            <p className="font-semibold">Message sent successfully!</p>
            <p>I&apos;ll get back to you within 1-2 business days.</p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="form-message form-message-error" role="alert">
            <p className="font-semibold">Something went wrong.</p>
            {errorMessage && <p>{errorMessage}</p>}
            <p className="pt-1">
              Prefer email? Reach me at{" "}
              <a href="mailto:info@well-edge-creative.com" className="form-link">
                info@well-edge-creative.com
              </a>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
