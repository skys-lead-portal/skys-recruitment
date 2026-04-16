'use client'

import React, { useState } from 'react'

const GOLD = '#C8975A'
const GOLD_LIGHT = '#B8864A'
const CREAM = '#F7F3EE'
const CREAM_DARK = '#EDE8E0'
const TEXT_DARK = '#1A1208'
const TEXT_MID = '#4A3F32'
const TEXT_LIGHT = '#7A6E62'

export default function Home() {
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', income: '',
    mdrt: '', consent: false,
  })
  const [campaignSlug, setCampaignSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cid = params.get('cid') || ''
    if (cid) setCampaignSlug(cid)
  }, [])

  const scrollToForm = () =>
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) { setError('Please enter your name.'); return }
    if (!form.mobile || form.mobile.length < 8) { setError('Please enter your mobile number.'); return }
    if (!form.email.trim()) { setError('Please enter your email.'); return }
    if (!form.income) { setError('Please select your income range.'); return }
    if (!form.consent) { setError('Please agree to the privacy policy.'); return }
    setLoading(true)
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pai: form.income, campaignSlug }),
      })
      setSubmitted(true)
    } catch { setError('Network error. Please try again.') }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 18px',
    background: '#FFFFFF',
    border: '1px solid rgba(26,18,8,0.15)',
    borderRadius: 6, fontSize: 15, color: TEXT_DARK,
    outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  const INCOME_OPTIONS = [
    { value: 'below_60k', label: 'Below S$60,000' },
    { value: '60k_79k', label: 'S$60,000 – S$79,999' },
    { value: '80k_119k', label: 'S$80,000 – S$119,999' },
    { value: '120k_199k', label: 'S$120,000 – S$199,999' },
    { value: '200k_299k', label: 'S$200,000 – S$299,999' },
    { value: '300k_399k', label: 'S$300,000 – S$399,999' },
    { value: 'above_400k', label: 'Above S$400,000' },
  ]

  const CARDS = [
    { img: '/card-midcareer.jpg',  title: 'Mid-Career\nSwitchers',         desc: 'Make a strategic career upgrade' },
    { img: '/card-experienced.jpg', title: 'Experienced\nConsultants',     desc: 'Scale your impact & earnings'    },
    { img: '/card-fresh.jpg',       title: 'Students & Fresh\nGraduates',  desc: 'Launch a rewarding career with us' },
  ]

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: CREAM, color: TEXT_DARK, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #F7F3EE; }

        h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; }

        input::placeholder { color: rgba(100,80,60,0.4); }
        select option { background: #F7F3EE; color: #1A1208; }
        input:focus, select:focus { border-color: ${GOLD} !important; outline: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 1s ease forwards; }

        /* ── HERO BUTTON ── */
        .btn-hero {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 44px;
          border: 1px solid rgba(26,18,8,0.35);
          border-radius: 3px;
          background: rgba(247,243,238,0.6);
          backdrop-filter: blur(6px);
          color: #1A1208; font-size: 14px; font-weight: 600;
          letter-spacing: 0.04em; text-transform: uppercase;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: border-color 0.25s, background 0.25s;
        }
        .btn-hero:hover { border-color: ${GOLD}; background: rgba(200,151,90,0.15); }

        /* ── SECTION CTA ── */
        .btn-section {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 38px;
          border: 1px solid rgba(184,134,74,0.6);
          border-radius: 3px;
          background: transparent;
          color: #B8864A; font-size: 14px; font-weight: 600;
          letter-spacing: 0.04em; text-transform: uppercase;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: border-color 0.25s, background 0.25s, color 0.25s;
        }
        .btn-section:hover { border-color: ${GOLD}; background: rgba(200,151,90,0.1); color: #1A1208; }

        /* ── SUBMIT BUTTON ── */
        .btn-submit {
          width: 100%; padding: 17px;
          border: none;
          border-radius: 6px;
          background: ${GOLD};
          color: #fff; font-size: 15px; font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: background 0.25s, opacity 0.2s;
        }
        .btn-submit:hover { background: #B8864A; }
        .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }

        /* ── AUDIENCE CARD ── */
        .audience-card {
          flex: 1; border-radius: 8px; overflow: hidden;
          cursor: pointer; min-width: 0;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          box-shadow: 0 2px 16px rgba(26,18,8,0.1);
          border: 1px solid rgba(26,18,8,0.08);
        }
        .audience-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(26,18,8,0.18); }
        .card-img { width: 100%; height: 210px; object-fit: cover; object-position: center top; display: block; }

        /* ── DIVIDER ── */
        .gold-rule { width: 48px; height: 2px; background: ${GOLD}; margin: 0 auto 28px; }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          .cards-row       { flex-direction: column !important; gap: 16px !important; }
          .hero-inner      { padding: 48px 24px 72px !important; }
          .sec-inner       { padding: 0 20px !important; }
          .sec-pad-mobile  { padding: 56px 20px !important; }
          .form-pad-mobile { padding: 56px 20px 72px !important; }
          .form-box-mobile { padding: 28px 20px 24px !important; }
          .footer-mobile   { padding: 28px 20px !important; }
          .btn-hero        { padding: 15px 28px !important; font-size: 13px !important; width: 100%; justify-content: center; }
          .btn-section     { padding: 14px 28px !important; font-size: 13px !important; width: 100%; justify-content: center; }
          .card-img        { height: 180px !important; }
        }
      `}</style>

      {/* ────────────────────────────────────────
          HERO
      ──────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        backgroundImage: `url('/hero-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: '65% 20%',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Dark overlay — heavy at top, heavier at bottom so it bleeds into next section */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(247,243,238,0.72) 0%, rgba(247,243,238,0.45) 35%, rgba(247,243,238,0.65) 70%, rgba(247,243,238,1) 100%)',
        }} />

        <div className="fade-up hero-inner" style={{ position: 'relative', zIndex: 1, maxWidth: 620, padding: '72px 56px 96px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: GOLD, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 22 }}>
            SKYS Branch · Manulife Financial Advisers Singapore
          </p>
          <h1 style={{ fontSize: 'clamp(42px, 6.5vw, 68px)', fontWeight: 800, lineHeight: 1.06, marginBottom: 22, letterSpacing: '-0.5px', color: TEXT_DARK }}>
            Unlock Up to<br />
            <span style={{ color: GOLD_LIGHT }}>4×</span> Transition<br />
            Packages
          </h1>
          <p style={{ fontSize: 16, color: TEXT_MID, marginBottom: 6, fontWeight: 300, lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
            Tailored to your current income &amp; experience.
          </p>
          <p style={{ fontSize: 14, color: TEXT_LIGHT, marginBottom: 44, fontFamily: 'Inter, sans-serif' }}>
            Built for consultants who know their worth — and want more.
          </p>
          <button className="btn-hero" onClick={scrollToForm}>
            Check If You Qualify &nbsp;›
          </button>
          <p style={{ fontSize: 11, color: TEXT_LIGHT, marginTop: 18, letterSpacing: '0.03em', fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}>
            Limited openings · No obligation · Private &amp; Confidential
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────
          AUDIENCE CARDS
      ──────────────────────────────────────── */}
      <section className="sec-pad-mobile" style={{ background: CREAM, padding: '80px 56px' }}>
        <div className="sec-inner" style={{ maxWidth: 960, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: GOLD, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>
            Who We&apos;re Looking For
          </p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 700, color: TEXT_DARK, marginBottom: 10, letterSpacing: '-0.3px' }}>
            Understand More With Our Leaders
          </h2>
          <div className="gold-rule" />

          <div className="cards-row" style={{ display: 'flex', gap: 20, marginBottom: 52 }}>
            {CARDS.map(({ img, title, desc }) => (
              <div key={title} className="audience-card" onClick={scrollToForm}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={title} className="card-img" />
                <div style={{ padding: '18px 20px 22px', background: CREAM }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 6, lineHeight: 1.3, whiteSpace: 'pre-line', fontFamily: 'Playfair Display, serif' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 13, color: '#777', lineHeight: 1.55, fontFamily: 'Inter, sans-serif' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn-section" onClick={scrollToForm}>
              Schedule a Career Conversation &nbsp;›
            </button>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          FORM
      ──────────────────────────────────────── */}
      <section id="form-section" className="form-pad-mobile" style={{ background: CREAM_DARK, padding: '80px 56px 100px', borderTop: '1px solid rgba(200,151,90,0.2)' }}>
        <div className="sec-inner" style={{ maxWidth: 580, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: GOLD, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>
            Eligibility Check
          </p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 700, color: TEXT_DARK, marginBottom: 10, letterSpacing: '-0.3px' }}>
            Check Your Eligibility
          </h2>
          <div className="gold-rule" />
          <p style={{ textAlign: 'center', fontSize: 14, color: TEXT_LIGHT, marginBottom: 40, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
            Submit your details. Our director prepares a personalised proposal within 24 hours.
          </p>

          <div className="form-box-mobile" style={{ border: '1px solid rgba(200,151,90,0.25)', borderRadius: 8, padding: '40px 40px 36px', background: '#FAF8F4', boxShadow: '0 4px 32px rgba(26,18,8,0.07)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: TEXT_DARK, marginBottom: 12 }}>Application Received</h3>
                <p style={{ fontSize: 14, color: TEXT_MID, lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>
                  Our director will personally review your details and reach out within 24 hours via WhatsApp or email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ fontFamily: 'Inter, sans-serif' }}>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: TEXT_MID, marginBottom: 8, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Full Name</label>
                  <input type="text" placeholder="As per NRIC" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} required />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: TEXT_MID, marginBottom: 8, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Mobile Number</label>
                  <div style={{ display: 'flex' }}>
                    <div style={{ ...inputStyle, width: 76, borderRadius: '6px 0 0 6px', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em' }}>
                      +65
                    </div>
                    <input type="tel" placeholder="8-digit number" maxLength={8} value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value.replace(/\D/g, '') }))} style={{ ...inputStyle, borderRadius: '0 6px 6px 0' }} required />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: TEXT_MID, marginBottom: 8, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Email Address</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} required />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: TEXT_MID, marginBottom: 8, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Average Annual Income (Past 3 Years)</label>
                  <select
                    value={form.income} onChange={e => setForm(f => ({ ...f, income: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer', color: form.income ? '#fff' : 'rgba(255,255,255,0.3)', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.35)' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 18px center' }}
                    required
                  >
                    <option value="">Select income range</option>
                    {INCOME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontSize: 12, color: TEXT_MID, marginBottom: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>MDRT Qualifier in Past 3 Years?</label>
                  <div style={{ display: 'flex', gap: 36 }}>
                    {['Yes', 'No'].map(v => (
                      <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 15, color: form.mdrt === v.toLowerCase() ? TEXT_DARK : TEXT_MID, fontWeight: 500, transition: 'color 0.2s' }}>
                        <input type="radio" name="mdrt" value={v.toLowerCase()} checked={form.mdrt === v.toLowerCase()} onChange={() => setForm(f => ({ ...f, mdrt: v.toLowerCase() }))} style={{ accentColor: GOLD, width: 17, height: 17 }} />
                        {v}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid rgba(26,18,8,0.1)', marginBottom: 20 }} />

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', marginBottom: 24 }}>
                  <input type="checkbox" checked={form.consent} onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))} style={{ marginTop: 3, accentColor: GOLD, width: 15, height: 15, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: TEXT_LIGHT, lineHeight: 1.75 }}>
                    By submitting, I consent to the collection, use and retention of my personal data for the purpose of being contacted regarding career opportunities in financial advisory, even if my number is listed on the Do Not Call Registry.
                  </span>
                </label>

                {error && (
                  <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 6, padding: '11px 16px', fontSize: 13, color: '#FCA5A5', marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-submit">
                  {loading ? 'Submitting…' : 'Unlock My Transition Package →'}
                </button>
                <p style={{ textAlign: 'center', fontSize: 11, color: TEXT_LIGHT, marginTop: 16, letterSpacing: '0.03em' }}>
                  Limited openings &nbsp;·&nbsp; No obligation &nbsp;·&nbsp; Private &amp; Confidential
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          FOOTER
      ──────────────────────────────────────── */}
      <footer className="footer-mobile" style={{ background: '#EDE8E0', borderTop: '1px solid rgba(200,151,90,0.2)', padding: '32px 56px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
            SKYS Branch · Manulife Financial Advisers Singapore
          </p>
          <p style={{ fontSize: 11, color: TEXT_LIGHT, lineHeight: 1.85 }}>
            All compensation structures are indicative, personalised, and subject to eligibility criteria.<br />
            This page is intended for qualified financial advisory professionals in Singapore only.
          </p>
        </div>
      </footer>
    </div>
  )
}
