import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export type Member = {
  id: string;
  first_name: string;
  email: string;
  member_number: number;
  created_at: string;
  last_signed_in_at: string;
};

export const useMember = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMember = async () => {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .maybeSingle();
    if (!error && data) setMember(data as Member);
    setLoading(false);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
      if (s?.user) {
        setTimeout(() => {
          loadMember();
          // touch last_signed_in_at — fire-and-forget
          (supabase.rpc as unknown as (fn: string) => Promise<unknown>)("touch_member_signed_in").catch(() => {});
        }, 0);
      } else {
        setMember(null);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) loadMember();
      else setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, member, loading };
};

export default useMember;