"use client";

import type { PropsWithChildren } from "react";
import Header from "./Header";

export default function HeaderLayout({ children }: PropsWithChildren) {
  return (
    <div className="header-layout">
      <Header />
      {children}
    </div>
  );
}
