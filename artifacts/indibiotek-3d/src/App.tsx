import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import RnD from "@/pages/RnD";
import Lifesciences from "@/pages/Lifesciences";
import Agri from "@/pages/Agri";
import Scientific from "@/pages/Scientific";
import Services from "@/pages/Services";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorParallaxProvider } from "@/components/CursorParallax";
import { AtomCursor } from "@/components/AtomCursor";
import { useEffect } from "react";
import { useLocation } from "wouter";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/rnd" component={RnD} />
      <Route path="/lifesciences" component={Lifesciences} />
      <Route path="/agri" component={Agri} />
      <Route path="/scientific" component={Scientific} />
      <Route path="/services" component={Services} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <CursorParallaxProvider>
            <ScrollToTop />
            <Navbar />
            <main className="relative z-10">
              <Router />
            </main>
            <Footer />
            <AtomCursor />
          </CursorParallaxProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
