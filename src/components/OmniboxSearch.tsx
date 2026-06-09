import { useState, useRef, useCallback } from "react"
import { Box, Flex, Input, Text, Spinner, Icon } from "@chakra-ui/react"
import { LuSearch, LuExternalLink, LuSparkles } from "react-icons/lu"
import { useApp } from "@/context/AppContext"
import { t } from "@/lib/locales"
import { SEARCH_SOURCES, SEARCH_GROUPS, getSourceById, isExternalSource, isAutoMode } from "@/lib/searchSources"
import { analyzeAndRoute } from "@/lib/gemini"
import resourceAssets from "@/data/assets"

const AI_GLOW_COLORS = {
  gradient: "linear-gradient(135deg, #6366f1, #8b5cf6, #3b82f6, #6366f1)",
  gradientAnimated: "linear-gradient(270deg, #6366f1, #8b5cf6, #3b82f6, #a855f7, #6366f1)",
  shadow: "0 0 20px rgba(99,102,241,0.35), 0 0 60px rgba(139,92,246,0.15)",
  shadowIntense: "0 0 24px rgba(99,102,241,0.5), 0 0 80px rgba(139,92,246,0.25)",
}

export function OmniboxSearch() {
  const {
    lang,
    searchTerm,
    setSearchTerm,
    searchTarget,
    setSearchTarget,
    accentVars,
    isDark,
    aiLoading,
    setAiLoading,
  } = useApp()

  const [localQuery, setLocalQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [aiStatus, setAiStatus] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isAuto = isAutoMode(searchTarget)
  const isExternal = isExternalSource(searchTarget)
  const activeSource = getSourceById(searchTarget)

  const placeholder = isAuto
    ? t(lang, "omniboxAiPlaceholder")
    : isExternal
    ? t(lang, "omniboxPlaceholderExternal").replace("{site}", activeSource?.label ?? "")
    : t(lang, "omniboxPlaceholderInternal")

  const checkInternalMatch = useCallback((query: string): boolean => {
    const q = query.trim().toLowerCase()
    if (!q) return false
    return resourceAssets.some((a) => {
      const haystack = [a.title, a.description.id, a.description.en, a.category, ...(a.tags || [])]
        .join(" ")
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [])

  const handleAutoSearch = useCallback(async () => {
    const q = localQuery.trim()
    if (!q || aiLoading) return

    if (checkInternalMatch(q)) {
      setSearchTerm(q)
      return
    }

    const controller = new AbortController()
    abortRef.current = controller
    setAiLoading(true)
    setAiStatus(t(lang, "omniboxAiAnalyzing"))

    try {
      const result = await analyzeAndRoute(q, lang, controller.signal)
      const source = getSourceById(result.sourceId)
      if (source && source.buildUrl(q)) {
        setAiStatus(t(lang, "omniboxAiRedirecting").replace("{site}", source.label))
        setTimeout(() => {
          window.open(source.buildUrl(q)!, "_blank", "noopener,noreferrer")
        }, 600)
      } else {
        setSearchTerm(q)
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return
      setAiStatus(t(lang, "omniboxAiError"))
    } finally {
      setTimeout(() => {
        setAiLoading(false)
        setAiStatus(null)
        abortRef.current = null
      }, 800)
    }
  }, [localQuery, aiLoading, lang, checkInternalMatch, setSearchTerm, setAiLoading])

  const handleExecute = useCallback(() => {
    const q = localQuery.trim()
    if (!q || aiLoading) return

    if (isAuto) {
      handleAutoSearch()
    } else if (isExternal) {
      const url = activeSource?.buildUrl(q)
      if (url) window.open(url, "_blank", "noopener,noreferrer")
    } else {
      setSearchTerm(q)
    }
  }, [localQuery, aiLoading, isAuto, isExternal, activeSource, setSearchTerm, handleAutoSearch])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleExecute()
    },
    [handleExecute]
  )

  const handleTargetChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newTarget = e.target.value
      if (abortRef.current) abortRef.current.abort()
      setSearchTarget(newTarget)
      setLocalQuery("")
      setAiStatus(null)
      if (!isExternalSource(newTarget) && !isAutoMode(newTarget)) {
        setSearchTerm("")
      }
      inputRef.current?.focus()
    },
    [setSearchTarget, setSearchTerm]
  )

  const handleInternalQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setLocalQuery(val)
      if (!isExternal && !isAuto) {
        setSearchTerm(val)
      }
    },
    [isExternal, isAuto, setSearchTerm]
  )

  const borderColor = (() => {
    if (isAuto && isFocused) return "transparent"
    if (isAuto) return isDark ? "rgba(139,92,246,0.4)" : "rgba(99,102,241,0.35)"
    if (isFocused) return accentVars["--accent"]
    return isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"
  })()

  const boxShadow = (() => {
    if (isAuto && isFocused) return AI_GLOW_COLORS.shadowIntense
    if (isAuto) return AI_GLOW_COLORS.shadow
    if (isFocused) return `0 0 0 3px ${accentVars["--accent"]}20`
    return isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(100,116,139,0.07)"
  })()

  const groupedSources = SEARCH_GROUPS.map((group) => ({
    group,
    sources: SEARCH_SOURCES.filter((s) => s.group === group),
  }))

  const selectStyle: React.CSSProperties = {
    height: "100%",
    paddingLeft: "14px",
    paddingRight: "30px",
    background: isAuto
      ? isDark
        ? "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))"
        : "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))"
      : isDark
      ? "rgba(255,255,255,0.06)"
      : "#f1f5f9",
    color: isAuto ? (isDark ? "#a5b4fc" : "#6366f1") : isDark ? "#e2e8f0" : "#374151",
    fontSize: "13px",
    fontWeight: "600",
    outline: "none",
    cursor: "pointer",
    border: "none",
    borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
    borderTopLeftRadius: "9999px",
    borderBottomLeftRadius: "9999px",
    maxWidth: "180px",
    minWidth: "140px",
    flexShrink: 0,
    appearance: "none",
    WebkitAppearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${isAuto ? (isDark ? "%23a5b4fc" : "%236366f1") : isDark ? "%2394a3b8" : "%236b7280"}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    transition: "background 0.3s ease, color 0.3s ease",
  }

  const btnBg = isAuto
    ? AI_GLOW_COLORS.gradient
    : accentVars["--accent"]

  const btnBgHover = isAuto
    ? "linear-gradient(135deg, #4f46e5, #7c3aed, #2563eb)"
    : accentVars["--accent-dark"]

  const searchBtnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    height: "100%",
    paddingLeft: "18px",
    paddingRight: "18px",
    background: btnBg,
    backgroundSize: isAuto ? "200% 200%" : "100%",
    color: "white",
    border: "none",
    borderTopRightRadius: "9999px",
    borderBottomRightRadius: "9999px",
    cursor: aiLoading ? "wait" : "pointer",
    fontSize: "13px",
    fontWeight: "700",
    flexShrink: 0,
    transition: "background 0.3s ease, box-shadow 0.3s ease, opacity 0.2s ease",
    letterSpacing: "0.02em",
    opacity: aiLoading ? 0.75 : 1,
  }

  return (
    <Box>
      <Text fontSize="xs" fontWeight="medium" mb={2} color={isDark ? "gray.400" : "gray.500"}>
        {t(lang, "omniboxLabel")}
      </Text>

      {/* Outer glow wrapper for AI mode */}
      <Box
        position="relative"
        rounded="full"
        {...(isAuto && {
          _before: {
            content: '""',
            position: "absolute",
            inset: "-2px",
            borderRadius: "full",
            background: AI_GLOW_COLORS.gradientAnimated,
            backgroundSize: "300% 300%",
            animation: "aiShimmer 3s linear infinite",
            zIndex: 0,
            opacity: isFocused ? 1 : 0.5,
            transition: "opacity 0.3s ease",
          },
        })}
      >
        <Flex
          h="44px"
          rounded="full"
          overflow="hidden"
          position="relative"
          zIndex={1}
          style={{
            border: `1.5px solid ${borderColor}`,
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            boxShadow,
            background: isDark ? "rgba(15,23,42,0.95)" : "#fff",
          }}
        >
          {/* Source selector dropdown */}
          <Box as="select" style={selectStyle} value={searchTarget} onChange={handleTargetChange}>
            {groupedSources.map(({ group, sources }) => (
              <optgroup key={group} label={group}>
                {sources.map((src) => (
                  <option key={src.id} value={src.id}>
                    {isAutoMode(src.id) ? `\u2728 ${src.label}` : src.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </Box>

          {/* Text input */}
          <Input
            ref={inputRef}
            flex={1}
            value={localQuery}
            onChange={handleInternalQueryChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            border="none"
            rounded="none"
            h="full"
            px={4}
            fontSize="sm"
            disabled={aiLoading}
            style={{
              background: "transparent",
              color: isDark ? "#f1f5f9" : "#0f172a",
              outline: "none",
              boxShadow: "none",
              transition: "opacity 0.2s ease",
              opacity: aiLoading ? 0.6 : 1,
            }}
            _placeholder={{
              color: isAuto ? (isDark ? "purple.400" : "indigo.400") : isDark ? "gray.600" : "gray.400",
            }}
            _focus={{ boxShadow: "none", borderColor: "transparent" }}
          />

          {/* Search/AI button */}
          <button
            style={searchBtnStyle}
            onClick={handleExecute}
            disabled={aiLoading}
            title={
              isAuto
                ? t(lang, "omniboxAiButton")
                : isExternal
                ? t(lang, "omniboxExternalHint")
                : t(lang, "omniboxSearchButton")
            }
            onMouseEnter={(e) => {
              if (aiLoading) return
              ;(e.currentTarget as HTMLButtonElement).style.background = btnBgHover
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = isAuto
                ? AI_GLOW_COLORS.shadowIntense
                : `0 4px 14px ${accentVars["--accent"]}50`
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.background = btnBg
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = "none"
            }}
          >
            {aiLoading ? (
              <Spinner size="sm" color="white" />
            ) : (
              <Box as="span" style={{ display: "flex", alignItems: "center" }}>
                <Icon
                  as={isAuto ? LuSparkles : isExternal ? LuExternalLink : LuSearch}
                  boxSize={4}
                />
              </Box>
            )}
            <Box as="span" hideBelow="sm">
              {aiLoading
                ? t(lang, "omniboxAiAnalyzing")
                : isAuto
                ? t(lang, "omniboxAiButton")
                : isExternal
                ? t(lang, "omniboxExternalHint")
                : t(lang, "omniboxSearchButton")}
            </Box>
          </button>
        </Flex>
      </Box>

      {/* AI status hint (analyzing / redirecting / error) */}
      {isAuto && aiStatus && (
        <Flex align="center" gap={1.5} mt={1.5} ml={4}>
          <Icon as={LuSparkles} boxSize={3} color="purple.400" />
          <Text
            fontSize="2xs"
            fontWeight="medium"
            color={isDark ? "purple.300" : "indigo.500"}
            style={{
              animation: aiLoading ? "aiPulse 1.5s ease-in-out infinite" : "none",
              transition: "opacity 0.3s ease",
            }}
          >
            {aiStatus}
          </Text>
        </Flex>
      )}

      {/* AI powered badge when idle */}
      {isAuto && !aiStatus && !aiLoading && (
        <Flex align="center" gap={1.5} mt={1.5} ml={4}>
          <Icon as={LuSparkles} boxSize={3} color="purple.400" />
          <Text
            fontSize="2xs"
            fontWeight="semibold"
            style={{
              background: "linear-gradient(90deg, #6366f1, #8b5cf6, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t(lang, "omniboxAiPoweredBy")}
          </Text>
        </Flex>
      )}

      {/* Contextual hint for external mode */}
      {isExternal && (
        <Text
          fontSize="2xs"
          mt={1.5}
          ml={4}
          color={isDark ? "gray.600" : "gray.400"}
          style={{ transition: "opacity 0.2s ease" }}
        >
          {lang === "id"
            ? `Akan mencari di ${activeSource?.label} \u2014 membuka tab baru`
            : `Will search on ${activeSource?.label} \u2014 opens a new tab`}
        </Text>
      )}
    </Box>
  )
}
