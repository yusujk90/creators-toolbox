import { GoogleGenerativeAI } from "@google/generative-ai"
import { SEARCH_SOURCES } from "@/lib/searchSources"
import type { Lang } from "@/data/assets"

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string

let genAI: GoogleGenerativeAI | null = null

function getClient(): GoogleGenerativeAI {
  if (!genAI) {
    if (!API_KEY) {
      const err = new Error("VITE_GEMINI_API_KEY is not configured")
      console.error("[Gemini] Init error:", err)
      throw err
    }
    genAI = new GoogleGenerativeAI(API_KEY)
  }
  return genAI
}

const SOURCE_CATALOG = SEARCH_SOURCES.filter((s) => s.id !== "internal" && s.id !== "auto")
  .map((s) => `- id: "${s.id}" | label: ${s.label} | group: ${s.group}`)
  .join("\n")

function buildPrompt(query: string, lang: Lang): string {
  const langName = lang === "id" ? "Bahasa Indonesia" : "English"
  return `You are an AI assistant that helps creative professionals find the best external asset source for their search query.

Available external sources:
${SOURCE_CATALOG}

The user's search query is: "${query}"

Analyze the query and determine which ONE external source from the list above is the BEST match for this search. Consider the asset type (3D, 2D, audio, textures, fonts, icons, etc.) and the source's specialty.

Respond in ${langName}. Reply ONLY with a valid JSON object and nothing else:
{"sourceId": "<the id of the best matching source>", "reason": "<brief reason in ${langName}>"}`
}

export interface AiRoutingResult {
  sourceId: string
  reason: string
}

const FALLBACK: AiRoutingResult = {
  sourceId: "itchio",
  reason: "Fallback to Itch.io",
}

export async function analyzeAndRoute(
  query: string,
  lang: Lang,
  signal?: AbortSignal
): Promise<AiRoutingResult> {
  let client: GoogleGenerativeAI
  try {
    client = getClient()
  } catch (err) {
    console.error("[Gemini] Failed to initialize client:", err)
    throw err
  }

  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" })

  try {
    console.log("[Gemini] Sending request for query:", query)

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: buildPrompt(query, lang) }] }],
    })

    if (signal?.aborted) throw new DOMException("Aborted", "AbortError")

    const text = result.response.text().trim()
    console.log("[Gemini] Raw response:", text)

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.warn("[Gemini] No JSON found in response, using fallback")
      return FALLBACK
    }

    const parsed = JSON.parse(jsonMatch[0]) as AiRoutingResult
    const validIds = SEARCH_SOURCES.map((s) => s.id)
    if (validIds.includes(parsed.sourceId)) {
      console.log("[Gemini] Routed to:", parsed.sourceId, "—", parsed.reason)
      return parsed
    }

    console.warn("[Gemini] Unknown sourceId:", parsed.sourceId, "— using fallback")
    return FALLBACK
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err
    console.error("[Gemini] Request failed:", err)
    throw err
  }
}
