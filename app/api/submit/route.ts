import { NextRequest, NextResponse } from 'next/server'

const SKYS_SUPABASE_URL = 'https://qcboyqrumtzmqffukrhb.supabase.co'
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('65') && digits.length === 10) return `+${digits}`
  if (digits.length === 8 && /^[689]/.test(digits)) return `+65${digits}`
  return `+${digits}`
}

async function sendWhatsAppConfirmation(name: string, mobile: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_WA_FROM // e.g. whatsapp:+6591086574
  if (!accountSid || !authToken || !fromNumber) {
    console.warn('[WA] Missing Twilio env vars — skipping WhatsApp send')
    return
  }

  const to = `whatsapp:${mobile}`
  const firstName = name.trim().split(' ')[0]

  // Use Twilio Content API template with CTA button
  // Template: skys_recruitment_confirmation_v1
  // Variables: {{1}} = first name, {{2}} = booking URL
  const body = new URLSearchParams({
    From: fromNumber,
    To: to,
    ContentSid: 'HXe0edfbbcddd857cb8fe1fb4fe5b05d51',
    ContentVariables: JSON.stringify({ '1': firstName }),
  })

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })
    const data = await res.json()
    if (data.error_code) {
      console.error('[WA] Twilio error:', data.error_code, data.message)
    } else {
      console.log('[WA] Sent:', data.sid)
    }
  } catch (e) {
    console.error('[WA] fetch error:', e)
  }
}

async function notifyTelegram(name: string, mobile: string, email: string, pai: string, role: string, mdrt: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_LEADS_GROUP_ID
  if (!botToken || !chatId) return

  const paiLabel: Record<string, string> = {
    below_60k: 'Below S$60k',
    '60k_79k': 'S$60k–S$79k',
    '80k_119k': 'S$80k–S$119k',
    '120k_199k': 'S$120k–S$199k',
    '200k_299k': 'S$200k–S$299k',
    '300k_399k': 'S$300k–S$399k',
    above_400k: 'Above S$400k',
  }

  const text = `🎯 *New Recruitment Lead*\n\n👤 ${name}\n📱 ${mobile}\n📧 ${email}${role ? `\n💼 ${role}` : ''}\n💰 ${paiLabel[pai] || pai}\n🏆 MDRT: ${mdrt === 'yes' ? 'Yes ✅' : 'No'}\n\n📍 via SKYS Recruitment Page`

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown', disable_web_page_preview: true }),
  }).catch(e => console.error('[TG] error:', e))
}

async function resolveCampaignId(slug: string, supabaseKey: string): Promise<string | null> {
  if (!slug) return null
  try {
    const res = await fetch(
      `${SKYS_SUPABASE_URL}/rest/v1/recruitment_campaigns?slug=eq.${encodeURIComponent(slug)}&select=id&limit=1`,
      { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
    )
    const data = await res.json()
    return data?.[0]?.id || null
  } catch { return null }
}

export async function POST(req: NextRequest) {
  try {
    const { name, mobile, email, currentRole, pai, mdrt, campaignSlug } = await req.json()

    if (!name || !mobile || !email || !pai) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const normalizedPhone = normalizePhone(mobile)

    // 1. Save to Supabase
    if (supabaseKey) {
      const campaignId = await resolveCampaignId(campaignSlug || '', supabaseKey)
      await fetch(`${SKYS_SUPABASE_URL}/rest/v1/recruitment_leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          full_name: name.trim(),
          mobile: normalizedPhone,
          email: email.trim(),
          role_company: currentRole?.trim() || null,
          pai_tier: pai,
          mdrt: mdrt || 'no',
          source: 'rc25-map8',
          status: 'new',
          campaign_id: campaignId,
        }),
      }).catch(e => console.error('[DB] error:', e))
    }

    // 2. Notify Telegram ops group
    await notifyTelegram(name.trim(), normalizedPhone, email.trim(), pai, currentRole || '', mdrt || 'no')

    // 3. Send WhatsApp confirmation to lead (awaited so it completes before function exits)
    await sendWhatsAppConfirmation(name.trim(), normalizedPhone).catch(e => console.error('[WA] error:', e))

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[Submit] error:', e)
    return NextResponse.json({ success: true })
  }
}
