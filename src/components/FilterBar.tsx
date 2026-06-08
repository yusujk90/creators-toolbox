import { Box, Flex, Text, HStack } from "@chakra-ui/react"
import { LuLayoutGrid, LuList } from "react-icons/lu"
import { useApp } from "@/context/AppContext"
import { t, locales } from "@/lib/locales"
import resourceAssets from "@/data/assets"
import type { SortMode } from "@/context/AppContext"
import { OmniboxSearch } from "@/components/OmniboxSearch"

const CATEGORIES = ["All", "3D Models", "Textures", "SFX/Music", "Fonts", "Photos/Vectors", "Favorites"]

const TOP_TAGS = (() => {
  const counts: Record<string, number> = {}
  resourceAssets.forEach((a) => a.tags.forEach((tag) => (counts[tag] = (counts[tag] || 0) + 1)))
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([tag]) => tag)
})()

const ALL_TAGS = (() => {
  const s = new Set<string>()
  resourceAssets.forEach((a) => a.tags.forEach((t) => s.add(t)))
  return Array.from(s).sort()
})()

interface FilterBarProps {
  onExport: () => void
  onImport: () => void
}

export function FilterBar({ onExport, onImport }: FilterBarProps) {
  const {
    lang,
    activeCategory,
    setActiveCategory,
    sortMode,
    setSortMode,
    activeTag,
    setActiveTag,
    layout,
    setLayout,
    filteredAssets,
    accentVars,
    isDark,
  } = useApp()

  const L = locales[lang]

  const btnBase: React.CSSProperties = {
    paddingLeft: "14px",
    paddingRight: "14px",
    paddingTop: "7px",
    paddingBottom: "7px",
    borderRadius: "9999px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#d1d5db"}`,
    background: isDark ? "rgba(255,255,255,0.05)" : "#f9fafb",
    color: isDark ? "#cbd5e1" : "#374151",
  }

  const btnActive: React.CSSProperties = {
    ...btnBase,
    background: accentVars["--accent"],
    color: "white",
    border: `1px solid ${accentVars["--accent"]}`,
    boxShadow: `0 4px 12px ${accentVars["--accent"]}30`,
  }

  const iconBtnBase: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    cursor: "pointer",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#d1d5db"}`,
    background: isDark ? "rgba(255,255,255,0.05)" : "#f9fafb",
    color: isDark ? "#94a3b8" : "#6b7280",
    transition: "all 0.2s ease",
  }

  const iconBtnActive: React.CSSProperties = {
    ...iconBtnBase,
    background: accentVars["--accent"],
    color: "white",
    border: `1px solid ${accentVars["--accent"]}`,
  }

  return (
    <Box
      rounded="2xl"
      mb={8}
      p={{ base: 4, sm: 6 }}
      style={{
        background: isDark ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.95)",
        border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)",
        boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(100,116,139,0.07)",
      }}
    >
      {/* Category Buttons */}
      <Flex wrap="wrap" gap={2} mb={5}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            style={activeCategory === cat ? btnActive : btnBase}
            onClick={() => setActiveCategory(cat)}
          >
            {L.categoryLabels[cat] || cat}
          </button>
        ))}
      </Flex>

      {/* Omnibox + Controls Row */}
      <Flex direction={{ base: "column", md: "row" }} gap={3} align={{ md: "flex-end" }}>
        <Box flex={1}>
          <OmniboxSearch />
        </Box>

        {/* Sort */}
        <Box>
          <Text fontSize="xs" fontWeight="medium" mb={2} color={isDark ? "gray.400" : "gray.500"}>
            {t(lang, "sortLabel")}
          </Text>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            style={{
              height: "40px",
              paddingLeft: "14px",
              paddingRight: "14px",
              borderRadius: "9999px",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
              background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc",
              color: isDark ? "#e2e8f0" : "#374151",
              fontSize: "13px",
              fontWeight: "600",
              outline: "none",
              cursor: "pointer",
            }}
          >
            {Object.entries(L.sortOptions).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </Box>

        {/* Tag Filter */}
        <Box>
          <Text fontSize="xs" fontWeight="medium" mb={2} color={isDark ? "gray.400" : "gray.500"}>
            Tag
          </Text>
          <select
            value={activeTag}
            onChange={(e) => setActiveTag(e.target.value)}
            style={{
              height: "40px",
              paddingLeft: "14px",
              paddingRight: "14px",
              borderRadius: "9999px",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
              background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc",
              color: isDark ? "#e2e8f0" : "#374151",
              fontSize: "13px",
              fontWeight: "600",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="All">{t(lang, "tagLabel")}</option>
            {ALL_TAGS.map((tag) => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </select>
        </Box>

        {/* Layout toggles + count */}
        <Flex align="flex-end" gap={2} pb={0.5}>
          <button
            style={layout === "grid" ? iconBtnActive : iconBtnBase}
            onClick={() => setLayout("grid")}
            title="Grid mode"
          >
            <LuLayoutGrid size={16} />
          </button>
          <button
            style={layout === "list" ? iconBtnActive : iconBtnBase}
            onClick={() => setLayout("list")}
            title="List mode"
          >
            <LuList size={16} />
          </button>
        </Flex>
      </Flex>

      {/* Tag Cloud */}
      <Flex wrap="wrap" gap={2} mt={4}>
        {TOP_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? "All" : tag)}
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingTop: "4px",
              paddingBottom: "4px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background:
                activeTag === tag
                  ? accentVars["--accent"]
                  : isDark
                  ? "rgba(255,255,255,0.06)"
                  : "#f1f5f9",
              color:
                activeTag === tag
                  ? "white"
                  : isDark
                  ? "#94a3b8"
                  : "#475569",
              border:
                activeTag === tag
                  ? `1px solid ${accentVars["--accent"]}`
                  : `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
            }}
          >
            #{tag}
          </button>
        ))}
      </Flex>

      {/* Bottom row: count + export/import */}
      <Flex justify="space-between" align="center" mt={4} wrap="wrap" gap={3}>
        <Text fontSize="sm" fontWeight="medium" color={isDark ? "gray.400" : "gray.500"}>
          {t(lang, "showingAssets", { count: filteredAssets.length })}
        </Text>
        <HStack gap={2}>
          <button
            onClick={onExport}
            style={{ ...btnBase, paddingLeft: "12px", paddingRight: "12px", paddingTop: "5px", paddingBottom: "5px", fontSize: "12px" }}
          >
            {t(lang, "exportFavorites")}
          </button>
          <button
            onClick={onImport}
            style={{ ...btnBase, paddingLeft: "12px", paddingRight: "12px", paddingTop: "5px", paddingBottom: "5px", fontSize: "12px" }}
          >
            {t(lang, "importFavorites")}
          </button>
        </HStack>
      </Flex>
    </Box>
  )
}
