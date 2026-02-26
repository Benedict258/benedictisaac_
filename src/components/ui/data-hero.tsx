"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Github, Linkedin, Moon, Sun } from "lucide-react";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";

export function DataHero() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = (theme ?? resolvedTheme) === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <BackgroundPaths
      title="Benedict Isaac"
      className="bg-gradient-to-b from-white via-slate-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900"
    >
      <div className="relative w-full">
        <div className="fixed right-6 top-4 z-[9999]">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className="relative h-11 w-11 rounded-full border border-white/40 bg-white/80 text-slate-900 shadow-lg backdrop-blur transition-colors dark:border-neutral-800 dark:bg-neutral-950/70 dark:text-white"
          >
            <Sun className="h-5 w-5 transition-opacity duration-200 dark:opacity-0" />
            <Moon className="absolute h-5 w-5 opacity-0 transition-opacity duration-200 dark:opacity-100" />
          </Button>
        </div>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 text-left text-slate-900 dark:text-white md:flex-row md:items-end">
        <div className="relative">
            <div className="h-60 w-60 overflow-hidden rounded-full border-4 border-white/80 bg-slate-900 shadow-2xl ring-8 ring-white/30 dark:border-neutral-900 dark:bg-neutral-900 dark:ring-neutral-900/40 md:h-72 md:w-72">
            <img
              src="/pic.png"
              alt="Benedict Isaac"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

          <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 text-center md:text-left"
        >
          <div>
              <h1 className="text-[3.25rem] font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-[4.25rem] md:text-[4.75rem]">
              Benedict Isaac
            </h1>
              <p className="mt-5 text-[1.35rem] leading-relaxed text-slate-600 dark:text-slate-200">
                Full Stack Developer | AI Engineer | Innovative Builder | Blockchain & AI Explorer | Agentic AI Builder
            </p>
          </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-base md:justify-start">
              <Button asChild size="lg" className="gap-3 text-base">
              <a href="https://github.com/Benedict258/" target="_blank" rel="noreferrer">
                  <Github className="h-5 w-5" />
                GitHub
              </a>
            </Button>
              <Button asChild variant="outline" size="lg" className="gap-3 text-base">
              <a href="https://www.linkedin.com/in/benedict-isaac-0b60a732b/" target="_blank" rel="noreferrer">
                  <Linkedin className="h-5 w-5" />
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