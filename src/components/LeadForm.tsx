import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { submitLead } from "@/lib/api";
import { getMarketingContext, trackEvent } from "@/lib/analytics";

interface LeadFormProps {
  compact?: boolean;
  fillHeight?: boolean;
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

const LeadForm = ({ compact = false, fillHeight = false }: LeadFormProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bill: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const context = getMarketingContext();

      await submitLead({
        ...form,
        sourcePage: context.path,
        referrer: context.referrer,
        utmSource: context.utmSource,
        utmMedium: context.utmMedium,
        utmCampaign: context.utmCampaign,
      });

      await trackEvent("lead_submitted", {
        sourcePage: context.path,
      });

      toast({
        title: "Thank you!",
        description: "Your enquiry has been sent successfully. Our team will contact you shortly.",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        bill: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={fillHeight ? "flex h-full flex-col gap-4" : "space-y-4"}>
      <div className={fillHeight ? "flex flex-1 flex-col gap-4" : "space-y-4"}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          className={inputClass}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
          className={inputClass}
        />
        <input
          type="number"
          placeholder="Monthly Electricity Bill (Rs)"
          value={form.bill}
          onChange={(event) => setForm((current) => ({ ...current, bill: event.target.value }))}
          className={inputClass}
        />
        {!compact ? (
          <textarea
            placeholder="Your Message (Optional)"
            rows={3}
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            className={`${inputClass} resize-none ${fillHeight ? "min-h-[180px] lg:flex-1" : ""}`}
          />
        ) : null}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full gradient-cta rounded-xl py-4 font-bold text-foreground shadow-lg shadow-secondary/20 transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 ${fillHeight ? "mt-auto" : ""}`}
      >
        <span className="flex items-center justify-center gap-2">
          <Send className="h-4 w-4" />
          {isSubmitting ? "Sending..." : "Get Free Quote"}
        </span>
      </button>
    </form>
  );
};

export default LeadForm;
