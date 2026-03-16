import { Project } from "@/data/projects";

export default function ProjectCard({ title, description, tags, link, images, todo }: Project) {
  const Wrapper = link ? "a" : "div";
  const wrapperProps = link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={`group block rounded-xl border bg-card transition-all duration-200 hover:shadow-md hover:scale-[1.01] overflow-hidden ${
        todo ? "border-dashed border-border opacity-60" : "border-border hover:border-accent"
      }`}
    >
      {/* Screenshot strip */}
      {images && images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto p-3 bg-offwhite border-b border-border scrollbar-hide">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              className="h-40 w-auto rounded-lg flex-shrink-0 object-cover border border-border"
            />
          ))}
        </div>
      )}

      <div className="p-6">
        <h3 className="font-semibold text-mahogany text-lg mb-2 group-hover:text-accent transition-colors">
          {title} {link && "→"}
        </h3>
        <p className={`text-sm mb-4 leading-relaxed ${todo ? "text-mahogany/40 italic" : "text-mahogany/70"}`}>
          {description}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-offwhite border border-border text-mahogany/60">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
