import 'server-only'
import { NextResponse, type NextRequest } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
})

const FROM_EMAIL = '"Integrity Fitness Education" <joshuaforster95@gmail.com>'
const TO_EMAIL = 'joshuaforster95@gmail.com'
const BRAND_RED = '#CE1A19'

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New Contact Enquiry</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr><td style="background:${BRAND_RED};height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="background:#0a0a0a;padding:28px 40px;">
          <p style="margin:0;font-size:13px;font-weight:700;color:#ffffff;letter-spacing:1px;text-transform:uppercase;">Integrity Fitness Education</p>
        </td></tr>

        <tr><td style="background:#f0fdf4;border-bottom:1px solid #bbf7d0;padding:14px 40px;">
          <p style="margin:0;font-size:13px;font-weight:700;color:#166534;">&#10003;&nbsp; New contact enquiry</p>
        </td></tr>

        <tr><td style="padding:32px 40px 0;">
          <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#0a0a0a;">${name}</h1>
          <p style="margin:0;font-size:14px;color:#71717a;">
            <a href="mailto:${email}" style="color:${BRAND_RED};text-decoration:none;">${email}</a>
            ${phone ? `&nbsp;·&nbsp;${phone}` : ''}
          </p>
        </td></tr>

        <tr><td style="padding:24px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e4e4e7;border-radius:6px;overflow:hidden;">
            <tr><td style="background:#fafafa;padding:12px 20px;border-bottom:1px solid #e4e4e7;">
              <p style="margin:0;font-size:11px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:1px;">Message</p>
            </td></tr>
            <tr><td style="padding:16px 20px;">
              <p style="margin:0;font-size:14px;color:#3f3f46;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:28px 40px;">
          <a href="mailto:${email}" style="display:inline-block;background:${BRAND_RED};color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:4px;letter-spacing:0.3px;">
            Reply to ${name.split(' ')[0]}
          </a>
        </td></tr>

        <tr><td style="background:#18181b;padding:20px 40px;" align="center">
          <p style="margin:0;font-size:12px;color:#71717a;text-align:center;">integrityfitness.education</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Enquiry — ${name}`,
      html,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form email error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
