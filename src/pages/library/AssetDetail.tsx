import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useMember } from "@/hooks/useMember";
import { Masthead } from "@/components/library/Masthead";
import briefcaseOpen from "@/assets/briefcase-open.jpg";

type Asset = {
  id: string;
  slug: string;
  case_number: number;
  section: string;
  title: string;
  description: string;
  file_url: string | null;
  file_format: string | null;
  file_meta: string | null;
  hero_image_url: string | null;
  published_at: string | null;
};

const pad3 = (n: number) => n.toString().padStart(3, "0");

const AssetDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { session, member, loading } = useMember();
  const navigate = useNavigate();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate("/login", { replace: true });
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!session || !slug) return;
    (async () => {
      const { data } = await supabase.from("assets").select("*").eq("slug", slug).eq("is_live", true).maybeSingle();
      if (!data) { setNotFound(true); return; }
      setAsset(data as Asset);
      document.title = `${(data as Asset).title} — The PASTED Library`;
      if (member) {
        await supabase.from("checkouts").insert({ member_id: member.id, asset_id: (data as Asset).id });
      }
    })();
  }, [session, slug, member]);

  if (loading || !session) return <div className="min-h-screen bg-bone" />;

  if (notFound) {
    return (
      <div className="min-h-screen bg-bone text-lib-charcoal">
        <Masthead memberName={member?.first_name} memberNumber={member?.member_number} />
        <div className="max-w-[720px] mx-auto px-6 py-32 text-center">
          <p className="lib-editorial text-3xl">That briefcase is not on the shelf.</p>
          <Link to="/library" className="lib-mono mt-8 inline-block hover:text-oxblood">← RETURN TO THE SHELF</Link>
        </div>
      </div>
    );
  }

  if (!asset) return <div className="min-h-screen bg-bone" />;

  return (
    <div className="min-h-screen bg-bone text-lib-charcoal">
      <Masthead memberName={member?.first_name} memberNumber={member?.member_number} />
      <article className="max-w-[1240px] mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="relative" style={{ transform: "rotate(-2deg)" }}>
          <img
            src={asset.hero_image_url || briefcaseOpen}
            alt=""
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
        <div>
          <h1 className="lib-display text-4xl md:text-6xl leading-tight">{asset.title}</h1>
          <p className="lib-mono text-lib-charcoal/55 mt-4">№ {pad3(asset.case_number)} — {asset.section.toUpperCase()}</p>
          <div className="lib-body text-lib-charcoal/85 mt-8 whitespace-pre-line">{asset.description}</div>
          {asset.file_url && (
            <a href={asset.file_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-oxblood text-bone py-3 px-8 lib-mono mt-10 hover:bg-lib-charcoal transition-colors duration-200 cursor-pointer" style={{ borderRadius: "2px" }}>
              Take it with you
            </a>
          )}
          {(asset.file_format || asset.file_meta) && (
            <p className="lib-mono text-lib-charcoal/45 mt-4">
              {[asset.file_format, asset.file_meta].filter(Boolean).join(" — ")}
              {asset.published_at && ` — UPDATED ${new Date(asset.published_at).toLocaleString("en", { month: "short", year: "numeric" }).toUpperCase()}`}
            </p>
          )}
          <Link to="/library" className="lib-mono text-lib-charcoal/55 mt-12 inline-block hover:text-oxblood transition-colors">← Return to the shelf</Link>
        </div>
      </article>
    </div>
  );
};

export default AssetDetail;