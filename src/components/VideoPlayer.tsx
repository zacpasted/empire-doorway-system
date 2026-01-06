import { useEffect } from "react";

const VideoPlayer = () => {
  useEffect(() => {
    // Load Wistia scripts
    const playerScript = document.createElement("script");
    playerScript.src = "https://fast.wistia.com/player.js";
    playerScript.async = true;
    document.head.appendChild(playerScript);

    const embedScript = document.createElement("script");
    embedScript.src = "https://fast.wistia.com/embed/qb6sa5q4g8.js";
    embedScript.async = true;
    embedScript.type = "module";
    document.head.appendChild(embedScript);

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(playerScript);
      document.head.removeChild(embedScript);
    };
  }, []);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-2xl animate-subtle-glow">
      <style>
        {`
          wistia-player[media-id='qb6sa5q4g8']:not(:defined) {
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/qb6sa5q4g8/swatch');
            display: block;
            filter: blur(5px);
            padding-top: 56.56%;
          }
        `}
      </style>
      {/* @ts-ignore */}
      <wistia-player media-id="qb6sa5q4g8" aspect="1.7679558011049723"></wistia-player>
    </div>
  );
};

export default VideoPlayer;
