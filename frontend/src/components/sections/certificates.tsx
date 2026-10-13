import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { otherCertifications, primaryCertifications, type Certification } from "@/data/certifications";

const AnimatedTestimonials = lazy(() =>
  import("@/components/ui/animated-testimonials").then((m) => ({ default: m.AnimatedTestimonials })),
);

const toCard = (cert: Certification) => ({
  quote: [cert.date ? `Issued ${cert.date}` : "", cert.credentialId ? `Credential ID ${cert.credentialId}` : ""]
    .filter(Boolean)
    .join(" • "),
  name: cert.title,
  designation: cert.issuer,
  src: cert.image ?? "",
  slug: cert.slug,
});

export function CertificatesSection() {
  return (
    <section id="certificates" className="bg-muted/20 py-20 sm:py-24">
      <div className="container space-y-8">
        <div className="space-y-3 text-center">
          <Badge variant="outline" className="mx-auto w-fit">
            Certifications
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">Certifications & trainings</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Certifications and trainings from the resumes. Select one for its details.
          </p>
        </div>
        <Suspense fallback={<div className="h-[360px] rounded-3xl border border-dashed border-border/60" />}>
          <AnimatedTestimonials testimonials={primaryCertifications.map(toCard)} />
        </Suspense>

        <div className="mx-auto max-w-4xl">
          <h3 className="text-xl font-semibold">Other certificates</h3>
          <ul className="mt-4 grid list-none gap-3 sm:grid-cols-2">
            {otherCertifications.map((cert) => (
              <li key={cert.slug}>
                <Link
                  to={`/certifications/${cert.slug}`}
                  className="flex min-h-11 flex-col rounded-xl border bg-background/85 p-4 transition-colors hover:bg-accent"
                >
                  <span className="font-medium">{cert.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {cert.issuer}
                    {cert.date && ` - ${cert.date}`}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
