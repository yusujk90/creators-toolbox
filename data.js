/**
 * Asset schema (multi-language ready)
 * -----------------------------------
 * description: string | { id: string, en: string }
 * title:       string | { id: string, en: string }  (optional)
 * category:    string key (e.g. "3D Models") | { key: "3D Models", id?: string, en?: string }
 *
 * Legacy string descriptions are normalized to { id, en } on export.
 * Replace auto-translated `en` copy with hand-written text over time.
 */
const DESCRIPTION_PHRASE_MAP = [
  ['Situs populer untuk', 'Popular site for'],
  ['Platform animasi karakter 3D gratis', 'Free 3D character animation platform'],
  ['Koleksi aset game gratis seperti', 'Free game asset collection with'],
  ['Galeri model 3D interaktif', 'Interactive 3D model gallery'],
  ['Marketplace model 3D gratis', 'Free 3D model marketplace'],
  ['Sumber tekstur PBR berkualitas tinggi', 'High-quality PBR texture source'],
  ['Perpustakaan tekstur CC0 gratis', 'Free CC0 texture library'],
  ['Koleksi tekstur gratis', 'Free texture collection'],
  ['Tekstur gratis berkualitas tinggi', 'High-quality free textures'],
  ['Situs tekstur gratis', 'Free texture site'],
  ['Koleksi foto gratis', 'Free photo collection'],
  ['Foto dan video stok gratis', 'Free stock photos and videos'],
  ['Platform foto', 'Photo platform'],
  ['Perpustakaan ikon gratis', 'Free icon library'],
  ['Ilustrasi karakter vektor gratis', 'Free customizable vector character illustrations'],
  ['gratis', 'free'],
  ['berkualitas tinggi', 'high quality'],
  ['mudah digunakan', 'easy to use'],
  ['mudah dikustomisasi', 'easy to customize'],
  ['pengembang indie', 'indie developers'],
  ['visualisasi arsitektur', 'architectural visualization'],
  ['presentasi interaktif', 'interactive presentations'],
  ['proyek visual kreatif', 'creative visual projects'],
  ['proyek real-time 3D', 'real-time 3D projects'],
  ['untuk', 'for'],
  ['dan', 'and'],
  ['yang', 'that'],
  ['dengan', 'with'],
  ['dalam', 'in'],
  ['cocok untuk', 'great for'],
  ['seperti', 'such as'],
  ['banyak', 'many'],
  ['tanpa biaya', 'at no cost']
];

function translateDescriptionToEn(idText = '') {
  let text = idText;
  DESCRIPTION_PHRASE_MAP.forEach(([from, to]) => {
    text = text.split(from).join(to);
  });
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function normalizeLocalizedField(value, enValue) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value;
  }
  if (typeof value !== 'string') {
    return value;
  }
  return {
    id: value,
    en: enValue || value
  };
}

function normalizeAsset(asset) {
  const idDescription = typeof asset.description === 'string' ? asset.description : asset.description?.id;
  return {
    ...asset,
    description: normalizeLocalizedField(
      asset.description,
      idDescription ? translateDescriptionToEn(idDescription) : undefined
    )
  };
}

