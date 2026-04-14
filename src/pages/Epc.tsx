import { motion } from "framer-motion";
import { Wrench, Monitor, Droplets, Calendar, Settings, CheckCircle } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";

const services = [
  { icon: Settings, title: "EPC Services", desc: "End-to-end Engineering, Procurement, and Construction for solar projects of any scale." },
  { icon: Monitor, title: "Remote Monitoring", desc: "24/7 real-time monitoring systems to track performance and detect issues instantly." },
  { icon: Droplets, title: "Panel Cleaning", desc: "Regular automated and manual cleaning schedules to maintain peak efficiency." },
  { icon: Wrench, title: "Preventive Maintenance", desc: "Scheduled inspections, inverter servicing, and electrical checks." },
  { icon: Calendar, title: "AMC Plans", desc: "Comprehensive Annual Maintenance Contracts with guaranteed uptime." },
  { icon: CheckCircle, title: "Performance Audit", desc: "Detailed performance analysis and optimization recommendations." },
];

const Epc = () => (
  <div>
    <PageBanner title="EPC & Maintenance" subtitle="Complete engineering and maintenance solutions" breadcrumbs={[{ label: "Home", path: "/" }, { label: "EPC & Maintenance" }]} />

    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading tag="Services" title="Our EPC & Maintenance Services" subtitle="From installation to lifetime maintenance — we've got you covered" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div key={i} className="bg-card rounded-2xl p-6 border border-border card-hover" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="w-12 h-12 rounded-xl gradient-solar flex items-center justify-center mb-4">
                <s.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="font-bold text-foreground mb-2">{s.title}</h4>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 max-w-xl">
        <SectionHeading tag="Contact" title="Schedule a Maintenance Visit" />
        <div className="bg-card rounded-2xl p-8 border border-border shadow-lg"><LeadForm /></div>
      </div>
    </section>
  </div>
);

export default Epc;
