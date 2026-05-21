import { Link } from "react-router-dom";
import { Monogram } from "./Monogram";

type Surface = "bone" | "smoke" | "oxblood";

type Props = {
  surface?: Surface | "charcoal"; // accepts legacy "charcoal" alias
  memberName?: string | null;
  memberNumber?: number | null;
};

const pad4 = (n: number) => n.toString().padStart(4, "0");

export const Masthead = ({ surface = "bone", memberName, memberNumber }: Props) => {
  const normalized: Surface = surface === "charcoal" ? "smoke" : surface;
  const isDark = normalized !== "bone";
  const text = isDark ? "text-bone" : "text-lib-charcoal";
  const memberMuted = isDark ? "text-bone/65" : "text-lib-charcoal/65";
  const variant = isDark ? "gold-on-charcoal" : "charcoal-on-bone";

  return (
    <header className="w-full">
      <div className="max-w-[1240px] mx-auto px-6 py-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link to="/library" aria-label="The PASTED Library — Atrium" className="justify-self-start flex-shrink-0">
          <Monogram size={28} variant={variant} />
        </Link>

        <Link
          to="/library"
          aria-label="The PASTED Library"
          className={`lib-wordmark ${text} justify-self-center text-center select-none`}
        >
          The Pasted Library
        </Link>

        <div className={`lib-meta justify-self-end text-right ${text}`}>
          {memberName ? (
            <Link to="/library/me" className="inline-block hover:opacity-70 transition-opacity">
              <span className="text-lib-gold">{memberName.toUpperCase()}</span>
              {memberNumber != null && (
                <span className={`${memberMuted} ml-2`}>· № {pad4(memberNumber)}</span>
              )}
            </Link>
          ) : (
            <Link to="/login" className="hover:opacity-70 transition-opacity">Sign in</Link>
          )}
        </div>
      </div>
      <div className={isDark ? "lib-hairline-gold" : "lib-hairline"} />
    </header>
  );
};

export default Masthead;