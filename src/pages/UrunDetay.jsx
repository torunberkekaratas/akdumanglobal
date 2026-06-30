import { useRef } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  IconArrowLeft, IconCheck, IconChevronRight, IconPhone,
  IconArrowDown, IconShieldCheck, IconTruck, IconPackage,
} from '@tabler/icons-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { urunler } from '../data/urunler'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 } }),
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const FEAT_ICONS = [IconShieldCheck, IconTruck, IconPackage]

export default function UrunDetay() {
  const { sector, slug } = useParams()
  const navigate = useNavigate()
  const heroRef = useRef(null)

  const list = urunler[sector] || []
  const product = list.find((p) => p.slug === slug)
  if (!product) return <Navigate to={`/${sector}`} replace />

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  const handleContact = () => {
    navigate('/')
    setTimeout(() => document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' }), 400)
  }

  return (
    <>
      <Helmet>
        <title>{product.label} — Akdumann</title>
        <meta name="description" content={product.detay} />
        <link rel="canonical" href={`https://akdumanglobal.com/urun/${sector}/${slug}`} />
      </Helmet>

      <Navbar />

      {/* ── 1. HERO (parallax) ───────────────────────────────── */}
      <section ref={heroRef} style={{ position: 'relative', height: '82vh', minHeight: 540, overflow: 'hidden' }}>
        <motion.img
          src={product.heroImage}
          alt={product.label}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '120%', objectFit: 'cover', y: heroY }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.9) 100%)' }} />

        {/* geri butonu */}
        <motion.button
          initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, ease: 'easeOut' }}
          onClick={() => navigate(product.sectorPath)}
          style={{ position: 'absolute', top: 96, left: 52, background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontSize: 12.5, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 7, zIndex: 2, padding: 0, letterSpacing: '0.2px', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
        >
          <IconArrowLeft size={14} /> {product.sectorLabel}
        </motion.button>

        {/* breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ position: 'absolute', top: 99, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 7, zIndex: 2 }}
        >
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{product.sectorLabel}</span>
          <IconChevronRight size={10} color="rgba(255,255,255,0.35)" />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>{product.label}</span>
        </motion.div>

        {/* başlık */}
        <motion.div
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.13 } } }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 64px 80px', maxWidth: 1240, margin: '0 auto' }}
        >
          <motion.div
            variants={fadeUp}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 22, background: `${product.color}28`, backdropFilter: 'blur(10px)', border: `1px solid ${product.accent}50`, borderRadius: 100, padding: '6px 18px 6px 10px' }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: product.accent, boxShadow: `0 0 8px ${product.accent}` }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '2.5px', color: product.accent, textTransform: 'uppercase' }}>
              {product.sectorLabel}
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            style={{ fontSize: 'clamp(34px, 5.2vw, 68px)', fontWeight: 900, color: '#fff', lineHeight: 1.03, letterSpacing: '-1.5px', marginBottom: 20, maxWidth: 780 }}
          >
            {product.label}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            style={{ fontSize: 16, color: 'rgba(255,255,255,0.62)', lineHeight: 1.78, maxWidth: 500 }}
          >
            {product.desc}
          </motion.p>
        </motion.div>

        {/* scroll göstergesi */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ position: 'absolute', bottom: 32, right: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2 }}
        >
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}>
            <IconArrowDown size={15} color="rgba(255,255,255,0.35)" />
          </motion.div>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '2.5px', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</span>
        </motion.div>
      </section>

      {/* ── 2. ASİMETRİK GALERİ ─────────────────────────────── */}
      <section style={{ background: 'var(--dark)', padding: 0 }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '56% 44%', gridTemplateRows: '310px 310px', gap: 4 }}
          className="gallery-asymmetric"
        >
          {/* büyük sol */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ gridRow: 'span 2', position: 'relative', overflow: 'hidden', cursor: 'default' }}
          >
            <img
              src={product.galeri[0]}
              alt={`${product.label} 1`}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
            <div style={{ position: 'absolute', bottom: 28, left: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, border: '1px solid rgba(255,255,255,0.28)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.65)', fontWeight: 700 }}>01</span>
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '1.5px' }}>{product.label}</span>
            </div>
          </motion.div>

          {/* sağ üst */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.58, delay: 0.12 }}
            style={{ position: 'relative', overflow: 'hidden', cursor: 'default' }}
          >
            <img
              src={product.galeri[1]}
              alt={`${product.label} 2`}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.07)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 24 }}>
              <div style={{ width: 26, height: 26, border: '1px solid rgba(255,255,255,0.28)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.65)', fontWeight: 700 }}>02</span>
              </div>
            </div>
          </motion.div>

          {/* sağ alt — stat kartı */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.58, delay: 0.22 }}
            style={{ position: 'relative', overflow: 'hidden', background: product.color }}
          >
            <img
              src={product.galeri[2]}
              alt={`${product.label} 3`}
              loading="lazy"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }}
            />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1, gap: 12 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.45, type: 'spring', bounce: 0.32 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ fontSize: 80, fontWeight: 900, color: '#fff', lineHeight: 0.88, letterSpacing: '-4px' }}>
                  {product.urunler.length}<span style={{ fontSize: 40, letterSpacing: '-1px' }}>+</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: '3.5px', textTransform: 'uppercase', marginTop: 14 }}>
                  Ürün Çeşidi
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. İSTATİSTİK BANDI ──────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        style={{ background: 'var(--dark)', borderTop: `1px solid ${product.color}28`, borderBottom: `1px solid ${product.color}28`, padding: '56px 48px' }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="stats-grid">
          {[
            { val: `${product.urunler.length}+`, label: 'Ürün Çeşidi' },
            { val: '20+', label: 'Yıl Deneyim' },
            { val: '500+', label: 'Aktif Müşteri' },
          ].map(({ val, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.13 }}
              style={{
                textAlign: 'center', padding: '0 40px',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <div style={{ fontSize: 54, fontWeight: 900, color: product.accent, lineHeight: 1, marginBottom: 10, letterSpacing: '-2.5px' }}>
                {val}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', letterSpacing: '3.5px', textTransform: 'uppercase' }}>
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── 4. ÜRÜN KAPSAMI (split) ───────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: '56% 44%', minHeight: 700 }} className="detail-split">

        {/* sol — fotoğraf + numaralı ürün kartları */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <img
            src={product.heroImage}
            alt={product.label}
            loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(148deg, ${product.color}f4 0%, ${product.color}d4 55%, rgba(0,0,0,0.88) 100%)` }} />

          <div style={{ position: 'relative', zIndex: 1, padding: '60px 52px 72px' }}>
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 32, height: 2.5, background: product.accent, borderRadius: 2 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '4px', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>
                Ürün Kapsamı
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.12, marginBottom: 40 }}>
              {product.label}
            </motion.h2>

            <motion.div
              variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}
              className="product-cards-grid"
            >
              {product.urunler.map((u, i) => (
                <motion.div
                  key={u}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ scale: 1.025, transition: { duration: 0.16 } }}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.13)',
                    borderTop: `2px solid ${product.accent}60`,
                    borderRadius: 12,
                    padding: '13px 14px 13px 15px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                  }}
                >
                  <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                    <span style={{ fontSize: 8.5, fontWeight: 800, color: product.accent, letterSpacing: '0.5px', opacity: 0.75 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div style={{ width: 15, height: 15, borderRadius: 4, background: `${product.accent}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconCheck size={9} color={product.accent} strokeWidth={3.5} />
                    </div>
                  </div>
                  <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.87)', lineHeight: 1.45, fontWeight: 500 }}>{u}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* sağ — açıklama + özellikler + CTA */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}
          style={{ background: '#fff', padding: '60px 52px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <motion.div
            variants={fadeUp}
            style={{ height: 3, width: 52, background: `linear-gradient(90deg, ${product.accent}, ${product.color})`, borderRadius: 2, marginBottom: 28 }}
          />
          <motion.h3 variants={fadeUp} style={{ fontSize: 26, fontWeight: 800, color: 'var(--dark)', marginBottom: 14, letterSpacing: '-0.4px', lineHeight: 1.18 }}>
            Neden Akdumann?
          </motion.h3>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.88, marginBottom: 32 }}>
            {product.detay}
          </motion.p>

          {/* özellikler */}
          {product.ozellikler && (
            <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 32 }}>
              {product.ozellikler.map(({ title, desc }, i) => {
                const Icon = FEAT_ICONS[i] || IconShieldCheck
                return (
                  <motion.div key={title} variants={fadeUp} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: `${product.color}0e`, border: `1px solid ${product.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} color={product.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--dark)', marginBottom: 3 }}>{title}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55 }}>{desc}</div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {/* etiketler */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {product.tags.map((t) => (
              <span key={t} style={{ fontSize: 11, fontWeight: 700, background: `${product.color}10`, color: product.color, borderRadius: 6, padding: '5px 13px', letterSpacing: '0.3px' }}>
                {t}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${product.color}`, borderRadius: 14, padding: '22px 24px 24px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: product.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconPhone size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)' }}>Fiyat Teklifi Alın</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Toplu alım fiyatları için iletişime geçin</div>
              </div>
            </div>
            <button
              onClick={handleContact}
              style={{ width: '100%', background: product.color, color: '#fff', border: 'none', borderRadius: 10, padding: '14px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.18s, transform 0.18s' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Şimdi İletişime Geç
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 5. DİĞER KATEGORİLER (dark) ─────────────────────── */}
      {list.length > 1 && (
        <section style={{ background: 'var(--dark)', padding: '88px 48px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ marginBottom: 52 }}>
              <motion.p variants={fadeUp} style={{ fontSize: 10, fontWeight: 800, letterSpacing: '4px', color: product.accent, textTransform: 'uppercase', marginBottom: 14 }}>
                Diğer Kategoriler
              </motion.p>
              <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
                {product.sectorLabel} — Tüm Kategoriler
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
              className="related-grid"
            >
              {list.filter((p) => p.slug !== slug).map((p) => (
                <motion.button
                  key={p.slug}
                  variants={fadeUp}
                  onClick={() => navigate(`/urun/${sector}/${p.slug}`)}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', textAlign: 'left', padding: 0, fontFamily: 'inherit', transition: 'border-color 0.25s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${p.color}60`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                >
                  <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={p.heroImage}
                      alt={p.label}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.55s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 55%)` }} />
                    <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                      <div style={{ fontSize: 10, color: p.accent || p.color, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 4 }}>
                        {p.urunler.length}+ ürün
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>{p.label}</div>
                    </div>
                    <div style={{ position: 'absolute', top: 16, right: 16 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${p.color}cc`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconChevronRight size={14} color="#fff" />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '18px 20px 22px' }}>
                    <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55, marginBottom: 14 }}>
                      {p.desc.slice(0, 76)}…
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {p.tags.slice(0, 2).map((t) => (
                        <span key={t} style={{ fontSize: 10, fontWeight: 700, background: `${p.color}22`, color: p.accent || p.color, borderRadius: 5, padding: '3px 10px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .detail-split { grid-template-columns: 1fr !important; }
          .gallery-asymmetric { grid-template-columns: 1fr !important; grid-template-rows: 300px 240px 240px !important; }
          .gallery-asymmetric > div:first-child { grid-row: span 1 !important; }
        }
        @media (max-width: 768px) {
          .related-grid { grid-template-columns: 1fr 1fr !important; }
          .product-cards-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07); padding-bottom: 32px !important; }
        }
        @media (max-width: 480px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
