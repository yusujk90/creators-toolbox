import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Select,
  Badge,
} from "@chakra-ui/react"
import { LuMoon, LuSun, LuSparkles, LuZap } from "react-icons/lu"
import { Icon } from "@chakra-ui/react"
import { useApp, getBadge, nextLevelXp } from "@/context/AppContext"
import { t } from "@/lib/locales"
import type { Lang } from "@/data/assets"
import type { AccentColor } from "@/context/AppContext"

interface AppHeaderProps {
  onSuggest: () => void
  onInspire: () => void
  showToast: (msg: string) => void
}

export function AppHeader({ onSuggest, onInspire, showToast }: AppHeaderProps) {
  const {
    lang,
    setLang,
    accent,
    setAccent,
    isDark,
    toggleTheme,
    gamification,
    accentVars,
    addXp,
  } = useApp()

  const { xp, level } = gamification
  const nextXp = nextLevelXp(level)
  const badge = getBadge(level)
  const pct = Math.min(100, (xp / nextXp) * 100)

  return (
    <Box
      as="header"
      mb={8}
      rounded="3xl"
      p={{ base: 5, sm: 8 }}
      style={{
        background: isDark
          ? "rgba(15,23,42,0.85)"
          : "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
        boxShadow: isDark
          ? "0 8px 32px rgba(0,0,0,0.5)"
          : "0 8px 32px rgba(100,116,139,0.12)",
      }}
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={6}
        align={{ base: "flex-start", lg: "center" }}
        justify="space-between"
      >
        {/* Left: Title & XP */}
        <VStack align="flex-start" gap={4} flex={1} minW={0}>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="widest"
            textTransform="uppercase"
            style={{ color: accentVars["--accent"] }}
          >
            {t(lang, "headerSubtitle")}
          </Text>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl" }}
            fontWeight="semibold"
            letterSpacing="tight"
            color={isDark ? "gray.50" : "gray.900"}
            lineHeight="shorter"
          >
            The Creator&apos;s Toolbox
            <Badge
              ml={3}
              fontSize="2xs"
              fontWeight="bold"
              letterSpacing="wider"
              textTransform="uppercase"
              style={{
                background: accentVars["--accent"],
                color: "white",
              }}
              rounded="full"
              px={2}
              py={0.5}
              verticalAlign="middle"
            >
              v1.1
            </Badge>
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={isDark ? "gray.400" : "gray.500"}
            maxW="2xl"
            lineHeight="tall"
          >
            {t(lang, "headerDescription")}
          </Text>

          {/* XP Bar */}
          <Box
            w="full"
            maxW="2xl"
            rounded="2xl"
            p={4}
            style={{
              background: isDark ? "rgba(255,255,255,0.04)" : accentVars["--accent-lighter"],
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : accentVars["--accent-light"]}`,
            }}
          >
            <Flex justify="space-between" align="center" mb={3}>
              <VStack align="flex-start" gap={0.5}>
                <HStack gap={1.5}>
                  <Icon as={LuZap} boxSize={3.5} style={{ color: accentVars["--accent"] }} />
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    textTransform="uppercase"
                    style={{ color: isDark ? accentVars["--accent-muted"] : accentVars["--accent-dark"] }}
                  >
                    Level {level} — {badge}
                  </Text>
                </HStack>
                <Text fontSize="xs" color={isDark ? "gray.500" : "gray.500"}>
                  {xp} / {nextXp} XP
                </Text>
              </VStack>
              <Text fontSize="xs" fontWeight="medium" color={isDark ? "gray.500" : "gray.400"}>
                {Math.round(pct)}%
              </Text>
            </Flex>
            {/* Shimmer XP Bar */}
            <Box
              h={3}
              rounded="full"
              overflow="hidden"
              bg={isDark ? "gray.800" : "gray.200"}
            >
              <Box
                h="full"
                rounded="full"
                transition="width 0.6s cubic-bezier(0.4,0,0.2,1)"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${accentVars["--accent-dark"]}, ${accentVars["--accent"]}, ${accentVars["--accent-muted"]}, ${accentVars["--accent"]}, ${accentVars["--accent-dark"]})`,
                  backgroundSize: "200% auto",
                  animation: "shimmer 2.5s linear infinite",
                }}
              />
            </Box>
          </Box>
        </VStack>

        {/* Right: Controls */}
        <Flex
          direction={{ base: "row", sm: "row" }}
          wrap="wrap"
          gap={2}
          align="center"
          justify={{ base: "flex-start", lg: "flex-end" }}
          flexShrink={0}
        >
          <Button
            size="sm"
            variant="outline"
            rounded="full"
            onClick={onSuggest}
            borderColor={isDark ? "gray.700" : "gray.300"}
            color={isDark ? "gray.200" : "gray.700"}
            _hover={{
              borderColor: accentVars["--accent-light"],
              bg: accentVars["--accent-lighter"],
            }}
            fontWeight="semibold"
          >
            {t(lang, "suggestButton")}
          </Button>

          <Button
            size="sm"
            variant="outline"
            rounded="full"
            onClick={() => {
              onInspire()
              addXp(5)
              showToast(t(lang, "inspireToast"))
            }}
            borderColor={isDark ? "gray.700" : "gray.300"}
            color={isDark ? "gray.200" : "gray.700"}
            _hover={{
              borderColor: accentVars["--accent-light"],
              bg: accentVars["--accent-lighter"],
            }}
            fontWeight="semibold"
          >
            <Icon as={LuSparkles} mr={1} />
            {t(lang, "inspireButton")}
          </Button>

          {/* Accent Color Select */}
          <Box>
            <select
              value={accent}
              onChange={(e) => setAccent(e.target.value as AccentColor)}
              style={{
                height: "32px",
                paddingLeft: "12px",
                paddingRight: "12px",
                borderRadius: "9999px",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#d1d5db"}`,
                background: isDark ? "rgba(255,255,255,0.06)" : "#f9fafb",
                color: isDark ? "#e2e8f0" : "#374151",
                fontSize: "13px",
                fontWeight: "600",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="indigo">Indigo</option>
              <option value="emerald">Emerald</option>
              <option value="rose">Rose</option>
              <option value="amber">Amber</option>
            </select>
          </Box>

          {/* Theme Toggle */}
          <Button
            size="sm"
            variant="outline"
            rounded="full"
            onClick={() => {
              toggleTheme()
            }}
            borderColor={isDark ? "gray.700" : "gray.300"}
            color={isDark ? "gray.200" : "gray.700"}
            _hover={{
              borderColor: accentVars["--accent-light"],
              bg: accentVars["--accent-lighter"],
            }}
            fontWeight="semibold"
          >
            <Icon as={isDark ? LuSun : LuMoon} mr={1} />
            {isDark ? t(lang, "themeLight") : t(lang, "themeDark")}
          </Button>

          {/* Language Select */}
          <HStack gap={1.5}>
            <Text fontSize="xs" fontWeight="semibold" color={isDark ? "gray.500" : "gray.400"}>
              {t(lang, "langLabel")}
            </Text>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              style={{
                height: "32px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "9999px",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#d1d5db"}`,
                background: isDark ? "rgba(255,255,255,0.06)" : "#f9fafb",
                color: isDark ? "#e2e8f0" : "#374151",
                fontSize: "13px",
                fontWeight: "600",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="id">ID</option>
              <option value="en">EN</option>
            </select>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  )
}
