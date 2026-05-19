/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import {
  main, container, innerBorder, masthead, monogramP, rule,
  h1, text, code, footer, tagline,
} from './_shared-styles.ts'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your verification mark</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={innerBorder}>
          <Text style={monogramP}>P</Text>
          <Text style={masthead}>THE PASTED LIBRARY</Text>
          <Hr style={rule} />

          <Heading style={h1}>Confirm it is you.</Heading>
          <Text style={text}>Enter this mark to continue:</Text>

          <div><span style={code}>{token}</span></div>

          <Text style={tagline}>The mark expires shortly.</Text>

          <Text style={footer}>
            IF YOU DID NOT ASK FOR THIS — IGNORE THIS LETTER.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail
