import { PRICING_PLANS, FEATURE_MATRIX } from "@/data/pricing";
import { useLeadCapture } from "@/context/lead-capture-context";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const { openLeadForm } = useLeadCapture();
  const primaryPlans = PRICING_PLANS.filter((plan) => plan.slug !== "custom");
  const customPlan = PRICING_PLANS.find((plan) => plan.slug === "custom");

  return (
    <div className="w-full py-16 lg:py-24">
      <div className="container space-y-8">
        <div className="grid gap-6">
          {customPlan && (
            <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-lg shadow-primary/5">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Custom lane</p>
              <h3 className="mt-2 text-2xl font-semibold">{customPlan.name}</h3>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{customPlan.price}</p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                {(() => {
                  const [before, after = ""] = customPlan.description.split("personalized offers");
                  return (
                    <p>
                      {before}
                      <span className="font-semibold">Custom personalized offers</span>
                      {after}
                    </p>
                  );
                })()}
                {customPlan.details?.map((detail) => {
                  if (detail.toLowerCase().includes("individuals")) {
                    const [beforeIndividuals, afterIndividuals = ""] = detail.split("individuals");
                    return (
                      <p key={detail}>
                        {beforeIndividuals}
                        <span className="font-semibold">individuals</span>
                        {afterIndividuals}
                      </p>
                    );
                  }
                  return <p key={detail}>{detail}</p>;
                })}
              </div>
              <div className="mt-6">
                <Button className="w-full" onClick={() => openLeadForm("custom")}>
                  Get Started
                </Button>
              </div>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-3">
            {primaryPlans.map((plan) => (
              <div
                key={plan.slug}
                className={`flex flex-col gap-4 rounded-3xl border border-border/60 bg-background/90 p-6 shadow-md ${
                  plan.slug === "growth" ? "border-primary" : ""
                }`}
              >
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  {plan.subtitle && (
                    <p className="text-sm font-medium text-muted-foreground">{plan.subtitle}</p>
                  )}
                  {plan.highlight && (
                    <p className="text-xs uppercase tracking-[0.35em] text-primary">{plan.highlight}</p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                {plan.bestFor && <p className="text-sm text-muted-foreground">{plan.bestFor}</p>}
                {plan.scope && <p className="text-sm text-muted-foreground">{plan.scope}</p>}
                <p className="text-lg font-semibold text-foreground">{plan.price}</p>
                <div className="mt-auto">
                  <Button className="w-full" onClick={() => openLeadForm(plan.slug)}>
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr>
                <th className="border-b border-border/60 px-4 py-3 font-semibold text-muted-foreground">
                  Feature
                </th>
                {primaryPlans.map((plan) => (
                  <th
                    key={`${plan.slug}-heading`}
                    className="border-b border-border/60 px-4 py-3 font-semibold text-foreground"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURE_MATRIX.map((row) => (
                <tr key={row.feature} className="border-b border-border/40 last:border-b-0">
                  <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
                  {row.values.map((value, index) => (
                    <td key={`${row.feature}-${index}`} className="px-4 py-3 text-muted-foreground">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pricing;