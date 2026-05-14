import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useMember } from "@/hooks/useMember";
import { Masthead } from "@/components/library/Masthead";
import { Shelf, type ShelfAsset } from "@/components/library/Shelf";

const SECTIONS = [
  { key: "frameworks", label: "THE FRAMEWORKS" },
  { key: "scripts", label: "THE SCRIPTS" },
  { key: "playbooks", label: "THE PLAYBOOKS" },
  { key: "decks", label: "THE DECKS" },
  { key: "tools", label: "THE TOOLS" },
] as const;

const LibraryHome = () => {
  const { session, member, loading } = useMember();
  const navigate = useNavigate();
  const [assets, setAssets] = useState<(ShelfAsset & { published_at?: string | null })[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(true);

  useEffect(() => { document.title = "The Library — PASTED"; }, []);
  useEffect(() => {
    if (!loading && !session) navigate("/login", { replace: true });
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data } = await supabase
        .from("assets")
        .select("id, slug, case_number, section, title, file_format, file_meta, sort_order, published_at")
        .eq("is_live", true)
        .order("sort_order", { ascending: true });
      setAssets((data as typeof assets) ?? []);
      setAssetsLoading(false);
    })();
  }, [session]);

  const newThisWeek = assets.filter((a) =>
    a.published_at ? Date.now() - new Date(a.published_at).getTime() < 7 * 24 * 60 * 60 * 1000 : false,
  ).length;

  if (loading || !session) return <div className="min-h-screen bg-bone" />;

  return (
    <div className="min-h-screen bg-bone text-lib-charcoal">
      <Masthead memberName={member?.first_name} memberNumber={member?.member_number} />
      <section className="max-w-[1240px] mx-auto px-6 py-16 md:py-24">
        <h1 className="lib-editorial text-4xl md:text-6xl">
          Welcome back, {member?.first_name || "friend"}.
        </h1>
        <p className="lib-mono text-lib-charcoal/55 mt-6">
          {assetsLoading
            ? "STOCKING THE SHELVES…"
            : `${assets.length} BRIEFCASES ON THE SHELF. ${newThisWeek} NEW THIS WEEK.`}
        </p>
      </section>
      <div className="lib-hairline max-w-[1240px] mx-auto" />
      <div className="py-16">
        {assetsLoading ? null : assets.length === 0 ? (
          <div className="max-w-[720px] mx-auto px-6 text-center py-24">
            <p className="lib-editorial text-3xl md:text-4xl">The shelves are being stocked.</p>
            <p className="lib-mono text-lib-charcoal/50 mt-6">NEW BRIEFCASES ARRIVE WEEKLY.</p>
          </div>
        ) : (
          SECTIONS.map(({ key, label }) => (
            <Shelf key={key} label={label} assets={assets.filter((a) => a.section === key)} />
          ))
        )}
      </div>
      <footer className="max-w-[1240px] mx-auto px-6 py-20 text-center">
        <Link to="/card" className="lib-editorial text-2xl text-lib-charcoal hover:text-oxblood transition-colors">
          View your Card →
        </Link>
        <p className="lib-mono text-lib-charcoal/45 mt-10">
          THE LIBRARY IS A LIVING ROOM. NEW BRIEFCASES ARRIVE WEEKLY.
        </p>
        <button
          onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}
          className="lib-mono text-lib-charcoal/40 hover:text-lib-charcoal mt-8 cursor-pointer"
        >
          SIGN OUT
        </button>
      </footer>
    </div>
  );
};

export default LibraryHome;