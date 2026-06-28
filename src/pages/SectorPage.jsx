import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  IconArrowLeft,
  IconShip,
  IconFileInvoice,
  IconPackage,
  IconPhone,
  IconBuildingWarehouse,
  IconTruck,
  IconDroplet,
  IconTools,
} from '@tabler/icons-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const iconMap = {
  IconShip,
  IconFileInvoice,
  IconPackage,
  IconPhone,
  IconBuildingWarehouse,
  IconTruck,
  IconDroplet,
  IconTools,
}

const detailIcons = [IconShip, IconFileInvoice, IconBuildingWarehouse, IconTruck]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
  }),
}

export default function SectorPage({ sector }) {
  const navigate = useNavigate()
  const [imgSrc, setImgSrc] = useState(sector.image)

  const handleCtaClick = () => {
    navigate('/')
    setTimeout(() => {
      document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })
    }, 400)
  }

  return (
    <>
      <Helmet>
        <title>{sector.title} — Akdumann</title>
        <meta name="description" content={sector.desc} />
        <html lang="tr" />
      </Helmet>

      <Navbar />

      {/* 1. Hero Banner */}
      <section
        style={{
          position: 'relative',
          minHeight: 480,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={imgSrc}
          onError={() => setImgSrc(sector.imageFallback)}
          alt={sector.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5,7,12,0.65)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 800,
            margin: '0 auto',
            padding: '120px 40px 64px',
            width: '100%',
          }}
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '3px',
                color: sector.accentBar,
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              {sector.num} · {sector.subtitle}
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              style={{
                fontSize: 'clamp(30px, 5vw, 52px)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.15,
                marginBottom: 20,
                letterSpacing: '-0.5px',
              }}
            >
              {sector.title}
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.7,
                maxWidth: 520,
                marginBottom: 40,
              }}
            >
              {sector.desc}
            </motion.p>

            <motion.button
              custom={3}
              variants={fadeUp}
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.65)',
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'color 0.2s',
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              <IconArrowLeft size={16} />
              Ana Sayfaya Dön
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 2. Hizmet Detayları */}
      <section
        style={{
          background: 'var(--surface)',
          padding: '80px 40px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '3px',
              color: sector.accent,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Ne Sunuyoruz
          </p>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--dark)',
              marginBottom: 48,
              letterSpacing: '-0.4px',
            }}
          >
            Hizmetlerimiz
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 20,
            }}
            className="detail-grid"
          >
            {sector.details.map((d, i) => {
              const Icon = detailIcons[i % detailIcons.length]
              return (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  style={{
                    background: '#fff',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    padding: '28px 24px',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: `${sector.accent}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <Icon size={22} color={sector.accent} />
                  </div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: 'var(--dark)',
                      marginBottom: 8,
                    }}
                  >
                    {d.label}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{d.val}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Nasıl Çalışır */}
      <section style={{ background: '#fff', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '3px',
              color: sector.accent,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Adımlar
          </p>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--dark)',
              marginBottom: 56,
              letterSpacing: '-0.4px',
            }}
          >
            Süreç
          </h2>

          <div
            style={{
              display: 'flex',
              gap: 0,
              position: 'relative',
              alignItems: 'flex-start',
            }}
            className="steps-row"
          >
            {sector.steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                style={{
                  flex: 1,
                  padding: '0 32px',
                  borderLeft: i !== 0 ? `1px solid ${sector.accent}30` : 'none',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 800,
                    color: sector.accent,
                    lineHeight: 1,
                    marginBottom: 16,
                    opacity: 0.9,
                    letterSpacing: '-2px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: 'var(--dark)',
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Banner */}
      <section
        style={{
          background: 'var(--dark)',
          padding: '80px 40px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: 560, margin: '0 auto' }}
        >
          <h2
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 16,
              letterSpacing: '-0.4px',
            }}
          >
            Hemen iletişime geçin
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            Uzman ekibimiz sizin için en uygun çözümü hazırlasın.
          </p>
          <button
            onClick={handleCtaClick}
            style={{
              background: sector.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '14px 36px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            İletişime Geç
          </button>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
          .steps-row {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .steps-row > div {
            border-left: none !important;
            padding: 0 !important;
            border-top: 1px solid ${sector.accent}30;
            padding-top: 32px !important;
          }
          .steps-row > div:first-child {
            border-top: none !important;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
