"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 350);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => setVisible(false), 350);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return <div className={`page-transition-overlay${visible ? " is-active" : ""}`} aria-hidden />;
}
