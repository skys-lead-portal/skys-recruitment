'use client'

import { useState } from 'react'

const GOLD = '#D4AF37'
const GOLD_LIGHT = '#E5C07B'

export default function Home() {
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', income: '',
    mdrt: '', currentRole: '', consent: false,
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

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
        body: JSON.stringify({ ...form, pai: form.income, currentRole: form.currentRole }),
      })
      setSubmitted(true)
    } catch { setError('Network error. Please try again.') }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 8, fontSize: 14, color: '#fff',
    outline: 'none', fontFamily: 'inherit',
    boxSizing: 'border-box',
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

  return (
    <div style={{
      fontFamily: "'Montserrat', 'Inter', -apple-system, sans-serif",
      minHeight: '100vh',
      background: '#1a0a00',
      color: '#fff',
      overflowX: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, select::placeholder { color: rgba(255,255,255,0.4); }
        select option { background: #1a0f05; color: #fff; }
        input:focus, select:focus { border-color: ${GOLD} !important; outline: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .btn-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 36px; border: 1.5px solid ${GOLD};
          border-radius: 50px; background: transparent; color: #fff;
          font-size: 15px; font-weight: 600; cursor: pointer;
          transition: all 0.3s ease; font-family: inherit; letter-spacing: 0.2px;
        }
        .btn-pill:hover { background: rgba(212,175,55,0.12); box-shadow: 0 0 20px rgba(212,175,55,0.25); }
        .btn-pill-filled {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 16px 40px; border: 1.5px solid ${GOLD};
          border-radius: 50px; background: rgba(212,175,55,0.1); color: #fff;
          font-size: 15px; font-weight: 700; cursor: pointer; width: 100%;
          transition: all 0.3s ease; font-family: inherit; letter-spacing: 0.3px;
        }
        .btn-pill-filled:hover { background: rgba(212,175,55,0.2); box-shadow: 0 0 24px rgba(212,175,55,0.35); }
        .audience-card { background: #fff; border-radius: 14px; overflow: hidden; flex: 1; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .audience-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        @media (max-width: 768px) {
          .cards-row { flex-direction: column !important; }
          .hero-section { background-position: center right !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        className="hero-section"
        style={{
          minHeight: '100vh',
          background: `linear-gradient(to bottom, rgba(10,5,0,0.25) 0%, rgba(10,5,0,0.2) 30%, rgba(15,8,0,0.55) 65%, rgba(20,8,0,0.95) 100%), url('/hero-bg.jpg') center top / cover no-repeat`,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '100px 0 60px',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 680, padding: '0 32px 0 40px', animation: 'fadeUp 0.9s ease forwards' }}>
          {/* Eyebrow */}
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 18, letterSpacing: 0.3 }}>
            Built for consultants who know their worth — and want more
          </p>

          {/* Main headline */}
          <h1 style={{ fontSize: 'clamp(42px, 6vw, 68px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
            Unlock Up to<br />
            <span style={{ color: GOLD_LIGHT }}>4X</span> Transition<br />
            Packages
          </h1>

          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 8, fontWeight: 400 }}>
            Tailored to Your Current Income &amp; Experience.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 36, letterSpacing: 0.3 }}>
            SKYS Branch · Manulife Financial Advisers Singapore
          </p>

          <button className="btn-pill" onClick={scrollToForm}>
            Check If You Qualify for a 4X Transition &rsaquo;
          </button>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 14, letterSpacing: 0.3 }}>
            Limited openings. No obligation. Private &amp; Confidential
          </p>
        </div>
      </section>

      {/* ── AUDIENCE CARDS ── */}
      <section style={{
        background: `linear-gradient(to bottom, rgba(20,8,0,0.88), rgba(30,12,0,0.92)), url('/hero-bg.jpg') center 60% / cover fixed`,
        padding: '64px 40px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 36, letterSpacing: 0.3 }}>
            Understand More With Our Leaders &rsaquo;
          </h2>

          <div className="cards-row" style={{ display: 'flex', gap: 20, marginBottom: 44 }}>
            {[
              {
                img: '/card-midcareer.jpg',
                title: 'Mid-Career Switchers',
                desc: 'Make a strategic career upgrade',
              },
              {
                img: '/card-experienced.jpg',
                title: 'Experienced Consultants',
                desc: 'Scale your impact & earnings',
              },
              {
                img: '/card-fresh.jpg',
                title: 'Students & Fresh Graduates',
                desc: 'Launch a rewarding career with us',
              },
            ].map(({ img, title, desc }) => (
              <div key={title} className="audience-card" onClick={scrollToForm}>
                {/* Photo placeholder — swap img src when images arrive */}
                <div style={{
                  width: '100%', height: 180,
                  background: `linear-gradient(135deg, #3a2010, #5a3015), url('${img}') center/cover no-repeat`,
                  position: 'relative',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.3))' }} />
                </div>
                <div style={{ padding: '16px 18px 20px' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 5 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn-pill" onClick={scrollToForm}>
              Schedule a Career Conversation &rsaquo;
            </button>
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section
        id="form-section"
        style={{
          background: `linear-gradient(to bottom, rgba(25,10,0,0.93), rgba(18,6,0,0.97)), url('/hero-bg.jpg') center 70% / cover fixed`,
          padding: '64px 40px 80px',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 32, letterSpacing: 0.2 }}>
            Check Your <em style={{ fontStyle: 'normal', color: GOLD_LIGHT }}>Eligibility</em>
          </h2>

          <div style={{
            border: `1px solid rgba(212,175,55,0.35)`,
            borderRadius: 18,
            padding: '40px 36px',
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(10px)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Application Received</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                  Our director will personally review your details and reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6, letterSpacing: 0.4 }}>Full Name</label>
                  <input type="text" placeholder="As per NRIC" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} required />
                </div>

                {/* Mobile */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 0 }}>
                    <div style={{ ...inputStyle, width: 80, borderRadius: '8px 0 0 8px', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>+65 ▾</span>
                    </div>
                    <input type="tel" placeholder="Mobile" maxLength={8}
                      value={form.mobile}
                      onChange={e => setForm(f => ({ ...f, mobile: e.target.value.replace(/\D/g, '') }))}
                      style={{ ...inputStyle, borderRadius: '0 8px 8px 0' }} required />
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6, letterSpacing: 0.4 }}>Email Address</label>
                  <input type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} required />
                </div>

                {/* Income */}
                <div style={{ marginBottom: 16 }}>
                  <select value={form.income}
                    onChange={e => setForm(f => ({ ...f, income: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer', color: form.income ? '#fff' : 'rgba(255,255,255,0.4)' }} required>
                    <option value="">Past 3 Years Average Income</option>
                    {INCOME_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* MDRT */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 10, letterSpacing: 0.4 }}>
                    MDRT Qualifier in Past 3 Years?
                  </label>
                  <div style={{ display: 'flex', gap: 28 }}>
                    {['Yes', 'No'].map(v => (
                      <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                        <input type="radio" name="mdrt" value={v.toLowerCase()}
                          checked={form.mdrt === v.toLowerCase()}
                          onChange={() => setForm(f => ({ ...f, mdrt: v.toLowerCase() }))}
                          style={{ accentColor: GOLD, width: 16, height: 16 }} />
                        {v}
                      </label>
                    ))}
                  </div>
                </div>

                {/* PDPA */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
                  <input type="checkbox" checked={form.consent}
                    onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                    style={{ marginTop: 3, accentColor: GOLD, width: 14, height: 14, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
                    By submitting, I consent to SKYS Branch Pte Ltd collecting, using and retaining my personal data to contact me regarding career opportunities and financial advisory services relating to products distributed by Manulife Financial Advisers Pte Ltd, even if my number is listed on the DNCR.
                  </span>
                </label>

                {error && (
                  <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FCA5A5', marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-pill-filled">
                  {loading ? 'Submitting...' : 'Unlock My Transition Package ›'}
                </button>

                <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 14 }}>
                  Limited openings. No obligation. Private &amp; Confidential
                </p>
              </form>
            )}
          </div>

          <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 24, lineHeight: 1.7, maxWidth: 560, margin: '24px auto 0' }}>
            Opportunities are offered through licensed appointed Manulife Financial Advisers Singapore.
            This is the company&apos;s intrinsic in the market. SKYS Branch Pte Ltd (UEN: 202204232K).
          </p>
        </div>
      </section>
    </div>
  )
}
