'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const DARK = '#0A1628'
const NAVY = '#0D1B2A'
const GOLD = '#C9A84C'
const RED = '#C0392B'
const LIGHT = '#F8F9FB'

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const steps = 60; const duration = 1800
    let current = 0
    const inc = target / steps
    const timer = setInterval(() => {
      current += inc
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])
  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

// ── Fade-up on scroll ─────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ── Word-by-word reveal ───────────────────────────────────────────────────────
function WordReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')
  return (
    <span ref={ref} className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.05, ease: 'easeOut' }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// ── Sticky scroll section ─────────────────────────────────────────────────────
function StickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setActiveIndex(Math.min(3, Math.floor(v * 4)))
    })
    return unsub
  }, [scrollYProgress])

  const cards = [
    {
      tag: 'Belonging',
      title: 'A team that actually shows up.',
      body: 'Joint fieldwork isn\'t a sales pitch here — it\'s how we operate. When a deal gets complex, you don\'t face it alone. Every consultant in SKYS has direct access to our director and senior producers.',
      color: '#1B4B82',
    },
    {
      tag: 'Recognition',
      title: 'Your track record finally works for you.',
      body: 'Manulife\'s MAP 8 was engineered around production history, not just willingness to move. What you\'ve built over the years becomes the foundation of your next chapter — not a footnote.',
      color: '#1B5E3B',
    },
    {
      tag: 'Growth',
      title: 'A structured path — not a vague promise.',
      body: 'Six years of validated milestones. Automatic catch-up so no productive year is ever lost. And a leadership pathway with clear criteria, not internal politics.',
      color: '#4A2D7A',
    },
    {
      tag: 'Legacy',
      title: 'Build a practice. Not a sales quota.',
      body: 'The advisers who thrive at SKYS aren\'t chasing targets. They\'re building something their clients — and their own families — will value for decades. That\'s the practice worth building.',
      color: '#7A2D1B',
    },
  ]

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
        {/* Left — sticky headline */}
        <div style={{ background: DARK, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 56px' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>What makes SKYS different</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 24, letterSpacing: '-0.5px' }}>
              A different kind of firm<br />is possible.
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 360 }}>
              Most firms promise support and deliver a desk. SKYS is structured around what advisers actually need to build a sustainable practice.
            </p>
            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 8, marginTop: 48 }}>
              {cards.map((_, i) => (
                <div key={i} style={{ width: i === activeIndex ? 24 : 8, height: 8, borderRadius: 4, background: i === activeIndex ? GOLD : 'rgba(255,255,255,0.2)', transition: 'all 0.4s ease' }} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — scrolling cards */}
        <div style={{ background: '#0F1F35', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 56px', position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ maxWidth: 440 }}
            >
              <div style={{ display: 'inline-block', background: `${cards[activeIndex].color}40`, border: `1px solid ${cards[activeIndex].color}60`, borderRadius: 6, padding: '4px 12px', fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
                {cards[activeIndex].tag}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 2.5vw, 34px)', fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 20, letterSpacing: '-0.3px' }}>
                {cards[activeIndex].title}
              </h3>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.85 }}>
                {cards[activeIndex].body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', currentRole: '', pai: '', consent: false })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToForm = () => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) { setError('Please enter your name.'); return }
    if (!form.mobile || form.mobile.length < 8) { setError('Please enter a valid mobile number.'); return }
    if (!form.email.trim()) { setError('Please enter your email.'); return }
    if (!form.pai) { setError('Please select your income range.'); return }
    if (!form.consent) { setError('Please agree to the privacy policy.'); return }
    setLoading(true)
    try {
      await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setSubmitted(true)
    } catch { setError('Network error. Please try again.') }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px', border: '1.5px solid #2A3A4A',
    borderRadius: '8px', fontSize: '14px', color: '#fff',
    background: 'rgba(255,255,255,0.05)', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit',
  }

  const painPoints = [
    "You're producing — but the recognition doesn't match the results.",
    "Management talks about support. When you need joint fieldwork, you're on your own.",
    "You've hit a ceiling. Not from lack of skill. From lack of infrastructure.",
    "You watch peers at other firms achieve what you know you're capable of.",
    "You're starting to wonder if your next chapter begins somewhere else.",
  ]

  const PAI_TIERS = [
    { value: 'below_60k', label: 'Below S$60,000' },
    { value: '60k_79k', label: 'S$60,000 – S$79,999' },
    { value: '80k_119k', label: 'S$80,000 – S$119,999' },
    { value: '120k_199k', label: 'S$120,000 – S$199,999' },
    { value: '200k_299k', label: 'S$200,000 – S$299,999' },
    { value: '300k_399k', label: 'S$300,000 – S$399,999' },
    { value: 'above_400k', label: 'Above S$400,000' },
  ]

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: DARK, color: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: ${GOLD}40; }
        input, select { color-scheme: dark; }
        input:focus, select:focus { border-color: ${GOLD} !important; outline: none; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .sticky-grid { grid-template-columns: 1fr !important; height: auto !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .pain-text { font-size: 18px !important; }
          .feature-grid { grid-template-columns: 1fr !important; }
          .form-two-col { grid-template-columns: 1fr !important; }
          .section-pad { padding: 60px 24px !important; }
          .nav-inner { padding: 0 24px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 68,
          background: navScrolled ? 'rgba(10,22,40,0.95)' : 'transparent',
          backdropFilter: navScrolled ? 'blur(12px)' : 'none',
          borderBottom: navScrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.4s ease',
          display: 'flex', alignItems: 'center',
        }}
      >
        <div className="nav-inner" style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 36, height: 36, background: RED, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: '#fff', fontFamily: 'Georgia, serif' }}>S</span>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: '0.01em' }}>SKYS Branch</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Representing Manulife FA Pte Ltd</div>
            </div>
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
            <div style={{ background: '#fff', borderRadius: 5, padding: '3px 10px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/manulife-logo.jpg" alt="Manulife" style={{ height: 20, width: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToForm}
            style={{ background: GOLD, color: DARK, border: 'none', borderRadius: 8, padding: '10px 22px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}
          >
            Private Consultation
          </motion.button>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: `radial-gradient(ellipse at 20% 50%, #1B3A5C22 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #C0392B15 0%, transparent 50%), ${DARK}` }}>
        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />

        <div className="section-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 56px 80px', width: '100%', position: 'relative', zIndex: 2 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${GOLD}15`, border: `1px solid ${GOLD}30`, borderRadius: 50, padding: '6px 16px', marginBottom: 32 }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Now Recruiting — Q2 2026</span>
              </motion.div>

              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(36px, 4.5vw, 62px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 28, letterSpacing: '-1px' }}>
                <WordReveal text="Some firms grow advisers." delay={0.3} />
                <br />
                <span style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                  <WordReveal text="Others just grow their headcount." delay={0.6} />
                </span>
                <br />
                <WordReveal text="You already know which one you're at." delay={0.9} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.4 }}
                style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 40, maxWidth: 500 }}
              >
                SKYS Branch is building its team for 2026. We don&apos;t take everyone. We take the right people — and we make it worth their while.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
              >
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: `0 8px 30px ${RED}50` }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToForm}
                  style={{ background: RED, color: '#fff', border: 'none', borderRadius: 10, padding: '17px 40px', fontSize: 16, fontWeight: 800, cursor: 'pointer', letterSpacing: '0.2px' }}
                >
                  Request Private Consultation →
                </motion.button>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Confidential · No obligation</span>
              </motion.div>
            </div>

            {/* Right — floating card */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '32px 28px', backdropFilter: 'blur(20px)' }}
            >
              <p style={{ fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>Why SKYS Branch</p>
              {[
                { icon: '🤝', t: 'Real joint fieldwork', d: 'Not a promise — how we work every day' },
                { icon: '📈', t: 'Performance-led framework', d: 'Manulife\'s most competitive structure to date' },
                { icon: '🎯', t: 'Clear leadership path', d: '6-year milestones, no internal politics' },
                { icon: '🔄', t: 'Automatic catch-up', d: 'No productive year is ever wasted' },
                { icon: '⚖️', t: 'MAS licensed & compliant', d: 'Full infrastructure — so you can focus on clients' },
                { icon: '🏦', t: 'Backed by Manulife', d: 'A century of trust behind every product' },
              ].map(({ icon, t, d }, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
                  style={{ display: 'flex', gap: 14, padding: '11px 0', borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{t}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{d}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: '#080F1A', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '40px 56px' }}>
        <div className="stats-grid" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {[
            { target: 47, suffix: '', label: 'Active Consultants' },
            { target: 8, suffix: '+', label: 'MDRT Qualifiers (2025)' },
            { target: 6, suffix: ' Years', label: 'Structured Validation' },
            { target: 94, suffix: '%', label: 'Retention After Year 2' },
          ].map(({ target, suffix, label }) => (
            <FadeUp key={label}><div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: GOLD, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 6 }}>
                <Counter target={target} suffix={suffix} />
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>{label}</div>
            </div></FadeUp>
          ))}
        </div>
      </section>

      {/* ── THE MIRROR (pain acknowledgment) ── */}
      <section className="section-pad" style={{ padding: '100px 56px', background: DARK }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>Sound familiar?</p>
            <h2 className="pain-text" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 52, letterSpacing: '-0.5px' }}>
              If any of this sounds like your current reality,<br />keep reading.
            </h2>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {painPoints.map((point, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: '22px 0', borderBottom: i < painPoints.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: `${RED}20`, border: `1px solid ${RED}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontSize: 12, color: RED, fontWeight: 700 }}>✓</span>
                  </span>
                  <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, fontWeight: 400 }}>{point}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.5}>
            <div style={{ marginTop: 52, padding: '28px 32px', background: `${GOLD}10`, border: `1px solid ${GOLD}25`, borderRadius: 12 }}>
              <p style={{ fontSize: 17, color: GOLD, lineHeight: 1.75, fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif" }}>
                &ldquo;You&apos;re not imagining it. The best advisers often outgrow their first firm. The question is whether they act on it in time.&rdquo;
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 14 }}>— Samuel Seah, Branch Director, SKYS Branch</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── STICKY SCROLL — What SKYS Is ── */}
      <StickyScroll />

      {/* ── MAP 8 — TEASER (no numbers) ── */}
      <section className="section-pad" style={{ padding: '100px 56px', background: '#060E1A' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>The Framework</p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: 18 }}>
                A package built around<br />your performance.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
                Manulife&apos;s MAP 8 is designed to reward track record — not just willingness to move. Every proposal is personalised. Every number is based on what you&apos;ve actually built.
              </p>
            </div>
          </FadeUp>

          <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 56 }}>
            {[
              { title: 'Performance-based', desc: 'Sign-on and production bonuses tied to your actual track record — not a generic table.' },
              { title: '6-year validation', desc: 'A structured multi-year framework with automatic catch-up. No year of hard work is ever wasted.' },
              { title: 'Year 7 upside', desc: 'Outperform your targets and unlock an additional year of production bonus — pure reward for excellence.' },
            ].map(({ title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.15}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '28px 24px', height: '100%' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: GOLD, marginBottom: 18 }} />
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div style={{ background: `linear-gradient(135deg, ${NAVY}, #0F2540)`, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Want to know your specific package?</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>Our director personally prepares every proposal based on your background.<br />Submit below and you&apos;ll hear back within 24 hours.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToForm}
                style={{ background: GOLD, color: DARK, border: 'none', borderRadius: 10, padding: '15px 32px', fontSize: 15, fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Request Private Proposal
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ── */}
      <section className="section-pad" style={{ padding: '100px 56px', background: DARK }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hero-grid">
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>Who we&apos;re looking for</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.5px' }}>
              We don&apos;t recruit<br />everyone.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, marginBottom: 36 }}>
              SKYS is a deliberate team. Every consultant here was chosen because we believed they had what it takes to build a practice worth being proud of. If you&apos;re reading this and it resonates, that&apos;s probably not a coincidence.
            </p>
            {[
              'Experienced financial advisers seeking a structured team, not just a desk',
              'High-income professionals — lawyers, bankers, doctors — exploring financial advisory seriously',
              'MDRT, COT, and TOT performers who want mentorship and a clear leadership path',
              'Individuals with strong professional networks and a client-first mindset',
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{item}</span>
                </div>
              </FadeUp>
            ))}
          </FadeUp>

          <FadeUp delay={0.2}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '40px 36px' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 24 }}>The SKYS Advantage</p>
              {[
                { Icon: '🏦', title: 'Backed by Manulife', desc: 'Asia\'s most trusted financial services brands, with a century of history behind every product you present.' },
                { Icon: '📊', title: 'Performance rewarded fairly', desc: 'A transparent, structured framework. What you build directly determines what you earn.' },
                { Icon: '👥', title: 'Real team culture', desc: 'Collaborative, not competitive. We grow together — and we mean it.' },
                { Icon: '🛡️', title: 'Full compliance infrastructure', desc: 'MAS licensing, practice support, and administrative infrastructure — handled. You focus on clients.' },
              ].map(({ Icon, title, desc }, i) => (
                <div key={title} style={{ display: 'flex', gap: 18, marginBottom: 26, paddingBottom: 26, borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{Icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 5 }}>{title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="apply" style={{ background: `linear-gradient(135deg, #060E1A 0%, #0D1B2A 100%)`, padding: '100px 56px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>Private Consultation</p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 16, lineHeight: 1.15 }}>
                Let&apos;s have<br />a conversation.
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto' }}>
                Share your background confidentially. Our director personally reviews every application and will reach out within 24 hours.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '44px 40px', backdropFilter: 'blur(20px)' }}>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${RED}, ${GOLD})`, borderRadius: '4px 4px 0 0', margin: '-44px -40px 36px' }} />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '32px 0' }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: '#fff', marginBottom: 12, fontWeight: 800 }}>Application Received</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
                    Thank you. Our director will personally review your application and reach out within 24 hours via WhatsApp or email.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 28 }}>Your Details</h3>

                  <div className="form-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Full Name</label>
                      <input type="text" placeholder="As per NRIC" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} required />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Mobile</label>
                      <div style={{ display: 'flex' }}>
                        <span style={{ ...inputStyle, width: 'auto', padding: '13px 12px', borderRight: 'none', borderRadius: '8px 0 0 8px', fontSize: 13, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>+65</span>
                        <input type="tel" placeholder="8 digits" maxLength={8} value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value.replace(/\D/g, '') }))} style={{ ...inputStyle, borderRadius: '0 8px 8px 0' }} required />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Email Address</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} required />
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Current Role / Company</label>
                    <input type="text" placeholder="e.g. Financial Adviser at AIA, Banker at DBS" value={form.currentRole} onChange={e => setForm(f => ({ ...f, currentRole: e.target.value }))} style={inputStyle} />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Annual Income Range</label>
                    <select value={form.pai} onChange={e => setForm(f => ({ ...f, pai: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }} required>
                      <option value="">Select your income range</option>
                      {PAI_TIERS.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 7 }}>Used solely to personalise your proposal. Kept strictly confidential.</p>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', marginBottom: 20 }}>
                    <input type="checkbox" checked={form.consent} onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))} style={{ marginTop: 3, width: 15, height: 15, flexShrink: 0, accentColor: GOLD }} />
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
                      By submitting this form, I consent to SKYS Branch Pte Ltd collecting, using and retaining my personal data to contact me regarding career opportunities and financial advisory services relating to products distributed by Manulife Financial Advisers Pte Ltd. I consent to being contacted via phone, SMS, WhatsApp, and email, even if my number is listed on the DNCR. I may withdraw consent at any time.
                    </span>
                  </label>

                  {error && (
                    <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FCA5A5', marginBottom: 18 }}>
                      {error}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    style={{ width: '100%', padding: '16px', background: loading ? 'rgba(255,255,255,0.1)' : `linear-gradient(135deg, ${RED}, #A93226)`, color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.2px', boxShadow: loading ? 'none' : `0 4px 24px ${RED}40` }}
                  >
                    {loading ? 'Submitting...' : 'Request Consultation'}
                  </motion.button>

                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 12, textAlign: 'center' }}>
                    All information treated with strict confidentiality · MAS Licensed Advisory
                  </p>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#040A12', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '36px 56px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, background: RED, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: 'Georgia, serif' }}>S</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>SKYS Branch Pte Ltd · Representing Manulife Financial Advisers Pte Ltd</span>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', maxWidth: 680, margin: '0 auto', lineHeight: 1.8 }}>
          This page is for recruitment purposes only. Compensation structures are indicative and subject to eligibility, Manulife guidelines, and the terms in the Letter of Offer. SKYS Branch Pte Ltd (UEN: 202204232K) is a branch representing Manulife Financial Advisers Pte Ltd, a MAS-licensed financial adviser.
        </p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.1)', marginTop: 10 }}>© 2026 SKYS Branch Pte Ltd. All Rights Reserved.</p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }
      `}</style>
    </div>
  )
}
