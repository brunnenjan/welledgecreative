/** Two rivers flowing into one: the first sketch of a mark for The Sanctuary at Two Rivers. */
export default function SanctuaryMark({ size = 34, stroke = 2 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M8 4c0 12 12 14 12 24v8" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      <path d="M32 4c0 12-12 14-12 24" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      <circle cx="20" cy="36" r={stroke * 0.8} fill="currentColor" />
    </svg>
  );
}
