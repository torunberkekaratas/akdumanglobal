import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const metrics = [
  { value: 12,  suffix: '+',  label: 'Yıl Sektör Deneyimi' },
  { value: 576, suffix: '+',  label: 'Kurumsal Müşteri' },
  { value: 3,   suffix: '',   label: 'Hizmet Sektörü' },
  { value: 24,  suffix: '/7', label: 'Ulaşılabilirlik' },
]

function Counter({ value, suffix, label, active }) {
  const [count, setCount] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!active) return
    const duration = 1200
    const start = performance.now()
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [active, value])

  return (
    <div className="whyus-item" style={{ flex: 1, padding: '32px 40px' }}>
      <div style={{
        fontSize: 'clamp(40px, 4.5vw, 58px)',
        fontWeight: 300,
        color: 'var(--dark)',
        lineHeight: 1,
        letterSpacing: '-2px',
        marginBottom: 10,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: 11,
        color: 'var(--muted)',
        fontWeight: 500,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function WhyUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        background: '#fff',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="whyus-strip"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
        }}
      >
        {metrics.map((m, i) => (
          <div key={m.label} style={{ display: 'flex', flex: 1 }}>
            {i > 0 && (
              <div style={{ width: 1, background: 'var(--border)', flexShrink: 0 }} />
            )}
            <Counter {...m} active={isInView} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .whyus-strip {
            flex-wrap: wrap !important;
          }
          .whyus-item {
            flex: 0 0 50% !important;
            padding: 24px 28px !important;
          }
        }
      `}</style>
    </section>
  )
}
