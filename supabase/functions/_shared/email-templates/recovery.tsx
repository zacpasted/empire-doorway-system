/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import {
  main, container, innerBorder, masthead, monogramP, rule,
  h1, text, button, buttonWrap, footer, tagline,
} from './_shared-styles.ts'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ confirmationUrl }: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Reset the lock on your Library Card</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={innerBorder}>
          <Text style={monogramP}>P</Text>
          <Text style={masthead}>THE PASTED LIBRARY</Text>
          <Hr style={rule} />

          <Heading style={h1}>A new key, on request.</Heading>
          <Text style={text}>
            Someone — likely you — asked to reset the lock on this Card. Choose a new one below.
          </Text>

          <div style={buttonWrap}>
            <Button style={button} href={confirmationUrl}>Reset My Key</Button>
          </div>

          <Text style={tagline}>
            If it wasn't you, nothing changes. The old key still works.
          </Text>

          <Text style={footer}>
            IGNORE THIS LETTER TO KEEP YOUR CURRENT KEY.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail
