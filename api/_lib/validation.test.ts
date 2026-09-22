import { describe, expect, it } from 'vitest'
import { FIELD_LIMITS, isHoneypotFilled, validateContactPayload } from './validation'

const VALID = {
  name: 'Patchara',
  email: 'me@example.com',
  subject: 'Hello',
  message: 'A short message',
}

describe('validateContactPayload', () => {
  it('accepts a complete payload', () => {
    expect(validateContactPayload(VALID)).toEqual({ ok: true, value: VALID })
  })

  it('trims whitespace from every field', () => {
    const result = validateContactPayload({ ...VALID, name: '  Patchara  ', message: ' hi ' })
    expect(result).toEqual({ ok: true, value: { ...VALID, name: 'Patchara', message: 'hi' } })
  })

  it('rejects anything that is not an object', () => {
    expect(validateContactPayload(null)).toEqual({ ok: false, error: 'Invalid payload' })
    expect(validateContactPayload('nope')).toEqual({ ok: false, error: 'Invalid payload' })
    expect(validateContactPayload(undefined)).toEqual({ ok: false, error: 'Invalid payload' })
  })

  it('requires both an email and a message', () => {
    expect(validateContactPayload({ email: '', message: '' })).toEqual({
      ok: false,
      error: 'Missing required fields',
    })
    expect(validateContactPayload({ email: VALID.email, message: '   ' })).toEqual({
      ok: false,
      error: 'Missing required fields',
    })
  })

  it('rejects malformed email addresses', () => {
    for (const email of ['nope', 'a@b', 'a b@example.com', '@example.com', 'a@example.']) {
      expect(validateContactPayload({ ...VALID, email })).toEqual({
        ok: false,
        error: 'Invalid email address',
      })
    }
  })

  it('enforces the caps that mirror the form maxLength', () => {
    expect(validateContactPayload({ ...VALID, name: 'x'.repeat(2) })).toEqual({
      ok: true,
      value: { ...VALID, name: 'xx' },
    })
    expect(validateContactPayload({ ...VALID, name: 'x'.repeat(120) })).toEqual({
      ok: false,
      error: 'Name is too long',
    })
    expect(validateContactPayload({ ...VALID, subject: 'x'.repeat(121) })).toEqual({
      ok: false,
      error: 'Subject is too long',
    })
    expect(validateContactPayload({ ...VALID, message: 'x'.repeat(6000) })).toEqual({
      ok: false,
      error: 'Message is too long',
    })
  })

  it('accepts a value exactly at the cap', () => {
    const name = 'x'.repeat(FIELD_LIMITS.name)
    expect(validateContactPayload({ ...VALID, name })).toEqual({
      ok: true,
      value: { ...VALID, name },
    })
  })
})

describe('isHoneypotFilled', () => {
  it('is false when the hidden field is absent or blank', () => {
    expect(isHoneypotFilled(VALID)).toBe(false)
    expect(isHoneypotFilled({ ...VALID, website: '   ' })).toBe(false)
  })

  it('is true as soon as a bot fills it in', () => {
    expect(isHoneypotFilled({ ...VALID, website: 'http://spam.example' })).toBe(true)
  })

  it('is false for a non-object input', () => {
    expect(isHoneypotFilled(null)).toBe(false)
    expect(isHoneypotFilled('website=http://spam.example')).toBe(false)
  })
})
