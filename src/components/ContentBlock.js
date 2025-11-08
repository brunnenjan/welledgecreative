// src/components/ContentBlock.tsx
type Props = {
  id?: string;
  title?: string;
  eyebrow?: string;
  intro?: string;
  children?: React.ReactNode;
};

export default function ContentBlock({ id, title, eyebrow, intro, children }: Props) {
  return (
    <section id={id} className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        {eyebrow && <p className="text-sm font-semibold tracking-wide text-neutral-500">{eyebrow}</p>}
        {title && <h2 className="mt-1 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>}
        {intro && <p className="mt-4 text-neutral-700 md:text-lg max-w-3xl">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
