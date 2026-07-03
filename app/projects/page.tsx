import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-3">Projects</h1>
      <p className="text-mahogany/60 mb-10 text-sm">
        Research, analytics work, and side projects.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} index={i} {...p} />
        ))}
      </div>
    </div>
  );
}
