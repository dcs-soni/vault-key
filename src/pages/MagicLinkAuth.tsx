import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import Header from "@/components/layout/Header";
import { ArrowRight, AtSign, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";

export default function MagicLinkAuth() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_error, setError] = useState<string | null>(null);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user already has authentication status
    const authStatus = localStorage.getItem("isAuthenticated") === "true";

    if (authStatus) {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const isSignUp = location.state?.isSignUp;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.loginWithMagicLink(email);

      if (response.success) {
        setIsLinkSent(true);
      } else {
        setError(response.error || "Failed to send magic link");
      }
    } catch (err) {
      setError("An error occurred while sending the magic link");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLinkSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-mesh p-4">
        <div className="w-full max-w-md">
          <div className="auth-card">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-h3 mb-2">Check your email</h2>
              <p className="text-muted-foreground mb-4">
                We've sent a magic link to {email}. Click the link to{" "}
                {isSignUp ? "create your account" : "sign in"}.
              </p>
              <button
                onClick={() => {
                  setIsLinkSent(false);
                  setEmail("");
                }}
                className="neo-button w-full py-3">
                Send another link
              </button>
              <button
                onClick={() => navigate("/")}
                className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (

    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-28 pb-16 px-4 flex items-center justify-center">
          <div className="w-full max-w-md">
            {!isAuthenticated ? (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Mail size={32} className="text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">
                    Sign in with Magic Link
                  </h1>
                  <p className="text-muted-foreground">
                    No password required, just your email
                  </p>
                </div>

                <Card className="auth-card">
                  <CardHeader className="space-y-1 pb-2">
                    <CardTitle className="text-2xl font-bold">
                      Enter your email
                    </CardTitle>
                    <CardDescription>
                      {!isLinkSent
                        ? "We'll send you a magic link to sign in"
                        : "Check your email for the magic link"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {!isLinkSent ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          {/* <Label htmlFor="email">Email Address</Label> */}
                          <div className="relative">
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="soft-input pl-10"
                              required
                            />
                            <AtSign
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                              size={16}
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="neo-button w-full py-5"
                          disabled={isLoading}>
                          {isLoading ? "Sending..." : "Send Magic Link"}
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center py-4">
                        <div className="animate-pulse mb-4">
                          <Mail size={48} className="mx-auto text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          Check your inbox
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          We've sent a magic link to:
                          <br />
                          <span className="font-medium text-foreground">
                            {email}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          (For demo purposes, you'll be automatically signed in
                          after a few seconds)
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Create Your Master Password</h1>
                <p className="text-muted-foreground">Set up a master password to encrypt your data</p>
              </div>
              
              <MasterPasswordSetup onComplete={handleMasterPasswordComplete} /> */}
              </>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
