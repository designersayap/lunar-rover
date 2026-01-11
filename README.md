# Lunar: Page Builder & Template Generator

A powerful **Visual Page Builder** built with **Next.js 15**, designed to create, stage, and export production-ready landing pages.

## 🚀 Key Features

- **Visual Editor**: Drag-and-drop canvas with inline text editing and real-time property updates.
- **Component Library**: A curated set of high-quality UI blocks (Headers, Heroes, Features, Testimonials).
- **Theming Engine**: Instant theme switching (`Krim Ekonomi`, `Milku`, etc.) via CSS variable swaps.
- **Staging Environment**: Generate live preview links (`/staging/[name]`) to share your work-in-progress.
- **Production Export**: Export your page as a standalone Next.js project zip file, clean and ready to deploy.

## ✨ Latest Updates (v1.1 - Interaction Polish)

We've refined the builder experience to be smoother and more intuitive:
- **Smart Selection**: Clicking the empty canvas now auto-deselects components, while protecting active overlays from accidental closure.
- **Precision Positioning**: Builder controls now maintain a perfect `4px` gap from your component, adapting intelligently to screen edges (top/bottom flip).
- **Unified Design**: The `BuilderButton` overlay has been rebuilt to match the standard design system, ensuring a consistent editing experience across all component types.

## 🛠️ Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Architecture

The project is strictly organized to separate the **Builder Core** from the **Content**.

```text
lunar/
├── app/
│   ├── foundation/               # 🎨 Design System (The "Truth")
│   │   ├── tokens.css            # Semantic design tokens (Colors, Spacing)
│   │   ├── global.css            # Base typography & UI utilities
│   │   ├── grid.css              # Responsive Grid System
│   │   └── accent-color.css      # Theme accent handling
│   │
│   ├── page-builder/             # ⚙️ The Application Core
│   │   ├── content/              # Sidebar Configuration
│   │   ├── utils/                # Logic (Export, Staging, Drag & Drop)
│   │   ├── canvas.js             # The main editor workspace
│   │   └── ...                   # Toolbars, Popovers, UI controls
│   │
│   ├── templates/                # 🧱 The Components (Building Blocks)
│   │   ├── header/, terra/       # Component Categories
│   │   ├── content/data.js       # DEFAULT DATA (Single Source of Truth)
│   │   └── ...
│   │
│   ├── staging/                  # 🎭 Generated Staging Pages
│   └── api/                      # Backend routes for File I/O (Export/Staging)
│
├── public/
│   └── themes/                   # 🌗 CSS Theme Definitions
└── ...
```

## 🧩 Creating Components

We use a specific architecture to ensure components work in the Builder, Staging, and Export environments.

> **Read the detailed guide:** [Component Guidelines](app/templates/component-guidelines.md)

### Core Primitives
Do not use standard HTML elements for editable content. Use our "Builder" primitives:

- **`BuilderText`**: For editable headings, paragraphs, and spans. Supports bolding (`Cmd+B`) and prevents double-escaping.
- **`BuilderButton`**: For buttons and links. Handles variants (`primary`, `ghost`, etc.) and interactions (Dialog triggers).
- **`BuilderImage`**: For images. Supports uploading, replacement, and linking.

## 🎨 Theming System

Themes are defined as simple CSS files in `public/themes/`.

1.  **Structure**: A theme file overrides CSS variables defined in `foundation/tokens.css`.
2.  **Application**: The Page Builder dynamically swaps the `<link id="theme-stylesheet">` href to preview themes instantly.
3.  **Persistance**: The selected theme path is passed to Staging and Export functions to ensure consistency.

## 🎭 Staging & Export

### Staging
The staging feature (`/api/staging-preview`) creates a real Next.js route under `app/staging/[name]`.
- Generates a physical `page.js` file implementing the selected components.
- Injects a `useEffect` to apply the current theme.
- Enables interactivity validation before export.

### Export
The export engine (`utils/export-nextjs.js`) bundles your page into a ZIP file.
- **Dependency Tracing**: Scans imports to bundle only used components.
- **Asset Bundling**: Downloads and packages external images into `public/assets`.
- **Clean Output**: Generates a clean `package.json` and folder structure ready for immediate deployment.

## 💻 Tech Stack

-   **Next.js 15** (App Router)
-   **React 19**
-   **CSS Modules** (Scoped styling)
-   **Heroicons** (Iconography)

## 🏗️ Builder Components Usage

Here is a breakdown of the specific **Builder Primitives** used within our template library. Use this as a reference when creating or modifying components.

| Template Component | Builder Components Used |
| :--- | :--- |
| **Feature** | |
| `feature-image-left.js` | `BuilderText`, `BuilderButton`, `BuilderImage` |
| `feature-image-right.js` | `BuilderText`, `BuilderButton`, `BuilderImage` |
| **Media** | |
| `media-4-3.js` | `BuilderImage`, `BuilderSection` |
| `media-5-4.js` | `BuilderImage`, `BuilderSection` |
| `media-16-9.js` | `BuilderImage`, `BuilderSection` |
| `media-21-9.js` | `BuilderImage`, `BuilderSection` |
| **Dialog** | |
| `dialog-item-list.js` | `BuilderImage`, `BuilderLink` |
| `dialog-accordion.js` | `BuilderText` |
| `dialog-section.js` | *(Uses BuilderSection via internal logic)* |
| **Header** | |
| `header-section.js` | `BuilderButton`, `BuilderText` |
| **Navigation** | |
| `navigation-*.js` | `BuilderButton` |
| **Terra** | |
| `terra-banner-hero.js` | `BuilderText`, `BuilderButton`, `BuilderImage` |
| `terra-footer.js` | `BuilderText`, `BuilderLink` |
| `terra-testimony.js` | `BuilderText`, `BuilderImage` |
| **Other** | |
| `osm-banner.js` | `BuilderText` |
| `floating-action-button.js` | `BuilderButton` |

### Available Builder Utilities

- **`BuilderButton`**: Robust button component. Handles links, dialog triggers, icons, and variants.
- **`BuilderText`**: Inline editable text area. Supports formatting and seamless integration.
- **`BuilderImage`**: Wrapper for images with upload/replacement controls and link capabilities.
- **`BuilderLink`**: Generic wrapper to turn any content into a link.
- **`BuilderSection`**: Structural component for managing section-level settings (backgrounds, ID, visibility).
- **`ScrollGroup`**: specialized component for creating scroll effects (sticky, stacked).
