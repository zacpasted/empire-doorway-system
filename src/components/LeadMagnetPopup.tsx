import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";

const STORAGE_KEY = "leadMagnetDismissed";
const STORAGE_UNLOCKED_KEY = "leadMagnetUnlocked";
const VIDEO_ID = "jl8fuq6wcz";

const LeadMagnetPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Use shared Wistia loader - only load when unlocked and open
  useWistiaLoader(VIDEO_ID, { loadOnMount: isUnlocked && isOpen });

  useEffect(() => {
    // Check if already dismissed or unlocked
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const unlocked = localStorage.getItem(STORAGE_UNLOCKED_KEY);
    
    if (unlocked) {
      setIsUnlocked(true);
    }
    
    if (dismissed || unlocked) return;

    // Show popup after 8 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !email.trim() || !email.includes("@")) {
      toast({
        title: "Please fill in all fields",
        description: "We need your name and email to unlock the mini-series.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('lead_magnet_submissions')
        .insert({
          first_name: firstName.trim(),
          email: email.trim(),
          source: 'mini_series_popup',
        });

      if (error) throw error;

      localStorage.setItem(STORAGE_UNLOCKED_KEY, "true");
      setIsUnlocked(true);
      
      toast({
        title: "You're in!",
        description: "Enjoy the free mini-series.",
      });
    } catch (error) {
      console.error("Error saving lead:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={handleDismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {!isUnlocked ? (
              /* Gate Form */
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Film className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Free Mini-Series by PASTED Filmmaking Team
                  </p>
                  <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                    How to Self-Film Dental Content
                    <span className="block text-primary">That Actually Converts</span>
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Learn the exact filming techniques our team uses to create content that builds authority and attracts ideal patients.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="lead-firstName" className="text-sm text-muted-foreground">
                      First Name
                    </Label>
                    <Input
                      id="lead-firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Your first name"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-email" className="text-sm text-muted-foreground">
                      Email
                    </Label>
                    <Input
                      id="lead-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="bg-background"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="premium"
                    className="w-full py-6 text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Unlocking..." : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Watch Free Mini-Series
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    No spam. Just valuable content.
                  </p>
                </form>
              </div>
            ) : (
              /* Video Player */
              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    Free Mini-Series
                  </p>
                  <h2 className="text-xl md:text-2xl font-serif text-foreground">
                    How to Self-Film Dental Content That Converts
                  </h2>
                </div>
                
                {/* Wistia Video Embed */}
                <div className="rounded-lg overflow-hidden">
                  <style>{getWistiaPlaceholderStyles(VIDEO_ID, '56.56%')}</style>
                  {/* @ts-ignore - Wistia custom element */}
                  <wistia-player 
                    media-id={VIDEO_ID} 
                    aspect="1.7679558011049723"
                  />
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="ghost"
                    onClick={handleDismiss}
                    className="text-muted-foreground"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnetPopup;
