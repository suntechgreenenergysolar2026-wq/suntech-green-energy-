import { motion } from "framer-motion";
import { Sun, Zap, Battery, Home, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { useState } from "react";

const benefits = [
  { icon: Zap, title: "Save Up to 90%", desc: "Drastically reduce your monthly electricity bills" },
  { icon: Shield, title: "25-Year Warranty", desc: "Long-term performance guarantee on all panels" },
  { icon: Sun, title: "Government Subsidy", desc: "Up to 40% subsidy under PM Surya Ghar scheme" },
  { icon: Battery, title: "Battery Backup", desc: "Optional battery storage for uninterrupted power" },
];

const rooftopTypes = [
  { title: "Flat Roof (RCC)", desc: "Most common in Indian homes. Ideal for south-facing installations with optimal tilt angle." },
  { title: "Sloped / Tiled Roof", desc: "Special mounting structures ensure secure installation without damage to existing tiles." },
  { title: "Metal Sheet Roof", desc: "Lightweight clamp-on solutions for industrial-style metal roofs." },
];

const Residential = () => {
  const [bill, setBill] = useState(5000);
  const savings = Math.round(bill * 0.85 * 12);

  return (
    <div>
      <PageBanner
        title="Residential Solar Solutions"
        subtitle="Power your home with clean, affordable solar energy"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Residential Solar" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Benefits" title="Why Go Solar for Your Home?" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} className="bg-card rounded-2xl p-6 border border-border card-hover text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-1">{b.title}</h4>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Subsidy" title="Government Subsidy for Residential Solar" subtitle="Under PM Surya Ghar Muft Bijli Yojana" />
          <div className="max-w-3xl mx-auto bg-card rounded-2xl p-8 border border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">System Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Subsidy Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Your Cost (Approx.)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-3 px-4">1 kW</td><td className="py-3 px-4 text-primary font-medium">₹30,000</td><td className="py-3 px-4">₹35,000</td></tr>
                  <tr className="border-b border-border"><td className="py-3 px-4">2 kW</td><td className="py-3 px-4 text-primary font-medium">₹60,000</td><td className="py-3 px-4">₹70,000</td></tr>
                  <tr className="border-b border-border"><td className="py-3 px-4">3 kW</td><td className="py-3 px-4 text-primary font-medium">₹78,000</td><td className="py-3 px-4">₹1,10,000</td></tr>
                  <tr><td className="py-3 px-4">3+ kW</td><td className="py-3 px-4 text-primary font-medium">₹78,000 (max)</td><td className="py-3 px-4">Varies</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Roof Types" title="Solar for Every Rooftop" />
          <div className="grid md:grid-cols-3 gap-8">
            {rooftopTypes.map((r, i) => (
              <motion.div key={i} className="bg-card rounded-2xl p-6 border border-border card-hover" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Home className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold text-foreground mb-2">{r.title}</h4>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-2xl">
          <SectionHeading tag="Calculate" title="Your Solar Savings" />
          <div className="bg-card rounded-2xl p-8 border border-border">
            <label className="block text-sm font-medium text-foreground mb-2">Monthly Bill: ₹{bill.toLocaleString()}</label>
            <input type="range" min={1000} max={50000} step={500} value={bill} onChange={(e) => setBill(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-solar-orange mb-6" />
            <div className="text-center bg-primary/5 rounded-xl p-6">
              <div className="text-3xl font-bold text-primary">₹{savings.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">Estimated Annual Savings</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-xl">
          <SectionHeading tag="Get Started" title="Get a Free Site Survey" />
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Residential;
