import { Link } from "react-router-dom";
import { Bell } from "lucide-react";

type Props = {
  memberName?: string | null;
  memberNumber?: number | null;
};

const pad4 = (n: number) => n.toString().padStart(4, "0");

export const MastheadSlim = ({ memberName, memberNumber }: Props) => {
  return (
    <header
      className="fixed top-0 z-30"
      style={{
        height: "var(--masthead-h)",
        left: 0,
        right: 0,
        background: "rgba(244,241,236,0.94)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid var(--lib-border)",
      }}
    >
      <div className="h-full w-full grid grid-cols-3 items-center px-4 md:px-6">
        <div />
        <Link
          to="/library"
          aria-label="The Pasted Library"
          className="justify-self-center select-none"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontVariant: "small-caps",
            fontSize: 18,
            letterSpacing: "0.06em",
            color: "#0A0A0A",
            whiteSpace: "nowrap",
          }}
        >
          The Pasted Library
        </Link>
        <div className="justify-self-end flex items-center gap-4">
          {memberName ? (
            <Link
              to="/library/me"
              className="hidden sm:inline-flex items-center gap-2"
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9A96E",
              }}
            >
              <span>{memberName}</span>
              {memberNumber != null && (
                <span style={{ color: "rgba(10,10,10,0.45)" }}>· № {pad4(memberNumber)}</span>
              )}
            </Link>
          ) : (
            <Link
              to="/login"
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#0A0A0A",
              }}
            >
              Sign in
            </Link>
          )}
          <button
            type="button"
            aria-label="Announcements"
            className="p-1.5 rounded-full"
            style={{ color: "rgba(10,10,10,0.65)" }}
          >
            <Bell size={16} strokeWidth={1.6} />
          </button>
          <Link
            to="/library/me"
            aria-label="Your card"
            className="inline-flex items-center justify-center rounded-full"
            style={{
              width: 30,
              height: 30,
              background: "#5C1414",
              color: "#C9A96E",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: 15,
              lineHeight: 1,
            }}
          >
            <span style={{ transform: "translateY(-1px)" }}>P</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MastheadSlim;