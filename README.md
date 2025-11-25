# Lunar Design System - Next.js

A modern Next.js application featuring a comprehensive design system with typography, buttons, and responsive components.

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

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
nextjs-app/
├── app/
│   ├── components/
│   │   ├── HeroBanner.js          # Hero banner component
│   │   └── HeroBanner.module.css  # Component-specific styles
│   ├── primitives.css              # Design primitives (colors, spacing)
│   ├── tokens.css                  # Design tokens (semantic values)
│   ├── global.css                  # Typography & button components
│   ├── globals.css                 # Base global styles
│   ├── layout.js                   # Root layout with fonts
│   └── page.js                     # Home page
├── public/                         # Static assets
└── package.json
```

## 🎨 Design System

### CSS Files

- **primitives.css** - Raw design values (colors, spacing, typography scales)
- **tokens.css** - Semantic design tokens mapped to primitives
- **global.css** - Reusable typography classes and button components
- **globals.css** - Base styles and CSS reset

### Typography Classes

```jsx
<h1 className="heading-xl">Extra Large Heading</h1>
<h2 className="heading-lg">Large Heading</h2>
<h3 className="heading-md">Medium Heading</h3>
<p className="body-md">Body text</p>
<p className="caption-md">Caption text</p>
```

### Button Components

```jsx
// Solid buttons
<button className="btn btn-brand-solid btn-md">Brand Button</button>
<button className="btn btn-neutral-solid btn-md">Neutral Button</button>
<button className="btn btn-black-solid btn-md">Black Button</button>

// Outline and ghost
<button className="btn btn-outline btn-md">Outline Button</button>
<a className="btn btn-ghost">Ghost Link</a>

// Sizes
<button className="btn btn-brand-solid btn-sm">Small</button>
<button className="btn btn-brand-solid btn-md">Medium</button>
<button className="btn btn-brand-solid btn-lg">Large</button>

// Icon buttons
<button className="btn btn-brand-solid btn-icon btn-sm">
  <svg>...</svg>
</button>
```

## 🛠️ Technologies

- **Next.js 15** - React framework
- **React 19** - UI library
- **CSS Modules** - Scoped component styles
- **Google Fonts** - Poppins & Lato typography

## 📝 Components

### HeroBanner

A responsive hero section with:
- Large heading with responsive typography
- Subtitle text
- Search input with integrated button
- Fully responsive layout

### TerraUsp4col

A 4-column USP (Unique Selling Point) section featuring:
- Section title ("Why Choose Us")
- 3 feature cards
- Responsive grid: 3 columns each on desktop, 4 on tablet, full width on mobile

### TerraUsp3col

A 3-column USP variant featuring:
- Section title ("Why Choose Us")
- 2 feature cards
- Responsive grid: 4 columns each on desktop, 8 on tablet, full width on mobile

### TerraFeaturesImageLeft

A feature section with:
- Image on the left (6 columns)
- Text content on the right (6 columns)
- Responsive behavior: Text appears above image on mobile/tablet

### TerraFeaturesImageRight

A feature section with:
- Text content on the left (6 columns)
- Image on the right (6 columns)
- Responsive behavior: Text appears above image on mobile/tablet

## 🛠️ Utilities

### Global Image Placeholder

A flexible, reusable image placeholder system available in `global.css`.

**Usage:**
```jsx
<div className="imagePlaceholder-1-1"></div>
```

**Available Variants:**
- `.imagePlaceholder-1-1` (Square - 1:1)
- `.imagePlaceholder-4-5` (Portrait - 4:5)
- `.imagePlaceholder-5-4` (Landscape - 5:4)
- `.imagePlaceholder-16-9` (Widescreen - 16:9)
- `.imagePlaceholder-21-9` (Ultra-wide - 21:9)

## 🎯 Features

- ✅ Comprehensive design system with primitives and tokens
- ✅ Reusable typography classes
- ✅ Multiple button variants and sizes
- ✅ Responsive design
- ✅ CSS Modules for component isolation
- ✅ Google Fonts integration
- ✅ Modern Next.js App Router

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
