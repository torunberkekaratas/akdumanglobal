import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  IconArrowLeft,
  IconCheck,
  IconChevronRight,
  IconCar,
  IconLeaf,
  IconFlask,
  IconTrash,
  IconTool,
  IconPackage,
  IconShieldCheck,
  IconTruck,
  IconStar,
  IconCertificate,
  IconArrowRight,
  IconFileTypePdf,
} from '@tabler/icons-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Animations ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.52, ease: 'easeOut', delay: i * 0.1 },
  }),
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const cardAnim = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.44, ease: 'easeOut' } },
}

/* ─── Counter ────────────────────────────────────────────── */
function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  if (inView && val === 0 && to > 0) {
    let start = 0
    const step = Math.ceil(to / 40)
    const id = setInterval(() => {
      start += step
      if (start >= to) { setVal(to); clearInterval(id) }
      else setVal(start)
    }, 28)
  }
  return <span ref={ref}>{val}{suffix}</span>
}

/* ─── Data ───────────────────────────────────────────────── */
const stats = [
  { val: 6, suffix: '', label: 'Ürün Kategorisi' },
  { val: 3, suffix: '', label: 'Sertifikalı Marka' },
  { val: 12, suffix: '+', label: 'Hizmet Sektörü' },
  { val: 500, suffix: '+', label: 'Aktif Ürün' },
]

const markalar = [
  {
    name: 'Acar Tedarik',
    short: 'Sarf & Ekipman',
    desc: 'Sarf malzemeleri, kağıt ürünleri, çöp poşetleri ve profesyonel temizlik ekipmanı tedarikçisi.',
    cert: 'Türkiye Üretimi',
    color: '#854F0B',
    icon: IconPackage,
    kategoriler: ['Kağıt & Sarf', 'Çöp Poşeti', 'Mop & Paspas', 'Ekipman'],
  },
  {
    name: 'WUNSCHOME',
    short: 'Kimyasal Çözümler',
    desc: "Sakarya'da üretilen ISO sertifikalı endüstriyel ve ev/işyeri temizlik kimyasalları.",
    cert: 'ISO 9001 / 14001 / 22716 / 45001',
    color: '#065F46',
    icon: IconFlask,
    kategoriler: ['Endüstriyel Kimyasal', 'Ev & İşyeri', 'Otel Serisi', 'Doğal Formül'],
  },
  {
    name: 'WIEBERR',
    short: 'Oto & Halı Bakım',
    desc: 'FDA onaylı oto bakım, halı bakım ve boya koruma kimyasalları. Fırçasız araç yıkama sistemleri.',
    cert: 'FDA Approved / ISO 9001 / 22716',
    color: '#B91C1C',
    icon: IconCar,
    kategoriler: ['Araç Yıkama', 'Boya Koruma', 'Halı Bakım', 'Jant Temizleme'],
  },
]

