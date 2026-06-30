import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  IconArrowLeft,
  IconTruck,
  IconStar,
  IconPackage,
  IconBuildingStore,
  IconLeaf,
  IconMilk,
  IconFish,
  IconFlame,
  IconChevronRight,
  IconCheck,
  IconArrowRight,
  IconFileTypePdf,
} from '@tabler/icons-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Animation Variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.12 },
  }),
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

/* ─── Ürün Grupları Verisi ───────────────────────────────── */
const urunGruplari = [
  {
    slug: 'bakliyat',
    icon: IconLeaf,
    label: 'Bakliyat & Kuru Gıda',
    color: '#3B6D11',
    light: '#EAF3DE',
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
    desc: 'Pirincten mercimeğe, nohuttan bulgura; toplu mutfaklara özel stok yönetimiyle düzenli tedarik.',
    urunler: [
      'Gönen Baldo & Osmancık Pirinç',
      'Yerli / İthal Kırmızı Mercimek',
      'Yeşil Mercimek',
      'Nohut',
      'Kuru Fasülye & Bakla',
      'Bulgur & Makarna',
      'İrmik & Erişte',
      'Tel Şehriye & Arpa Şehriye',
    ],
  },
  {
    slug: 'peynir',
    icon: IconMilk,
    label: 'Peynir & Kahvaltılık',
    color: '#185FA5',
    light: '#E6F1FB',
    image:
      'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&q=80',
    desc: 'Tam yağlı beyazdan eski kaşara, labne ve kremadan Erzincan tulum peynirine geniş çeşit.',
    urunler: [
      'Tam Yağlı Beyaz Peynir',
      'Taze & Eski Kaşar Peyniri',
      'Çeçil & Örgü Peyniri',
      'Dilimli Tost / Cheddar Peyniri',
      'Lor, Labne & Krem Peynir',
      'Erzincan Tulum Peyniri',
      'Süzme & Homojenize Yoğurt',
      'Petek & Süzme Bal',
    ],
  },
  {
    slug: 'zeytin',
    icon: IconFish,
    label: 'Zeytin & Zeytinyağı',
    color: '#6B4226',
    light: '#F5EDE7',
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    desc: 'Jumbo siyahtan Kalamata\'ya, sızma zeytinyağına kadar premium zeytin ailesi.',
    urunler: [
      'Jumbo / İri / Orta Boy Siyah Zeytin',
      'Az Tuzlu Kuru Sele Siyah Zeytin',
      'Biber Dolgulu & Çizik Yeşil Zeytin',
      'Kırma Yeşil & Izgara Zeytin',
      'Kalamata Zeytin',
      'Siyah & Yeşil Dilimli Zeytin',
      'Sızma Zeytinyağı',
    ],
  },
  {
    slug: 'sarkuteri',
    icon: IconFlame,
    label: 'Şarküteri Mamülleri',
    color: '#8B1A1A',
    light: '#FDEAEA',
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
    desc: 'Başyazıcı ve Danet markalarıyla seçkin et ürünleri, dilimliden kangala profesyonel şarküteri.',
    urunler: [
      'Başyazıcı Dana Sucuk (Kangal / Dilimli / Baton)',
      'Başyazıcı Dana Macar & Fıstıklı Salam',
      'Başyazıcı Dana Jambon & Pastırma',
      'Danet Hindi & Piliç Füme',
      'Danet Piliç & Hindi Jambon / Salam',
      'Seyidoğlu Dökme & Piknik Reçel',
      'Seyidoğlu Helva Çeşitleri',
      'Tahini, Pekmez & Nar Ekşisi',
    ],
  },
  {
    slug: 'baharat',
    icon: IconPackage,
    label: 'Baharat & Katkılar',
    color: '#854F0B',
    light: '#FAEEDA',
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    desc: 'Pul biberden zerdeçala, cajun\'dan yedi baharat karışımına profesyonel mutfak baharatları.',
    urunler: [
      'Pul Biber, Karabiber, Kekik, Nane',
      'Kimyon, Köri, Cajun Baharatı',
      'Zerdeçal, Zencefil, Kişniş',
      'Sumak, İsot, Tarçın',
      'Yedi Türlü Baharat',
      'Susam, Çörek Otu, Zahter',
      'Nişasta, Pudra Şekeri, Kakao Toz',
      'Limon Tuzu, Limonu Suyu',
    ],
  },
]

