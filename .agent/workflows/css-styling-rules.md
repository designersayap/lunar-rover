---
description: Aturan styling CSS untuk komponen Lunar
---

# CSS Styling Rules - Lunar Template

## 📋 Aturan Umum

Setiap komponen CSS harus mengikuti aturan berikut:

### 1. **Warna & Shadow** → Ambil dari `tokens.css`
- Background colors: `--base-white`, `--grey-*`, `--background-*`
- Text colors: `--content-neutral--title`, `--content-neutral--body`, `--content-neutral--caption`
- Border colors: `--stroke-neutral--neutral`, `--grey-*`
- Brand colors: `--content-brand--*`, `--background-brand--*`
- Shadows: `--shadow-md`, `--shadow--button`

### 2. **Padding, Gap, Border Radius** → Ambil dari `grid.css`
- Padding: `--padding-xs`, `--padding-sm`, `--padding-md`, `--padding-lg`, `--padding-xl`, `--padding-2xl`
- Gap: `--gap-xs`, `--gap-sm`, `--gap-md`, `--gap-lg`, `--gap-xl`, `--gap-2xl`
- Border Radius: `--border-radius-sm`, `--border-radius-md`, `--border-radius-lg`, `--border-radius-round`, `--border-radius-button`

### 3. **Button, Typography, Icon, Image Placeholder** → Ambil dari `global.css`
- Typography classes: `.h1` - `.h6`, `.body-regular`, `.body-bold`, `.caption-regular`, `.caption-bold`
- Button classes: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`
- Button sizes: `.btn-sm`, `.btn-md`, `.btn-lg`
- Icon sizes: `16px` (small), `20px` (medium), `24px` (large)
- Image placeholders: `.imagePlaceholder-1-1`, `.imagePlaceholder-4-5`, `.imagePlaceholder-16-9`, dll

---

## ❌ Hindari Hardcoded Values

**JANGAN:**
```css
.example {
    padding: 16px;              /* ❌ Hardcoded */
    gap: 8px;                   /* ❌ Hardcoded */
    border-radius: 12px;        /* ❌ Hardcoded */
    color: #F97316;             /* ❌ Hardcoded */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* ❌ Hardcoded */
}
```

**LAKUKAN:**
```css
.example {
    padding: var(--padding-md);           /* ✅ Dari grid.css */
    gap: var(--gap-xs);                   /* ✅ Dari grid.css */
    border-radius: var(--border-radius-md); /* ✅ Dari grid.css */
    color: var(--content-brand--warning); /* ✅ Dari tokens.css */
    box-shadow: var(--shadow-md);         /* ✅ Dari tokens.css */
}
```

---

## 🔍 Cara Mengecek Komponen

1. **Buka file CSS komponen** (contoh: `terra-testimony.module.css`)

2. **Cek setiap properti:**
   - Warna → Harus dari `tokens.css`
   - Padding/Gap → Harus dari `grid.css`
   - Border radius → Harus dari `grid.css`
   - Typography → Harus pakai class dari `global.css`

3. **Cari hardcoded values:**
   ```bash
   # Cari angka hardcoded (px, rem, dll)
   grep -E "[0-9]+(px|rem|em)" file.module.css
   
   # Cari warna hex hardcoded
   grep -E "#[0-9A-Fa-f]{3,6}" file.module.css
   ```

4. **Replace dengan variabel yang tepat**

---

## ✅ Checklist Sebelum Commit

- [ ] Tidak ada hardcoded colors (hex, rgb, rgba)
- [ ] Tidak ada hardcoded spacing (px untuk padding/gap/margin)
- [ ] Border radius menggunakan variabel dari grid.css
- [ ] Typography menggunakan class dari global.css
- [ ] Icon sizes sesuai dengan standar (16px/20px/24px)
- [ ] Shadow menggunakan variabel dari tokens.css
- [ ] Sudah test di mobile, tablet, dan desktop

---

## 📚 File Referensi

- **tokens.css** - Warna, shadow, semantic tokens
- **grid.css** - Spacing (padding, gap), border radius, responsive breakpoints
- **global.css** - Typography, button, image placeholder, icon classes
- **primitives.css** - Base values (space, round, colors)