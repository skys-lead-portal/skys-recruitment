import { NextRequest, NextResponse } from 'next/server'

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!
const FROM_NUMBER = process.env.TWILIO_WA_FROM! // whatsapp:+6591086574

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)

    const buttonPayload = params.get('ButtonPayload') || params.get('ButtonText') || ''
    const msgBody = (params.get('Body') || '').toLowerCase().trim()
    const from = params.get('From') || '' // whatsapp:+6512345678

    // Only fire if they tapped "Confirm My Slot"
    const isConfirm = buttonPayload === 'confirm_slot' ||
      msgBody.includes('confirm my slot') ||
      msgBody === 'confirm_slot'

    if (!from || !isConfirm) {
      return NextResponse.json({ ok: true })
    }

    // Send plain thank-you reply
    const message = new URLSearchParams({
      From: FROM_NUMBER,
      To: from,
      Body: '✅ Slot confirmed! Thank you for your interest in joining SKYS Branch. Our team will be in touch with you within 1 business day.\n\n— SKYS Branch',
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
