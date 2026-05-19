/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import {
  main, container, innerBorder, masthead, monogramP, rule,
  h1, text, link, button, buttonWrap, footer, tagline,
} from './_shared-styles.ts'

interface EmailChangeEmailProps {
  siteName: string
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  oldEmail, newEmail, confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm the new address on your Library Card</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={innerBorder}>
          <Text style={monogramP}>P</Text>
          <Text style={masthead}>THE PASTED LIBRARY</Text>
          <Hr style={rule} />

          <Heading style={h1}>Change the name on the Card.</Heading>
          <Text style={text}>
            From <Link href={`mailto:${oldEmail}`} style={link}>{oldEmail}</Link>{' '}
            to <Link href={`mailto:${newEmail}`} style={link}>{newEmail}</Link>.
          </Text>
          <Text style={text}>Confirm below and the change is sealed.</Text>

          <div style={buttonWrap}>
            <Button style={button} href={confirmationUrl}>Confirm the Change</Button>
          </div>

          <Text style={tagline}>
            If you didn't ask for this, secure your account at once.
          </Text>

          <Text style={footer}>
            ONE LETTER. NO SPAM. THE CARD REMAINS YOURS.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail
