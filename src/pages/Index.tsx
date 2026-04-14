import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Home, Factory, Building, Shield, Award, Clock, BadgePercent, Zap, ArrowRight, ChevronLeft, ChevronRight, Star, Calculator, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import heroResidential from "@/assets/hero-residential.jpg";
import heroCommercial from "@/assets/hero-commercial.jpg";
import heroIndustrial from "@/assets/hero-industrial.jpg";

const slides = [
  { image: heroResidential, title: "Power Your Growth with Zero-Risk Solar Solutions", sub: "Reduce electricity bills by up to 90% with premium solar installations" },
  { image: heroCommercial, title: "Industrial-Scale Solar for Maximum ROI", sub: "Trusted by 500+ businesses across India for sustainable power" },
  { image: heroIndustrial, title: "Expert EPC & Maintenance Services", sub: "End-to-end solar solutions with 25-year performance guarantee" },
];

const stats = [
  { value: "10+", label: "Years Experience", icon: Clock },
  { value: "500+", label: "Projects Completed", icon: Award },
  { value: "50MW+", label: "Capacity Installed", icon: Zap },
  { value: "24/7", label: "Support Available", icon: Shield },
];

const segments = [
  { icon: Home, title: "Residential Solar", desc: "Save up to 90% on your electricity bills with rooftop solar panels for your home.", link: "/residential", color: "from-solar-green to-solar-blue" },
  { icon: Building, title: "Commercial Solar", desc: "Reduce operational costs and boost ESG ratings for your business.", link: "/commercial", color: "from-solar-orange to-solar-yellow" },
  { icon: Factory, title: "Industrial Solar", desc: "Large-scale solar plants with guaranteed ROI for industrial operations.", link: "/commercial", color: "from-solar-blue to-primary" },
];

const whyUs = [
  { icon: BadgePercent, title: "0% Financing", desc: "Zero upfront cost models available for all customers" },
  { icon: Award, title: "Tier-1 Panels", desc: "Only top-tier, certified solar panels used in every project" },
  { icon: Shield, title: "25-Year Warranty", desc: "Long-term performance guarantee with full support" },
  { icon: Zap, title: "Subsidy Support", desc: "Complete government subsidy assistance & documentation" },
];

const steps = [
  { num: "01", title: "Site Survey", desc: "Free professional site assessment by our expert team" },
  { num: "02", title: "Custom Design", desc: "Tailored system design optimized for maximum output" },
  { num: "03", title: "Installation", desc: "Quick, professional installation by certified engineers" },
  { num: "04", title: "Net Metering", desc: "Start saving immediately with net metering setup" },
];

const projects = [
  { image: heroResidential, title: "Residential Rooftop", location: "Pune, MH", capacity: "10 kW" },
  { image: heroCommercial, title: "Commercial Plant", location: "Mumbai, MH", capacity: "500 kW" },
  { image: heroIndustrial, title: "Industrial Setup", location: "Nashik, MH", capacity: "2 MW" },
];

