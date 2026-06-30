import { motion } from 'framer-motion'

const WA_NUMBER = '905438507761'
const WA_MESSAGE = 'Merhaba, Akduman Global hakkında bilgi almak istiyorum.'

export default function WhatsAppButton() {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 9999,
        width: 58,
        height: 58,
        borderRadius: '50%',
        background: '#25D366',
        boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
      }}
    >
      {/* Pulse ring */}
      <motion.span
        animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: '#25D366',
        }}
      />

      {/* WhatsApp SVG icon */}
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 2C8.268 2 2 8.268 2 16c0 2.428.634 4.71 1.745 6.69L2 30l7.51-1.71A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Zm0 25.5a11.44 11.44 0 0 1-5.838-1.598l-.418-.248-4.455 1.015.977-4.344-.272-.447A11.5 11.5 0 1 1 16 27.5Zm6.31-8.617c-.346-.173-2.047-1.01-2.365-1.125-.317-.115-.549-.173-.78.173-.23.346-.895 1.125-1.098 1.356-.202.23-.403.26-.75.087-.346-.174-1.462-.54-2.785-1.718-1.03-.917-1.726-2.05-1.929-2.396-.202-.346-.021-.533.152-.705.156-.156.346-.404.52-.606.172-.202.23-.346.346-.577.115-.23.058-.433-.03-.606-.086-.173-.78-1.878-1.068-2.573-.282-.676-.568-.584-.78-.595l-.664-.011c-.23 0-.606.086-.924.433-.317.346-1.21 1.182-1.21 2.882s1.238 3.342 1.41 3.573c.173.23 2.436 3.718 5.902 5.213.825.356 1.468.569 1.97.728.827.263 1.58.226 2.175.137.663-.1 2.047-.836 2.335-1.644.288-.808.288-1.502.202-1.644-.086-.144-.317-.23-.663-.404Z"
          fill="#fff"
        />
      </svg>
    </motion.a>
  )
}
