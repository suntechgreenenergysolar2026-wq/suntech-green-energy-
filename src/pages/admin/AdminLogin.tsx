import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminLogin } from "@/lib/api";
import { saveAdminSession } from "@/lib/admin-auth";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-solar-orange/50 focus:outline-none";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = (location.state as { from?: string } | null)?.from || "/admin";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const session = await adminLogin(email, password);
      saveAdminSession(session);
      navigate(nextPath, { replace: true });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen gradient-dark px-4 py-12 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8">
          <p className="mb-3 inline-flex rounded-full border border-solar-orange/20 bg-solar-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-solar-orange">
            Admin Portal
          </p>
          <h1 className="text-3xl font-extrabold">SUNTECH Dashboard</h1>
          <p className="mt-2 text-sm text-white/65">
            Sign in to manage projects, blog posts, testimonials, settings, and media.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Email</label>
            <input className={inputClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Password</label>
            <input className={inputClass} type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>

          {error ? <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl gradient-cta px-4 py-3 font-bold text-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-xs leading-relaxed text-white/45">
          Use the admin email and password configured in `.env`.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
