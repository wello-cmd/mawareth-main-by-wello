import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AIChatbot } from "@/components/AIChatbot";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Calculator = lazy(() => import("./pages/Calculator"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const LoanApplication = lazy(() => import("./pages/LoanApplication"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const Finance = lazy(() => import("./pages/Finance"));
const Admin = lazy(() => import("./pages/Admin"));
const SubmitListing = lazy(() => import("./pages/SubmitListing"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading Fallback
const PageLoader = () => (
  <div className="container mx-auto p-8 space-y-4">
    <Skeleton className="h-12 w-3/4" />
    <Skeleton className="h-64 w-full" />
    <div className="grid grid-cols-3 gap-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/auth" element={<Auth />} />

                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/finance" element={
                    <ProtectedRoute>
                      <Finance />
                    </ProtectedRoute>
                  } />
                  <Route path="/loan-application" element={
                    <ProtectedRoute>
                      <LoanApplication />
                    </ProtectedRoute>
                  } />
                  <Route path="/submit-listing" element={
                    <ProtectedRoute>
                      <SubmitListing />
                    </ProtectedRoute>
                  } />

                  {/* Admin Only Route */}
                  <Route path="/admin" element={
                    <ProtectedRoute requireAdmin>
                      <Admin />
                    </ProtectedRoute>
                  } />

                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <AIChatbot />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
