import { useEffect, useState } from "react";
export function useOrientation() {
  const [o, setO] = useState<"portrait"|"landscape">("portrait");
  useEffect(() => {
    const h = () => setO(window.innerWidth >= window.innerHeight ? "landscape" : "portrait");
    h();
    window.addEventListener("resize", h);
    window.addEventListener("orientationchange", h);
    return () => {
      window.removeEventListener("resize", h);
      window.removeEventListener("orientationchange", h);
    };
  }, []);
  return o;
}
