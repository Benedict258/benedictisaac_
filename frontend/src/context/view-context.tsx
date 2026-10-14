import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_VIEW, VIEWS, type View } from "@/data/view";

const STORAGE_KEY = "portfolio-view";

type ViewContextValue = {
  view: View;
  setView: (view: View) => void;
};

const ViewContext = createContext<ViewContextValue | undefined>(undefined);

const readStoredView = (): View => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (VIEWS.some((v) => v.value === stored)) return stored as View;
  } catch {
    // storage unavailable
  }
  return DEFAULT_VIEW;
};

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<View>(readStoredView);

  const setView = useCallback((next: View) => {
    setViewState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable
    }
  }, []);

  const value = useMemo(() => ({ view, setView }), [view, setView]);
  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("useView must be used inside ViewProvider");
  return ctx;
}
