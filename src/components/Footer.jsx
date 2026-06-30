import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  const handleContact = () => {
    document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })
  }

  const cols = [
    {
      title: 'Hizmetler',
      links: [
        { label: 'Gemi & Tersane Sigortaları', to: '/sigorta' },
        { label: 'Gıda & Bakliyat Tedariki', to: '/gida' },
        { label: 'Endüstriyel Temizlik & Sarf', to: '/temizlik' },
      ],
    },
    {
      title: 'Kurumsal',
      links: [
        { label: 'Hakkımızda', action: handleContact },
        { label: 'Referanslar', action: handleContact },
        { label: 'Blog', action: handleContact },
      ],
    },
    {
      title: 'İletişim',
      links: [
        { label: '+90 543 850 77 61', href: 'tel:+905438507761' },
        { label: 'akdumanglobal@gmail.com', href: 'mailto:akdumanglobal@gmail.com' },
        { label: 'İstanbul, Türkiye', action: handleContact },
      ],
    },
  ]

  return (
    <footer
      style={{
        background: 'var(--dark)',
        padding: '64px 40px 32px',
        color: '#fff',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr repeat(3, 1fr)',
            gap: 40,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginBottom: 14,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <Logo height={52} variant="light" />
            </button>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.7,
                maxWidth: 220,
              }}
            >
              Her sektöre, her yere.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  marginBottom: 18,
                }}
              >
                {col.title}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map((link) => {
                  const sharedStyle = {
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.55)',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    padding: 0,
                  }
                  const handlers = {
                    onMouseEnter: (e) => (e.target.style.color = '#fff'),
                    onMouseLeave: (e) => (e.target.style.color = 'rgba(255,255,255,0.55)'),
                  }
                  return (
                    <li key={link.label}>
                      {link.href ? (
                        <a href={link.href} style={sharedStyle} {...handlers}>
                          {link.label}
                        </a>
                      ) : (
                        <button
                          onClick={() => (link.to ? navigate(link.to) : link.action?.())}
                          style={sharedStyle}
                          {...handlers}
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div
          style={{
            paddingTop: 28,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="footer-copy"
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            © {year} Akduman Global. Tüm hakları saklıdır.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            Denizcilik · Gıda · Endüstri
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
          .footer-copy {
            flex-direction: column !important;
            gap: 8px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  )
}
