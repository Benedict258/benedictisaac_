import type { PlanSlug } from "@/data/pricing";

export interface LeadPayload {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  selectedPlan: PlanSlug;
  projectSummary?: string;
  budgetRange?: string;
  preferredTimeline?: string;
  additionalFields: Record<string, string | undefined>;
  attachments?: FileList;
}

const buildSummary = (payload: LeadPayload) => {
  const lines = [
    `Selected plan: ${payload.selectedPlan}`,
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : undefined,
    payload.company ? `Company: ${payload.company}` : undefined,
    payload.projectSummary
      ? `Project summary: ${payload.projectSummary}`
      : undefined,
    payload.budgetRange ? `Budget: ${payload.budgetRange}` : undefined,
    payload.preferredTimeline
      ? `Preferred timeline: ${payload.preferredTimeline}`
      : undefined,
  ]
    .filter(Boolean)
    .join("\n");

  const extras = Object.entries(payload.additionalFields)
    .filter(([, value]) => value && value.trim().length > 0)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  return [lines, extras].filter(Boolean).join("\n\n");
};

export async function submitLead(payload: LeadPayload) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  if (!accessKey) {
    throw new Error("Missing VITE_WEB3FORMS_KEY for lead submissions.");
  }

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append(
    "subject",
    `[New Lead] ${payload.selectedPlan.toUpperCase()} – ${payload.fullName}`
  );
  formData.append("from_name", payload.fullName);
  formData.append("from_email", payload.email);
  formData.append("reply_to", payload.email);
  formData.append("message", buildSummary(payload));
  formData.append(
    "autoreply",
    `Hi ${payload.fullName},\n\nThanks for sharing the ${payload.selectedPlan} plan details. We'll review and reach out within 24-48 hours.\n\n- Benedict`
  );

  if (payload.attachments && payload.attachments.length > 0) {
    Array.from(payload.attachments).forEach((file) => {
      formData.append("attachments", file, file.name);
    });
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || "Unable to submit lead details.");
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Submission failed.");
  }

  return result;
}
