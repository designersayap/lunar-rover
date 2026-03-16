<div align="center">
  <h1>🌑 Lunar Page Builder</h1>
  <p><strong>A Next.js 16 Visual Page Builder and Component Engine optimized for Cloudflare Edge.</strong></p>
  
  <p>
    <a href="#-features">Features</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-component-guidelines">Components</a>
  </p>
</div>

<br />

Lunar is a powerful, drag-and-drop visual page builder designed to create, stage, and export production-ready landing pages. It runs entirely on the **Edge Runtime** to ensure maximum performance, low latency, and native compatibility with **Cloudflare Pages**.

## ✨ Features

- **🎨 Visual Drag-and-Drop Editor**: Build complex pages using an intuitive canvas with inline text editing and real-time property updates.
- **⚡ Edge Optimized**: Fully optimized for `workerd` (Cloudflare Workers) runtime. Node.js specific APIs have been replaced with standard web equivalents.
- **🧱 Component Library**: Comes pre-loaded with high-quality, customizable UI blocks including Headers, Heroes, Features, and Testimonials.
- **🌗 Theming Engine**: Switch design systems instantly via CSS variable overriding.
- **🔗 Staging Environments**: Easily generate live preview links (`/staging/[name]`) to share work-in-progress.
- **📦 Production Exports**: Export your completed page as a standalone, clean Next.js project zip file — completely decoupled from the editor and ready to deploy anywhere.

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

Clone the repository and install the dependencies:

```bash
git clone git@github.com:designersayap/lunar.git
cd lunar
npm install
```

### Local Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the Lunar builder interface.

### Cloudflare Pages Build

To compile the application for the Cloudflare Edge Runtime, run the following:

```bash
npm run pages:build
```
This utilizes `@cloudflare/next-on-pages` to generate a lightweight `_worker.js` output.

## 📁 Architecture Overview

Lunar is strictly organized to separate the **Builder Application Logic** from the **Content/Components** being built.

```text
lunar/
├── app/
│   ├── foundation/               # 🎨 Design Tokens & UI Utilities (global.css, tokens.css)
│   ├── page-builder/             # ⚙️ The core application engine (Canvas, drag-and-drop, UI panels)
│   ├── templates/                # 🧱 The Building Blocks (Reusable UI components)
│   ├── api/                      # Backend Edge API routes (Exports, UAT previews)
│   └── lib/                      # Edge-compatible utilities (e.g., custom S3 Client)
├── public/
│   └── themes/                   # 🌗 CSS Theme Definitions
```

## 🧩 Component Guidelines

To ensure components function seamlessly inside the Builder, the Staging environment, and the final Exported project, Lunar enforces a specific structural component architecture.

**Please read the detailed developer guide here:** [Component Guidelines](app/templates/component-guidelines.md)

### Core Primitives
When building new blocks, do **not** use standard HTML elements for editable content. Rely on Lunar's core Builder primitives:

- **`BuilderText`**: Handles editable headings, paragraphs, and spans. Supports text formatting (e.g., `Cmd+B` for bold) and prevents double-escaping vulnerabilities.
- **`BuilderButton`**: Standardizes interactive elements (buttons, links). Manages visual variants (`primary`, `ghost`) and onClick triggers (like Dialogs).
- **`BuilderImage`**: A wrapper for images that supports drag-and-drop uploading, image replacement, and standard hyperlinking.

## 💻 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Deployment**: Cloudflare Pages (Hosting & Edge Runtime)
- **Storage**: S3-Compatible Storage via Lightweight Custom Client
- **Styling**: Vanilla CSS Modules (Scoped)
- **Icons**: Heroicons
