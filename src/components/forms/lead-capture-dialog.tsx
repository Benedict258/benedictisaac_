import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { type PlanSlug, type PricingPlan } from "@/data/pricing";
import { submitLead } from "@/lib/lead-submission";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: PricingPlan;
  trigger: "get-started" | "contact";
}

export interface LeadFormValues {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  projectSummary?: string;
  budgetRange?: string;
  preferredTimeline?: string;
  startupCoreProblem?: string;
  startupCurrentAssets?: string;
  startupDeliverables?: string;
  startupTeamSize?: string;
  startupFeedbackPlan?: string;
  growthProjectScope?: string;
  growthTechStack?: string;
  growthIntegrations?: string;
  growthDataNeeds?: string;
  growthUsers?: string;
  growthPainPoints?: string;
  enterpriseOverview?: string;
  enterpriseArchitecture?: string;
  enterpriseIntegrations?: string;
  enterpriseCompliance?: string;
  enterpriseDeliverables?: string;
  enterpriseTimeline?: string;
  enterpriseStakeholders?: string;
  enterpriseBudget?: string;
  customProjectType?: string;
  customProjectGoals?: string;
  customRequirements?: string;
  customPreferredTools?: string;
  customTimeline?: string;
  customCollaboration?: string;
  customBudget?: string;
  privacyConsent: boolean;
  attachments?: FileList;
  botField?: string;
  selectedPlan?: PlanSlug;
}

type TextFieldName = {
  [K in keyof LeadFormValues]: LeadFormValues[K] extends string | undefined ? K : never;
}[keyof LeadFormValues];

interface FieldConfig {
  name: TextFieldName;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "textarea" | "date";
  placeholder?: string;
  required?: boolean;
  description?: string;
  className?: string;
}

const generalFields: FieldConfig[] = [
  { name: "fullName", label: "Full Name", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "company", label: "Company / Startup Name" },
  {
    name: "projectSummary",
    label: "Project Summary / Description",
    type: "textarea",
    placeholder: "Briefly describe what you need built.",
    required: true,
    className: "md:col-span-2",
  },
  {
    name: "budgetRange",
    label: "Budget Range (optional, required for Enterprise)",
    placeholder: "$3k - $10k per sprint",
  },
  {
    name: "preferredTimeline",
    label: "Preferred Timeline",
    placeholder: "e.g. Kickoff in 2 weeks",
  },
];

const planFieldMap: Record<PlanSlug, FieldConfig[]> = {
  startup: [
    { name: "startupCoreProblem", label: "Core Problem / Idea", type: "textarea", required: true },
    { name: "startupCurrentAssets", label: "Current Assets", type: "textarea", placeholder: "Links to prototypes, demos, docs", required: true },
    { name: "startupDeliverables", label: "Expected Deliverables", type: "textarea", required: true },
    { name: "startupTeamSize", label: "Team Size", type: "number", required: true },
    { name: "startupFeedbackPlan", label: "Feedback / Testing Plan", type: "textarea", required: true },
  ],
  growth: [
    { name: "growthProjectScope", label: "Project Scope / Objectives", type: "textarea", required: true },
    { name: "growthTechStack", label: "Existing Tech Stack", type: "textarea", required: true },
    { name: "growthIntegrations", label: "Integrations Needed", type: "textarea", required: true },
    { name: "growthDataNeeds", label: "Data / AI Needs", type: "textarea", required: true },
    { name: "growthUsers", label: "Users / Audience", type: "textarea", required: true },
    { name: "growthPainPoints", label: "Current Pain Points", type: "textarea", required: true },
  ],
  enterprise: [
    { name: "enterpriseOverview", label: "Project Overview & Objectives", type: "textarea", required: true },
    { name: "enterpriseArchitecture", label: "Current Architecture / Systems", type: "textarea", required: true },
    { name: "enterpriseIntegrations", label: "Critical Integrations", type: "textarea", required: true },
    { name: "enterpriseCompliance", label: "Compliance / Security Requirements", type: "textarea", required: true },
    { name: "enterpriseDeliverables", label: "Expected Deliverables", type: "textarea", required: true },
    { name: "enterpriseTimeline", label: "Timeline / Milestones", type: "textarea", required: true },
    { name: "enterpriseStakeholders", label: "Stakeholders & Roles", type: "textarea", required: true },
    { name: "enterpriseBudget", label: "Budget Range", type: "text", required: true },
  ],
  custom: [
    { name: "customProjectType", label: "Project Type", placeholder: "Portfolio, landing page, AI workflow...", required: true },
    { name: "customProjectGoals", label: "Project Goals", type: "textarea", required: true },
    { name: "customRequirements", label: "Custom Requirements", type: "textarea", required: true },
    { name: "customPreferredTools", label: "Preferred Tools / Stack", type: "textarea" },
    { name: "customTimeline", label: "Timeline", placeholder: "Launch date or timeframe", required: true },
    { name: "customCollaboration", label: "Contact / Collaboration Preferences", type: "textarea", required: true },
    { name: "customBudget", label: "Budget (optional)" },
  ],
};