/* ─── Neden Biz Kartları ─────────────────────────────────── */
const nedeniKartlar = [
  {
    icon: IconStar,
    title: 'Kaliteli Ürün, Doğru Fiyat',
    desc: 'Tedarikçilerle doğrudan çalışarak en iyi kaliteyi rekabetçi fiyatlarla sunuyoruz.',
  },
  {
    icon: IconTruck,
    title: 'Zamanında & Düzenli Teslimat',
    desc: 'Anlaşılan günlerde, tam zamanında teslimat. Mutfağınız hiç mal beklemez.',
  },
  {
    icon: IconPackage,
    title: 'Geniş Ürün Yelpazesi',
    desc: '5 ana kategoride 100\'den fazla ürün çeşidiyle tek çatı altında tam tedarik.',
  },
  {
    icon: IconBuildingStore,
    title: 'İşletmeye Özel Çözümler',
    desc: 'Restoran, otel veya catering fark etmez — ihtiyacınıza göre özelleştirilmiş sipariş planı.',
  },
]

/* ─── Referanslar ────────────────────────────────────────── */
const referanslar = [
  'Ramazan Bingöl Et Lokantası',
  'Develi 1912',
  'Kurumsal Catering',
  'Öz Karadeniz Et Lokantası',
  'Mezekar Meze Evi',
  'Şehrinuh Gıda',
  'Oba Restaurant Baltalimanı',
  'Hilton Otel Mall of İstanbul',
  'Teyvaş Catering',
  'Mula Hotel Sultanahmet',
  'Beak Coffee Roastery & Bakery',
  'The Local Grill Restaurant',
]

