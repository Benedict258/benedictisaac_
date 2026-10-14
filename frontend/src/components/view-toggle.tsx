import { cn } from "@/lib/utils";
import { useView } from "@/context/view-context";
import { VIEWS } from "@/data/view";

export function ViewToggle({ className }: { className?: string }) {
  const { view, setView } = useView();

  return (
    <div
      role="group"
      aria-label="Portfolio view"
      className={cn("inline-flex items-center rounded-full border bg-background/80 p-1", className)}
    >
      {VIEWS.map((item) => {
        const active = item.value === view;
        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={active}
            onClick={() => setView(item.value)}
            className={cn(
              "min-h-11 rounded-full px-4 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
