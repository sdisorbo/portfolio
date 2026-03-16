import Link from "next/link";
import { posts } from "@/data/blog";
import { ExternalLink } from "lucide-react";

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-3">Blog</h1>
      <p className="text-mahogany/60 mb-2 text-sm">Fantasy football analysis and commentary.</p>
      <p className="text-mahogany/40 text-xs mb-10">
        Full articles live on{" "}
        <Link href="https://www.thefantasyfootballers.com/author/samuel-disorbo/" target="_blank" className="underline hover:text-accent">
          The Fantasy Footballers
        </Link>
        .
      </p>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.url + post.date}
            href={post.url}
            target="_blank"
            className="group flex items-start justify-between p-6 rounded-xl border border-border bg-card hover:border-accent hover:shadow-md transition-all duration-200"
          >
            <div>
              <h2 className="font-semibold text-mahogany group-hover:text-accent transition-colors mb-1">{post.title}</h2>
              <p className="text-xs text-mahogany/40 mb-2">{post.date}</p>
              {post.summary && <p className="text-sm text-mahogany/60">{post.summary}</p>}
            </div>
            <ExternalLink size={16} className="text-mahogany/30 group-hover:text-accent transition-colors mt-1 ml-4 shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
