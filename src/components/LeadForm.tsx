import { useState } from "react";
import { Send, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LeadFormProps {
  compact?: boolean;
}

const LeadForm = ({ compact = false }: LeadFormProps) => {
  const [form, setForm] = useState({ name: "", phone: "", bill: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Thank you! 🎉", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", phone: "", bill: "", message: "" });
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className={inputClass}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        required
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className={inputClass}
      />
      <input
        type="number"
        placeholder="Monthly Electricity Bill (₹)"
        value={form.bill}
        onChange={(e) => setForm({ ...form, bill: e.target.value })}
        className={inputClass}
      />
      {!compact && (
        <textarea
          placeholder="Your Message (Optional)"
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      )}
      <button
        type="submit"
        className="w-full gradient-cta py-4 rounded-xl font-bold text-foreground flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 hover:shadow-xl transition-all hover:scale-[1.02] shine"
      >
        <Send className="w-4 h-4" /> Get Free Quote
      </button>
    </form>
  );
};

export default LeadForm;
