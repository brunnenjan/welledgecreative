// src/components/ForegroundLayer.tsx
import Image from "next/image";

type Props = {
  fgSrc: string;           // z.B. "/foreground_layer_2.png"
  heightVh?: number;       // 100 = volle Höhe
  ariaLabel?: string;
  className?: string;
};

export default function ForegroundLayer({
  fgSrc,
  heightVh = 100,
  ariaLabel,
  className = "",
}: Props) {
  return (
    <section
      className={`relative overflow-hidden bg-white ${className}`}
      style={{ height: `${heightVh}vh`, minHeight: "560px" }}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 z-10 grid place-items-center">
        <Image
          src={fgSrc}
          alt="" /* dekorativ */
          width={1800}
          height={900}
          className="w-[92vw] max-w-6xl h-auto"
          priority={false}
        />
      </div>
    </section>
  );
}
