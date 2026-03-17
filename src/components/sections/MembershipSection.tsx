import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MembershipSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("lead_magnet_submissions").insert({
        email, first_name: "Membership Waitlist", source: "membership-waitlist",
      });
      if (error) throw error;
      setIsSubmitted(true);
      toast.success("You're on the waitlist.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />
      <div className="container max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Coming Soon</p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4 leading-tight">
            PASTED Membership
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-4 leading-relaxed">
            A private community for elite cosmetic dentists.
            Curated connections, strategic insights, and the relationships
            that define the next chapter of aesthetic dentistry.
          </p>
          <p className="text-sm text-foreground/60 italic mb-10">
            Membership details will be announced soon. Join the waitlist to be first.
          </p>

          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="p-6 border border-primary/30 bg-primary/5 rounded-lg max-w-sm mx-auto">
              <p className="text-foreground font-serif text-lg">You're on the list.</p>
              <p className="text-sm text-muted-foreground mt-2">We'll be in touch when doors open.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="flex-1 px-4 py-3 bg-background border border-border/50 rounded-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors" />
              <button type="submit" disabled={isSubmitting}
                className="px-6 py-3 bg-primary text-primary-foreground text-sm tracking-[0.15em] uppercase font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
                {isSubmitting ? "..." : "Join Waitlist"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipSection;