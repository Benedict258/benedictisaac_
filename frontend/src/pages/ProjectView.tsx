import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { SiteImage } from "@/components/site-image";
import { Seo } from "@/components/seo";
import { useView } from "@/context/view-context";
import { findProject, legacySlugs, projectForView } from "@/data/projects";

const hasLink = (href?: string) => Boolean(href) && href !== "#";

const ProjectView = () => {
  const { slug } = useParams();
  const { view } = useView();

  if (slug && legacySlugs[slug]) {
    return <Navigate to={`/project/${legacySlugs[slug]}`} replace />;
  }

  const found = findProject(slug);

  if (!found) {
    return (
      <SiteLayout>
        <Seo title="Project not found | Benedict Isaac" description="No project matches this URL." path={`/project/${slug}`} noindex />
        <div className="container py-20">
          <h1 className="text-2xl font-semibold">Project not found</h1>
          <p className="text-muted-foreground">No project matches the requested URL.</p>
          <div className="mt-6">
            <Button asChild className="min-h-11">
              <Link to="/">Back home</Link>
            </Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const project = projectForView(found, view);

  return (
    <SiteLayout>
      <Seo
        title={`${project.title} | Benedict Isaac`}
        description={project.description.slice(0, 200)}
        path={`/project/${project.slug}`}
      />
      <div className="container py-16">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="min-h-11">
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to projects
            </Link>
          </Button>
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            {project.subtitle && <p className="mt-2 text-lg text-muted-foreground">{project.subtitle}</p>}
            {project.tags && project.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {hasLink(project.github) && (
              <Button asChild variant="outline" size="sm" className="min-h-11">
                <a href={project.github} target="_blank" rel="noreferrer">
                  Code <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            )}
            {hasLink(project.npm) && (
              <Button asChild variant="outline" size="sm" className="min-h-11">
                <a href={project.npm} target="_blank" rel="noreferrer">
                  npm <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            )}
            {hasLink(project.docker) && (
              <Button asChild variant="outline" size="sm" className="min-h-11">
                <a href={project.docker} target="_blank" rel="noreferrer">
                  Docker Hub <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            )}
            {hasLink(project.live) && (
              <Button asChild size="sm" className="min-h-11">
                <a href={project.live} target="_blank" rel="noreferrer">
                  Live <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <h2 className="text-lg font-semibold">Overview</h2>
              <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-muted-foreground">{project.description}</p>
            </div>

            {project.impact && (
              <div>
                <h2 className="text-lg font-semibold">Key impact</h2>
                <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-muted-foreground">{project.impact}</p>
              </div>
            )}

            {project.longDescription && project.longDescription !== project.description && (
              <div>
                <h2 className="text-lg font-semibold">About</h2>
                <p className="mt-2 max-w-[68ch] whitespace-pre-wrap text-base leading-relaxed text-muted-foreground">
                  {project.longDescription}
                </p>
              </div>
            )}

            {project.screenshots && project.screenshots.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Screenshots</h2>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {project.screenshots.map((src, i) => (
                    <SiteImage
                      key={src}
                      src={src}
                      alt={
                        project.screenshotAlts?.[i] ??
                        `${project.title} screenshot ${i + 1} of ${project.screenshots?.length}`
                      }
                      className="h-auto w-full rounded-md border"
                    />
                  ))}
                </div>
              </div>
            )}

            {project.readme && project.readme.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">README / PRD</h2>
                <pre className="mt-2 whitespace-pre-wrap rounded border bg-background p-3 text-sm text-muted-foreground">
                  {project.readme}
                </pre>
              </div>
            )}

            {project.features && project.features.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Key features</h2>
                <ul className="mt-2 list-disc pl-5 text-base text-muted-foreground">
                  {project.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.videoUrl && project.videoUrl.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Video / Demo</h2>
                <div className="mt-3 aspect-video overflow-hidden rounded border">
                  <iframe
                    src={project.videoUrl}
                    title={`${project.title} demo`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-4" aria-label="Project details">
            <div className="rounded-xl border p-4">
              <h2 className="text-sm font-semibold">Tech stack</h2>
              <ul className="mt-3 flex list-none flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t}>
                    <Badge variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            {project.team && project.team.length > 0 && (
              <div className="rounded-xl border p-4">
                <h2 className="text-sm font-semibold">Team</h2>
                <ul className="mt-2 text-base text-muted-foreground">
                  {project.team.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.status && (
              <div className="rounded-xl border p-4">
                <h2 className="text-sm font-semibold">Status</h2>
                <div className="mt-2 text-base text-muted-foreground">{project.status}</div>
              </div>
            )}

            {project.publishedDate && (
              <div className="rounded-xl border p-4">
                <h2 className="text-sm font-semibold">Published</h2>
                <div className="mt-2 text-base text-muted-foreground">{project.publishedDate}</div>
              </div>
            )}

            {project.license && (
              <div className="rounded-xl border p-4">
                <h2 className="text-sm font-semibold">License</h2>
                <div className="mt-2 text-base text-muted-foreground">{project.license}</div>
              </div>
            )}
          </aside>
        </div>

        <div className="mt-8">
          <Button asChild className="min-h-11">
            <Link to="/projects">All projects</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
};

export default ProjectView;
