import { motion } from "framer-motion";
import { BadgePercent, CreditCard, Building, FileText } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";

const options = [
  { icon: BadgePercent, title: "Solar Loans", desc: "Easy EMI options starting from ₹999/month with partner banks. Zero collateral required." },
  { icon: CreditCard, title: "₹0 Upfront (OPEX)", desc: "No investment needed. Pay only for the power you consume at a discounted rate." },
  { icon: Building, title: "Government Subsidy", desc: "Up to 40% subsidy for residential systems under PM Surya Ghar Yojana." },
  { icon: FileText, title: "PPA Model", desc: "Power Purchase Agreement for commercial clients. Fixed rate for 25 years." },
];

const subsidyTable = [
  { size: "Up to 1 kW", subsidy: "₹30,000/kW", total: "₹30,000" },
  { size: "1-2 kW", subsidy: "₹30,000/kW", total: "₹60,000" },
  { size: "2-3 kW", subsidy: "₹18,000/kW", total: "₹78,000" },
  { size: "Above 3 kW", subsidy: "₹78,000 (fixed)", total: "₹78,000" },
];

const Financing = () => (
  <div>
    <PageBanner title="Financing & Subsidy" subtitle="Make solar affordable with our flexible financing options" breadcrumbs={[{ label: "Home", path: "/" }, { label: "Financing & Subsidy" }]} />

    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading tag="Options" title="Flexible Financing Solutions" />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {options.map((o, i) => (
            <motion.div key={i} className="bg-card rounded-2xl p-6 border border-border card-hover flex gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="w-12 h-12 rounded-xl gradient-solar flex items-center justify-center shrink-0">
                <o.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">{o.title}</h4>
                <p className="text-sm text-muted-foreground">{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <SectionHeading tag="Subsidy" title="Government Subsidy Details" />
        <div className="max-w-3xl mx-auto bg-card rounded-2xl p-8 border border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">System Size</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Subsidy Rate</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Max Subsidy</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {subsidyTable.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3 px-4">{row.size}</td>
                    <td className="py-3 px-4 text-primary font-medium">{row.subsidy}</td>
                    <td className="py-3 px-4">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 max-w-xl">
        <SectionHeading tag="Apply" title="Apply for Financing" />
        <div className="bg-card rounded-2xl p-8 border border-border shadow-lg"><LeadForm /></div>
      </div>
    </section>
  </div>
);

export default Financing;