const resourceAssetsRaw = [
  {
    id: 1,
    title: "Kenney.nl",
    category: "3D Models",
    description: {
      id: "Situs populer untuk aset game 2D dan 3D gratis yang mudah digunakan dalam prototipe dan game indie.",
      en: "Popular site for free 2D and 3D game assets that are easy to use in prototypes and indie games."
    },
    url: "https://kenney.nl",
    imageUrl: "https://picsum.photos/seed/asset1/800/450",
    tags: ["game", "2D", "3D", "free", "assets"]
  },
  {
    id: 2,
    title: "Mixamo",
    category: "3D Models",
    description: "Platform animasi karakter 3D gratis untuk game, film, dan presentasi interaktif.",
    url: "https://www.mixamo.com",
    imageUrl: "https://picsum.photos/seed/asset2/800/450",
    tags: ["3D", "animation", "character", "rigged", "free"]
  },
  {
    id: 3,
    title: "OpenGameArt",
    category: "3D Models",
    description: "Koleksi aset game gratis seperti model 3D, sprite, suara, dan grafik untuk pengembang indie.",
    url: "https://opengameart.org",
    imageUrl: "https://picsum.photos/seed/asset3/800/450",
    tags: ["game", "assets", "free", "3D", "sprites"]
  },
  {
    id: 4,
    title: "Sketchfab",
    category: "3D Models",
    description: "Galeri model 3D interaktif dengan banyak model gratis untuk unduhan dan tampilan web.",
    url: "https://sketchfab.com",
    imageUrl: "https://picsum.photos/seed/asset4/800/450",
    tags: ["3D", "interactive", "models", "free", "VR"]
  },
  {
    id: 5,
    title: "Free3D",
    category: "3D Models",
    description: "Marketplace model 3D gratis untuk arsitektur, game, dan proyek visual kreatif.",
    url: "https://free3d.com",
    imageUrl: "https://picsum.photos/seed/asset5/800/450",
    tags: ["3D", "models", "free", "download", "graphics"]
  },
  {
    id: 6,
    title: "Polyhaven",
    category: "Textures",
    description: "Sumber tekstur PBR berkualitas tinggi, HDRI, dan model 3D gratis untuk visual realistis.",
    url: "https://polyhaven.com",
    imageUrl: "https://picsum.photos/seed/asset6/800/450",
    tags: ["textures", "PBR", "HDRI", "free", "3D"]
  },
  {
    id: 7,
    title: "CGBookcase",
    category: "Textures",
    description: "Perpustakaan tekstur CC0 gratis untuk visualisasi arsitektur, game, dan rendering profesional.",
    url: "https://cgbookcase.com",
    imageUrl: "https://picsum.photos/seed/asset7/800/450",
    tags: ["textures", "CC0", "free", "PBR", "3D"]
  },
  {
    id: 8,
    title: "AmbientCG",
    category: "Textures",
    description: "Koleksi tekstur gratis untuk material, environment, dan proyek real-time 3D.",
    url: "https://ambientcg.com",
    imageUrl: "https://picsum.photos/seed/asset8/800/450",
    tags: ["texture", "free", "PBR", "material", "3D"]
  },
  {
    id: 9,
    title: "Texture Haven",
    category: "Textures",
    description: "Tekstur gratis berkualitas tinggi untuk interior, arsitektur, dan ilustrasi digital.",
    url: "https://texturehaven.com",
    imageUrl: "https://picsum.photos/seed/asset9/800/450",
    tags: ["textures", "free", "seamless", "PBR", "surface"]
  },
  {
    id: 10,
    title: "CC0 Textures",
    category: "Textures",
    description: "Situs tekstur gratis dengan lisensi CC0 untuk bebas digunakan dalam proyek apa pun.",
    url: "https://cc0textures.com",
    imageUrl: "https://picsum.photos/seed/asset10/800/450",
    tags: ["CC0", "textures", "free", "PBR", "materials"]
  },
  {
    id: 11,
    title: "Unsplash",
    category: "Photos/Vectors",
    description: "Koleksi foto gratis beresolusi tinggi yang cocok untuk desain web, presentasi, dan kopi konten.",
    url: "https://unsplash.com",
    imageUrl: "https://picsum.photos/seed/asset11/800/450",
    tags: ["photo", "free", "stock", "highres", "creative"]
  },
  {
    id: 12,
    title: "Pexels",
    category: "Photos/Vectors",
    description: "Foto dan video stok gratis untuk materi pemasaran, artikel, dan jaringan sosial.",
    url: "https://pexels.com",
    imageUrl: "https://picsum.photos/seed/asset12/800/450",
    tags: ["photo", "video", "free", "stock", "content"]
  },
  {
    id: 13,
    title: "Pixabay",
    category: "Photos/Vectors",
    description: "Platform foto, ilustrasi, vektor, dan video gratis untuk penggunaan komersial tanpa biaya.",
    url: "https://pixabay.com",
    imageUrl: "https://picsum.photos/seed/asset13/800/450",
    tags: ["photo", "vector", "free", "stock", "commercial"]
  },
  {
    id: 14,
    title: "Freepik",
    category: "Photos/Vectors",
    description: "Sumber foto, vektor, dan grafik gratis dengan banyak opsi desain siap pakai.",
    url: "https://freepik.com",
    imageUrl: "https://picsum.photos/seed/asset14/800/450",
    tags: ["vector", "photo", "free", "graphics", "design"]
  },
  {
    id: 15,
    title: "Flaticon",
    category: "Photos/Vectors",
    description: "Jutaan ikon gratis untuk UI, presentasi, dan proyek desain digital.",
    url: "https://flaticon.com",
    imageUrl: "https://picsum.photos/seed/asset15/800/450",
    tags: ["icons", "vector", "free", "ui", "design"]
  },
  {
    id: 16,
    title: "The Noun Project",
    category: "Photos/Vectors",
    description: "Perpustakaan simbol dan ikon berkualitas tinggi untuk presentasi dan branding.",
    url: "https://thenounproject.com",
    imageUrl: "https://picsum.photos/seed/asset16/800/450",
    tags: ["icons", "symbols", "vector", "free", "branding"]
  },
  {
    id: 17,
    title: "StockSnap",
    category: "Photos/Vectors",
    description: "Foto stok gratis dengan fokus pada visual modern dan editorial.",
    url: "https://stocksnap.io",
    imageUrl: "https://picsum.photos/seed/asset17/800/450",
    tags: ["photo", "free", "stock", "editorial", "highres"]
  },
  {
    id: 18,
    title: "Rawpixel",
    category: "Photos/Vectors",
    description: "Foto dan ilustrasi gratis untuk desain profesional dan pemasaran konten.",
    url: "https://rawpixel.com",
    imageUrl: "https://picsum.photos/seed/asset18/800/450",
    tags: ["photo", "vector", "free", "creative", "design"]
  },
  {
    id: 19,
    title: "Reshot",
    category: "Photos/Vectors",
    description: "Foto dan ikon gratis untuk proyek startup dan konten kreatif.",
    url: "https://reshot.com",
    imageUrl: "https://picsum.photos/seed/asset19/800/450",
    tags: ["photo", "icons", "free", "startup", "creative"]
  },
  {
    id: 20,
    title: "Picjumbo",
    category: "Photos/Vectors",
    description: "Foto gratis untuk blog, web, dan materi pemasaran digital.",
    url: "https://picjumbo.com",
    imageUrl: "https://picsum.photos/seed/asset20/800/450",
    tags: ["photo", "free", "stock", "blog", "marketing"]
  },
  {
    id: 21,
    title: "SplitShire",
    category: "Photos/Vectors",
    description: "Foto dan video gratis untuk penggunaan pribadi dan komersial.",
    url: "https://splitshire.com",
    imageUrl: "https://picsum.photos/seed/asset21/800/450",
    tags: ["photo", "free", "stock", "video", "creative"]
  },
  {
    id: 22,
    title: "ISO Republic",
    category: "Photos/Vectors",
    description: "Foto dan video gratis yang bisa digunakan untuk desain, pemasaran, dan konten.",
    url: "https://isorepublic.com",
    imageUrl: "https://picsum.photos/seed/asset22/800/450",
    tags: ["photo", "video", "free", "stock", "creative"]
  },
  {
    id: 23,
    title: "IconScout Free",
    category: "Photos/Vectors",
    description: "Ikon dan ilustrasi gratis untuk desain aplikasi dan presentasi.",
    url: "https://iconscout.com/free",
    imageUrl: "https://picsum.photos/seed/asset23/800/450",
    tags: ["icons", "vector", "free", "ui", "illustration"]
  },
  {
    id: 24,
    title: "OpenClipart",
    category: "Photos/Vectors",
    description: "Ilustrasi dan clipart gratis untuk desain bebas tanpa batasan lisensi.",
    url: "https://openclipart.org",
    imageUrl: "https://picsum.photos/seed/asset24/800/450",
    tags: ["clipart", "vector", "free", "illustration", "graphics"]
  },
  {
    id: 25,
    title: "Humaaans",
    category: "Photos/Vectors",
    description: "Ilustrasi karakter vektor gratis yang mudah dikustomisasi untuk proyek UI.",
    url: "https://humaaans.com",
    imageUrl: "https://picsum.photos/seed/asset25/800/450",
    tags: ["vector", "illustration", "free", "character", "design"]
  },
  {
    id: 26,
    title: "Open Doodles",
    category: "Photos/Vectors",
    description: "Paket ilustrasi doodle gratis untuk desain web dan materi kreatif.",
    url: "https://opendoodles.com",
    imageUrl: "https://picsum.photos/seed/asset26/800/450",
    tags: ["illustration", "vector", "free", "doodle", "creative"]
  },
  {
    id: 27,
    title: "Blush",
    category: "Photos/Vectors",
    description: "Ilustrasi dan vektor gratis yang bisa dikustomisasi untuk berbagai proyek.",
    url: "https://blush.design",
    imageUrl: "https://picsum.photos/seed/asset27/800/450",
    tags: ["illustration", "vector", "free", "design", "art"]
  },
  {
    id: 28,
    title: "Hero Patterns",
    category: "Photos/Vectors",
    description: "Pola SVG gratis untuk latar belakang dan desain web modern.",
    url: "https://www.heropatterns.com",
    imageUrl: "https://picsum.photos/seed/asset28/800/450",
    tags: ["pattern", "SVG", "free", "background", "web"]
  },
  {
    id: 29,
    title: "SVGRepo",
    category: "Photos/Vectors",
    description: "Ribuan ikon dan ilustrasi SVG gratis untuk UI dan branding.",
    url: "https://www.svgrepo.com",
    imageUrl: "https://picsum.photos/seed/asset29/800/450",
    tags: ["SVG", "icons", "free", "vector", "design"]
  },
  {
    id: 30,
    title: "SVGBackgrounds",
    category: "Photos/Vectors",
    description: "Background SVG gratis yang mudah disesuaikan untuk desain web.",
    url: "https://www.svgbackgrounds.com",
    imageUrl: "https://picsum.photos/seed/asset30/800/450",
    tags: ["SVG", "background", "free", "vector", "web"]
  },
  {
    id: 31,
    title: "Patternico",
    category: "Photos/Vectors",
    description: "Generator pola gratis untuk ikon dan elemen grafis latar belakang.",
    url: "https://patternico.com",
    imageUrl: "https://picsum.photos/seed/asset31/800/450",
    tags: ["pattern", "icons", "free", "vector", "design"]
  },
  {
    id: 32,
    title: "Pixelbuddha Freebies",
    category: "Photos/Vectors",
    description: "Sumber vektor gratis, mockup, dan aset desain UI/UX.",
    url: "https://pixelbuddha.net/freebies",
    imageUrl: "https://picsum.photos/seed/asset32/800/450",
    tags: ["vector", "freebies", "mockup", "design", "graphics"]
  },
  {
    id: 33,
    title: "Google Fonts",
    category: "Fonts",
    description: "Perpustakaan font web gratis yang mudah diintegrasikan ke situs dan aplikasi.",
    url: "https://fonts.google.com",
    imageUrl: "https://picsum.photos/seed/asset33/800/450",
    tags: ["font", "webfont", "free", "typography", "design"]
  },
  {
    id: 34,
    title: "Font Squirrel",
    category: "Fonts",
    description: "Koleksi font gratis dan legal untuk penggunaan komersial di proyek digital.",
    url: "https://www.fontsquirrel.com",
    imageUrl: "https://picsum.photos/seed/asset34/800/450",
    tags: ["font", "free", "commercial", "typography", "download"]
  },
  {
    id: 35,
    title: "FontSpace",
    category: "Fonts",
    description: "Ribuan font gratis untuk desain tipografi di web dan cetak.",
    url: "https://www.fontspace.com",
    imageUrl: "https://picsum.photos/seed/asset35/800/450",
    tags: ["font", "free", "typography", "download", "design"]
  },
  {
    id: 36,
    title: "DaFont",
    category: "Fonts",
    description: "Situs font gratis populer untuk penggunaan pribadi dan kreatif.",
    url: "https://www.dafont.com",
    imageUrl: "https://picsum.photos/seed/asset36/800/450",
    tags: ["font", "free", "typography", "download", "creative"]
  },
  {
    id: 37,
    title: "FontStruct",
    category: "Fonts",
    description: "Editor font gratis untuk membuat dan mengunduh tipe huruf kustom.",
    url: "https://fontstruct.com",
    imageUrl: "https://picsum.photos/seed/asset37/800/450",
    tags: ["font", "create", "free", "typography", "design"]
  },
  {
    id: 38,
    title: "The League of Moveable Type",
    category: "Fonts",
    description: "Font open-source gratis dengan koleksi tipografi modern.",
    url: "https://www.theleagueofmoveabletype.com",
    imageUrl: "https://picsum.photos/seed/asset38/800/450",
    tags: ["font", "opensource", "free", "typography", "web"]
  },
  {
    id: 39,
    title: "Lost Type",
    category: "Fonts",
    description: "Koleksi font gratis dengan opsi donasi untuk desainer.",
    url: "https://www.losttype.com",
    imageUrl: "https://picsum.photos/seed/asset39/800/450",
    tags: ["font", "donationware", "free", "typography", "creative"]
  },
  {
    id: 40,
    title: "Open Foundry",
    category: "Fonts",
    description: "Marketplace font gratis dan open-source untuk web designer.",
    url: "https://open-foundry.com",
    imageUrl: "https://picsum.photos/seed/asset40/800/450",
    tags: ["font", "free", "opensource", "typography", "web"]
  },
  {
    id: 41,
    title: "FontPair",
    category: "Fonts",
    description: "Referensi kombinasi font gratis untuk web dan desain grafis.",
    url: "https://fontpair.co",
    imageUrl: "https://picsum.photos/seed/asset41/800/450",
    tags: ["font", "pairing", "free", "typography", "design"]
  },
  {
    id: 42,
    title: "Bensound",
    category: "SFX/Music",
    description: "Musik latar gratis untuk video, presentasi, dan konten digital.",
    url: "https://www.bensound.com",
    imageUrl: "https://picsum.photos/seed/asset42/800/450",
    tags: ["music", "free", "audio", "background", "creative"]
  },
  {
    id: 43,
    title: "Incompetech",
    category: "SFX/Music",
    description: "Musik gratis dengan lisensi Creative Commons untuk video dan film.",
    url: "https://incompetech.com",
    imageUrl: "https://picsum.photos/seed/asset43/800/450",
    tags: ["music", "free", "CC", "audio", "royalty-free"]
  },
  {
    id: 44,
    title: "Purple Planet",
    category: "SFX/Music",
    description: "Musik gratis dan efek suara untuk film, game, dan podcast.",
    url: "https://www.purple-planet.com",
    imageUrl: "https://picsum.photos/seed/asset44/800/450",
    tags: ["music", "free", "audio", "film", "royalty-free"]
  },
  {
    id: 45,
    title: "ZapSplat",
    category: "SFX/Music",
    description: "Efek suara dan musik gratis untuk game, video, dan aplikasi.",
    url: "https://www.zapsplat.com",
    imageUrl: "https://picsum.photos/seed/asset45/800/450",
    tags: ["sound", "SFX", "free", "audio", "effects"]
  },
  {
    id: 46,
    title: "Mixkit",
    category: "SFX/Music",
    description: "Musik, efek, dan video gratis untuk konten kreatif.",
    url: "https://mixkit.co",
    imageUrl: "https://picsum.photos/seed/asset46/800/450",
    tags: ["music", "free", "audio", "video", "creative"]
  },
  {
    id: 47,
    title: "Free Music Archive",
    category: "SFX/Music",
    description: "Sumber musik gratis untuk proyek audio, film, dan presentasi.",
    url: "https://freemusicarchive.org",
    imageUrl: "https://picsum.photos/seed/asset47/800/450",
    tags: ["music", "free", "archive", "audio", "creative"]
  },
  {
    id: 48,
    title: "SoundBible",
    category: "SFX/Music",
    description: "Website efek suara gratis dengan lisensi yang jelas.",
    url: "http://soundbible.com",
    imageUrl: "https://picsum.photos/seed/asset48/800/450",
    tags: ["sound", "free", "SFX", "audio", "effects"]
  },
  {
    id: 49,
    title: "Partners in Rhyme",
    category: "SFX/Music",
    description: "Musik dan efek suara gratis untuk editor video dan pembuat konten.",
    url: "https://www.partnersinrhyme.com",
    imageUrl: "https://picsum.photos/seed/asset49/800/450",
    tags: ["music", "free", "audio", "sound", "video"]
  },
  {
    id: 50,
    title: "FreePD",
    category: "SFX/Music",
    description: "Musik domain publik gratis untuk penggunaan bebas dalam proyek apa pun.",
    url: "https://freepd.com",
    imageUrl: "https://picsum.photos/seed/asset50/800/450",
    tags: ["music", "public domain", "free", "audio", "royalty-free"]
  },
  {
    id: 51,
    title: "Creative Fabrica",
    category: "Fonts",
    description: "Font dan desain grafik gratis untuk hobi dan proyek kecil.",
    url: "https://www.creativefabrica.com",
    imageUrl: "https://picsum.photos/seed/asset51/800/450",
    tags: ["font", "free", "typography", "craft", "design"]
  },
  {
    id: 52,
    title: "Fontbundles",
    category: "Fonts",
    description: "Koleksi font gratis dan bundle desain untuk kreator digital.",
    url: "https://fontbundles.net",
    imageUrl: "https://picsum.photos/seed/asset52/800/450",
    tags: ["font", "bundle", "free", "typography", "design"]
  },
  {
    id: 53,
    title: "Template.net",
    category: "Photos/Vectors",
    description: "Template desain gratis termasuk grafik, mockup, dan font.",
    url: "https://www.template.net",
    imageUrl: "https://picsum.photos/seed/asset53/800/450",
    tags: ["template", "graphics", "free", "vector", "design"]
  },
  {
    id: 54,
    title: "Mockup World",
    category: "Photos/Vectors",
    description: "Mockup gratis berkualitas tinggi untuk branding dan presentasi.",
    url: "https://www.mockupworld.co",
    imageUrl: "https://picsum.photos/seed/asset54/800/450",
    tags: ["mockup", "free", "design", "branding", "graphics"]
  },
  {
    id: 55,
    title: "Vecteezy",
    category: "Photos/Vectors",
    description: "Vektor dan gambar gratis untuk presentasi, web, dan desain.",
    url: "https://www.vecteezy.com",
    imageUrl: "https://picsum.photos/seed/asset55/800/450",
    tags: ["vector", "free", "graphics", "illustration", "design"]
  },
  {
    id: 56,
    title: "IconFinder Free",
    category: "Photos/Vectors",
    description: "Ikon gratis untuk website, aplikasi, dan presentasi.",
    url: "https://www.iconfinder.com/free_icons",
    imageUrl: "https://picsum.photos/seed/asset56/800/450",
    tags: ["icons", "free", "vector", "ui", "design"]
  },
  {
    id: 57,
    title: "Nappy",
    category: "Photos/Vectors",
    description: "Foto stok gratis yang menampilkan keragaman dan gaya kontemporer.",
    url: "https://www.nappy.co",
    imageUrl: "https://picsum.photos/seed/asset57/800/450",
    tags: ["photo", "free", "stock", "diverse", "creative"]
  },
  {
    id: 58,
    title: "Burst by Shopify",
    category: "Photos/Vectors",
    description: "Foto stok gratis untuk toko online, blog, dan pemasaran.",
    url: "https://burst.shopify.com",
    imageUrl: "https://picsum.photos/seed/asset58/800/450",
    tags: ["photo", "free", "stock", "ecommerce", "business"]
  },
  {
    id: 59,
    title: "FontsArena",
    category: "Fonts",
    description: "Font gratis untuk web dan desain cetak dengan lisensi jelas.",
    url: "https://fontsarena.com",
    imageUrl: "https://picsum.photos/seed/asset59/800/450",
    tags: ["font", "free", "typography", "web", "graphic"]
  },
  {
    id: 60,
    title: "1001 Free Fonts",
    category: "Fonts",
    description: "Situs besar dengan font gratis untuk proyek kreatif dan personal.",
    url: "https://www.1001freefonts.com",
    imageUrl: "https://picsum.photos/seed/asset60/800/450",
    tags: ["font", "free", "download", "typography", "creative"]
  },
  {
    id: 61,
    title: "FontSpace",
    category: "Fonts",
    description: "Font gratis untuk desain poster, web, dan branding.",
    url: "https://www.fontspace.com",
    imageUrl: "https://picsum.photos/seed/asset61/800/450",
    tags: ["font", "free", "typography", "download", "design"]
  },
  {
    id: 62,
    title: "Fontspring Free",
    category: "Fonts",
    description: "Coleksi font gratis dari Fontspring untuk proyek kreatif dan web.",
    url: "https://www.fontspring.com/free",
    imageUrl: "https://picsum.photos/seed/asset62/800/450",
    tags: ["font", "free", "typography", "web", "design"]
  },
  {
    id: 63,
    title: "Google Fonts",
    category: "Fonts",
    description: "Perpustakaan font web gratis yang mudah diintegrasikan ke situs dan aplikasi.",
    url: "https://fonts.google.com",
    imageUrl: "https://picsum.photos/seed/asset63/800/450",
    tags: ["font", "webfont", "free", "typography", "design"]
  },
  {
    id: 64,
    title: "Adobe Fonts Free",
    category: "Fonts",
    description: "Bagian font gratis dari Adobe untuk desain web dan kreatif.",
    url: "https://fonts.adobe.com",
    imageUrl: "https://picsum.photos/seed/asset64/800/450",
    tags: ["font", "free", "webfont", "typography", "creative"]
  },
  {
    id: 65,
    title: "TheHungryJPEG Free",
    category: "Photos/Vectors",
    description: "Desain gratis termasuk vektor, font, dan template pemasaran.",
    url: "https://thehungryjpeg.com/freebies",
    imageUrl: "https://picsum.photos/seed/asset65/800/450",
    tags: ["vector", "free", "illustration", "mockup", "design"]
  },
  {
    id: 66,
    title: "CC Search",
    category: "Photos/Vectors",
    description: "Pencarian gambar Creative Commons gratis untuk proyek kreatif.",
    url: "https://search.creativecommons.org",
    imageUrl: "https://picsum.photos/seed/asset66/800/450",
    tags: ["photo", "free", "CC", "image", "search"]
  },
  {
    id: 67,
    title: "Kaboompics",
    category: "Photos/Vectors",
    description: "Foto bebas royalti gratis untuk blog, web, dan media sosial.",
    url: "https://kaboompics.com",
    imageUrl: "https://picsum.photos/seed/asset67/800/450",
    tags: ["photo", "free", "stock", "lifestyle", "creative"]
  },
  {
    id: 68,
    title: "Life of Pix",
    category: "Photos/Vectors",
    description: "Foto stok gratis untuk penggunaan komersial tanpa atribusi.",
    url: "https://www.lifeofpix.com",
    imageUrl: "https://picsum.photos/seed/asset68/800/450",
    tags: ["photo", "free", "stock", "highres", "nature"]
  },
  {
    id: 69,
    title: "Magdeleine",
    category: "Photos/Vectors",
    description: "Foto gratis dengan kategori seni, alam, dan lifestyle.",
    url: "https://magdeleine.co",
    imageUrl: "https://picsum.photos/seed/asset69/800/450",
    tags: ["photo", "free", "stock", "nature", "art"]
  },
  {
    id: 70,
    title: "Picography",
    category: "Photos/Vectors",
    description: "Foto gratis yang bisa dipakai di situs web dan kampanye konten.",
    url: "https://picography.co",
    imageUrl: "https://picsum.photos/seed/asset70/800/450",
    tags: ["photo", "free", "stock", "creative", "web"]
  },
  {
    id: 71,
    title: "FoodiesFeed",
    category: "Photos/Vectors",
    description: "Foto makanan gratis untuk konten kuliner dan menu restoran.",
    url: "https://www.foodiesfeed.com",
    imageUrl: "https://picsum.photos/seed/asset71/800/450",
    tags: ["photo", "food", "free", "stock", "culinary"]
  },
  {
    id: 72,
    title: "Visual Hunt",
    category: "Photos/Vectors",
    description: "Pengumpulan foto stok gratis dengan banyak kategori kreatif.",
    url: "https://visualhunt.com",
    imageUrl: "https://picsum.photos/seed/asset72/800/450",
    tags: ["photo", "free", "stock", "search", "creative"]
  },
  {
    id: 73,
    title: "Rawpixel Free",
    category: "Photos/Vectors",
    description: "Sumber foto dan desain gratis untuk konten pemasaran.",
    url: "https://www.rawpixel.com/free-images",
    imageUrl: "https://picsum.photos/seed/asset73/800/450",
    tags: ["photo", "free", "stock", "design", "marketing"]
  },
  {
    id: 74,
    title: "Design Bundles Free",
    category: "Photos/Vectors",
    description: "Koleksi desain gratis termasuk grafik, ikon, dan template.",
    url: "https://designbundles.net/free-design-resources",
    imageUrl: "https://picsum.photos/seed/asset74/800/450",
    tags: ["design", "free", "vector", "graphics", "resources"]
  },
  {
    id: 75,
    title: "Pattern Monster",
    category: "Photos/Vectors",
    description: "Pola gratis untuk latar belakang dan ilustrasi desain.",
    url: "https://patternmonster.com",
    imageUrl: "https://picsum.photos/seed/asset75/800/450",
    tags: ["pattern", "free", "vector", "background", "design"]
  },
  {
    id: 76,
    title: "Subtle Patterns",
    category: "Photos/Vectors",
    description: "Kumpulan pola gratis untuk website dan presentasi.",
    url: "https://www.toptal.com/designers/subtlepatterns",
    imageUrl: "https://picsum.photos/seed/asset76/800/450",
    tags: ["pattern", "free", "background", "web", "design"]
  },
  {
    id: 77,
    title: "PixelSquid",
    category: "3D Models",
    description: "Objek 3D gratis untuk mockup dan desain produk.",
    url: "https://www.pixelsquid.com",
    imageUrl: "https://picsum.photos/seed/asset77/800/450",
    tags: ["3D", "objects", "free", "mockup", "design"]
  },
  {
    id: 78,
    title: "TurboSquid Free",
    category: "3D Models",
    description: "Bagian model 3D gratis dari perpustakaan TurboSquid.",
    url: "https://www.turbosquid.com/Search/3D-Models/free",
    imageUrl: "https://picsum.photos/seed/asset78/800/450",
    tags: ["3D", "models", "free", "stock", "design"]
  },
  {
    id: 79,
    title: "CGTrader Free",
    category: "3D Models",
    description: "Model 3D gratis dan aset game dari marketplace CGTrader.",
    url: "https://www.cgtrader.com/free-3d-models",
    imageUrl: "https://picsum.photos/seed/asset79/800/450",
    tags: ["3D", "free", "models", "game", "download"]
  },
  {
    id: 80,
    title: "Blend Swap",
    category: "3D Models",
    description: "Komunitas berbagi model 3D gratis untuk Blender dan CGI.",
    url: "https://www.blendswap.com",
    imageUrl: "https://picsum.photos/seed/asset80/800/450",
    tags: ["3D", "Blender", "free", "models", "community"]
  },
  {
    id: 81,
    title: "RenderHub Free",
    category: "3D Models",
    description: "Seksi aset 3D gratis untuk proyek game dan animasi.",
    url: "https://www.renderhub.com/free-3d-models",
    imageUrl: "https://picsum.photos/seed/asset81/800/450",
    tags: ["3D", "models", "free", "download", "design"]
  },
  {
    id: 82,
    title: "SketchUp Free",
    category: "3D Models",
    description: "Model 3D gratis untuk arsitektur, interior, dan visualisasi.",
    url: "https://www.sketchup.com/plans-and-pricing/sketchup-free",
    imageUrl: "https://picsum.photos/seed/asset82/800/450",
    tags: ["3D", "architecture", "free", "modeling", "design"]
  },
  {
    id: 83,
    title: "Vectr",
    category: "Photos/Vectors",
    description: "Editor vektor gratis dengan file desain mudah dibagikan.",
    url: "https://vectr.com",
    imageUrl: "https://picsum.photos/seed/asset83/800/450",
    tags: ["vector", "free", "editor", "design", "graphics"]
  },
  {
    id: 84,
    title: "Canva Free",
    category: "Photos/Vectors",
    description: "Alat desain grafis gratis dengan aset foto dan vektor.",
    url: "https://www.canva.com",
    imageUrl: "https://picsum.photos/seed/asset84/800/450",
    tags: ["design", "free", "graphics", "templates", "creative"]
  },
  {
    id: 85,
    title: "Epidemic Sound Free",
    category: "SFX/Music",
    description: "Bagian musik bebas royalti gratis untuk uji coba dan konten.",
    url: "https://www.epidemicsound.com",
    imageUrl: "https://picsum.photos/seed/asset85/800/450",
    tags: ["music", "free", "sound", "audio", "stock"]
  },
  {
    id: 86,
    title: "Audio Library",
    category: "SFX/Music",
    description: "Koleksi musik dan efek gratis untuk video YouTube dan proyek.",
    url: "https://www.youtube.com/audiolibrary/music",
    imageUrl: "https://picsum.photos/seed/asset86/800/450",
    tags: ["music", "free", "audio", "YouTube", "library"]
  },
  {
    id: 87,
    title: "Freesound",
    category: "SFX/Music",
    description: "Komunitas berbagi efek suara dan sampel audio gratis.",
    url: "https://freesound.org",
    imageUrl: "https://picsum.photos/seed/asset87/800/450",
    tags: ["sound", "SFX", "free", "audio", "samples"]
  },
  {
    id: 88,
    title: "99Sounds",
    category: "SFX/Music",
    description: "Kumpulan paket sampel audio gratis untuk musik dan desain suara.",
    url: "https://99sounds.org",
    imageUrl: "https://picsum.photos/seed/asset88/800/450",
    tags: ["audio", "samples", "free", "music", "sound"]
  },
  {
    id: 89,
    title: "FreeSoundEffects",
    category: "SFX/Music",
    description: "Efek suara gratis untuk game, video, dan aplikasi.",
    url: "https://www.freesoundeffects.com",
    imageUrl: "https://picsum.photos/seed/asset89/800/450",
    tags: ["sound", "SFX", "free", "audio", "effects"]
  },
  {
    id: 90,
    title: "AudioJungle Free",
    category: "SFX/Music",
    description: "Bagian musik gratis dari AudioJungle untuk uji coba dan konten.",
    url: "https://audiojungle.net/free",
    imageUrl: "https://picsum.photos/seed/asset90/800/450",
    tags: ["music", "free", "audio", "royalty-free", "stock"]
  },
  {
    id: 91,
    title: "Wikimedia Commons",
    category: "Photos/Vectors",
    description: "Perpustakaan gambar gratis yang dapat digunakan ulang untuk proyek kreatif.",
    url: "https://commons.wikimedia.org",
    imageUrl: "https://picsum.photos/seed/asset91/800/450",
    tags: ["photo", "free", "creative", "commons", "media"]
  },
  {
    id: 92,
    title: "Openverse",
    category: "Photos/Vectors",
    description: "Pencarian gambar CC gratis dari berbagai sumber dan media.",
    url: "https://wordpress.org/openverse",
    imageUrl: "https://picsum.photos/seed/asset92/800/450",
    tags: ["photo", "free", "CC", "search", "media"]
  },
  {
    id: 93,
    title: "Pikka",
    category: "Photos/Vectors",
    description: "Foto dan ilustrasi gratis untuk blog dan konten digital.",
    url: "https://pikka.app",
    imageUrl: "https://picsum.photos/seed/asset93/800/450",
    tags: ["photo", "free", "stock", "illustration", "creative"]
  },
  {
    id: 94,
    title: "GraphicBurger",
    category: "Photos/Vectors",
    description: "Mockup dan desain grafis gratis untuk branding dan UI.",
    url: "https://graphicburger.com",
    imageUrl: "https://picsum.photos/seed/asset94/800/450",
    tags: ["mockup", "free", "graphics", "design", "UI"]
  },
  {
    id: 95,
    title: "PixelBuddha",
    category: "Photos/Vectors",
    description: "Aset desain gratis termasuk UI kit, ikon, dan pola.",
    url: "https://pixelbuddha.net",
    imageUrl: "https://picsum.photos/seed/asset95/800/450",
    tags: ["design", "free", "graphics", "UI", "assets"]
  },
  {
    id: 96,
    title: "UXWing",
    category: "Photos/Vectors",
    description: "Ikon dan grafik gratis untuk prototipe antarmuka pengguna.",
    url: "https://uxwing.com",
    imageUrl: "https://picsum.photos/seed/asset96/800/450",
    tags: ["icons", "free", "UI", "vector", "design"]
  },
  {
    id: 97,
    title: "Figma Community Free",
    category: "Photos/Vectors",
    description: "Sumber desain gratis untuk Figma termasuk wireframe dan UI kit.",
    url: "https://www.figma.com/community",
    imageUrl: "https://picsum.photos/seed/asset97/800/450",
    tags: ["design", "free", "UI", "Figma", "templates"]
  },
  {
    id: 98,
    title: "UI8 Freebies",
    category: "Photos/Vectors",
    description: "Download gratis UI kit, ikon, dan aset desain dengan kualitas tinggi.",
    url: "https://ui8.net/freebies",
    imageUrl: "https://picsum.photos/seed/asset98/800/450",
    tags: ["UI", "free", "design", "graphics", "templates"]
  },
  {
    id: 99,
    title: "Humaaans",
    category: "Photos/Vectors",
    description: "Ilustrasi karakter vektor gratis yang mudah dikustomisasi.",
    url: "https://humaaans.com",
    imageUrl: "https://picsum.photos/seed/asset99/800/450",
    tags: ["illustration", "vector", "free", "character", "design"]
  },
  {
    id: 100,
    title: "Icons8 Free",
    category: "Photos/Vectors",
    description: "Perpustakaan ikon gratis untuk desain aplikasi, web, dan presentasi.",
    url: "https://icons8.com/icons",
    imageUrl: "https://picsum.photos/seed/asset100/800/450",
    tags: ["icons", "free", "vector", "UI", "design"]
  }
];

const resourceAssets = resourceAssetsRaw.map(normalizeAsset);

<<<<<<< HEAD
/** Classic script global (works with file:// and static hosting). */
window.CREATORS_TOOLBOX_ASSETS = resourceAssets;
=======
export default resourceAssets;
>>>>>>> 6eb776fd044f7ce5e4081d60fa4bf41800df207a
