"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/professional", label: "Professional" },
  { href: "/projects", label: "Projects" },
  { href: "/interests", label: "Interests" },
  { href: "/games", label: "Games" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 bg-offwhite/90 backdrop-blur border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-mahogany text-lg tracking-tight hover:text-accent transition-colors">
          Samuel DiSorbo
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {links.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition-colors hover:text-accent ${pathname === l.href ? "text-accent font-medium" : "text-mahogany/70"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
