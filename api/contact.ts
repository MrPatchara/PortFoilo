import type { IncomingMessage, ServerResponse } from 'node:http'
import { checkRateLimit } from './_lib/rateLimit'
import { isHoneypotFilled, validateContactPayload } from './_lib/validation'

type ContactRequest = IncomingMessage & { body?: unknown }

/** Hard cap on the request body — the form never legitimately exceeds ~6 KB. */
const MAX_BODY_BYTES = 10_000
const RESEND_TIMEOUT_MS = 10_000
const DEFAULT_TO = 'patcharaalumaree@gmail.com'

const sendJson = (res: ServerResponse, status: number, body: Record<string, unknown>) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(body))
}

/**
 * Reads the raw request body, aborting as soon as the size cap is exceeded.
 * Previously this accumulated an unbounded string, so a single oversized POST
 * could exhaust the function's memory.
 */
const readBody = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    let raw = ''
    let size = 0

    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Payload too large'))
        req.destroy()
        return
      }
      raw += chunk.toString()
    })

    req.on('end', () => resolve(raw))
    req.on('error', reject)
  })

const clientIp = (req: IncomingMessage): string => {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) return forwarded[0]
  return req.socket?.remoteAddress ?? 'unknown'
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const fieldRow = (label: string, value: string, preserveBreaks = false) => `
  <tr>
    <td style="padding:14px 32px 0;">
      <p style="margin:0 0 4px; color:#DEDBC8; font-family:Arial, Helvetica, sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:1.5px;">${label}</p>
      <p style="margin:0; color:#E1E0CC; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.7; word-break:break-word;">${
        preserveBreaks ? escapeHtml(value).replace(/\n/g, '<br/>') : escapeHtml(value)
      }</p>
    </td>
  </tr>`

const buildEmailHtml = (fields: { name: string; email: string; subject: string; message: string }) => `
<!doctype html>
<html>
  <body style="margin:0; padding:0; background-color:#0d0d0d;">
    <div style="background-color:#0d0d0d; padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; margin:0 auto; background-color:#171717; border-radius:16px; border:1px solid rgba(255,255,255,0.12);">
        <tr>
          <td style="padding:32px 32px 8px; text-align:center;">
            <div style="width:44px; height:44px; margin:0 auto; border-radius:50%; background-color:#DEDBC8; color:#000000; font-family:Arial, Helvetica, sans-serif; font-weight:800; font-size:20px; line-height:44px;">T</div>
            <h1 style="margin:16px 0 4px; color:#E1E0CC; font-family:Arial, Helvetica, sans-serif; font-size:22px; font-weight:700;">ข้อความใหม่จากพอร์ตโฟลิโอ</h1>
            <p style="margin:0; color:#9ca3af; font-family:Arial, Helvetica, sans-serif; font-size:13px;">ข้อความจาก Contact Form บนเว็บไซต์</p>
          </td>
        </tr>
        ${fieldRow('ชื่อผู้ติดต่อ', fields.name || '-')}
        ${fieldRow('อีเมล', fields.email)}
        ${fieldRow('หัวข้อ', fields.subject || '-')}
        ${fieldRow('ข้อความ', fields.message, true)}
        <tr>
          <td style="padding:28px 32px 32px; text-align:center; color:#6b7280; font-family:Arial, Helvetica, sans-serif; font-size:11px;">
            Patchara Al-umaree &mdash; Portfolio
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`

export default async function handler(req: ContactRequest, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    sendJson(res, 405, { success: false, error: 'Method not allowed' })
    return
  }

  // --- Parse the body -------------------------------------------------------
  let raw: unknown
  if (req.body && typeof req.body === 'object') {
    raw = req.body
  } else {
    try {
      raw = JSON.parse((await readBody(req)) || '{}')
    } catch (error) {
      const tooLarge = error instanceof Error && error.message === 'Payload too large'
      sendJson(res, tooLarge ? 413 : 400, {
        success: false,
        error: tooLarge ? 'Payload too large' : 'Invalid JSON body',
      })
      return
    }
  }

  // --- Spam gates -----------------------------------------------------------
  // Honeypot: answer with success so bots cannot tell they were filtered.
  if (isHoneypotFilled(raw)) {
    sendJson(res, 200, { success: true })
    return
  }

  const limit = checkRateLimit(clientIp(req))
  if (!limit.allowed) {
    res.setHeader('Retry-After', String(limit.retryAfterSeconds))
    sendJson(res, 429, {
      success: false,
      error: 'Too many messages sent. Please try again in a few minutes.',
    })
    return
  }

  const validated = validateContactPayload(raw)
  if (!validated.ok) {
    sendJson(res, 400, { success: false, error: validated.error })
    return
  }
  const { name, email, subject: subjectText, message } = validated.value

  // --- Configuration --------------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    sendJson(res, 500, { success: false, error: 'Server not configured' })
    return
  }

  const recipients = (process.env.CONTACT_TO || DEFAULT_TO)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  const from = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>'

  const subject = subjectText
    ? `[Portfolio] ${subjectText} — จาก ${name || 'ผู้ติดต่อ'}`
    : `[Portfolio] ข้อความใหม่จาก ${name || 'ผู้ติดต่อ'}`

  // --- Send -----------------------------------------------------------------
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), RESEND_TIMEOUT_MS)

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: recipients,
        reply_to: email,
        subject,
        html: buildEmailHtml({ name, email, subject: subjectText, message }),
        text: `ชื่อ: ${name || '-'}\nอีเมล: ${email}\nหัวข้อ: ${subjectText || '-'}\n\n${message}`,
      }),
      signal: controller.signal,
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
      sendJson(res, 502, {
        success: false,
        error: 'Failed to send message',
        detail: result?.message ?? result?.name ?? `HTTP ${response.status}`,
      })
      return
    }

    sendJson(res, 200, { success: true })
  } catch {
    // AbortError (our timeout) or a network failure — never leave the form
    // hanging without an answer.
    sendJson(res, 504, {
      success: false,
      error: 'The email service did not respond. Please try again.',
    })
  } finally {
    clearTimeout(timeout)
  }
}
