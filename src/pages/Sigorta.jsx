import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  IconArrowLeft,
  IconShip,
  IconShieldCheck,
  IconPackage,
  IconTruck,
  IconAlertTriangle,
  IconCalendarOff,
  IconLock,
  IconBuildingFactory2,
  IconUsers,
  IconHammer,
  IconTool,
  IconAnchor,
  IconBuilding,
  IconEngine,
  IconDeviceDesktop,
  IconLeaf,
  IconShieldLock,
  IconPhone,
  IconCheck,
  IconStar,
  IconArrowDown,
  IconChevronRight,
  IconFileTypePdf,
} from '@tabler/icons-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Animations ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.12 },
  }),
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const cardV = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

/* ─── Animated Counter ───────────────────────────────────── */
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

/* ─── Insurance Card ─────────────────────────────────────── */
function InsuranceCard({ icon: Icon, title, items, accent = '#185FA5', dark = false, onClick }) {
  const [hov, setHov] = useState(false)
  const bg = dark ? (hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)') : '#fff'
  const border = dark
    ? (hov ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.1)')
    : `1px solid ${hov ? accent : 'var(--border)'}`
  const textColor = dark ? '#fff' : 'var(--dark)'
  const subColor = dark ? 'rgba(255,255,255,0.55)' : 'var(--muted)'

  return (
    <motion.div
      variants={cardV}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: bg,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: hov ? (dark ? '0 8px 28px rgba(0,0,0,0.4)' : '0 8px 32px rgba(24,95,165,0.14)') : '0 2px 12px rgba(0,0,0,0.06)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.25s, transform 0.25s, background 0.25s, border 0.25s',
        border,
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        backdropFilter: dark ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: dark ? 'blur(12px)' : 'none',
      }}
    >
      <div style={{ height: 3, background: hov ? accent : (dark ? 'rgba(255,255,255,0.1)' : 'var(--border)'), transition: 'background 0.25s' }} />
      <div style={{ padding: '20px 20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 9,
            background: dark ? `${accent}28` : `${accent}14`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon size={19} color={dark ? '#4a9eff' : accent} />
          </div>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: textColor, lineHeight: 1.3 }}>{title}</span>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: subColor, lineHeight: 1.55 }}>
              <IconCheck size={12} color={dark ? '#4a9eff' : accent} style={{ flexShrink: 0, marginTop: 3 }} />
              {item}
            </li>
          ))}
        </ul>
        {onClick && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 700, color: dark ? '#4a9eff' : accent, letterSpacing: '0.2px' }}>
            <span>Detayları Gör</span>
            <IconChevronRight size={13} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Data ───────────────────────────────────────────────── */
const gemiKartlari = [
  { icon: IconShip, title: 'Tekne ve Makine Sigortası (H&M)', items: ['Geminin gövdesi, makineleri ve ekipmanları', 'Çarpma, karaya oturma, yangın, fırtına riskleri'] },
  { icon: IconShieldCheck, title: 'P&I Sigortası', items: ['Üçüncü şahıs sorumluluk teminatı', 'Mürettebat, yolcu, yük ve çevre kirliliği'] },
  { icon: IconPackage, title: 'Yük Sigortası (Cargo)', items: ['Taşınan yükün hasar veya kaybını güvence altına alır'] },
  { icon: IconTruck, title: 'Navlun Sigortası (Freight)', items: ['Navlun gelirinin kaybını teminat altına alır'] },
  { icon: IconAlertTriangle, title: 'Savaş Riskleri Sigortası', items: ['Savaş, terör, korsanlık ve olağanüstü riskler'] },
  { icon: IconCalendarOff, title: 'Loss of Hire Sigortası', items: ['Hasar nedeniyle gelir kaybını karşılar'] },
  { icon: IconLock, title: 'Kidnap & Ransom (K&R)', items: ['Kaçırılma ve fidye risklerine karşı koruma'] },
]

