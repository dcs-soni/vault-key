import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await authService.isLoggedIn();
      setIsAuthenticated(isLoggedIn);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen bg-gradient-mesh">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="auth-card text-center max-w-md w-full mx-auto">
            <div className="mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal mx-auto"></div>
            </div>
            <h2 className="text-h3 mb-2">Verifying Access</h2>
            <p className="text-muted-foreground">
              Please wait while we verify your authentication...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to auth page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
