import { motion } from "framer-motion";
import { TrendingUp, Building, Leaf, BarChart3, Shield, Zap } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";

const models = [
  { title: "CAPEX Model", desc: "Own the system outright. Higher upfront cost but maximum long-term savings and 80% depreciation benefit.", color: "bg-primary/10 text-primary" },
  { title: "OPEX Model (PPA)", desc: "Zero investment. Pay only for the power generated at a discounted rate. Immediate savings from Day 1.", color: "bg-secondary/10 text-secondary" },
];

const benefits = [
  { icon: TrendingUp, title: "3-4 Year ROI", desc: "Quick payback period for commercial installations" },
  { icon: BarChart3, title: "80% Depreciation", desc: "Accelerated depreciation tax benefit under IT Act" },
  { icon: Leaf, title: "ESG Compliance", desc: "Improve your sustainability ratings and brand image" },
  { icon: Shield, title: "25-Year Performance", desc: "Guaranteed performance with premium Tier-1 panels" },
];

const caseStudies = [
  { title: "Manufacturing Plant, Pune", capacity: "500 kW", savings: "₹45L/year", roi: "3.2 years" },
  { title: "IT Park, Bangalore", capacity: "1 MW", savings: "₹90L/year", roi: "2.8 years" },
  { title: "Warehouse, Mumbai", capacity: "250 kW", savings: "₹22L/year", roi: "3.5 years" },
];

const Commercial = () => (
  <div>
    <PageBanner title="Commercial & Industrial Solar" subtitle="Maximize ROI with large-scale solar power" breadcrumbs={[{ label: "Home", path: "/" }, { label: "Commercial & Industrial" }]} />

    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading tag="Benefits" title="Why Solar for Business?" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div key={i} className="bg-card rounded-2xl p-6 border border-border card-hover text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><b.icon className="w-6 h-6 text-primary" /></div>
              <h4 className="font-bold text-foreground mb-1">{b.title}</h4>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <SectionHeading tag="Models" title="CAPEX vs OPEX" subtitle="Choose the model that suits your business" />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {models.map((m, i) => (
            <motion.div key={i} className="bg-card rounded-2xl p-8 border border-border card-hover" initial={{ opacity: 0, x: i === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${m.color}`}>{m.title}</span>
              <p className="text-muted-foreground">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading tag="Case Studies" title="Real Results for Real Businesses" />
        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((c, i) => (
            <motion.div key={i} className="bg-card rounded-2xl p-6 border border-border card-hover" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <h4 className="font-bold text-foreground mb-4">{c.title}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Capacity</span><span className="font-medium text-foreground">{c.capacity}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Annual Savings</span><span className="font-medium text-primary">{c.savings}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">ROI Period</span><span className="font-medium text-secondary">{c.roi}</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 max-w-xl">
        <SectionHeading tag="Get Started" title="Request a Consultation" />
        <div className="bg-card rounded-2xl p-8 border border-border shadow-lg"><LeadForm /></div>
      </div>
    </section>
  </div>
);

export default Commercial;
