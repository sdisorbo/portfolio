import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-mahogany/50">
        <span>© {new Date().getFullYear()} Samuel DiSorbo</span>
        <Link href="https://github.com/sdisorbo" target="_blank" className="hover:text-accent transition-colors">
          GitHub
        </Link>
      </div>
    </footer>
  );
}
