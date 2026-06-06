import { Box, Flex, Text, HStack, Badge, Image } from "@chakra-ui/react"
import { LuHeart, LuExternalLink, LuStar } from "react-icons/lu"
import { Icon } from "@chakra-ui/react"
import { useApp } from "@/context/AppContext"
import { t } from "@/lib/locales"
import type { Asset } from "@/data/assets"

const PLACEHOLDER = "https://picsum.photos/seed/placeholder/800/450"

interface AssetCardProps {
  asset: Asset
  onOpen: (asset: Asset) => void
}

export function AssetCard({ asset, onOpen }: AssetCardProps) {
  const { lang, isFavorite, toggleFavorite, incrementClick, addXp, accentVars, isDark } = useApp()

  const favorited = isFavorite(asset.id)
  const description = asset.description[lang]

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(asset.id)
    if (!favorited) addXp(15)
  }

  const handleVisit = (e: React.MouseEvent) => {
    e.stopPropagation()
    incrementClick(asset.id)
    window.open(asset.url, "_blank", "noopener,noreferrer")
  }

  return (
    <Box
      as="article"
      rounded="2xl"
      overflow="hidden"
      cursor="pointer"
      onClick={() => onOpen(asset)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(asset)}
      transition="all 0.3s cubic-bezier(0.4,0,0.2,1)"
      style={{
        background: isDark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.92)",
        border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)",
        boxShadow: isDark
          ? "0 4px 16px rgba(0,0,0,0.4)"
          : "0 4px 16px rgba(100,116,139,0.08)",
      }}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: isDark
          ? "0 16px 40px rgba(0,0,0,0.6)"
          : "0 16px 40px rgba(100,116,139,0.18)",
      }}
      css={{
        "&:hover .card-image": {
          transform: "scale(1.06)",
        },
        "&:focus-visible": {
          outline: `2px solid ${accentVars["--accent"]}`,
          outlineOffset: "2px",
        },
      }}
    >
      {/* Image */}
      <Box position="relative" overflow="hidden" h="48">
        <Image
          className="card-image"
          src={asset.imageUrl || PLACEHOLDER}
          alt={`Preview ${asset.title}`}
          w="full"
          h="full"
          objectFit="cover"
          transition="transform 0.5s cubic-bezier(0.4,0,0.2,1)"
          fallbackSrc={PLACEHOLDER}
        />
        {/* Top badges */}
        <Flex position="absolute" top={3} left={3} right={3} justify="space-between" align="flex-start">
          <HStack
            gap={1}
            px={2.5}
            py={1}
            rounded="full"
            style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            <Icon as={LuStar} boxSize={3} color="yellow.500" />
            <Text fontSize="xs" fontWeight="semibold" color="gray.700">
              {asset.popularity || 0}
            </Text>
          </HStack>

          <Box
            as="button"
            aria-label={favorited ? t(lang, "favoriteRemove") : t(lang, "favoriteAdd")}
            onClick={handleFavorite}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w={9}
            h={9}
            rounded="full"
            transition="all 0.25s ease"
            style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              color: favorited ? "#f43f5e" : "#6b7280",
            }}
            _hover={{
              transform: "scale(1.15)",
              bg: "rose.50",
              color: "rose.500",
            }}
          >
            <Icon
              as={LuHeart}
              boxSize={4}
              fill={favorited ? "currentColor" : "none"}
            />
          </Box>
        </Flex>
      </Box>

      {/* Content */}
      <Box p={5}>
        <Flex justify="space-between" align="flex-start" gap={3} mb={3}>
          <Box minW={0} flex={1}>
            <Text
              fontWeight="semibold"
              fontSize="lg"
              color={isDark ? "gray.50" : "gray.900"}
              truncate
              transition="color 0.2s"
              _groupHover={{ color: accentVars["--accent"] }}
            >
              {asset.title}
            </Text>
          </Box>
          <Badge
            flexShrink={0}
            px={2.5}
            py={1}
            rounded="full"
            fontSize="2xs"
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
        </Flex>

        <Text
          fontSize="sm"
          color={isDark ? "gray.400" : "gray.500"}
          lineHeight="tall"
          lineClamp={3}
          mb={4}
        >
          {description}
        </Text>

        {/* Tags */}
        <Flex wrap="wrap" gap={1.5} mb={4}>
          {asset.tags.slice(0, 4).map((tag) => (
            <Text
              key={tag}
              as="span"
              fontSize="xs"
              fontWeight="medium"
              px={2.5}
              py={0.5}
              rounded="full"
              bg={isDark ? "gray.800" : "gray.100"}
              color={isDark ? "gray.400" : "gray.600"}
            >
              #{tag}
            </Text>
          ))}
        </Flex>

        {/* Visit Button */}
        <Box
          as="button"
          onClick={handleVisit}
          display="inline-flex"
          alignItems="center"
          gap={1.5}
          px={4}
          py={2}
          rounded="full"
          fontSize="sm"
          fontWeight="semibold"
          color="white"
          transition="all 0.25s ease"
          style={{
            background: `linear-gradient(135deg, ${accentVars["--accent"]}, ${accentVars["--accent-dark"]})`,
            boxShadow: `0 4px 12px ${accentVars["--accent"]}40`,
          }}
          _hover={{
            transform: "translateY(-1px)",
            boxShadow: `0 6px 16px ${accentVars["--accent"]}50`,
          }}
          _active={{ transform: "scale(0.97)" }}
        >
          {t(lang, "visitSite")}
          <Icon as={LuExternalLink} boxSize={3.5} />
        </Box>
      </Box>
    </Box>
  )
}