const testimonials = [
  { name: "Rajesh Kumar", role: "Homeowner, Pune", text: "Suntech installed a 5kW system on our rooftop. Our electricity bill dropped from ₹8,000 to ₹800. Incredible service!", rating: 5 },
  { name: "Priya Sharma", role: "Business Owner, Mumbai", text: "The ROI has been phenomenal. We broke even in 3 years and now enjoy free electricity for our factory.", rating: 5 },
  { name: "Amit Patel", role: "Factory Manager, Nashik", text: "Professional team, quality products, and excellent after-sales support. Highly recommended!", rating: 5 },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bill, setBill] = useState(5000);
  const [testIdx, setTestIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const annualSavings = Math.round(bill * 0.85 * 12);
  const systemSize = Math.max(1, Math.round(bill / 1200));
  const co2Saved = Math.round(systemSize * 1.5 * 10) / 10;

  return (
    <div>
      {/* HERO */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-solar-dark/95 via-primary/60 to-solar-dark/80" />
        
        {/* Decorative elements */}
        <div className="floating-orb w-96 h-96 bg-solar-orange/15 top-20 -right-32" />
        <div className="floating-orb w-64 h-64 bg-solar-yellow/10 bottom-32 left-10" style={{ animationDelay: '4s' }} />
        
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-primary-foreground/80 text-sm font-medium mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-4 h-4 text-solar-yellow" />
                India's Trusted Solar Energy Partner
              </motion.div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-[1.1]">
                {slides[currentSlide].title}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-xl leading-relaxed">
                {slides[currentSlide].sub}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/contact" className="gradient-cta px-8 py-4 rounded-xl font-bold text-foreground shadow-xl shadow-secondary/25 hover:shadow-2xl hover:shadow-secondary/30 transition-all hover:scale-105 shine text-base">
                  Get Free Quote
                </Link>
                <Link to="/projects" className="px-8 py-4 rounded-xl font-semibold text-primary-foreground border-2 border-primary-foreground/20 hover:bg-primary-foreground/10 transition-all backdrop-blur-sm text-base">
                  View Projects →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Slide indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? "bg-solar-orange w-10" : "bg-primary-foreground/30 w-4 hover:bg-primary-foreground/50"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-16 z-10 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div 
                key={i} 
                className="glass rounded-xl p-4 text-center border border-white/30 shadow-sm"
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-9 h-9 rounded-lg bg-solar-green/10 flex items-center justify-center mx-auto mb-2 border border-solar-green/20">
                  <s.icon className="w-4 h-4 text-solar-green" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-solar-green">{s.value}</div>
                <div className="text-[11px] text-solar-green/70 mt-0.5 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Our Solutions" title="Solar Solutions for Every Need" subtitle="Comprehensive solar energy solutions for residential, commercial, and industrial sectors" />
          <div className="grid md:grid-cols-3 gap-8">
            {segments.map((seg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Link to={seg.link} className="group block rounded-3xl p-8 border border-solar-green/15 bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] card-hover relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-solar-green/10 blur-2xl" />
                  <div className="absolute left-0 right-0 top-0 h-1 bg-solar-green/60" />
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/80 border border-solar-green/20 flex items-center justify-center shadow-sm">
                      <seg.icon className="w-7 h-7 text-solar-green" />
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-solar-green/60">Solution</div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{seg.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{seg.desc}</p>
                  <span className="inline-flex items-center gap-2 text-solar-green font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="floating-orb w-80 h-80 bg-solar-green/15 top-0 right-0" />
        <div className="floating-orb w-48 h-48 bg-solar-orange/10 bottom-10 left-20" style={{ animationDelay: '2s' }} />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading tag="Why Suntech" title="Why Choose Suntech Green Energy?" subtitle="Trusted by thousands of customers across India" light />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div key={i} className="glass-dark rounded-2xl p-6 text-center card-hover" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-14 h-14 rounded-2xl bg-solar-orange/15 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-solar-orange" />
                </div>
                <h4 className="font-bold text-primary-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-primary-foreground/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Process" title="How It Works" subtitle="From site survey to savings — in 4 simple steps" />
          <div className="relative mt-10">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-solar-green/25 hidden md:block" />
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  className={`relative ${i % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <div className="glass rounded-2xl border border-solar-green/20 p-5 md:p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-solar-green/10 border border-solar-green/25 flex items-center justify-center text-solar-green font-extrabold">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-lg">{step.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-solar-green/60">
                    <div className="absolute inset-0 rounded-full bg-solar-green/30 blur-[6px]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Portfolio" title="Featured Projects" subtitle="See our work across India" />
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div key={i} className="group bg-card rounded-2xl overflow-hidden card-hover border border-border" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <div className="relative h-56 overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-solar-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 right-3 px-4 py-1.5 rounded-full gradient-cta text-foreground text-xs font-bold shadow-lg">{p.capacity}</div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-foreground text-lg">{p.title}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {p.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all hover:gap-3">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SAVINGS CALCULATOR */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="floating-orb w-64 h-64 bg-solar-yellow/10 top-10 left-0" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading tag="Savings" title="Solar Savings Calculator" subtitle="See how much you can save with solar energy" light />
          <motion.div className="max-w-2xl mx-auto glass-dark rounded-3xl p-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <label className="block text-sm font-medium text-primary-foreground mb-3">
              Monthly Electricity Bill
            </label>
            <div className="text-4xl font-extrabold text-gradient-hero mb-4">₹{bill.toLocaleString()}</div>
            <input
              type="range"
              min={1000}
              max={100000}
              step={500}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-primary-foreground/10 accent-solar-orange"
            />
            <div className="flex justify-between text-xs text-primary-foreground/40 mt-2 mb-10">
              <span>₹1,000</span><span>₹1,00,000</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-solar-green/15 rounded-2xl p-5 border border-solar-green/20">
                <div className="text-2xl md:text-3xl font-extrabold text-solar-green">₹{annualSavings.toLocaleString()}</div>
                <div className="text-xs text-primary-foreground/50 mt-2 font-medium">Annual Savings</div>
              </div>
              <div className="bg-solar-orange/15 rounded-2xl p-5 border border-solar-orange/20">
                <div className="text-2xl md:text-3xl font-extrabold text-solar-orange">{systemSize} kW</div>
                <div className="text-xs text-primary-foreground/50 mt-2 font-medium">System Size</div>
              </div>
              <div className="bg-solar-blue/15 rounded-2xl p-5 border border-solar-blue/20">
                <div className="text-2xl md:text-3xl font-extrabold text-solar-blue">{co2Saved} T</div>
                <div className="text-xs text-primary-foreground/50 mt-2 font-medium">CO₂ Saved/Year</div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link to="/contact" className="gradient-cta px-10 py-4 rounded-xl font-bold text-foreground inline-block shadow-xl shadow-secondary/25 hover:shadow-2xl transition-all hover:scale-105 shine">
                Get Detailed Analysis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Reviews" title="What Our Customers Say" subtitle="Real stories from real customers" />
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={testIdx} className="bg-card rounded-3xl p-10 border border-border shadow-xl text-center relative overflow-hidden" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <div className="absolute top-4 left-6 text-8xl font-serif text-primary/10 leading-none">"</div>
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[testIdx].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-solar-yellow fill-solar-yellow" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 relative z-10">"{testimonials[testIdx].text}"</p>
                <div className="w-12 h-12 rounded-full gradient-solar flex items-center justify-center mx-auto mb-3 text-primary-foreground font-bold text-lg">
                  {testimonials[testIdx].name[0]}
                </div>
                <p className="font-bold text-foreground text-lg">{testimonials[testIdx].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[testIdx].role}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={() => setTestIdx((p) => (p - 1 + testimonials.length) % testimonials.length)} className="w-12 h-12 rounded-xl border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setTestIdx((p) => (p + 1) % testimonials.length)} className="w-12 h-12 rounded-xl border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading tag="Get Started" title="Ready to Go Solar?" subtitle="Fill in your details and our solar experts will contact you within 24 hours with a customized solution." center={false} />
              <div className="space-y-4 text-muted-foreground">
                {["Free site survey & assessment", "Custom system design", "Complete subsidy assistance", "25-year warranty coverage"].map((item, i) => (
                  <motion.div key={i} className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="w-6 h-6 rounded-full gradient-solar flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div className="bg-card rounded-3xl p-8 border border-border shadow-2xl shadow-primary/5 relative overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-solar-orange/10 to-solar-green/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-xl font-bold text-foreground mb-6">Get Your Free Quote</h3>
              <LeadForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Mini MapPin for projects
const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

export default Index;


