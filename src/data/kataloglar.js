/* ─── Katalog Listesi ───────────────────────────────────────
   PDF dosyaları public/katalog/ klasörüne eklenir.
   sector: 'sigorta' | 'gida' | 'temizlik' | null (henüz atanmadı)
   PDF'ler yüklendikçe title/desc/sector alanları gerçek içerikle güncellenir.
──────────────────────────────────────────────────────────── */

export const kataloglar = [
  {
    id: 1,
    title: 'WIEBERR Endüstriyel Temizlik & Bakım Kimyasalları',
    sector: 'temizlik',
    desc: 'TCDD için özel hazırlanmış genel temizlik, yağ sökücü, koku giderici, motor/metal bakım kimyasalları ve oto boya & macun sistemleri kataloğu.',
    file: '/katalog/wieberr-tcdd-katalogu.pdf',
  },
  {
    id: 2,
    title: 'WIEBERR Savunma Sanayi Bakım Kimyasalları',
    sector: 'temizlik',
    desc: 'Zırhlı araç, silah sistemi ve taktik ekipmanlar için zift sökücü, enjektör/metal/motor temizleyici, silah temizleyici, WR-50 ve daha fazlası.',
    file: '/katalog/wieberr-savunma-sanayi-katalogu.pdf',
  },
  {
    id: 3,
    title: 'WIEBERR Yüzey Hazırlık & Boya Sistemleri Kimyasalları',
    sector: 'temizlik',
    desc: 'Macun, sertleştirici, astar, vernik, darbe koruyucu pütür ve kaynak çapak önleyici gibi oto boya & yüzey hazırlık kimyasalları (TR-ENG).',
    file: '/katalog/wieberr-yuzey-hazirlik-kimyasallari-katalogu.pdf',
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
  {
    id: 9,
    title: 'ACR Temizlik Sarf Malzeme Kataloğu',
    sector: 'temizlik',
    desc: 'Kağıt grubu, çöp poşeti & kovası, mop/paspas/bez, temizlik aparatları ve plastik/metal krom dispenser & el kurutma cihazları kataloğu.',
    file: '/katalog/acr-temizlik-urun-tanitim-katalogu.pdf',
  },
]

export const sektorler = [
  { key: 'sigorta', label: 'Gemi & Tersane Sigortaları', color: '#185FA5', path: '/sigorta' },
  { key: 'gida', label: 'Gıda & Bakliyat', color: '#3B6D11', path: '/gida' },
  { key: 'temizlik', label: 'Endüstriyel Temizlik & Sarf', color: '#854F0B', path: '/temizlik' },
]
