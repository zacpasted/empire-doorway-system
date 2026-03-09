import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const JournalSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("lead_magnet_submissions").insert({
        email,
        first_name: firstName,
        source: "journal",
      });

      if (error) throw error;
      setIsSubmitted(true);
      toast.success("You're on the list.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-24 md:py-32 bg-secondary/20 relative">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
            The PASTED Journal
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4 leading-tight">
            Insights on the Future of<br />
            <span className="text-primary">Dentistry, Brand & Practice Growth.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Not ready to apply? Start here. Curated perspectives on building a practice
            that reflects your ambition — delivered to your inbox.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 border border-primary/30 bg-primary/5 rounded-lg max-w-md mx-auto"
            >
              <p className="text-foreground font-serif text-lg">Welcome to the Journal.</p>
              <p className="text-sm text-muted-foreground mt-2">Check your inbox for what's next.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary text-primary-foreground text-sm tracking-[0.15em] uppercase font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground/50 mt-4">
            No spam. Unsubscribe anytime. Written by the PASTED team.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default JournalSection;
