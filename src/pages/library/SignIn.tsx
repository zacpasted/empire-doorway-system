import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  PageFrame,
  TopNav,
  Content,
  SiteFooter,
  BrassPill,
  BrassLink,
  RiseIn,
  CORMORANT,
  NIGHT,
  QUIET,
  monoLabel,
  fieldInputStyle,
  Field,
} from "@/components/library/atrium/LibraryChrome";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Sign in — The PASTED Library";
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) return;
    setSubmitting(true);
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/library/members`,
      },
    });
    setSubmitting(false);
    if (err) {
      setError("We couldn't send the link. Try again in a moment.");
      return;
    }
    setSent(true);
  };

  return (
    <PageFrame>
      <TopNav />
      <Content narrow>
        <RiseIn>
          <div
            className="flex flex-col items-center text-center"
            style={{ paddingTop: "16vh", paddingBottom: "10vh" }}
          >
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
              Sign in to your Library.
            </h1>

            {!sent ? (
              <>
                <p
                  style={{
                    fontFamily: CORMORANT,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: 20,
                    color: QUIET,
                    marginTop: 24,
                    maxWidth: 420,
                  }}
                >
                  Enter your email — we&rsquo;ll send you a sign-in link.
                </p>

                <form
                  onSubmit={onSubmit}
                  style={{ width: "100%", maxWidth: 420, marginTop: 48 }}
                >
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

                  {error && (
                    <div
                      style={{
                        fontFamily: CORMORANT,
                        fontStyle: "italic",
                        color: "#8B2A1F",
                        marginBottom: 16,
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                    <BrassPill type="submit" disabled={submitting}>
                      {submitting ? "Sending…" : "Send me a link →"}
                    </BrassPill>
                  </div>
                </form>

                <div
                  style={{
                    ...monoLabel,
                    fontSize: 10,
                    color: QUIET,
                    marginTop: 56,
                    letterSpacing: "0.32em",
                  }}
                >
                  Not a member yet?
                </div>
                <div style={{ marginTop: 12 }}>
                  <BrassLink to="/library/apply">Apply for your card →</BrassLink>
                </div>
              </>
            ) : (
              <p
                style={{
                  fontFamily: CORMORANT,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 22,
                  color: QUIET,
                  marginTop: 32,
                  lineHeight: 1.5,
                  maxWidth: 480,
                }}
              >
                Check your inbox at {email}. The link will sign you in.
              </p>
            )}
          </div>
        </RiseIn>
      </Content>
      <SiteFooter />
    </PageFrame>
  );
};

export default SignIn;