/**
 * A first sketch of a mark for Tribal Tulum: an upright T and a mirrored T that share one stem,
 * like a reflection in the water of a cenote. Drawn as filled shapes so the bars taper to a point.
 */
export default function TribalMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={(size * 100) / 120} height={size} viewBox="0 0 100 120" fill="currentColor" aria-hidden="true">
      {/* upright T */}
      <path d="M6 4 Q50 24 94 4 Q50 41 6 4Z" />
      {/* mirrored T */}
      <path d="M6 116 Q50 96 94 116 Q50 79 6 116Z" />
      {/* one stem for both, slightly waisted in the middle */}
      <path d="M45.4 20 H54.6 L53 60 L54.6 100 H45.4 L47 60Z" />
    </svg>
  );
}
