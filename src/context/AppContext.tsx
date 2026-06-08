import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react"
import resourceAssets, { type Asset, type Lang } from "@/data/assets"
import { isExternalSource } from "@/lib/searchSources"

export type AccentColor = "indigo" | "emerald" | "rose" | "amber"
export type LayoutMode = "grid" | "list"
export type SortMode = "best" | "popular" | "newest" | "favorites"

interface GamificationState {
  xp: number
  level: number
}

interface AppState {
  lang: Lang
  setLang: (l: Lang) => void
  accent: AccentColor
  setAccent: (a: AccentColor) => void
  isDark: boolean
  toggleTheme: () => void
  layout: LayoutMode
  setLayout: (l: LayoutMode) => void
  activeCategory: string
  setActiveCategory: (c: string) => void
  searchTerm: string
  setSearchTerm: (s: string) => void
  searchTarget: string
  setSearchTarget: (t: string) => void
  sortMode: SortMode
  setSortMode: (s: SortMode) => void
  activeTag: string
  setActiveTag: (t: string) => void
  favorites: Set<number>
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  clickCounts: Record<number, number>
  incrementClick: (id: number) => void
  gamification: GamificationState
  addXp: (amount: number) => void
  filteredAssets: Asset[]
  getDescription: (asset: Asset) => string
  accentVars: Record<string, string>
}

const AppContext = createContext<AppState | null>(null)

const ACCENT_PALETTE: Record<AccentColor, Record<string, string>> = {
  indigo: {
    "--accent": "#4f46e5",
    "--accent-light": "#e0e7ff",
    "--accent-lighter": "#eef2ff",
    "--accent-dark": "#4338ca",
    "--accent-muted": "#c7d2fe",
  },
  emerald: {
    "--accent": "#10b981",
    "--accent-light": "#d1fae5",
    "--accent-lighter": "#ecfdf5",
    "--accent-dark": "#059669",
    "--accent-muted": "#6ee7b7",
  },
  rose: {
    "--accent": "#f43f5e",
    "--accent-light": "#ffe4e6",
    "--accent-lighter": "#fff1f2",
    "--accent-dark": "#e11d48",
    "--accent-muted": "#fda4af",
  },
  amber: {
    "--accent": "#f59e0b",
    "--accent-light": "#fef3c7",
    "--accent-lighter": "#fffbeb",
    "--accent-dark": "#d97706",
    "--accent-muted": "#fcd34d",
  },
}

function getBadge(level: number) {
  if (level <= 3) return "Novice Designer"
  if (level <= 7) return "Asset Hunter"
  if (level <= 12) return "Creative Ninja"
  return "Ultimate Creator"
}

