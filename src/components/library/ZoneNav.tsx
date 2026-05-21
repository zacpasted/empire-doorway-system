import { Link, useLocation } from "react-router-dom";

const ZONES: { label: string; to: string; match: (p: string) => boolean }[] = [
  { label: "Atrium",       to: "/library",              match: (p) => p === "/library" },
  { label: "Stacks",       to: "/library/stacks",       match: (p) => p.startsWith("/library/stacks") },
  { label: "Cinema",       to: "/library/cinema",       match: (p) => p.startsWith("/library/cinema") },
  { label: "Periodicals",  to: "/library/periodicals",  match: (p) => p.startsWith("/library/periodicals") },
  { label: "Vault",        to: "/library/vault",        match: (p) => p.startsWith("/library/vault") },
  { label: "Reading Room", to: "/library/me",           match: (p) => p.startsWith("/library/me") || p.startsWith("/card") },
  { label: "Index",        to: "/library/index",        match: (p) => p.startsWith("/library/index") },
];

type Props = { surface?: "bone" | "smoke" | "oxblood" };

export const ZoneNav = ({ surface = "bone" }: Props) => {
  const { pathname } = useLocation();
  const isDark = surface !== "bone";
  const inactive = isDark ? "text-bone/55" : "text-lib-charcoal/55";
  const active = "text-lib-gold";
  const sep = isDark ? "text-bone/22" : "text-lib-charcoal/22";

  return (
    <nav aria-label="Library zones" className="w-full overflow-x-auto">
      <ul className="max-w-[1240px] mx-auto px-6 py-4 flex items-center justify-center gap-x-5 md:gap-x-7 whitespace-nowrap">
        {ZONES.map((z, i) => {
          const on = z.match(pathname);
          return (
            <li key={z.to} className="flex items-center gap-x-5 md:gap-x-7">
              <Link
                to={z.to}
                data-active={on || undefined}
                className={`lib-meta lib-nav-link transition-colors ${on ? active : inactive} hover:${isDark ? "text-bone" : "text-lib-charcoal"}`}
              >
                {z.label}
              </Link>
              {i < ZONES.length - 1 && <span className={`lib-meta ${sep}`} aria-hidden>·</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ZoneNav;