import { motion } from "framer-motion";
import { Award, CheckCircle, Eye, Target, Users } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import { usePublicContent } from "@/hooks/use-public-content";

const team = [
  { name: "Aditya Sharma", role: "Founder & CEO", initials: "AS" },
  { name: "Priya Deshmukh", role: "Head of Engineering", initials: "PD" },
  { name: "Rohit Mehta", role: "Sales Director", initials: "RM" },
  { name: "Sneha Patil", role: "Operations Manager", initials: "SP" },
];

const certs = ["MNRE Approved", "ISO 9001:2015", "BIS Certified", "NABCB Accredited", "IEC 61215 Compliant", "IS 14286 Certified"];

const About = () => {
  const { data } = usePublicContent();

  return (
    <div>
      <PageBanner
        title={`About ${data.companyProfile.name}`}
        subtitle={`Powering India's transition to clean energy since ${data.companyProfile.yearEstablished}`}
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "About Us" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Our Story
              </span>
              <h2 className="mb-4 text-3xl font-bold text-foreground">{data.aboutPage.storyTitle}</h2>
              <p className="mb-4 text-muted-foreground">{data.aboutPage.storyParagraph1}</p>
              <p className="text-muted-foreground">{data.aboutPage.storyParagraph2}</p>
            </motion.div>
            <motion.div className="grid grid-cols-2 gap-4" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {[
                { icon: Target, title: "Mission", desc: "Democratize solar energy access" },
                { icon: Eye, title: "Vision", desc: "100% renewable powered India" },
                { icon: Users, title: "Team", desc: "100+ solar professionals" },
                { icon: Award, title: "Awards", desc: "15+ industry recognitions" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-4 text-center">
                  <item.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Team" title="Meet Our Leadership" />
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="card-hover rounded-2xl border border-border bg-card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="gradient-solar mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-primary-foreground">
                  {member.initials}
                </div>
                <h4 className="text-sm font-bold text-foreground">{member.name}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Quality" title="Certifications & Standards" />
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
            {certs.map((certification, index) => (
              <motion.div
                key={certification}
                className="card-hover flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{certification}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
