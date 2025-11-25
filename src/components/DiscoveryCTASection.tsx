"use client";

import Link from "next/link";

type DiscoveryCTASectionProps = {
  heading: string;
  paragraph: string;
  buttonText: string;
  href: string;
  variant?: "light" | "dark";
  className?: string;
};

export default function DiscoveryCTASection({
  heading,
  paragraph,
  buttonText,
  href,
  variant = "dark",
  className,
}: DiscoveryCTASectionProps) {
  const isLight = variant === "light";

  const sectionClasses = [
    "relative",
    "overflow-hidden",
    "rounded-[32px]",
    "px-6",
    "py-16",
    "md:py-20",
    isLight ? "bg-neutral-100" : "bg-gradient-to-br from-[#1b1b1b] via-[#27221d] to-[#3e2b1f]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const overlayClasses = [
    "h-full",
    "w-full",
    "bg-gradient-to-tr",
    isLight ? "from-white via-[#f5f0eb] to-[#efe9e2]" : "from-accent/20 via-transparent to-white/10",
  ].join(" ");

  const headingClasses = ["text-3xl", "font-serif", "font-semibold", "md:text-4xl", isLight ? "text-black" : "text-white"].join(
    " "
  );

  const paragraphClasses = ["mt-6", "text-lg", "leading-relaxed", isLight ? "text-black/70" : "text-white/80"].join(" ");

  const buttonClasses = [
    "mt-8",
    "inline-flex",
    "rounded-full",
    "px-8",
    "py-4",
    "text-base",
    "font-semibold",
    "transition",
    isLight ? "bg-black text-white hover:bg-accent" : "bg-white text-black hover:bg-accent hover:text-white",
  ].join(" ");

  return (
    <section
      className={sectionClasses}
    >
      <div className="absolute inset-0 opacity-30">
        <div className={overlayClasses} />
      </div>
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className={headingClasses}>{heading}</h2>
        <p className={paragraphClasses}>{paragraph}</p>
        <Link
          href={href}
          className={buttonClasses}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