export function AssetCardList({ asset, onOpen }: AssetCardProps) {
  const { lang, isFavorite, toggleFavorite, incrementClick, addXp, accentVars, isDark } = useApp()

  const favorited = isFavorite(asset.id)

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(asset.id)
    if (!favorited) addXp(15)
  }

  const handleVisit = (e: React.MouseEvent) => {
    e.stopPropagation()
    incrementClick(asset.id)
    window.open(asset.url, "_blank", "noopener,noreferrer")
  }

  return (
    <Flex
      as="article"
      align="center"
      gap={4}
      p={3}
      rounded="xl"
      cursor="pointer"
      onClick={() => onOpen(asset)}
      transition="all 0.25s ease"
      style={{
        background: isDark ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.9)",
        border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)",
      }}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: isDark ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(100,116,139,0.14)",
      }}
    >
      <Box
        w={16}
        h={16}
        rounded="lg"
        overflow="hidden"
        flexShrink={0}
        bg={isDark ? "gray.800" : "gray.100"}
      >
        <Image
          src={asset.imageUrl || PLACEHOLDER}
          alt={asset.title}
          w="full"
          h="full"
          objectFit="cover"
          fallbackSrc={PLACEHOLDER}
        />
      </Box>

      <Box flex={1} minW={0}>
        <Text fontWeight="semibold" fontSize="sm" color={isDark ? "gray.50" : "gray.900"} truncate>
          {asset.title}
        </Text>
        <Text fontSize="xs" color={isDark ? "gray.500" : "gray.400"}>
          {asset.category}
        </Text>
      </Box>

      <Flex align="center" gap={2} flexShrink={0}>
        <Box
          as="button"
          onClick={handleVisit}
          display="inline-flex"
          alignItems="center"
          gap={1}
          px={3}
          py={1.5}
          rounded="lg"
          fontSize="xs"
          fontWeight="semibold"
          color="white"
          style={{ background: accentVars["--accent"] }}
          _hover={{ opacity: 0.85 }}
          transition="opacity 0.2s"
        >
          {t(lang, "visitSite")}
          <Icon as={LuExternalLink} boxSize={3} />
        </Box>
        <Box
          as="button"
          onClick={handleFavorite}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={8}
          h={8}
          rounded="lg"
          transition="all 0.2s"
          style={{
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e5e7eb",
            background: favorited ? "#fff1f2" : "transparent",
            color: favorited ? "#f43f5e" : isDark ? "#9ca3af" : "#6b7280",
          }}
          _hover={{ color: "rose.500", bg: "rose.50" }}
        >
          <Icon as={LuHeart} boxSize={4} fill={favorited ? "currentColor" : "none"} />
        </Box>
      </Flex>
    </Flex>
  )
}
