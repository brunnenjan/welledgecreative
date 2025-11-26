"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ImageLightboxProps = {
  images: Array<{ src: string; alt: string; width: number; height: number }>;
  currentIndex: number;
  onClose: () => void;
};

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
}: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted || !currentImage) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentImage.src}
        alt={currentImage.alt}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(event) => event.stopPropagation()}
      />
      <button
        type="button"
        className="absolute top-6 right-6 z-[10000] rounded-full bg-white/90 px-4 py-2 font-semibold text-black shadow-lg transition hover:bg-white"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Close lightbox"
      >
        ×
      </button>
    </div>,
    document.body
  );
}
