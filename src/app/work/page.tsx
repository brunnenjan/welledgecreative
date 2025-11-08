import WorkGrid from "../../components/WorkGrid";

export const metadata = { title: "Work | Well Edge Creative" };

export default function WorkPage() {
  return (
    <div className="bg-white text-black">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold">Case Studies</h1>
        <p className="mt-3 max-w-2xl text-black/70">Selected branding and web projects.</p>
        <div className="mt-8">
          <WorkGrid />
        </div>
      </section>
    </div>
  );
}
