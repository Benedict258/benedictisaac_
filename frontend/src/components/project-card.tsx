import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

const hasLink = (href?: string) => Boolean(href) && href !== "#";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border bg-background/85 p-6 shadow-xl backdrop-blur">
      <div className="flex flex-wrap items-center gap-2">
        {project.status && (
          <Badge variant={project.status === "Live" ? "default" : "secondary"}>{project.status}</Badge>
        )}
        {project.categories.map((category) => (
          <Badge key={category} variant="outline" className="text-xs">
            {category}
          </Badge>
        ))}
      </div>
      <h3 className="mt-4 text-xl font-semibold">
        <Link to={`/project/${project.slug}`} className="hover:underline">
          {project.title}
        </Link>
      </h3>
      {project.subtitle && <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>}
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{project.description}</p>
      {project.impact && (
        <p className="mt-3 text-base leading-relaxed">
          <span className="font-semibold">Key impact: </span>
          <span className="text-muted-foreground">{project.impact}</span>
        </p>
      )}
      <ul className="mt-4 flex list-none flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
        {project.tech.map((tech) => (
          <li key={tech}>
            <Badge variant="outline" className="text-xs">
              {tech}
            </Badge>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {hasLink(project.github) && (
          <Button asChild variant="outline" size="sm" className="min-h-11">
            <a href={project.github} target="_blank" rel="noreferrer">
              Code <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        )}
        {hasLink(project.live) && (
          <Button asChild variant="outline" size="sm" className="min-h-11">
            <a href={project.live} target="_blank" rel="noreferrer">
              Live <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        )}
        <Button asChild variant="outline" size="sm" className="min-h-11">
          <Link to={`/project/${project.slug}`}>
            Details <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
