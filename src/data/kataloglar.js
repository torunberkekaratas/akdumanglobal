/* ─── Katalog Listesi ───────────────────────────────────────
   PDF dosyaları public/katalog/ klasörüne eklenir.
   sector: 'sigorta' | 'gida' | 'temizlik' | null (henüz atanmadı)
──────────────────────────────────────────────────────────── */

export const kataloglar = [
  {
    id: 1,
    title: 'TCDD Özel Ürün Kataloğu',
    sector: 'temizlik',
    desc: 'Türkiye Cumhuriyeti Devlet Demiryolları için özel olarak hazırlanmış WIEBERR bakım & temizlik kimyasalları kataloğu.',
    file: '/katalog/akduman-tcdd-katalogu-tr.pdf',
    cover: '/katalog/akduman-tcdd-katalogu-tr.png',
  },
  {
    id: 3,
    title: 'Yüzey Hazırlık ve Endüstriyel Kimyasallar (Türkçe)',
    sector: 'temizlik',
    desc: 'Otomotiv, bakım, yüzey hazırlık ve endüstriyel uygulamalar için WIEBERR profesyonel ürün kataloğu — Türkçe.',
    file: '/katalog/akduman-yuzey-hazirlik-tr.pdf',
    cover: '/katalog/akduman-yuzey-hazirlik-tr.png',
  },
  {
    id: 10,
    title: 'Surface Preparation and Industrial Chemicals (English)',
    sector: 'temizlik',
    desc: 'Professional solutions for automotive, maintenance, surface preparation and industrial applications — WIEBERR product catalogue in English.',
    file: '/katalog/akduman-yuzey-hazirlik-en.pdf',
    cover: '/katalog/akduman-yuzey-hazirlik-en.png',
  },
  {
    id: 9,
    title: 'Temizlik ve Hijyen Ürünleri Kataloğu',
    sector: 'temizlik',
    desc: 'Kağıt ürünleri, çöp poşeti & kovaları, metal ekipmanlar ve çöp konteynerleri için ACR profesyonel çözümler kataloğu.',
    file: '/katalog/akduman-temizlik-hijyen-tr.pdf',
    cover: '/katalog/akduman-temizlik-hijyen-tr.png',
  },
  {
    id: 2,
    title: 'WIEBERR Savunma Sanayi Bakım Kimyasalları',
    sector: 'temizlik',
    desc: 'Zırhlı araç, silah sistemi ve taktik ekipmanlar için zift sökücü, enjektör/metal/motor temizleyici, silah temizleyici, WR-50 ve daha fazlası.',
    file: '/katalog/wieberr-savunma-sanayi-katalogu.pdf',
  },
  {
    id: 4,
    title: 'ENKOCH Profesyonel Araç Bakım Ürünleri',
    sector: 'temizlik',
    desc: 'Susuz motor temizleyici, köpük temizleyici, lastik & kokpit parlatıcı, plastik yenileyici ve oto yüzey hazırlık serisi (TR-ENG).',
    file: '/katalog/enkoch-urun-katalogu.pdf',
  },
  {
    id: 5,
    title: 'WUNSC Industrial Profesyonel Temizlik Ürünleri',
    sector: 'temizlik',
    desc: 'İşletmeler için sıvı sabun, bulaşık deterjanı, bulaşık makinesi deterjanı/parlatıcı ve yağ çözücü içeren endüstriyel temizlik serisi.',
    file: '/katalog/wunsc-industrial-katalogu.pdf',
  },
  {
    id: 6,
    title: 'WUNSCHOME Profesyonel Temizlik Ürünleri',
    sector: 'temizlik',
    desc: 'Ev ve işyerleri için Magic Powder leke çıkarıcı, genel temizlik (T.E.T.), leke sökücü, yağ çözücü ve ortam kokuları kataloğu.',
    file: '/katalog/wunschome-katalogu.pdf',
  },
  {
    id: 7,
    title: 'Renpey Gıda Ürün Kataloğu (Türkçe)',
    sector: 'gida',
    desc: 'Peynir & kahvaltılık, bakliyat, şarküteri, baharat, zeytin & zeytinyağı ürün grupları ile referans listesini içeren genel gıda tedarik kataloğu.',
    file: '/katalog/renpey-gida-katalogu-tr.pdf',
    cover: '/katalog/renpey-gida-katalogu-tr.png',
  },
  {
    id: 8,
    title: 'Renpey Product Catalogue (English)',
    sector: 'gida',
    desc: 'Full product range including dairy, legumes, deli meats, spices, olives & olive oil — with brand visuals and item references.',
    file: '/katalog/renpey-product-catalogue-en.pdf',
    cover: '/katalog/renpey-product-catalogue-en.png',
  },
]

export const sektorler = [
  { key: 'sigorta', label: 'Gemi & Tersane Sigortaları', color: '#185FA5', path: '/sigorta' },
  { key: 'gida', label: 'Gıda & Bakliyat', color: '#3B6D11', path: '/gida' },
  { key: 'temizlik', label: 'Endüstriyel Temizlik & Sarf', color: '#854F0B', path: '/temizlik' },
]
