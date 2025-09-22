import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";

// Function to get the base path for GitHub Pages and custom domains
const getBasePath = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Check for both GitHub Pages and custom domains
    if (hostname.includes('github.io') || hostname === 'ogarsh.tech') {
      return '/cattle.ai';
    }
  }
  return '';
};

// Simplified Router with base path for GitHub Pages
function AppRouter() {
  const basePath = getBasePath();
  
  return (
    <Router base={basePath}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="light" storageKey="cattle-app-theme">
          <LanguageProvider defaultLanguage="en">
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <AppRouter />
              </main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
