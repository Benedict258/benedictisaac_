import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { SiteImage } from "@/components/site-image";
import { Seo } from "@/components/seo";
import certifications from "@/data/certifications";
import { findProject } from "@/data/projects";

const CertView = () => {
  const { slug } = useParams();
  const cert = certifications.find((c) => c.slug === slug);

  if (!cert) {
    return (
      <SiteLayout>
        <Seo title="Certification not found | Benedict Isaac" description="No certification matches this URL." path={`/certifications/${slug}`} noindex />
        <div className="container py-20">
          <h1 className="text-2xl font-semibold">Certification not found</h1>
          <p className="text-muted-foreground">No certification matches the requested URL.</p>
          <div className="mt-6">
            <Button asChild className="min-h-11">
              <Link to="/">Back home</Link>
            </Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const relatedProject = cert.relatedProject ? findProject(cert.relatedProject) : null;

  return (
    <SiteLayout>
      <Seo
        title={`${cert.title} | Benedict Isaac`}
        description={`${cert.title}, ${cert.issuer}${cert.date ? `, ${cert.date}` : ""}.`}
        path={`/certifications/${cert.slug}`}
      />
      <div className="container py-16">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="min-h-11">
            <Link to="/#certificates">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to certifications
            </Link>
          </Button>
        </div>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h1 className="text-3xl font-bold">{cert.title}</h1>
            <p className="mt-2 text-muted-foreground">{cert.issuer}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cert.date && (
                <Badge variant="secondary" className="text-xs">
                  {cert.date}
                </Badge>
              )}
              {cert.credentialId && (
                <Badge variant="outline" className="text-xs">
                  Credential ID: {cert.credentialId}
                </Badge>
              )}
            </div>
          </div>
          {cert.verificationLink && (
            <Button asChild variant="outline" size="sm" className="min-h-11">
              <a href={cert.verificationLink} target="_blank" rel="noreferrer">
                Verify <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {cert.image && (
              <div>
                <h2 className="text-lg font-semibold">Certificate</h2>
                <div className="mt-3">
                  <SiteImage
                    src={cert.image}
                    alt={`Certificate image: ${cert.title}, issued by ${cert.issuer}`}
                    className="h-auto max-w-full rounded-md border"
                  />
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold">About</h2>
              <p className="mt-2 max-w-[68ch] whitespace-pre-wrap text-base leading-relaxed text-muted-foreground">
                {cert.description ?? "Details for this certification will be available soon."}
              </p>
            </div>
          </div>

          <aside className="space-y-4" aria-label="Certification details">
            <div className="rounded-xl border p-4">
              <h2 className="text-sm font-semibold">Issuing Organization</h2>
              <div className="mt-2 text-base text-muted-foreground">{cert.issuer}</div>
            </div>

            {cert.date && (
              <div className="rounded-xl border p-4">
                <h2 className="text-sm font-semibold">Date Issued</h2>
                <div className="mt-2 text-base text-muted-foreground">{cert.date}</div>
              </div>
            )}

            {cert.credentialId && (
              <div className="rounded-xl border p-4">
                <h2 className="text-sm font-semibold">Credential ID</h2>
                <div className="mt-2 break-all font-mono text-sm text-muted-foreground">{cert.credentialId}</div>
              </div>
            )}

            {relatedProject && (
              <div className="rounded-xl border p-4">
                <h2 className="text-sm font-semibold">Related Project</h2>
                <div className="mt-2">
                  <Link
                    to={`/project/${relatedProject.slug}`}
                    className="inline-flex min-h-11 items-center text-primary-text underline underline-offset-4"
                  >
                    {relatedProject.title}
                    <ArrowUpRight className="ml-1 h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>

        <div className="mt-8">
          <Button asChild className="min-h-11">
            <Link to="/#certificates">Back to certifications</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
};

export default CertView;
