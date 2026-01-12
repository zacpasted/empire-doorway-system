import { useState, useEffect } from "react";
import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";
import { Play } from "lucide-react";

const VideoPlayer = () => {
  const mediaId = "qb6sa5q4g8";
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
    <div className="relative w-full rounded-lg overflow-hidden shadow-2xl animate-subtle-glow">
      <style>
        {getWistiaPlaceholderStyles(mediaId, '56.56%')}
      </style>
      
      {/* Engaging placeholder while video loads */}
      {!isReady && (
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-card via-background to-card flex items-center justify-center">
          <div className="relative">
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
            
            {/* Play button */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>
          
          {/* Loading text */}
          <p className="absolute bottom-8 text-sm text-muted-foreground/60 tracking-wide">
            Loading video...
          </p>
        </div>
      )}
      
      {/* @ts-ignore */}
      <wistia-player media-id={mediaId} aspect="1.7679558011049723"></wistia-player>
    </div>
  );
};

export default VideoPlayer;