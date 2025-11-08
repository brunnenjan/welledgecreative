"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Props = {
  // Assets aus /public
  bgSrc?: string;
  fgSrc?: string;        // transparentes PNG (Cutout)
  bucketSrc?: string;

  // Layout
  heightVh?: number;
  startOffsetVh?: number; // Startposition Eimer relativ zum Break
  overscanVh?: number;    // FG-Verlängerung gegen „Naht“

  // Parallax-Geschwindigkeiten (px = scrollDelta * speed)
  bgSpeed?: number;       // + nach unten
  fgSpeed?: number;       // + nach unten (negativ = nach oben)
  bucketSpeed?: number;   // + nach unten

  // Bucket
  showBucket?: boolean;
  showRope?: boolean;     // <— NEU: Seil an/aus
  bucketSize?: number;    // 1 = Standard
  bucketFlipX?: boolean;
};

export default function BucketBreak({
  bgSrc = "/assets/parallax/section-discover/parallax-bg-discover-secondary.webp",
  fgSrc = "/assets/parallax/section-discover/parallax-foreground-discover-alt.webp",
  bucketSrc = "/assets/misc/bucket-generic.png",

  heightVh = 60,
  startOffsetVh = -10,
  overscanVh = 28,

  bgSpeed = 0.15,
  fgSpeed = -0.25,
  bucketSpeed = 0.2,

  showBucket = true,
  showRope = true,        // default: Seil AN – kann pro Break abgeschaltet werden
  bucketSize = 1.0,
  bucketFlipX = false,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const bucketWrapRef = useRef<HTMLDivElement>(null);

  // responsive Bucket-Höhe (zieht nie zu breit)
  const BUCKET_MIN_PX = 160 * bucketSize;
  const BUCKET_MID_VH = 30 * bucketSize;
  const BUCKET_MAX_PX = 480 * bucketSize;
  const bucketHeight = `clamp(${BUCKET_MIN_PX}px, ${BUCKET_MID_VH}vh, ${BUCKET_MAX_PX}px)`;

  useEffect(() => {
    const root = rootRef.current!;
    const bg = bgRef.current!;
    const fg = fgRef.current!;
    const bucket = bucketWrapRef.current;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = root.getBoundingClientRect();
      const y = -rect.top; // >0 sobald Section in den Viewport kommt

      bg.style.transform = `translate3d(0, ${y * bgSpeed}px, 0)`;
      fg.style.transform = `translate3d(0, ${y * fgSpeed}px, 0)`;
      if (bucket) bucket.style.transform = `translate3d(-50%, ${y * bucketSpeed}px, 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [bgSpeed, fgSpeed, bucketSpeed]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-visible"
      style={{ height: `${heightVh}vh`, background: "#000" }}
    >
      {/* BG */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `url(${bgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.95,
        }}
      />

      {/* BUCKET (optional) */}
      {showBucket && (
        <div
          ref={bucketWrapRef}
          className="absolute left-1/2 z-20 pointer-events-none will-change-transform"
          style={{ top: `${startOffsetVh}vh` }}
        >
          {/* Rope optional */}
          {showRope && (
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: "100%",
                width: 3,
                height: "110vh", // lang genug, aber nur sichtbar, wenn FG nicht drüberliegt
                background:
                  "linear-gradient(to bottom, rgba(204,204,187,0.9), rgba(135,118,102,0.9))",
              }}
            />
          )}

          <Image
            src={bucketSrc}
            alt="Bucket"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              height: bucketHeight,
              width: "auto",
              maxWidth: "min(42vw, 560px)",
              display: "block",
              transform: bucketFlipX ? "scaleX(-1)" : undefined,
              animation: "bucket-sway 3.4s ease-in-out infinite alternate",
              transformOrigin: "top center",
            }}
            priority={false}
          />
        </div>
      )}

      {/* FG / Cutout */}
      <div
        ref={fgRef}
        className="pointer-events-none absolute left-0 right-0 top-0 z-30 will-change-transform"
        style={{ height: `calc(100% + ${overscanVh}vh)` }}
      >
        <Image src={fgSrc} alt="" fill priority={false} style={{ objectFit: "cover" }} />
      </div>
    </section>
  );
}
