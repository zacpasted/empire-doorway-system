import { Link } from "react-router-dom";
import { Monogram } from "./Monogram";

type Props = {
  surface?: "bone" | "charcoal";
  memberName?: string | null;
  memberNumber?: number | null;
};

const pad4 = (n: number) => n.toString().padStart(4, "0");

export const Masthead = ({ surface = "bone", memberName, memberNumber }: Props) => {
  const isDark = surface === "charcoal";
  const text = isDark ? "text-bone" : "text-lib-charcoal";
  const variant = isDark ? "gold-on-charcoal" : "charcoal-on-bone";

  return (
    <header className={`w-full ${isDark ? "bg-lib-charcoal" : "bg-bone"}`}>
      <div className="max-w-[1240px] mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" aria-label="The PASTED Library — home" className="flex-shrink-0">
          <Monogram size={28} variant={variant} />
        </Link>
        <div
          className={`hidden md:block ${text}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontVariantCaps: "small-caps", letterSpacing: "0.18em", fontSize: 14 }}
        >
          The Library
        </div>
        <div className={`lib-mono ${text} text-right`}>
          {memberName ? (
            <>
              <div className="opacity-90">{memberName.toUpperCase()}</div>
              {memberNumber != null && <div className="opacity-60">№ {pad4(memberNumber)}</div>}
            </>
          ) : (
            <Link to="/login" className="hover:opacity-60 transition-opacity">SIGN IN</Link>
          )}
        </div>
      </div>
      <div className={isDark ? "lib-hairline-gold" : "lib-hairline"} />
    </header>
  );
};

export default Masthead;