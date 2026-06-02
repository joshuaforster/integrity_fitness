import 'server-only'
import { NextResponse, type NextRequest } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { stripe } from '@/lib/stripe'

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENTS = ['joshuaforster95@gmail.com']
// TODO: replace with a verified sending domain before going to production
const FROM_EMAIL = 'onboarding@resend.dev'

const LOGO_URL = 'https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/logo_white.png'
const SITE_URL = 'https://www.integrityfitnesseducation.co.uk'
const BRAND_RED = '#CE1A19'
const BRAND_BLACK = '#0a0a0a'

function formatAmount(amount: number | null, currency: string | null) {
  if (amount == null) return 'unknown'
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency ?? 'GBP',
  }).format(amount / 100)
}

function emailShell(bodyHtml: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Integrity Fitness Education</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Red accent bar -->
          <tr>
            <td style="background:${BRAND_RED};height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header with logo -->
          <tr>
            <td style="background:${BRAND_BLACK};padding:32px 40px;" align="center">
              <a href="${SITE_URL}" style="display:inline-block;">
                <img src="${LOGO_URL}" alt="Integrity Fitness Education" width="160" height="auto" style="display:block;border:0;" />
              </a>
            </td>
          </tr>

          <!-- Body -->
          ${bodyHtml}

          <!-- Footer -->
          <tr>
            <td style="background:#18181b;padding:28px 40px;" align="center">
              <p style="margin:0 0 6px;font-size:12px;color:#a1a1aa;text-align:center;">
                <a href="${SITE_URL}" style="color:#a1a1aa;text-decoration:none;">integrityfitnesseducation.co.uk</a>
                &nbsp;·&nbsp;
                <a href="mailto:info@integrityfitnesseducation.co.uk" style="color:#a1a1aa;text-decoration:none;">info@integrityfitnesseducation.co.uk</a>
              </p>
              <p style="margin:0 0 6px;font-size:12px;color:#71717a;text-align:center;">
                Complete Fitness Gym · Whiffler Road · Norwich · Norfolk · NR3 2AW
              </p>
              <p style="margin:0;font-size:11px;color:#52525b;text-align:center;">
                Integrity Fitness Education Ltd · Company No. 13487683 · CIMSPA Accredited
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function customerReceiptHtml(opts: {
  name: string
  courses: string
  amount: string
  isMonthly: boolean
}) {
  const { name, courses, amount, isMonthly } = opts
  const paymentLabel = isMonthly ? 'Monthly payment plan' : 'Paid in full'

  return emailShell(`
  <!-- Greeting -->
  <tr>
    <td style="padding:40px 40px 0;">
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0a0a0a;letter-spacing:-0.3px;">
        You're enrolled. Welcome.
      </h1>
      <p style="margin:0;font-size:15px;color:#52525b;line-height:1.6;">
        Hi ${name}, thanks for enrolling with Integrity Fitness Education. Here's a summary of your order.
      </p>
    </td>
  </tr>

  <!-- Order summary card -->
  <tr>
    <td style="padding:28px 40px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
             style="border:1px solid #e4e4e7;border-radius:6px;overflow:hidden;">
        <tr>
          <td style="background:#fafafa;padding:12px 20px;border-bottom:1px solid #e4e4e7;">
            <p style="margin:0;font-size:11px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:1px;">
              Order Summary
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:16px 20px;border-bottom:1px solid #f4f4f5;">
                  <p style="margin:0 0 2px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.8px;">Course</p>
                  <p style="margin:0;font-size:14px;font-weight:600;color:#0a0a0a;">${courses}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 20px;border-bottom:1px solid #f4f4f5;">
                  <p style="margin:0 0 2px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.8px;">Payment type</p>
                  <p style="margin:0;font-size:14px;font-weight:600;color:#0a0a0a;">${paymentLabel}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 20px;background:#fafafa;">
                  <p style="margin:0 0 2px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.8px;">Amount paid</p>
                  <p style="margin:0;font-size:20px;font-weight:700;color:${BRAND_RED};">${amount}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- What happens next -->
  <tr>
    <td style="padding:28px 40px 0;">
      <h2 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#0a0a0a;text-transform:uppercase;letter-spacing:1px;">
        What happens next
      </h2>
      <p style="margin:0 0 10px;font-size:14px;color:#3f3f46;line-height:1.7;">
        Our team will be in touch shortly to confirm your start date and provide everything you need to get going.
        If you have any questions in the meantime, just reply to this email.
      </p>
      <p style="margin:0;font-size:14px;color:#3f3f46;line-height:1.7;">
        We're looking forward to working with you.
      </p>
    </td>
  </tr>

  <!-- CTA button -->
  <tr>
    <td style="padding:28px 40px 40px;">
      <a href="${SITE_URL}"
         style="display:inline-block;background:${BRAND_RED};color:#ffffff;font-size:14px;font-weight:700;
                text-decoration:none;padding:14px 28px;border-radius:4px;letter-spacing:0.3px;">
        Visit Our Website
      </a>
    </td>
  </tr>
  `)
}

function sellerNotificationHtml(opts: {
  name: string
  email: string
  courses: string
  amount: string
  isMonthly: boolean
}) {
  const { name, email, courses, amount, isMonthly } = opts
  const paymentLabel = isMonthly ? 'Monthly plan' : 'Paid in full'

  return emailShell(`
  <!-- Alert banner -->
  <tr>
    <td style="background:#f0fdf4;border-bottom:1px solid #bbf7d0;padding:14px 40px;">
      <p style="margin:0;font-size:13px;font-weight:700;color:#166534;">
        &#10003;&nbsp; New enrolment payment received
      </p>
    </td>
  </tr>

  <!-- Heading -->
  <tr>
    <td style="padding:32px 40px 0;">
      <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#0a0a0a;">
        ${name} has enrolled
      </h1>
      <p style="margin:0;font-size:14px;color:#71717a;">
        <a href="mailto:${email}" style="color:${BRAND_RED};text-decoration:none;">${email}</a>
      </p>
    </td>
  </tr>

  <!-- Details card -->
  <tr>
    <td style="padding:24px 40px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
             style="border:1px solid #e4e4e7;border-radius:6px;overflow:hidden;">
        <tr>
          <td style="background:#fafafa;padding:12px 20px;border-bottom:1px solid #e4e4e7;">
            <p style="margin:0;font-size:11px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:1px;">
              Enrolment Details
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="140" style="padding:14px 20px;border-bottom:1px solid #f4f4f5;font-size:12px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;vertical-align:top;">Student</td>
                <td style="padding:14px 20px;border-bottom:1px solid #f4f4f5;font-size:14px;color:#0a0a0a;font-weight:600;">${name}</td>
              </tr>
              <tr>
                <td width="140" style="padding:14px 20px;border-bottom:1px solid #f4f4f5;font-size:12px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;vertical-align:top;">Email</td>
                <td style="padding:14px 20px;border-bottom:1px solid #f4f4f5;font-size:14px;color:#0a0a0a;">
                  <a href="mailto:${email}" style="color:${BRAND_RED};text-decoration:none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td width="140" style="padding:14px 20px;border-bottom:1px solid #f4f4f5;font-size:12px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;vertical-align:top;">Course(s)</td>
                <td style="padding:14px 20px;border-bottom:1px solid #f4f4f5;font-size:14px;color:#0a0a0a;">${courses}</td>
              </tr>
              <tr>
                <td width="140" style="padding:14px 20px;font-size:12px;color:#71717a;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;vertical-align:top;">Payment</td>
                <td style="padding:14px 20px;">
                  <span style="font-size:18px;font-weight:700;color:${BRAND_RED};">${amount}</span>
                  <span style="font-size:13px;color:#71717a;margin-left:8px;">${paymentLabel}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr><td style="padding:40px 40px 0;"></td></tr>
  `)
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
    subject: `New Enrolment — ${name} · ${amount}`,
    html: sellerNotificationHtml({ name, email, courses, amount, isMonthly }),
  })
  if (sendError) throw new Error(`Resend error: ${sendError.message}`)
}

