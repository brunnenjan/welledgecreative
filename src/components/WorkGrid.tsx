import WorkCard from "./WorkCard";
import { cases } from "../app/data/cases";

export default function WorkGrid({ limit }: { limit?: number }) {
  const items = limit ? cases.slice(0, limit) : cases;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((c) => <WorkCard key={c.slug} item={c} />)}
    </div>
  );
}
