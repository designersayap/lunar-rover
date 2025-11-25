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
