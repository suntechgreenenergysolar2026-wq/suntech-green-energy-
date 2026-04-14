import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/suntech logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Residential", path: "/residential" },
  { label: "Commercial", path: "/commercial" },
  { label: "EPC & Maintenance", path: "/epc" },
  { label: "Projects", path: "/projects" },
  { label: "Financing", path: "/financing" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-card/95 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-18 lg:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Suntech Green Energy" className="h-10 lg:h-12 w-auto transition-transform group-hover:scale-105" />
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-primary"
                  : scrolled 
                    ? "text-solar-green hover:text-solar-green hover:bg-solar-green/10"
                    : "text-solar-green hover:text-solar-green hover:bg-solar-green/10"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div layoutId="nav-active" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+919876543210" className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            scrolled ? "text-solar-green hover:text-solar-green" : "text-solar-green hover:text-solar-green"
          }`}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-primary" />
            </div>
            +91 98765 43210
          </a>
          <Link
            to="/contact"
            className="gradient-cta px-6 py-2.5 rounded-xl text-sm font-bold text-foreground shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 transition-all hover:scale-105 shine"
          >
            Get Free Quote
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2.5 rounded-xl transition-all border ${
            scrolled
              ? "bg-solar-green/10 text-solar-green border-solar-green/20 hover:bg-solar-green/15"
              : "bg-solar-green/10 text-solar-green border-solar-green/20 hover:bg-solar-green/15"
          }`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-border shadow-xl shadow-primary/5 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1.5">
              {navLinks.map((link, i) => (
                <motion.div key={link.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === link.path
                        ? "bg-solar-green/10 text-solar-green border border-solar-green/20"
                        : "text-solar-green hover:bg-solar-green/5"
                    }`}
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 opacity-40 text-solar-green" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-2 pt-3 border-t border-border">
                <a href="tel:+919876543210" className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-solar-green/90">
                  <Phone className="w-4 h-4 text-solar-green" /> +91 98765 43210
                </a>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-bold text-primary-foreground text-center mt-2 shadow-lg bg-solar-green hover:bg-solar-green/90 transition-colors"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
