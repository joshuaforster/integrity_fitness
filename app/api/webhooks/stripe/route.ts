import 'server-only'
import { NextResponse, type NextRequest } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { stripe } from '@/lib/stripe'

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENTS = ['joshuaforster95@gmail.com']
const FROM_EMAIL = 'onboarding@resend.dev'

function formatAmount(amount: number | null, currency: string | null) {
  if (amount == null) return 'unknown'
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency ?? 'GBP',
  }).format(amount / 100)
}

async function notifyEnrolment(session: Stripe.Checkout.Session) {
  const name = session.customer_details?.name ?? 'Unknown'
  const email = session.customer_details?.email ?? session.customer_email ?? 'Unknown'
  const isMonthly = session.mode === 'subscription'
  const amount = formatAmount(session.amount_total, session.currency)

  const full = await stripe.checkout.sessions.retrieve(session.id, { expand: ['line_items'] })
  const courses = full.line_items?.data.map((i) => i.description ?? 'Course').join(', ') ?? 'Unknown course'

  const { error: sendError } = await resend.emails.send({
    from: FROM_EMAIL,
    to: RECIPIENTS,
    subject: `New Enrolment — ${name}`,
    html: `
      <p style="font-family:sans-serif;font-size:14px;color:#111;">
        <strong>New enrolment received.</strong>
      </p>
      <table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse;">
        <tr><td style="padding:4px 16px 4px 0;color:#888;">Student</td><td>${name}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#888;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#888;">Course(s)</td><td>${courses}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#888;">Payment</td><td>${isMonthly ? 'Monthly plan' : 'Paid in full'} — ${amount}</td></tr>
      </table>
    `,
  })
  if (sendError) throw new Error(`Resend error: ${sendError.message}`)
}

async function notifyRenewal(invoice: Stripe.Invoice) {
  const email = invoice.customer_email ?? 'Unknown'
  const amount = formatAmount(invoice.amount_paid, invoice.currency)
  const description = invoice.lines.data.map((l) => l.description ?? 'Renewal').join(', ')

  const { error: sendError } = await resend.emails.send({
    from: FROM_EMAIL,
    to: RECIPIENTS,
    subject: `Monthly Renewal — ${email}`,
    html: `
      <p style="font-family:sans-serif;font-size:14px;color:#111;">
        <strong>Monthly renewal payment received.</strong>
      </p>
      <table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse;">
        <tr><td style="padding:4px 16px 4px 0;color:#888;">Student email</td><td>${email}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#888;">Description</td><td>${description}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#888;">Amount</td><td>${amount}</td></tr>
      </table>
    `,
  })
  if (sendError) throw new Error(`Resend error: ${sendError.message}`)
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !secret) {
    return NextResponse.json({ error: 'Missing stripe-signature or STRIPE_WEBHOOK_SECRET' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `Webhook verification failed: ${msg}` }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      await notifyEnrolment(event.data.object as Stripe.Checkout.Session)
    } else if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object as Stripe.Invoice
      // Skip first-payment invoices — already covered by checkout.session.completed
      if (invoice.billing_reason === 'subscription_cycle') {
        await notifyRenewal(invoice)
      }
    }
  } catch (err) {
    console.error(`Error handling Stripe event ${event.type}:`, err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
