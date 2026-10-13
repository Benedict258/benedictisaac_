import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = (theme ?? resolvedTheme) === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-11 w-11 rounded-full border"
    >
      <Sun className="h-5 w-5 transition-opacity duration-200 dark:opacity-0" />
      <Moon className="absolute h-5 w-5 opacity-0 transition-opacity duration-200 dark:opacity-100" />
    </Button>
  );
}
