import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ZONES, ZONE_ORDER } from "@/data/library-zones";
import { PMonogram } from "@/components/library/PMonogram";

type RailItemProps = {
  to: string;
  label: string;
  active: boolean;
  icon?: LucideIcon;
  monogram?: boolean;
  monogramSize?: number;
};

const RailIcon = ({ to, label, active, icon: Icon, monogram, monogramSize = 28 }: RailItemProps) => (
  <Link
    to={to}
    aria-label={label}
    className="lib-rail-icon relative flex items-center justify-center w-full h-12 group focus:outline-none"
  >
    {/* active bar */}
    <span
      aria-hidden
      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-sm transition-all duration-300"
      style={{
        height: active ? 28 : 0,
        background: "#C9A96E",
      }}
    />
    <span
      className="transition-opacity duration-200"
      style={{
        color: active ? "#7A1F1F" : "#0A0A0A",
        opacity: active ? 1 : 0.55,
      }}
    >
      {monogram ? (
        <PMonogram size={monogramSize} color={active ? "#7A1F1F" : "#C9A96E"} />
      ) : Icon ? (
        <Icon size={22} strokeWidth={1.4} />
      ) : null}
    </span>
    <span className="lib-rail-tip">{label}</span>
  </Link>
);

const Divider = () => (
  <div className="w-full flex justify-center py-2" aria-hidden>
    <span className="block w-4 h-px" style={{ background: "#C9A96E" }} />
  </div>
);

export const LeftRail = () => {
  const { pathname } = useLocation();
  const isOn = (path: string) => {
    if (path === "/library") return pathname === "/library";
    return pathname === path || pathname.startsWith(path + "/");
  };
  const memberActive = isOn("/library/me") || pathname === "/card";

  return (
    <aside
      aria-label="Library navigation"
      className="hidden md:flex fixed top-0 left-0 z-40 flex-col items-center justify-between"
      style={{
        width: "var(--rail-w-left)",
        height: "100vh",
        background: "#F4F1EC",
        borderRight: "1px solid var(--lib-border)",
        paddingTop: 14,
        paddingBottom: 18,
      }}
    >
      <div className="flex flex-col items-center w-full">
        <RailIcon to="/library" label="Atrium" active={pathname === "/library"} monogram monogramSize={32} />
        <Divider />
        {ZONE_ORDER.map((slug) => {
          const z = ZONES[slug];
          return (
            <RailIcon key={slug} to={z.path} label={z.label} active={isOn(z.path)} icon={z.icon} />
          );
        })}
        <Divider />
        <RailIcon to="/library/index" label="Index" active={isOn("/library/index")} icon={ZONES.index.icon} />
      </div>

      <RailIcon to="/library/me" label="Your Card" active={memberActive} monogram monogramSize={26} />
    </aside>
  );
};

export default LeftRail;