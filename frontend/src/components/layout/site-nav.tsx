import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ViewToggle } from "@/components/view-toggle";
import { navLinks, site } from "@/data/site";

const linkClass =
  "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="container flex items-center justify-between gap-3 py-2">
        <Link to="/" className="inline-flex min-h-11 items-center text-lg font-bold" onClick={() => setOpen(false)}>
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <Link key={item.href} to={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ViewToggle className="hidden md:inline-flex" />
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-11 w-11 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="container flex flex-col gap-1 border-t py-3 lg:hidden">
          {navLinks.map((item) => (
            <Link key={item.href} to={item.href} className={linkClass} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <ViewToggle className="mt-2 self-start md:hidden" />
        </nav>
      )}
    </header>
  );
}
