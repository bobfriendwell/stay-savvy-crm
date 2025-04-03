
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAuthenticated(user.isLoggedIn);
    } else {
      setIsAuthenticated(false);
      toast({
        title: "請先登入",
        description: "您需要登入才能訪問此頁面",
        variant: "destructive",
      });
    }
  }, [toast]);

  if (isAuthenticated === null) {
    // Still loading
    return null;
  }

  if (!isAuthenticated) {
    // Redirect to the login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
