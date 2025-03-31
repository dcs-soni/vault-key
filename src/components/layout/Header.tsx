import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("hasMasterPassword");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-navy/80 backdrop-blur-md shadow-xs"
          : "bg-transparent"
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-teal flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="font-bold text-lg text-navy dark:text-white">
              PassVault
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-teal dark:text-gray-300 dark:hover:text-teal transition-colors">
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-teal dark:text-gray-300 dark:hover:text-teal transition-colors">
                Dashboard
              </Link>
            )}
            <Link
              to="/generator"
              className="text-gray-600 hover:text-teal dark:text-gray-300 dark:hover:text-teal transition-colors">
              Generator
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => navigate("/auth")} variant="outline">
                Sign In
              </Button>
            )}

            <Button
              onClick={() =>
                navigate(isAuthenticated ? "/dashboard" : "/auth")
              }>
              {isAuthenticated ? "Dashboard" : "Get Started"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-navy shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/"
              className="block py-2 text-gray-600 hover:text-teal dark:text-gray-300 dark:hover:text-teal transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="block py-2 text-gray-600 hover:text-teal dark:text-gray-300 dark:hover:text-teal transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            <Link
              to="/generator"
              className="block py-2 text-gray-600 hover:text-teal dark:text-gray-300 dark:hover:text-teal transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}>
              Generator
            </Link>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-navy-700">
              <div className="space-x-2">
                {isAuthenticated ? (
                  <Button onClick={handleSignOut} variant="outline" size="sm">
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      navigate("/auth");
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    size="sm">
                    Sign In
                  </Button>
                )}

                <Button
                  onClick={() => {
                    navigate(isAuthenticated ? "/dashboard" : "/auth");
                    setIsMobileMenuOpen(false);
                  }}
                  size="sm">
                  {isAuthenticated ? "Dashboard" : "Get Started"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