const tersaneKartlari = [
  { icon: IconBuildingFactory2, title: 'Tersane Sorumluluk Sigortası', items: ['Tersane faaliyetlerinden kaynaklanan üçüncü şahıs zararları'] },
  { icon: IconUsers, title: 'İşveren Mali Mesuliyet', items: ['İş kazalarında çalışanların uğradığı zararlar'] },
  { icon: IconHammer, title: 'İnşaat Tüm Riskler (CAR)', items: ['Yeni gemi inşası sırasında oluşabilecek tüm hasarlar'] },
  { icon: IconTool, title: 'Montaj Tüm Riskler (EAR)', items: ['Makine ve ekipman montajı sırasında meydana gelen zararlar'] },
  { icon: IconAnchor, title: "Shipbuilders' Risk", items: ['İnşa halindeki gemiyi kızaktan teslime kadar korur'] },
  { icon: IconBuilding, title: 'Tersane Mal Varlığı', items: ['Binalar, vinçler, stoklar; yangın, deprem teminatı'] },
  { icon: IconEngine, title: 'Makine Kırılması', items: ['Vinçler, CNC makineleri gibi ekipmanların ani arızaları'] },
  { icon: IconDeviceDesktop, title: 'Elektronik Cihaz', items: ['Bilgisayarlar, kontrol sistemleri ve elektronik ekipmanlar'] },
  { icon: IconLeaf, title: 'Çevre Kirliliği Sorumluluk', items: ['Yakıt, yağ veya kimyasal sızıntılardan doğan sorumluluklar'] },
  { icon: IconShieldLock, title: 'Siber Risk Sigortası', items: ['Dijital sistemlere yönelik siber saldırı risklerini kapsar'] },
]

const ekSigortalar = [
  { icon: IconAnchor, label: 'Marina Sorumluluk Sigortası', desc: 'Marina ve yat limanı işletmecileri için özel teminat.' },
  { icon: IconBuilding, label: 'Liman İşletmecisi Sorumluluk', desc: 'Liman operasyonlarından kaynaklanan hasarlara karşı.' },
  { icon: IconBuildingFactory2, label: 'Terminal Operatörü Sorumluluk', desc: 'Konteyner ve yük terminal işletmecileri için.' },
  { icon: IconShieldCheck, label: 'Gemi Acenteleri Mesleki Sorumluluk', desc: 'Acentelik hizmetlerinde oluşan hatalara karşı güvence.' },
  { icon: IconTruck, label: 'Forwarder ve Lojistik Sorumluluk', desc: 'Uluslararası taşıma ve lojistik şirketleri için.' },
]

const nedenItems = [
  { icon: IconStar, title: 'Sektör Uzmanlığı', desc: 'Yalnızca denizcilik ve endüstriyel sigortalara odaklanıyoruz. Teknik terminolojiyi ve sektörün risklerini iyi biliriz.' },
  { icon: IconShieldCheck, title: 'Tam Kapsam', desc: 'Tekne sigortasından siber riske, tersane inşaatından çevre kirliliğine 17 farklı poliçe türü sunuyoruz.' },
  { icon: IconPhone, title: 'Hasar Anında Yanınızdayız', desc: 'Hasar bildiriminden çözüme kadar süreç boyunca tek muhatap biz oluruz. 7/24 destek.' },
]

