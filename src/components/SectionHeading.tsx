import { motion } from "framer-motion";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

const SectionHeading = ({ tag, title, subtitle, center = true, light = false }: SectionHeadingProps) => (
  <motion.div
    className={`mb-14 ${center ? "text-center" : ""}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {tag && (
      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5 ${
        light 
          ? "bg-primary-foreground/15 text-primary-foreground" 
          : "bg-primary/10 text-primary border border-primary/20"
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${light ? "bg-solar-yellow" : "bg-solar-orange"} animate-pulse-glow`} />
        {tag}
      </span>
    )}
    <h2 className={`text-3xl md:text-5xl font-extrabold leading-tight ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 text-lg max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
