import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { submitLead } from "@/lib/api";
import { getMarketingContext, trackEvent } from "@/lib/analytics";

interface LeadFormProps {
  compact?: boolean;
  fillHeight?: boolean;
  showConsultationHeader?: boolean;
  referenceStyle?: boolean;
}

const inputClass =
  "w-full rounded-2xl border border-border/80 bg-muted/40 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)] transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/25";

const referenceInputClass =
  "w-full rounded-xl border border-[#d8deec] bg-white px-4 py-4 text-sm text-[#242b5a] placeholder:text-[#242b5a] transition-all focus:border-[#1b25a8] focus:outline-none focus:ring-2 focus:ring-[#1b25a8]/15";

const billOptions = [
  { label: "Rs.3000 - Rs.5000", value: "4000" },
  { label: "Above Rs.5000", value: "6000" },
];

const referenceBillOptions = [
  { label: "Less than Rs.1500", value: "1000" },
  { label: "Rs.1500 - Rs.2500", value: "2000" },
  { label: "Rs.2500 - Rs.4000", value: "3250" },
  { label: "Rs.4000 - Rs.8000", value: "6000" },
  { label: "More than Rs.8000", value: "9000" },
];

const LeadForm = ({ compact = false, fillHeight = false, showConsultationHeader = false, referenceStyle = false }: LeadFormProps) => {
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pinCode: "",
    city: referenceStyle ? "Pune" : "",
    bill: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(referenceStyle);

  const fieldSpacingClass = referenceStyle ? "space-y-5" : compact ? "space-y-3" : "space-y-4";
  const activeInputClass = referenceStyle ? referenceInputClass : inputClass;
  const activeBillOptions = referenceStyle ? referenceBillOptions : billOptions;

  useEffect(() => {
    const cityFromUrl = new URLSearchParams(location.search).get("city");
    if (cityFromUrl === "Pune" || cityFromUrl === "PCMC") {
      setForm((current) => ({ ...current, city: cityFromUrl }));
    }
  }, [location.search]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.bill) {
      toast({
        title: "Select monthly bill range",
        description: "Please choose your monthly electricity bill category to continue.",
        variant: "destructive",
      });
      return;
    }

    if (referenceStyle && !acceptedPolicy) {
      toast({
        title: "Accept terms",
        description: "Please accept the terms and privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }

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
        phone: "",
        pinCode: "",
        city: referenceStyle ? "Pune" : "",
        bill: "",
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
    <form onSubmit={handleSubmit} className={fillHeight ? "flex h-full flex-col gap-4" : referenceStyle ? "space-y-5" : "space-y-4"}>
      {showConsultationHeader ? (
        <div>
          <h3 className={referenceStyle ? "text-2xl font-extrabold leading-tight text-[#101840] md:text-3xl" : "text-3xl font-extrabold leading-tight text-foreground"}>
            Book a FREE Solar Consultation
          </h3>
          <p className={referenceStyle ? "mt-3 text-base text-[#4c527e]" : "mt-2 text-base text-muted-foreground"}>And save up to Rs.78,000 with subsidy</p>
        </div>
      ) : null}

      <div className={fillHeight ? "flex flex-1 flex-col gap-4" : fieldSpacingClass}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className={activeInputClass}
        />
        <input
          type="tel"
          placeholder="Whatsapp Number"
          required
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
          className={activeInputClass}
        />
        <input
          type="text"
          placeholder="PIN Code"
          required
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          value={form.pinCode}
          onChange={(event) => setForm((current) => ({ ...current, pinCode: event.target.value.replace(/\D/g, "").slice(0, 6) }))}
          className={activeInputClass}
        />
        <select
          required
          value={form.city}
          onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
          className={referenceStyle ? "hidden" : activeInputClass}
        >
          <option value="" disabled>
            Select City
          </option>
          <option value="Pune">Pune</option>
          <option value="PCMC">PCMC</option>
        </select>

        <div>
          <label className={referenceStyle ? "mb-2 block text-sm font-medium text-[#242b5a]" : "mb-2 block text-sm font-semibold text-foreground"}>
            Monthly Electricity Bill
          </label>
          <div className={referenceStyle ? "flex flex-wrap gap-3" : "grid grid-cols-1 gap-2 sm:grid-cols-2"}>
            {activeBillOptions.map((option) => {
              const selected = form.bill === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setForm((current) => ({ ...current, bill: option.value }))}
                  className={
                    referenceStyle
                      ? `min-w-[150px] rounded-xl border px-5 py-3 text-sm font-extrabold transition-colors ${
                          selected ? "border-[#1b25a8] bg-[#1b25a8] text-white" : "border-[#d8deec] bg-white text-[#07103a] hover:border-[#1b25a8]/35"
                        }`
                      : `rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                          selected ? "border-primary bg-primary text-primary-foreground" : "border-border/80 bg-muted/40 text-foreground hover:bg-muted/65"
                        }`
                  }
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="monthlyBillCategory" value={form.bill} required />
        </div>
      </div>

      {referenceStyle ? (
        <label className="flex items-start gap-2 text-sm text-[#3d456e]">
          <input
            type="checkbox"
            checked={acceptedPolicy}
            onChange={(event) => setAcceptedPolicy(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[#9ba4e8] accent-[#98a0ea]"
          />
          <span>
            I agree to Suntech Green Energy{" "}
            <a href="/contact" className="font-semibold text-[#111eb4] underline">
              Terms of use
            </a>{" "}
            and{" "}
            <a href="/contact" className="font-semibold text-[#111eb4] underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded-xl bg-[#111544] py-4 font-bold text-white shadow-lg transition-colors hover:bg-[#0f1338] disabled:cursor-not-allowed disabled:opacity-70 ${fillHeight ? "mt-auto" : ""}`}
      >
        <span className="flex items-center justify-center gap-2">{isSubmitting ? "Sending..." : "Book a FREE Consultation"}</span>
      </button>
    </form>
  );
};

export default LeadForm;
