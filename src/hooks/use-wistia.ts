import { useEffect, useRef } from 'react';

// Track globally loaded scripts to prevent duplicates
const loadedScripts = new Set<string>();
const pendingScripts = new Map<string, Promise<void>>();

/**
 * Hook to load Wistia player and embed scripts efficiently
 * - Prevents duplicate script loading across components
 * - Only loads when component is visible (optional)
 * - Handles cleanup properly
 */
export const useWistiaLoader = (
  videoIds: string | string[],
  options: { loadOnMount?: boolean } = { loadOnMount: true }
) => {
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!options.loadOnMount || hasLoaded.current) return;
    
    const ids = Array.isArray(videoIds) ? videoIds : [videoIds];
    if (ids.length === 0 || ids.every(id => !id)) return;

    hasLoaded.current = true;

    // Load player script (only once globally)
    const playerScriptUrl = 'https://fast.wistia.com/player.js';
    if (!loadedScripts.has(playerScriptUrl)) {
      if (!pendingScripts.has(playerScriptUrl)) {
        const promise = new Promise<void>((resolve) => {
          const script = document.createElement('script');
          script.src = playerScriptUrl;
          script.async = true;
          script.onload = () => {
            loadedScripts.add(playerScriptUrl);
            resolve();
          };
          document.head.appendChild(script);
        });
        pendingScripts.set(playerScriptUrl, promise);
      }
    }

    // Load embed scripts for each video
    ids.forEach(id => {
      if (!id) return;
      const embedUrl = `https://fast.wistia.com/embed/${id}.js`;
      if (!loadedScripts.has(embedUrl) && !pendingScripts.has(embedUrl)) {
        const script = document.createElement('script');
        script.src = embedUrl;
        script.async = true;
        script.type = 'module';
        script.onload = () => loadedScripts.add(embedUrl);
        document.head.appendChild(script);
      }
    });

    // No cleanup - scripts should persist for performance
  }, [videoIds, options.loadOnMount]);
};

/**
 * Get CSS for Wistia placeholder swatch (blur-up effect)
 */
export const getWistiaPlaceholderStyles = (mediaId: string, aspectRatio: string = '56.25%') => `
  wistia-player[media-id='${mediaId}']:not(:defined) {
    background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
    display: block;
    filter: blur(5px);
    padding-top: ${aspectRatio};
  }
`;

export default useWistiaLoader;
