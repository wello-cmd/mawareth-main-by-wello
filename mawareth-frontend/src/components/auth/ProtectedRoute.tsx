import React from 'react'; // Import React
import { Navigate, useLocation } from 'react-router-dom'; // Import React Router hooks
import { useAuth } from '@/contexts/AuthContext'; // Import custom auth hook
import { Loader2 } from 'lucide-react'; // Import loader icon

// Define props for ProtectedRoute component
interface ProtectedRouteProps {
  children: React.ReactNode; // Child components to render if authorized
  requireAdmin?: boolean; // Flag to require admin privileges
}

// Component to protect routes from unauthorized access
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, isLoading, isAuthenticated } = useAuth(); // Get auth state
  const location = useLocation(); // Get current location

  if (isLoading) { // Show loader while checking auth state
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) { // Redirect to auth page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAdmin && !['admin', 'super_admin', 'moderator'].includes(user?.role || '')) { // Redirect to dashboard if not admin but admin is required
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>; // Render children if all checks pass
};

export default ProtectedRoute; // Export component
