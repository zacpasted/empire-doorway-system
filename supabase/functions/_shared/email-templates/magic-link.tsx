/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import {
  main, container, innerBorder, masthead, monogramP, rule,
  h1, text, button, buttonWrap, footer, tagline,
} from './_shared-styles.ts'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your key to the Pasted Library</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={innerBorder}>
          <Text style={monogramP}>P</Text>
          <Text style={masthead}>THE PASTED LIBRARY</Text>
          <Hr style={rule} />

          <Heading style={h1}>The door is unlocked.</Heading>
          <Text style={text}>
            A single key, valid for a short while. Press it and step inside.
          </Text>

          <div style={buttonWrap}>
            <Button style={button} href={confirmationUrl}>Enter the Library</Button>
          </div>

          <Text style={tagline}>
            One key. One door. The shelves are as you left them.
          </Text>

          <Text style={footer}>
            IF YOU DID NOT REQUEST THIS — IGNORE. THE KEY WILL EXPIRE.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail
