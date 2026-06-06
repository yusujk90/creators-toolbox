import { Box, Text } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

interface Toast {
  id: number
  message: string
  visible: boolean
}

interface ToastContainerProps {
  toasts: Toast[]
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <Box
      position="fixed"
      bottom={6}
      right={6}
      zIndex={100}
      display="flex"
      flexDirection="column"
      gap={2}
      pointerEvents="none"
    >
      {toasts.map((toast) => (
        <Box
          key={toast.id}
          px={4}
          py={3}
          rounded="2xl"
          fontSize="sm"
          fontWeight="medium"
          style={{
            background: "rgba(15,23,42,0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            transition: "all 0.3s ease",
            opacity: toast.visible ? 1 : 0,
            transform: toast.visible ? "translateY(0)" : "translateY(8px)",
          }}
          maxW="xs"
        >
          {toast.message}
        </Box>
      ))}
    </Box>
  )
}

let _toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string) => {
    const id = ++_toastId
    setToasts((prev) => [...prev, { id, message, visible: false }])
    requestAnimationFrame(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: true } : t))
      )
    })
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      )
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 350)
    }, 3000)
  }

  return { toasts, showToast }
}
