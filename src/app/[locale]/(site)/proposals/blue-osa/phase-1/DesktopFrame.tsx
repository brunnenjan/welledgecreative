"use client";

import { useEffect, useRef, useState } from "react";

/** Shows a page at true desktop width (1280 px), scaled down to fit its box, and still scrollable. */
export default function DesktopFrame({ src, title, className }: { src: string; title: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.58);
  const [height, setHeight] = useState(720);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    // Hidden on phones (width 0): keep the last scale instead of dividing by zero.
    const fit = () => {
      if (el.clientWidth === 0) return;
      setScale(el.clientWidth / 1280);
      setHeight(el.clientHeight);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={box} className={className}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={{ position: "absolute", top: 0, left: 0, width: 1280, height: height / scale, border: 0, transform: `scale(${scale})`, transformOrigin: "0 0" }}
      />
    </div>
  );
}
