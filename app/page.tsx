'use client'

import { useState } from 'react'

const GOLD = '#D4AF37'
const GOLD_LIGHT = '#E5C07B'
const BG = 'url(\'/hero-bg.jpg\')'

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
        body: JSON.stringify({ ...form, pai: form.income }),
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

  return (
    <div style={{ fontFamily: "'Montserrat', 'Inter', -apple-system, sans-serif", minHeight: '100vh', background: '#100500', color: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: rgba(255,255,255,0.35); }
        select option { background: #1a0f05; color: #fff; }
        input:focus, select:focus { border-color: ${GOLD} !important; outline: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.9s ease forwards; }
        .btn-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 36px; border: 1.5px solid ${GOLD};
          border-radius: 50px; background: transparent; color: #fff;
          font-size: 15px; font-weight: 600; cursor: pointer;
          transition: all 0.3s ease; font-family: inherit; letter-spacing: 0.2px;
        }
        .btn-pill:hover { background: rgba(212,175,55,0.12); box-shadow: 0 0 24px rgba(212,175,55,0.3); }
        .btn-pill-filled {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 16px 40px; border: 1.5px solid ${GOLD};
          border-radius: 50px; background: rgba(212,175,55,0.12); color: #fff;
          font-size: 15px; font-weight: 700; cursor: pointer; width: 100%;
          transition: all 0.3s ease; font-family: inherit; letter-spacing: 0.3px;
        }
        .btn-pill-filled:hover { background: rgba(212,175,55,0.22); box-shadow: 0 0 28px rgba(212,175,55,0.35); }
        .pillar-card { flex: 1; border: 1px solid rgba(212,175,55,0.2); border-radius: 16px; padding: 28px 24px; background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); transition: border-color 0.3s; }
        .pillar-card:hover { border-color: rgba(212,175,55,0.5); }
        .audience-card { background: #fff; border-radius: 14px; overflow: hidden; flex: 1; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .audience-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.5); }
        .step-card { flex: 1; text-align: center; padding: 0 16px; position: relative; }
        .step-card:not(:last-child)::after { content: '›'; position: absolute; right: -8px; top: 20px; font-size: 22px; color: rgba(212,175,55,0.4); }
        @media (max-width: 768px) {
          .cards-row { flex-direction: column !important; }
          .pillars-row { flex-direction: column !important; }
          .steps-row { flex-direction: column !important; gap: 24px !important; }
          .step-card::after { display: none !important; }
          .timeline-row { flex-direction: column !important; gap: 12px !important; }
          .timeline-connector { display: none !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, rgba(10,5,0,0.22) 0%, rgba(10,5,0,0.18) 30%, rgba(15,7,0,0.58) 65%, rgba(18,6,0,0.96) 100%), ${BG} center top / cover no-repeat`,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '100px 0 64px',
      }}>
        <div className="fade-up" style={{ maxWidth: 680, padding: '0 36px 0 48px' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 20, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>
            SKYS Branch · Manulife Financial Advisers Singapore
          </p>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 66px)', fontWeight: 900, lineHeight: 1.08, marginBottom: 18, letterSpacing: '-1px' }}>
            Unlock Up to<br />
            <span style={{ color: GOLD_LIGHT }}>4X</span> Transition<br />
            Packages
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', marginBottom: 8, fontWeight: 400, lineHeight: 1.6 }}>
            Tailored to Your Current Income &amp; Experience.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 40, lineHeight: 1.6 }}>
            Built for consultants who know their worth — and want more.
          </p>
          <button className="btn-pill" onClick={scrollToForm}>
            Check If You Qualify &rsaquo;
          </button>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 16, letterSpacing: 0.3 }}>
            Limited openings · No obligation · Private &amp; Confidential
          </p>
        </div>
      </section>

      {/* ── 3 PILLARS ── */}
      <section style={{
        background: `linear-gradient(to bottom, rgba(18,6,0,0.97), rgba(22,8,0,0.95)), ${BG} center 45% / cover fixed`,
        padding: '72px 48px',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, textAlign: 'center' }}>What makes MAP 8 different</p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
            A framework designed for serious advisers.
          </h2>
          <div className="pillars-row" style={{ display: 'flex', gap: 20 }}>
            {[
              {
                icon: '🎯',
                tag: 'Competitive',
                title: 'Targets designed to be achievable',
                desc: 'MAP 8 sets realistic milestones based on your track record. Your goals are calibrated to what you have already proven you can do — not arbitrary benchmarks.',
              },
              {
                icon: '⚙️',
                tag: 'Simplified',
                title: 'Admin and catch-up handled automatically',
                desc: 'Excess production in any year covers shortfalls from prior years. No appeals. No lost years. The system works for you — not against you.',
              },
              {
                icon: '📈',
                tag: 'Pay for Performance',
                title: 'Your track record determines your reward',
                desc: 'Whether or not you have production certificates, you qualify. Both paths offer the same framework. No disadvantage for advisers without MDRT certificates.',
              },
            ].map(({ icon, tag, title, desc }) => (
              <div key={tag} className="pillar-card">
                <span style={{ fontSize: 28, marginBottom: 16, display: 'block' }}>{icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>{tag}</span>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 10, lineHeight: 1.35 }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YEAR 7 HIGHLIGHT ── */}
      <section style={{
        background: `linear-gradient(to bottom, rgba(22,8,0,0.95), rgba(20,7,0,0.96)), ${BG} center 55% / cover fixed`,
        padding: '72px 48px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${GOLD}20`, border: `1px solid ${GOLD}40`, borderRadius: 50, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase' }}>New in MAP 8</span>
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 900, color: '#fff', marginBottom: 18, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
            The Year 7 Bonus Extension.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            Outperform your targets and automatically unlock an additional year of production bonus. No extra obligations. No additional commitment. Pure reward for excellence — built into the structure.
          </p>

          {/* 6-year timeline */}
          <div style={{ marginTop: 48 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 20, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Your Journey</p>
            <div className="timeline-row" style={{ display: 'flex', alignItems: 'center', gap: 0, justifyContent: 'center' }}>
              {[
                { yr: 'Year 1', label: 'Onboarding &\nProduction begins' },
                { yr: 'Year 2–5', label: 'Validation period\n& milestone checks' },
                { yr: 'Year 6', label: 'Full validation\ncomplete' },
                { yr: 'Year 7', label: 'Bonus extension\n(outperformers)', gold: true },
              ].map(({ yr, label, gold }, i) => (
                <div key={yr} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: gold ? GOLD : 'rgba(255,255,255,0.08)',
                      border: `2px solid ${gold ? GOLD : 'rgba(255,255,255,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 10px', fontSize: 11, fontWeight: 800,
                      color: gold ? '#000' : '#fff',
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: gold ? GOLD_LIGHT : '#fff', marginBottom: 4 }}>{yr}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{label}</p>
                  </div>
                  {i < 3 && (
                    <div className="timeline-connector" style={{ flex: 0.3, height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 30 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AUDIENCE CARDS ── */}
      <section style={{
        background: `linear-gradient(to bottom, rgba(20,7,0,0.96), rgba(22,8,0,0.95)), ${BG} center 60% / cover fixed`,
        padding: '72px 48px',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 40, letterSpacing: 0.3 }}>
            Who is MAP 8 for? &rsaquo;
          </h2>
          <div className="cards-row" style={{ display: 'flex', gap: 20, marginBottom: 48 }}>
            {[
              {
                img: '/card-midcareer.jpg',
                badge: 'Career Switcher',
                title: 'Mid-Career Professionals',
                desc: 'Lawyers, bankers, doctors exploring FA as a strategic second career. Your professional network and credibility are your greatest assets.',
              },
              {
                img: '/card-experienced.jpg',
                badge: 'Existing FA',
                title: 'Experienced Consultants',
                desc: 'Already proven in financial advisory and looking for a stronger platform, better support, and a structure that rewards what you\'ve built.',
              },
              {
                img: '/card-fresh.jpg',
                badge: 'New Entrant',
                title: 'Ambitious Fresh Starters',
                desc: 'Strong networks, a drive to build, and the right mindset. The platform is ready — we just need the right people to grow with.',
              },
            ].map(({ img, badge, title, desc }) => (
              <div key={title} className="audience-card" onClick={scrollToForm}>
                <div style={{
                  width: '100%', height: 190,
                  background: `linear-gradient(135deg, #3a2010, #6a4020), url('${img}') center/cover no-repeat`,
                  position: 'relative',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.25))' }} />
                  <span style={{ position: 'absolute', top: 12, left: 14, fontSize: 10, fontWeight: 700, background: `${GOLD}CC`, color: '#000', padding: '3px 10px', borderRadius: 50, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{badge}</span>
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 7 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn-pill" onClick={scrollToForm}>
              Find Out If You Qualify &rsaquo;
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        background: `linear-gradient(to bottom, rgba(22,8,0,0.95), rgba(20,7,0,0.97)), ${BG} center 70% / cover fixed`,
        padding: '72px 48px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Simple process</p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, color: '#fff', marginBottom: 56, letterSpacing: '-0.3px' }}>
            How it works
          </h2>
          <div className="steps-row" style={{ display: 'flex', gap: 16, justifyContent: 'center', position: 'relative' }}>
            {[
              { n: '01', title: 'Submit your background', desc: 'Share your income range, experience, and current role. Takes 2 minutes. Completely confidential.' },
              { n: '02', title: 'Director reviews your profile', desc: 'Samuel Seah personally reviews every application and prepares a tailored proposal based on your history.' },
              { n: '03', title: 'Private meeting', desc: 'We walk you through the full structure in a 1-on-1 conversation. No pressure, no audience, no obligation.' },
              { n: '04', title: 'You decide', desc: 'Take your time. Ask questions. We\'re building a team, not closing a sale.' },
            ].map(({ n, title, desc }, i) => (
              <div key={n} className="step-card" style={{ flex: 1, textAlign: 'center', padding: '0 12px', position: 'relative' }}>
                {i < 3 && (
                  <div className="timeline-connector" style={{ position: 'absolute', right: -8, top: 20, fontSize: 22, color: 'rgba(212,175,55,0.35)', fontWeight: 300 }}>›</div>
                )}
                <div style={{ width: 44, height: 44, borderRadius: '50%', border: `1.5px solid ${GOLD}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 13, fontWeight: 800, color: GOLD }}>
                  {n}
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.4 }}>{title}</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 52 }}>
            <button className="btn-pill" onClick={scrollToForm}>
              Start the Conversation &rsaquo;
            </button>
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="form-section" style={{
        background: `linear-gradient(to bottom, rgba(20,7,0,0.97), rgba(16,5,0,0.99)), ${BG} center 80% / cover fixed`,
        padding: '72px 48px 88px',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>Check Eligibility</p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, color: '#fff', marginBottom: 10, letterSpacing: '-0.5px' }}>
            Check Your <span style={{ color: GOLD_LIGHT }}>Eligibility</span>
          </h2>
          <p style={{ textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 40, lineHeight: 1.7 }}>
            Submit your details. Our director prepares a personalised proposal within 24 hours.
          </p>

          <div style={{ border: `1px solid rgba(212,175,55,0.3)`, borderRadius: 20, padding: '40px 38px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)' }}>
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
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 6, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Full Name</label>
                  <input type="text" placeholder="As per NRIC" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} required />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 6, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Mobile Number</label>
                  <div style={{ display: 'flex' }}>
                    <div style={{ ...inputStyle, width: 76, borderRadius: '8px 0 0 8px', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>+65</div>
                    <input type="tel" placeholder="8 digits" maxLength={8} value={form.mobile}
                      onChange={e => setForm(f => ({ ...f, mobile: e.target.value.replace(/\D/g, '') }))}
                      style={{ ...inputStyle, borderRadius: '0 8px 8px 0' }} required />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 6, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Email Address</label>
                  <input type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} required />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 6, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Current Role / Company</label>
                  <input type="text" placeholder="e.g. Financial Adviser at AIA, Banker at DBS" value={form.currentRole}
                    onChange={e => setForm(f => ({ ...f, currentRole: e.target.value }))} style={inputStyle} />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <select value={form.income} onChange={e => setForm(f => ({ ...f, income: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer', color: form.income ? '#fff' : 'rgba(255,255,255,0.35)' }} required>
                    <option value="">Past 3 Years Average Income</option>
                    {INCOME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>MDRT Qualifier in Past 3 Years?</label>
                  <div style={{ display: 'flex', gap: 28 }}>
                    {['Yes', 'No'].map(v => (
                      <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                        <input type="radio" name="mdrt" value={v.toLowerCase()} checked={form.mdrt === v.toLowerCase()}
                          onChange={() => setForm(f => ({ ...f, mdrt: v.toLowerCase() }))}
                          style={{ accentColor: GOLD, width: 16, height: 16 }} />
                        {v}
                      </label>
                    ))}
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
                  <input type="checkbox" checked={form.consent} onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                    style={{ marginTop: 3, accentColor: GOLD, width: 14, height: 14, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
                    By submitting, I consent to SKYS Branch Pte Ltd collecting, using and retaining my personal data to contact me regarding career opportunities and financial advisory services relating to products distributed by Manulife Financial Advisers Pte Ltd, even if my number is listed on the Do Not Call Registry.
                  </span>
                </label>

                {error && (
                  <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FCA5A5', marginBottom: 16 }}>{error}</div>
                )}

                <button type="submit" disabled={loading} className="btn-pill-filled">
                  {loading ? 'Submitting...' : 'Unlock My Transition Package ›'}
                </button>

                <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 14 }}>
                  Limited openings · No obligation · Private &amp; Confidential
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#080300', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '32px 48px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, background: '#C0392B', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: 'Georgia, serif' }}>S</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>SKYS Branch Pte Ltd · Representing Manulife Financial Advisers Pte Ltd</span>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', maxWidth: 640, margin: '0 auto', lineHeight: 1.8 }}>
          Opportunities are offered through licensed Financial Advisers representing Manulife Financial Advisers Pte Ltd, a MAS-licensed financial adviser.
          SKYS Branch Pte Ltd (UEN: 202204232K). All compensation structures are indicative, personalised, and subject to eligibility and Manulife guidelines.
        </p>
      </footer>

      <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.75)} }`}</style>
    </div>
  )
}
