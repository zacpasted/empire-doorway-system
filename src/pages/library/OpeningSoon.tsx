import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  PageFrame,
  TopNav,
  Content,
  SiteFooter,
  BrassLink,
  Fleuron,
  RiseIn,
  CORMORANT,
  BRASS,
  NIGHT,
  QUIET,
  monoLabel,
} from "@/components/library/atrium/LibraryChrome";

type Props = {
  title: string;
  description: string;
  shortName: string;
};

export const OpeningSoon = ({ title, description, shortName }: Props) => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    document.title = `${title} — The PASTED Library`;
  }, [title]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setAuthed(!!data.user));
  }, []);

  return (
    <PageFrame>
      <TopNav />
      <Content narrow>
        <RiseIn>
          <div
            className="flex flex-col items-center text-center"
            style={{ paddingTop: "16vh", paddingBottom: "10vh" }}
          >
            <div style={{ ...monoLabel, color: BRASS, marginBottom: 40 }}>
              {title}
            </div>
            <div style={{ marginBottom: 40 }}>
              <Fleuron />
            </div>
            <h1
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(44px, 8vw, 72px)",
                lineHeight: 1,
                color: NIGHT,
                margin: 0,
              }}
            >
              Opening soon.
            </h1>
            <p
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 20,
                color: QUIET,
                marginTop: 32,
                lineHeight: 1.5,
                maxWidth: 480,
              }}
            >
              {description}
            </p>
            <div
              style={{
                ...monoLabel,
                fontSize: 10,
                color: QUIET,
                marginTop: 56,
                letterSpacing: "0.32em",
              }}
            >
              When the {shortName} is ready, you&rsquo;ll be the first to know.
            </div>
            <div style={{ marginTop: 48 }}>
              <BrassLink
                onClick={() =>
                  navigate(authed ? "/library/members" : "/library")
                }
              >
                Return to the Atrium →
              </BrassLink>
            </div>
          </div>
        </RiseIn>
      </Content>
      <SiteFooter />
    </PageFrame>
  );
};

// Room-specific page exports
export const StacksRoom = () => (
  <OpeningSoon
    title="The Stacks"
    shortName="Stacks"
    description="Where the working materials of the practice will sit. On real wooden shelves, organised by function."
  />
);
export const CinemaRoom = () => (
  <OpeningSoon
    title="The Cinema"
    shortName="Cinema"
    description="Where the practice is shown — taught, argued, demonstrated, in moving image."
  />
);
export const PeriodicalsRoom = () => (
  <OpeningSoon
    title="The Periodicals"
    shortName="Periodicals"
    description="Where the considered argument lives — long-form essays, dispatches, interviews."
  />
);
export const VaultRoom = () => (
  <OpeningSoon
    title="The Vault"
    shortName="Vault"
    description="Where the rare materials wait — released by schedule, witnessed not consumed."
  />
);
export const ReadingRoomRoom = () => (
  <OpeningSoon
    title="The Reading Room"
    shortName="Reading Room"
    description="Where your own collection lives — what you've saved, what you've kept."
  />
);
export const IndexRoom = () => (
  <OpeningSoon
    title="The Index"
    shortName="Index"
    description="Where you'll find anything in the Library by any criterion."
  />
);