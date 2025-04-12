import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardParallax,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Eye,
  KeyRound,
  KeySquare,
  Lock,
  LockKeyhole,
  Shield,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("hero");

  const navigate = useNavigate();

  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const heroControls = useAnimation();

  const handleNavigation = (isSignUp: boolean) => {
    navigate("/login", { state: { isSignUp } });
  };

  const handleGetStarted = () => {
    navigate("/auth");
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (
        !heroRef.current ||
        !featuresRef.current ||
        !howItWorksRef.current ||
        !ctaRef.current
      )
        return;

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (scrollPosition < featuresRef.current.offsetTop) {
        setActiveSection("hero");
      } else if (
        scrollPosition >= featuresRef.current.offsetTop &&
        scrollPosition < howItWorksRef.current.offsetTop
      ) {
        setActiveSection("features");
      } else if (
        scrollPosition >= howItWorksRef.current.offsetTop &&
        scrollPosition < ctaRef.current.offsetTop
      ) {
        setActiveSection("howItWorks");
      } else {
        setActiveSection("cta");
      }
    };

    heroControls.start({ opacity: 1, y: 0 });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [heroControls]);

  return (
    <div className="min-h-screen bg-white dark:bg-navy overflow-hidden">
      <Header />

      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-4">
        <div
          className={`scroll-indicator-dot cursor-pointer ${
            activeSection === "hero" ? "active" : ""
          }`}
          onClick={() => scrollToSection(heroRef)}
        />
        <div
          className={`scroll-indicator-dot cursor-pointer ${
            activeSection === "features" ? "active" : ""
          }`}
          onClick={() => scrollToSection(featuresRef)}
        />
        <div
          className={`scroll-indicator-dot cursor-pointer ${
            activeSection === "howItWorks" ? "active" : ""
          }`}
          onClick={() => scrollToSection(howItWorksRef)}
        />
        <div
          className={`scroll-indicator-dot cursor-pointer ${
            activeSection === "cta" ? "active" : ""
          }`}
          onClick={() => scrollToSection(ctaRef)}
        />
      </div>

      {/* Hero Secrtion */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-4 md:pt-40 md:pb-32 relative">
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
                      <div className="w-48 h-48 rounded-full border border-teal/20 dark:border-teal/10 opacity-80 animate-slow-spin"></div>
                      <div className="w-64 h-64 rounded-full border border-teal/20 dark:border-teal/10 opacity-80 animate-reverse-spin"></div>
                      <div className="w-80 h-80 rounded-full border border-teal/20 dark:border-teal/10 opacity-80 animate-slow-spin"></div>
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
                        <div className="absolute top-26 -right-20 w-8 h-8 rounded-lg bg-white dark:bg-navy-800 shadow-md flex items-center justify-center">
                          <KeySquare className="w-4 h-4 text-orange-500" />
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

      <div className="fancy-divider">
        <div className="fancy-divider-inner" />
      </div>

      {/* Core Principles Section */}
      <section
        ref={featuresRef}
        className="relative py-24 px-4 overflow-hidden bg-linear-to-br from-white to-gray-50 dark:from-navy dark:to-navy-900">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-linear-to-br from-teal/5 to-teal/2 opacity-50 blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-linear-to-br from-gold/5 to-gold/2 opacity-30 blur-xl"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="mb-16 inline-flex items-start flex-col">
            <div className="inline-flex items-center px-3 py-1 space-x-1 border border-teal/10 rounded-full text-xs font-medium text-teal mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              <span>Core Principles</span>
            </div>

            <h2 className="font-poppins text-h2 font-bold mb-4 text-navy dark:text-white">
              Designed for true privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-body">
              Your credentials remain exclusively yours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "lorem ipsum",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, nihil!",
              },
              {
                icon: Sparkles,
                title: "lorem ipsum",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, nihil!",
              },
              {
                icon: Sparkles,
                title: "lorem ipsum",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, nihil!",
              },
              {
                icon: Sparkles,
                title: "lorem ipsum",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, nihil!",
              },
              {
                icon: Sparkles,
                title: "lorem ipsum",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, nihil!",
              },
              {
                icon: Sparkles,
                title: "lorem ipsum",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, nihil!",
              },
            ].map((feature, index) => (
              <div key={index}>
                <Card variant="hover" className="h-full group">
                  <CardHeader>
                    <div className="w-12 h-12 mb-6 relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-teal opacity-10 group-hover:opacity-20 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-teal" />
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-3">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section
        ref={howItWorksRef}
        className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20 -z-10"></div>

        <div className="container mx-auto max-w-6xl">
          <div className="text-center inline-flex items-start flex-col mb-16">
            <div className="inline-flex items-center px-3 py-1 space-x-1 border border-teal/10 rounded-full text-xs font-medium text-teal mb-4">
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              <span>How It Works</span>
            </div>

            <h2 className="font-poppins text-h2 mb-4 font-bold text-navy dark:text-white">
              Simple on the surface,{" "}
            </h2>
            <span className="text-gray-600 dark:text-gray-300 text-body">
              Secure underneath
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="parallax-container">
              <Card
                variant="premium"
                className="h-full relative overflow-hidden py-10 px-4">
                <CardHeader>
                  <CardTitle className="text-2xl mb-6">
                    Encryption at your fingertips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We use AES-256, the same encryption standard used by
                    governments and financial institutions worldwide. Your
                    master password creates a unique key that only exists on
                    your device.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Password vault never leaves your device unencrypted",
                      "Automatic sync with end-to-end encryption",
                      "No password recovery - you maintain 100% control",
                      "Open source cryptography you can verify",
                    ].map((item, i) => (
                      <CardParallax
                        key={i}
                        depth={1}
                        className="flex items-start">
                        <div className="shrink-0 h-6 w-6 rounded-full bg-teal/10 flex items-center justify-center mt-0.5 mr-3">
                          <span className="h-2 w-2 bg-teal rounded-full"></span>
                        </div>
                        <span className="text-navy-800 dark:text-gray-300">
                          {item}
                        </span>
                      </CardParallax>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute w-full h-full rounded-full bg-linear-to-br from-teal/5 to-teal/2 animate-pulse-glow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <svg
                      className="w-3/4 h-3/4 text-teal/10"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-15a3 3 0 00-3 3v2a3 3 0 006 0v-2a3 3 0 00-3-3zm1 13h-2v-2h2v2zm-2-4v-2.1A5 5 0 0117 9v-.5a5 5 0 10-10 0V9a5 5 0 016 4.9V16h-2z" />
                    </svg>
                  </div>
                  <div>
                    <Lock className="absolute w-12 h-12 text-teal" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex items-center justify-center order-last lg:order-first">
              <div className="grid grid-cols-2 gap-6 w-full">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="glass-panel p-6 shadow-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-teal opacity-10 flex items-center justify-center mb-4">
                      <span className="text-sm font-bold text-teal">
                        {item}
                      </span>
                    </div>
                    <div className="h-2 w-3/4 bg-teal/10 dark:bg-teal/5 rounded-full mb-2"></div>
                    <div className="h-2 w-1/2 bg-teal/10 dark:bg-teal/5 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Card variant="gradient" className="h-full">
                <div className="pt-6">
                  <CardHeader>
                    <CardTitle className="text-2xl mb-6">
                      Easy to use, hard to crack
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Our intuitive interface makes password management simple
                      while the underlying technology ensures uncompromising
                      security.
                    </p>
                    <div className="space-y-6">
                      {[
                        {
                          title: "Create Strong Passwords",
                          description:
                            "Generate random passwords with our built-in tool",
                        },
                        {
                          title: "Auto-Fill Credentials",
                          description:
                            "Save time with secure browser integration",
                        },
                        {
                          title: "Multi-Device Access",
                          description:
                            "Access your passwords anywhere with secure sync",
                        },
                      ].map((item, i) => (
                        <div key={i} className="flex">
                          <div className="shrink-0 h-10 w-10 rounded-full bg-gradient-teal opacity-10 flex items-center justify-center mr-4 mt-1">
                            <span className="font-medium text-teal">
                              {i + 1}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-navy-800 dark:text-white mb-1">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section
        ref={ctaRef}
        className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-navy dark:to-navy-900">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl"></div>

        <div className="container mx-auto max-w-5xl">
          <div className="relative z-10 mb-16">
            <Card variant="gradient" className="overflow-hidden">
              <div className="p-12 md:p-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md">
                    <CardTitle gradient className="text-3xl md:text-4xl mb-4">
                      Ready to secure your digital life?
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 mb-0">
                      Start protecting your passwords with military-grade
                      encryption, under your control.
                    </p>
                  </div>

                  <Button
                    onClick={handleGetStarted}
                    className="whitespace-nowrap rounded-xl px-8 py-6 bg-gradient-teal hover:shadow-teal-glow text-white shadow-md font-normal">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute top-5 right-5 grid grid-cols-3 gap-1.5">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-teal/20"></div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "The most intuitive password manager I've ever used.",
                  name: "Alex M.",
                  role: "Software Engineer",
                },
                {
                  quote: "Security without sacrificing convenience.",
                  name: "Sarah L.",
                  role: "Digital Marketer",
                },
                {
                  quote: "Finally, a password manager I can trust completely.",
                  name: "Michael R.",
                  role: "Security Analyst",
                },
              ].map((testimonial, i) => (
                <div key={i} className="h-full">
                  <Card variant="glass" className="h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex-1">
                        <p className="text-navy-800 dark:text-gray-300 italic mb-4">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-navy dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <div className="text-center mb-8">
                <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                  Trusted by teams worldwide
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {[1, 2, 3, 4, 5].map((logo) => (
                  <div
                    key={logo}
                    className="h-7 w-24 bg-gray-300/30 dark:bg-gray-700/30 rounded-md blur-0 backdrop-blur-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
