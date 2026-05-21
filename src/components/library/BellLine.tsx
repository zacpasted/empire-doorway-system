import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Recent = { slug: string; title: string; created_at: string; section: string };

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const BellLine = ({ tone = "light" }: { tone?: "dark" | "light" }) => {
  const [item, setItem] = useState<Recent | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("assets")
        .select("slug,title,created_at,section")
        .eq("is_live", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!data) return;
      const ts = new Date(data.created_at).getTime();
      if (Date.now() - ts > SEVEN_DAYS) return;
      setItem(data as Recent);
    })();
  }, []);

  if (!item) return null;

  const text = tone === "dark" ? "text-lib-gold/80" : "text-lib-gold/85";

  return (
    <div className="w-full text-center -mt-2 mb-6 px-6">
      <Link to={`/library/${item.slug}`} className={`lib-bell-reveal inline-block ${text} hover:opacity-100`}
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: 18, lineHeight: 1.4 }}>
        A new {item.section} joined the Stacks{" "}
        <span className="opacity-80">— “{item.title}”.</span>
      </Link>
    </div>
  );
};

export default BellLine;