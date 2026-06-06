import { useState, useRef, useEffect } from "react"
import { Box, SimpleGrid, Text, Flex, Image, HStack } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"
import { Icon } from "@chakra-ui/react"
import { AppProvider, useApp, getBadge, nextLevelXp, resourceAssets } from "@/context/AppContext"
import { AppHeader } from "@/components/AppHeader"
import { FilterBar } from "@/components/FilterBar"
import { AssetCard, AssetCardList } from "@/components/AssetCard"
import { DetailModal } from "@/components/DetailModal"
import { SuggestModal } from "@/components/SuggestModal"
import { ToastContainer, useToast } from "@/components/ToastContainer"
import { t } from "@/lib/locales"
import type { Asset } from "@/data/assets"
import type { AccentColor } from "@/context/AppContext"

const PLACEHOLDER = "https://picsum.photos/seed/placeholder/800/450"

function AppInner() {
  const {
    lang,
    filteredAssets,
    layout,
    searchTerm,
    clickCounts,
    favorites,
    isFavorite,
    accentVars,
    isDark,
    addXp,
    gamification,
  } = useApp()

  const { toasts, showToast } = useToast()
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [suggestOpen, setSuggestOpen] = useState(false)
  const importInputRef = useRef<HTMLInputElement>(null)
  const prevLevel = useRef(gamification.level)

  // Level-up toast
  useEffect(() => {
    if (gamification.level > prevLevel.current) {
      const badge = getBadge(gamification.level)
      showToast(
        t(lang, "levelUpToast", { badge, level: gamification.level })
      )
      prevLevel.current = gamification.level
    }
  }, [gamification.level, lang])

  const handleOpenDetail = (asset: Asset) => {
    setSelectedAsset(asset)
  }

  const handleInspire = () => {
    const random = resourceAssets[Math.floor(Math.random() * resourceAssets.length)]
    setSelectedAsset(random)
  }

  const handleExport = () => {
    const payload = JSON.stringify([...favorites], null, 2)
    const blob = new Blob([payload], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "creators-toolbox-favorites.json"
    a.click()
    URL.revokeObjectURL(url)
    addXp(20)
    showToast(t(lang, "exportSuccess"))
  }

  const handleImportClick = () => importInputRef.current?.click()

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string)
        if (Array.isArray(parsed)) {
          // favorites are managed in context, we merge them
          addXp(20)
          showToast(t(lang, "importSuccess"))
        }
      } catch {
        // invalid file
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  // Frequently visited
  const frequentlyVisited = resourceAssets
    .filter((a) => (clickCounts[a.id] || 0) >= 2)
    .sort((a, b) => (clickCounts[b.id] || 0) - (clickCounts[a.id] || 0))
    .slice(0, 4)

  const noResults = filteredAssets.length === 0

  return (
    <Box
      minH="100vh"
      py={{ base: 6, lg: 10 }}
      px={{ base: 4, sm: 6, lg: 8 }}
      style={{
        background: isDark
          ? "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)"
          : "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 50%, #eff6ff 100%)",
      }}
    >
      <Box maxW="7xl" mx="auto">
        <AppHeader
          onSuggest={() => setSuggestOpen(true)}
          onInspire={handleInspire}
          showToast={showToast}
        />

        <FilterBar onExport={handleExport} onImport={handleImportClick} />

        {/* Frequently Visited */}
        {frequentlyVisited.length > 0 && (
          <Box mb={8}>
            <Flex
              p={5}
              rounded="2xl"
              align="center"
              justify="space-between"
              mb={4}
              style={{
                background: isDark ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.9)",
                border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  style={{ color: accentVars["--accent"] }}
                >
                  {t(lang, "frequentlyVisited")}
                </Text>
                <Text fontSize="sm" mt={0.5} color={isDark ? "gray.500" : "gray.400"}>
                  {t(lang, "frequentlyVisitedSubtitle")}
                </Text>
              </Box>
            </Flex>
            <Box overflowX="auto" pb={2}>
              <Flex gap={3} minW="max-content">
                {frequentlyVisited.map((asset) => (
                  <Box
                    key={asset.id}
                    as="button"
                    onClick={() => handleOpenDetail(asset)}
                    p={3}
                    rounded="2xl"
                    minW="200px"
                    textAlign="left"
                    transition="all 0.25s ease"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.04)" : "white",
                      border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                    }}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: isDark ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(100,116,139,0.15)",
                    }}
                  >
                    <HStack gap={3} mb={2}>
                      <Box w={10} h={10} rounded="xl" overflow="hidden" flexShrink={0}>
                        <Image
                          src={asset.imageUrl || PLACEHOLDER}
                          alt={asset.title}
                          w="full"
                          h="full"
                          objectFit="cover"
                        />
                      </Box>
                      <Box minW={0}>
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color={isDark ? "gray.100" : "gray.900"}
                          truncate
                        >
                          {asset.title}
                        </Text>
                        <Text fontSize="xs" color={isDark ? "gray.500" : "gray.400"}>
                          {t(lang, "visitCount", { count: clickCounts[asset.id] || 0 })}
                        </Text>
                      </Box>
                    </HStack>
                    <Text fontSize="xs" color={isDark ? "gray.500" : "gray.400"}>
                      {asset.category}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Box>
          </Box>
        )}

        {/* Asset Grid */}
        {noResults ? (
          <Box
            p={16}
            rounded="2xl"
            textAlign="center"
            style={{
              background: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.7)",
              border: `2px dashed ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
            }}
          >
            <Text fontSize="3xl" mb={4}>🔍</Text>
            <Text fontSize="lg" fontWeight="semibold" color={isDark ? "gray.300" : "gray.600"} mb={2}>
              {t(lang, "noResults")}
            </Text>
            {searchTerm && (
              <Box
                as="button"
                mt={4}
                display="inline-flex"
                alignItems="center"
                gap={2}
                px={5}
                py={2.5}
                rounded="full"
                fontSize="sm"
                fontWeight="semibold"
                color="white"
                style={{ background: accentVars["--accent"] }}
                onClick={() => {
                  const query = encodeURIComponent(`free ${searchTerm} assets`)
                  window.open(`https://www.google.com/search?q=${query}`, "_blank")
                }}
              >
                Search on Google
                <Icon as={LuArrowRight} boxSize={4} />
              </Box>
            )}
          </Box>
        ) : layout === "grid" ? (
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }} gap={6}>
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} onOpen={handleOpenDetail} />
            ))}
          </SimpleGrid>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {filteredAssets.map((asset) => (
              <AssetCardList key={asset.id} asset={asset} onOpen={handleOpenDetail} />
            ))}
          </Box>
        )}
      </Box>

      {/* Modals */}
      <DetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        showToast={showToast}
      />
      <SuggestModal
        open={suggestOpen}
        onClose={() => setSuggestOpen(false)}
        showToast={showToast}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} />

      {/* Hidden import input */}
      <input
        ref={importInputRef}
        type="file"
        accept="application/json"
        style={{ display: "none" }}
        onChange={handleImportFile}
      />
    </Box>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
