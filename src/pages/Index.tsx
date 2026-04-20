import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BadgePercent, Building, ChevronLeft, ChevronRight, Clock, Factory, Home, Shield, Sparkles, Star, Zap, ArrowRight } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import SectionHeading from "@/components/SectionHeading";
import heroCommercial from "@/assets/hero-commercial.jpg";
import heroIndustrial from "@/assets/hero-industrial.jpg";
import heroResidential from "@/assets/hero-residential.jpg";
import { usePublicContent } from "@/hooks/use-public-content";
import { resolveContentImageUrl } from "@/lib/default-content";

const slides = [
  {
    image: heroResidential,
    title: "Power Your Growth with Zero-Risk Solar Solutions",
    sub: "Reduce electricity bills by up to 90% with premium solar installations",
  },
  {
    image: heroCommercial,
    title: "Industrial-Scale Solar for Maximum ROI",
    sub: "Trusted by 500+ businesses across India for sustainable power",
  },
  {
    image: heroIndustrial,
    title: "Expert EPC & Maintenance Services",
    sub: "End-to-end solar solutions with 25-year performance guarantee",
  },
];

const stats = [
  { value: "10+", label: "Years Experience", icon: Clock },
  { value: "500+", label: "Projects Completed", icon: Award },
  { value: "50MW+", label: "Capacity Installed", icon: Zap },
  { value: "24/7", label: "Support Available", icon: Shield },
];

const segments = [
  {
    icon: Home,
    title: "Residential Solar",
    desc: "Save up to 90% on your electricity bills with rooftop solar panels for your home.",
    link: "/residential",
  },
  {
    icon: Building,
    title: "Commercial Solar",
    desc: "Reduce operational costs and boost ESG ratings for your business.",
    link: "/commercial",
  },
  {
    icon: Factory,
    title: "Industrial Solar",
    desc: "Large-scale solar plants with guaranteed ROI for industrial operations.",
    link: "/commercial",
  },
];

const whyUs = [
  { icon: BadgePercent, title: "0% Financing", desc: "Zero upfront cost models available for all customers" },
  { icon: Award, title: "Tier-1 Panels", desc: "Only top-tier, certified solar panels used in every project" },
  { icon: Shield, title: "25-Year Warranty", desc: "Long-term performance guarantee with full support" },
  { icon: Zap, title: "Subsidy Support", desc: "Complete government subsidy assistance and documentation" },
];

const steps = [
  { num: "01", title: "Site Survey", desc: "Free professional site assessment by our expert team" },
  { num: "02", title: "Custom Design", desc: "Tailored system design optimized for maximum output" },
  { num: "03", title: "Installation", desc: "Quick, professional installation by certified engineers" },
  { num: "04", title: "Net Metering", desc: "Start saving immediately with net metering setup" },
];

