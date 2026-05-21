import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  PageFrame,
  TopNav,
  Content,
  SiteFooter,
  BrassPill,
  Rule,
  RiseIn,
  CORMORANT,
  BRASS,
  NIGHT,
  QUIET,
  monoLabel,
  BONE,
} from "@/components/library/atrium/LibraryChrome";
import { LibraryCardGraphic } from "@/components/library/atrium/LibraryCardGraphic";

type AppRow = {
  first_name: string;
  last_name: string;
  card_no: number;
  email: string;
};

const ROOMS: Array<{ slug: string; title: string; desc: string }> = [
  {
    slug: "stacks",
    title: "The Stacks",
    desc:
      "Where the working materials of the practice will sit. On real wooden shelves, organised by function.",
  },
  {
    slug: "cinema",
    title: "The Cinema",
    desc:
      "Where the practice is shown — taught, argued, demonstrated, in moving image.",
  },
  {
    slug: "periodicals",
    title: "The Periodicals",
    desc:
      "Where the considered argument lives — long-form essays, dispatches, interviews.",
  },
  {
    slug: "vault",
    title: "The Vault",
    desc:
      "Where the rare materials wait — released by schedule, witnessed not consumed.",
  },
  {
    slug: "reading-room",
    title: "The Reading Room",
    desc: "Where your own collection lives — what you've saved, what you've kept.",
  },
  {
    slug: "index",
    title: "The Index",
    desc: "Where you'll find anything in the Library by any criterion.",
  },
];

const Members = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [app, setApp] = useState<AppRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "The Atrium — The PASTED Library";
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_evt, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          setLoading(false);
        }
      }
    );

    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u);
      if (!u) {
        setLoading(false);
        navigate("/library/login", { replace: true });
        return;
      }
      supabase
        .from("applications")
        .select("first_name, last_name, card_no, email")
        .eq("email", (u.email ?? "").toLowerCase())
        .maybeSingle()
        .then(({ data }) => {
          setApp((data as AppRow | null) ?? null);
          setLoading(false);
        });
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/library", { replace: true });
  };

  if (loading) {
    return (
      <PageFrame>
        <TopNav />
        <Content>
          <div style={{ padding: "20vh 0", textAlign: "center", color: QUIET, fontFamily: CORMORANT, fontStyle: "italic" }}>
            Opening the door…
          </div>
        </Content>
      </PageFrame>
    );
  }

  const firstName =
    app?.first_name ||
    (user?.user_metadata?.first_name as string) ||
    "Member";
  const cardNo = app?.card_no ?? 1;
  const fullName = app ? `${app.first_name} ${app.last_name}`.trim() : firstName;

  return (
    <PageFrame>
      <TopNav
        rightSlot={
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ ...monoLabel, color: QUIET }}>{firstName}</span>
            <button
              type="button"
              onClick={signOut}
              style={{
                ...monoLabel,
                color: BRASS,
                background: "transparent",
                border: "none",
                borderBottom: `1px solid ${BRASS}`,
                paddingBottom: 2,
                cursor: "pointer",
              }}
            >
              Sign out
            </button>
          </div>
        }
      />
      <Content>
        <RiseIn>
          <div style={{ paddingTop: 64, paddingBottom: 96, textAlign: "center" }}>
            <h1
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(40px, 7vw, 56px)",
                lineHeight: 1.05,
                color: NIGHT,
                margin: 0,
              }}
            >
              Welcome back, {firstName}.
            </h1>
            <div style={{ ...monoLabel, color: BRASS, marginTop: 16 }}>
              Member № {cardNo.toString().padStart(4, "0")}
            </div>

            <Rule />

            <div>
              <LibraryCardGraphic name={fullName} cardNo={cardNo} />
            </div>

            <Rule />

            <div style={{ ...monoLabel, color: BRASS }}>In circulation</div>
            <h2
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(28px, 4vw, 36px)",
                color: NIGHT,
                marginTop: 18,
                marginBottom: 0,
              }}
            >
              Volume I — The Art of Becoming
            </h2>
            <p
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 20,
                color: QUIET,
                marginTop: 16,
                marginBottom: 32,
              }}
            >
              On what iconic dentistry is actually built from.
            </p>
            <BrassPill onClick={() => navigate("/library/doctrine")}>
              Read Volume I →
            </BrassPill>

            <Rule />

            <div style={{ ...monoLabel, color: BRASS }}>Opening soon</div>
            <p
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 20,
                color: QUIET,
                marginTop: 16,
                marginBottom: 40,
              }}
            >
              Six more rooms are being built. Each is a part of the canon.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 16,
                textAlign: "left",
              }}
              className="md:grid-cols-2"
            >
              {ROOMS.map((r) => (
                <Link
                  key={r.slug}
                  to={`/library/${r.slug}`}
                  style={{
                    display: "block",
                    background: BONE,
                    border: `1px solid ${BRASS}4D`,
                    borderRadius: 4,
                    padding: 24,
                    textDecoration: "none",
                    transition: "opacity 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                >
                  <div style={{ ...monoLabel, color: NIGHT, marginBottom: 12 }}>
                    {r.title}
                  </div>
                  <div
                    style={{
                      fontFamily: CORMORANT,
                      fontStyle: "italic",
                      fontSize: 16,
                      color: BRASS,
                      marginBottom: 8,
                    }}
                  >
                    Opening soon.
                  </div>
                  <div
                    style={{
                      fontFamily: CORMORANT,
                      fontSize: 14,
                      color: QUIET,
                      lineHeight: 1.5,
                    }}
                  >
                    {r.desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </RiseIn>
      </Content>
      <SiteFooter />
    </PageFrame>
  );
};

export default Members;