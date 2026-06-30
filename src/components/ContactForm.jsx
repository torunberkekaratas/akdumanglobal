import { useState } from 'react'
import { IconMapPin, IconPhone, IconMail, IconSend } from '@tabler/icons-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Ad gerekli'
    if (!form.phone.trim()) e.phone = 'Telefon numarası gerekli'
    else if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Geçerli bir telefon numarası girin'
    if (!form.email.trim()) e.email = 'E-posta gerekli'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Geçerli bir e-posta girin'
    if (!form.message.trim()) e.message = 'Mesaj gerekli'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setSendError(false)
    setSending(true)
    try {
      const res = await fetch('https://formsubmit.co/ajax/akdumanglobal@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Akduman Global — Yeni İletişim Formu Mesajı',
          'Ad Soyad': form.name,
          Şirket: form.company || '-',
          Telefon: form.phone,
          'E-posta': form.email,
          Mesaj: form.message,
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      setForm({ name: '', company: '', phone: '', email: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '11px 13px',
    fontSize: 14,
    fontWeight: 400,
    border: `1px solid ${hasError ? '#DC2626' : 'var(--border)'}`,
    borderRadius: 3,
    fontFamily: 'inherit',
    color: 'var(--text)',
    outline: 'none',
    background: '#fff',
    transition: 'border-color 0.15s',
  })

  return (
    <section
      id="iletisim"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '88px 40px',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: 72,
          alignItems: 'start',
        }}
        className="contact-grid"
      >
        {/* Left */}
        <div>
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '2.5px',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            İletişim
          </p>

          <h2 style={{
            fontSize: 'clamp(26px, 3vw, 36px)',
            fontWeight: 600,
            color: 'var(--dark)',
            lineHeight: 1.2,
            marginBottom: 20,
            letterSpacing: '-0.3px',
          }}>
            Bir sorunuz mu var?<br />
            Hemen konuşalım.
          </h2>

          <p style={{
            fontSize: 15,
            color: 'var(--muted)',
            lineHeight: 1.75,
            marginBottom: 48,
            maxWidth: 360,
          }}>
            Fiyat teklifi, poliçe detayı veya ürün kataloğu için bizi arayın
            ya da formu doldurun — aynı gün geri dönelim.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { Icon: IconMapPin, text: 'İstanbul, Türkiye', href: null },
              { Icon: IconPhone,  text: '+90 543 850 77 61', href: 'tel:+905438507761' },
              { Icon: IconMail,   text: 'akdumanglobal@gmail.com', href: 'mailto:akdumanglobal@gmail.com' },
            ].map(({ Icon, text, href }) => {
              const El = href ? 'a' : 'div'
              return (
                <El
                  key={text}
                  href={href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    textDecoration: 'none',
                    color: 'var(--text)',
                  }}
                >
                  <Icon size={16} color="var(--muted)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 400 }}>{text}</span>
                </El>
              )
            })}
          </div>
        </div>

        {/* Right — form */}
        <div style={{
          background: '#fff',
          borderRadius: 4,
          padding: '36px 32px',
          border: '1px solid var(--border)',
          borderTop: '3px solid var(--dark)',
        }}>
          {sent ? (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px' }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--dark)', marginBottom: 6 }}>
                Mesajınız iletildi.
              </p>
              <p style={{ fontSize: 14, color: 'var(--muted)' }}>
                Aynı gün geri dönüyoruz.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { key: 'name',    label: 'Ad Soyad',  type: 'text',  placeholder: 'Ahmet Yılmaz',        required: true },
                  { key: 'company', label: 'Şirket',    type: 'text',  placeholder: 'Şirket adı (opsiyonel)', required: false },
                  { key: 'phone',   label: 'Telefon',   type: 'tel',   placeholder: '+90 5XX XXX XX XX',   required: true },
                  { key: 'email',   label: 'E-posta',   type: 'email', placeholder: 'ornek@firma.com',     required: true },
                ].map(({ key, label, type, placeholder, required }) => (
                  <div key={key}>
                    <label style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'var(--muted)',
                      marginBottom: 5,
                      letterSpacing: '0.3px',
                    }}>
                      {label}{required && ' *'}
                    </label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      style={inputStyle(errors[key])}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--dark)')}
                      onBlur={(e) => (e.target.style.borderColor = errors[key] ? '#DC2626' : 'var(--border)')}
                    />
                    {errors[key] && (
                      <p style={{ fontSize: 12, color: '#DC2626', marginTop: 3 }}>{errors[key]}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--muted)',
                    marginBottom: 5,
                    letterSpacing: '0.3px',
                  }}>
                    Mesajınız *
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hizmet ihtiyacınızı kısaca belirtin..."
                    style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: 110 }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--dark)')}
                    onBlur={(e) => (e.target.style.borderColor = errors.message ? '#DC2626' : 'var(--border)')}
                  />
                  {errors.message && (
                    <p style={{ fontSize: 12, color: '#DC2626', marginTop: 3 }}>{errors.message}</p>
                  )}
                </div>

                {sendError && (
                  <p style={{ fontSize: 12.5, color: '#DC2626' }}>
                    Gönderilemedi. Lütfen tekrar deneyin veya doğrudan arayın.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    background: 'var(--dark)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 3,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.3px',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    opacity: sending ? 0.65 : 1,
                    fontFamily: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={(e) => { if (!sending) e.currentTarget.style.opacity = '0.85' }}
                  onMouseLeave={(e) => { if (!sending) e.currentTarget.style.opacity = '1' }}
                >
                  <IconSend size={14} strokeWidth={1.5} />
                  {sending ? 'Gönderiliyor…' : 'Gönder'}
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
