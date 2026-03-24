import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const MILESTONES = [25, 50, 75, 100] as const;

const getSessionId = (): string => {
  let id = sessionStorage.getItem("cta_session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("cta_session_id", id);
  }
  return id;
};

const ScrollDepthTracker = () => {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone);
          supabase.from("cta_analytics").insert({
            cta_id: `scroll-depth-${milestone}`,
            cta_text: `${milestone}% scroll`,
            section: "scroll-depth",
            event_type: "scroll_milestone",
            page_url: window.location.pathname,
            session_id: getSessionId(),
            user_agent: navigator.userAgent,
            viewport_width: window.innerWidth,
          }).then(() => {});
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
};

export default ScrollDepthTracker;
