# Grid System Usage Guide

## Overview

A responsive 12-column grid system with breakpoints for mobile, tablet, and desktop.

## Breakpoints

- **Mobile**: max-width 480px - 2 columns, 16px margin
- **Tablet**: 481px - 767px - 8 columns, 40px margin  
- **Desktop**: 768px+ - 12 columns, 120px margin
- **Max container width**: 1440px

All breakpoints use **0 gutter** between columns.

## Basic Usage

### Container

```jsx
<div className="container-grid">
  {/* Your content with responsive margins */}
</div>
```

### Grid

```jsx
<div className="grid">
  <div className="col-12">Full width</div>
  <div className="col-6">Half width</div>
  <div className="col-6">Half width</div>
</div>
```

## Responsive Columns

### Desktop (12 columns)

```jsx
<div className="grid">
  <div className="col-desktop-4">4 columns on desktop</div>
  <div className="col-desktop-8">8 columns on desktop</div>
</div>
```

### Tablet (8 columns)

```jsx
<div className="grid">
  <div className="col-tablet-4">4 columns on tablet</div>
  <div className="col-tablet-4">4 columns on tablet</div>
</div>
```

### Mobile (2 columns)

```jsx
<div className="grid">
  <div className="col-mobile-2">Full width on mobile</div>
  <div className="col-mobile-1">Half width on mobile</div>
  <div className="col-mobile-1">Half width on mobile</div>
</div>
```

## Combined Responsive Example

```jsx
<div className="container-grid">
  <div className="grid">
    <div className="col-mobile-2 col-tablet-4 col-desktop-6">
      {/* 
        Mobile: Full width (2/2)
        Tablet: Half width (4/8)
        Desktop: Half width (6/12)
      */}
    </div>
    <div className="col-mobile-2 col-tablet-4 col-desktop-6">
      {/* Same responsive behavior */}
    </div>
  </div>
</div>
```

## Grid Debug Mode

Add the `grid-debug` class to visualize grid columns:

```jsx
<div className="container-grid grid-debug">
  <div className="grid">
    {/* Grid columns will be visible with red overlay */}
  </div>
</div>
```

## Complete Example

```jsx
export default function MyComponent() {
  return (
    <div className="container-grid">
      <div className="grid">
        {/* Header - full width on all devices */}
        <div className="col-mobile-2 col-tablet-8 col-desktop-12">
          <h1>Page Title</h1>
        </div>
        
        {/* Main content - responsive widths */}
        <div className="col-mobile-2 col-tablet-5 col-desktop-8">
          <p>Main content area</p>
        </div>
        
        {/* Sidebar - responsive widths */}
        <div className="col-mobile-2 col-tablet-3 col-desktop-4">
          <aside>Sidebar content</aside>
        </div>
      </div>
    </div>
  );
}
```

## CSS Variables

The grid system uses CSS variables that automatically adjust based on viewport:

- `--grid-columns`: Number of columns (2, 8, or 12)
- `--grid-margin`: Container side margins (16px, 40px, or 120px)
- `--grid-gutter`: Space between columns (0px for all breakpoints)

You can use these variables in your custom CSS if needed.
