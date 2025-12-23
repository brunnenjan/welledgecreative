"use client";

import Link from "next/link";
import Image from "next/image";
import type { Case } from "../app/data/cases";
import { useI18n } from "./providers/I18nProvider";

export default function WorkCard({ item }: { item: Case }) {
  const { locale } = useI18n();
  const cover = item.images?.[0];
  const href = item.site || `/work/${item.slug}`;
  const fullHref = href.startsWith('/') ? `/${locale}${href}` : href;

  return (
    <Link
      href={fullHref}
      className="group rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition"
    >
      {cover && (
        <div className="relative aspect-[16/10] bg-black">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className="p-5">
        <div className="text-sm text-white/60">{item.client} • {item.year}</div>
        <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
        <p className="mt-2 text-white/70">{item.summary}</p>
        <div className="mt-3 font-semibold" style={{ color:"var(--accent)" }}>View case →</div>
      </div>
    </Link>
  );
}
