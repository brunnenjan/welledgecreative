"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";


type NarrativeBridgeProps = {
  text: string;
};

export default function NarrativeBridge({ text }: NarrativeBridgeProps) {
  const bridgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bridgeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bridgeRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: bridgeRef.current,
            start: "top 95%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, bridgeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={bridgeRef} className="narrative-bridge">
      <p className="narrative-bridge__text">{text}</p>
    </div>
  );
}
