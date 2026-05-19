/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import {
  main, container, innerBorder, masthead, monogramP, rule,
  h1, text, link, button, buttonWrap, footer, tagline,
} from './_shared-styles.ts'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName, siteUrl, recipient, confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your Card to the Pasted Library — confirm your email</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={innerBorder}>
          <Text style={monogramP}>P</Text>
          <Text style={masthead}>THE PASTED LIBRARY</Text>
          <Hr style={rule} />

          <Heading style={h1}>Your Card is waiting.</Heading>
          <Text style={text}>
            Confirm <Link href={`mailto:${recipient}`} style={link}>{recipient}</Link> to claim it,
            then walk the shelves and take what is useful.
          </Text>

          <div style={buttonWrap}>
            <Button style={button} href={confirmationUrl}>Confirm &amp; Enter the Library</Button>
          </div>

          <Text style={tagline}>
            The Card is the threshold. The Library is the first room.
          </Text>

          <Text style={footer}>
            IF THIS WASN'T YOU — IGNORE THIS LETTER. NOTHING WILL BE OPENED.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail
