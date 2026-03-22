import { useState, useEffect } from "react";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";
import { Play } from "lucide-react";

const VideoPlayer = () => {
  const mediaId = "nh7ancshfq";
  const [isReady, setIsReady] = useState(false);
  
  // Use shared Wistia loader for efficient script management
  useWistiaLoader(mediaId);

  // Track when Wistia player is ready
  useEffect(() => {
    const checkReady = () => {
      const player = document.querySelector(`wistia-player[media-id="${mediaId}"]`);
      if (player) {
        setIsReady(true);
      }
    };
    
    checkReady();
    const timeout = setTimeout(checkReady, 500);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-2xl animate-subtle-glow group cursor-pointer">
      <style>
        {getWistiaPlaceholderStyles(mediaId, '56.56%')}
      </style>
      
      {/* Compelling placeholder with social proof */}
      {!isReady && (
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

          {/* Top badge — builds credibility before play */}
          <div className="absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] md:text-[10px] text-white/70 font-medium tracking-wide uppercase">
              How elite practices are built
            </span>
          </div>
          
          <div className="relative flex flex-col items-center">
            {/* Play button */}
            <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/40 group-hover:scale-110 transition-transform duration-200">
              <Play className="w-5 h-5 md:w-8 md:h-8 text-primary-foreground ml-0.5 md:ml-1" fill="currentColor" />
            </div>
            
            {/* CTA text */}
            <p className="mt-3 md:mt-4 text-[10px] md:text-sm text-white/80 font-medium tracking-wide uppercase">
              Watch the Full Breakdown
            </p>
            <p className="mt-0.5 text-[8px] md:text-xs text-white/40">
              12 min · See how top practices generate $500K–$1M+
            </p>
          </div>

          {/* Bottom social proof strip — mobile only */}
          <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex items-center justify-center gap-3 text-[8px] md:text-[9px] text-white/40">
            <span>Dr. Brian Harris</span>
            <span>·</span>
            <span>Dr. Sam Saleh</span>
            <span>·</span>
            <span className="hidden sm:inline">Dr. Jon Marashi · </span>
            <span>+ more</span>
          </div>
        </div>
      )}
      
      {/* @ts-ignore - Wistia custom element */}
      <wistia-player media-id={mediaId} aspect="1.7679558011049723" autoplay="false" end-video-behavior="default"></wistia-player>
    </div>
  );
};

export default VideoPlayer;