function nextLevelXp(level: number) {
  return level * 100
}

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => loadStorage("ctb_lang", "id"))
  const [accent, setAccentState] = useState<AccentColor>(() => loadStorage("ctb_accent", "indigo"))
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("ctb_theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })
  const [layout, setLayoutState] = useState<LayoutMode>(() => loadStorage("ctb_layout", "grid"))
  const [activeCategory, setActiveCategoryState] = useState("All")
  const [searchTerm, setSearchTermState] = useState("")
  const [searchTarget, setSearchTargetState] = useState("internal")
  const [sortMode, setSortModeState] = useState<SortMode>(() => loadStorage("ctb_sort", "best"))
  const [activeTag, setActiveTagState] = useState("All")
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    const arr = loadStorage<number[]>("ctb_favorites", [])
    return new Set(arr)
  })
  const [clickCounts, setClickCounts] = useState<Record<number, number>>(() =>
    loadStorage("ctb_clicks", {})
  )
  const [gamification, setGamification] = useState<GamificationState>(() =>
    loadStorage("ctb_xp", { xp: 0, level: 1 })
  )
  const xpTimestamps = useRef<Record<number, number>>({})

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem("ctb_theme", isDark ? "dark" : "light")
  }, [isDark])

  const toggleTheme = useCallback(() => setIsDark((d) => !d), [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem("ctb_lang", l)
  }, [])

  const setAccent = useCallback((a: AccentColor) => {
    setAccentState(a)
    localStorage.setItem("ctb_accent", a)
  }, [])

  const setLayout = useCallback((l: LayoutMode) => {
    setLayoutState(l)
    localStorage.setItem("ctb_layout", l)
  }, [])

  const setActiveCategory = useCallback((c: string) => setActiveCategoryState(c), [])
  const setSearchTerm = useCallback((s: string) => setSearchTermState(s), [])
  const setSearchTarget = useCallback((t: string) => {
    setSearchTargetState(t)
    if (isExternalSource(t)) setSearchTermState("")
  }, [])
  const setSortMode = useCallback((s: SortMode) => {
    setSortModeState(s)
    localStorage.setItem("ctb_sort", s)
  }, [])
  const setActiveTag = useCallback((t: string) => setActiveTagState(t), [])

  const isFavorite = useCallback((id: number) => favorites.has(id), [favorites])

  const toggleFavorite = useCallback(
    (id: number) => {
      setFavorites((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        localStorage.setItem("ctb_favorites", JSON.stringify([...next]))
        return next
      })
    },
    []
  )

  const addXp = useCallback((amount: number) => {
    setGamification((prev) => {
      let { xp, level } = prev
      xp += amount
      while (xp >= nextLevelXp(level)) {
        xp -= nextLevelXp(level)
        level++
      }
      const next = { xp, level }
      localStorage.setItem("ctb_xp", JSON.stringify(next))
      return next
    })
  }, [])

  const incrementClick = useCallback(
    (id: number) => {
      const now = Date.now()
      const last = xpTimestamps.current[id] || 0
      if (now - last >= 15000) {
        xpTimestamps.current[id] = now
        addXp(10)
      }
      setClickCounts((prev) => {
        const next = { ...prev, [id]: (prev[id] || 0) + 1 }
        localStorage.setItem("ctb_clicks", JSON.stringify(next))
        return next
      })
    },
    [addXp]
  )

  const getDescription = useCallback(
    (asset: Asset) => asset.description[lang],
    [lang]
  )

  const filteredAssets = (() => {
    const term = searchTerm.trim().toLowerCase()
    const words = term.split(/\s+/).filter(Boolean)
    const hashTags = words.filter((w) => w.startsWith("#")).map((w) => w.slice(1))
    const textWords = words.filter((w) => !w.startsWith("#"))
    const tagFilter = activeTag !== "All" ? activeTag.toLowerCase() : null

    let list = resourceAssets.filter((a) => {
      if (activeCategory === "Favorites") return favorites.has(a.id)
      if (activeCategory !== "All" && a.category !== activeCategory) return false

      const haystack = [
        a.title,
        a.description.id,
        a.description.en,
        a.category,
        a.url,
        ...(a.tags || []),
      ]
        .join(" ")
        .toLowerCase()

      if (textWords.length && !textWords.every((w) => haystack.includes(w))) return false
      if (hashTags.length && !hashTags.every((t) => a.tags.some((tag) => tag.toLowerCase().includes(t)))) return false
      if (tagFilter && !a.tags.some((t) => t.toLowerCase() === tagFilter)) return false
      return true
    })

    if (!term && tagFilter === null) {
      list = list.sort((a, b) => {
        const fa = favorites.has(a.id) ? 1 : 0
        const fb = favorites.has(b.id) ? 1 : 0
        if (fa !== fb) return fb - fa
        if (sortMode === "popular") return (b.popularity || 0) - (a.popularity || 0)
        if (sortMode === "newest") return b.id - a.id
        return a.title.localeCompare(b.title)
      })
    } else {
      list = list
        .map((a) => {
          let score = 0
          const t = a.title.toLowerCase()
          const d = a.description[lang].toLowerCase()
          if (t.includes(term)) score += 80
          if (d.includes(term)) score += 30
          textWords.forEach((w) => {
            if (t.includes(w)) score += 30
            if (d.includes(w)) score += 10
            if (a.tags.some((tag) => tag.toLowerCase().includes(w))) score += 15
          })
          score += Math.round((a.popularity || 0) / 5)
          if (favorites.has(a.id)) score += 50
          return { a, score }
        })
        .sort((x, y) => {
          if (sortMode === "popular") return (y.a.popularity || 0) - (x.a.popularity || 0)
          if (sortMode === "newest") return y.a.id - x.a.id
          return y.score - x.score
        })
        .map((x) => x.a)
    }

    return list
  })()

  const accentVars = ACCENT_PALETTE[accent]

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        accent,
        setAccent,
        isDark,
        toggleTheme,
        layout,
        setLayout,
        activeCategory,
        setActiveCategory,
        searchTerm,
        setSearchTerm,
        searchTarget,
        setSearchTarget,
        sortMode,
        setSortMode,
        activeTag,
        setActiveTag,
        favorites,
        toggleFavorite,
        isFavorite,
        clickCounts,
        incrementClick,
        gamification,
        addXp,
        filteredAssets,
        getDescription,
        accentVars,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}

export { getBadge, nextLevelXp, resourceAssets }
