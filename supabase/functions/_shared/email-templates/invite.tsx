/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import {
  main, container, innerBorder, masthead, monogramP, rule,
  h1, text, button, buttonWrap, footer, tagline,
} from './_shared-styles.ts'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ confirmationUrl }: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You have been offered a Card to the Pasted Library</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={innerBorder}>
          <Text style={monogramP}>P</Text>
          <Text style={masthead}>THE PASTED LIBRARY</Text>
          <Hr style={rule} />

          <Heading style={h1}>A Card has been offered to you.</Heading>
          <Text style={text}>
            The shelves are open. Accept below to claim your Card and walk in.
          </Text>

          <div style={buttonWrap}>
            <Button style={button} href={confirmationUrl}>Accept &amp; Claim My Card</Button>
          </div>

          <Text style={tagline}>
            A vault of work, given freely. Take what is useful.
          </Text>

          <Text style={footer}>
            NOT EXPECTING THIS? YOU MAY SAFELY IGNORE.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail
