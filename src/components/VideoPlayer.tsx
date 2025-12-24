import { useState } from "react";
import { Play } from "lucide-react";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-charcoal rounded-lg overflow-hidden shadow-2xl animate-subtle-glow">
      {!isPlaying ? (
        <button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 flex items-center justify-center group cursor-pointer"
          aria-label="Play video"
        >
          {/* Placeholder background with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-charcoal-light" />
          
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-bronze rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-bronze-light rounded-full blur-3xl" />
          </div>
          
          {/* Play button */}
          <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-primary/90 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-primary shadow-lg">
            <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
          </div>
          
          {/* Corner text */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
            <span className="text-xs md:text-sm font-medium text-cream/60 tracking-widest uppercase">
              Watch the Vision
            </span>
          </div>
        </button>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
          {/* Placeholder for actual video embed */}
          <div className="text-cream/60 text-center p-8">
            <p className="text-lg font-serif mb-2">Video Player</p>
            <p className="text-sm opacity-60">
              Replace with your VSL embed (Wistia, Vimeo, etc.)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
