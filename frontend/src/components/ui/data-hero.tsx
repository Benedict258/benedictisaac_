"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import { useView } from "@/context/view-context";
import { headlines, site, socials } from "@/data/site";

const github = socials.find((s) => s.icon === "github")?.href;
const linkedin = socials.find((s) => s.icon === "linkedin")?.href;

export function DataHero() {
  const { view } = useView();
  const headline = headlines[view];

  return (
    <BackgroundPaths
      title={site.name}
      className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white via-slate-50 to-white dark:from-[hsl(222,47%,4%)] dark:via-[hsl(222,47%,4%)] dark:to-[hsl(222,47%,4%)]"
    >
      <div className="relative w-full py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-left text-slate-900 dark:text-white md:flex-row md:items-end md:gap-12">
          <div className="relative">
            <div className="h-44 w-44 overflow-hidden rounded-full border-4 border-white/80 bg-slate-900 shadow-2xl ring-8 ring-white/30 dark:border-neutral-900 dark:bg-neutral-900 dark:ring-neutral-900/40 sm:h-60 sm:w-60 md:h-72 md:w-72">
              <img
                src="/pic.webp"
                alt="Portrait of Benedict Isaac"
                width={300}
                height={438}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-center md:text-left"
          >
            <div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-[4.25rem] md:text-[4.75rem]">
                {site.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-200 sm:text-[1.35rem]">
                {headline.role}
              </p>
              <p className="mt-2 text-base text-slate-700 dark:text-slate-300">{headline.tagline}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-base md:justify-start">
              <Button asChild size="lg" className="min-h-11 gap-3 text-base">
                <a href={github} target="_blank" rel="noreferrer">
                  <Github className="h-5 w-5" aria-hidden="true" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-11 gap-3 text-base">
                <a href={linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </BackgroundPaths>
  );
}
