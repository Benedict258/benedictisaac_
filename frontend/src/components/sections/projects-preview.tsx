import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { useView } from "@/context/view-context";
import { earlierProjects, mainProjects } from "@/data/projects";

const PREVIEW_COUNT = 4;

export function ProjectsPreview() {
  const { view } = useView();
  const featured = mainProjects(view).slice(0, PREVIEW_COUNT);
  const earlier = earlierProjects(view);

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="container space-y-10">
        <div className="space-y-3">
          <Badge variant="outline" className="w-fit">
            Projects
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">Projects</h2>
          <p className="max-w-[68ch] text-lg text-muted-foreground">
            A selection of projects across web, AI, blockchain and mechatronics. The full list, with filters, is on the
            projects page.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button asChild className="min-h-11">
            <Link to="/projects">
              All projects <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {earlier.length > 0 && (
          <details className="group rounded-2xl border bg-background/60 p-4 sm:p-6">
            <summary className="flex min-h-11 cursor-pointer items-center text-lg font-semibold">
              Earlier work ({earlier.length})
            </summary>
            <ul className="mt-4 grid list-none gap-4 md:grid-cols-2">
              {earlier.map((project) => (
                <li key={project.slug} className="rounded-xl border p-4">
                  <h3 className="text-lg font-semibold">
                    <Link to={`/project/${project.slug}`} className="inline-flex min-h-11 items-center hover:underline">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">{project.description}</p>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}
