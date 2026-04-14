import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Zap, Leaf } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import heroResidential from "@/assets/hero-residential.jpg";
import heroCommercial from "@/assets/hero-commercial.jpg";
import heroIndustrial from "@/assets/hero-industrial.jpg";

const allProjects = [
  { image: heroResidential, title: "Villa Rooftop Solar", location: "Pune, MH", capacity: "10 kW", co2: "15T/yr", category: "Residential" },
  { image: heroResidential, title: "Apartment Complex", location: "Mumbai, MH", capacity: "25 kW", co2: "37T/yr", category: "Residential" },
  { image: heroCommercial, title: "IT Office Campus", location: "Bangalore, KA", capacity: "500 kW", co2: "750T/yr", category: "Industrial" },
  { image: heroCommercial, title: "Shopping Mall", location: "Hyderabad, TS", capacity: "300 kW", co2: "450T/yr", category: "Industrial" },
  { image: heroIndustrial, title: "Factory Rooftop", location: "Nashik, MH", capacity: "2 MW", co2: "3000T/yr", category: "Rooftop" },
  { image: heroIndustrial, title: "Warehouse Solar", location: "Chennai, TN", capacity: "1 MW", co2: "1500T/yr", category: "Rooftop" },
];

const filters = ["All", "Residential", "Industrial", "Rooftop"];

const Projects = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <div>
      <PageBanner title="Our Projects" subtitle="500+ successful solar installations across India" breadcrumbs={[{ label: "Home", path: "/" }, { label: "Projects" }]} />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Portfolio" title="Featured Installations" />
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {filters.map((f) => (
              <button key={f} onClick={() => setActive(f)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${active === f ? "gradient-solar text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-border"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => (
              <motion.div key={p.title} className="bg-card rounded-2xl overflow-hidden border border-border card-hover" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} layout>
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">{p.category}</div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-foreground mb-3">{p.title}</h4>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{p.location}</div>
                    <div className="flex items-center gap-2"><Zap className="w-4 h-4" />{p.capacity}</div>
                    <div className="flex items-center gap-2"><Leaf className="w-4 h-4" />{p.co2} CO₂ saved</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
