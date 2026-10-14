import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/ui/timeline";
import { useView } from "@/context/view-context";
import { experience, type ExperienceEntry, type ExperienceGroup } from "@/data/experience";
import { sortForView } from "@/data/view";

const toTimeline = (entries: ExperienceEntry[], mechatronics: boolean) =>
  entries.map((item) => {
    const bullets = mechatronics && item.bulletsMechatronics ? item.bulletsMechatronics : item.bullets;
    return {
      title: item.period,
      content: (
        <div className="space-y-3">
          <div>
            <h4 className="text-xl font-semibold text-foreground">{item.role}</h4>
            <p className="text-base text-muted-foreground">
              {item.company}
              {item.location && ` - ${item.location}`}
            </p>
          </div>
          {item.description && <p className="max-w-2xl text-base text-muted-foreground">{item.description}</p>}
          {bullets && (
            <ul className="max-w-2xl list-disc space-y-1 pl-5 text-base text-muted-foreground">
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      ),
    };
  });

export function ExperienceSection() {
  const { view } = useView();
  const mechatronics = view === "mechatronics";

  const entries = (group: ExperienceGroup) =>
    sortForView(
      experience.filter((e) => e.group === group),
      (e) => e.order,
      view === "all" ? "software" : view,
    );

  return (
    <section id="experience" className="bg-background py-12">
      <div className="container space-y-2">
        <Badge variant="outline" className="w-fit">
          Experience
        </Badge>
        <h2 className="text-3xl font-bold md:text-4xl">Experience</h2>
      </div>
      <Timeline
        titleAs="h3"
        title="Work"
        subtitle="Roles at companies and organisations."
        data={toTimeline(entries("work"), mechatronics)}
      />
      <Timeline
        titleAs="h3"
        title="Leadership & Community"
        subtitle="Technical leadership, programs and community roles."
        data={toTimeline(entries("leadership"), mechatronics)}
      />
    </section>
  );
}
