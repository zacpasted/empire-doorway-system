import { Link } from "react-router-dom";

type Props = {
  memberNumber?: number | null;
  joinedAt?: string | null;
  city?: string;
};

const pad4 = (n: number) => n.toString().padStart(4, "0");
const monthYear = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export const MemberOrientation = ({ memberNumber, joinedAt, city = "Madrid" }: Props) => {
  if (memberNumber == null) return null;
  return (
    <div className="w-full text-center py-12">
      <div aria-hidden className="mx-auto h-px w-[80px] bg-lib-charcoal/20 mb-6" />
      <p
        className="text-lib-charcoal"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: 22 }}
      >
        Member № {pad4(memberNumber)}
      </p>
      <p className="lib-meta text-lib-charcoal/55 mt-2">
        Joined {monthYear(joinedAt)} · {city}
      </p>
      <Link
        to="/card"
        className="lib-meta inline-block mt-4 text-oxblood hover:text-oxblood-dark transition-colors"
        style={{ borderBottom: "1px solid #C9A96E" }}
      >
        View your card →
      </Link>
    </div>
  );
};

export default MemberOrientation;