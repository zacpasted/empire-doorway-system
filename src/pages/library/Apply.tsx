import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  PageFrame,
  TopNav,
  Content,
  SiteFooter,
  BrassPill,
  RiseIn,
  CORMORANT,
  BRASS,
  NIGHT,
  QUIET,
  monoLabel,
  Field,
  fieldInputStyle,
} from "@/components/library/atrium/LibraryChrome";

type Role = "owner" | "associate" | "building";

const Apply = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [role, setRole] = useState<Role>("owner");
  const [whyNow, setWhyNow] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Apply for your Library Card — The PASTED Library";
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !practiceName.trim()) {
      setError("Please complete the required fields.");
      return;
    }
    setSubmitting(true);
    try {
      sessionStorage.setItem("pasted_first_name", firstName.trim());
    } catch { /* noop */ }

    const { error: insertErr } = await supabase
      .from("applications")
      .insert({
        first_name: firstName.trim().slice(0, 60),
        last_name: lastName.trim().slice(0, 60),
        email: email.trim().toLowerCase(),
        practice_name: practiceName.trim().slice(0, 160),
        role,
        why_now: whyNow.trim().slice(0, 200) || null,
      });

    setSubmitting(false);
    if (insertErr) {
      if (insertErr.message?.toLowerCase().includes("duplicate")) {
        setError("An application already exists for that email.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      return;
    }
    navigate("/library/pending");
  };

  return (
    <PageFrame>
      <TopNav />
      <Content narrow>
        <RiseIn>
          <div style={{ paddingTop: 64, paddingBottom: 96 }}>
            <div style={{ ...monoLabel, color: BRASS, marginBottom: 24 }}>Apply</div>
            <h1
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(36px, 6vw, 52px)",
                lineHeight: 1.05,
                color: NIGHT,
                margin: 0,
              }}
            >
              Apply for your Library Card.
            </h1>
            <p
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 20,
                color: QUIET,
                marginTop: 24,
                maxWidth: 460,
              }}
            >
              A few questions. We read every application by hand. You&rsquo;ll hear back
              within 24 hours.
            </p>

            <div style={{ height: 1, background: `${BRASS}40`, margin: "48px 0" }} />

            <form onSubmit={onSubmit} noValidate>
              <Field label="First name">
                <input
                  style={fieldInputStyle}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  maxLength={60}
                  required
                  autoComplete="given-name"
                />
              </Field>
              <Field label="Last name">
                <input
                  style={fieldInputStyle}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  maxLength={60}
                  required
                  autoComplete="family-name"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  style={fieldInputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </Field>
              <Field label="Practice name" helper="City, state">
                <input
                  style={fieldInputStyle}
                  value={practiceName}
                  onChange={(e) => setPracticeName(e.target.value)}
                  maxLength={160}
                  required
                />
              </Field>
              <Field label="Your role">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                  {(["owner", "associate", "building"] as Role[]).map((r) => {
                    const active = role === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        style={{
                          ...monoLabel,
                          padding: "12px 18px",
                          minHeight: 44,
                          background: active ? NIGHT : "transparent",
                          color: active ? BONELIKE : NIGHT,
                          border: `1px solid ${active ? NIGHT : `${NIGHT}33`}`,
                          borderRadius: 999,
                          cursor: "pointer",
                          transition: "all 200ms ease",
                        }}
                      >
                        {r === "owner" ? "Owner" : r === "associate" ? "Associate" : "Building"}
                      </button>
                    );
                  })}
                </div>
              </Field>
              <Field label="Why now — one line">
                <textarea
                  rows={2}
                  style={{ ...fieldInputStyle, resize: "none", paddingTop: 12 }}
                  value={whyNow}
                  onChange={(e) => setWhyNow(e.target.value.slice(0, 200))}
                  maxLength={200}
                />
              </Field>

              <div style={{ height: 1, background: `${BRASS}40`, margin: "32px 0" }} />

              {error && (
                <div
                  style={{
                    fontFamily: CORMORANT,
                    fontStyle: "italic",
                    color: "#8B2A1F",
                    marginBottom: 20,
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "center" }}>
                <BrassPill type="submit" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit application →"}
                </BrassPill>
              </div>

              <div
                style={{
                  ...monoLabel,
                  fontSize: 10,
                  color: QUIET,
                  textAlign: "center",
                  marginTop: 24,
                  letterSpacing: "0.32em",
                }}
              >
                No noise. No pitch-mail. Unsubscribe any time.
              </div>
            </form>
          </div>
        </RiseIn>
      </Content>
      <SiteFooter />
    </PageFrame>
  );
};

const BONELIKE = "#F0E4C4";

export default Apply;