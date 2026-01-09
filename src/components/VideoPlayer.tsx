import { useWistiaLoader, getWistiaPlaceholderStyles } from "@/hooks/use-wistia";

const VideoPlayer = () => {
  const mediaId = "qb6sa5q4g8";
  
  // Use shared Wistia loader for efficient script management
  useWistiaLoader(mediaId);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-2xl animate-subtle-glow">
      <style>
        {getWistiaPlaceholderStyles(mediaId, '56.56%')}
      </style>
      {/* @ts-ignore */}
      <wistia-player media-id={mediaId} aspect="1.7679558011049723"></wistia-player>
    </div>
  );
};

export default VideoPlayer;
