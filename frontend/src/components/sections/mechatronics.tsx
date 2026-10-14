import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { useView } from "@/context/view-context";
import { projectForView, projects } from "@/data/projects";
import { sortForView } from "@/data/view";

/** Mechatronics work, shown in every view so the nav link always lands somewhere. */
export function MechatronicsSection() {
  const { view, setView } = useView();

  const items = sortForView(
    projects.filter((p) => p.categories.includes("Mechatronics") && !p.earlier),
    (p) => ({ software: p.rank.mechatronics, mechatronics: p.rank.mechatronics }),
    "mechatronics",
  ).map((p) => projectForView(p, "mechatronics"));

  return (
    <section id="mechatronics" className="bg-muted/20 py-20 sm:py-24">
      <div className="container space-y-10">
        <div className="space-y-3">
          <Badge variant="outline" className="w-fit">
            Mechatronics
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">Mechatronics</h2>
          <p className="max-w-[68ch] text-lg text-muted-foreground">
            Embedded systems, edge computing and robotics work alongside my BEng in Mechatronics Engineering at the
            Federal University of Technology Minna.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        {view !== "mechatronics" && (
          <Button type="button" variant="outline" className="min-h-11" onClick={() => setView("mechatronics")}>
            Switch to the Mechatronics view <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        )}
        <p className="text-base text-muted-foreground">
          Related experience: <Link className="text-primary-text underline underline-offset-4" to="/#experience">Waste2Light and Next-Gen Innovators</Link>.
        </p>
      </div>
    </section>
  );
}
