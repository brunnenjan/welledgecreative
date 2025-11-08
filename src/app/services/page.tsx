export const metadata = { title: "Services | Well Edge Creative" };

export default function Services() {
  return (
    <div className="bg-white text-black">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold">Services</h1>
        <p className="mt-4 max-w-2xl text-black/70">Strategy, brand systems, and websites — story-first, mobile-first.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">Strategy Sprint</h3>
            <ul className="mt-3 list-disc pl-5 text-black/80">
              <li>Positioning & messaging</li>
              <li>Content map + homepage wire</li>
              <li>Roadmap</li>
            </ul>
            <p className="mt-4 text-sm text-black/60">From €1,200</p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">Brand Essentials</h3>
            <ul className="mt-3 list-disc pl-5 text-black/80">
              <li>Logo suite, colors & type</li>
              <li>Brand kit (social, docs)</li>
              <li>Key visuals</li>
            </ul>
            <p className="mt-4 text-sm text-black/60">From €2,800</p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">Launch Website</h3>
            <ul className="mt-3 list-disc pl-5 text-black/80">
              <li>3–5 pages, Next.js</li>
              <li>GSAP animations</li>
              <li>Mobile-first, on-page SEO</li>
            </ul>
            <p className="mt-4 text-sm text-black/60">From €4,500</p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border p-6">
          <h2 className="text-xl font-bold">Also working with Startups & SMBs</h2>
          <p className="mt-2 text-black/70">Same process, adapted to your stage. Tell me your goals — I’ll shape the scope and timeline with you.</p>
        </div>
      </section>
    </div>
  );
}
