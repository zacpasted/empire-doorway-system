import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface BeforeAfterVideoCompareProps {
  isInView: boolean;
}

const BeforeAfterVideoCompare = ({ isInView }: BeforeAfterVideoCompareProps) => {
  const [activeView, setActiveView] = useState<"before" | "after">("before");
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle between before/after
  useEffect(() => {
    if (!isInView || !isPlaying) return;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveView((current) => (current === "before" ? "after" : "before"));
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, isPlaying, activeView]);

  // Load Wistia scripts for the "after" video
  useEffect(() => {
    if (!isInView) return;

    const playerScript = document.createElement("script");
    playerScript.src = "https://fast.wistia.com/player.js";
    playerScript.async = true;

    const embedScript = document.createElement("script");
    embedScript.src = "https://fast.wistia.com/embed/6mg4oi3z42.js";
    embedScript.async = true;
    embedScript.type = "module";

    document.head.appendChild(playerScript);
    document.head.appendChild(embedScript);

    return () => {
      if (document.head.contains(playerScript)) document.head.removeChild(playerScript);
      if (document.head.contains(embedScript)) document.head.removeChild(embedScript);
    };
  }, [isInView]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/60 mb-3">
          See The Transformation
        </p>
        <h3 className="font-serif text-2xl md:text-3xl text-foreground">
          Raw Footage → <span className="text-primary">Polished Content</span>
        </h3>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => {
            setActiveView("before");
            setProgress(0);
          }}
          className={`relative px-6 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
            activeView === "before"
              ? "bg-muted text-foreground"
              : "bg-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="relative z-10">Before</span>
          {activeView === "before" && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-muted rounded-lg"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
        <button
          onClick={() => {
            setActiveView("after");
            setProgress(0);
          }}
          className={`relative px-6 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
            activeView === "after"
              ? "bg-primary text-primary-foreground"
              : "bg-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="relative z-10">After</span>
          {activeView === "after" && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary rounded-lg"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Video Container */}
      <div className="relative max-w-2xl mx-auto">
        {/* Frame decoration */}
        <div className="absolute -inset-3 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-2xl blur-xl opacity-50" />
        
        <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-card">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/40 rounded-tl-xl z-20" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/40 rounded-tr-xl z-20" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/40 rounded-bl-xl z-20" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/40 rounded-br-xl z-20" />

          <AnimatePresence mode="wait">
            {activeView === "before" ? (
              <motion.div
                key="before"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[9/16] md:aspect-video bg-muted/50"
              >
                {/* Simulated raw footage look */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    {/* Phone recording UI simulation */}
                    <div className="relative w-48 h-80 md:w-64 md:h-[420px] mx-auto bg-black/80 rounded-3xl border-4 border-muted/30 overflow-hidden shadow-xl">
                      {/* Phone notch */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
                      
                      {/* Recording indicator */}
                      <div className="absolute top-8 left-4 flex items-center gap-2">
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-3 h-3 rounded-full bg-red-500"
                        />
                        <span className="text-white/70 text-xs font-mono">REC 00:32</span>
                      </div>
                      
                      {/* Simulated video content area */}
                      <div className="absolute inset-8 top-16 bottom-20 bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-muted/50 mx-auto mb-3 flex items-center justify-center">
                            <Play className="w-6 h-6 text-muted-foreground/50" />
                          </div>
                          <p className="text-muted-foreground/50 text-xs">Raw selfie footage</p>
                        </div>
                      </div>
                      
                      {/* Phone home bar */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-muted/50 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Raw footage label */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="px-3 py-1.5 rounded-md bg-muted/80 backdrop-blur-sm border border-border/50">
                    <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
                      Raw Footage
                    </span>
                  </div>
                </div>

                {/* Quality indicators */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="flex flex-wrap gap-2">
                    {["Unedited", "No captions", "Basic lighting", "Phone audio"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[10px] rounded bg-muted/60 text-muted-foreground/70 border border-border/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="after"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[9/16] md:aspect-video"
              >
                {/* Polished video embed */}
                <style>
                  {`
                    wistia-player[media-id='6mg4oi3z42']:not(:defined) {
                      background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/6mg4oi3z42/swatch');
                      display: block;
                      filter: blur(5px);
                      padding-top: 177.78%;
                    }
                    @media (min-width: 768px) {
                      wistia-player[media-id='6mg4oi3z42']:not(:defined) {
                        padding-top: 56.25%;
                      }
                    }
                  `}
                </style>
                {/* @ts-ignore - Wistia custom element */}
                <wistia-player
                  media-id="6mg4oi3z42"
                  aspect="0.5625"
                  style={{ width: "100%", height: "100%" }}
                />

                {/* Polished label */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="px-3 py-1.5 rounded-md bg-primary/90 backdrop-blur-sm">
                    <span className="text-xs font-medium text-primary-foreground tracking-wider uppercase">
                      Polished Content
                    </span>
                  </div>
                </div>

                {/* Quality indicators */}
                <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                  <div className="flex flex-wrap gap-2">
                    {["Color graded", "Captions", "Sound design", "Optimized"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[10px] rounded bg-primary/80 text-primary-foreground border border-primary/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30 z-20">
            <motion.div
              className={`h-full ${activeView === "after" ? "bg-primary" : "bg-muted-foreground/50"}`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Play/Pause control */}
        <button
          onClick={togglePlayPause}
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-lg hover:border-primary/50 transition-colors z-30"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Play className="w-4 h-4 text-muted-foreground ml-0.5" />
          )}
        </button>
      </div>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="text-center text-sm text-muted-foreground/60 mt-10 max-w-md mx-auto"
      >
        You send us raw footage from your phone. We transform it into scroll-stopping, 
        brand-building content.
      </motion.p>
    </motion.div>
  );
};

export default BeforeAfterVideoCompare;
