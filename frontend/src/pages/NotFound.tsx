import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/layout/site-layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <SiteLayout>
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
        <Button asChild className="min-h-11">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </SiteLayout>
  );
};

export default NotFound;
