"use client";
import { useOrientation } from "@/hooks/useOrientation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { BP } from "@/lib/breakpoints";

export default function RotateNotice() {
  const orientation = useOrientation();
  const isPhone = useMediaQuery(`(max-width: ${BP.tablet - 1}px)`);
  if (!isPhone || orientation === "landscape") return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[200] mx-auto w-[90%] max-w-md rounded-xl bg-black/80 px-4 py-3 text-white backdrop-blur">
      <p className="text-center text-sm">For the full experience, please rotate your phone to landscape.</p>
    </div>
  );
}
