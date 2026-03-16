import Link from "next/link";
import { Github, Linkedin, Download, ExternalLink } from "lucide-react";

const sections = [
  { href: "/professional", label: "Professional", desc: "My role at Accenture, interests in ML, energy, and financial markets." },
  { href: "/projects", label: "Projects", desc: "Research, analytics work, and side projects." },
  { href: "/interests", label: "Interests", desc: "Wine log, restaurant tracker, travel map, and reading list." },
  { href: "/games", label: "Games", desc: "Chess ratings, poker P&L, and the data behind the losses." },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      {/* Hero */}
      <div className="mb-20">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-mahogany mb-4">
          Samuel Fernando DiSorbo
        </h1>
        <p className="text-xl text-mahogany/60 mb-10 font-light">
          Data Analyst · Sourcing &amp; Procurement @ Accenture
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="https://github.com/sdisorbo"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-mahogany/80 hover:text-accent hover:border-accent transition-all text-sm font-medium"
          >
            <Github size={16} /> GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/sam-disorbo-b51056220/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-mahogany/80 hover:text-accent hover:border-accent transition-all text-sm font-medium"
          >
            <Linkedin size={16} /> LinkedIn
          </Link>
          <Link
            href="/Samuel_DiSorbo_2_9_26.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-mahogany/80 hover:text-accent hover:border-accent transition-all text-sm font-medium"
          >
            <Download size={16} /> Download CV
          </Link>
          <Link
            href="https://www.thefantasyfootballers.com/author/sdisorbo/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-mahogany/80 hover:text-accent hover:border-accent transition-all text-sm font-medium"
          >
            <ExternalLink size={16} /> Fantasy Football Blog
          </Link>
        </div>
      </div>

      {/* Section preview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group p-6 rounded-xl border border-border bg-card hover:border-accent hover:shadow-md transition-all duration-200"
          >
            <h2 className="font-semibold text-mahogany text-lg mb-2 group-hover:text-accent transition-colors">
              {s.label} →
            </h2>
            <p className="text-sm text-mahogany/60 leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
