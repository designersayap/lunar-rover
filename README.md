# Lunar: Template Generator

A powerful **Page Builder** application built with Next.js 15, allowing users to drag-and-drop pre-designed components to craft and export responsive landing pages effectively.

## 🚀 Getting Started

### Installation

```bash
cd nextjs-app
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start building.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

The project separates the **Builder UI** (the editor itself) from the **Template Components** (the blocks you build with).

```text
lunar/
├── app/
│   ├── foundation/               # 🎨 Design System Core
│   │   ├── tokens.css            # Semantic design tokens
│   │   ├── global.css            # Base typography & utilities
│   │   ├── grid.css              # Grid layout system
│   │   └── accent-color.css      # Theme accent handling
│   ├── page-builder-components/  # 🛠️ Builder Interface (The Editor)
│   │   ├── sidebar.js            # Component library & settings sidebar
│   │   ├── canvas.js             # Drag & drop workspace
│   │   └── ...                   # Toolbars, popovers, utilities
│   ├── template-components/      # 🧱 Building Blocks (Content)
│   │   ├── header/               # Navbars and headers
│   │   ├── terra/                # Feature sections & heroes
│   │   ├── content/              # Text content blocks
│   │   └── ...                   # Other UI sections
│   ├── layout.js                 # App Root
│   └── page.js                   # Main Builder Page Entry
├── public/                       # Static assets
└── package.json
```

## 🎨 Design System Foundation

The design system is located in `app/foundation/`:

-   **`tokens.css`**: Maps semantic names (e.g., `--color-primary`) to values.
-   **`global.css`**: Contains reusable typography classes (e.g., `.heading-xl`, `.body-md`) and button styles.
-   **`grid.css`**: A comprehensive grid system for responsive layouts.

## 🛠️ Page Builder Features

The **Template Generator** (`app/page.js`) provides:

-   **Drag & Drop Canvas**: Visually assemble pages.
-   **Component Library**: A sidebar of available components (Headers, Features, etc.).
-   **Theme Picker**: Switch between different visual themes instantly.
-   **Export**: Download your created page as a CSV or clean HTML/CSS template.
-   **Analytics**: Basic settings for tracking codes.

## 📝 Template Components

Pre-built responsive sections available to use:

-   **Terra Series**: Feature-rich sections like 3-column USPs, Image-Left/Right features.
-   **Headers**: Various navigation bar styles.
-   **Content**: Simple text and hero blocks.

## 💻 Tech Stack

-   **Next.js 15** (App Router)
-   **React 19**
-   **CSS Modules** for scoped styling
-   **Heroicons** for UI iconography
-   **Google Fonts** (Poppins, Lato, Plus Jakarta Sans)

## 📖 Learn More

-   [Next.js Documentation](https://nextjs.org/docs)
-   [React Documentation](https://react.dev)
