import { lazy, Suspense } from "react";
import { Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToolsMarquee } from "@/components/ui/integration-hero";
import { LogoCloud as TechLogoCloud } from "@/components/ui/logo-cloud-4";
import { LogoCloud as CommunitiesLogoCloud } from "@/components/ui/logo-cloud-2";
import { WorldMap } from "@/components/ui/world-map";
import { site } from "@/data/site";
import { techSlugs, toolLogos, worldMapRoutes } from "@/data/tools";

export function ToolsAndCommunity() {
  return (
    <>
      <section id="tech" className="py-20">
        <div className="container space-y-4">
          <Badge variant="outline" className="w-fit">
            Tools
          </Badge>
          <h2 className="flex flex-wrap items-center gap-3 text-3xl font-bold md:text-4xl">
            <span>Tools & technologies I work with</span>
            <ToolsMarquee slugs={techSlugs} className="min-w-[220px]" />
          </h2>
        </div>
      </section>

      <section id="technologies" className="pb-20">
        <div className="container">
          <Suspense fallback={<div className="h-32 rounded-3xl border border-dashed border-border/60" />}>
            <TechLogoCloud logos={toolLogos} />
          </Suspense>
        </div>
      </section>

      <section id="expertise" className="bg-muted/20 py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <Badge variant="outline" className="w-fit">
              Remote work
            </Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Working across time zones</h2>
            <p className="text-lg text-muted-foreground">
              I collaborate across time zones, delivering products that scale and perform globally.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" size="sm" className="min-h-11">
                <a href={`mailto:${site.email}`}>
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  Get in touch
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="min-h-11">
                <a href={site.whatsapp} target="_blank" rel="noreferrer">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  Schedule call
                </a>
              </Button>
            </div>
          </div>
          <Suspense fallback={<div className="h-[320px] rounded-3xl border border-dashed border-border/60" />}>
            <div role="img" aria-label="World map with connection lines from Minna, Nigeria">
              <WorldMap dots={worldMapRoutes} lineColor="hsl(var(--primary))" className="shadow-xl" />
            </div>
          </Suspense>
        </div>
      </section>

      <section id="communities" className="py-20">
        <div className="container space-y-6 text-center">
          <Badge variant="outline" className="mx-auto w-fit">
            Communities & Clubs
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">Communities & clubs</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Programs and communities I take part in.
          </p>
        </div>
        <div className="container mt-10">
          <Suspense fallback={<div className="h-24 rounded-3xl border border-dashed border-border/60" />}>
            <CommunitiesLogoCloud className="rounded-3xl border border-border/60" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