const urunGruplari = [
  {
    slug: 'kagit',
    icon: IconPackage,
    label: 'Sarf & Kağıt Ürünleri',
    brand: 'Acar Tedarik',
    color: '#854F0B',
    image: 'https://images.unsplash.com/photo-1771231591303-8e0daa821513?w=800&q=80',
    desc: 'Otel, hastane, restoran ve fabrikalar için toplu kağıt ve sarf malzemeleri tedariki.',
    urunler: [
      'Hareketli & İçten Çekmeli Havlu',
      'Mini Jumbo & Cimri Tuvalet Kağıdı',
      'Z / C Katlama Dispenser Havlu',
      'Dispenser & Garson Katlı Peçete',
      'Muayene Masa Örtüsü',
      'Autocut Roll Towel Dispenser',
      'Bone / Sabun / Köpük Dispenser',
      'Alüminyum Folyo & Streç Film',
    ],
  },
  {
    slug: 'cop',
    icon: IconTrash,
    label: 'Çöp Poşeti & Çöp Kovası',
    brand: 'Acar Tedarik',
    color: '#374151',
    image: 'https://images.unsplash.com/photo-1683516435482-f3cea544ee95?w=800&q=80',
    desc: 'Mini boydan hantal boya 6 farklı ölçüde çöp poşeti; pedallıdan konteynere komple çöp kovası ailesi.',
    urunler: [
      'Mini Boy (40x45) & Orta Boy (55x60)',
      'Büyük Boy (65x80) & Battal (72x95)',
      'Jumbo (80x110) & Hantal (100x150)',
      'Slim Pedallı & Sallanan Kapaklı Kova',
      'Konteyner (30–100 lt) & Geri Dönüşüm',
      'Sıkma Kovası (10–20 lt)',
      'Krom & Metal Seri Çöp Kovası',
    ],
  },
  {
    slug: 'mop',
    icon: IconTool,
    label: 'Mop, Paspas & Ekipman',
    brand: 'Acar Tedarik',
    color: '#1D4ED8',
    image: 'https://images.unsplash.com/photo-1758273238415-01ec03d9ef27?w=800&q=80',
    desc: 'Profesyonel mop sistemleri, kat arabaları ve tüm temizlik ekipmanı tek noktadan tedarik.',
    urunler: [
      'Coco Bristle Mop & Astronet Mop',
      'Alfacart Kat Arabası (Housekeeping)',
      'Süpürge & Fırça Grubu',
      'Alüminyum Sap & Vidali Sap',
      'Sıkmalı Mop Kovası & Tendon Mop',
      'Paspas & Bez Grubu',
      'Camcı Kovası & Cam Peluş Aparatı',
      'Ayaklı Fırçalı Faraş (Eko / Lüks)',
    ],
  },
  {
    slug: 'kimyasal',
    icon: IconFlask,
    label: 'Endüstriyel Kimyasallar',
    brand: 'WUNSCHOME',
    color: '#065F46',
    image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=800&q=80',
    desc: "Sakarya'da üretilen, ISO 9001/14001/22716 sertifikalı profesyonel endüstriyel kimyasallar.",
    urunler: [
      'Endüstriyel Lavabo Temizleyici',
      'Endüstriyel Yağ Sökücü',
      'Endüstriyel Yüzey Temizleyici',
      'Çamaşır Makinesi Deterjanı',
      'Endüstriyel Tekstil Parfümü',
      'Kireç Sökücü & Çamaşır Suyu',
      'Bulaşık Makinesi Deterjanı & Parlatıcı',
    ],
  },
  {
    slug: 'ev-isyeri',
    icon: IconLeaf,
    label: 'Ev & İşyeri Temizlik',
    brand: 'WUNSCHOME',
    color: '#065F46',
    image: 'https://images.unsplash.com/photo-1647381518264-97ff1835026f?w=800&q=80',
    desc: '%100 doğal içerikli, çevre dostu formüller. Mutfaktan banyoya kapsamlı temizlik serisi.',
    urunler: [
      'Magic Powder (Beyazlatıcı & Leke Sökücü)',
      'Leke Sökücü (Stain Remover)',
      'Ahşap Temizleyici',
      'Genel Amaçlı Yüzey Temizleyici',
      'Banyo & Mutfak Temizleyici',
      'Ortam Kokusu & Koku Giderici',
      'Otel & Hastane Serisi',
    ],
  },
  {
    slug: 'oto-hali',
    icon: IconCar,
    label: 'Oto & Halı Bakım',
    brand: 'WIEBERR',
    color: '#B91C1C',
    image: 'https://plus.unsplash.com/premium_photo-1661501041641-3e731115e687?w=800&q=80',
    desc: 'ISO 9001/14001/22716/45001 & FDA onaylı. Fırçasız araç yıkama, boya koruma ve halı bakım kimyasalları.',
    urunler: [
      'Toz & Sıvı Fırçasız Yıkama',
      'Ultra / Diamond / Gold Şampuan',
      'Oto Şampuanı & Sinek–Yağ Sökücü',
      'Redline Demir Tozu Önleyici',
      'Jant Temizleyici & Motor Temizleyici',
      'Boya Koruma & Etiket İzi Temizleyici',
      'Halı Leke Sökücü & Halı Bakım',
    ],
  },
]

const sektorler = [
  'Oteller & Resorts', 'Hastane & Klinikler', 'Restoranlar & Kafeler',
  'Fabrika & Üretim Tesisleri', 'Alışveriş Merkezleri', 'Gemi & Liman İşletmeleri',
  'Kurumsal Ofisler', 'Catering Firmaları', 'Oto Yıkama Tesisleri',
  'Halı Temizleme İşletmeleri', 'Özel Temizlik Şirketleri', 'Okul & Eğitim Kurumları',
]

