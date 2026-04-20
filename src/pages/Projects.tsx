import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, MapPin, Zap } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import { usePublicContent } from "@/hooks/use-public-content";
import { resolveContentImageUrl } from "@/lib/default-content";

const Projects = () => {
  const { data } = usePublicContent();
  const [active, setActive] = useState("All");

  const filters = useMemo(() => ["All", ...new Set(data.projects.map((project) => project.category))], [data.projects]);
  const filteredProjects = active === "All" ? data.projects : data.projects.filter((project) => project.category === active);

  return (
    <div>
      <PageBanner
        title="Our Projects"
        subtitle="Built on the same project portfolio you already had, now with CMS-backed flexibility."
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Projects" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading tag="Portfolio" title="Featured Installations" />
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  active === filter ? "gradient-solar text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.id ?? project.title}-${project.sortOrder ?? 0}`}
                className="card-hover overflow-hidden rounded-2xl border border-border bg-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                layout
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={resolveContentImageUrl(project.imageUrl)} alt={project.title} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {project.category}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="mb-2 font-bold text-foreground">{project.title}</h4>
                  <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{project.location}</div>
                    <div className="flex items-center gap-2"><Zap className="h-4 w-4" />{project.capacity}</div>
                    <div className="flex items-center gap-2"><Leaf className="h-4 w-4" />{project.co2Savings} CO2 saved</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
