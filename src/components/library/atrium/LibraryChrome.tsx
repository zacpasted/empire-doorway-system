import { Link } from "react-router-dom";
import { ReactNode } from "react";

/**
 * The Library — minimal chrome.
 * Four tokens only: bone #F0E4C4, night #1A1410, brass #B8954C, quiet #6E6450.
 * Cormorant Garamond for everything except mono caps Inter labels.
 */

export const BONE = "#F0E4C4";
export const NIGHT = "#1A1410";
export const BRASS = "#B8954C";
export const QUIET = "#6E6450";

export const CORMORANT = "'Cormorant Garamond', Georgia, serif";
export const INTER = "Inter, system-ui, sans-serif";

export const monoLabel: React.CSSProperties = {
  fontFamily: INTER,
  fontSize: 11,
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  fontWeight: 500,
};

export const Fleuron = ({ size = 18 }: { size?: number }) => (
  <div
    aria-hidden
    style={{
      fontFamily: CORMORANT,
      color: BRASS,
      fontSize: size,
      lineHeight: 1,
      textAlign: "center",
    }}
  >
    ✦
  </div>
);

export const TopNav = ({ rightSlot }: { rightSlot?: ReactNode }) => (
  <header
    className="w-full"
    style={{
      background: BONE,
      borderBottom: `1px solid ${BRASS}33`,
    }}
  >
    <div
      className="mx-auto flex items-center justify-between"
      style={{
        maxWidth: 720,
        padding: "18px 24px",
      }}
    >
      <Link
        to="/library"
        style={{ ...monoLabel, color: NIGHT, textDecoration: "none" }}
      >
        PASTED · The Library
      </Link>
      <div>{rightSlot}</div>
    </div>
  </header>
);

export const SiteFooter = () => (
  <footer
    className="w-full"
    style={{
      padding: "48px 24px 32px",
      textAlign: "center",
      ...monoLabel,
      color: QUIET,
      fontSize: 10,
      letterSpacing: "0.36em",
    }}
  >
    EST · MMXXVI · A publication of PASTED
  </footer>
);

export const PageFrame = ({ children }: { children: ReactNode }) => (
  <div
    className="min-h-screen flex flex-col"
    style={{ background: BONE, color: NIGHT, fontFamily: CORMORANT }}
  >
    {children}
  </div>
);

export const Content = ({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) => (
  <main className="flex-1 w-full">
    <div
      className="mx-auto"
      style={{
        maxWidth: narrow ? 560 : 720,
        padding: "0 24px",
      }}
    >
      {children}
    </div>
  </main>
);

export const BrassLink = ({
  to,
  children,
  onClick,
}: {
  to?: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
  const style: React.CSSProperties = {
    fontFamily: CORMORANT,
    fontStyle: "italic",
    fontSize: 19,
    color: BRASS,
    borderBottom: `1px solid ${BRASS}`,
    paddingBottom: 2,
    textDecoration: "none",
    display: "inline-block",
    transition: "opacity 200ms ease",
    cursor: "pointer",
  };
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.opacity = "0.7";
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.opacity = "1";
  };
  if (to) {
    return (
      <Link to={to} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...style, background: "transparent", border: "none", borderBottom: `1px solid ${BRASS}` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
};

export const BrassPill = ({
  children,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    style={{
      fontFamily: CORMORANT,
      fontStyle: "italic",
      fontSize: 18,
      color: BONE,
      background: BRASS,
      border: "none",
      borderRadius: 999,
      padding: "14px 32px",
      minHeight: 48,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "opacity 200ms ease",
    }}
    onMouseEnter={(e) => {
      if (!disabled) e.currentTarget.style.opacity = "0.85";
    }}
    onMouseLeave={(e) => {
      if (!disabled) e.currentTarget.style.opacity = "1";
    }}
  >
    {children}
  </button>
);

export const Rule = () => (
  <div
    aria-hidden
    style={{
      height: 1,
      background: `${BRASS}40`,
      width: "100%",
      margin: "48px 0",
    }}
  />
);

export const RiseIn = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <div
    style={{
      animation: `lib-rise-in 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`,
    }}
  >
    {children}
    <style>{`
      @keyframes lib-rise-in {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
);

export const Field = ({
  label,
  children,
  helper,
}: {
  label: string;
  children: ReactNode;
  helper?: string;
}) => (
  <div style={{ marginBottom: 24 }}>
    <label style={{ ...monoLabel, color: QUIET, display: "block", marginBottom: 8 }}>
      {label}
    </label>
    {children}
    {helper && (
      <div
        style={{
          ...monoLabel,
          fontSize: 10,
          color: QUIET,
          marginTop: 6,
          letterSpacing: "0.28em",
        }}
      >
        {helper}
      </div>
    )}
  </div>
);

export const fieldInputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: `1px solid ${NIGHT}33`,
  padding: "12px 0",
  fontFamily: CORMORANT,
  fontSize: 18,
  color: NIGHT,
  outline: "none",
  minHeight: 48,
  borderRadius: 0,
};