'use client'

import React, { useState } from 'react'

const GOLD = '#C8975A'
const GOLD_LIGHT = '#E5B97B'
const BG = "url('/hero-bg.jpg')"

export default function Home() {
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', income: '',
    mdrt: '', currentRole: '', consent: false,
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
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 8, fontSize: 15, color: '#fff',
    outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
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
    {
      img: '/card-midcareer.jpg',
      title: 'Mid-Career\nSwitchers',
      desc: 'Make a strategic career upgrade',
    },
    {
      img: '/card-experienced.jpg',
      title: 'Experienced\nConsultants',
      desc: 'Scale your impact & earnings',
    },
    {
      img: '/card-fresh.jpg',
      title: 'Students & Fresh\nGraduates',
      desc: 'Launch a rewarding career with us',
    },
  ]

  return (
    <div style={{ fontFamily: "'Montserrat', 'Inter', -apple-system, sans-serif", minHeight: '100vh', background: '#1a0f08', color: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.35); }
        select option { background: #1a0f08; color: #fff; }
        input:focus, select:focus { border-color: ${GOLD} !important; outline: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.9s ease forwards; }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 40px; border: 1.5px solid rgba(255,255,255,0.6);
          border-radius: 4px; background: rgba(20,12,6,0.5); color: #fff;
          font-size: 15px; font-weight: 600; cursor: pointer;
          transition: all 0.3s ease; font-family: inherit; letter-spacing: 0.2px;
        }
        .btn-outline:hover { background: rgba(200,151,90,0.15); border-color: ${GOLD}; }

        .btn-outline-dark {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 36px; border: 1.5px solid rgba(100,70,40,0.7);
          border-radius: 4px; background: rgba(20,12,6,0.7); color: #fff;
          font-size: 15px; font-weight: 600; cursor: pointer;
          transition: all 0.3s ease; font-family: inherit;
        }
        .btn-outline-dark:hover { border-color: ${GOLD}; }

        .btn-submit {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 16px 40px; border: 1.5px solid rgba(255,255,255,0.5);
          border-radius: 4px; background: rgba(30,18,8,0.6); color: #fff;
          font-size: 15px; font-weight: 700; cursor: pointer; width: 100%;
          transition: all 0.3s ease; font-family: inherit;
        }
        .btn-submit:hover { background: rgba(200,151,90,0.15); border-color: ${GOLD}; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .audience-card {
          flex: 1; border-radius: 10px; overflow: hidden;
          cursor: pointer; transition: transform 0.22s ease, box-shadow 0.22s ease;
          min-width: 0; background: #fff; position: relative;
        }
        .audience-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.5); }
        .card-img { width: 100%; height: 200px; object-fit: cover; object-position: center top; display: block; }

        .understand-heading {
          font-size: clamp(20px, 2.5vw, 26px); font-weight: 700; color: #fff;
          text-align: center; margin-bottom: 36px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        @media (max-width: 768px) {
          .cards-row { flex-direction: column !important; }
          .sec-pad { padding-left: 20px !important; padding-right: 20px !important; }
          .hero-text { padding: 0 24px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: `linear-gradient(to bottom, rgba(10,6,2,0.45) 0%, rgba(10,6,2,0.25) 35%, rgba(10,6,2,0.65) 70%, rgba(18,9,3,0.98) 100%), ${BG} center top / cover no-repeat`,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        padding: '60px 0 64px',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        position: 'relative',
      }}>
        <div className="fade-up hero-text" style={{ maxWidth: 560, padding: '0 48px' }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 18, fontWeight: 400, letterSpacing: 0.2 }}>
            Built for consultants who know their worth — and want more
          </p>
          <h1 style={{ fontSize: 'clamp(44px, 7vw, 72px)', fontWeight: 800, lineHeight: 1.08, marginBottom: 20, letterSpacing: '-0.5px' }}>
            Unlock Up to<br />
            <span style={{ color: GOLD_LIGHT }}>4X</span> Transition<br />
            Packages
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 6, fontWeight: 400, lineHeight: 1.5 }}>
            Tailored to Your Current Income &amp; Experience.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 36, lineHeight: 1.5 }}>
            SKYS Branch · Manulife Financial Advisers Singapore
          </p>
          <button className="btn-outline" onClick={scrollToForm}>
            Check If You Qualify for a 4X Transition &rsaquo;
          </button>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 14 }}>
            Limited openings. No obligation. Private &amp; Confidential
          </p>
        </div>
      </section>

      {/* ── AUDIENCE CARDS ── */}
      <section style={{
        background: 'linear-gradient(to bottom, #12090300, #1a0f08)',
        padding: '64px 48px 72px',
      }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <div className="understand-heading">
            Understand More With Our Leaders &rsaquo;
          </div>
          <div className="cards-row" style={{ display: 'flex', gap: 18, marginBottom: 48 }}>
            {CARDS.map(({ img, title, desc }) => (
              <div key={title} className="audience-card" onClick={scrollToForm}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={title} className="card-img" />
                <div style={{ padding: '16px 18px 20px', background: '#fff' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 6, lineHeight: 1.35, whiteSpace: 'pre-line' }}>{title}</h3>
                  <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn-outline-dark" onClick={scrollToForm}>
              Schedule a Career Conversation &rsaquo;
            </button>
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="form-section" style={{
        background: 'linear-gradient(to bottom, #1a0f08, #12090a)',
        padding: '64px 48px 88px',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 800, color: '#fff', marginBottom: 40, letterSpacing: '-0.3px' }}>
            Check Your <span style={{ fontStyle: 'italic', color: GOLD_LIGHT }}>Eligibility</span>
          </h2>

          <div style={{ border: `1px solid rgba(200,151,90,0.25)`, borderRadius: 6, padding: '36px 36px 32px', background: 'rgba(0,0,0,0.35)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Application Received</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
                  Our director will personally review your details and reach out within 24 hours via WhatsApp or email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 7, fontWeight: 500 }}>Full Name</label>
                  <input
                    type="text" placeholder="As per NRIC"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle} required
                  />
                </div>

                {/* Mobile */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ ...inputStyle, width: 80, borderRadius: '8px 0 0 8px', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14, color: 'rgba(255,255,255,0.6)', gap: 4 }}>
                      +65 <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>▾</span>
                    </div>
                    <input
                      type="tel" placeholder="Mobile"
                      maxLength={8} value={form.mobile}
                      onChange={e => setForm(f => ({ ...f, mobile: e.target.value.replace(/\D/g, '') }))}
                      style={{ ...inputStyle, borderRadius: '0 8px 8px 0' }} required
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 7, fontWeight: 500 }}>Email Address</label>
                  <input
                    type="email" placeholder="your@email.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle} required
                  />
                </div>

                {/* Income */}
                <div style={{ marginBottom: 14 }}>
                  <select
                    value={form.income} onChange={e => setForm(f => ({ ...f, income: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer', color: form.income ? '#fff' : 'rgba(255,255,255,0.35)', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.4)' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    required
                  >
                    <option value="">Past 3 Years Average Income</option>
                    {INCOME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>

                {/* MDRT */}
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 12, fontWeight: 500 }}>MDRT Qualifier in Past 3 Years?</label>
                  <div style={{ display: 'flex', gap: 32 }}>
                    {['Yes', 'No'].map(v => (
                      <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                        <input
                          type="radio" name="mdrt" value={v.toLowerCase()}
                          checked={form.mdrt === v.toLowerCase()}
                          onChange={() => setForm(f => ({ ...f, mdrt: v.toLowerCase() }))}
                          style={{ accentColor: GOLD, width: 17, height: 17 }}
                        />
                        {v}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Consent */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
                  <input
                    type="checkbox" checked={form.consent}
                    onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                    style={{ marginTop: 3, accentColor: GOLD, width: 14, height: 14, flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
                    By submitting, I consent to the collection, use and retention of my personal data for the purpose of being contacted regarding career opportunities in financial advisory, even if my number is listed on the Do Not Call Registry.
                  </span>
                </label>

                {error && (
                  <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FCA5A5', marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-submit">
                  {loading ? 'Submitting...' : 'Unlock My Transition Package ›'}
                </button>
                <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 14 }}>
                  Limited openings. No obligation. Private &amp; Confidential
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a0604', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px 48px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', maxWidth: 620, margin: '0 auto', lineHeight: 1.8 }}>
          Opportunities are offered through licensed appointed financial advisers under Manulife Singapore. This is how companies invest in the market.
        </p>
      </footer>
    </div>
  )
}
