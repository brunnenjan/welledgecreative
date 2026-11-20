import type { ReactNode } from "react";
import { alternatesFor } from "@/lib/site";

// Canonical and language links for this page (src/lib/site.ts).
export const generateMetadata = alternatesFor("/case-studies/vietnam-detox");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
