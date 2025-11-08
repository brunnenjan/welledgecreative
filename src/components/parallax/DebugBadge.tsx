"use client";
import React from "react";

export default function DebugBadge({ id, note }: { id: string; note?: string }) {
  return (
    <div className="pointer-events-none absolute left-2 top-2 z-[9999] rounded bg-black/60 px-2 py-1 text-[11px] text-white">
      <div>{id}</div>
      {note ? <div className="opacity-80">{note}</div> : null}
    </div>
  );
}