/* ─── Ürün Grubu Kartı ───────────────────────────────────── */
function ProductCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardAnim}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: '#fff',
        border: `1px solid ${hovered ? item.color : 'var(--border)'}`,
        borderRadius: 4,
        overflow: 'hidden',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'border-color 0.2s, transform 0.22s, box-shadow 0.22s',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.09)' : '0 1px 4px rgba(0,0,0,0.04)',
        cursor: 'pointer',
      }}
    >
      {/* Görsel */}
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img
          src={item.image}
          alt={item.label}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, ${item.color}cc 0%, transparent 60%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            left: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <item.icon size={17} color="#fff" />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
            {item.label}
          </span>
        </div>
      </div>

      {/* İçerik */}
      <div style={{ padding: '20px 20px 22px' }}>
        <p
          style={{
            fontSize: 13,
            color: 'var(--muted)',
            lineHeight: 1.65,
            marginBottom: 16,
          }}
        >
          {item.desc}
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20 }}>
          {item.urunler.slice(0, 5).map((u) => (
            <li
              key={u}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                fontSize: 12.5,
                color: 'var(--text)',
              }}
            >
              <IconCheck size={13} color={item.color} style={{ flexShrink: 0, marginTop: 2 }} />
              {u}
            </li>
          ))}
          {item.urunler.length > 5 && (
            <li style={{ fontSize: 12, color: 'var(--muted)', paddingLeft: 21 }}>
              +{item.urunler.length - 5} ürün daha…
            </li>
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
export default function Gida() {
  const navigate = useNavigate()
  const [imgSrc, setImgSrc] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80')

  const handleCta = () => {
    navigate('/')
    setTimeout(() => {
      document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })
    }, 400)
  }

  return (
    <>
      <Helmet>
        <title>Gıda & Bakliyat Tedariki — Akduman Global</title>
        <meta
          name="description"
          content="Restoran, otel ve catering işletmelerine bakliyat, peynir, zeytin, şarküteri ve baharat toplu tedariki. Düzenli teslimat, geniş ürün yelpazesi."
        />
        <link rel="canonical" href="https://www.akdumanglobal.com/gida" />
      </Helmet>

      <Navbar />

      {/* ── 1. HERO ───────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: 520,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={imgSrc}
          onError={() =>
            setImgSrc(
              'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1400&q=80'
            )
          }
          alt="Gıda & Bakliyat Tedariki"
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
            background: 'rgba(0,0,0,0.60)',
          }}
        />

        {/* Back Link */}
        <motion.button
          className="hero-back"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.35 }}
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            top: 96,
            left: 48,
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            zIndex: 2,
            padding: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
        >
          <IconArrowLeft size={15} />
          Ana Sayfaya Dön
        </motion.button>

        {/* Hero Content */}
        <motion.div
          className="hero-text"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 800,
            margin: '0 auto',
            padding: '120px 40px 80px',
            width: '100%',
          }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '3px',
              color: '#7bc142',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            02 — Gıda & Bakliyat
          </motion.p>

          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(34px, 5vw, 52px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.12,
              marginBottom: 22,
              letterSpacing: '-0.5px',
            }}
          >
            Gıda & Bakliyat Tedariki
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.75,
              maxWidth: 540,
            }}
          >
            Gemilerden restoranlara, otelden fabrika kantinine — ihtiyaç listenizi gönderin,
            ertesi gün kapınızda olsun.
          </motion.p>
          <motion.div variants={fadeUp} style={{ marginTop: 32 }}>
            <button
              onClick={() => navigate('/kataloglar?sector=gida')}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', color: 'var(--green)', border: 'none', borderRadius: 3, padding: '12px 24px 12px 10px', fontSize: 14.5, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 10px 26px rgba(0,0,0,0.22)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,0,0,0.28)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 26px rgba(0,0,0,0.22)' }}
            >
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(59,109,17,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconFileTypePdf size={16} color="var(--green)" />
              </div>
              Katalog İndir
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. NEDEN BİZ ──────────────────────────────────── */}
      <section style={{ background: 'var(--green)', padding: '60px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
            }}
            className="why-grid"
          >
            {nedeniKartlar.map((k) => (
              <motion.div
                key={k.title}
                variants={cardAnim}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <k.icon size={22} color="#fff" />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
                  {k.title}
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
                  {k.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. ÜRÜN GRUPLARI ──────────────────────────────── */}
      <section style={{ background: '#fff', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            style={{ marginBottom: 52 }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '3px',
                color: 'var(--green)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Ürün Gruplarımız
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--dark)',
                marginBottom: 14,
                letterSpacing: '-0.3px',
              }}
            >
              5 kategoride eksiksiz mutfak tedariki
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 15,
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: 560,
              }}
            >
              Her ürün grubunda lider markalar ve seçkin yerel üreticilerle
              işbirliği yaparak kaliteyi güvence altına alıyoruz.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}
            className="product-grid"
          >
            {urunGruplari.map((item) => (
              <ProductCard
                key={item.label}
                item={item}
                onClick={() => navigate(`/urun/gida/${item.slug}`)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. TEDARİK SÜRECİ ─────────────────────────────── */}
      <section style={{ background: 'var(--surface)', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            style={{ marginBottom: 52, textAlign: 'center' }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '3px',
                color: 'var(--green)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Nasıl Çalışır
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--dark)',
                letterSpacing: '-0.3px',
              }}
            >
              Sipariş vermek bu kadar kolay
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 0,
              position: 'relative',
            }}
            className="steps-grid"
          >
            {[
              {
                num: '01',
                title: 'Sipariş',
                desc: 'İhtiyaç listenizi telefonla, WhatsApp\'tan veya e-postayla iletin. Kataloğumuzdan seçim yapabilirsiniz.',
              },
              {
                num: '02',
                title: 'Hazırlama',
                desc: 'Ürünler kalite kontrolden geçirilerek hijyen standartlarına uygun şekilde paketlenir.',
              },
              {
                num: '03',
                title: 'Teslimat',
                desc: 'Anlaşılan gün ve saatte işletmenize soğuk zincir korunarak güvenli teslimat yapılır.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                variants={cardAnim}
                style={{
                  padding: '0 36px',
                  borderLeft: i !== 0 ? '1px solid rgba(59,109,17,0.2)' : 'none',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 800,
                    color: 'var(--green)',
                    lineHeight: 1,
                    marginBottom: 16,
                    opacity: 0.85,
                    letterSpacing: '-2px',
                  }}
                >
                  {step.num}
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
          </motion.div>
        </div>
      </section>

      {/* ── 5. REFERANSLAR ────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            style={{ marginBottom: 48, textAlign: 'center' }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '3px',
                color: 'var(--green)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Referanslarımız
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--dark)',
                marginBottom: 12,
                letterSpacing: '-0.3px',
              }}
            >
              Bizimle çalışmayı tercih eden şirketler
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}
            >
              İstanbul'un önde gelen restoranları, otelleri ve catering firmalarına hizmet veriyoruz.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'center',
            }}
          >
            {referanslar.map((r) => (
              <motion.div
                key={r}
                variants={cardAnim}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '11px 20px',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--text)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <IconChevronRight size={13} color="var(--green)" />
                {r}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA BANNER ─────────────────────────────────── */}
      <section
        style={{
          background: 'var(--dark)',
          padding: '72px 40px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          style={{ maxWidth: 560, margin: '0 auto' }}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: 'clamp(22px, 3.5vw, 32px)',
              fontWeight: 300,
              color: '#fff',
              lineHeight: 1.35,
              marginBottom: 16,
            }}
          >
            Mutfağınız için özel fiyat teklifi alın
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            İhtiyaç listenizi paylaşın, size en uygun ürün paketini ve fiyatlandırmayı
            hazırlayalım.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button
              onClick={handleCta}
              style={{
                background: 'var(--green)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '13px 32px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Katalog İste
            </button>
            <button
              onClick={handleCta}
              style={{
                background: 'none',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.5)',
                borderRadius: 8,
                padding: '13px 32px',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fff'
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                e.currentTarget.style.background = 'none'
              }}
            >
              İletişime Geç
            </button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .why-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .steps-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .steps-grid > div {
            border-left: none !important;
            padding: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: 1fr !important;
          }
          .why-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .hero-back { top: 100px !important; left: 24px !important; font-size: 12px !important; }
          .hero-text { padding-top: 150px !important; padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  )
}
