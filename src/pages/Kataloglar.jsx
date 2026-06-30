import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  IconArrowLeft,
  IconFileTypePdf,
  IconDownload,
  IconInbox,
  IconAnchor,
  IconApple,
  IconSparkles,
  IconChevronRight,
  IconFiles,
} from '@tabler/icons-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { kataloglar, sektorler } from '../data/kataloglar'

/* ─── Animations ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.1 } }),
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const cardV = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const sektorIcon = { sigorta: IconAnchor, gida: IconApple, temizlik: IconSparkles }

/* ─── Katalog Kartı ───────────────────────────────────────── */
function CatalogCard({ k, color }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.a
      variants={cardV}
      href={k.file}
      download
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        background: '#fff',
        border: `1px solid ${hov ? color : 'var(--border)'}`,
        borderRadius: 16, overflow: 'hidden', textDecoration: 'none',
        boxShadow: hov ? `0 14px 36px ${color}22` : '0 2px 10px rgba(0,0,0,0.05)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.25s, transform 0.25s, border-color 0.25s',
      }}
    >
      <div style={{ height: 3, background: hov ? color : 'var(--border)', transition: 'background 0.25s' }} />
      <div style={{ padding: '24px 24px 20px', display: 'flex', gap: 16, flex: 1 }}>
        <div style={{
          width: 50, height: 50, borderRadius: 13, flexShrink: 0,
          background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconFileTypePdf size={24} color={color} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--dark)', lineHeight: 1.32, marginBottom: 6, letterSpacing: '-0.2px' }}>
            {k.title}
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>{k.desc}</div>
        </div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px', borderTop: '1px solid var(--border)',
        background: hov ? `${color}08` : 'transparent', transition: 'background 0.25s',
      }}>
        <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '1.5px', color: 'var(--muted)', textTransform: 'uppercase' }}>
          PDF Kataloğu
        </span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color,
        }}>
          İndir
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: hov ? color : `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.25s',
          }}>
            <IconDownload size={14} color={hov ? '#fff' : color} />
          </div>
        </div>
      </div>
    </motion.a>
  )
}

/* ─── Ana Bileşen ─────────────────────────────────────────── */
export default function Kataloglar() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const focusSector = params.get('sector')

  useEffect(() => {
    if (focusSector) {
      setTimeout(() => document.getElementById(focusSector)?.scrollIntoView({ behavior: 'smooth' }), 350)
    }
  }, [focusSector])

  const genel = kataloglar.filter((k) => !k.sector)
  const totalCount = kataloglar.length

  const scrollTo = (key) => document.getElementById(key)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <Helmet>
        <title>Kataloglar — Akdumann</title>
        <meta name="description" content="Akdumann gemi & tersane sigortaları, gıda & bakliyat ve endüstriyel temizlik & sarf ürün kataloglarını PDF olarak indirin." />
      </Helmet>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ background: '#0a192f', padding: '168px 64px 0', position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1568667256549-094345857637?w=1600&q=70"
          alt=""
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(24,95,165,0.22) 0%, transparent 60%)' }} />

        <motion.button
          className="hero-back"
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          onClick={() => navigate('/')}
          style={{ position: 'absolute', top: 96, left: 48, background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, zIndex: 2, padding: 0, transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
        >
          <IconArrowLeft size={15} /> Ana Sayfaya Dön
        </motion.button>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" animate="show" variants={stagger} style={{ paddingBottom: 64 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24, background: 'rgba(24,95,165,0.25)', backdropFilter: 'blur(10px)', border: '1px solid rgba(74,158,255,0.45)', borderRadius: 100, padding: '6px 18px 6px 10px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4a9eff', boxShadow: '0 0 8px #4a9eff' }} />
              <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '2.5px', color: '#4a9eff', textTransform: 'uppercase' }}>Akdumann Kataloglar</span>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(34px,5vw,58px)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.06, marginBottom: 20, maxWidth: 720 }}>
              Tüm ürün ve hizmet<br />kataloglarımız
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 16.5, color: 'rgba(255,255,255,0.62)', lineHeight: 1.78, maxWidth: 540, marginBottom: 44 }}>
              Sigorta, gıda ve temizlik sektörlerine özel hazırlanmış ürün ve hizmet kataloglarımızı PDF olarak ücretsiz indirin.
            </motion.p>

            {/* sektör hızlı navigasyon */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {sektorler.map((s) => {
                const count = kataloglar.filter((k) => k.sector === s.key).length
                const Icon = sektorIcon[s.key]
                return (
                  <button
                    key={s.key}
                    onClick={() => scrollTo(s.key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12,
                      padding: '12px 18px', cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = s.color }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
                  >
                    <div style={{ width: 30, height: 30, borderRadius: 9, background: `${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} color={s.color === '#3B6D11' ? '#7fd957' : (s.color === '#854F0B' ? '#ffb15c' : '#4a9eff')} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{s.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.1)', borderRadius: 100, padding: '2px 8px' }}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* stat bar */}
        <div style={{ position: 'relative', zIndex: 1, background: 'rgba(24,95,165,0.9)', backdropFilter: 'blur(14px)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 64px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }} className="stats-bar">
            {[
              { val: totalCount, label: 'Toplam Katalog' },
              { val: sektorler.length, label: 'Sektör' },
              { val: '7/24', label: 'Anında İndirme' },
            ].map((s, i) => (
              <div key={s.label} style={{ textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none', padding: '0 16px' }}>
                <div style={{ fontSize: 'clamp(24px,3vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-1px' }}>{s.val}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)', marginTop: 5, letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEKTÖR GRUPLARI ──────────────────────────────── */}
      {sektorler.map((s, idx) => {
        const items = kataloglar.filter((k) => k.sector === s.key)
        const Icon = sektorIcon[s.key]
        return (
          <section
            key={s.key}
            id={s.key}
            style={{ background: idx % 2 === 0 ? 'var(--surface)' : '#fff', padding: '88px 64px', scrollMarginTop: 96 }}
          >
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger} style={{ marginBottom: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                <div>
                  <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: `${s.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={19} color={s.color} />
                    </div>
                    <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '3px', color: s.color, textTransform: 'uppercase' }}>{s.label}</span>
                  </motion.div>
                  <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(22px,2.4vw,30px)', fontWeight: 900, color: 'var(--dark)', letterSpacing: '-0.4px' }}>
                    {items.length > 0 ? `${items.length} Katalog Mevcut` : 'Kataloglar Hazırlanıyor'}
                  </motion.h2>
                </div>
                <motion.button
                  variants={fadeUp}
                  onClick={() => navigate(s.path)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: `1.5px solid ${s.color}`, color: s.color, borderRadius: 9, padding: '11px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s, color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = s.color }}
                >
                  Sektör Sayfasına Git <IconChevronRight size={14} />
                </motion.button>
              </motion.div>

              {items.length > 0 ? (
                <motion.div
                  initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18 }}
                  className="katalog-grid"
                >
                  {items.map((k) => <CatalogCard key={k.id} k={k} color={s.color} />)}
                </motion.div>
              ) : (
                <motion.div
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', border: '1.5px dashed var(--border)', borderRadius: 16, padding: '32px 28px', color: 'var(--muted)' }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <IconInbox size={22} color={s.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', marginBottom: 3 }}>Bu sektör için kataloglar hazırlanıyor</div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>Yakında bu alanda indirilebilir PDF kataloglar yer alacak.</div>
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        )
      })}

      {/* ── GENEL KATALOGLAR (henüz sektör atanmamış) ────── */}
      {genel.length > 0 && (
        <section style={{ background: '#fff', padding: '88px 64px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger} style={{ marginBottom: 44 }}>
              <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(122,122,122,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconFiles size={19} color="var(--muted)" />
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '3px', color: 'var(--muted)', textTransform: 'uppercase' }}>Genel Kataloglar</span>
              </motion.div>
              <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(22px,2.4vw,30px)', fontWeight: 900, color: 'var(--dark)', letterSpacing: '-0.4px' }}>
                Sektörü Henüz Belirlenmemiş
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18 }}
              className="katalog-grid"
            >
              {genel.map((k) => <CatalogCard key={k.id} k={k} color="#185FA5" />)}
            </motion.div>
          </div>
        </section>
      )}

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .stats-bar { grid-template-columns: repeat(3,1fr) !important; padding: 24px 28px !important; }
        }
        @media (max-width: 700px) {
          .katalog-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .hero-back { top: 100px !important; left: 24px !important; font-size: 12px !important; }
        }
      `}</style>
    </>
  )
}
