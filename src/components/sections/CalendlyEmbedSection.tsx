import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CalendlyEmbedSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "200px" });
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);

  // Only load Calendly script when section is near viewport
  useEffect(() => {
    if (!isInView) return;
    
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, [isInView]);

  // Listen for Calendly widget ready event
  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      let data = e.data;
      if (typeof data === 'string') {
        try { data = JSON.parse(data); } catch { return; }
      }
      if (!data || typeof data !== 'object') return;
      
      if (data.event === 'calendly.event_type_viewed') {
        setWidgetReady(true);
      }
    };
    window.addEventListener('message', handleCalendlyMessage);
    return () => window.removeEventListener('message', handleCalendlyMessage);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="book-call" 
      className="py-16 md:py-24 bg-background"
    >
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Final Step
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Book Discovery Call
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Schedule a brief alignment conversation with <span className="text-foreground">Zac Orender</span> to confirm strategic fit and discuss your trajectory.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1a1a1a] rounded-xl border border-border overflow-hidden shadow-lg relative"
          style={{ minHeight: '700px' }}
        >
          {/* Loading skeleton */}
          {!widgetReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading calendar...</p>
              </div>
              <div className="mt-8 space-y-3 w-full max-w-sm px-4">
                <div className="h-4 bg-white/10 rounded animate-pulse" />
                <div className="h-4 bg-white/8 rounded animate-pulse w-3/4" />
                <div className="h-10 bg-white/5 rounded animate-pulse mt-4" />
                <div className="h-10 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          )}
          
          {scriptLoaded && (
            <div 
              className={`calendly-inline-widget transition-opacity duration-500 ${widgetReady ? 'opacity-100' : 'opacity-0'}`}
              data-url="https://calendly.com/getpasted/pasted-partner-discovery?background_color=1a1a1a&text_color=ffffff&primary_color=e0c679"
              style={{ minWidth: '320px', height: '700px' }}
            />
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          Availability is intentionally limited. Book only if you can arrive on time and engage thoughtfully.
        </motion.p>
      </div>
    </section>
  );
};

export default CalendlyEmbedSection;
