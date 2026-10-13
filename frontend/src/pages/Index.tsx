import { lazy, Suspense } from "react";
import { CallToAction } from "@/components/ui/cta-3";
import { DataHero } from "@/components/ui/data-hero";
import { Feature197 } from "@/components/ui/accordion-feature-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { Seo, defaultTitle } from "@/components/seo";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { MechatronicsSection } from "@/components/sections/mechatronics";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { CertificatesSection } from "@/components/sections/certificates";
import { faqItems } from "@/data/faq";
import { site, summaries } from "@/data/site";

const ToolsAndCommunity = lazy(() =>
  import("@/components/sections/tools-and-community").then((m) => ({ default: m.ToolsAndCommunity })),
);

const Index = () => (
  <SiteLayout>
    <Seo title={defaultTitle} description={summaries.software} path="/" />
    <DataHero />
    <AboutSection />
    <SkillsSection />
    <ProjectsPreview />
    <MechatronicsSection />
    <ExperienceSection />
    <EducationSection />
    <CertificatesSection />

    <Suspense fallback={<div className="min-h-[600px]" />}>
      <ToolsAndCommunity />
    </Suspense>

    <section id="contact" className="py-20 sm:py-24">
      <div className="container space-y-10">
        <h2 className="sr-only">Contact</h2>
        <CallToAction />
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Button asChild variant="outline" size="sm" className="min-h-11">
            <a href={`mailto:${site.email}`}>
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              Email
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="min-h-11">
            <a href={site.whatsapp} target="_blank" rel="noreferrer">
              <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
              Call
            </a>
          </Button>
        </div>
      </div>
    </section>

    <section id="faq" className="bg-background">
      <div className="container mb-6 text-center">
        <Badge variant="outline" className="mx-auto w-fit">
          FAQs
        </Badge>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">Answers to common questions</h2>
      </div>
      <Feature197 features={faqItems} />
    </section>
  </SiteLayout>
);

export default Index;
