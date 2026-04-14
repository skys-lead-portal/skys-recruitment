'use client'

import { useState } from 'react'

const RED = '#C0392B'
const DARK = '#0D1B2A'
const GOLD = '#C9A84C'
const LIGHT_BG = '#F8F9FB'

function IconCheck({ color = 'white', size = 11 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M2 6L5 9L10 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconTrend() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
}
function IconStar() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function IconBolt() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
}
function IconRefresh() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
}
function IconDoc() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
}
function IconDollar() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
}
function IconBuilding() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
}
function IconGrowth() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
}
function IconPeople() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function IconShield() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}

export default function Home() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', currentRole: '', pai: '', consent: false })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

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

  const features = [
    { Icon: IconTrend, title: 'Lower Targets', desc: 'Target payout ratio reduced from 1–8× APE to just 1–5× APE. NAC targets significantly lowered across all tiers — more achievable, more realistic.', tag: 'Competitive' },
    { Icon: IconStar, title: 'Raise the Ceiling', desc: 'Maximum package raised from 300% to 400% for TOT-level performers. Seven granular PAI tiers replace the old four — more precise, more rewarding.', tag: 'Competitive' },
    { Icon: IconBolt, title: 'Year 7 Bonus Extension', desc: 'Automatically triggered upon reaching 100% of your NAC target. No additional obligations — pure upside for outperformance in a seventh year.', tag: 'New in MAP 8', highlight: true },
    { Icon: IconRefresh, title: 'Automatic Catch-Up', desc: 'Excess production in any year automatically covers shortfalls from prior years. No appeals required — the system reconciles annually.', tag: 'Simplified' },
    { Icon: IconDoc, title: 'Simplified Documentation', desc: 'Both With and Without Production Statement options now use the same PAI-based package table. No more disadvantage for candidates without MDRT certificates.', tag: 'Simplified' },
    { Icon: IconDollar, title: 'PPM Integrated into Bonus', desc: 'Protection Product Mix is assessed yearly and paid as part of the production bonus. Sign-on clawback is no longer affected by PPM performance.', tag: 'Pay for Performance' },
  ]

  const advantages = [
    { Icon: IconBuilding, title: 'Backed by Manulife', desc: 'One of Asia\'s largest insurance and financial services groups, with a century of trust behind every product.' },
    { Icon: IconGrowth, title: 'Structured Growth Path', desc: 'Clear milestones from Financial Planner to leadership, with mentorship and joint fieldwork at every stage.' },
    { Icon: IconPeople, title: 'Collaborative Culture', desc: 'A team-first environment with shared knowledge, training programmes, and a culture built on mutual success.' },
    { Icon: IconShield, title: 'MAS Licensed & Compliant', desc: 'Full regulatory support and compliance infrastructure — so you can focus on building your practice.' },
  ]

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: '#fff', color: '#1a1a2e', lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        input:focus, select:focus { border-color: ${DARK} !important; box-shadow: 0 0 0 3px rgba(13,27,42,0.08) !important; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .feature-grid { grid-template-columns: 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .section-pad { padding: 56px 24px !important; }
          .nav-pad { padding: 0 24px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav-pad" style={{ background: DARK, padding: '0 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* SKYS Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: RED, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 17, fontWeight: 900, color: '#fff', fontFamily: 'Georgia, serif' }}>S</span>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: '0.01em' }}>SKYS Branch</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Representing Manulife FA Pte Ltd</div>
            </div>
          </div>
          {/* Divider */}
          <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.12)' }} />
          {/* Manulife Logo */}
          <div style={{ background: '#fff', borderRadius: 6, padding: '4px 10px', display: 'flex', alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/manulife-logo.jpg" alt="Manulife" style={{ height: 22, width: 'auto', objectFit: 'contain' }} />
          </div>
        </div>
        <button onClick={scrollToForm} style={{ background: GOLD, color: DARK, border: 'none', borderRadius: 7, padding: '10px 24px', fontSize: 13, fontWeight: 800, cursor: 'pointer', letterSpacing: '0.03em' }}>
          Apply Now
        </button>
      </nav>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${DARK} 0%, #1B3A5C 50%, #0D2438 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(192,57,43,0.08) 0%, transparent 40%)' }} />
        <div className="section-pad" style={{ maxWidth: 1140, margin: '0 auto', padding: '96px 56px 80px', position: 'relative', zIndex: 2 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 50, padding: '6px 16px', marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Now Recruiting — SKYS Branch × Manulife</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 24, letterSpacing: '-0.5px' }}>
                Build Your Practice With<br />Singapore&apos;s <span style={{ color: GOLD }}>Leading</span> Financial<br />Advisory Team.
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 16, maxWidth: 520 }}>
                SKYS Branch, representing Manulife Financial Advisers, is growing. We are looking for driven financial planners who want a structured path, strong team support, and a compensation framework that rewards performance.
              </p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 40, maxWidth: 480 }}>
                Submit your details confidentially. Our director will personally prepare a proposal tailored to your background and experience.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <button onClick={scrollToForm} style={{ background: RED, color: '#fff', border: 'none', borderRadius: 8, padding: '16px 40px', fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 20px rgba(192,57,43,0.35)', letterSpacing: '0.2px' }}>
                  Request a Private Consultation
                </button>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Confidential · No obligation</span>
              </div>
            </div>

            {/* Why SKYS card */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 16, padding: '28px 24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Why SKYS Branch</div>
              {[
                { icon: '🏢', title: 'Backed by Manulife', desc: 'One of Asia\'s most trusted financial services groups' },
                { icon: '📈', title: 'Performance-Based Compensation', desc: 'A transparent framework that rewards your results' },
                { icon: '🤝', title: 'Mentorship & Joint Fieldwork', desc: 'Real support — not just onboarding and goodbye' },
                { icon: '⚖️', title: 'MAS Licensed & Fully Compliant', desc: 'Infrastructure and compliance handled for you' },
                { icon: '🎯', title: 'Structured 6-Year Growth Path', desc: 'Clear milestones from consultant to leadership' },
                { icon: '🔄', title: 'Automatic Catch-Up Mechanism', desc: 'Your best years carry forward — no lost production' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.05)', padding: '36px 56px' }}>
        <div className="stats-grid" style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {[
            { num: '47', label: 'Active Consultants', sub: 'Across SKYS Branch teams' },
            { num: '6 Years', label: 'Validation Period', sub: 'Aligned with payout period' },
            { num: 'MAS', label: 'Licensed & Compliant', sub: 'Full regulatory support' },
            { num: 'Manulife', label: 'Product Platform', sub: 'Top-tier products & support' },
          ].map(({ num, label, sub }) => (
            <div key={label} style={{ textAlign: 'center', padding: '20px 12px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: GOLD, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 6 }}>{num}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY MAP 8 */}
      <section className="section-pad" style={{ padding: '88px 56px', maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Why MAP 8</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: DARK, letterSpacing: '-0.3px', marginBottom: 16 }}>
            The Most Competitive FA Package<br />Manulife Has Ever Offered
          </h2>
          <p style={{ fontSize: 15, color: '#6B7280', maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}>
            MAP 8 is a complete rebuild — lower targets, automated catch-up mechanisms, and a Year 7 bonus for those who outperform.
          </p>
        </div>

        <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {features.map(({ Icon, title, desc, tag, highlight }) => (
            <div key={title} style={{ background: highlight ? DARK : LIGHT_BG, border: `1px solid ${highlight ? 'rgba(201,168,76,0.25)' : '#E8EDF5'}`, borderRadius: 14, padding: '32px 26px', position: 'relative', overflow: 'hidden' }}>
              {highlight && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${RED}, ${GOLD})` }} />}
              <div style={{ marginBottom: 16 }}><Icon /></div>
              <div style={{ display: 'inline-block', background: highlight ? 'rgba(201,168,76,0.12)' : 'rgba(192,57,43,0.07)', color: highlight ? GOLD : RED, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 50, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>{tag}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: highlight ? '#fff' : DARK, marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 13, color: highlight ? 'rgba(255,255,255,0.6)' : '#6B7280', lineHeight: 1.8, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPENSATION — gated, no numbers shown */}
      <section style={{ background: LIGHT_BG, padding: '80px 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Compensation Framework</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 800, color: DARK, letterSpacing: '-0.3px', marginBottom: 20 }}>
            A Package Built Around Your Performance
          </h2>
          <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.8, maxWidth: 640, margin: '0 auto 40px' }}>
            Our compensation structure under Manulife&apos;s MAP 8 is designed to reward your track record — not just your willingness to move. Every proposal is personalised based on your background, production history, and career goals.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
            {[
              { title: 'Performance-Based', desc: 'Your compensation reflects your results — sign-on and production bonuses tied to your actual track record' },
              { title: '6-Year Validation', desc: 'A structured multi-year framework with automatic catch-up — so no year of hard work is ever wasted' },
              { title: 'Year 7 Upside', desc: 'Outperform your targets and unlock an additional year of production bonus — pure reward for excellence' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ background: '#fff', border: '1px solid #E8EDF5', borderRadius: 12, padding: '24px 20px', textAlign: 'left' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: GOLD, marginBottom: 14 }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: DARK, marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: DARK, borderRadius: 12, padding: '28px 32px', display: 'inline-flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Want to know your specific package?</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Submit your details below. Our director will prepare a personalised proposal for you.</div>
            </div>
            <button onClick={scrollToForm} style={{ background: GOLD, color: DARK, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 14, fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Request Private Proposal
            </button>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="section-pad" style={{ padding: '88px 56px', maxWidth: 1140, margin: '0 auto' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Who Should Apply</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 800, color: DARK, letterSpacing: '-0.3px', marginBottom: 20 }}>
              Is This<br />Right For You?
            </h2>
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.8, marginBottom: 32 }}>
              We are looking for individuals who are serious about building a sustainable financial advisory practice — with the right values, drive, and commitment to client outcomes.
            </p>
            {[
              'Experienced financial advisers seeking a structured team environment and long-term growth',
              'High-income professionals — lawyers, bankers, doctors — exploring financial advisory as a second career',
              'MDRT, COT, and TOT performers who want mentorship, infrastructure, and a clear leadership path',
              'Motivated individuals with strong professional networks and a passion for helping clients',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: RED, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <IconCheck />
                </span>
                <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.75 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ background: DARK, borderRadius: 16, padding: '40px 34px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>The SKYS Branch Advantage</div>
            {advantages.map(({ Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: 18, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ flexShrink: 0, marginTop: 2 }}><Icon /></span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 5 }}>{title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY FORM */}
      <section id="apply" style={{ background: `linear-gradient(135deg, ${DARK} 0%, #1B3A5C 100%)`, padding: '88px 56px' }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Private Consultation</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: 14 }}>
              Let&apos;s Have a Conversation
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              Share your background with us. Our director will personally reach out to understand your goals and explore if SKYS Branch is the right fit for your career.
            </p>
          </div>

          <div style={{ background: '#fff', borderRadius: 16, padding: '44px 40px', boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }}>
            <div style={{ height: 3, background: `linear-gradient(90deg, ${RED}, ${GOLD})`, borderRadius: '4px 4px 0 0', margin: '-44px -40px 32px' }} />

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F0FDF4', border: '2px solid #86EFAC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: DARK, marginBottom: 12, fontWeight: 800 }}>Application Received</h3>
                <p style={{ fontSize: 14, color: '#4A5568', lineHeight: 1.8 }}>
                  Thank you for your interest in SKYS Branch. Our team will be in touch within one business day with your personalised MAP 8 package details.
                </p>
                <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 10 }}>Please check your WhatsApp and email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 800, color: DARK, marginBottom: 26 }}>Your Details</h3>

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
                  <label style={labelStyle}>Current Role / Company</label>
                  <input type="text" placeholder="e.g. Financial Adviser at AIA, Banker at DBS" value={form.currentRole} onChange={e => setForm(f => ({ ...f, currentRole: e.target.value }))} style={inputStyle} />
                </div>

                <div style={{ marginBottom: 22 }}>
                  <label style={labelStyle}>Past Annual Income (PAI)</label>
                  <select value={form.pai} onChange={e => setForm(f => ({ ...f, pai: e.target.value }))} style={inputStyle} required>
                    <option value="">Select your income range</option>
                    {PAI_TIERS.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 6, lineHeight: 1.5 }}>Used solely to determine your MAP 8 package. Kept strictly confidential.</p>
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 18 }}>
                  <input type="checkbox" checked={form.consent} onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))} style={{ marginTop: 3, width: 15, height: 15, flexShrink: 0, accentColor: DARK }} />
                  <span style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.7 }}>
                    By submitting this form, I consent to SKYS Branch Pte Ltd collecting, using, disclosing and retaining my personal data to contact me regarding career opportunities and financial advisory services relating to products distributed by Manulife Financial Advisers Pte Ltd. I consent to being contacted via phone, SMS, WhatsApp, and email, even if my number is listed on the Do Not Call Registry (DNCR). I understand I may withdraw this consent at any time.
                  </span>
                </label>

                {error && (
                  <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#DC2626', marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px', background: loading ? '#9CA3AF' : DARK, color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.2px', boxShadow: loading ? 'none' : `0 4px 16px rgba(13,27,42,0.25)` }}>
                  {loading ? 'Submitting...' : 'Request Consultation'}
                </button>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 10, textAlign: 'center', lineHeight: 1.5 }}>
                  All information is treated with strict confidentiality · MAS Licensed Advisory
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.05)', padding: '36px 56px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 30, height: 30, background: RED, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#fff', fontFamily: 'Georgia, serif' }}>S</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>SKYS Branch Pte Ltd · Representing Manulife Financial Advisers Pte Ltd</span>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', maxWidth: 700, margin: '0 auto', lineHeight: 1.8 }}>
          This page is for recruitment purposes only. MAP 8 package details are indicative and subject to eligibility, Manulife guidelines, and the terms contained in the Letter of Offer. SKYS Branch Pte Ltd (UEN: 202204232K) is a branch representing Manulife Financial Advisers Pte Ltd, a MAS-licensed financial adviser.
        </p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', marginTop: 10 }}>© 2026 SKYS Branch Pte Ltd. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