/* ─── Product Card ───────────────────────────────────────── */
function ProductCard({ item, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      variants={cardAnim}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: hov ? '0 12px 40px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.05)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.25s, transform 0.25s',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* accent bar */}
      <div style={{ height: 4, background: hov ? item.color : 'var(--border)', transition: 'background 0.25s' }} />

      {/* image */}
      <div style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
        <img
          src={item.image}
          alt={item.label}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.55s ease',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)` }} />
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', padding: '4px 10px', borderRadius: 20 }}>
          {item.brand}
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <item.icon size={17} color="#fff" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.25 }}>{item.label}</span>
        </div>
      </div>

      <div style={{ padding: '18px 20px 22px', flex: 1 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14 }}>{item.desc}</p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
          {item.urunler.slice(0, 5).map((u) => (
            <li key={u} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: 'var(--text)' }}>
              <IconCheck size={13} color={item.color} style={{ flexShrink: 0, marginTop: 2 }} />
              {u}
            </li>
          ))}
          {item.urunler.length > 5 && (
            <li style={{ fontSize: 12, color: 'var(--muted)', paddingLeft: 21 }}>+{item.urunler.length - 5} ürün daha…</li>
          )}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: item.color, fontSize: 12.5, fontWeight: 700 }}>
          <span>Tüm Ürünleri Gör</span>
          <IconArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Ana Bileşen ─────────────────────────────────────────── */
