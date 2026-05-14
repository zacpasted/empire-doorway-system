import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

type Mode = "claim" | "login";

const claimSchema = z.object({
  first_name: z.string().trim().min(1, "Required").max(60),
  email: z.string().trim().email("Enter a valid email").max(255),
});

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

type Props = {
  mode: Mode;
};

export const MagicLinkForm = ({ mode }: Props) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed =
      mode === "claim"
        ? claimSchema.safeParse({ first_name: firstName, email })
        : loginSchema.safeParse({ email });

    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      setError(first ?? "Check the form.");
      return;
    }

    setSubmitting(true);
    const redirectTo = `${window.location.origin}/library`;
    const data =
      mode === "claim" ? { first_name: firstName.trim() } : undefined;

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
        data,
      },
    });

    setSubmitting(false);

    if (authError) {
      setError("That email did not arrive. Try again.");
      return;
    }

    navigate("/welcome");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      {mode === "claim" && (
        <div>
          <label htmlFor="first_name" className="lib-mono block mb-2 text-charcoal/70">
            First name
          </label>
          <input
            id="first_name"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-transparent border-b border-charcoal/30 px-0 py-2 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-oxblood transition-colors"
            disabled={submitting}
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="lib-mono block mb-2 text-charcoal/70">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-b border-charcoal/30 px-0 py-2 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-oxblood transition-colors"
          disabled={submitting}
        />
      </div>

      {error && <p className="lib-mono text-oxblood">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-oxblood text-bone py-3 px-6 lib-mono hover:bg-charcoal transition-colors duration-200 disabled:opacity-50 cursor-pointer"
        style={{ borderRadius: "2px" }}
      >
        {submitting
          ? "Sending…"
          : mode === "claim"
            ? "Claim a Card"
            : "Send sign-in link"}
      </button>

      <p className="lib-mono text-charcoal/40 text-center pt-2" style={{ fontSize: "10px" }}>
        ONE EMAIL. NO SPAM. UNSUBSCRIBE AT ANY LINE.
      </p>
    </form>
  );
};

export default MagicLinkForm;