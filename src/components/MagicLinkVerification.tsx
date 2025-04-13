import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../services/authService";
// import { masterPasswordService } from "../services/masterPasswordService";

export function MagicLinkVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Only proceed with verification if we have magic_credential in the URL
        if (!location.search.includes("magic_credential")) {
          navigate("/auth");
          return;
        }

        // Add a minimum delay to show the verifying state
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Attempt verification
        const response = await authService.verifyMagicLink();

        if (response.success) {
          setVerificationStatus("success");

          // Add a small delay before checking master password and redirecting
          await new Promise((resolve) => setTimeout(resolve, 500));

          try {
            // // Check if user has a master password
            // const hasMasterPassword =
            //   await masterPasswordService.hasMasterPassword();

            // Set the authentication status
            localStorage.setItem("isAuthenticated", "true");

            // Clear any existing master password verification
            localStorage.removeItem("masterPasswordVerified");

            navigate("/dashboard");
          } catch (err) {
            console.error("Error checking master password:", err);

            localStorage.setItem("isAuthenticated", "true");
            navigate("/dashboard");
          }
        } else {
          setVerificationStatus("error");
          setError(response.error || "Verification failed");
        }
      } catch (err) {
        console.error("Verification error:", err);

        // Check if we're actually authenticated despite the error
        const isLoggedIn = await authService.isLoggedIn();
        if (isLoggedIn) {
          setVerificationStatus("success");
          localStorage.setItem("isAuthenticated", "true");
          navigate("/dashboard");
          return;
        }

        setVerificationStatus("error");
        setError("An error occurred during verification");
      }
    };

    verifyAuth();
  }, [navigate, location]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-mesh p-4">
      <div className="w-full max-w-md">
        <div className="auth-card">
          {verificationStatus === "verifying" && (
            <div className="text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-8 w-8 animate-spin text-teal"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <h2 className="text-h3 mb-2">Verifying your email...</h2>
              <p className="text-muted-foreground">
                Please wait while we verify your login.
              </p>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="text-center">
              <div className="mb-4 text-teal">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-h3 mb-2">Email Verified!</h2>
              <p className="text-muted-foreground">
                Redirecting you to secure your vault...
              </p>
            </div>
          )}

          {verificationStatus === "error" && (
            <div className="text-center">
              <div className="mb-4 text-destructive">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-h3 mb-2">Verification Failed</h2>
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={() => navigate("/auth")}
                className="neo-button w-full py-3">
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