const Index = () => {
  const { data } = usePublicContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bill, setBill] = useState(5000);
  const [testIdx, setTestIdx] = useState(0);
  const yearsInBusiness = Math.max(1, new Date().getFullYear() - data.companyProfile.yearEstablished);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((current) => (current + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (testIdx >= data.testimonials.length) {
      setTestIdx(0);
    }
  }, [data.testimonials.length, testIdx]);

  const annualSavings = Math.round(bill * 0.85 * 12);
  const systemSize = Math.max(1, Math.round(bill / 1200));
  const co2Saved = Math.round(systemSize * 1.5 * 10) / 10;
  const featuredProjects = data.projects.filter((project) => project.isFeatured !== false).slice(0, 3);
  const activeTestimonial = data.testimonials[testIdx % data.testimonials.length];

  return (
    <div>
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-solar-dark/95 via-primary/60 to-solar-dark/80" />

        <div className="floating-orb top-20 -right-32 h-96 w-96 bg-solar-orange/15" />
        <div className="floating-orb bottom-32 left-10 h-64 w-64 bg-solar-yellow/10" style={{ animationDelay: "4s" }} />

        <div className="container relative mx-auto flex h-full flex-col justify-center px-4">
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
                className="glass-dark mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-primary-foreground/80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="h-4 w-4 text-solar-yellow" />
                India's Trusted Solar Energy Partner
              </motion.div>
              <h1 className="text-4xl font-extrabold leading-[1.1] text-primary-foreground md:text-6xl lg:text-7xl">
                {slides[currentSlide].title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/70 md:text-xl">
                {slides[currentSlide].sub}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="gradient-cta shine rounded-xl px-8 py-4 text-base font-bold text-foreground shadow-xl shadow-secondary/25 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-secondary/30"
                >
                  Get Free Quote
                </Link>
                <Link
                  to="/projects"
                  className="rounded-xl border-2 border-primary-foreground/20 px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10"
                >
                  View Projects
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide ? "w-10 bg-solar-orange" : "w-4 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                className="glass rounded-xl border border-white/30 p-4 text-center shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg border border-solar-green/20 bg-solar-green/10">
                  <item.icon className="h-4 w-4 text-solar-green" />
                </div>
                <div className="text-2xl font-extrabold text-solar-green md:text-3xl">
                  {item.label === "Years Experience" ? `${yearsInBusiness}+` : item.value}
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-solar-green/70">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            tag="Our Solutions"
            title="Solar Solutions for Every Need"
            subtitle="Comprehensive solar energy solutions for residential, commercial, and industrial sectors"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {segments.map((segment, index) => (
              <motion.div key={segment.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
                <Link
                  to={segment.link}
                  className="card-hover group relative block overflow-hidden rounded-3xl border border-solar-green/15 bg-white/70 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl"
                >
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-solar-green/10 blur-2xl" />
                  <div className="absolute left-0 right-0 top-0 h-1 bg-solar-green/60" />
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-solar-green/20 bg-white/80 shadow-sm">
                      <segment.icon className="h-7 w-7 text-solar-green" />
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-solar-green/60">Solution</div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">{segment.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{segment.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-solar-green transition-all group-hover:gap-3">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="gradient-dark absolute inset-0" />
        <div className="floating-orb right-0 top-0 h-80 w-80 bg-solar-green/15" />
        <div className="floating-orb bottom-10 left-20 h-48 w-48 bg-solar-orange/10" style={{ animationDelay: "2s" }} />
        <div className="container relative z-10 mx-auto px-4">
          <SectionHeading tag="Why Suntech" title="Why Choose Suntech Green Energy?" subtitle="Trusted by thousands of customers across India" light />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {whyUs.map((item, index) => (
              <motion.div
                key={item.title}
                className="glass-dark card-hover rounded-2xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-solar-orange/15 transition-transform group-hover:scale-110">
                  <item.icon className="h-7 w-7 text-solar-orange" />
                </div>
                <h4 className="mb-2 font-bold text-primary-foreground">{item.title}</h4>
                <p className="text-sm leading-relaxed text-primary-foreground/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Process" title="How It Works" subtitle="From site survey to savings in 4 simple steps" />
          <div className="relative mt-10">
            <div className="absolute left-1/2 top-0 hidden w-px bg-solar-green/25 md:bottom-0 md:block" />
            <div className="grid gap-6 md:grid-cols-2 md:gap-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.num}
                  className={`relative ${index % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                >
                  <div className="glass rounded-2xl border border-solar-green/20 p-5 shadow-sm md:p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-solar-green/25 bg-solar-green/10 font-extrabold text-solar-green">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground">{step.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-solar-green/60 md:block">
                    <div className="absolute inset-0 rounded-full bg-solar-green/30 blur-[6px]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Portfolio" title="Featured Projects" subtitle="See our work across India" />
          <div className="grid gap-8 md:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={`${project.id ?? project.title}-${project.sortOrder ?? 0}`}
                className="group card-hover overflow-hidden rounded-2xl border border-border bg-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={resolveContentImageUrl(project.imageUrl)}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-solar-dark/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="gradient-cta absolute bottom-3 right-3 rounded-full px-4 py-1.5 text-xs font-bold text-foreground shadow-lg">
                    {project.capacity}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-foreground">{project.title}</h4>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {project.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-8 py-3 font-semibold text-primary transition-all hover:gap-3 hover:bg-primary hover:text-primary-foreground"
            >
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="gradient-dark absolute inset-0" />
        <div className="floating-orb left-0 top-10 h-64 w-64 bg-solar-yellow/10" />
        <div className="container relative z-10 mx-auto px-4">
          <SectionHeading tag="Savings" title="Solar Savings Calculator" subtitle="See how much you can save with solar energy" light />
          <motion.div className="glass-dark mx-auto max-w-2xl rounded-3xl p-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <label className="mb-3 block text-sm font-medium text-primary-foreground">Monthly Electricity Bill</label>
            <div className="text-gradient-hero mb-4 text-4xl font-extrabold">Rs {bill.toLocaleString()}</div>
            <input
              type="range"
              min={1000}
              max={100000}
              step={500}
              value={bill}
              onChange={(event) => setBill(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-primary-foreground/10 accent-solar-orange"
            />
            <div className="mb-10 mt-2 flex justify-between text-xs text-primary-foreground/40">
              <span>Rs 1,000</span>
              <span>Rs 1,00,000</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl border border-solar-green/20 bg-solar-green/15 p-5">
                <div className="text-2xl font-extrabold text-solar-green md:text-3xl">Rs {annualSavings.toLocaleString()}</div>
                <div className="mt-2 text-xs font-medium text-primary-foreground/50">Annual Savings</div>
              </div>
              <div className="rounded-2xl border border-solar-orange/20 bg-solar-orange/15 p-5">
                <div className="text-2xl font-extrabold text-solar-orange md:text-3xl">{systemSize} kW</div>
                <div className="mt-2 text-xs font-medium text-primary-foreground/50">System Size</div>
              </div>
              <div className="rounded-2xl border border-solar-blue/20 bg-solar-blue/15 p-5">
                <div className="text-2xl font-extrabold text-solar-blue md:text-3xl">{co2Saved} T</div>
                <div className="mt-2 text-xs font-medium text-primary-foreground/50">CO2 Saved / Year</div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/contact"
                className="gradient-cta shine inline-block rounded-xl px-10 py-4 font-bold text-foreground shadow-xl shadow-secondary/25 transition-all hover:scale-105 hover:shadow-2xl"
              >
                Get Detailed Analysis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Reviews" title="What Our Customers Say" subtitle="Real stories from real customers" />
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.name}
                className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="absolute left-6 top-4 font-serif text-8xl leading-none text-primary/10">"</div>
                <div className="mb-6 flex justify-center gap-1">
                  {Array.from({ length: activeTestimonial.rating }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-solar-yellow text-solar-yellow" />
                  ))}
                </div>
                <p className="relative z-10 mb-8 text-lg leading-relaxed text-foreground md:text-xl">"{activeTestimonial.text}"</p>
                <div className="gradient-solar mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-primary-foreground">
                  {activeTestimonial.initials?.[0] || activeTestimonial.name[0]}
                </div>
                <p className="text-lg font-bold text-foreground">{activeTestimonial.name}</p>
                <p className="text-sm text-muted-foreground">{activeTestimonial.role}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setTestIdx((current) => (current - 1 + data.testimonials.length) % data.testimonials.length)}
                className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-border transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setTestIdx((current) => (current + 1) % data.testimonials.length)}
                className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-border transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <SectionHeading
                tag="Get Started"
                title="Ready to Go Solar?"
                subtitle="Fill in your details and our solar experts will contact you with a customized solution."
                center={false}
              />
              <div className="space-y-4 text-muted-foreground">
                {[
                  "Free site survey and assessment",
                  "Custom system design",
                  "Complete subsidy assistance",
                  "25-year warranty coverage",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="gradient-solar flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      <svg className="h-3.5 w-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl shadow-primary/5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-solar-orange/10 to-solar-green/5" />
              <h3 className="mb-6 text-xl font-bold text-foreground">Get Your Free Quote</h3>
              <LeadForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657 13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export default Index;
