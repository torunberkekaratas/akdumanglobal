import { useState } from 'react'
import { IconMapPin, IconPhone, IconMail, IconSend } from '@tabler/icons-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Ad gerekli'
    if (!form.message.trim()) e.message = 'Mesaj gerekli'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    setErrors({})
    setSendError(false)
    setSending(true)
    try {
      const res = await fetch('https://formsubmit.co/ajax/akdumanglobal@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Akdumann — Yeni İletişim Formu Mesajı',
          'Ad Soyad': form.name,
          Şirket: form.company || '-',
          Mesaj: form.message,
        }),
      })
      if (!res.ok) throw new Error('Gönderim başarısız')
      setSent(true)
      setForm({ name: '', company: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '12px 14px',
    fontSize: 14,
    border: `1.5px solid ${hasError ? '#e53e3e' : 'var(--border)'}`,
    borderRadius: 8,
    fontFamily: 'inherit',
    color: 'var(--text)',
    outline: 'none',
    background: '#fff',
    transition: 'border-color 0.2s',
  })

  return (
    <section
      id="iletisim"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '80px 40px',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 64,
          alignItems: 'start',
        }}
        className="contact-grid"
      >
        {/* Left: Info */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '3px',
              color: 'var(--blue)',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            İletişim
          </p>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--dark)',
              lineHeight: 1.22,
              marginBottom: 16,
              letterSpacing: '-0.4px',
            }}
          >
            Bizimle çalışmaya
            <br />
            hazır mısınız?
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Denizcilik sigortası, gıda tedariki veya endüstriyel temizlik
            konularında uzman ekibimizle iletişime geçin.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { Icon: IconMapPin, text: 'İstanbul, Türkiye' },
              { Icon: IconPhone, text: '+90 543 850 77 61', href: 'tel:+905438507761' },
              { Icon: IconMail, text: 'akdumanglobal@gmail.com', href: 'mailto:akdumanglobal@gmail.com' },
            ].map(({ Icon, text, href }) => {
              const Wrapper = href ? 'a' : 'div'
              return (
                <Wrapper
                  key={text}
                  href={href}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: 'var(--blue-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color="var(--blue)" />
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--text)' }}>{text}</span>
                </Wrapper>
              )
            })}
          </div>
        </div>

        {/* Right: Form */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: '36px 32px',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          }}
        >
          {sent ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 0',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
              <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--dark)', marginBottom: 8 }}>
                Mesajınız iletildi!
              </p>
              <p style={{ fontSize: 14, color: 'var(--muted)' }}>
                En kısa sürede sizinle iletişime geçeceğiz.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text)',
                      marginBottom: 6,
                    }}
                  >
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ahmet Yılmaz"
                    style={inputStyle(errors.name)}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--blue)')}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.name ? '#e53e3e' : 'var(--border)')
                    }
                  />
                  {errors.name && (
                    <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 4 }}>{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text)',
                      marginBottom: 6,
                    }}
                  >
                    Şirket
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Şirket adı (opsiyonel)"
                    style={inputStyle(false)}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--blue)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text)',
                      marginBottom: 6,
                    }}
                  >
                    Mesajınız *
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hizmet ihtiyacınızı kısaca belirtin..."
                    style={{
                      ...inputStyle(errors.message),
                      resize: 'vertical',
                      minHeight: 120,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--blue)')}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.message ? '#e53e3e' : 'var(--border)')
                    }
                  />
                  {errors.message && (
                    <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 4 }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {sendError && (
                  <p style={{ fontSize: 12.5, color: '#e53e3e', margin: 0 }}>
                    Mesajınız gönderilemedi. Lütfen tekrar deneyin veya bizi doğrudan arayın.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    width: '100%',
                    padding: '13px 24px',
                    background: 'var(--blue)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: sending ? 'not-allowed' : 'pointer',
                    opacity: sending ? 0.7 : 1,
                    fontFamily: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => { if (!sending) e.currentTarget.style.opacity = '0.88' }}
                  onMouseLeave={(e) => { if (!sending) e.currentTarget.style.opacity = '1' }}
                >
                  <IconSend size={16} />
                  {sending ? 'Gönderiliyor...' : 'Gönder'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
