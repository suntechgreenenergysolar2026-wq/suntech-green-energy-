import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock, Lightbulb, ShieldCheck, SunMedium, Wallet } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import { usePublicContent } from "@/hooks/use-public-content";
import { resolveContentImageUrl } from "@/lib/default-content";
import heroCommercial from "@/assets/hero-commercial.jpg";

const postIcons = [Wallet, Lightbulb, ShieldCheck];

const formatPostDate = (value?: string) => {
  if (!value) {
    return "Recently updated";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
};

const Blog = () => {
  const { data } = usePublicContent();
  const featuredPost = data.blogPosts.find((post) => post.isFeatured) ?? data.blogPosts[0];
  const posts = data.blogPosts.filter((post) => post.id !== featuredPost?.id && post.slug !== featuredPost?.slug);

  return (
    <div>
    <PageBanner
      title="Solar Blog"
      subtitle="Useful rooftop solar guides for homes, housing societies, and commercial properties."
      breadcrumbs={[{ label: "Home", path: "/" }, { label: "Blog" }]}
      image={heroCommercial}
    />

    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-primary/5"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-72 overflow-hidden md:h-96">
              <img src={resolveContentImageUrl(featuredPost.imageUrl)} alt={featuredPost.title} className="h-full w-full object-cover" />
              <div className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
                Featured
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <SunMedium className="h-4 w-4" />
              {featuredPost.category}
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-foreground md:text-5xl">{featuredPost.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{featuredPost.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                {formatPostDate(featuredPost.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                {featuredPost.readTime || "4 min read"}
              </span>
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-solar-green px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:scale-105 hover:bg-solar-green/90"
            >
              Talk to a Solar Expert
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Latest Solar Guides"
          subtitle="Clear, practical reads to help you compare options and make confident solar decisions."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const PostIcon = postIcons[index % postIcons.length];

            return (
            <motion.article
              key={post.title}
              className="card-hover overflow-hidden rounded-2xl border border-border bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={resolveContentImageUrl(post.imageUrl)} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute left-3 top-3 rounded-full bg-card/95 px-3 py-1 text-xs font-bold text-solar-green shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <PostIcon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold leading-snug text-foreground">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    {formatPostDate(post.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {post.readTime || "4 min read"}
                  </span>
                </div>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  </div>
  );
};

export default Blog;
