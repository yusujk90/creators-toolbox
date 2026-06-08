import { useState, useRef, useCallback } from "react"
import { Box, Flex, Input, Text } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { LuSearch, LuExternalLink } from "react-icons/lu"
import { useApp } from "@/context/AppContext"
import { t } from "@/lib/locales"
import { SEARCH_SOURCES, SEARCH_GROUPS, getSourceById, isExternalSource } from "@/lib/searchSources"

export function OmniboxSearch() {
  const {
    lang,
    searchTerm,
    setSearchTerm,
    searchTarget,
    setSearchTarget,
    accentVars,
    isDark,
  } = useApp()

  const [localQuery, setLocalQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isExternal = isExternalSource(searchTarget)
  const activeSource = getSourceById(searchTarget)

  const placeholder = isExternal
    ? t(lang, "omniboxPlaceholderExternal").replace("{site}", activeSource?.label ?? "")
    : t(lang, "omniboxPlaceholderInternal")

  const handleExecute = useCallback(() => {
    const q = localQuery.trim()
    if (!q) return

    if (isExternal) {
      const url = activeSource?.buildUrl(q)
      if (url) window.open(url, "_blank", "noopener,noreferrer")
    } else {
      setSearchTerm(q)
    }
  }, [localQuery, isExternal, activeSource, setSearchTerm])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleExecute()
    },
    [handleExecute]
  )

  const handleTargetChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newTarget = e.target.value
      setSearchTarget(newTarget)
      setLocalQuery("")
      if (!isExternalSource(newTarget)) {
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
      if (!isExternal) {
        setSearchTerm(val)
      }
    },
    [isExternal, setSearchTerm]
  )

  const focusRingColor = accentVars["--accent"]
  const borderColor = isFocused
    ? focusRingColor
    : isDark
    ? "rgba(255,255,255,0.1)"
    : "#e2e8f0"

  const groupedSources = SEARCH_GROUPS.map((group) => ({
    group,
    sources: SEARCH_SOURCES.filter((s) => s.group === group),
  }))

  const selectStyle: React.CSSProperties = {
    height: "100%",
    paddingLeft: "14px",
    paddingRight: "10px",
    background: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
    color: isDark ? "#e2e8f0" : "#374151",
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
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${isDark ? "%2394a3b8" : "%236b7280"}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    paddingRight: "30px",
  }

  const searchBtnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    height: "100%",
    paddingLeft: "18px",
    paddingRight: "18px",
    background: accentVars["--accent"],
    color: "white",
    border: "none",
    borderTopRightRadius: "9999px",
    borderBottomRightRadius: "9999px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "700",
    flexShrink: 0,
    transition: "background 0.2s ease, box-shadow 0.2s ease",
    letterSpacing: "0.02em",
  }

  return (
    <Box>
      <Text fontSize="xs" fontWeight="medium" mb={2} color={isDark ? "gray.400" : "gray.500"}>
        {t(lang, "omniboxLabel")}
      </Text>

      {/* Unified input group container */}
      <Flex
        h="42px"
        rounded="full"
        overflow="hidden"
        style={{
          border: `1.5px solid ${borderColor}`,
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: isFocused
            ? `0 0 0 3px ${focusRingColor}20`
            : isDark
            ? "0 2px 8px rgba(0,0,0,0.2)"
            : "0 2px 8px rgba(100,116,139,0.07)",
          background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
        }}
      >
        {/* Source selector dropdown */}
        <Box as="select" style={selectStyle} value={searchTarget} onChange={handleTargetChange}>
          {groupedSources.map(({ group, sources }) => (
            <optgroup key={group} label={group}>
              {sources.map((src) => (
                <option key={src.id} value={src.id}>
                  {src.label}
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
          style={{
            background: "transparent",
            color: isDark ? "#f1f5f9" : "#0f172a",
            outline: "none",
            boxShadow: "none",
          }}
          _placeholder={{ color: isDark ? "gray.600" : "gray.400" }}
          _focus={{ boxShadow: "none", borderColor: "transparent" }}
        />

        {/* Search button */}
        <button
          style={searchBtnStyle}
          onClick={handleExecute}
          title={
            isExternal
              ? t(lang, "omniboxExternalHint")
              : t(lang, "omniboxSearchButton")
          }
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = accentVars["--accent-dark"]
            ;(e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 14px ${accentVars["--accent"]}50`
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = accentVars["--accent"]
            ;(e.currentTarget as HTMLButtonElement).style.boxShadow = "none"
          }}
        >
          <Box
            as="span"
            style={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s ease",
            }}
          >
            <Icon
              as={isExternal ? LuExternalLink : LuSearch}
              boxSize={4}
            />
          </Box>
          <Box as="span" hideBelow="sm">
            {isExternal ? t(lang, "omniboxExternalHint") : t(lang, "omniboxSearchButton")}
          </Box>
        </button>
      </Flex>

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
            ? `Akan mencari di ${activeSource?.label} — membuka tab baru`
            : `Will search on ${activeSource?.label} — opens a new tab`}
        </Text>
      )}
    </Box>
  )
}
