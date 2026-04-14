import { NextRequest, NextResponse } from 'next/server'

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!
const FROM_NUMBER = process.env.TWILIO_WA_FROM! // whatsapp:+6591086574
const BOOKING_CONTENT_SID = 'HX0a6b5bc3fb474b568b78a1da0aebb104'
const BOOKING_URL = process.env.BOOKING_URL || 'https://calendly.com/samuel-seah/discussion'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)

    const buttonPayload = params.get('ButtonPayload') || params.get('ButtonText') || ''
    const from = params.get('From') || '' // whatsapp:+6512345678

    // Only fire if they tapped "Confirm My Slot"
    if (!from || !buttonPayload.toLowerCase().includes('confirm')) {
      return NextResponse.json({ ok: true })
    }

    // Send booking link follow-up
    const message = new URLSearchParams({
      From: FROM_NUMBER,
      To: from,
      ContentSid: BOOKING_CONTENT_SID,
      ContentVariables: JSON.stringify({ '1': BOOKING_URL }),
    })

    const auth = Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64')

    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: message.toString(),
    })

    // Update wa_status in Supabase
    const supabaseUrl = 'https://qcboyqrumtzmqffukrhb.supabase.co'
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const mobile = from.replace('whatsapp:', '')
    if (supabaseKey && mobile) {
      await fetch(`${supabaseUrl}/rest/v1/recruitment_leads?mobile=eq.${encodeURIComponent(mobile)}&source=eq.rc25-map8`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
        body: JSON.stringify({ wa_status: 'slot_confirmed', status: 'slot_confirmed' }),
      }).catch(() => {})
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[WA Webhook] error:', e)
    return NextResponse.json({ ok: true })
  }
}
