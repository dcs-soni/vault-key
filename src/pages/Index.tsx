import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Eye,
  KeyRound,
  Lock,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };
  return (
    <div className="min-h-screen bg-white dark:bg-navy overflow-hidden">
      <Header />

      <section className="pt-32 pb-20 px-4 md:pt-40 md:pb-32 relative">
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-teal/10 dark:bg-teal/5"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="absolute -top-20 right-10 w-64 h-64 rounded-full bg-linear-to-br from-teal/5 to-teal/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-linear-to-tr from-gold/5 to-gold/10 blur-3xl" />
          <div className="absolute top-40 -right-20 w-80 h-80 rounded-full border border-teal/5 opacity-20" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-left">
              <div className="mb-8 inline-flex items-center px-3 py-1 space-x-1 border border-teal/10 rounded-full text-xs font-medium text-teal">
                <KeyRound className="w-3.5 h-3.5 mr-1.5" />
                <span>Zero-Knowledge Encryption</span>
              </div>

              <div className="text-reveal-container">
                <h1 className="font-poppins text-h1 font-bold text-navy dark:text-white mb-6">
                  Security with <span className="text-teal">Simplicity</span>
                </h1>
              </div>

              <p className="text-body text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                Protect what matters with elegant encryption that keeps your
                data exclusively yours. No surveillance, no backdoors.
              </p>

              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleGetStarted}
                  className="rounded-xl px-6 py-6 text-white shadow-md text-sm">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <a
                  href="/generator"
                  className="group flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-teal dark:hover:text-teal transition-colors animated-underline">
                  <span>Try password generator</span>
                  <ArrowRight className="ml-1 h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-6">
                {[
                  { label: "End-to-End", value: "Encryption" },
                  { label: "Zero", value: "Knowledge" },
                  { label: "AES-256", value: "Standard" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {stat.label}
                    </span>
                    <span className="text-navy dark:text-white font-semibold">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full border border-teal/20 dark:border-teal/10 opacity-50 animate-slow-spin"></div>
                      <div className="w-64 h-64 rounded-full border border-teal/20 dark:border-teal/10 opacity-30 animate-reverse-spin"></div>
                      <div className="w-80 h-80 rounded-full border border-teal/20 dark:border-teal/10 opacity-20 animate-slow-spin"></div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-teal flex items-center justify-center shadow-teal-glow">
                          <Lock className="w-8 h-8 text-white" />
                        </div>

                        <div className="absolute -top-6 -right-12 w-8 h-8 rounded-lg bg-white dark:bg-navy-800 shadow-md flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4 text-teal" />
                        </div>

                        <div className="absolute -bottom-4 -left-10 w-8 h-8 rounded-lg bg-white dark:bg-navy-800 shadow-md flex items-center justify-center">
                          <Eye className="w-4 h-4 text-gold" />
                        </div>

                        <div className="absolute top-16 right-0 w-8 h-8 rounded-lg bg-white dark:bg-navy-800 shadow-md flex items-center justify-center">
                          <LockKeyhole className="w-4 h-4 text-navy dark:text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
