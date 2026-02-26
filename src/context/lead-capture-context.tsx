import { createContext, useContext, useState, type ReactNode } from "react";

import { getPlanBySlug, type PlanSlug } from "@/data/pricing";
import { LeadCaptureDialog } from "@/components/forms/lead-capture-dialog";

export type LeadTrigger = "get-started" | "contact";

interface LeadCaptureContextValue {
  selectedPlan: PlanSlug;
  trigger: LeadTrigger;
  isOpen: boolean;
  openLeadForm: (plan: PlanSlug, trigger?: LeadTrigger) => void;
  closeLeadForm: () => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextValue | undefined>(
  undefined
);

export const LeadCaptureProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanSlug>("startup");
  const [trigger, setTrigger] = useState<LeadTrigger>("get-started");
  const [isOpen, setIsOpen] = useState(false);

  const openLeadForm = (plan: PlanSlug, nextTrigger: LeadTrigger = "get-started") => {
    setSelectedPlan(plan);
    setTrigger(nextTrigger);
    setIsOpen(true);
  };

  const closeLeadForm = () => setIsOpen(false);

  const plan = getPlanBySlug(selectedPlan);

  return (
    <LeadCaptureContext.Provider
      value={{ selectedPlan, trigger, isOpen, openLeadForm, closeLeadForm }}
    >
      {children}
      <LeadCaptureDialog
        open={isOpen}
        onOpenChange={(next) => setIsOpen(next)}
        plan={plan}
        trigger={trigger}
      />
    </LeadCaptureContext.Provider>
  );
};

export const useLeadCapture = () => {
  const context = useContext(LeadCaptureContext);

  if (!context) {
    throw new Error("useLeadCapture must be used within LeadCaptureProvider");
  }

  return context;
};
