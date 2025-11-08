"use client";

export default function Section({
  id, eyebrow, title, intro, children, variant = "light"
}:{
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  variant?: "dark" | "light";
}){
  const isLight = variant === "light";
  return (
    <section id={id} className={`${isLight ? "bg-white text-black" : "bg-black text-white"} py-20`}>
      <div className="mx-auto max-w-5xl px-6">
        {eyebrow && <div className="mb-2 text-sm font-bold tracking-wider text-[#ff7a00]">{eyebrow}</div>}
        <h2 className="text-3xl md:text-4xl font-extrabold">{title}</h2>
        {intro && <p className={`mt-3 max-w-2xl ${isLight ? "text-black/70" : "text-white/80"}`}>{intro}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
