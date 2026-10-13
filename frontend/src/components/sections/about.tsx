import { lazy, Suspense } from "react";
import { FileDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useView } from "@/context/view-context";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { headlines, resumes, site, socials, summaries, type SocialLink } from "@/data/site";

const AnimatedGridPattern = lazy(() =>
  import("@/components/ui/animated-grid-pattern").then((module) => ({
    default: module.AnimatedGridPattern,
  })),
);

const iconFor = (icon: SocialLink["icon"]) => {
  switch (icon) {
    case "github":
      return <Github className="mr-2 h-4 w-4" aria-hidden="true" />;
    case "linkedin":
      return <Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />;
    case "twitter":
      return <Twitter className="mr-2 h-4 w-4" aria-hidden="true" />;
    default:
      return (
        <img
          src={`/${icon}.${icon === "medium" ? "png" : "svg"}`}
          alt=""
          width={16}
          height={16}
          className="mr-2 h-4 w-4"
        />
      );
  }
};

export function AboutSection() {
  const { view } = useView();

  // Counts come from the site data, not hand-typed numbers.
  const stats = [
    { value: projects.length, label: "Projects" },
    { value: certifications.length, label: "Certifications" },
    { value: experience.length, label: "Roles" },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <Suspense fallback={null}>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.08}
          duration={3}
          repeatDelay={1}
          className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        />
      </Suspense>
      <div className="container relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Badge variant="outline" className="w-fit">
            About
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">{headlines[view].tagline}</h2>
          <p className="max-w-[68ch] text-lg leading-relaxed text-muted-foreground">{summaries[view]}</p>
          <div className="flex flex-wrap gap-3">
            {resumes.map((resume) => (
              <Button asChild key={resume.href} size="sm" className="min-h-11">
                <a href={resume.href} download>
                  <FileDown className="mr-2 h-4 w-4" aria-hidden="true" />
                  {resume.label}
                </a>
              </Button>
            ))}
            <Button asChild size="sm" variant="outline" className="min-h-11">
              <a href={`mailto:${site.email}`}>
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Email
              </a>
            </Button>
          </div>
          <ul className="flex list-none flex-wrap gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <Button asChild variant="ghost" size="sm" className="min-h-11">
                  <a href={social.href} target="_blank" rel="noreferrer">
                    {iconFor(social.icon)}
                    {social.label}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border bg-background/70 p-6 shadow-xl backdrop-blur-xl sm:p-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/pic1-small.webp" alt="Portrait of Benedict Isaac" />
              <AvatarFallback>BI</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-semibold">{site.name}</p>
              <p className="text-base text-muted-foreground">{site.location}</p>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border px-3 py-3">
                <dd className="text-2xl font-semibold">{stat.value}</dd>
                <dt className="text-base text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
