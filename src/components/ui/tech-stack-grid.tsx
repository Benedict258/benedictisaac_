import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TechStackGridProps = {
  items: string[];
  className?: string;
};

export function TechStackGrid({ items, className }: TechStackGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item}
          className="flex items-center justify-between rounded-xl border bg-background/70 px-3 py-2 shadow-sm"
        >
          <span className="text-sm font-medium">{item}</span>
          <Badge variant="outline" className="text-[10px]">
            tool
          </Badge>
        </div>
      ))}
    </div>
  );
}
