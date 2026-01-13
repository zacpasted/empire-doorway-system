import { useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('cta_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('cta_session_id', sessionId);
  }
  return sessionId;
};

interface TrackCTAOptions {
  ctaId: string;
  ctaText?: string;
  section?: string;
}

export const useCTAAnalytics = () => {
  const sessionIdRef = useRef<string>('');

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  const trackCTAClick = useCallback(async (options: TrackCTAOptions) => {
    const { ctaId, ctaText, section } = options;

    try {
      await supabase.from('cta_analytics').insert({
        cta_id: ctaId,
        cta_text: ctaText || null,
        section: section || null,
        page_url: window.location.pathname,
        session_id: sessionIdRef.current || getSessionId(),
        user_agent: navigator.userAgent,
        viewport_width: window.innerWidth,
      });
    } catch (error) {
      // Silently fail - don't interrupt user experience
      console.debug('Analytics tracking failed:', error);
    }
  }, []);

  return { trackCTAClick };
};

// Standalone function for components that can't use hooks
export const trackCTAClick = async (options: TrackCTAOptions) => {
  try {
    await supabase.from('cta_analytics').insert({
      cta_id: options.ctaId,
      cta_text: options.ctaText || null,
      section: options.section || null,
      page_url: window.location.pathname,
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
      viewport_width: window.innerWidth,
    });
  } catch (error) {
    console.debug('Analytics tracking failed:', error);
  }
};
