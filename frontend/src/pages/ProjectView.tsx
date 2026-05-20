import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import projects from "@/data/projects";

const ProjectView = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="container py-20">
        <h2 className="text-2xl font-semibold">Project not found</h2>
        <p className="text-muted-foreground">No project matches the requested URL.</p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-20">
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground mt-2">{project.description}</p>
          {project.tags && project.tags.length > 0 && (
            <div className="mt-3 flex gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {project.github && project.github !== "#" && (
            <Button asChild variant="outline" size="sm">
              <a href={project.github} target="_blank" rel="noreferrer">
                Code <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
          {project.live && project.live !== "#" && (
            <Button asChild size="sm">
              <a href={project.live} target="_blank" rel="noreferrer">
                Live <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {project.longDescription && (
            <div>
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-muted-foreground mt-2">{project.longDescription}</p>
            </div>
          )}

          {project.readme && project.readme.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">README / PRD</h3>
              <pre className="whitespace-pre-wrap bg-background border rounded p-3 text-sm text-muted-foreground mt-2">{project.readme}</pre>
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Key features</h3>
              <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Screenshots</h3>
              <div className="mt-3 grid gap-3 grid-cols-1 md:grid-cols-2">
                {project.screenshots.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt={`${project.title} screenshot ${i + 1}`} className="rounded-md border" />
                ))}
              </div>
            </div>
          )}

          {project.videoUrl && project.videoUrl.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Video / Demo</h3>
              <div className="mt-3 aspect-video rounded overflow-hidden border">
                <iframe
                  src={project.videoUrl}
                  title={`${project.title} demo`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border p-4">
            <h4 className="text-sm font-semibold">Tech stack</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {project.team && project.team.length > 0 && (
            <div className="rounded-xl border p-4">
              <h4 className="text-sm font-semibold">Team</h4>
              <ul className="mt-2 text-sm text-muted-foreground">
                {project.team.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl border p-4">
            <h4 className="text-sm font-semibold">Status</h4>
            <div className="mt-2 text-muted-foreground">{project.status}</div>
          </div>

          {project.publishedDate && (
            <div className="rounded-xl border p-4">
              <h4 className="text-sm font-semibold">Published</h4>
              <div className="mt-2 text-muted-foreground">{project.publishedDate}</div>
            </div>
          )}

          {project.license && (
            <div className="rounded-xl border p-4">
              <h4 className="text-sm font-semibold">License</h4>
              <div className="mt-2 text-muted-foreground">{project.license}</div>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-8">
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectView;
