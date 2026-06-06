import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Badge,
  Image,
  Heading,
} from "@chakra-ui/react"
import { LuX, LuExternalLink, LuCopy, LuHeart, LuTriangleAlert } from "react-icons/lu"
import { Icon } from "@chakra-ui/react"
import { useApp } from "@/context/AppContext"
import { t } from "@/lib/locales"
import type { Asset } from "@/data/assets"

const PLACEHOLDER = "https://picsum.photos/seed/placeholder/800/450"
const SUGGESTION_EMAIL = "suggestion@creatortoolbox.app"

interface DetailModalProps {
  asset: Asset | null
  onClose: () => void
  showToast: (msg: string) => void
}

export function DetailModal({ asset, onClose, showToast }: DetailModalProps) {
  const { lang, isFavorite, toggleFavorite, incrementClick, addXp, accentVars, isDark, setActiveTag } = useApp()

  if (!asset) return null

  const favorited = isFavorite(asset.id)
  const description = asset.description[lang]

  const handleFavorite = () => {
    const wasFav = favorited
    toggleFavorite(asset.id)
    if (!wasFav) {
      addXp(15)
      showToast(t(lang, "toastFavoriteAdded"))
    } else {
      showToast(t(lang, "toastFavoriteRemoved"))
    }
  }

  const handleVisit = () => {
    incrementClick(asset.id)
    window.open(asset.url, "_blank", "noopener,noreferrer")
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(asset.url)
      .then(() => showToast(t(lang, "copiedLink")))
      .catch(() => showToast(t(lang, "copyFailed")))
  }

  const handleBrokenLink = () => {
    const subject = encodeURIComponent(`Broken Link: ${asset.title}`)
    const body = encodeURIComponent(`Asset: ${asset.title}\nURL: ${asset.url}\n\nPlease check this link.`)
    window.location.href = `mailto:${SUGGESTION_EMAIL}?subject=${subject}&body=${body}`
  }

  const handleTagClick = (tag: string) => {
    setActiveTag(tag)
    onClose()
  }

  const btnStyle = (variant: "primary" | "secondary" | "danger"): React.CSSProperties => {
    if (variant === "primary")
      return {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        width: "100%",
        padding: "10px 20px",
        borderRadius: "9999px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        border: "none",
        background: `linear-gradient(135deg, ${accentVars["--accent"]}, ${accentVars["--accent-dark"]})`,
        color: "white",
        boxShadow: `0 4px 14px ${accentVars["--accent"]}40`,
        transition: "all 0.2s ease",
      }
    if (variant === "danger")
      return {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        width: "100%",
        padding: "10px 20px",
        borderRadius: "9999px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        background: "transparent",
        border: isDark ? "1px solid rgba(244,63,94,0.3)" : "1px solid #fecdd3",
        color: isDark ? "#fda4af" : "#e11d48",
        transition: "all 0.2s ease",
      }
    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      width: "100%",
      padding: "10px 20px",
      borderRadius: "9999px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      background: "transparent",
      border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #e2e8f0",
      color: isDark ? "#cbd5e1" : "#374151",
      transition: "all 0.2s ease",
    }
  }

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={50}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <Box
        w="full"
        maxW="3xl"
        rounded="3xl"
        overflow="hidden"
        style={{
          background: isDark ? "#0f172a" : "white",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          animation: "fadeInUp 0.25s ease",
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "1.25fr 1fr" }}
        >
          {/* Image Side */}
          <Box position="relative" minH="300px">
            <Image
              src={asset.imageUrl || PLACEHOLDER}
              alt={`Preview ${asset.title}`}
              w="full"
              h={{ base: "200px", md: "full" }}
              objectFit="cover"
              fallbackSrc={PLACEHOLDER}
            />
            <Box
              position="absolute"
              inset={0}
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
              }}
            />
          </Box>

          {/* Info Side */}
          <Flex direction="column" p={6} gap={4}>
            <Flex justify="space-between" align="flex-start">
              <Box />
              <button
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "9999px",
                  background: isDark ? "rgba(255,255,255,0.08)" : "#f1f5f9",
                  border: "none",
                  cursor: "pointer",
                  color: isDark ? "#94a3b8" : "#64748b",
                  flexShrink: 0,
                }}
              >
                <LuX size={16} />
              </button>
            </Flex>

            <Box>
              <Badge
                px={3}
                py={1}
                rounded="full"
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wide"
                style={{
                  background: isDark ? `${accentVars["--accent"]}20` : accentVars["--accent-light"],
                  color: isDark ? accentVars["--accent-muted"] : accentVars["--accent-dark"],
                }}
              >
                {asset.category}
              </Badge>
              <Heading
                as="h3"
                mt={2}
                fontSize="2xl"
                fontWeight="semibold"
                color={isDark ? "gray.50" : "gray.900"}
              >
                {asset.title}
              </Heading>
            </Box>

            <Text fontSize="sm" lineHeight="tall" color={isDark ? "gray.400" : "gray.500"}>
              {description}
            </Text>

            {/* Tags */}
            <Flex wrap="wrap" gap={2}>
              {asset.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: "500",
                    cursor: "pointer",
                    background: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                    color: isDark ? "#94a3b8" : "#475569",
                    border: "none",
                    transition: "all 0.2s",
                  }}
                >
                  #{tag}
                </button>
              ))}
            </Flex>

            {/* Actions */}
            <VStack gap={2} mt="auto">
              <button style={btnStyle("primary")} onClick={handleVisit}>
                <LuExternalLink size={15} />
                {t(lang, "visitSite")}
              </button>
              <button style={btnStyle("secondary")} onClick={handleCopy}>
                <LuCopy size={15} />
                {t(lang, "copyLink")}
              </button>
              <button
                style={{
                  ...btnStyle("secondary"),
                  color: favorited ? (isDark ? "#fda4af" : "#e11d48") : undefined,
                }}
                onClick={handleFavorite}
              >
                <LuHeart size={15} fill={favorited ? "currentColor" : "none"} />
                {favorited ? t(lang, "favoriteRemove") : t(lang, "favoriteAdd")}
              </button>
              <button style={btnStyle("danger")} onClick={handleBrokenLink}>
                <LuTriangleAlert size={15} />
                {t(lang, "reportBrokenLink")}
              </button>
            </VStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