async function sendReceiptToCustomer(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_details?.email ?? session.customer_email
  if (!customerEmail) return

  const name = session.customer_details?.name ?? 'there'
  const isMonthly = session.mode === 'subscription'
  const amount = formatAmount(session.amount_total, session.currency)

  const full = await stripe.checkout.sessions.retrieve(session.id, { expand: ['line_items'] })
  const courses = full.line_items?.data.map((i) => i.description ?? 'Course').join(', ') ?? 'Unknown course'

  const { error: sendError } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [customerEmail],
    subject: `Enrolment Confirmed — ${courses}`,
    html: customerReceiptHtml({ name, courses, amount, isMonthly }),
  })
  if (sendError) throw new Error(`Resend error (receipt): ${sendError.message}`)
}

type SubscriptionItem = { slug: string; tier: string; name: string; amount: number }

async function createDepositSubscriptions(session: Stripe.Checkout.Session) {
  const raw = session.metadata?.subscription_items
  if (!raw) return

  const subscriptionItems: SubscriptionItem[] = JSON.parse(raw)
  if (!subscriptionItems.length) return

  const customerId = session.customer as string
  const paymentIntentId = session.payment_intent as string

  const pi = await stripe.paymentIntents.retrieve(paymentIntentId)
  const paymentMethodId = pi.payment_method as string | null
  if (!paymentMethodId) throw new Error('No payment method on deposit payment intent')

  await stripe.customers.update(customerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  })

  // No cancel_at — subscription runs until Harry cancels it manually in the
  // Stripe Dashboard once the student's units are all marked complete.
  await Promise.all(
    subscriptionItems.map((item) =>
      stripe.subscriptions.create({
        customer: customerId,
        items: [{
          // product_data is valid at runtime but missing from this SDK version's types
          price_data: {
            currency: 'gbp',
            unit_amount: item.amount,
            recurring: { interval: 'month' },
            product_data: { name: `${item.name} — ${item.tier} (Monthly Plan)` },
          } as unknown as Stripe.SubscriptionCreateParams.Item.PriceData,
        }],
        default_payment_method: paymentMethodId,
        metadata: { slug: item.slug, tier_name: item.tier, type: 'course_monthly_plan' },
      })
    )
  )
}

async function notifyRenewal(invoice: Stripe.Invoice) {
  const email = invoice.customer_email ?? 'Unknown'
  const amount = formatAmount(invoice.amount_paid, invoice.currency)
  const description = invoice.lines.data.map((l) => l.description ?? 'Renewal').join(', ')

  const { error: sendError } = await resend.emails.send({
    from: FROM_EMAIL,
    to: RECIPIENTS,
    subject: `Monthly Renewal — ${email} · ${amount}`,
    html: sellerNotificationHtml({
      name: email,
      email,
      courses: description,
      amount,
      isMonthly: true,
    }),
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
      const session = event.data.object as Stripe.Checkout.Session
      const tasks: Promise<unknown>[] = [notifyEnrolment(session), sendReceiptToCustomer(session)]
      if (session.metadata?.type === 'deposit_with_subscription') {
        tasks.push(createDepositSubscriptions(session))
      }
      await Promise.all(tasks)
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
