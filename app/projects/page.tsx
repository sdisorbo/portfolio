import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-3">Projects</h1>
      <p className="text-mahogany/60 mb-10 text-sm">
        Research, analytics work, and side projects.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p.title} className={p.images?.length ? "md:col-span-2" : ""}>
            <ProjectCard {...p} />
          </div>
        ))}
      </div>
    </div>
  );
}
