/* ─── Katalog Listesi ───────────────────────────────────────
   PDF dosyaları public/katalog/ klasörüne eklenir.
   sector: 'sigorta' | 'gida' | 'temizlik' | null (henüz atanmadı)
──────────────────────────────────────────────────────────── */

export const kataloglar = [
  // ── Temizlik & Endüstriyel ────────────────────────────
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
    id: 14,
    title: 'Endüstriyel ve Kurumsal Temizlik Çözümleri',
    sector: 'temizlik',
    desc: 'Yeni nesil temizlik teknolojisi — endüstriyel ve kurumsal kullanıma yönelik profesyonel temizlik ürünleri kataloğu.',
    file: '/katalog/akduman-endustriyel-kurumsal-temizlik-tr.pdf',
    cover: '/katalog/akduman-endustriyel-kurumsal-temizlik-tr.png',
  },
  {
    id: 13,
    title: 'Profesyonel Temizlik Ürünleri Kataloğu',
    sector: 'temizlik',
    desc: 'Endüstriyel, kurumsal ve günlük temizlik çözümleri — yüksek performanslı, güvenli içerikli ve çevreye duyarlı ürün serisi.',
    file: '/katalog/akduman-profesyonel-temizlik-tr.pdf',
    cover: '/katalog/akduman-profesyonel-temizlik-tr.png',
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

  // ── Savunma Sanayi ─────────────────────────────────────
  {
    id: 2,
    title: 'Savunma Sanayii Özel Ürün Kataloğu',
    sector: 'temizlik',
    desc: 'Zırhlı araç, hava platformu ve deniz sistemleri için savunma sanayiine özel olarak üretilmiş profesyonel kimyasal çözümler.',
    file: '/katalog/akduman-savunma-sanayii-katalogu-tr.pdf',
    cover: '/katalog/akduman-savunma-sanayii-katalogu-tr.png',
  },
  {
    id: 11,
    title: 'Jandarma Genel Komutanlığı Özel Kataloğu',
    sector: 'temizlik',
    desc: 'T.C. Jandarma Genel Komutanlığı için özel hazırlanmış — zırhlı araç, helikopter ve saha ekipmanı bakımına yönelik kimyasal çözümler.',
    file: '/katalog/akduman-jandarma-katalogu-tr.pdf',
    cover: '/katalog/akduman-jandarma-katalogu-tr.png',
  },
  {
    id: 12,
    title: 'Millî Savunma Bakanlığı Özel Kataloğu',
    sector: 'temizlik',
    desc: 'T.C. Millî Savunma Bakanlığı için özel olarak üretilmiş kara, hava ve deniz platformlarına yönelik profesyonel kimyasal çözümler kataloğu.',
    file: '/katalog/akduman-msb-katalogu-tr.pdf',
    cover: '/katalog/akduman-msb-katalogu-tr.png',
  },

  // ── Gıda & Bakliyat ────────────────────────────────────
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
