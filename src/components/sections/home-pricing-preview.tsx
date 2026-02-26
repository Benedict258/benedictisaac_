import { PRICING_PLANS } from "@/data/pricing";
import { useLeadCapture } from "@/context/lead-capture-context";
import { buildDiscoveryCallUrl } from "@/lib/scheduling";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const HomePricingPreview = () => {
  const { openLeadForm } = useLeadCapture();

  const handleSchedule = (planName: string) => {
    const href = buildDiscoveryCallUrl(planName);
    if (typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="pricing-preview" className="py-24">
      <div className="container space-y-10">
        <div className="text-center space-y-3">
          <Badge variant="outline" className="mx-auto w-fit">
            Pricing Snapshot
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">Choose the runway that fits.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Startup, Growth, Enterprise, or Custom — every lane includes async collaboration, transparent scope, and rapid execution.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => (
            <div key={plan.slug} className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 p-6 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                {plan.subtitle && <p className="text-sm text-muted-foreground">{plan.subtitle}</p>}
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              {plan.details && (
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {plan.details.map((detail) => {
                    if (detail.toLowerCase().includes("individuals")) {
                      const [beforeIndividuals, afterIndividuals = ""] = detail.split("individuals");
                      return (
                        <li key={detail}>
                          {beforeIndividuals}
                          <span className="font-semibold">individuals</span>
                          {afterIndividuals}
                        </li>
                      );
                    }
                    return <li key={detail}>{detail}</li>;
                  })}
                </ul>
              )}
              {plan.bestFor && <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{plan.bestFor}</p>}
              {plan.scope && <p className="text-sm text-muted-foreground">{plan.scope}</p>}
              <p className="text-lg font-semibold">{plan.price}</p>
              <div className="mt-auto flex flex-col gap-2 sm:flex-row">
                <Button className="sm:flex-1" onClick={() => openLeadForm(plan.slug)}>
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="sm:flex-1"
                  onClick={() => handleSchedule(plan.name)}
                >
                  Schedule Discovery
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
