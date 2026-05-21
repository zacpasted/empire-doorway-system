import { useEffect } from "react";
import { LibraryShell } from "@/components/library/chrome/LibraryShell";
import { ChapterHead } from "@/components/library/ChapterHead";
import { LibraryCard } from "@/components/library/LibraryCard";
import { ZONES } from "@/data/library-zones";
import { useMember } from "@/hooks/useMember";

const MemberPage = () => {
  const zone = ZONES.me;
  const { member, loading } = useMember();
  useEffect(() => { document.title = "Your Card — The Pasted Library"; }, []);

  if (loading) return <div className="min-h-screen" style={{ background: "#F4F1EC" }} />;

  return (
    <LibraryShell zone={zone} showRightRail={false}>
      <ChapterHead zone="Your Card" subtitle={zone.subtitle} />
      <div className="px-6 md:px-10 pb-24 flex justify-center">
        <LibraryCard
          firstName={member?.first_name || "Guest of the House"}
          memberNumber={member?.member_number ?? 0}
          joinedAt={member?.created_at}
        />
      </div>
    </LibraryShell>
  );
};

export default MemberPage;