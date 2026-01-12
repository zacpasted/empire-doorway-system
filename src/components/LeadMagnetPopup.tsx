import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";

const STORAGE_KEY = "leadMagnetDismissed";
const STORAGE_UNLOCKED_KEY = "leadMagnetUnlocked";
const VIDEO_ID = "jl8fuq6wcz";
const POPUP_DELAY_SECONDS = 45;
const EXIT_INTENT_THRESHOLD = 20; // pixels from top of viewport
const SCROLL_DEPTH_TRIGGER = 50; // percentage

// Generate or retrieve session ID for anonymous tracking
const getSessionId = () => {
  const key = "popup_session_id";
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
};

const LeadMagnetPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [triggerType, setTriggerType] = useState<string | null>(null);
  const [currentScrollDepth, setCurrentScrollDepth] = useState(0);
  const { toast } = useToast();

  // Use shared Wistia loader - only load when unlocked and open
  useWistiaLoader(VIDEO_ID, { loadOnMount: isUnlocked && isOpen });

  // Track analytics event
  const trackEvent = useCallback(async (
    eventType: 'impression' | 'conversion' | 'dismiss',
    trigger?: string,
    scrollDepth?: number
  ) => {
    try {
      await supabase.from('popup_analytics').insert({
        event_type: eventType,
        trigger_type: trigger || triggerType,
        session_id: getSessionId(),
        page_url: window.location.pathname,
        user_agent: navigator.userAgent,
        viewport_width: window.innerWidth,
        scroll_depth_percent: scrollDepth ?? currentScrollDepth,
      });
    } catch (error) {
      console.error('Failed to track popup event:', error);
    }
  }, [triggerType, currentScrollDepth]);

  // Use shared Wistia loader - only load when unlocked and open
  useWistiaLoader(VIDEO_ID, { loadOnMount: isUnlocked && isOpen });

  // Check if popup should be shown (not dismissed or unlocked)
  const canShowPopup = useCallback(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const unlocked = localStorage.getItem(STORAGE_UNLOCKED_KEY);
    return !dismissed && !unlocked && !hasTriggered;
  }, [hasTriggered]);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is leaving through the top of the viewport
      if (e.clientY <= EXIT_INTENT_THRESHOLD && canShowPopup()) {
        setTriggerType('exit_intent');
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    // Only add listener on desktop (exit intent doesn't work well on mobile)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [canShowPopup]);

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.round((window.scrollY / scrollHeight) * 100);
      setCurrentScrollDepth(scrollProgress);
      
      if (scrollProgress >= SCROLL_DEPTH_TRIGGER && canShowPopup()) {
        setTriggerType('scroll_depth');
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [canShowPopup]);

  // Track impression when popup opens
  useEffect(() => {
    if (isOpen && triggerType) {
      trackEvent('impression', triggerType, currentScrollDepth);
    }
  }, [isOpen, triggerType]);

  useEffect(() => {
    // Check if already dismissed or unlocked
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const unlocked = localStorage.getItem(STORAGE_UNLOCKED_KEY);
    
    if (unlocked) {
      setIsUnlocked(true);
    }
    
    if (dismissed || unlocked) return;

    // Show popup after delay (fallback if exit intent doesn't trigger)
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setTriggerType('timer');
        setIsOpen(true);
        setHasTriggered(true);
      }
    }, POPUP_DELAY_SECONDS * 1000);

    return () => clearTimeout(timer);
  }, [hasTriggered]);

  const handleDismiss = () => {
    trackEvent('dismiss');
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleUnlockClick = () => {
    setShowForm(true);
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

      // Track conversion
      await trackEvent('conversion');

      localStorage.setItem(STORAGE_UNLOCKED_KEY, "true");
      setIsUnlocked(true);
      setShowForm(false);
      
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
          {/* Backdrop with animated grain */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={handleDismiss}
          >
            {/* Animated background accents */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 30, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px]"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.2, 0.4],
                x: [0, -20, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg"
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-2xl blur-xl opacity-60"
              animate={{ 
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Card container */}
            <div className="relative bg-card/95 backdrop-blur-sm border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/40 rounded-tl-2xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-primary/40 rounded-tr-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-primary/40 rounded-bl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/40 rounded-br-2xl pointer-events-none" />
              
              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                animate={{ 
                  top: ["0%", "100%", "0%"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Close button */}
              <motion.button
                onClick={handleDismiss}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/50 hover:bg-background/80 border border-border/50 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </motion.button>

              {!isUnlocked ? (
                <AnimatePresence mode="wait">
                  {!showForm ? (
                    /* Video Thumbnail + CTA */
                    <motion.div
                      key="thumbnail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-6"
                    >
                      {/* Video Thumbnail */}
                      <motion.div 
                        className="relative aspect-video rounded-xl overflow-hidden mb-6 cursor-pointer group"
                        onClick={handleUnlockClick}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Thumbnail background */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url('https://fast.wistia.com/embed/medias/${VIDEO_ID}/swatch')`
                          }}
                        />
                        <img 
                          src={`https://fast.wistia.com/oembed/medias/${VIDEO_ID}.json?embedType=async`}
                          alt=""
                          className="hidden"
                        />
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ 
                            backgroundImage: `url('https://embed-ssl.wistia.com/deliveries/0e44ade9f3fd6dff22c6a57a7f59cd79.jpg?image_crop_resized=1280x720')`
                          }}
                        />
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            className="relative"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            {/* Pulse rings */}
                            <motion.div
                              className="absolute inset-0 rounded-full bg-primary/30"
                              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-full bg-primary/20"
                              animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                            />
                            <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                              <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                            </div>
                          </motion.div>
                        </div>
                        
                        {/* Duration badge */}
                        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 rounded text-xs text-white/80 backdrop-blur-sm">
                          Free Series
                        </div>
                      </motion.div>
                      
                      {/* Content */}
                      <motion.div 
                        className="text-center space-y-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                          <Sparkles className="w-3 h-3 text-primary" />
                          <span className="text-xs tracking-wider uppercase text-primary">Free Training</span>
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-serif text-foreground leading-tight">
                          How to Self-Film Content
                          <span className="block text-muted-foreground font-light italic">That Actually Converts</span>
                        </h2>
                        
                        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                          Learn the exact filming techniques our team uses to build authority for the world's top dentists.
                        </p>
                        
                        <Button
                          onClick={handleUnlockClick}
                          className="w-full py-6 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl group relative overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                          />
                          <span className="relative flex items-center justify-center gap-2">
                            <Play className="w-4 h-4" />
                            Unlock Free Training
                          </span>
                        </Button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    /* Form State */
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-8"
                    >
                      <motion.button
                        onClick={() => setShowForm(false)}
                        className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1"
                        whileHover={{ x: -3 }}
                      >
                        ← Back
                      </motion.button>
                      
                      <div className="text-center mb-8">
                        <h2 className="text-xl md:text-2xl font-serif text-foreground mb-2">
                          Almost There
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Enter your details to unlock instant access.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="lead-firstName" className="text-sm text-muted-foreground">
                            First Name
                          </Label>
                          <Input
                            id="lead-firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Your first name"
                            className="bg-background/50 border-border/50 focus:border-primary/50"
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
                            className="bg-background/50 border-border/50 focus:border-primary/50"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full py-6 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            />
                          ) : (
                            "Watch Now"
                          )}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground/60">
                          No spam. Just valuable content.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                /* Video Player */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4"
                >
                  <div className="text-center mb-4">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      Free Mini-Series
                    </p>
                    <h2 className="text-lg font-serif text-foreground">
                      Self-Film Content That Converts
                    </h2>
                  </div>
                  
                  <div className="rounded-xl overflow-hidden">
                    <style>{getWistiaPlaceholderStyles(VIDEO_ID, '56.25%')}</style>
                    {/* @ts-ignore - Wistia custom element */}
                    <wistia-player 
                      media-id={VIDEO_ID} 
                      aspect="1.7778"
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <Button
                      variant="ghost"
                      onClick={handleDismiss}
                      className="text-muted-foreground text-sm"
                    >
                      Close
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnetPopup;
