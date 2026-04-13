'use client'

import { useState } from 'react'

const RED = '#C0392B'
const DARK = '#0D1B2A'
const GOLD = '#C9A84C'
const LIGHT_BG = '#F8F9FB'

export default function Home() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', currentRole: '', pai: '', consent: false })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const formRef = { current: null as HTMLDivElement | null }

  const scrollToForm = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) { setError('Please enter your name.'); return }
    if (!form.mobile || form.mobile.length < 8) { setError('Please enter a valid mobile number.'); return }
    if (!form.email.trim()) { setError('Please enter your email.'); return }
    if (!form.pai) { setError('Please select your current income range.'); return }
    if (!form.consent) { setError('Please agree to the privacy policy to continue.'); return }

    setLoading(true)
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', border: '1.5px solid #D1D5DB',
    borderRadius: '7px', fontSize: '14px', color: '#1a1a2e',
    background: '#fff', boxSizing: 'border-box' as const, outline: 'none',
    fontFamily: 'inherit',
  }
  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 700 as const,
    color: '#4A5568', marginBottom: '6px', letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
  }

  const PAI_TIERS = [
    { value: 'below_60k', label: 'Below S$60,000', package: '100% Package' },
    { value: '60k_79k', label: 'S$60,000 – S$79,999', package: '120% Package' },
    { value: '80k_119k', label: 'S$80,000 – S$119,999', package: '150% Package' },
    { value: '120k_199k', label: 'S$120,000 – S$199,999', package: '200% Package' },
    { value: '200k_299k', label: 'S$200,000 – S$299,999', package: '250% Package' },
    { value: '300k_399k', label: 'S$300,000 – S$399,999', package: '300% Package' },
    { value: 'above_400k', label: 'Above S$400,000', package: '400% Package' },
  ]

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: '#fff', color: '#1a1a2e', lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        input:focus, select:focus, textarea:focus { border-color: ${DARK} !important; box-shadow: 0 0 0 3px rgba(13,27,42,0.08) !important; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .tier-grid { grid-template-columns: 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .section-pad { padding: 56px 24px !important; }
          .hero-pad { padding: 64px 24px 48px !important; }
          .nav-pad { padding: 0 24px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav-pad" style={{ background: DARK, padding: '0 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: RED, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: '#fff', fontFamily: 'Georgia, serif' }}>S</span>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: '0.02em' }}>SKYS Branch</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Representing Manulife FA Pte Ltd</div>
          </div>
        </div>
        <button onClick={scrollToForm} style={{ background: GOLD, color: DARK, border: 'none', borderRadius: 7, padding: '10px 22px', fontSize: 13, fontWeight: 800, cursor: 'pointer', letterSpacing: '0.02em' }}>
          Apply Now
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(135deg, ${DARK} 0%, #1B3A5C 50%, #0D2438 100%)`, position: 'relative', overflow: 'hidden' }}>
        {/* Background pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(192,57,43,0.1) 0%, transparent 40%)' }} />

        <div className="hero-pad section-pad" style={{ maxWidth: 1140, margin: '0 auto', padding: '96px 56px 80px', position: 'relative', zIndex: 2 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 50, padding: '6px 16px', marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase' }}>MAP 8 — Now Open for Applications</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 24, letterSpacing: '-0.5px' }}>
                Earn Up To <span style={{ color: GOLD }}>400%</span> Of Your<br />Past Income.
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, marginBottom: 16, maxWidth: 520 }}>
                SKYS Branch is recruiting experienced financial planners under Manulife&apos;s most competitive package yet — MAP 8. Lower targets, bigger rewards, and a 6-year runway to build your practice.
              </p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
                Whether you&apos;re an existing FA looking to migrate or a high-income professional exploring a career in financial advisory — this is for you.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <button onClick={scrollToForm} style={{ background: RED, color: '#fff', border: 'none', borderRadius: 8, padding: '16px 40px', fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 20px rgba(192,57,43,0.4)', letterSpacing: '0.2px' }}>
                  Find Out My Package →
                </button>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Free consultation · No obligation</span>
              </div>
            </div>

            {/* Right — quick package preview */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '28px 24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Your Package Potential</div>
              {[
                { label: 'Below S$60k income', pkg: '100%', color: '#94A3B8' },
                { label: 'S$80k – S$119k income', pkg: '150%', color: '#60A5FA' },
                { label: 'S$120k – S$199k income', pkg: '200%', color: '#34D399' },
                { label: 'S$200k – S$299k income', pkg: '250%', color: '#F59E0B' },
                { label: 'S$300k – S$399k income', pkg: '300%', color: '#FB923C' },
                { label: 'Above S$400k income', pkg: '400%', color: GOLD },
              ].map(({ label, pkg, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color }}>{pkg}</span>
                </div>
              ))}
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 14, lineHeight: 1.6 }}>
                *Package % based on Past Annual Income (PAI). Subject to eligibility and Manulife guidelines.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 56px' }}>
        <div className="stats-grid" style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {[
            { num: '400%', label: 'Max Package', sub: 'For TOT-level performers' },
            { num: '6 Yrs', label: 'Validation Period', sub: 'Aligned with payout period' },
            { num: '1–5×', label: 'APE Target Ratio', sub: 'Down from 1–8× in MAP 7' },
            { num: 'Year 7', label: 'Bonus Extension', sub: 'Auto-triggered on 100% target' },
          ].map(({ num, label, sub }) => (
            <div key={label} style={{ textAlign: 'center', padding: '20px 16px' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: GOLD, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 4 }}>{num}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY MAP 8 ── */}
      <section className="section-pad" style={{ padding: '80px 56px', maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Why MAP 8</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: DARK, letterSpacing: '-0.3px', marginBottom: 14 }}>
            The Most Competitive FA Package<br />Manulife Has Ever Offered
          </h2>
          <p style={{ fontSize: 15, color: '#6B7280', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            MAP 8 isn&apos;t just an upgrade — it&apos;s a complete rebuild. Lower targets, smarter catch-up, and a Year 7 bonus for outperformers.
          </p>
        </div>

        <div className="tier-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            {
              icon: '📉',
              title: 'Lower Targets',
              desc: 'Target payout ratio reduced from 1–8× APE to just 1–5× APE. NAC targets significantly lowered across all tiers — more achievable, less stressful.',
              tag: 'Competitive',
            },
            {
              icon: '🏆',
              title: 'Raise the Ceiling',
              desc: 'Max package raised from 300% to 400% for TOT-level performers. New granular tiers (7 vs 4 in MAP 7) mean more precise packages.',
              tag: 'Competitive',
            },
            {
              icon: '⚡',
              title: 'Year 7 Bonus Extension',
              desc: 'Hit 100% of your NAC target and automatically unlock a Year 7 production bonus. No obligations, pure upside for outperformance.',
              tag: 'New in MAP 8',
              highlight: true,
            },
            {
              icon: '🔄',
              title: 'Auto Catch-Up',
              desc: 'Excess production in any year automatically covers shortfalls from prior years. No appeals needed — the system handles it annually.',
              tag: 'Simplified',
            },
            {
              icon: '📋',
              title: 'With or Without Production Statement',
              desc: 'Both options now offer the same PAI-based package table. No more disadvantage for candidates without MDRT certificates.',
              tag: 'Simplified',
            },
            {
              icon: '💰',
              title: 'PPM Now Part of Production Bonus',
              desc: 'PPM (Protection Product Mix) is assessed yearly and paid as part of production bonus. Sign-on clawback no longer affected by PPM.',
              tag: 'Pay for Performance',
            },
          ].map(({ icon, title, desc, tag, highlight }) => (
            <div key={title} style={{ background: highlight ? DARK : LIGHT_BG, border: `1px solid ${highlight ? 'rgba(201,168,76,0.3)' : '#E8EDF5'}`, borderRadius: 14, padding: '28px 24px', position: 'relative', overflow: 'hidden' }}>
              {highlight && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${RED}, ${GOLD})` }} />}
              <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
              <div style={{ display: 'inline-block', background: highlight ? 'rgba(201,168,76,0.15)' : 'rgba(192,57,43,0.08)', color: highlight ? GOLD : RED, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 50, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>{tag}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: highlight ? '#fff' : DARK, marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 13, color: highlight ? 'rgba(255,255,255,0.65)' : '#6B7280', lineHeight: 1.75, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PAYOUT TABLE ── */}
      <section style={{ background: LIGHT_BG, padding: '80px 56px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>MAP 8 Payout Structure</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 800, color: DARK, letterSpacing: '-0.3px' }}>
              Know Exactly What You&apos;ll Earn
            </h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 700 }}>
              <thead>
                <tr>
                  <th style={{ background: DARK, color: '#fff', padding: '14px 16px', textAlign: 'left', fontWeight: 700, borderRadius: '10px 0 0 0', fontSize: 12, letterSpacing: '0.03em' }}>Past Annual Income (PAI)</th>
                  <th style={{ background: DARK, color: '#fff', padding: '14px 16px', textAlign: 'center', fontWeight: 700, fontSize: 12 }}>Sign-On Bonus</th>
                  <th style={{ background: DARK, color: '#fff', padding: '14px 16px', textAlign: 'center', fontWeight: 700, fontSize: 12 }}>Production Bonus</th>
                  <th style={{ background: DARK, color: GOLD, padding: '14px 16px', textAlign: 'center', fontWeight: 800, fontSize: 13, borderRadius: '0 10px 0 0' }}>Total Package</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { pai: 'Below S$60,000', sb: '20%', pb: '80%', total: '100%', highlight: false },
                  { pai: 'S$60,000 – S$79,999', sb: '20%', pb: '100%', total: '120%', highlight: false },
                  { pai: 'S$80,000 – S$119,999', sb: '50%', pb: '100%', total: '150%', highlight: false },
                  { pai: 'S$120,000 – S$199,999', sb: '50%', pb: '150%', total: '200%', highlight: false },
                  { pai: 'S$200,000 – S$299,999', sb: '50%', pb: '200%', total: '250%', highlight: false },
                  { pai: 'S$300,000 – S$399,999', sb: '50%', pb: '250%', total: '300%', highlight: true },
                  { pai: 'Above S$400,000', sb: '50%', pb: '350%', total: '400%', highlight: true },
                ].map(({ pai, sb, pb, total, highlight }, i) => (
                  <tr key={pai} style={{ background: highlight ? '#FFF9EE' : i % 2 === 0 ? '#fff' : '#F8FAFD' }}>
                    <td style={{ padding: '13px 16px', borderBottom: '1px solid #E8EDF5', color: '#374151', fontWeight: 500 }}>{pai}</td>
                    <td style={{ padding: '13px 16px', borderBottom: '1px solid #E8EDF5', textAlign: 'center', color: '#374151' }}>{sb}</td>
                    <td style={{ padding: '13px 16px', borderBottom: '1px solid #E8EDF5', textAlign: 'center', color: '#374151' }}>{pb}</td>
                    <td style={{ padding: '13px 16px', borderBottom: '1px solid #E8EDF5', textAlign: 'center', fontWeight: 900, fontSize: 15, color: highlight ? GOLD : DARK }}>{total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 16, textAlign: 'center' }}>
            *Subject to eligibility criteria. COT required for 200%–250% packages. TOT required for 300%–400% packages. Manulife guidelines apply.
          </p>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ── */}
      <section className="section-pad" style={{ padding: '80px 56px', maxWidth: 1140, margin: '0 auto' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Who Should Apply</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 800, color: DARK, letterSpacing: '-0.3px', marginBottom: 24 }}>
              Is MAP 8<br />Right For You?
            </h2>
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.8, marginBottom: 28 }}>
              MAP 8 is designed for ambitious financial planners who want to build a serious practice with the right support and compensation structure.
            </p>
            {[
              'Existing FAs at other companies looking to migrate with a competitive package',
              'High-income professionals (lawyers, doctors, bankers) exploring FA as a career',
              'MDRTs, COTs, and TOTs looking to maximise earnings under a structured system',
              'Fresh entrants with strong networks and a drive to build a client base',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: RED, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ background: DARK, borderRadius: 16, padding: '36px 32px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>SKYS Branch Advantage</div>
            {[
              { icon: '🏢', title: 'Backed by Manulife', desc: 'One of Asia\'s largest insurance and financial services groups' },
              { icon: '📈', title: 'Structured Growth Path', desc: 'Clear milestones from FP to leadership with mentorship at every stage' },
              { icon: '🤝', title: 'Team Support', desc: 'Joint fieldwork, training, and a collaborative culture — not a solo grind' },
              { icon: '⚖️', title: 'MAS Licensed', desc: 'Full regulatory support and compliance infrastructure provided' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: 16, marginBottom: 22, paddingBottom: 22, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY FORM ── */}
      <section id="apply" style={{ background: `linear-gradient(135deg, ${DARK} 0%, #1B3A5C 100%)`, padding: '80px 56px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Apply Now</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: 14 }}>
              Find Out Your Package
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              Tell us about yourself and we&apos;ll reach out within 1 business day with your personalised MAP 8 package details.
            </p>
          </div>

          <div style={{ background: '#fff', borderRadius: 16, padding: '40px 36px', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${RED}, ${GOLD})`, borderRadius: '4px 4px 0 0', margin: '-40px -36px 28px' }} />

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F0FDF4', border: '2px solid #86EFAC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: DARK, marginBottom: 10, fontWeight: 800 }}>Application Received!</h3>
                <p style={{ fontSize: 14, color: '#4A5568', lineHeight: 1.7 }}>
                  Thank you for your interest in SKYS Branch. Our team will be in touch within 1 business day with your personalised MAP 8 package details.
                </p>
                <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 10 }}>Check your WhatsApp and email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 800, color: DARK, marginBottom: 24 }}>Your Details</h3>

                <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input type="text" placeholder="As per NRIC" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} required />
                  </div>
                  <div>
                    <label style={labelStyle}>Mobile</label>
                    <div style={{ display: 'flex' }}>
                      <span style={{ ...inputStyle, width: 'auto', padding: '12px 10px', background: '#F8FAFD', borderRight: 'none', borderRadius: '7px 0 0 7px', fontSize: 13, color: '#6B7280', flexShrink: 0, fontWeight: 600 }}>+65</span>
                      <input type="tel" placeholder="8 digits" maxLength={8} value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value.replace(/\D/g, '') }))} style={{ ...inputStyle, borderRadius: '0 7px 7px 0' }} required />
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} required />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Current Role / Industry</label>
                  <input type="text" placeholder="e.g. Financial Adviser at AIA, Banker at DBS" value={form.currentRole} onChange={e => setForm(f => ({ ...f, currentRole: e.target.value }))} style={inputStyle} />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Past Annual Income (PAI)</label>
                  <select value={form.pai} onChange={e => setForm(f => ({ ...f, pai: e.target.value }))} style={inputStyle} required>
                    <option value="">Select your income range</option>
                    {PAI_TIERS.map(t => (
                      <option key={t.value} value={t.value}>{t.label} → {t.package}</option>
                    ))}
                  </select>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 6 }}>Used to determine your MAP 8 package. Kept strictly confidential.</p>
                </div>

                {/* PDPA */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 16 }}>
                  <input type="checkbox" checked={form.consent} onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))} style={{ marginTop: 3, width: 15, height: 15, flexShrink: 0, accentColor: DARK }} />
                  <span style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>
                    By submitting this form, I consent to SKYS Branch Pte Ltd collecting, using, disclosing and retaining my personal data to contact me regarding career opportunities and financial advisory services relating to products distributed by Manulife Financial Advisers Pte Ltd. I consent to being contacted via phone, SMS, WhatsApp, and email, even if my number is listed on the Do Not Call Registry (DNCR). I understand I may withdraw this consent at any time.
                  </span>
                </label>

                {error && (
                  <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#DC2626', marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px', background: loading ? '#9CA3AF' : DARK, color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.2px', boxShadow: loading ? 'none' : '0 4px 16px rgba(13,27,42,0.3)' }}>
                  {loading ? 'Submitting...' : 'Submit My Application →'}
                </button>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 10, textAlign: 'center' }}>
                  Your information is kept strictly confidential · MAS licensed advisory
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 56px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, background: RED, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#fff', fontFamily: 'Georgia, serif' }}>S</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>SKYS Branch Pte Ltd · Representing Manulife Financial Advisers Pte Ltd</span>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
          This page is for recruitment purposes only. MAP 8 package details are indicative and subject to eligibility, Manulife guidelines, and terms in the Letter of Offer. SKYS Branch Pte Ltd (UEN: 202204232K) is a branch representing Manulife Financial Advisers Pte Ltd, a MAS-licensed financial adviser.
        </p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 10 }}>© 2026 SKYS Branch Pte Ltd. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
