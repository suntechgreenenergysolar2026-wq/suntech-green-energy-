import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import { usePublicContent } from "@/hooks/use-public-content";

const Reviews = () => {
  const { data } = usePublicContent();
  const testimonials = data.testimonials;
  const googleReviews = testimonials.filter((item) => item.source === "google");
  const averageRating =
    testimonials.length > 0
      ? (testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length).toFixed(1)
      : "0.0";

  return (
    <div>
      <PageBanner
        title="Customer Reviews"
        subtitle="Read the reviews and ratings shown across the SUNTECH website, including synced Google reviews."
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Reviews" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeading
                tag="Review Hub"
                title="All reviews in one place"
                subtitle="This page combines your manual testimonials with synced Google reviews so visitors can browse older reviews and newly imported ones from the same place."
                center={false}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Total reviews</div>
                <div className="mt-3 text-4xl font-extrabold text-foreground">{testimonials.length}</div>
              </div>
              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Google reviews</div>
                <div className="mt-3 text-4xl font-extrabold text-foreground">{googleReviews.length}</div>
              </div>
              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Average rating</div>
                <div className="mt-3 text-4xl font-extrabold text-foreground">{averageRating}</div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book free solar visit
              <ArrowRight className="h-4 w-4" />
            </Link>
            {data.companyProfile.googleReviewUrl ? (
              <a
                href={data.companyProfile.googleReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
              >
                View on Google
              </a>
            ) : null}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.sourceId || `${testimonial.name}-${index}`}
                className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex rounded-full bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                    {testimonial.sourceLabel || "Customer Review"}
                  </div>
                  {testimonial.reviewedAt ? (
                    <div className="text-xs font-medium text-muted-foreground">
                      {new Date(testimonial.reviewedAt).toLocaleDateString()}
                    </div>
                  ) : null}
                </div>

                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-solar-yellow text-solar-yellow" />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">"{testimonial.text}"</p>

                {testimonial.replyText ? (
                  <div className="mt-5 rounded-2xl bg-muted/50 p-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Business reply:</span> {testimonial.replyText}
                  </div>
                ) : null}

                <div className="mt-6 flex items-center gap-3">
                  {testimonial.imageUrl ? (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      loading="lazy"
                      className="h-12 w-12 rounded-full border border-border object-cover"
                    />
                  ) : (
                    <div className="gradient-solar flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
                      {testimonial.initials || testimonial.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
