import { useState } from "react";
import { masterPasswordService } from "../services/masterPasswordService";
import Header from "./layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MasterPasswordVerificationProps {
  onSuccess: () => void;
}

export function MasterPasswordVerification({
  onSuccess,
}: MasterPasswordVerificationProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const isValid = await masterPasswordService.verifyMasterPassword(
        password
      );
      if (isValid) {
        localStorage.setItem("masterPasswordVerified", "true");
        toast.success("Master password verified successfully");
        onSuccess();
      } else {
        setError("Incorrect master password");
        toast.error("Incorrect master password");
      }
    } catch (err) {
      setError("An error occurred while verifying the password");
      toast.error(`An error occurred while verifying the password - ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen items-center justify-center bg-gradient-mesh p-4">
        <div className="glass-panel p-8 rounded-xl max-w-md w-full mx-auto shadow-2xl">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <KeyRound size={28} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-muted-foreground text-center">
              Please enter your master password to access your stored passwords
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Master Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      "h-12 px-4 text-base rounded-lg transition-all duration-200",
                      "border-2 focus:ring-2 focus:ring-offset-2",
                      error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-primary/20"
                    )}
                    placeholder="Enter your master password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg p-3 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="teal"
                size="xl"
                className="w-full"
                disabled={isLoading || !password}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Access Dashboard"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
