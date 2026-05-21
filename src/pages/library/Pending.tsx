import { useEffect } from "react";
import {
  PageFrame,
  TopNav,
  Content,
  SiteFooter,
  Fleuron,
  RiseIn,
  CORMORANT,
  NIGHT,
  QUIET,
  monoLabel,
} from "@/components/library/atrium/LibraryChrome";

const Pending = () => {
  useEffect(() => {
    document.title = "Your application is being read — The PASTED Library";
  }, []);

  return (
    <PageFrame>
      <TopNav />
      <Content narrow>
        <RiseIn>
          <div
            className="flex flex-col items-center text-center"
            style={{ paddingTop: "18vh", paddingBottom: "10vh" }}
          >
            <div style={{ marginBottom: 40 }}>
              <Fleuron />
            </div>
            <h1
              style={{
                fontFamily: CORMORANT,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(36px, 6vw, 52px)",
                lineHeight: 1.1,
                color: NIGHT,
                margin: 0,
              }}
            >
              Your application is being read.
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
              We read every application by hand. You&rsquo;ll receive an email with
              your Library Card within 30 minutes.
            </p>
            <div
              style={{
                ...monoLabel,
                fontSize: 10,
                color: QUIET,
                marginTop: 56,
                letterSpacing: "0.32em",
                lineHeight: 1.8,
                maxWidth: 420,
              }}
            >
              If nothing arrives by tomorrow, check your spam folder — or write to
              library@pasted.agency.
            </div>
          </div>
        </RiseIn>
      </Content>
      <SiteFooter />
    </PageFrame>
  );
};

export default Pending;