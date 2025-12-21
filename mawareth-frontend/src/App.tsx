import { Toaster } from "@/components/ui/toaster"; // Import Toaster component for displaying toast notifications
import { Toaster as Sonner } from "@/components/ui/sonner"; // Import Sonner as an alternative toaster component
import { TooltipProvider } from "@/components/ui/tooltip"; // Import TooltipProvider to manage tooltip state
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query client and provider for data fetching
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom"; // Import React Router components for client-side routing
import { LanguageProvider } from "@/contexts/LanguageContext"; // Import LanguageProvider for internationalization support
import { AuthProvider, useAuth } from "@/contexts/AuthContext"; // Import AuthProvider for handling user authentication state
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Import ProtectedRoute component to secure specific routes
import { Suspense, lazy, useEffect } from "react"; // Import Suspense and lazy for code-splitting and loading states
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component for loading placeholders
import { AIChatbot } from "@/components/chat/AIChatbot"; // Import AIChatbot component for the chat interface

// Lazy load pages to improve initial load performance
const Index = lazy(() => import("./pages/Index")); // Lazy load the Index page
const Calculator = lazy(() => import("./pages/Calculator")); // Lazy load the Calculator page
const About = lazy(() => import("./pages/About")); // Lazy load the About page
const Contact = lazy(() => import("./pages/Contact")); // Lazy load the Contact page
const FAQ = lazy(() => import("./pages/FAQ")); // Lazy load the FAQ page
const Pricing = lazy(() => import("./pages/Pricing")); // Lazy load the Pricing page
const Blog = lazy(() => import("./pages/Blog")); // Lazy load the Blog page
const LoanApplication = lazy(() => import("./pages/LoanApplication")); // Lazy load the LoanApplication page
const Marketplace = lazy(() => import("./pages/Marketplace")); // Lazy load the Marketplace page
const Dashboard = lazy(() => import("./pages/Dashboard")); // Lazy load the Dashboard page
const Auth = lazy(() => import("./pages/Auth")); // Lazy load the Auth page
const Finance = lazy(() => import("./pages/Finance")); // Lazy load the Finance page
const Admin = lazy(() => import("./pages/Admin")); // Lazy load the Admin page
const SubmitListing = lazy(() => import("./pages/SubmitListing")); // Lazy load the SubmitListing page
const NotFound = lazy(() => import("./pages/NotFound")); // Lazy load the NotFound page
const MerathDocs = lazy(() => import("./pages/MerathDocs")); // Lazy load the MerathDocs page
const DocumentGenerator = lazy(() => import("./pages/DocumentGenerator")); // Lazy load the DocumentGenerator page
const VotePage = lazy(() => import("./pages/VotePage")); // Lazy load the VotePage page
const PendingApproval = lazy(() => import("./pages/PendingApproval")); // Lazy load the PendingApproval page

const queryClient = new QueryClient(); // Initialize a new QueryClient instance for managing server state

// Loading Fallback component to display while lazy-loaded pages are being fetched
const PageLoader = () => (
  <div className="container mx-auto p-8 space-y-4"> {/* Container for the loader with padding and spacing */}
    <Skeleton className="h-12 w-3/4" /> {/* Skeleton for the header/title area */}
    <Skeleton className="h-64 w-full" /> {/* Skeleton for the main content area */}
    <div className="grid grid-cols-3 gap-4"> {/* Grid container for simulating multiple items */}
      <Skeleton className="h-32 w-full" /> {/* Skeleton item 1 */}
      <Skeleton className="h-32 w-full" /> {/* Skeleton item 2 */}
      <Skeleton className="h-32 w-full" /> {/* Skeleton item 3 */}
    </div>
  </div>
);

const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Global Redirect for Unverified Admins/Moderators
  useEffect(() => {
    if (isAuthenticated && user) {
      const isProtectedRole = ['admin', 'super_admin', 'moderator'].includes(user.role);
      const isPendingPage = location.pathname === '/pending-approval';

      if (isProtectedRole && !user.isVerified && !isPendingPage) {
        // Allow them to visit public pages? Or strict lockout?
        // User said "treated get a page waiting for approval" -> typically strict or at least when accessing functionality.
        // Let's enforce strict lockout for clarity, except maybe home? 
        // For now, Redirect to pending approval if they try to go anywhere else (except maybe Auth to logout).
        // Actually, let's allow them to stay on the pending page.
        navigate('/pending-approval');
      }
    }
  }, [isAuthenticated, user, navigate, location]);

  return (
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
        <Route path="/merath-docs" element={<MerathDocs />} />
        <Route path="/merath-docs/:type" element={<DocumentGenerator />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/vote/:id" element={<VotePage />} />

        {/* pending approval page */}
        <Route path="/pending-approval" element={<PendingApproval />} />

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

        <Route path="*" element={<NotFound />} />
      </Routes>
      <AIChatbot />
    </Suspense>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App; // Export the App component as the default export
