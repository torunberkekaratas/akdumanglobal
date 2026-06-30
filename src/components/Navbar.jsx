import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IconMenu2, IconX } from '@tabler/icons-react'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleNav = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  const handleContact = () => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    } else {
      document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const handleAbout = () => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById('hakkimizda')?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    } else {
      document.getElementById('hakkimizda')?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <nav
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '0 40px',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#ffffff',
        backdropFilter: 'none',
        transition: 'background 0.35s ease',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => handleNav('/')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
        }}
        aria-label="Akduman Global Ana Sayfa"
      >
        <Logo height={52} />
      </button>

      {/* Desktop Nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 36,
        }}
        className="nav-desktop"
      >
        {[
          { label: 'Hakkımızda', action: handleAbout },
          { label: 'Referanslar', action: handleContact },
        ].map(({ label, action }) => (
          <button
            key={label}
            onClick={action}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(10,12,16,0.6)',
              fontSize: 14,
              letterSpacing: '0.3px',
              cursor: 'pointer',
              transition: 'color 0.2s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#0a0c10')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(10,12,16,0.6)')}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => handleNav('/kataloglar')}
          style={{
            background: 'none',
            border: 'none',
            color: location.pathname === '/kataloglar' ? '#0a0c10' : 'rgba(10,12,16,0.6)',
            fontSize: 14,
            letterSpacing: '0.3px',
            cursor: 'pointer',
            transition: 'color 0.2s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#0a0c10')}
          onMouseLeave={(e) => (e.target.style.color = location.pathname === '/kataloglar' ? '#0a0c10' : 'rgba(10,12,16,0.6)')}
        >
          Kataloglar
        </button>
        <button
          onClick={handleContact}
          style={{
            background: 'var(--dark)',
            border: '1px solid var(--dark)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.5px',
            padding: '8px 20px',
            borderRadius: 3,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.2s, color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.82' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
        >
          Teklif Al
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="nav-mobile-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'none',
          border: 'none',
          color: '#0a192f',
          cursor: 'pointer',
          display: 'none',
          padding: 4,
        }}
        aria-label="Menüyü aç/kapat"
      >
        {menuOpen ? <IconX size={26} /> : <IconMenu2 size={26} />}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed',
              top: 72,
              left: 0,
              right: 0,
              background: 'rgba(10,12,16,0.97)',
              backdropFilter: 'blur(16px)',
              padding: '24px 32px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              zIndex: 49,
            }}
          >
            {[
              { label: 'Hakkımızda', action: handleAbout },
              { label: 'Referanslar', action: handleContact },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  padding: '4px 0',
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNav('/kataloglar')}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.8)',
                fontSize: 16,
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: '4px 0',
              }}
            >
              Kataloglar
            </button>
            <button
              onClick={handleContact}
              style={{
                marginTop: 8,
                background: '#fff',
                border: 'none',
                color: '#0a0c10',
                fontSize: 15,
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: 6,
                cursor: 'pointer',
                fontFamily: 'inherit',
                width: 'fit-content',
              }}
            >
              Teklif Al
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
