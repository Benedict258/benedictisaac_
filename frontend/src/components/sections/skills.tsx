import { lazy, Suspense } from "react";
import { Brain, Code2, Cpu, Layers, ServerCog, Users, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useView } from "@/context/view-context";
import { skillGroups, skillMatchesView, type SkillGroup } from "@/data/skills";

const AnimatedGridPattern = lazy(() =>
  import("@/components/ui/animated-grid-pattern").then((module) => ({
    default: module.AnimatedGridPattern,
  })),
);

const icons: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  layers: Layers,
  brain: Brain,
  server: ServerCog,
  cpu: Cpu,
  users: Users,
};

/** Groups that lead each view. Everything else keeps its listed order. */
const leadGroups: Record<string, string[]> = {
  mechatronics: ["Embedded & Robotics Systems", "AI & Computer Vision"],
};

export function SkillsSection() {
  const { view } = useView();
  const lead = leadGroups[view] ?? [];

  const groups = skillGroups
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skillMatchesView(skill, view)) }))
    .filter((group) => group.skills.length > 0)
    .sort((a, b) => {
      const ai = lead.indexOf(a.title);
      const bi = lead.indexOf(b.title);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

  return (
    <section id="skills" className="relative overflow-hidden py-20 sm:py-28">
      <Suspense fallback={null}>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.08}
          duration={3}
          repeatDelay={1}
          className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        />
      </Suspense>
      <div className="container relative z-10 space-y-10">
        <div className="space-y-3 text-center">
          <Badge variant="outline" className="mx-auto w-fit">
            Skills
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">Skills</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Languages, frameworks and tools, AI and embedded systems, and the competencies listed on the resumes.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => {
            const Icon = icons[group.icon];
            return (
              <div key={group.title} className="rounded-2xl border bg-background/85 p-6 shadow-xl backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3 text-primary-text">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                </div>
                <ul className="mt-6 flex list-none flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-sm font-medium text-foreground/90"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
