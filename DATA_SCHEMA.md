# Creator's Toolbox — Data schema

Each asset in `data.js` supports Indonesian and English copy.

## Recommended shape

```js
{
  id: 1,
  title: "Kenney.nl",
  category: "3D Models", // stable filter key — keep English keys
  description: {
    id: "Situs populer untuk aset game 2D dan 3D gratis...",
    en: "Popular site for free 2D and 3D game assets..."
  },
  url: "https://kenney.nl",
  imageUrl: "https://...",
  tags: ["game", "2D", "3D", "free", "assets"]
}
```

## Optional fields

| Field | Type | Notes |
|-------|------|--------|
| `title` | `string` \| `{ id, en }` | Brand names can stay a single string |
| `category` | `string` \| `{ key, id?, en? }` | `key` must match filter buttons (`3D Models`, `Textures`, …) |
| `description` | `string` \| `{ id, en }` | Plain strings are auto-wrapped on export |
| `descriptionEn` | `string` | Legacy alias; `getAssetField` also reads this |
| `popularity` | `number` | Optional sort weight |

## Migration steps

1. Pick one asset and replace `description: "..."` with `description: { id: "...", en: "..." }`.
2. Reload the app and switch **EN** — cards and the detail modal should show the English text.
3. Repeat per asset; remove reliance on auto-translation once copy is reviewed.
4. Keep `category` as the English key so filters stay stable; use `locales` in `index.html` for button labels.

## Database (Notion / Supabase / Firebase)

Store one row per asset with JSON columns:

```json
{
  "description": { "id": "...", "en": "..." },
  "category_key": "3D Models"
}
```

Export to `data.js` or fetch from an API and keep the same field names the UI expects.