/* ─── Ana Bileşen ─────────────────────────────────────────── */
export default function Sigorta() {
  const navigate = useNavigate()
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  const handleCta = () => {
    navigate('/')
    setTimeout(() => document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' }), 400)
  }

  return (
    <>
      <Helmet>
        <title>Gemi & Tersane Sigortaları — Akdumann</title>
        <meta name="description" content="Tekne sigortası, P&I, tersane sorumluluk, inşaat tüm riskler ve daha fazlası. Denizcilik sektörüne özel kapsamlı sigorta çözümleri." />
        <link rel="canonical" href="https://www.akdumanglobal.com/sigorta" />
      </Helmet>

      <Navbar />

      {/* ── 1. HERO (parallax) ───────────────────────────────── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        <motion.img
          src="https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1600&q=85"
          alt="Gemi Sigortası"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '120%', objectFit: 'cover', y: heroY }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.68) 72%, rgba(0,0,0,0.92) 100%)' }} />

        {/* geri */}
        <motion.button
          className="hero-back"
          initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, ease: 'easeOut' }}
          onClick={() => navigate('/')}
          style={{ position: 'absolute', top: 96, left: 48, background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, zIndex: 2, padding: 0, transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
        >
          <IconArrowLeft size={15} /> Ana Sayfaya Dön
        </motion.button>

        {/* hero text */}
        <motion.div
          className="hero-text"
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.13 } } }}
          style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '0 64px', width: '100%' }}
        >
          <motion.div
            variants={fadeUp}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24, background: 'rgba(24,95,165,0.28)', backdropFilter: 'blur(10px)', border: '1px solid rgba(74,158,255,0.5)', borderRadius: 100, padding: '6px 18px 6px 10px' }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4a9eff', boxShadow: '0 0 8px #4a9eff' }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '2.5px', color: '#4a9eff', textTransform: 'uppercase' }}>
              Sigorta Çözümleri
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(38px, 5.5vw, 68px)', fontWeight: 900, color: '#fff', lineHeight: 1.03, marginBottom: 24, letterSpacing: '-1.5px', maxWidth: 720 }}>
            Gemi & Tersane<br />Sigortaları
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 17, color: 'rgba(255,255,255,0.68)', lineHeight: 1.75, maxWidth: 490, marginBottom: 44 }}>
            Denizcilik sektörüne özel kapsamlı sigorta ürünleri ile varlıklarınızı ve sorumluluklarınızı güvence altına alıyoruz.
          </motion.p>
          <motion.div variants={fadeUp} className="hero-cta-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 80 }}>
            <button
              onClick={handleCta}
              style={{ background: '#185FA5', color: '#fff', border: 'none', borderRadius: 9, padding: '14px 36px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s, transform 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Teklif Al
            </button>
            <button
              onClick={handleCta}
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.38)', borderRadius: 9, padding: '14px 32px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            >
              İletişime Geç
            </button>
            <button
              onClick={() => navigate('/kataloglar?sector=sigorta')}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', color: '#185FA5', border: 'none', borderRadius: 10, padding: '12px 24px 12px 10px', fontSize: 14.5, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 10px 26px rgba(0,0,0,0.22)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,0,0,0.28)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 26px rgba(0,0,0,0.22)' }}
            >
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(24,95,165,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconFileTypePdf size={16} color="#185FA5" />
              </div>
              Katalog İndir
            </button>
          </motion.div>
        </motion.div>

        {/* scroll göstergesi */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ position: 'absolute', bottom: 100, right: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2 }}
        >
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}>
            <IconArrowDown size={15} color="rgba(255,255,255,0.35)" />
          </motion.div>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '2.5px', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</span>
        </motion.div>

        {/* stats bar */}
        <div style={{ position: 'relative', zIndex: 2, background: 'rgba(24,95,165,0.9)', backdropFilter: 'blur(14px)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '30px 64px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }} className="stats-bar">
            {[
              { val: 20, suffix: '+', label: 'Yıl Deneyim' },
              { val: 500, suffix: '+', label: 'Aktif Poliçe' },
              { val: 17, suffix: '', label: 'Sigorta Ürünü' },
              { val: 7, suffix: '/24', label: 'Hasar Destek' },
            ].map((s, i) => (
              <div key={s.label} style={{ textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.15)' : 'none', padding: '0 16px' }}>
                <div style={{ fontSize: 'clamp(26px,3.5vw,36px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-1px' }}>
                  <Counter to={s.val} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)', marginTop: 5, letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. NEDEN AKDUMANN ─────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '100px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="split-grid">

          {/* sol — metin */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 2.5, background: '#185FA5', borderRadius: 2 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '4px', color: '#185FA5', textTransform: 'uppercase' }}>Neden Akdumann</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: 'var(--dark)', lineHeight: 1.15, marginBottom: 18, letterSpacing: '-0.6px' }}>
              Denizcilik sigortasında<br />tek adres
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.78, marginBottom: 44 }}>
              20 yılı aşkın deneyimimizle gemi sahiplerinden tersane işletmecilerine, liman operatörlerinden lojistik firmalarına kadar her ölçekte şirkete risk yönetimi ve sigorta danışmanlığı sunuyoruz.
            </motion.p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {nedenItems.map((n, i) => (
                <motion.div key={n.title} variants={fadeUp} custom={i} style={{ display: 'flex', gap: 18 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(24,95,165,0.08)', border: '1px solid rgba(24,95,165,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <n.icon size={20} color="#185FA5" />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>{n.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{n.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* sağ — koyu stat kartı + foto doku */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.68, ease: 'easeOut' }}
            style={{ borderRadius: 20, background: '#0a192f', padding: '52px 48px', position: 'relative', overflow: 'hidden' }}
          >
            <img
              src="https://images.unsplash.com/photo-1692969094159-c2941ce80c4e?w=800&q=60"
              alt="Gemi"
              loading="lazy"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.09 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(24,95,165,0.25) 0%, transparent 65%)' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 36 }}>
                {[
                  { val: '20+', label: 'Yıl deneyim' },
                  { val: '500+', label: 'Aktif poliçe' },
                  { val: '17', label: 'Sigorta ürünü' },
                  { val: '7/24', label: 'Hasar desteği' },
                ].map((s) => (
                  <div key={s.label} style={{ borderLeft: '3px solid #185FA5', paddingLeft: 18 }}>
                    <div style={{ fontSize: 34, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-1px' }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 28 }} />

              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.78, marginBottom: 28 }}>
                Türkiye'nin önde gelen denizcilik sigorta danışmanlık firmalarından biri olarak, gemi sahiplerinden tersane işletmecilerine her ölçekte çözüm üretiyoruz.
              </p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Lloyd\'s Onaylı', 'P&I Uzmanı', 'IMO Uyumlu'].map((tag) => (
                  <span key={tag} style={{ fontSize: 11, fontWeight: 700, background: 'rgba(24,95,165,0.3)', color: 'rgba(255,255,255,0.8)', borderRadius: 6, padding: '5px 13px', letterSpacing: '0.5px' }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. GEMİ SİGORTALARI (koyu, foto doku) ──────────── */}
      <section style={{ background: '#0a192f', padding: '100px 64px', position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1708358096848-230e47646dbf?w=1600&q=60"
          alt="Gemi"
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.07 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(24,95,165,0.15) 0%, transparent 65%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger} style={{ marginBottom: 60 }}>
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 2.5, background: '#4a9eff', borderRadius: 2 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '4px', color: '#4a9eff', textTransform: 'uppercase' }}>Gemi Sigortaları</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.15, marginBottom: 16 }}>
              Teknenizi ve operasyonlarınızı<br />koruyun
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, color: 'rgba(255,255,255,0.52)', lineHeight: 1.75, maxWidth: 520 }}>
              Tekne hasarından gelir kaybına, savaş risklerinden kaçırma senaryolarına kadar her riski tek çatı altında kapsıyoruz.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}
            className="card-grid"
          >
            {gemiKartlari.map((k) => (
              <InsuranceCard key={k.title} {...k} dark accent="#185FA5" onClick={() => navigate('/urun/sigorta/gemi')} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. TERSANE — bento + cards ───────────────────────── */}
      <section style={{ background: '#fff', padding: '100px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* section header */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 2.5, background: '#0a192f', borderRadius: 2 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '4px', color: '#0a192f', textTransform: 'uppercase' }}>Tersane Sigortaları</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 900, color: 'var(--dark)', letterSpacing: '-0.5px', lineHeight: 1.15, marginBottom: 16 }}>
              Tersanenizi baştan sona<br />güvence altına alın
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, maxWidth: 520 }}>
              İnşaattan montaja, mal varlığından siber risklere kadar tersane operasyonlarının tüm boyutlarını kapsıyoruz.
            </motion.p>
          </motion.div>

          {/* asimetrik bento */}
          <div style={{ display: 'grid', gridTemplateColumns: '56% 44%', gridTemplateRows: '270px 270px', gap: 4, marginBottom: 56, borderRadius: 16, overflow: 'hidden' }} className="tersane-bento">

            {/* sol büyük foto */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{ gridRow: 'span 2', position: 'relative', overflow: 'hidden' }}
            >
              <img
                src="https://images.unsplash.com/photo-1566941512047-da7248939bd7?w=900&q=80"
                alt="Tersane"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.9s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%)' }} />
              <div style={{ position: 'absolute', bottom: 32, left: 36 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>Tersane & Fabrika</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', lineHeight: 1.2 }}>Eksiksiz Sigorta<br />Kapsamı</div>
              </div>
              <div style={{ position: 'absolute', top: 24, left: 28 }}>
                <div style={{ width: 32, height: 32, border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.65)', fontWeight: 700 }}>01</span>
                </div>
              </div>
            </motion.div>

            {/* sağ üst — stat kartı */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              style={{ background: '#185FA5', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              <img
                src="https://images.unsplash.com/photo-1646409761884-1f8d9299745e?w=600&q=60"
                alt="Tersane"
                loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.65 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.35, type: 'spring', bounce: 0.3 }}
                style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
              >
                <div style={{ fontSize: 76, fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-4px' }}>
                  10<span style={{ fontSize: 38 }}>+</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: '3px', textTransform: 'uppercase', marginTop: 14 }}>
                  Poliçe Türü
                </div>
              </motion.div>
            </motion.div>

            {/* sağ alt — tag kartı */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.2 }}
              style={{ background: '#0a192f', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 36px', gap: 10 }}
            >
              {['İnşaat Tüm Riskler', 'Makine Kırılması', 'Siber Risk', 'Çevre Kirliliği', 'Mal Varlığı'].map((tag) => (
                <span key={tag} style={{ fontSize: 12, fontWeight: 700, background: 'rgba(24,95,165,0.28)', color: '#4a9eff', borderRadius: 6, padding: '6px 14px', display: 'inline-block', width: 'fit-content' }}>
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* tersane kartları */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}
            className="card-grid"
          >
            {tersaneKartlari.map((k) => (
              <InsuranceCard key={k.title} {...k} accent="#0a192f" onClick={() => navigate('/urun/sigorta/tersane')} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. EK SİGORTALAR (koyu) ─────────────────────────── */}
      <section style={{ background: '#0a192f', padding: '88px 64px', position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=1600&q=60"
          alt="Liman"
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.06 }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger} style={{ marginBottom: 52 }}>
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 2.5, background: '#4a9eff', borderRadius: 2 }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '4px', color: '#4a9eff', textTransform: 'uppercase' }}>Ek Sigortalar</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(22px,2.8vw,34px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
              Liman ve denizcilik işletmeleri için
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}
            className="badge-grid"
          >
            {ekSigortalar.map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                variants={cardV}
                onClick={() => navigate('/urun/sigorta/ek')}
                whileHover={{ x: 5, transition: { duration: 0.15 } }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderLeft: '3px solid #185FA5', borderRadius: 12, padding: '22px 24px', cursor: 'pointer', transition: 'background 0.22s, border-color 0.22s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(24,95,165,0.12)'; e.currentTarget.style.borderLeftColor = '#4a9eff' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderLeftColor = '#185FA5' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 11, background: 'rgba(24,95,165,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color="#4a9eff" />
                </div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 5 }}>{label}</div>
                  <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.5 }}>{desc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10, fontSize: 11.5, fontWeight: 700, color: '#4a9eff' }}>
                    Detayları Gör <IconChevronRight size={12} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. SÜREÇ ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--dark)', padding: '100px 64px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: 72 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18, background: 'rgba(24,95,165,0.2)', borderRadius: 100, padding: '6px 18px 6px 10px', border: '1px solid rgba(74,158,255,0.3)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4a9eff' }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '3px', color: '#4a9eff', textTransform: 'uppercase' }}>Süreç</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
              Poliçeniz 3 adımda hazır
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, position: 'relative' }}
            className="process-grid"
          >
            {[
              { n: '01', title: 'Risk Analizi', desc: 'Varlıklarınızı ve operasyonel riskleri birlikte değerlendiriyoruz. Sektöre özgü risk haritanız çıkarılır.' },
              { n: '02', title: 'Teklif Hazırlama', desc: 'İhtiyaçlarınıza özel sigorta paketi oluşturulur. Birden fazla sigorta şirketinden rekabetçi fiyat alınır.' },
              { n: '03', title: 'Poliçe & Takip', desc: 'Poliçe düzenlenir. Hasar süreçlerinde ve poliçe yenilemelerinde yanınızdayız.' },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                variants={fadeUp}
                custom={i}
                style={{ padding: '0 48px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', textAlign: 'center' }}
              >
                <div style={{ display: 'inline-flex', width: 64, height: 64, borderRadius: 16, background: 'rgba(24,95,165,0.18)', border: '1px solid rgba(24,95,165,0.3)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: '#4a9eff', letterSpacing: '-0.5px' }}>{step.n}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 14, letterSpacing: '-0.2px' }}>{step.title}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.46)', lineHeight: 1.72 }}>{step.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. CTA (foto arkaplan) ───────────────────────────── */}
      <section style={{ position: 'relative', padding: '100px 64px', textAlign: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1617952739858-28043cecdae3?w=1600&q=75"
          alt="Deniz"
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(24,95,165,0.92) 0%, rgba(10,25,47,0.95) 100%)' }} />

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          style={{ position: 'relative', zIndex: 1, maxWidth: 620, margin: '0 auto' }}
        >
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 100, padding: '6px 18px 6px 10px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '3px', color: '#fff', textTransform: 'uppercase' }}>Size Özel Teklif</span>
          </motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 18, letterSpacing: '-0.5px' }}>
            Riskinizi birlikte değerlendirelim
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 16, color: 'rgba(255,255,255,0.68)', lineHeight: 1.75, marginBottom: 44 }}>
            İhtiyacınıza en uygun poliçeyi birlikte tasarlayalım. Ücretsiz danışmanlık için uzmanlarımızı arayın.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleCta}
              style={{ background: '#fff', color: '#185FA5', border: 'none', borderRadius: 9, padding: '15px 40px', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.18s, transform 0.18s' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Teklif Al
            </button>
            <button
              onClick={handleCta}
              style={{ background: 'none', color: '#fff', border: '2px solid rgba(255,255,255,0.45)', borderRadius: 9, padding: '15px 36px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.2s, background 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'none' }}
            >
              İletişime Geç
            </button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .split-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .tersane-bento { grid-template-columns: 1fr !important; grid-template-rows: 280px 200px 200px !important; }
          .tersane-bento > div:first-child { grid-row: span 1 !important; }
        }
        @media (max-width: 900px) {
          .card-grid { grid-template-columns: repeat(2,1fr) !important; }
          .process-grid { grid-template-columns: 1fr !important; gap: 52px !important; }
          .stats-bar { grid-template-columns: repeat(2,1fr) !important; gap: 20px !important; padding: 28px 24px !important; }
          .badge-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .card-grid { grid-template-columns: 1fr !important; }
          .stats-bar { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          .hero-back { top: 100px !important; left: 24px !important; font-size: 12px !important; }
          .hero-text { padding-top: 150px !important; padding-left: 24px !important; padding-right: 24px !important; }
          .hero-cta-row { margin-bottom: 48px !important; }
        }
      `}</style>
    </>
  )
}
