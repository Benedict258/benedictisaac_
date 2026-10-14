import { lazy, Suspense, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeadCaptureProvider } from "@/context/lead-capture-context";
import { ViewProvider } from "@/context/view-context";
import { Seo } from "@/components/seo";
import Index from "./pages/Index";

// Routes other than the home page load on demand so they stay out of the first bundle.
const NotFound = lazy(() => import("./pages/NotFound"));
const PricingPage = lazy(() => import("./pages/Pricing"));
const Admin = lazy(() => import("./pages/Admin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const InvoicePublic = lazy(() => import("./pages/InvoicePublic"));
const ProjectsPage = lazy(() => import("./pages/Projects"));
const ProjectView = lazy(() => import("./pages/ProjectView"));
const CertView = lazy(() => import("./pages/CertView"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const queryClient = new QueryClient();

/** Keeps private or business pages out of search results without changing the page itself. */
const NoIndex = ({ children }: { children: ReactNode }) => (
  <>
    <Seo
      title="Benedict Isaac"
      description="Benedict Isaac, Full-Stack & Agentic AI Engineer and Mechatronics Engineering student."
      noindex
    />
    {children}
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ViewProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LeadCaptureProvider>
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <Suspense fallback={<div className="min-h-screen bg-background" />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/project/:slug" element={<ProjectView />} />
                  <Route path="/certifications/:slug" element={<CertView />} />
                  <Route path="/pricing" element={<NoIndex><PricingPage /></NoIndex>} />
                  <Route path="/admin" element={<NoIndex><Admin /></NoIndex>} />
                  <Route path="/dashboard" element={<NoIndex><Dashboard /></NoIndex>} />
                  <Route path="/invoice/:publicId" element={<NoIndex><InvoicePublic /></NoIndex>} />
                  <Route path="/blog" element={<NoIndex><Blog /></NoIndex>} />
                  <Route path="/blog/:slug" element={<NoIndex><BlogPost /></NoIndex>} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NoIndex><NotFound /></NoIndex>} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </LeadCaptureProvider>
        </TooltipProvider>
      </ViewProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
