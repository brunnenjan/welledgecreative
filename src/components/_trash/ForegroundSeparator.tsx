// src/components/ForegroundSeparator.tsx
import Image from "next/image";

type Props = {
  /** Vollflächiges Foreground-Bild (z. B. dein Cutout) */
  fgSrc: string;
  /** Optionales Hintergrundbild (falls du schon eines zeigen willst) */
  bgSrc?: string;
  /** Höhe in Viewport-Höhen (100 = volle Höhe) */
  heightVh?: number;
  /** aria-label für A11y (oder leer lassen, wenn rein dekorativ) */
  ariaLabel?: string;
};

/**
 * Einfache Platzhalter-Sektion:
 * - volle Höhe
 * - 1 Foreground-Ebene (fg) + optional 1 Background-Ebene (bg)
 * - keine GSAP/ScrollTrigger, kein Pinning, keine Parallax
 * - rundum sind die anderen Sections einfach weiß
 */
export default function ForegroundSeparator({
  fgSrc,
  bgSrc,
  heightVh = 100,
  ariaLabel,
}: Props) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: `${heightVh}vh`, minHeight: "560px" }}
      aria-label={ariaLabel}
    >
      {/* Optionaler Background */}
      {bgSrc ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={bgSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
        </div>
      ) : null}

      {/* Foreground (dein Cutout) – mittig platziert */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image
          src={fgSrc}
          alt="" /* dekorativ */
          width={1600}
          height={900}
          className="w-[90vw] max-w-6xl h-auto"
          priority={false}
        />
      </div>
    </section>
  );
}
