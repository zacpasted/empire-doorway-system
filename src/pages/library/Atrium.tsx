import { useEffect } from "react";
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
import { Link } from "react-router-dom";

const Atrium = () => {
  useEffect(() => {
    document.title = "The PASTED Library — A private canon on becoming undeniable";
  }, []);

  return (
    <PageFrame>
      <TopNav
        rightSlot={
          <Link
            to="/library/apply"
            style={{ ...monoLabel, color: BRASS, textDecoration: "none" }}
          >
            Apply
          </Link>
        }
      />
      <Content>
        <RiseIn>
          <div
            className="flex flex-col items-center text-center"
            style={{ paddingTop: "22vh", paddingBottom: "10vh" }}
          >
            <div style={{ ...monoLabel, color: BRASS, marginBottom: 40 }}>
              The PASTED Library
            </div>

            <h1
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(44px, 9vw, 88px)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                color: NIGHT,
                margin: 0,
                maxWidth: 680,
              }}
            >
              A private canon on becoming undeniable.
            </h1>

            <p
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(20px, 3vw, 22px)",
                color: QUIET,
                marginTop: 32,
                maxWidth: 480,
              }}
            >
              A vault of work, given freely.
            </p>

            <div style={{ marginTop: 56, marginBottom: 56 }}>
              <Fleuron />
            </div>

            <BrassLink to="/library/apply">Apply for your card →</BrassLink>
          </div>
        </RiseIn>
      </Content>
      <SiteFooter />
    </PageFrame>
  );
};

export default Atrium;