const defaultValues: LeadFormValues = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  projectSummary: "",
  budgetRange: "",
  preferredTimeline: "",
  startupCoreProblem: "",
  startupCurrentAssets: "",
  startupDeliverables: "",
  startupTeamSize: "",
  startupFeedbackPlan: "",
  growthProjectScope: "",
  growthTechStack: "",
  growthIntegrations: "",
  growthDataNeeds: "",
  growthUsers: "",
  growthPainPoints: "",
  enterpriseOverview: "",
  enterpriseArchitecture: "",
  enterpriseIntegrations: "",
  enterpriseCompliance: "",
  enterpriseDeliverables: "",
  enterpriseTimeline: "",
  enterpriseStakeholders: "",
  enterpriseBudget: "",
  customProjectType: "",
  customProjectGoals: "",
  customRequirements: "",
  customPreferredTools: "",
  customTimeline: "",
  customCollaboration: "",
  customBudget: "",
  privacyConsent: false,
  botField: "",
  selectedPlan: "startup",
};

export const LeadCaptureDialog = ({ open, onOpenChange, plan, trigger }: LeadCaptureDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<LeadFormValues>({ defaultValues });

  const planFields = planFieldMap[plan.slug];

  useEffect(() => {
    form.reset({ ...defaultValues, selectedPlan: plan.slug, privacyConsent: false });
    setIsSubmitted(false);
  }, [plan.slug, open, form]);

  const onSubmit = async (values: LeadFormValues) => {
    if (values.botField) {
      return;
    }

    if (plan.slug === "enterprise" && !values.budgetRange && !values.enterpriseBudget) {
      form.setError("budgetRange", { message: "Budget range is required for Enterprise." });
      return;
    }

    if (!values.privacyConsent) {
      form.setError("privacyConsent", { message: "Please agree to the privacy policy." });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLead({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        company: values.company,
        selectedPlan: plan.slug,
        projectSummary: values.projectSummary,
        budgetRange: values.enterpriseBudget || values.budgetRange,
        preferredTimeline: values.preferredTimeline,
        attachments: values.attachments,
        additionalFields: planFields.reduce<Record<string, string | undefined>>((acc, field) => {
          const value = values[field.name];
          acc[field.label] = value || undefined;
          return acc;
        }, {}),
      });

      setIsSubmitted(true);
      toast({
        title: "Thank you!",
        description: "We received your details. Check your email for confirmation.",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FieldConfig) => (
    <FormField
      key={field.name}
      name={field.name}
      control={form.control}
      rules={{ required: field.required }}
      render={({ field: controller }) => {
        const stringValue = controller.value ?? "";

        return (
          <FormItem className={field.className}>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              {field.type === "textarea" ? (
                <Textarea
                  placeholder={field.placeholder}
                  {...controller}
                  value={stringValue}
                />
              ) : (
                <Input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  {...controller}
                  value={stringValue}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Get started — {plan.name}</DialogTitle>
          <Badge variant="outline" className="w-fit text-xs uppercase tracking-[0.35em]">
            {plan.slug}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {trigger === "contact"
              ? "Share how you prefer to collaborate and any immediate blockers."
              : "Provide enough context so we can scope the next sprint quickly."}
          </p>
        </DialogHeader>

        {isSubmitted ? (
          <div className="space-y-4 py-6">
            <p className="text-lg font-semibold">Thank you! We’ve received your details.</p>
            <p className="text-sm text-muted-foreground">
              Check your email for confirmation and next steps. We’ll review your submission and reach out within 24–48 hours. Need something sooner? Email benedictisaac258@gmail.com or send a WhatsApp note via wa.link/z9yfhb.
            </p>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <input type="hidden" value={plan.slug} {...form.register("selectedPlan")} />
              <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("botField")} />

              <div className="grid gap-4 md:grid-cols-2">
                {generalFields.map((field) => renderField({
                  ...field,
                  required: field.required,
                }))}
              </div>

              <div className="grid gap-4">
                {planFields.map((field) => renderField(field))}
              </div>

              <FormField
                name="attachments"
                control={form.control}
                render={({ field: controller }) => (
                  <FormItem>
                    <FormLabel>Supporting Files (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        ref={controller.ref}
                        onChange={(event) => controller.onChange(event.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="privacyConsent"
                control={form.control}
                render={({ field: controller }) => (
                  <FormItem className="rounded-md border p-3">
                    <div className="flex items-start space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={controller.value as boolean}
                          onCheckedChange={(checked) => controller.onChange(checked === true)}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I agree to the privacy policy and understand I’ll receive follow-up emails.</FormLabel>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit details"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
