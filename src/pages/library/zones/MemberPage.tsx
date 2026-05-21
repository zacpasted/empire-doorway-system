import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LibraryShell } from "@/components/library/chrome/LibraryShell";
import { ChapterHead } from "@/components/library/ChapterHead";
import { LibraryCard } from "@/components/library/LibraryCard";
import { ZONES } from "@/data/library-zones";
import { useMember } from "@/hooks/useMember";

const MemberPage = () => {
  const zone = ZONES.me;
  const { session, member, loading } = useMember();
  const navigate = useNavigate();
  useEffect(() => { document.title = "Your Card — The Pasted Library"; }, []);

  if (loading) return <div className="min-h-screen" style={{ background: "#F4F1EC" }} />;
  if (!session) return <Navigate to="/login" replace />;

  return (
    <LibraryShell zone={zone} showRightRail={false}>
      <ChapterHead zone="Your Card" subtitle={zone.subtitle} />
      <div className="px-6 md:px-10 pb-24 flex justify-center">
        {member && (
          <LibraryCard
            firstName={member.first_name || "Friend"}
            memberNumber={member.member_number}
            joinedAt={member.created_at}
          />
        )}
      </div>
    </LibraryShell>
  );
};

export default MemberPage;