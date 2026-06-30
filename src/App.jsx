import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import WhatsAppButton from './components/WhatsAppButton'

const Home = lazy(() => import('./pages/Home'))
const Sigorta = lazy(() => import('./pages/Sigorta'))
const Gida = lazy(() => import('./pages/Gida'))
const Temizlik = lazy(() => import('./pages/Temizlik'))
const UrunDetay = lazy(() => import('./pages/UrunDetay'))
const Kataloglar = lazy(() => import('./pages/Kataloglar'))

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <WhatsAppButton />
      <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--dark)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 14,
            }}
          >
            Yükleniyor…
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/sigorta"
            element={
              <PageWrapper>
                <Sigorta />
              </PageWrapper>
            }
          />
          <Route
            path="/gida"
            element={
              <PageWrapper>
                <Gida />
              </PageWrapper>
            }
          />
          <Route
            path="/temizlik"
            element={
              <PageWrapper>
                <Temizlik />
              </PageWrapper>
            }
          />
          <Route
            path="/urun/:sector/:slug"
            element={
              <PageWrapper>
                <UrunDetay />
              </PageWrapper>
            }
          />
          <Route
            path="/kataloglar"
            element={
              <PageWrapper>
                <Kataloglar />
              </PageWrapper>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
    </>
  )
}
