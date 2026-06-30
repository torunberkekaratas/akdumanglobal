import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const facts = [
  { num: '12+', text: 'Yıldır Türk tersane ve armatörlerine hizmet veriyoruz.' },
  { num: '48s', text: 'İçinde sigorta poliçesi teklifi — bürokratik bekleme yok.' },
  { num: '3', text: 'Ayrı sektörde tek çatı altında kurumsal tedarik.' },
]

export default function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="hakkimizda"
      ref={ref}
      className="about-section"
      style={{
        background: '#fff',
        borderBottom: '1px solid var(--border)',
        padding: '96px 40px',
      }}
    >
      <div
        className="about-inner"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}
      >
        {/* Sol — büyük beyan */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 28,
            }}
          >
            Akduman Global Hakkında
          </div>

          <h2
            className="about-headline"
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 800,
              color: 'var(--dark)',
              lineHeight: 1.18,
              letterSpacing: '-0.5px',
              margin: '0 0 28px',
            }}
          >
            Gemi sahiplerinin ve tersane işletmecilerinin güvendiği adres.
          </h2>

          <p
            style={{
              fontSize: 16,
              color: 'var(--muted)',
              lineHeight: 1.8,
              margin: '0 0 20px',
              maxWidth: 440,
            }}
          >
            Türk denizcilik sektöründe sigorta süreçlerinin ne kadar yavaş ve karmaşık
            işlediğini bizzat gördük. Gemi ve tersane sahipleri poliçe için haftalar
            bekliyor, tedarikçi bulmak ayrı bir mesai gerektiriyordu.
          </p>

          <p
            style={{
              fontSize: 16,
              color: 'var(--muted)',
              lineHeight: 1.8,
              margin: 0,
              maxWidth: 440,
            }}
          >
            Akduman Global'i bu boşluğu kapatmak için kurduk: denizcilik sigortası,
            gıda tedariki ve endüstriyel sarf malzemesi — tek irtibat noktası, hızlı sonuç.
          </p>
        </motion.div>

        {/* Sağ — somut rakamlar */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.18, ease: 'easeOut' }}
          style={{ paddingTop: 52 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {facts.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
                style={{
                  display: 'flex',
                  gap: 28,
                  alignItems: 'flex-start',
                  padding: '28px 0',
                  borderBottom: i < facts.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(28px, 3vw, 38px)',
                    fontWeight: 800,
                    color: 'var(--blue)',
                    lineHeight: 1,
                    minWidth: 72,
                    letterSpacing: '-1px',
                    flexShrink: 0,
                  }}
                >
                  {f.num}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: 'var(--dark)',
                    lineHeight: 1.6,
                    paddingTop: 6,
                    fontWeight: 500,
                  }}
                >
                  {f.text}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-section {
            padding: 64px 24px !important;
          }
          .about-inner {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .about-inner > div:last-child {
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
