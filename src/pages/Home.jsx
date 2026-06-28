import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import HeroPanel from '../components/HeroPanel'
import WhyUs from '../components/WhyUs'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Akdumann — Kurumsal Tedarik & Sigorta Çözümleri</title>
        <meta
          name="description"
          content="Gemi & tersane sigortası, gıda & bakliyat tedariki ve endüstriyel temizlik alanlarında kurumsal çözümler."
        />
        <html lang="tr" />
      </Helmet>

      <Navbar />
      <HeroPanel />
      <WhyUs />
      <ContactForm />
      <Footer />
    </>
  )
}
