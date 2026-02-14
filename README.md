# Lunar: Page Builder & Template Generator

A powerful **Visual Page Builder** built with **Next.js 16**, designed to create, stage, and export production-ready landing pages. Optimized for **Cloudflare Pages** and **Edge Runtime**.

## 🚀 Key Features

- **Visual Editor**: Drag-and-drop canvas with inline text editing and real-time property updates.
- **Cloudflare Edge Optimized**: Runs entirely on the Edge Runtime for maximum performance and low latency.
- **Component Library**: A curated set of high-quality UI blocks (Headers, Heroes, Features, Testimonials).
- **Theming Engine**: Instant theme switching (`Krim Ekonomi`, `Milku`, etc.) via CSS variable swaps.
- **Staging Environment**: Generate live preview links (`/staging/[name]`) to share your work-in-progress.
- **Production Export**: Export your page as a standalone Next.js project zip file, clean and ready to deploy.

## ✨ Latest Updates (v1.3 - Cloudflare & Refactoring)

We've modernized the architecture for the Edge:
- **Cloudflare Compatibility**: Fully optimized for `workerd` (Cloudflare Workers) runtime. Node.js specific APIs have been replaced with web-standard equivalents.
- **Custom S3 Client**: A lightweight, Edge-compatible S3 client (`app/lib/s3-manual.js`) replaces heavy AWS SDKs for faster uploads.
- **Clean Architecture**: Refactored `page-builder` components for better organization (`popover-*.js` convention).

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

### Build for Cloudflare Pages

To build the application for the Edge Runtime:

```bash
npm run pages:build
```

This uses `@cloudflare/next-on-pages` to generate the `_worker.js` output.

## 📁 Project Architecture

The project is strictly organized to separate the **Builder Core** from the **Content**.

```text
lunar/
├── app/
│   ├── foundation/               # 🎨 Design System (The "Truth")
│   │   ├── tokens.css            # Semantic design tokens (Colors, Spacing)
│   │   ├── global.css            # Base typography & UI utilities
│   │   └── ...
│   │
│   ├── page-builder/             # ⚙️ The Application Core
│   │   ├── content/              # Sidebar Configuration
│   │   ├── utils/                # Logic (Export, Staging, Drag & Drop)
│   │   ├── canvas.js             # The main editor workspace
│   │   ├── popover-components.js # Component picker
│   │   ├── popover-staging.js    # Staging deployment UI
│   │   ├── popover-theme-picker.js # Theme switcher
│   │   └── ...
│   │
│   ├── templates/                # 🧱 The Components (Building Blocks)
│   │   ├── individual files...   # Actual component implementations
│   │   └── ...
│   │
│   ├── api/                      # Backend routes (Edge Compatible)
│   │   ├── uat-preview/          # S3 Uploads (Manual Client)
│   │   └── ...
│   │
│   └── lib/
│       └── s3-manual.js          # Lightweight S3 Client for Edge
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

## ⚠️ Known Issues / Warnings

You may see the following warnings during development or build. These are known and safe to ignore:

1.  **"The 'middleware' file convention is deprecated. Please use 'proxy' instead."**
    -   *Reason*: Next.js 16 recommends `proxy.js` (Node.js runtime), but Cloudflare Pages requires the Edge Runtime. We must stick with `middleware.js` to remain compatible with the Edge.
2.  **`baseline-browser-mapping` is old**
    -   *Reason*: This is a false positive from the upstream library. We are using the absolute latest version.

## 💻 Tech Stack

-   **Next.js 16** (App Router)
-   **React 19**
-   **Cloudflare Pages** (Hosting & Edge Runtime)
-   **S3 Compatible Storage** (via Custom Client)
-   **CSS Modules** (Scoped styling)
-   **Heroicons** (Iconography)
