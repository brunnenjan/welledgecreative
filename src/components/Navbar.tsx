'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">Well Edge Creative</Link>
        <ul className="flex items-center gap-6">
          <li><a href="#about" className="hover:underline">About</a></li>
          <li><a href="#contact-section" className="hover:underline">Kontakt</a></li>
        </ul>
      </nav>
    </header>
  );
}
