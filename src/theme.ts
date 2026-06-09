import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        indigo: {
          50: { value: "#eef2ff" },
          100: { value: "#e0e7ff" },
          200: { value: "#c7d2fe" },
          300: { value: "#a5b4fc" },
          400: { value: "#818cf8" },
          500: { value: "#4f46e5" },
          600: { value: "#4338ca" },
          700: { value: "#3730a3" },
          800: { value: "#312e81" },
          900: { value: "#1e1b4b" },
          950: { value: "#0f0e2e" },
        },
      },
    },
    keyframes: {
      shimmer: {
        "0%": { backgroundPosition: "-200% center" },
        "100%": { backgroundPosition: "200% center" },
      },
      xpGlow: {
        "0%, 100%": { boxShadow: "0 0 0px transparent" },
        "50%": { boxShadow: "0 0 20px var(--chakra-colors-indigo-400)" },
      },
      fadeInUp: {
        "0%": { opacity: "0", transform: "translateY(12px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      aiShimmer: {
        "0%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0% 50%" },
      },
      aiPulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.4" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
