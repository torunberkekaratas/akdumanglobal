import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const metrics = [
  { value: 12, suffix: '+', label: 'Yıl Sektör Deneyimi' },
  { value: 576, suffix: '+', label: 'Kurumsal Müşteri' },
  { value: 3, suffix: '', label: 'Hizmet Sektörü' },
  { value: 24, suffix: '/7', label: 'Ulaşılabilirlik' },
]

function Counter({ value, suffix, label, active }) {
  const [count, setCount] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!active) return
    const duration = 1400
    const start = performance.now()
    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [active, value])

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '0 24px',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(36px, 4vw, 56px)',
          fontWeight: 800,
          color: 'var(--dark)',
          lineHeight: 1,
          marginBottom: 8,
          letterSpacing: '-1px',
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontSize: 13,
          color: 'var(--muted)',
          fontWeight: 500,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  )
}

export default function WhyUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="whyus-section"
      style={{
        background: '#fff',
        borderBottom: '1px solid var(--border)',
        padding: '48px 40px',
      }}
    >
      <div
        className="whyus-grid"
        style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
        }}
      >
        {metrics.map((m) => (
          <Counter key={m.label} {...m} active={isInView} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .whyus-section {
            padding: 32px 24px !important;
          }
          .whyus-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 28px 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
