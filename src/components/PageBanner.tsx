import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import heroResidential from "@/assets/hero-residential.jpg";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; path?: string }[];
  image?: string;
}

const PageBanner = ({ title, subtitle, breadcrumbs, image }: PageBannerProps) => (
  <section className="relative h-64 md:h-80 flex items-center overflow-hidden">
    <img src={image ?? heroResidential} alt={title} className="absolute inset-0 w-full h-full object-cover" />
    <div className="relative container mx-auto px-4 text-primary-foreground">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-3 text-primary-foreground/80">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="w-3 h-3" />}
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-primary-foreground transition-colors">{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-lg text-primary-foreground/80 max-w-2xl">{subtitle}</p>}
      </motion.div>
    </div>
  </section>
);

export default PageBanner;
