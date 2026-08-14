import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import certifications from "@/data/certifications";
import projects from "@/data/projects";

const CertView = () => {
  const { slug } = useParams();
  const cert = certifications.find((c) => c.slug === slug);

  if (!cert) {
    return (
      <div className="container py-20">
        <h2 className="text-2xl font-semibold">Certification not found</h2>
        <p className="text-muted-foreground">No certification matches the requested URL.</p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedProject = cert.relatedProject
    ? projects.find((p) => p.slug === cert.relatedProject)
    : null;

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
          <h1 className="text-3xl font-bold">{cert.title}</h1>
          <p className="text-muted-foreground mt-2">{cert.issuer}</p>
          <div className="mt-3 flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {cert.date}
            </Badge>
            {cert.credentialId && (
              <Badge variant="outline" className="text-xs">
                Credential ID: {cert.credentialId}
              </Badge>
            )}
          </div>
        </div>
        {cert.verificationLink && (
          <Button asChild variant="outline" size="sm">
            <a href={cert.verificationLink} target="_blank" rel="noreferrer">
              Verify <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {cert.image && (
            <div>
              <h3 className="text-lg font-semibold">Certificate</h3>
              <div className="mt-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="rounded-md border max-w-full"
                />
              </div>
            </div>
          )}

          {cert.description && (
            <div>
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-muted-foreground mt-2 whitespace-pre-wrap">
                {cert.description}
              </p>
            </div>
          )}

          {!cert.description && (
            <div>
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-muted-foreground mt-2">
                Details for this certification will be available soon.
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border p-4">
            <h4 className="text-sm font-semibold">Issuing Organization</h4>
            <div className="mt-2 text-muted-foreground">{cert.issuer}</div>
          </div>

          <div className="rounded-xl border p-4">
            <h4 className="text-sm font-semibold">Date Issued</h4>
            <div className="mt-2 text-muted-foreground">{cert.date}</div>
          </div>

          {cert.credentialId && (
            <div className="rounded-xl border p-4">
              <h4 className="text-sm font-semibold">Credential ID</h4>
              <div className="mt-2 text-muted-foreground font-mono text-sm">
                {cert.credentialId}
              </div>
            </div>
          )}

          {relatedProject && (
            <div className="rounded-xl border p-4">
              <h4 className="text-sm font-semibold">Related Project</h4>
              <div className="mt-2">
                <Button asChild variant="link" size="sm" className="p-0 h-auto">
                  <Link to={`/project/${relatedProject.slug}`}>
                    {relatedProject.title}
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
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

export default CertView;
