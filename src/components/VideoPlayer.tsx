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
    
    // Check immediately and after a short delay
    checkReady();
    const timeout = setTimeout(checkReady, 500);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-2xl animate-subtle-glow group cursor-pointer">
      <style>
        {getWistiaPlaceholderStyles(mediaId, '56.56%')}
      </style>
      
      {/* Compelling placeholder - looks like real video thumbnail */}
      {!isReady && (
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center">
          {/* Subtle grid pattern for visual interest */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          
          <div className="relative flex flex-col items-center">
            {/* Play button with hover effect */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/40 group-hover:scale-110 transition-transform duration-200">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-1" fill="currentColor" />
            </div>
            
            {/* Watch now text */}
            <p className="mt-4 text-xs md:text-sm text-white/80 font-medium tracking-wide uppercase">
              Watch Now
            </p>
          </div>
        </div>
      )}
      
      {/* @ts-ignore */}
      <wistia-player media-id={mediaId} aspect="1.7679558011049723"></wistia-player>
    </div>
  );
};

export default VideoPlayer;