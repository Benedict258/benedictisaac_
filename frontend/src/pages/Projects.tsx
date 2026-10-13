import { useState } from "react";
import { SiteLayout } from "@/components/layout/site-layout";
import { Seo } from "@/components/seo";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { PROJECT_FILTERS, projects, type ProjectFilter } from "@/data/projects";
import { cn } from "@/lib/utils";

const ProjectsPage = () => {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  // Software resume order first, then projects that only appear in the mechatronics view.
  const ordered = [...projects].sort(
    (a, b) =>
      Number(Boolean(a.earlier)) - Number(Boolean(b.earlier)) ||
      (a.rank.software ?? 100 + (a.rank.mechatronics ?? 0)) - (b.rank.software ?? 100 + (b.rank.mechatronics ?? 0)),
  );
  const visible = ordered.filter((p) => filter === "All" || p.categories.includes(filter));
  const main = visible.filter((p) => !p.earlier);
  const earlier = visible.filter((p) => p.earlier);

  return (
    <SiteLayout>
      <Seo
        title="Projects | Benedict Isaac"
        description="Projects by Benedict Isaac across web, AI, blockchain and mechatronics: OpenAtlas, Safroi, Buiry, Suirify, Arche, ESN-PRISM, WinterArc, ECAPs and more."
        path="/projects"
      />
      <div className="container space-y-10 py-16">
        <div className="space-y-3">
          <Badge variant="outline" className="w-fit">
            Projects
          </Badge>
          <h1 className="text-3xl font-bold md:text-4xl">Projects</h1>
          <p className="max-w-[68ch] text-lg text-muted-foreground">
            All projects, including earlier work. Filter by area.
          </p>
        </div>

        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
                filter === item
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "bg-background text-foreground/80 hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {main.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {earlier.length > 0 && (
          <section aria-labelledby="earlier-work" className="space-y-6">
            <h2 id="earlier-work" className="text-2xl font-semibold">
              Earlier work
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {earlier.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
};

export default ProjectsPage;
