import { useState } from "react"
import { Box, Flex, Text, VStack, Input, Textarea, Heading } from "@chakra-ui/react"
import { LuX } from "react-icons/lu"
import { useApp } from "@/context/AppContext"
import { t } from "@/lib/locales"

const SUGGESTION_EMAIL = "suggestion@creatortoolbox.app"
const CATEGORIES = ["3D Models", "Textures", "SFX/Music", "Fonts", "Photos/Vectors"]

interface SuggestModalProps {
  open: boolean
  onClose: () => void
  showToast: (msg: string) => void
}

export function SuggestModal({ open, onClose, showToast }: SuggestModalProps) {
  const { lang, accentVars, isDark } = useApp()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("3D Models")
  const [url, setUrl] = useState("")
  const [notes, setNotes] = useState("")
  const [success, setSuccess] = useState(false)

  if (!open) return null

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 16px",
    borderRadius: "12px",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#e2e8f0"}`,
    background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc",
    color: isDark ? "#f1f5f9" : "#0f172a",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "6px",
    color: isDark ? "#94a3b8" : "#475569",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !url.trim()) return
    const subject = encodeURIComponent(`Asset Suggestion: ${title}`)
    const body = encodeURIComponent(
      `Asset Name: ${title}\nCategory: ${category}\nLink: ${url}\nNotes: ${notes || "-"}\n\nThank you!`
    )
    setSuccess(true)
    showToast(t(lang, "suggestSuccessMsg"))
    window.location.href = `mailto:${SUGGESTION_EMAIL}?subject=${subject}&body=${body}`
    setTimeout(() => {
      setSuccess(false)
      setTitle("")
      setCategory("3D Models")
      setUrl("")
      setNotes("")
      onClose()
    }, 3000)
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
        maxW="2xl"
        rounded="3xl"
        p={8}
        style={{
          background: isDark ? "#0f172a" : "white",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          animation: "fadeInUp 0.25s ease",
        }}
      >
        <Flex justify="space-between" align="flex-start" mb={6}>
          <Box>
            <Heading as="h2" fontSize="xl" fontWeight="semibold" color={isDark ? "gray.50" : "gray.900"}>
              {t(lang, "modalSuggestTitle")}
            </Heading>
            <Text mt={1} fontSize="sm" color={isDark ? "gray.500" : "gray.500"}>
              {t(lang, "modalSuggestDesc")}
            </Text>
          </Box>
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

        {success ? (
          <Box
            p={5}
            rounded="2xl"
            textAlign="center"
            style={{
              background: isDark ? "rgba(16,185,129,0.1)" : "#ecfdf5",
              border: `1px solid ${isDark ? "rgba(16,185,129,0.2)" : "#a7f3d0"}`,
            }}
          >
            <Text fontSize="sm" fontWeight="medium" color={isDark ? "#6ee7b7" : "#065f46"}>
              {t(lang, "suggestSuccessMsg")}
            </Text>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>
              <Box
                display="grid"
                gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr" }}
                gap={4}
                w="full"
              >
                <Box>
                  <label style={labelStyle}>{t(lang, "labelAssetName")}</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Free3D"
                    style={inputStyle}
                    required
                  />
                </Box>
                <Box>
                  <label style={labelStyle}>{t(lang, "labelCategory")}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    required
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Box>
              </Box>

              <Box w="full">
                <label style={labelStyle}>{t(lang, "labelLink")}</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  style={inputStyle}
                  required
                />
              </Box>

              <Box w="full">
                <label style={labelStyle}>{t(lang, "labelNotes")}</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder={lang === "id" ? "Kenapa aset ini penting untuk kreator?" : "Why should this asset be included?"}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
                />
              </Box>

              <Flex gap={3} w="full" justify="flex-end">
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "9999px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    background: "transparent",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#e2e8f0"}`,
                    color: isDark ? "#94a3b8" : "#64748b",
                  }}
                >
                  {t(lang, "suggestCancel")}
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 24px",
                    borderRadius: "9999px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    border: "none",
                    background: `linear-gradient(135deg, ${accentVars["--accent"]}, ${accentVars["--accent-dark"]})`,
                    color: "white",
                    boxShadow: `0 4px 14px ${accentVars["--accent"]}40`,
                  }}
                >
                  {t(lang, "suggestSubmit")}
                </button>
              </Flex>
            </VStack>
          </form>
        )}
      </Box>
    </Box>
  )
}
