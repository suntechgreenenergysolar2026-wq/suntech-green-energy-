import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";

const contactInfo = [
  { icon: MapPin, title: "Address", value: "123 Solar Avenue, Kothrud, Pune, Maharashtra 411038" },
  { icon: Phone, title: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: Mail, title: "Email", value: "info@suntechgreen.com", href: "mailto:info@suntechgreen.com" },
  { icon: Clock, title: "Working Hours", value: "Mon-Sat: 9:00 AM - 6:00 PM" },
];

const Contact = () => (
  <div>
    <PageBanner title="Contact Us" subtitle="Get in touch with our solar experts" breadcrumbs={[{ label: "Home", path: "/" }, { label: "Contact" }]} />

    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-foreground mb-6">Get In Touch</h2>
            <div className="space-y-6 mb-8">
              {contactInfo.map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{c.title}</h4>
                    {c.href ? (
                      <a href={c.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{c.value}</a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.204!2d73.8073!3d18.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzI2LjYiTiA3M8KwNDgnMjYuMyJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Suntech Green Energy Location"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h3>
              <LeadForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

export default Contact;
