"use client";

import { useEffect } from "react";

type ImageLightboxProps = {
  images: Array<{ src: string; alt: string; width: number; height: number }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
}: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const currentImage = images[currentIndex];

  if (!currentImage) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      {/* Overlay background */}
      <div
        className="absolute inset-0 bg-black/85"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
        style={{ zIndex: 3 }}
        aria-label="Close lightbox"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Image container - centered and scaled to fit viewport */}
      <div
        className="relative flex items-center justify-center p-8"
        style={{ zIndex: 2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-h-[90vh] max-w-[90vw] h-auto w-auto object-contain"
          style={{
            display: "block",
            position: "relative",
            zIndex: 2
          }}
        />
      </div>
    </div>
  );
}