export default function Temizlik() {
  const navigate = useNavigate()
  const [imgSrc, setImgSrc] = useState('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=85')

  const handleCta = () => {
    navigate('/')
    setTimeout(() => document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' }), 400)
  }

  return (
    <>
      <Helmet>
        <title>Endüstriyel Temizlik & Sarf Tedariki — Akdumann</title>
        <meta name="description" content="Otel, hastane, restoran ve fabrikalar için sarf malzemeleri, endüstriyel kimyasallar ve oto/halı bakım ürünleri tedariki. WUNSCHOME, WIEBERR, Acar Tedarik." />
      </Helmet>

      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        <img
          src={imgSrc}
          onError={() => setImgSrc('https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600&q=85')}
          alt="Endüstriyel Temizlik & Sarf"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.68) 65%, rgba(0,0,0,0.88) 100%)' }} />

        {/* back */}
        <motion.button
          className="hero-back"
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
          onClick={() => navigate('/')}
          style={{ position: 'absolute', top: 96, left: 48, background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, zIndex: 2, padding: 0, transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
        >
          <IconArrowLeft size={15} /> Ana Sayfaya Dön
        </motion.button>

        {/* text */}
        <motion.div
          className="hero-text"
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.13 } } }}
          style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '0 48px', width: '100%' }}
        >
          <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '3px', color: '#f0a030', textTransform: 'uppercase', marginBottom: 20 }}>
            03 — Endüstriyel Temizlik & Sarf
          </motion.p>
          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: 800, color: '#fff', lineHeight: 1.08, marginBottom: 24, letterSpacing: '-1px', maxWidth: 680 }}>
            Temizlik & Sarf<br />Malzeme Tedariki
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 500, marginBottom: 40 }}>
            Otelden fabrikaya, hastaneden restorana — sarf malzemeleri, endüstriyel kimyasallar, oto ve halı bakım ürünlerinde tek çatı altında profesyonel tedarik.
          </motion.p>
          <motion.div variants={fadeUp} className="hero-cta-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 72 }}>
            <button onClick={handleCta} style={{ background: 'var(--amber)', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 36px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
              Fiyat Al
            </button>
            <button onClick={handleCta} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 8, padding: '14px 32px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
              İletişime Geç
            </button>
            <button
              onClick={() => navigate('/kataloglar?sector=temizlik')}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', color: 'var(--amber)', border: 'none', borderRadius: 10, padding: '12px 24px 12px 10px', fontSize: 14.5, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 10px 26px rgba(0,0,0,0.22)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,0,0,0.28)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 26px rgba(0,0,0,0.22)' }}
            >
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(133,79,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconFileTypePdf size={16} color="var(--amber)" />
              </div>
              Katalog İndir
            </button>
          </motion.div>
        </motion.div>

        {/* stats bar */}
        <div style={{ position: 'relative', zIndex: 2, background: 'rgba(133,79,11,0.88)', backdropFilter: 'blur(12px)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 48px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }} className="stats-bar">
            {stats.map((s, i) => (
              <div key={s.label} style={{ textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.18)' : 'none', padding: '0 16px' }}>
                <div style={{ fontSize: 'clamp(26px,3.5vw,36px)', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
                  <Counter to={s.val} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 4, letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. MARKALAR ─────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '100px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger} style={{ marginBottom: 56 }}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '3px', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: 14 }}>
              Tedarikçi Markalar
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.4px', lineHeight: 1.2, marginBottom: 14 }}>
              Sertifikalı markalarla güvenilir tedarik
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 560 }}>
              Her ürün grubunda ISO onaylı, ulusal ve uluslararası sertifikalı üreticilerle çalışarak kalitenin sürekliliğini sağlıyoruz.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="brands-grid">
            {markalar.map((m) => (
              <motion.div key={m.name} variants={cardAnim}
                style={{ borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                {/* top accent */}
                <div style={{ height: 4, background: m.color }} />
                <div style={{ padding: '28px 28px 30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: `${m.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <m.icon size={22} color={m.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.2px' }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{m.short}</div>
                    </div>
                  </div>

                  <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 18 }}>{m.desc}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {m.kategoriler.map(k => (
                      <span key={k} style={{ fontSize: 11, fontWeight: 600, background: `${m.color}10`, color: m.color, borderRadius: 5, padding: '4px 10px' }}>{k}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                    <IconCertificate size={14} color={m.color} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{m.cert}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. ÜRÜN GRUPLARI ────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', padding: '100px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger} style={{ marginBottom: 56 }}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '3px', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: 14 }}>
              Ürün Katalogları
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.4px', lineHeight: 1.2, marginBottom: 14 }}>
              6 kategoride eksiksiz temizlik tedariki
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 560 }}>
              Her ürün grubunda sertifikalı markalar ve seçkin yerli üreticilerle çalışarak kaliteyi ve tutarlılığı güvence altına alıyoruz.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="product-grid">
            {urunGruplari.map((item) => (
              <ProductCard key={item.label} item={item} onClick={() => navigate(`/urun/temizlik/${item.slug}`)} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. SEKTÖRLER ────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '90px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="split-grid">

            {/* text */}
            <div>
              <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '3px', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: 14 }}>
                Hizmet Verdiğimiz Sektörler
              </motion.p>
              <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.4px', lineHeight: 1.2, marginBottom: 16 }}>
                Her sektöre uygun çözüm
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75 }}>
                Küçük işletmelerden büyük zincir tesislere, tek seferlik siparişten periyodik tedarik sözleşmelerine kadar her ölçekte hizmet veriyoruz.
              </motion.p>
            </div>

            {/* grid */}
            <motion.div variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {sektorler.map((s) => (
                <motion.div key={s} variants={cardAnim}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '11px 14px' }}>
                  <IconChevronRight size={13} color="var(--amber)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text)', lineHeight: 1.35 }}>{s}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. SÜREÇ ────────────────────────────────────────── */}
      <section style={{ background: '#2c1a07', padding: '90px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: 64 }}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '3px', color: '#f0a030', textTransform: 'uppercase', marginBottom: 14 }}>Nasıl Çalışırız</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' }}>
              İhtiyaç tespitinden düzenli teslimatına
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }} className="process-grid">
            {[
              { n: '01', title: 'İhtiyaç Tespiti', desc: 'İşletmenizin kullandığı ürün kategorilerini ve tüketim miktarlarını birlikte belirleriz. Sektöre özel ürün listesi oluşturulur.' },
              { n: '02', title: 'Teklif & Paketleme', desc: 'Toplu alıma özel fiyatlandırma sunulur. Birden fazla tedarikçiden karşılaştırmalı fiyat alarak en uygun paketi hazırlarız.' },
              { n: '03', title: 'Düzenli Teslimat', desc: 'Haftalık veya aylık periyodik teslimat planıyla stoğunuz hiç bitmez. Takip ve yenileme süreçlerini biz yönetiriz.' },
            ].map((step, i) => (
              <motion.div key={step.n} variants={fadeUp} custom={i}
                style={{ padding: '0 40px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: 56, fontWeight: 900, color: 'rgba(240,160,48,0.3)', lineHeight: 1, marginBottom: 16 }}>{step.n}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{step.title}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{step.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--amber)', padding: '80px 48px', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ maxWidth: 600, margin: '0 auto' }}>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 16 }}>
            Temizlik ihtiyaçlarınız için fiyat teklifi alın
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: 40 }}>
            Hangi ürünlere ihtiyaç duyduğunuzu paylaşın, size özel toplu fiyatlandırma ve periyodik teslimat planı hazırlayalım.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleCta} style={{ background: '#fff', color: 'var(--amber)', border: 'none', borderRadius: 8, padding: '14px 36px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
              Fiyat Al
            </button>
            <button onClick={handleCta} style={{ background: 'none', color: '#fff', border: '2px solid rgba(255,255,255,0.55)', borderRadius: 8, padding: '14px 32px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)')}>
              İletişime Geç
            </button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .product-grid { grid-template-columns: repeat(2,1fr) !important; }
          .brands-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .split-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .stats-bar { grid-template-columns: repeat(2,1fr) !important; gap: 20px !important; padding: 28px 24px !important; }
        }
        @media (max-width: 480px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .hero-back { top: 100px !important; left: 24px !important; font-size: 12px !important; }
          .hero-text { padding-top: 150px !important; padding-left: 24px !important; padding-right: 24px !important; }
          .hero-cta-row { margin-bottom: 40px !important; }
        }
      `}</style>
    </>
  )
}
