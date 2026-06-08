import type { Lang } from "@/data/assets"

export const locales: Record<
  Lang,
  {
    headerSubtitle: string
    headerDescription: string
    suggestButton: string
    inspireButton: string
    themeDark: string
    themeLight: string
    searchLabel: string
    searchPlaceholder: string
    noResults: string
    showingAssets: string
    visitSite: string
    favoriteAdd: string
    favoriteRemove: string
    copyLink: string
    copiedLink: string
    copyFailed: string
    toastFavoriteAdded: string
    toastFavoriteRemoved: string
    exportFavorites: string
    importFavorites: string
    importSuccess: string
    exportSuccess: string
    reportBrokenLink: string
    frequentlyVisited: string
    frequentlyVisitedSubtitle: string
    inspireToast: string
    levelUpToast: string
    visitCount: string
    sortLabel: string
    tagLabel: string
    modalSuggestTitle: string
    modalSuggestDesc: string
    labelAssetName: string
    labelCategory: string
    labelLink: string
    labelNotes: string
    suggestSubmit: string
    suggestCancel: string
    suggestSuccessMsg: string
    categoryLabels: Record<string, string>
    sortOptions: Record<string, string>
    langLabel: string
    omniboxLabel: string
    omniboxPlaceholderInternal: string
    omniboxPlaceholderExternal: string
    omniboxSearchButton: string
    omniboxExternalHint: string
  }
> = {
  id: {
    headerSubtitle: "Kurator Aset Gratis",
    headerDescription:
      "Kumpulan sumber daya gratis untuk kreator: model, tekstur, audio, font, dan gambar berkualitas tinggi dalam satu tampilan yang mudah dijelajahi.",
    suggestButton: "Punya Saran Aset?",
    inspireButton: "Inspirasi Acak",
    themeDark: "Dark",
    themeLight: "Light",
    searchLabel: "Cari berdasarkan nama, kategori, tag, atau deskripsi",
    searchPlaceholder: "Cari aset...",
    noResults: "Tidak ada aset yang cocok dengan filter dan pencarian.",
    showingAssets: "{count} aset ditemukan",
    visitSite: "Kunjungi",
    favoriteAdd: "Tambah ke favorit",
    favoriteRemove: "Hapus dari favorit",
    copyLink: "Salin Link",
    copiedLink: "Link berhasil disalin!",
    copyFailed: "Gagal menyalin link.",
    toastFavoriteAdded: "Ditambahkan ke favorit! +15 XP",
    toastFavoriteRemoved: "Dihapus dari favorit.",
    exportFavorites: "Ekspor Favorit",
    importFavorites: "Impor Favorit",
    importSuccess: "Favorit berhasil diimpor! +20 XP",
    exportSuccess: "Favorit berhasil diekspor! +20 XP",
    reportBrokenLink: "Laporkan Link Rusak",
    frequentlyVisited: "Sering Kamu Kunjungi",
    frequentlyVisitedSubtitle: "Aset yang paling sering kamu buka.",
    inspireToast: "Aset acak untuk inspirasimu! +5 XP",
    levelUpToast: "LEVEL UP! Kamu kini {badge} Level {level}!",
    visitCount: "{count}\u00d7 kunjungan",
    sortLabel: "Urutkan",
    tagLabel: "Semua tag",
    modalSuggestTitle: "Saran Aset",
    modalSuggestDesc:
      "Kirim ide aset baru yang menurutmu bagus. Setelah submit, draf email akan dibuka.",
    labelAssetName: "Nama Aset",
    labelCategory: "Kategori",
    labelLink: "Link Aset",
    labelNotes: "Catatan singkat",
    suggestSubmit: "Kirim Saran",
    suggestCancel: "Batal",
    suggestSuccessMsg: "Terima kasih! Email saran sedang dibuka.",
    langLabel: "Bahasa",
    omniboxLabel: "Cari Aset",
    omniboxPlaceholderInternal: "Cari di database lokal...",
    omniboxPlaceholderExternal: "Ketik & tekan Enter untuk cari di {site}...",
    omniboxSearchButton: "Cari",
    omniboxExternalHint: "Akan membuka tab baru",
    categoryLabels: {
      All: "Semua",
      "3D Models": "3D Models",
      Textures: "Tekstur",
      "SFX/Music": "SFX/Musik",
      Fonts: "Font",
      "Photos/Vectors": "Foto/Vektor",
      Favorites: "Favorit Saya",
    },
    sortOptions: {
      best: "Paling Relevan",
      popular: "Paling Populer",
      newest: "Terbaru",
      favorites: "Favorit Dulu",
    },
  },
  en: {
    headerSubtitle: "Curated Free Assets",
    headerDescription:
      "A curated collection of free resources for creators: models, textures, audio, fonts, and high-quality images in one browsable view.",
    suggestButton: "Suggest an Asset?",
    inspireButton: "Inspire Me!",
    themeDark: "Dark",
    themeLight: "Light",
    searchLabel: "Search by title, category, tag, or description",
    searchPlaceholder: "Search assets...",
    noResults: "No assets match the current filters or search.",
    showingAssets: "{count} assets found",
    visitSite: "Visit",
    favoriteAdd: "Add to favorites",
    favoriteRemove: "Remove from favorites",
    copyLink: "Copy Link",
    copiedLink: "Link copied to clipboard!",
    copyFailed: "Unable to copy link.",
    toastFavoriteAdded: "Added to favorites! +15 XP",
    toastFavoriteRemoved: "Removed from favorites.",
    exportFavorites: "Export Favorites",
    importFavorites: "Import Favorites",
    importSuccess: "Favorites imported successfully! +20 XP",
    exportSuccess: "Favorites exported! +20 XP",
    reportBrokenLink: "Report Broken Link",
    frequentlyVisited: "Frequently Visited",
    frequentlyVisitedSubtitle: "Assets you open and visit most often.",
    inspireToast: "Here's a random asset for inspiration! +5 XP",
    levelUpToast: "LEVEL UP! You're now {badge} Level {level}!",
    visitCount: "{count}\u00d7 visits",
    sortLabel: "Sort",
    tagLabel: "All tags",
    modalSuggestTitle: "Suggest an Asset",
    modalSuggestDesc:
      "Submit a new asset idea you think belongs in this toolbox. An email draft will open after submission.",
    labelAssetName: "Asset Name",
    labelCategory: "Category",
    labelLink: "Asset Link",
    labelNotes: "Short notes",
    suggestSubmit: "Send Suggestion",
    suggestCancel: "Cancel",
    suggestSuccessMsg: "Thanks! An email draft is being opened.",
    langLabel: "Language",
    omniboxLabel: "Search Assets",
    omniboxPlaceholderInternal: "Search local database...",
    omniboxPlaceholderExternal: "Type & press Enter to search {site}...",
    omniboxSearchButton: "Search",
    omniboxExternalHint: "Opens a new tab",
    categoryLabels: {
      All: "All",
      "3D Models": "3D Models",
      Textures: "Textures",
      "SFX/Music": "SFX/Music",
      Fonts: "Fonts",
      "Photos/Vectors": "Photos/Vectors",
      Favorites: "My Favorites",
    },
    sortOptions: {
      best: "Best Match",
      popular: "Most Popular",
      newest: "Newest",
      favorites: "Favorites First",
    },
  },
}

export function t(
  lang: Lang,
  key: keyof (typeof locales)[Lang],
  replacements?: Record<string, string | number>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const value = locales[lang][key]
  if (typeof value !== "string") return value
  if (!replacements) return value
  return Object.entries(replacements).reduce(
    (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
    value
  )
}
