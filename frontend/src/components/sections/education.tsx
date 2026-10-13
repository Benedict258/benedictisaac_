import { Award, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { awards, education } from "@/data/education";

export function EducationSection() {
  return (
    <section id="education" className="py-20 sm:py-24">
      <div className="container space-y-8">
        <div className="space-y-3">
          <Badge variant="outline" className="w-fit">
            Education
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">Education</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-background/85 p-6 shadow-xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3 text-primary-text">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold">{education.degree}</h3>
            </div>
            <p className="mt-4 text-base text-foreground">{education.institution}</p>
            <p className="text-base text-muted-foreground">
              {education.location} - {education.period}
            </p>
          </div>
          {awards.map((award) => (
            <div key={award.title} className="rounded-2xl border bg-background/85 p-6 shadow-xl backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3 text-primary-text">
                  <Award className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold">{award.title}</h3>
              </div>
              <p className="mt-4 text-base text-muted-foreground">{award.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
