/**
 * Pure validation helpers for the contact endpoint.
 *
 * Kept free of any HTTP/Node types so it can be unit tested directly.
 */

export const FIELD_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 5000,
} as const

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export type ValidationResult =
  | { ok: true; value: ContactPayload }
  | { ok: false; error: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const asTrimmedString = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : ''

/** Honeypot: real users never fill in a field they cannot see. */
export function isHoneypotFilled(input: unknown): boolean {
  if (!input || typeof input !== 'object') return false
  return asTrimmedString((input as Record<string, unknown>).website) !== ''
}

export function validateContactPayload(input: unknown): ValidationResult {
  if (!input || typeof input !== 'object') {
    return { ok: false, error: 'Invalid payload' }
  }

  const record = input as Record<string, unknown>
  const name = asTrimmedString(record.name)
  const email = asTrimmedString(record.email)
  const subject = asTrimmedString(record.subject)
  const message = asTrimmedString(record.message)

  if (!email || !message) {
    return { ok: false, error: 'Missing required fields' }
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: 'Invalid email address' }
  }

  // Length caps protect the mailbox and the outbound Resend payload; the
  // browser enforces the same numbers via maxLength.
  if (name.length > FIELD_LIMITS.name) {
    return { ok: false, error: 'Name is too long' }
  }
  if (email.length > FIELD_LIMITS.email) {
    return { ok: false, error: 'Email address is too long' }
  }
  if (subject.length > FIELD_LIMITS.subject) {
    return { ok: false, error: 'Subject is too long' }
  }
  if (message.length > FIELD_LIMITS.message) {
    return { ok: false, error: 'Message is too long' }
  }

  return { ok: true, value: { name, email, subject, message } }
}
