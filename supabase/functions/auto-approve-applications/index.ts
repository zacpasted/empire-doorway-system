// Auto-approve pending applications older than 30 minutes.
// Invoked by pg_cron every minute.
// For each newly approved application, creates an auth user and sends the
// magic-link welcome email via supabase.auth.admin.inviteUserByEmail.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const siteUrl =
    Deno.env.get("SITE_URL") ?? "https://empire-doorway-system.lovable.app";

  // Find pending applications older than 30 minutes
  const cutoff = new Date(Date.now() - 30 * 60 * 1000).toISOString();

  const { data: pending, error: fetchErr } = await supabase
    .from("applications")
    .select("id, email, first_name, card_no")
    .eq("status", "pending")
    .lte("submitted_at", cutoff)
    .limit(50);

  if (fetchErr) {
    console.error("fetch pending failed", fetchErr);
    return new Response(JSON.stringify({ error: fetchErr.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const results: Array<{ id: string; ok: boolean; error?: string }> = [];

  for (const row of pending ?? []) {
    try {
      // Approve first
      const { error: updErr } = await supabase
        .from("applications")
        .update({
          status: "approved",
          approved_at: new Date().toISOString(),
        })
        .eq("id", row.id)
        .eq("status", "pending");
      if (updErr) throw updErr;

      // Invite the user — this creates the auth user and sends the magic-link email
      const { error: inviteErr } =
        await supabase.auth.admin.inviteUserByEmail(row.email, {
          redirectTo: `${siteUrl}/library/members`,
          data: {
            first_name: row.first_name,
            card_no: row.card_no,
          },
        });

      if (inviteErr) {
        // If user already exists, send a magic link instead
        if (
          inviteErr.message?.toLowerCase().includes("already") ||
          inviteErr.message?.toLowerCase().includes("exists")
        ) {
          const { error: linkErr } = await supabase.auth.admin.generateLink({
            type: "magiclink",
            email: row.email,
            options: {
              redirectTo: `${siteUrl}/library/members`,
            },
          });
          if (linkErr) throw linkErr;
        } else {
          throw inviteErr;
        }
      }

      await supabase
        .from("applications")
        .update({ invited_at: new Date().toISOString() })
        .eq("id", row.id);

      results.push({ id: row.id, ok: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("approve failed", row.id, msg);
      results.push({ id: row.id, ok: false, error: msg });
    }
  }

  return new Response(
    JSON.stringify({ processed: results.length, results }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
});