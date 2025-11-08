export const metadata = { title: "Approach | Well Edge Creative" };

export default function Approach() {
  return (
    <div className="bg-white text-black">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold">Approach</h1>
        <p className="mt-4 max-w-2xl text-black/70">
          Strategy → Story → System → Site. The “well & bucket” metaphor guides depth and clarity.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-4">
          <li className="rounded-2xl border p-5"><b>1 · Discover</b><div className="text-black/70 mt-1">Goals, audience, constraints</div></li>
          <li className="rounded-2xl border p-5"><b>2 · Define</b><div className="text-black/70 mt-1">Positioning, message, content</div></li>
          <li className="rounded-2xl border p-5"><b>3 · Design</b><div className="text-black/70 mt-1">Brand system & UI</div></li>
          <li className="rounded-2xl border p-5"><b>4 · Deliver</b><div className="text-black/70 mt-1">Build, QA, handover</div></li>
        </ul>
      </section>
    </div>
  );
}
