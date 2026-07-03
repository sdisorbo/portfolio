import { Project } from "@/data/projects";

interface ProjectCardProps extends Project {
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
  images,
  todo,
  index,
}: ProjectCardProps) {
  const Wrapper = link ? "a" : "div";
  const wrapperProps = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {};
  const cover = images && images.length > 0 ? images[0] : null;

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={`group relative block aspect-square overflow-hidden rounded-xl border bg-mahogany transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/20 ${
        todo
          ? "border-dashed border-border opacity-60"
          : "border-border hover:border-accent"
      }`}
    >
      {/* Cover image (dimmed with alpha) */}
      {cover ? (
        <img
          src={cover}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover opacity-40 transition-all duration-500 group-hover:scale-105 group-hover:opacity-30"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-mahogany" />
      )}

      {/* Readability wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-mahogany via-mahogany/75 to-mahogany/25" />

      {/* Techy grid texture */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Corner accent line */}
      <div className="absolute right-0 top-0 h-10 w-10 border-r border-t border-offwhite/20 transition-colors duration-300 group-hover:border-accent" />

      {/* Index + external marker */}
      <div className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.2em] text-offwhite/50">
        {index != null ? String(index + 1).padStart(2, "0") : ""}
      </div>
      {link && (
        <div className="absolute right-4 top-3 text-offwhite/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          ↗
        </div>
      )}

      {/* Overlaid content */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-5">
        <h3 className="line-clamp-3 text-lg font-semibold leading-snug text-offwhite drop-shadow-sm">
          {title}
        </h3>

        <p className="line-clamp-4 max-h-0 overflow-hidden text-xs leading-relaxed text-offwhite/70 opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded border border-offwhite/20 bg-offwhite/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-offwhite/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
            {tags.length > 5 && (
              <span className="px-1 py-0.5 font-mono text-[10px] text-offwhite/50">
                +{tags.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
