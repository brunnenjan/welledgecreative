"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";
import type { ParallaxConfig } from "@/content/parallaxSections";

const DEFAULT_BUCKET_TRAVEL = 40;
const DEFAULT_BG_TRAVEL = -18;
const DEFAULT_BUCKET_SIZE = "clamp(30rem, 74vmin, 66rem)";

type Props = ParallaxConfig;

export default function ParallaxSection({
  id,
  heightVh,
  bucketStart,
  bucketTravel,
  bucketSpeed,
  bgTravel,
  bucketSize,
  debug = false,
  foreground,
  bucket,
  background,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bucketAnimRef = useRef<HTMLDivElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gsap || !ScrollTrigger) {
      return;
    }

    if (!sectionRef.current || !bucketAnimRef.current || !bgWrapRef.current) {
      console.warn("[ParallaxSection] missing refs", {
        section: sectionRef.current,
        bucket: bucketAnimRef.current,
        background: bgWrapRef.current,
      });
      return;
    }

    const startY = bucketStart ?? 0;
    const travel = (bucketTravel ?? DEFAULT_BUCKET_TRAVEL) * (bucketSpeed ?? 1);
    const bgTravelValue = bgTravel ?? DEFAULT_BG_TRAVEL;

    gsap.set(bucketAnimRef.current, { yPercent: startY });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: debug,
      },
    });

    tl.fromTo(
      bucketAnimRef.current,
      { yPercent: startY },
      { yPercent: startY + travel, ease: "none" }
    );

    tl.fromTo(
      bgWrapRef.current,
      { yPercent: 0 },
      { yPercent: bgTravelValue, ease: "none" },
      0
    );

    console.info("[ParallaxSection] timeline created", {
      id,
      startY,
      travel,
      bgTravel: bgTravelValue,
      debug,
    });

    ScrollTrigger.refresh();

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [id, bucketStart, bucketTravel, bucketSpeed, bgTravel, bucketSize, debug]);

  const bucketWidth = bucketSize ?? DEFAULT_BUCKET_SIZE;
  const sectionStyle = heightVh ? { height: `${heightVh}vh` } : undefined;

  return (
    <section
      ref={sectionRef}
      id={id}
      className="parallax-section relative min-h-screen flex items-center justify-center overflow-hidden"
      style={sectionStyle}
    >
      <div
        ref={bgWrapRef}
        className="absolute inset-0 z-0 will-change-transform pointer-events-none"
      >
        <div className="image-wrapper">
          <Image
            src={background.src}
            alt={background.alt ?? ""}
            fill
            priority={background.priority ?? false}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: background.objectPosition ?? "center" }}
          />
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div ref={bucketAnimRef} className="will-change-transform">
          <div className="relative" style={{ width: bucketWidth }}>
            <Image
              src={bucket.src}
              alt={bucket.alt ?? ""}
              width={800}
              height={1000}
              priority={bucket.priority ?? false}
              sizes="80vw"
              className="parallax-bucket-image"
              style={{
                objectPosition: bucket.objectPosition ?? "center",
              }}
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="image-wrapper">
          <Image
            src={foreground.src}
            alt={foreground.alt ?? ""}
            fill
            priority={foreground.priority ?? false}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: foreground.objectPosition ?? "center" }}
          />
        </div>
      </div>
    </section>
  );
}
