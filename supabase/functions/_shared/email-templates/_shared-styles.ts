// Shared style tokens for PASTED Library email templates.
// Note: Body background MUST stay #ffffff per platform rule. Container is cream.

export const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Georgia, "Times New Roman", serif',
  margin: '0',
  padding: '32px 16px',
}

export const container = {
  maxWidth: '520px',
  margin: '0 auto',
  background: 'linear-gradient(135deg, #F5EFE0 0%, #EFE6D2 50%, #E8DCC2 100%)',
  border: '1px solid rgba(201,169,110,0.45)',
  padding: '36px 32px 28px',
}

export const innerBorder = {
  border: '1px solid rgba(10,10,10,0.08)',
  padding: '24px 8px 8px',
  textAlign: 'center' as const,
}

export const masthead = {
  fontFamily: '"JetBrains Mono", ui-monospace, "Courier New", monospace',
  fontSize: '10px',
  letterSpacing: '0.28em',
  textTransform: 'uppercase' as const,
  color: '#B8924F',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}

export const monogramP = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontStyle: 'italic' as const,
  fontSize: '44px',
  color: '#C9A96E',
  margin: '0 0 4px',
  lineHeight: '1',
  textAlign: 'center' as const,
}

export const rule = {
  width: '40px',
  height: '1px',
  background: 'rgba(201,169,110,0.55)',
  border: 'none',
  margin: '14px auto 22px',
}

export const h1 = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontStyle: 'italic' as const,
  fontSize: '26px',
  fontWeight: 'normal' as const,
  color: '#1A1410',
  lineHeight: '1.2',
  margin: '0 0 18px',
  textAlign: 'center' as const,
}

export const text = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '15px',
  color: 'rgba(26,20,16,0.78)',
  lineHeight: '1.65',
  margin: '0 0 22px',
  textAlign: 'center' as const,
}

export const link = { color: '#7A1F1F', textDecoration: 'underline' }

export const button = {
  background: 'linear-gradient(135deg, #8A2626 0%, #7A1F1F 50%, #5C1414 100%)',
  color: '#F4F1EC',
  fontFamily: '"JetBrains Mono", ui-monospace, "Courier New", monospace',
  fontSize: '11px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  borderRadius: '10px',
  padding: '14px 28px',
  textDecoration: 'none',
  display: 'inline-block',
  border: '1px solid rgba(60,10,10,0.4)',
}

export const buttonWrap = { textAlign: 'center' as const, margin: '6px 0 26px' }

export const code = {
  fontFamily: '"JetBrains Mono", ui-monospace, "Courier New", monospace',
  fontSize: '26px',
  letterSpacing: '0.32em',
  color: '#7A1F1F',
  background: 'rgba(255,255,255,0.5)',
  border: '1px solid rgba(201,169,110,0.45)',
  borderRadius: '6px',
  padding: '14px 18px',
  display: 'inline-block',
  margin: '0 0 24px',
  textAlign: 'center' as const,
}

export const footer = {
  fontFamily: '"JetBrains Mono", ui-monospace, "Courier New", monospace',
  fontSize: '9px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  color: 'rgba(26,20,16,0.5)',
  margin: '28px 0 0',
  textAlign: 'center' as const,
}

export const tagline = {
  fontFamily: 'Georgia, serif',
  fontStyle: 'italic' as const,
  fontSize: '12px',
  color: 'rgba(26,20,16,0.55)',
  margin: '18px 0 0',
  textAlign: 'center' as const,
}
