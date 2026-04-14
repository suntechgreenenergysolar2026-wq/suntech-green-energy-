import { motion } from "framer-motion";
import { Target, Eye, Users, Award, Shield, CheckCircle } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";

const team = [
  { name: "Aditya Sharma", role: "Founder & CEO", initials: "AS" },
  { name: "Priya Deshmukh", role: "Head of Engineering", initials: "PD" },
  { name: "Rohit Mehta", role: "Sales Director", initials: "RM" },
  { name: "Sneha Patil", role: "Operations Manager", initials: "SP" },
];

const certs = ["MNRE Approved", "ISO 9001:2015", "BIS Certified", "NABCB Accredited", "IEC 61215 Compliant", "IS 14286 Certified"];

const About = () => (
  <div>
    <PageBanner title="About Suntech Green Energy" subtitle="Powering India's transition to clean energy since 2014" breadcrumbs={[{ label: "Home", path: "/" }, { label: "About Us" }]} />

    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-4">Our Story</span>
            <h2 className="text-3xl font-bold text-foreground mb-4">A Decade of Solar Excellence</h2>
            <p className="text-muted-foreground mb-4">Founded in 2014, Suntech Green Energy has grown from a small startup to one of India's most trusted solar energy companies. We have installed over 50MW of solar capacity across 500+ projects.</p>
            <p className="text-muted-foreground">Our mission is simple: make clean, affordable solar energy accessible to every home and business in India.</p>
          </motion.div>
          <motion.div className="grid grid-cols-2 gap-4" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {[
              { icon: Target, title: "Mission", desc: "Democratize solar energy access" },
              { icon: Eye, title: "Vision", desc: "100% renewable powered India" },
              { icon: Users, title: "Team", desc: "100+ solar professionals" },
              { icon: Award, title: "Awards", desc: "15+ industry recognitions" },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border text-center">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <SectionHeading tag="Team" title="Meet Our Leadership" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {team.map((t, i) => (
            <motion.div key={i} className="bg-card rounded-2xl p-6 border border-border text-center card-hover" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="w-16 h-16 rounded-full gradient-solar flex items-center justify-center mx-auto mb-3 text-xl font-bold text-primary-foreground">{t.initials}</div>
              <h4 className="font-bold text-foreground text-sm">{t.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading tag="Quality" title="Certifications & Standards" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {certs.map((c, i) => (
            <motion.div key={i} className="bg-card rounded-xl p-4 border border-border flex items-center gap-3 card-hover" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <CheckCircle className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-medium text-foreground">{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
