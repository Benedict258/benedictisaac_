import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Circle,
  Layers3,
  LogOut,
  Plus,
  Sparkles,
  Target,
  Trash2,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { apiUrl } from "@/lib/api";

type ProjectStatus = "plan" | "ip" | "done" | "hold";

type DayPlan = {
  focus: string;
  tag: string;
  time: string;
  learn: string[];
  projects: string[];
};

type ProjectItem = {
  name: string;
  cat: string;
  status: ProjectStatus;
  pct: number;
};

type ScholarshipItem = {
  name: string;
  deadline: string;
  status: ProjectStatus;
  notes: string;
};

type DashboardState = {
  selectedDay: number;
  immChecked: string[];
  stChecked: string[];
  morningDone: string[];
  immExtra: string[];
  stExtra: string[];
  projects: ProjectItem[];
  scholarships: ScholarshipItem[];
  dailyDone: number[];
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DAY_DATA: DayPlan[] = [
  {
    focus: "Frontend Systems",
    tag: "JS/TS/React/Next.js",
    time: "7:30–10:30",
    learn: ["JavaScript (Week A)", "TypeScript (Week B)", "React (Week C)", "Next.js (Week D)"],
    projects: ["Pathfinder.io", "Windows On America Form", "Suirify Waitlist Form"],
  },
  {
    focus: "Product Core",
    tag: "Python/C++/IoT",
    time: "7:30–10:30",
    learn: ["Python / C++", "Mechatronics & IoT", "SuiBotics", "Edge Computing"],
    projects: ["INGENIUM", "Light to Sound + Sui SDK", "My Edge Computer", "Piston & Cylinder DC Motor"],
  },
  {
    focus: "Career & Public Proof",
    tag: "GitHub/Content/Docs",
    time: "7:30–10:30",
    learn: ["GitHub Challenges", "Non/Tech post prep", "Docs to PDF → Cloud"],
    projects: [],
  },
  {
    focus: "Systems & Blockchain",
    tag: "Sui/Backend",
    time: "7:30–10:30",
    learn: ["Sui Move", "Sui Stack", "Backend Systems"],
    projects: ["Suirify", "SuiSense", "Halo Decentralized CRM AI Agent", "AiOnChain"],
  },
  {
    focus: "Build / Integration",
    tag: "Ship/Deploy/Refactor",
    time: "7:30–10:30",
    learn: ["Shipping", "Refactoring", "Integration", "Deployment", "Performance"],
    projects: ["Building an AI Model", "Fine-Tuning Models", "Devpost Badges", "Google/MS Courses", "Emerging Tech"],
  },
  {
    focus: "Leverage & Growth",
    tag: "Scholarships/Portfolio",
    time: "Flexible",
    learn: [],
    projects: ["Scholarship research", "Portfolio updates", "Meetings"],
  },
  {
    focus: "Reset",
    tag: "Review/Planning",
    time: "Light only",
    learn: ["Academic pre-read", "Weekly review", "Light planning", "VoiceNote journal update"],
    projects: [],
  },
];

const MORNING = [
  "AI/ML progress",
  "OpenCV / PyTorch basics",
  "Edge computing fundamentals",
  "Scholarship research",
  "Academic pre-read",
];

const AFTERNOON = [
  "Resume polishing",
  "Fiverr setup / optimization",
  "Upwork optimization",
  "Proposal drafting",
  "LinkedIn optimization",
  "GitHub profile cleanup",
  "Portfolio updates",
  "Application doc prep",
];

const IMM_BASE = [
  "Set up environments",
  "Read OpenClaw documentation",
  "OpenTelemetry reading",
  "Core idea refinement",
  "MVP scope definition",
  "PRD drafting",
  "Tech stack alignment",
  "Cancel subscriptions",
  "Fiverr setup (once initial)",
  "Upwork optimization (initial)",
  "LinkedIn optimization (initial)",
  "Message 3MTT Support",
];

const ST_BASE = [
  "Implement telemetry in a project",
  "DeepSurge experimentation",
  "OpenClaw experimentation",
  "Draft scholarship essays",
  "Millennial scholarship prep",
  "Prepare reusable components",
  "Build boilerplates",
  "Hackathon submission readiness",
];

const DEF_PROJECTS: ProjectItem[] = [
  { name: "Pathfinder.io", cat: "Frontend", status: "ip", pct: 30 },
  { name: "Suirify", cat: "Blockchain", status: "ip", pct: 20 },
  { name: "INGENIUM", cat: "Product Core", status: "plan", pct: 5 },
  { name: "SuiSense", cat: "Blockchain", status: "plan", pct: 0 },
  { name: "Halo CRM AI Agent", cat: "Backend/AI", status: "plan", pct: 0 },
  { name: "AiOnChain", cat: "Blockchain", status: "plan", pct: 0 },
  { name: "My Edge Computer", cat: "Hardware", status: "ip", pct: 15 },
  { name: "Light to Sound Device", cat: "Hardware", status: "plan", pct: 0 },
  { name: "Building an AI Model", cat: "AI/ML", status: "ip", pct: 10 },
];

const DEF_SCHOLARSHIPS: ScholarshipItem[] = [
  { name: "Millennial Scholarship", deadline: "TBD", status: "ip", notes: "Prep essays, gather docs" },
  { name: "3MTT Program", deadline: "Ongoing", status: "ip", notes: "Contact support re: status" },
  { name: "Google Dev Courses", deadline: "Ongoing", status: "ip", notes: "Track badge completion" },
  { name: "Microsoft Courses", deadline: "Ongoing", status: "ip", notes: "Track certification progress" },
];

const initialState = (): DashboardState => ({
  selectedDay: getTodayIndex(),
  immChecked: [],
  stChecked: [],
  morningDone: [],
  immExtra: [],
  stExtra: [],
  projects: [...DEF_PROJECTS],
  scholarships: [...DEF_SCHOLARSHIPS],
  dailyDone: [0, 0, 0, 0, 0, 0, 0],
});

function getTodayIndex() {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

function mergeLoadedState(saved: Partial<DashboardState> | null | undefined): DashboardState {
  const fallback = initialState();
  if (!saved) return fallback;

  return {
    ...fallback,
    ...saved,
    selectedDay: typeof saved.selectedDay === "number" ? saved.selectedDay : fallback.selectedDay,
    immChecked: Array.isArray(saved.immChecked) ? saved.immChecked : fallback.immChecked,
    stChecked: Array.isArray(saved.stChecked) ? saved.stChecked : fallback.stChecked,
    morningDone: Array.isArray(saved.morningDone) ? saved.morningDone : fallback.morningDone,
    immExtra: Array.isArray(saved.immExtra) ? saved.immExtra : fallback.immExtra,
    stExtra: Array.isArray(saved.stExtra) ? saved.stExtra : fallback.stExtra,
    projects: Array.isArray(saved.projects) && saved.projects.length ? saved.projects : fallback.projects,
    scholarships:
      Array.isArray(saved.scholarships) && saved.scholarships.length ? saved.scholarships : fallback.scholarships,
    dailyDone: Array.isArray(saved.dailyDone) && saved.dailyDone.length === 7 ? saved.dailyDone : fallback.dailyDone,
  };
}

const statusLabel = (status: ProjectStatus) => {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium";
  if (status === "ip") return <span className={`${base} bg-violet-500/15 text-violet-300`}>In progress</span>;
  if (status === "plan") return <span className={`${base} bg-sky-500/15 text-sky-300`}>Planning</span>;
  if (status === "done") return <span className={`${base} bg-emerald-500/15 text-emerald-300`}>Done</span>;
  return <span className={`${base} bg-amber-500/15 text-amber-300`}>On hold</span>;
};

const cycleStatus = (status: ProjectStatus): ProjectStatus => {
  const order: ProjectStatus[] = ["plan", "ip", "done", "hold"];
  return order[(order.indexOf(status) + 1) % order.length];
};

const storageNumber = (value: number) => (Number.isFinite(value) ? value : 0);

const Dashboard = () => {
  const { toast } = useToast();
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [state, setState] = useState<DashboardState>(initialState);
  const [dashboardLoaded, setDashboardLoaded] = useState(false);
  const [savingState, setSavingState] = useState(false);
  const saveTimeoutRef = useRef<number | null>(null);

  const fetchWithAuth = async (
    path: string,
    init?: RequestInit,
    options: { handleUnauthorized?: boolean } = {},
  ) => {
    const { handleUnauthorized = true } = options;
    const res = await fetch(apiUrl(path), {
      credentials: "include",
      ...init,
    });

    if (res.status === 401 && handleUnauthorized) {
      setAuthenticated(false);
      setAuthChecked(true);
      setAuthError("Your session has expired. Please sign in again.");
    }

    return res;
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetchWithAuth("/api/auth/me", undefined, { handleUnauthorized: false });
        if (!res.ok) {
          setAuthenticated(false);
          return;
        }
        const data = await res.json();
        setAuthenticated(Boolean(data?.authenticated));
      } catch {
        setAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!authenticated) {
      setDashboardLoaded(false);
      return;
    }

    let cancelled = false;

    const loadDashboard = async () => {
      try {
        const res = await fetchWithAuth("/api/admin/dashboard-state");
        if (!res.ok) {
          throw new Error("Could not load dashboard state.");
        }
        const data = await res.json();
        if (!cancelled && data?.state) {
          setState(mergeLoadedState(data.state));
        }
      } catch (error) {
        if (!cancelled) {
          toast({
            title: "Sync error",
            description: error instanceof Error ? error.message : "Dashboard state could not be loaded.",
            variant: "destructive",
          });
        }
      } finally {
        if (!cancelled) {
          setDashboardLoaded(true);
        }
      }
    };

    loadDashboard();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated || !dashboardLoaded) return;

    if (saveTimeoutRef.current) {
      window.clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = window.setTimeout(async () => {
      setSavingState(true);
      try {
        const res = await fetchWithAuth("/api/admin/dashboard-state", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state }),
        });

        if (!res.ok) {
          throw new Error("Could not save dashboard state.");
        }
      } catch {
        toast({
          title: "Sync error",
          description: "Dashboard changes could not be saved to the database.",
          variant: "destructive",
        });
      } finally {
        setSavingState(false);
      }
    }, 600);

    return () => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, dashboardLoaded, state]);

  const allImm = useMemo(() => [...IMM_BASE, ...state.immExtra], [state.immExtra]);
  const allSt = useMemo(() => [...ST_BASE, ...state.stExtra], [state.stExtra]);
  const todayIndex = getTodayIndex();
  const activeDay = DAY_DATA[state.selectedDay] ?? DAY_DATA[todayIndex];
  const chartTotal = Math.max(1, allImm.length + allSt.length);
  const todayQueueDone = state.immChecked.length + state.stChecked.length;

  const chartData = useMemo(
    () =>
      DAYS.map((day, idx) => ({
        day,
        value: Math.min(100, Math.round((storageNumber(state.dailyDone[idx]) / chartTotal) * 100)),
      })),
    [chartTotal, state.dailyDone],
  );

  const handleLogin = async () => {
    setAuthError("");
    const res = await fetchWithAuth(
      "/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      },
      { handleUnauthorized: false },
    );

    if (!res.ok) {
      setAuthError("Authentication failed.");
      return;
    }

    setAuthenticated(true);
    setPasscode("");
  };

  const handleLogout = async () => {
    await fetchWithAuth("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
    setDashboardLoaded(false);
  };

  const toggleQueueItem = (type: "imm" | "st", item: string) => {
    setState((prev) => {
      const key = type === "imm" ? "immChecked" : "stChecked";
      const current = prev[key];
      const nextChecked = current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item];
      const nextState = { ...prev, [key]: nextChecked } as DashboardState;
      const nextTotal = nextState.immChecked.length + nextState.stChecked.length;
      const nextDailyDone = [...nextState.dailyDone];
      nextDailyDone[getTodayIndex()] = nextTotal;
      return { ...nextState, dailyDone: nextDailyDone };
    });
  };

  const toggleMorning = (topic: string) => {
    setState((prev) => {
      const nextDone = prev.morningDone.includes(topic)
        ? prev.morningDone.filter((entry) => entry !== topic)
        : [...prev.morningDone, topic];
      return { ...prev, morningDone: nextDone };
    });
  };

  const addTask = (type: "imm" | "st") => {
    const label = window.prompt("New task:");
    if (!label || !label.trim()) return;

    setState((prev) => {
      if (type === "imm") {
        return { ...prev, immExtra: [...prev.immExtra, label.trim()] };
      }
      return { ...prev, stExtra: [...prev.stExtra, label.trim()] };
    });
  };

  const deleteTask = (type: "imm" | "st", item: string) => {
    setState((prev) => {
      const extraKey = type === "imm" ? "immExtra" : "stExtra";
      const checkedKey = type === "imm" ? "immChecked" : "stChecked";
      return {
        ...prev,
        [extraKey]: prev[extraKey].filter((entry) => entry !== item),
        [checkedKey]: prev[checkedKey].filter((entry) => entry !== item),
      } as DashboardState;
    });
  };

  const addProject = () => {
    const name = window.prompt("Project name:");
    if (!name || !name.trim()) return;
    const cat = window.prompt("Category (e.g. Frontend, Blockchain, AI/ML):") || "Other";

    setState((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: name.trim(), cat: cat.trim(), status: "plan", pct: 0 }],
    }));
  };

  const updateProject = (index: number, next: Partial<ProjectItem>) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((item, idx) => (idx === index ? { ...item, ...next } : item)),
    }));
  };

  const deleteProject = (index: number) => {
    if (!window.confirm("Remove this project?")) return;
    setState((prev) => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== index) }));
  };

  const addScholarship = () => {
    const name = window.prompt("Scholarship name:");
    if (!name || !name.trim()) return;
    const deadline = window.prompt("Deadline:") || "TBD";
    const notes = window.prompt("Notes:") || "";

    setState((prev) => ({
      ...prev,
      scholarships: [...prev.scholarships, { name: name.trim(), deadline: deadline.trim(), status: "plan", notes: notes.trim() }],
    }));
  };

  const updateScholarship = (index: number, next: Partial<ScholarshipItem>) => {
    setState((prev) => ({
      ...prev,
      scholarships: prev.scholarships.map((item, idx) => (idx === index ? { ...item, ...next } : item)),
    }));
  };

  const deleteScholarship = (index: number) => {
    if (!window.confirm("Remove this scholarship?")) return;
    setState((prev) => ({ ...prev, scholarships: prev.scholarships.filter((_, idx) => idx !== index) }));
  };

  const resetDashboard = () => {
    if (!window.confirm("Reset dashboard data?")) return;
    setState(initialState());
    toast({ title: "Dashboard reset", description: "Dashboard data was reset and synced to the database." });
  };

  const renderQueue = (type: "imm" | "st", items: string[], checked: string[], accent: string) => (
    <div className="space-y-2">
      {items.map((item) => {
        const done = checked.includes(item);
        return (
          <div
            key={item}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors ${
              done ? "border-border/40 bg-foreground/[0.03] opacity-55" : "border-border/60 bg-background/40 hover:border-border"
            }`}
            onClick={() => toggleQueueItem(type, item)}
          >
            <span className="mt-0.5 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
            <span className={`flex-1 text-sm ${done ? "line-through text-muted-foreground" : "text-foreground/80"}`}>
              {item}
            </span>
            <button
              type="button"
              className="rounded-md p-1 text-muted-foreground transition-colors hover:text-destructive"
              onClick={(event) => {
                event.stopPropagation();
                deleteTask(type, item);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );

  if (!authChecked) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="w-full max-w-md rounded-[2rem] border border-border/60 bg-background/80 p-8 shadow-2xl shadow-black/20 backdrop-blur">
          <Badge variant="outline" className="mb-4 rounded-full px-3 py-1">
            Dashboard Access
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">Enter passcode</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The dashboard uses the same protected session as the admin area.
          </p>
          <div className="mt-6 space-y-4">
            <Input
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
            />
            {authError ? <p className="text-sm text-destructive">{authError}</p> : null}
            <Button className="w-full" onClick={handleLogin}>
              Unlock Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardLoaded) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge variant="outline" className="rounded-full px-3 py-1">
              Weekly OS Dashboard
            </Badge>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">Schedules, routines, and execution</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                A personal command center for weekly planning, task flow, project tracking, and scholarship management.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm md:flex md:items-center md:gap-2">
              <CalendarDays className="h-4 w-4" />
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <Badge variant="outline" className="rounded-full border-border/60 bg-background/80 px-3 py-1 text-xs">
              {savingState ? "Saving..." : "Synced to DB"}
            </Badge>
            <Button variant="outline" onClick={handleLogout} className="rounded-full gap-2">
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Today's focus" value={DAY_DATA[todayIndex].focus} accent>
            <Sparkles className="h-4 w-4" />
          </SummaryCard>
          <SummaryCard label="Queue remaining" value={String(Math.max(0, allImm.length - state.immChecked.length))}>
            <Target className="h-4 w-4" />
          </SummaryCard>
          <SummaryCard label="Week day" value={DAYS[todayIndex]}>
            <CalendarDays className="h-4 w-4" />
          </SummaryCard>
          <SummaryCard label="Layer 2 done" value={`${todayQueueDone} / ${chartTotal}`}>
            <Layers3 className="h-4 w-4" />
          </SummaryCard>
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Weekly view</h2>
                <p className="text-sm text-muted-foreground">Select a day to inspect the evening rotation.</p>
              </div>
              <Button variant="ghost" size="sm" onClick={resetDashboard}>
                Reset data
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
              {DAYS.map((day, index) => {
                const selected = state.selectedDay === index;
                const today = todayIndex === index;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setState((prev) => ({ ...prev, selectedDay: index }))}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      selected ? "border-violet-500/60 bg-violet-500/10" : "border-border/60 bg-background/40 hover:border-border"
                    } ${today ? "ring-1 ring-violet-500/30" : ""}`}
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{day}</span>
                      {today ? <Badge className="rounded-full bg-violet-500/15 text-violet-300 hover:bg-violet-500/15">Today</Badge> : null}
                    </div>
                    <p className="text-sm font-medium leading-5 text-foreground">{DAY_DATA[index].focus}</p>
                    <div className="mt-3 inline-flex rounded-full bg-foreground/[0.04] px-2.5 py-1 text-[11px] text-muted-foreground">
                      {DAY_DATA[index].tag.split("/")[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Evening deep work</h2>
                <p className="text-sm text-muted-foreground">{DAYS[state.selectedDay]} · {activeDay.time}</p>
              </div>
              <Badge variant="outline" className="rounded-full">
                {activeDay.tag}
              </Badge>
            </div>
            <div className="mt-5 space-y-4">
              {activeDay.learn.length ? (
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Learn</p>
                  <div className="space-y-2">
                    {activeDay.learn.map((item) => (
                      <div key={item} className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background/40 px-3 py-2 text-sm text-foreground/80">
                        <ArrowRight className="h-4 w-4 text-violet-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeDay.projects.length ? (
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Projects</p>
                  <div className="space-y-2">
                    {activeDay.projects.map((item) => (
                      <div key={item} className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background/40 px-3 py-2 text-sm text-foreground/80">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Morning routine</h2>
                <p className="text-sm text-muted-foreground">Tap items to mark them complete.</p>
              </div>
              <Badge variant="outline" className="rounded-full">6:00–8:00</Badge>
            </div>
            <div className="space-y-2">
              {MORNING.map((item, index) => {
                const done = state.morningDone.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleMorning(item)}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                      done ? "border-emerald-500/30 bg-emerald-500/10" : "border-border/60 bg-background/40 hover:border-border"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                    <span className={`flex-1 text-sm ${done ? "text-emerald-300 line-through" : "text-foreground/80"}`}>
                      {index + 1}. {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Afternoon routine</h2>
                <p className="text-sm text-muted-foreground">Preparation and admin work.</p>
              </div>
              <Badge variant="outline" className="rounded-full">4:30–6:00</Badge>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {AFTERNOON.map((item) => (
                <div key={item} className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3 text-sm text-foreground/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Task queue</h2>
                <p className="text-sm text-muted-foreground">Toggle, add, or remove execution items.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Immediate execution</p>
                  <Button variant="ghost" size="sm" onClick={() => addTask("imm")}>
                    <Plus className="mr-2 h-4 w-4" /> Add task
                  </Button>
                </div>
                {renderQueue("imm", allImm, state.immChecked, "#8b5cf6")}
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Short-term</p>
                  <Button variant="ghost" size="sm" onClick={() => addTask("st")}>
                    <Plus className="mr-2 h-4 w-4" /> Add task
                  </Button>
                </div>
                {renderQueue("st", allSt, state.stChecked, "#f59e0b")}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Quick progress</h2>
                <p className="text-sm text-muted-foreground">Updated from the queue and routine actions.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Immediate tasks", total: allImm.length, done: state.immChecked.length, color: "#8b5cf6" },
                { label: "Short-term tasks", total: allSt.length, done: state.stChecked.length, color: "#22c55e" },
                { label: "Morning topics", total: MORNING.length, done: state.morningDone.length, color: "#38bdf8" },
              ].map((entry) => {
                const pct = entry.total ? Math.round((entry.done / entry.total) * 100) : 0;
                return (
                  <div key={entry.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{entry.label}</span>
                      <span className="text-foreground/80">{entry.done} / {entry.total}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: entry.color }} />
                    </div>
                  </div>
                );
              })}

              <div className="pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">Daily completion — this week</h3>
                  <Badge variant="outline" className="rounded-full">{todayQueueDone} logged today</Badge>
                </div>
                <div className="h-72 rounded-3xl border border-border/60 bg-background/40 p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 12, right: 12, bottom: 12, left: 0 }}>
                      <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#71717a" fontSize={12} />
                      <YAxis tickLine={false} axisLine={false} stroke="#71717a" fontSize={12} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip
                        contentStyle={{
                          background: "#121214",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 16,
                          color: "#f4f4f5",
                        }}
                        formatter={(value: number) => [`${value}% done`, "Tasks completed"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 4, strokeWidth: 0, fill: "#8b5cf6" }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Projects</h2>
                <p className="text-sm text-muted-foreground">Track build progress and status changes.</p>
              </div>
              <Button variant="ghost" size="sm" onClick={addProject}>
                <Plus className="mr-2 h-4 w-4" /> Add project
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {state.projects.map((project, index) => {
                const fillColor = project.status === "done" ? "#22c55e" : project.status === "ip" ? "#8b5cf6" : project.status === "hold" ? "#f59e0b" : "#38bdf8";
                return (
                  <div key={`${project.name}-${index}`} className="rounded-2xl border border-border/60 bg-background/40 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-medium text-foreground">{project.name}</h3>
                        <p className="text-xs text-muted-foreground">{project.cat}</p>
                      </div>
                      {statusLabel(project.status)}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{project.pct}%</span>
                      <span>Progress</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                      <div className="h-full rounded-full" style={{ width: `${project.pct}%`, backgroundColor: fillColor }} />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => updateProject(index, { status: cycleStatus(project.status) })}>
                        Cycle status
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => updateProject(index, { pct: Math.min(100, Math.max(0, Number(window.prompt("Progress % (0–100):", String(project.pct)) ?? project.pct))) })}>
                        Set %
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => deleteProject(index)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Scholarship tracker</h2>
                <p className="text-sm text-muted-foreground">Store deadlines, notes, and application status.</p>
              </div>
              <Button variant="ghost" size="sm" onClick={addScholarship}>
                <Plus className="mr-2 h-4 w-4" /> Add scholarship
              </Button>
            </div>
            <div className="space-y-3">
              {state.scholarships.map((scholarship, index) => (
                <div key={`${scholarship.name}-${index}`} className="rounded-2xl border border-border/60 bg-background/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-foreground">{scholarship.name}</h3>
                      <p className="text-xs text-muted-foreground">Deadline: {scholarship.deadline}</p>
                    </div>
                    {statusLabel(scholarship.status)}
                  </div>
                  <Textarea
                    value={scholarship.notes}
                    onChange={(event) => updateScholarship(index, { notes: event.target.value })}
                    className="mt-3 min-h-24"
                    placeholder="Notes"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateScholarship(index, { status: cycleStatus(scholarship.status) })}>
                      Cycle status
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => deleteScholarship(index)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-8 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-xl shadow-black/10 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Routine snapshot</h2>
              <p className="text-sm text-muted-foreground">
                {DAYS[state.selectedDay]} · {activeDay.focus} · {activeDay.time}
              </p>
            </div>
            <Badge variant="outline" className="rounded-full">
              Persisted in database
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

function SummaryCard({
  label,
  value,
  accent = false,
  children,
}: {
  label: string;
  value: string;
  accent?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-border/60 bg-background/80 p-5 shadow-xl shadow-black/10 backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        <span className={accent ? "text-violet-400" : "text-muted-foreground"}>{children}</span>
      </div>
      <p className={`text-lg font-semibold leading-7 ${accent ? "text-violet-300" : "text-foreground"}`}>{value}</p>
    </div>
  );
}

export default Dashboard;