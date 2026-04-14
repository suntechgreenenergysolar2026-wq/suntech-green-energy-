import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Send, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/suntech logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="gradient-dark">
        {/* Decorative orbs */}
        <div className="floating-orb w-72 h-72 bg-solar-green/20 top-10 -right-20" style={{ animationDelay: '0s' }} />
        <div className="floating-orb w-48 h-48 bg-solar-orange/15 bottom-20 left-10" style={{ animationDelay: '3s' }} />

        {/* Newsletter band */}
        <div className="border-b border-primary-foreground/10">
          <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-primary-foreground mb-1">Stay Updated with Solar Insights</h3>
                <p className="text-primary-foreground/50 text-sm">Get the latest news on subsidies, savings tips, and industry updates</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-primary-foreground/5 text-sm text-primary-foreground placeholder:text-primary-foreground/30 border border-primary-foreground/10 focus:outline-none focus:border-solar-orange/50 focus:bg-primary-foreground/8 transition-all"
                />
                <button className="gradient-cta px-6 py-3 rounded-xl font-bold text-foreground hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-secondary/20 shine">
                  <Send className="w-4 h-4" /> Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="mb-4">
                <img
                  src={logo}
                  alt="Suntech Green Energy"
                  className="h-12 w-auto"
                />
              </div>
              <h3 className="text-2xl font-extrabold text-primary-foreground mb-2">
                Suntech <span className="text-gradient-solar">Green Energy</span>
              </h3>
              <p className="text-primary-foreground/50 text-sm leading-relaxed mb-6">
                India's trusted solar energy solutions provider. Powering homes, businesses, and industries with clean, sustainable energy.
              </p>
              <div className="flex gap-3">
                {["FB", "IG", "LI", "YT"].map((name, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl bg-primary-foreground/8 flex items-center justify-center text-primary-foreground/60 text-xs font-bold hover:bg-solar-orange hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/20">
                    {name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-primary-foreground mb-5 text-sm tracking-wider uppercase">Quick Links</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Home", path: "/" },
                  { label: "About Us", path: "/about" },
                  { label: "Projects", path: "/projects" },
                  { label: "Financing", path: "/financing" },
                  { label: "Contact", path: "/contact" },
                ].map((link) => (
                  <Link key={link.path} to={link.path} className="text-sm text-primary-foreground/50 hover:text-solar-orange transition-colors flex items-center gap-1 group">
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-primary-foreground mb-5 text-sm tracking-wider uppercase">Services</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Residential Solar", path: "/residential" },
                  { label: "Commercial Solar", path: "/commercial" },
                  { label: "EPC & Maintenance", path: "/epc" },
                  { label: "Solar Financing", path: "/financing" },
                ].map((link) => (
                  <Link key={link.path} to={link.path} className="text-sm text-primary-foreground/50 hover:text-solar-orange transition-colors flex items-center gap-1 group">
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-primary-foreground mb-5 text-sm tracking-wider uppercase">Get In Touch</h4>
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-start gap-3 text-primary-foreground/50">
                  <div className="w-8 h-8 rounded-lg bg-primary-foreground/8 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-solar-orange" />
                  </div>
                  <span>123 Solar Avenue, Pune, Maharashtra 411001</span>
                </div>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-primary-foreground/50 hover:text-solar-orange transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-primary-foreground/8 flex items-center justify-center shrink-0 group-hover:bg-solar-orange/20 transition-colors">
                    <Phone className="w-4 h-4 text-solar-orange" />
                  </div>
                  +91 98765 43210
                </a>
                <a href="mailto:info@suntechgreen.com" className="flex items-center gap-3 text-primary-foreground/50 hover:text-solar-orange transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-primary-foreground/8 flex items-center justify-center shrink-0 group-hover:bg-solar-orange/20 transition-colors">
                    <Mail className="w-4 h-4 text-solar-orange" />
                  </div>
                  info@suntechgreen.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/8">
          <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-primary-foreground/40">
              © 2025 Suntech Green Energy. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-primary-foreground/40">
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
