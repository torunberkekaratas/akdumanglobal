import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconArrowRight } from '@tabler/icons-react'
import { sectors } from '../data/sectors'

function Panel({ sector, isHovered, onHover, onLeave, index }) {
  const navigate = useNavigate()
  const [imgSrc, setImgSrc] = useState(sector.image)

  const handleClick = () => navigate(sector.route)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigate(sector.route)
    }
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={sector.title}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="hero-panel"
      animate={{ flex: isHovered === null ? 1 : isHovered ? 1.6 : 0.7 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        outline: 'none',
        minWidth: 0,
      }}
    >
      {/* Background Image */}
      <motion.img
        src={imgSrc}
        onError={() => setImgSrc(sector.imageFallback)}
        alt={sector.title}
        loading={index === 0 ? 'eager' : 'lazy'}
        animate={{ scale: isHovered ? 1.06 : 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(5,7,12,0.88) 0%, rgba(5,7,12,0.35) 50%, rgba(5,7,12,0.08) 100%)',
          transition: 'opacity 0.3s',
        }}
      />

      {/* Accent Bar Bottom */}
      <motion.div
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 3,
          background: sector.accentBar,
        }}
      />

      {/* Bottom Info */}
      <div
        className="panel-info"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '30px 26px',
        }}
      >
        {/* Number */}
        <div
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '3px',
            marginBottom: 10,
            fontWeight: 600,
          }}
        >
          {sector.num}
        </div>

        {/* Title */}
        <div
          className="panel-title"
          style={{
            fontSize: 'clamp(19px, 2vw, 23px)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.25,
            letterSpacing: '-0.3px',
            marginBottom: 8,
            textShadow: '0 2px 10px rgba(0,0,0,0.35)',
          }}
        >
          {sector.title}
        </div>

        {/* Subtitle — visible on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 6,
          }}
          transition={{ duration: 0.25 }}
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.65)',
            marginBottom: 12,
          }}
        >
          {sector.subtitle}
        </motion.div>

        {/* Tags */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}
        >
          {sector.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.5px',
                padding: '3px 9px',
                borderRadius: 20,
                background: sector.accent,
                color: '#fff',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Arrow — right side on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 8 }}
        transition={{ duration: 0.22 }}
        style={{
          position: 'absolute',
          top: '50%',
          right: 20,
          transform: 'translateY(-50%)',
          color: '#fff',
          pointerEvents: 'none',
        }}
      >
        <IconArrowRight size={22} />
      </motion.div>

      {/* Focus ring */}
      <motion.div
        animate={{ opacity: 0 }}
        whileFocus={{ opacity: 1 }}
        style={{
          position: 'absolute',
          inset: 0,
          border: `2px solid ${sector.accentBar}`,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function HeroPanel() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        overflow: 'hidden',
        background: '#0a0c10',
      }}
    >
      {/* Panels */}
      <div className="hero-panels-container" style={{ display: 'flex', width: '100%', height: '100vh', gap: 0 }}>
        {sectors.map((sector, i) => (
          <Panel
            key={sector.id}
            sector={sector}
            index={i}
            isHovered={hoveredIndex === null ? null : hoveredIndex === i}
            onHover={() => setHoveredIndex(i)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>

      {/* Center Floating Title */}
      <motion.div
        className="hero-floating-title"
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 10,
          width: '90%',
          maxWidth: 640,
        }}
      >
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '3px',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Kurumsal Tedarik & Sigorta Çözümleri
        </motion.p>
        <motion.h1
          variants={fadeUp}
          style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.18,
            marginBottom: 18,
            letterSpacing: '-0.5px',
          }}
        >
          Sektörünüze özel{' '}
          <b style={{ fontWeight: 800 }}>hizmet seçin</b>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.2px',
          }}
        >
          İlgilendiğiniz alana tıklayın
        </motion.p>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            height: 100dvh !important;
            min-height: 100dvh !important;
          }
          .hero-panels-container {
            flex-direction: column !important;
            height: 100dvh !important;
            gap: 0 !important;
          }
          .hero-panel {
            height: calc(100dvh / 3) !important;
            min-height: unset !important;
            flex: none !important;
            margin: 0 !important;
          }
          .hero-floating-title {
            top: 16% !important;
            width: 86% !important;
          }
          .panel-info {
            padding: 18px 20px !important;
          }
          .panel-title {
            font-size: 17px !important;
            margin-bottom: 4px !important;
          }
        }
      `}</style>
    </section>
  )
}
