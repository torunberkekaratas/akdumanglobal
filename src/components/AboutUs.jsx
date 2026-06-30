import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="hakkimizda"
      ref={ref}
      className="about-section"
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '88px 40px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Üst başlık */}
        <motion.div
          custom={0}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--blue)',
              background: 'rgba(24,95,165,0.08)',
              padding: '6px 16px',
              borderRadius: 20,
              marginBottom: 20,
            }}
          >
            Biz Kimiz
          </span>

          <h2
            style={{
              fontSize: 'clamp(26px, 3.5vw, 42px)',
              fontWeight: 800,
              color: 'var(--dark)',
              margin: '0 0 20px',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
            }}
          >
            Akduman Global
          </h2>

          <p
            className="about-intro"
            style={{
              fontSize: 17,
              color: 'var(--muted)',
              maxWidth: 640,
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            12 yılı aşkın deneyimimizle denizcilik sigortası, gıda tedariki ve endüstriyel
            temizlik sektörlerinde Türkiye genelinde kurumsal müşterilere güvenilir çözümler
            sunuyoruz.
          </p>
        </motion.div>

        {/* Vizyon & Misyon kartları */}
        <div className="about-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>

          {/* Misyon */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="about-card"
            style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: '44px 40px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Dekoratif arka plan */}
            <div
              style={{
                position: 'absolute',
                top: -30,
                right: -30,
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'rgba(24,95,165,0.05)',
              }}
            />

            {/* İkon */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: 'rgba(24,95,165,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 28,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>

            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--blue)',
                marginBottom: 14,
              }}
            >
              Misyonumuz
            </div>

            <h3
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: 'var(--dark)',
                margin: '0 0 16px',
                lineHeight: 1.25,
              }}
            >
              Güvenilir Çözümler,<br />Sürdürülebilir Ortaklıklar
            </h3>

            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, margin: 0 }}>
              Denizcilik sigortası, gıda & bakliyat tedariki ve endüstriyel temizlik alanlarında;
              hızlı, şeffaf ve maliyet etkin çözümler sunarak müşterilerimizin iş süreçlerini
              güçlendirmek ve onlara rakipsiz bir servis deneyimi yaşatmak.
            </p>
          </motion.div>

          {/* Vizyon */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="about-card"
            style={{
              background: 'var(--dark)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              padding: '44px 40px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Dekoratif arka plan */}
            <div
              style={{
                position: 'absolute',
                top: -30,
                right: -30,
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)',
              }}
            />

            {/* İkon */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 28,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>

            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: 14,
              }}
            >
              Vizyonumuz
            </div>

            <h3
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: '#fff',
                margin: '0 0 16px',
                lineHeight: 1.25,
              }}
            >
              Türkiye'nin Lider<br />Tedarik Çözüm Ortağı
            </h3>

            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0 }}>
              Faaliyet gösterdiğimiz her sektörde Türkiye'nin en güvenilir ve tercih edilen
              kurumsal tedarik ortağı olmak; kalite standartlarımızı sürekli yükselterek
              uluslararası pazarlarda da Akduman Global'i tanınan bir marka haline getirmek.
            </p>
          </motion.div>
        </div>

        {/* Değerlerimiz — 3 ikon satırı */}
        <div className="about-values" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 28 }}>
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ),
              title: 'Güvenilirlik',
              desc: 'Her anlaşmada söz verdiğimizi yerine getiririz.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
              ),
              title: 'Şeffaflık',
              desc: 'Fiyatlarımız, süreçlerimiz ve iletişimimiz her zaman açık.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              ),
              title: 'Hız',
              desc: 'Taleplerinize 24 saat içinde geri dönüş garantisi.',
            },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              custom={3 + i}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '28px 28px',
                display: 'flex',
                gap: 18,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(24,95,165,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {v.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--dark)', marginBottom: 6 }}>{v.title}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{v.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-section {
            padding: 64px 24px !important;
          }
          .about-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .about-values {
            grid-template-columns: 1fr !important;
          }
          .about-intro {
            font-size: 15px !important;
          }
          .about-card {
            padding: 32px 28px !important;
          }
        }
      `}</style>
    </section>
  )
}
