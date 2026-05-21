import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LibraryLayout } from "@/components/library/LibraryLayout";
import { LibraryCard } from "@/components/library/LibraryCard";
import { useMember } from "@/hooks/useMember";

const CardPage = () => {
  const { session, member, loading } = useMember();
  const navigate = useNavigate();
  useEffect(() => { document.title = "Your Card — The PASTED Library"; }, []);
  useEffect(() => {
    if (!loading && !session) navigate("/login", { replace: true });
  }, [loading, session, navigate]);

  if (loading || !session || !member) return <div className="min-h-screen bg-bone" />;

  return (
    <LibraryLayout>
      <section className="max-w-[1240px] mx-auto px-6 py-16 md:py-24">
        <LibraryCard firstName={member.first_name || "Friend"} memberNumber={member.member_number} joinedAt={member.created_at} />
        <div className="text-center mt-16">
          <Link to="/library" className="lib-meta text-lib-charcoal/55 hover:text-oxblood transition-colors">← Return to the Atrium</Link>
        </div>
      </section>
    </LibraryLayout>
  );
};

export default CardPage;