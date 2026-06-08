export interface SearchSource {
  id: string
  label: string
  group: string
  buildUrl: (query: string) => string | null
}

export const SEARCH_GROUPS = [
  "DATABASE LOKAL",
  "GAME DEV & INDIE HUB",
  "2D & 3D ASSETS",
  "AUDIO & SFX",
  "TEXTURES & SHADERS",
  "UI & FONTS",
] as const

export const SEARCH_SOURCES: SearchSource[] = [
  {
    id: "internal",
    label: "Internal Toolbox",
    group: "DATABASE LOKAL",
    buildUrl: () => null,
  },
  {
    id: "itchio",
    label: "Itch.io",
    group: "GAME DEV & INDIE HUB",
    buildUrl: (q) => `https://itch.io/search?q=${encodeURIComponent(q)}`,
  },
  {
    id: "unity",
    label: "Unity Asset Store",
    group: "GAME DEV & INDIE HUB",
    buildUrl: (q) => `https://assetstore.unity.com/?q=${encodeURIComponent(q)}`,
  },
  {
    id: "opengameart",
    label: "OpenGameArt",
    group: "GAME DEV & INDIE HUB",
    buildUrl: (q) => `https://opengameart.org/search/node/${encodeURIComponent(q)}`,
  },
  {
    id: "kenney",
    label: "Kenney.nl",
    group: "2D & 3D ASSETS",
    buildUrl: (q) => `https://kenney.nl/assets?q=${encodeURIComponent(q)}`,
  },
  {
    id: "sketchfab",
    label: "Sketchfab (3D)",
    group: "2D & 3D ASSETS",
    buildUrl: (q) => `https://sketchfab.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    id: "cgtrader",
    label: "CGTrader (3D)",
    group: "2D & 3D ASSETS",
    buildUrl: (q) => `https://www.cgtrader.com/free-3d-models/${encodeURIComponent(q)}`,
  },
  {
    id: "freesound",
    label: "Freesound",
    group: "AUDIO & SFX",
    buildUrl: (q) => `https://freesound.org/search/?q=${encodeURIComponent(q)}`,
  },
  {
    id: "incompetech",
    label: "Incompetech (Music)",
    group: "AUDIO & SFX",
    buildUrl: (q) =>
      `https://incompetech.com/music/royalty-free/music.html?q=${encodeURIComponent(q)}`,
  },
  {
    id: "polyhaven",
    label: "Poly Haven",
    group: "TEXTURES & SHADERS",
    buildUrl: (q) => `https://polyhaven.com/all?s=${encodeURIComponent(q)}`,
  },
  {
    id: "ambientcg",
    label: "AmbientCG",
    group: "TEXTURES & SHADERS",
    buildUrl: (q) => `https://ambientcg.com/list?q=${encodeURIComponent(q)}`,
  },
  {
    id: "dafont",
    label: "DaFont",
    group: "UI & FONTS",
    buildUrl: (q) => `https://www.dafont.com/search.php?q=${encodeURIComponent(q)}`,
  },
  {
    id: "flaticon",
    label: "Flaticon (Icons)",
    group: "UI & FONTS",
    buildUrl: (q) => `https://www.flaticon.com/search?word=${encodeURIComponent(q)}`,
  },
]

export function getSourceById(id: string): SearchSource | undefined {
  return SEARCH_SOURCES.find((s) => s.id === id)
}

export function isExternalSource(id: string): boolean {
  return id !== "internal"
}
