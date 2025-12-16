# Component Guidelines

All components in `app/template-components` must support inline editing, dynamic property updates, and the project's architectural standards.

## 1. Core Builder Components

Use these primitives instead of standard HTML tags to enable builder functionality (ID generation, overlay, editing).

### `BuilderButton`
**Primary component for Buttons AND Links.**
Supports variants, custom URLs, and opening Dialogs.
```javascript
import BuilderButton from "@/app/page-builder-components/utils/builder/builder-button";

<BuilderButton
    label={buttonText}
    href={buttonUrl}
    isVisible={buttonVisible}
    sectionId={sectionId}
    className="btn btn-primary" // Use utility classes for style
    
    // State Updates
    onLabelChange={(val) => onUpdate?.({ buttonText: val })}
    onHrefChange={(val) => onUpdate?.({ buttonUrl: val })}
    onVisibilityChange={(val) => onUpdate?.({ buttonVisible: val })}
    
    // Link Type Logic (URL vs Dialog)
    linkType={buttonLinkType}
    onLinkTypeChange={(val) => onUpdate?.({ buttonLinkType: val })}
    targetDialogId={buttonTargetDialogId}
    onTargetDialogIdChange={(val) => onUpdate?.({ buttonTargetDialogId: val })}
    
    // Identity
    id={buttonId}
    onIdChange={(val) => onUpdate?.({ buttonId: val })}
    suffix="button"
/>
```

### `BuilderImage`
For images with upload, replacement, and link support.
```javascript
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";

<BuilderImage
    src={image}
    alt="Descriptive Alt Text"
    className={`${styles.image} imagePlaceholder-16-9`}
    isVisible={imageVisible}
    sectionId={sectionId}
    
    // Identity
    id={imageId}
    onIdChange={(val) => onUpdate?.({ imageId: val })}
    suffix="image"
    
    // Optional Link Support
    href={imageLink}
    onHrefChange={(val) => onUpdate?.({ imageLink: val })}
    linkType={imageLinkType}        // 'url' or 'dialog'
    onLinkTypeChange={(val) => onUpdate?.({ imageLinkType: val })}
    targetDialogId={imageTargetDialogId}
    onTargetDialogIdChange={(val) => onUpdate?.({ imageTargetDialogId: val })}
/>
```

### `BuilderText`
For all editable text content.
```javascript
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";

<BuilderText
    tagName="h2"
    className={styles.title}
    content={title}
    onChange={(val) => onUpdate?.({ title: val })}
    sectionId={sectionId}
    // No suffix needed for text unless multiple valid texts exist in one block
/>
```

### `BuilderLink`
Simplified link component, primarily for lists or footer links where button styling isn't needed.
```javascript
import BuilderLink from "@/app/page-builder-components/utils/builder/builder-link";

<BuilderLink
    label={item.label}
    href={item.url}
    id={item0Id}
    isVisible={item0Visible}
    onVisibilityChange={(val) => onUpdate?.({ item0Visible: val })}
    onIdChange={(val) => onUpdate?.({ item0Id: val })}
    // supports linkType/targetDialogId as well if needed
/>
```

---

## 2. Component Helpers (`component-helpers.js`)

Use helper utilities from `app/template-components/utils/component-helpers.js` to reduce boilerplate code in your components.

### `createUpdateHandler`

Creates a reusable update handler function that simplifies prop updates. This eliminates repetitive callback functions.

**Import:**
```javascript
import { createUpdateHandler } from "../utils/component-helpers";
```

**Usage:**
```javascript
export default function MyComponent({ title, buttonText, buttonUrl, onUpdate, sectionId }) {
    // Create the update handler once
    const update = createUpdateHandler(onUpdate);
    
    return (
        <>
            <BuilderText
                tagName="h2"
                content={title}
                onChange={update('title')}  // Instead of: (val) => onUpdate?.({ title: val })
                sectionId={sectionId}
            />
            
            <BuilderButton
                label={buttonText}
                href={buttonUrl}
                sectionId={sectionId}
                onLabelChange={update('buttonText')}     // Cleaner and more concise
                onHrefChange={update('buttonUrl')}       // No repetitive arrow functions
                // ...other props
            />
        </>
    );
}
```

**Before (without helper):**
```javascript
<BuilderButton
    onLabelChange={(val) => onUpdate?.({ buttonText: val })}
    onHrefChange={(val) => onUpdate?.({ buttonUrl: val })}
    onVisibilityChange={(val) => onUpdate?.({ buttonVisible: val })}
/>
```

**After (with helper):**
```javascript
const update = createUpdateHandler(onUpdate);

<BuilderButton
    onLabelChange={update('buttonText')}
    onHrefChange={update('buttonUrl')}
    onVisibilityChange={update('buttonVisible')}
/>
```

**Benefits:**
- Reduces code duplication
- Improves readability
- Ensures consistency across components
- Automatically handles `onUpdate` existence checks

---

## 3. Standard Dialog Structure

All dialog components **must** use `DialogSection`.
**Order:** Close Button -> Image -> Title -> Description -> Content.

```javascript
import DialogSection from "./dialog-section";

export default function MyDialog({
    title, description, image, imageId, imageVisible, sectionId, isOpen, onUpdate
}) {
    return (
        <DialogSection
            // ...pass all standard props
            isOpen={isOpen}
            onUpdate={onUpdate}
        >
            {/* Custom Content Children */}
        </DialogSection>
    );
}
```

---

## 4. Sidebar Configuration (`component-library.js`)

You must define child elements in `component-library.js` so they appear in the Sidebar Layer Tree.

```javascript
// component-library.js
"My Category": [
    {
        id: "my-component",
        // ...
        
        // 1. Config for Settings Panel (Strings, Selects, Toggles)
        config: [
            { name: "title", label: "Title", type: "text", default: componentDefaults["my-component"].title },
            { name: "buttonStyle", label: "Style", type: "select", options: ["primary", "neutral"] }
        ],
        
        // 2. Child Layers for Sidebar Tree (Buttons, Images, Links)
        buttons: [
            { 
                label: "CTA Button", 
                propId: "buttonId",      // Prop storing the custom ID
                suffix: "button",        // Default suffix
                labelProp: "buttonText", // Prop storing the label text
                visibleProp: "buttonVisible",
                linkTypeProp: "buttonLinkType" // Prop storing 'url' vs 'dialog'
            }
        ],
        images: [
            { 
                label: "Hero Image", 
                propId: "imageId", 
                suffix: "image", 
                visibleProp: "imageVisible" 
            }
        ],
        links: [
            { label: "Link 1", propId: "link1Id", suffix: "link-1" }
        ]
    }
]
```

## 5. Default Values (`data.js`)

**Single Source of Truth.** All default values must be defined in `app/template-components/content/data.js`.

```javascript
// data.js
export const componentDefaults = {
    "my-component": {
        title: "Default Title",
        buttonText: "Click Me",
        buttonLinkType: "url",
        // ...
    }
}
```

---

## 6. Page Builder Utilities (`page-builder-components/utils`)

### Component Manager (`utils/component-manager.js`)
Core logic for manipulating the component list.

- **`addComponentToList(components, componentData, sectionId)`**: Adds a new component. Handles `isSticky` logic to place pinned items at the top.
- **`removeComponentFromList(components, uniqueId)`**: Removes a component by ID.
- **`updateComponentProps(components, uniqueId, newProps)`**: Updates specific props (shallow merge).
- **`reorderComponents(components, fromIndex, toIndex)`**: Handles drag-and-drop reordering. Enforces "Pinned" vs "Normal" zones.
- **`isComponentSticky(comp)`**: Returns `true` if a component is sticky (checks props and defaults).

### Sticky Stacking (`utils/sticky-stacking.js`)
**Hook: `useStickyStacking(components)`**

Manages the visual stacking of sticky elements on the generic Canvas.
- **Inputs**: List of selected components.
- **Outputs**:
    - `stickyStyles`: Object map `{ [uniqueId]: { top, zIndex, position: 'sticky' } }`
    - `setRef(id, el)`: Ref callback to measure element heights.
- **Usage**:
  ```javascript
  const { stickyStyles, setRef } = useStickyStacking(displayComponents);
  // ...
  <div style={stickyStyles[item.uniqueId]} ref={el => setRef(item.uniqueId, el)}>...</div>
  ```

### Export Logic (`utils/export-template.js`)
**`handleExportTemplate(components)`**

- Generates static HTML from React components.
- Extracts used CSS classes (whitelist + component usage) from `page.module.css`.
- Injects `script.js` for Client-Side interactivity (Google Sheets sync, Mobile Menu, Sticky Stacking).
- Packages everything into a ZIP file.

### Template Storage (`utils/template-storage.js`)
**`loadTemplate(library)` / `saveTemplate(components, analytics)`**

- Persists state to `localStorage`.
- Rehydrates component references from the library on load (since JSON only stores IDs).

---

## 7. Z-Index Hierarchy

We use a strict **4-Tier Z-Index System** defined in `app/foundation/global.css`. never use arbitrary numeric values (e.g., `z-index: 50`) or legacy classes (`z-sm`, `z-dialog`).

### **Tier 1: Content Level (1-10)**
For stacking elements relative to normal content flow.
- `.z-hidden` (`-1`): Hidden elements (e.g., drag images).
- `.z-content-1` (`1`): Base overlays (Navigation bars, Banners).
- `.z-content-2` (`4`): Focused content (Accordion items, active borders).
- `.z-indicator` (`10`): Visual markers like Drag & Drop indicators.

### **Tier 2: Layout Level (100-200)**
For major layout structures that sit above all page content.
- `.z-layout-scrim` (`150`): Backdrops for popovers/drawers.
- `.z-layout-panel` (`160`): Non-modal panels (Sidebars, Bottom Sheets).
- `.z-layout-topbar` (`200`): The Page Builder App Bar (Always top of layout).

### **Tier 3: Interaction Level (900-999)**
For active interaction states that must rise above layout.
- `.z-interaction` (`999`): The "Active Element" overlay label/border in the builder.

### **Tier 4: System Level (1000+)**
For critical UI that must overlay everything.
- `.z-system-toast` (`1000`): Toast notifications.
- `.z-system-modal-floating` (`1001`): Floating popovers (Theme picker, Export menu).
- `.z-system-modal-fullscreen` (`9999 !important`): Fullscreen blocking modals (Dialogs).

**Rules:**
1. **Always use the utility classes.** Avoid inline styles for `z-index`.
2. **Context Matters:** If you need an element to be "on top", consider if it's "Content on top" vs "System Modal".
3. **Sticky Stacking:** The `useStickyStacking` hook automatically manages values between **10 and 100** for pinned sections. Do not manually assign z-indices in this range.

---

## 8. Design Tokens & Colors

All styling **must** use the CSS variables defined in `app/foundation/tokens.css`.
**Never hardcover hex codes** (e.g., `#FFFFFF`, `#000000`). This ensures dark mode compatibility and theming consistency.

### **Backgrounds**
- `var(--background-neutral--default)`: Standard page background.
- `var(--background-neutral--neutral-subtle)`: Subtle gray backgrounds (cards, sections).
- `var(--background-brand--brand-strong)`: Primary brand color backgrounds.

### **Content (Text & Icons)**
- `var(--content-neutral--title)`: Main headings.
- `var(--content-neutral--body)`: Standard body text.
- `var(--content-neutral--caption)`: Helper text / metadata.
- `var(--content-neutral--body-invert)`: Text on dark backgrounds.

### **Borders (Stroke)**
- `var(--stroke-neutral--neutral)`: Standard dividers and component borders.

**Example:**
```css
.myCard {
    background: var(--background-neutral--default);
    border: 1px solid var(--stroke-neutral--neutral);
    color: var(--content-neutral--body);
}

.myCardTitle {
    color: var(--content-neutral--title);
}
```

---

## 9. Grid System

The project uses a responsive grid system defined in `app/foundation/grid.css`.

### **Container**
Always wrap your content in a container to ensure proper max-width and margins.
- `.container-grid`: Standard container (Max 1440px).
- `.container-grid.container-full`: Full-width container (No padding).

### **Grid Layout**
Use `.grid` to create a grid context.
- **Mobile (<640px)**: 4 Columns
- **Tablet (640px-1023px)**: 8 Columns
- **Desktop (1024px+)**: 12 Columns

### **Column Classes**
Use responsive column classes to define width.
- **Mobile**: `.col-mobile-1` to `.col-mobile-4`
- **Tablet**: `.col-tablet-1` to `.col-tablet-8`
- **Desktop**: `.col-desktop-1` to `.col-desktop-12`

### **Alignment Utilities**
- **Justify**: `.justify-start`, `.justify-center`, `.justify-end`
- **Align**: `.align-start`, `.align-center`, `.align-end`

**Example:**
```jsx
<div className="container-grid">
    <div className="grid align-center">
        {/* Full width on mobile, half on desktop */}
        <div className="col-mobile-4 col-desktop-6">
            Left Content
        </div>
        <div className="col-mobile-4 col-desktop-6">
            Right Content
        </div>
    </div>
</div>
```

### **Responsive Spacing & Radius**
You **must** use the responsive variables defined in `grid.css` for padding, gaps, and border radius. These variables automatically adjust based on the viewport (Mobile/Tablet/Desktop).

**Padding:**
- `var(--padding-xs)` to `var(--padding-2xl)`
- Use for internal spacing of cards, sections, or containers.

**Gaps:**
- `var(--gap-xs)` to `var(--gap-2xl)`
- Use for spacing between flex or grid items.

**Border Radius:**
- `var(--border-radius-sm)` (Small UI elements)
- `var(--border-radius-md)` (Cards)
- `var(--border-radius-lg)` (Large containers)
- `var(--border-radius-button)` (Buttons)
- `var(--border-radius-round)` (Circles)

**Example:**
```css
.card {
    padding: var(--padding-md);
    gap: var(--gap-sm);
    border-radius: var(--border-radius-md);
}
```

---

## 10. Global Typography & Utilities

Standardize your component's look using the global classes from `app/foundation/global.css`.

### **Typography**
Do not set `font-size` or `font-weight` manually. Use these semantic classes:
- **Headings**: `.h1` through `.h6` (Use `.h1` for main page titles, `.h3/.h4` for section titles).
- **Subheaders**: `.subheader-h1`, `.subheader-h2` (Lighter weight headings).
- **Body**: `.body-regular`, `.body-bold`, `.body-link`.
- **Caption**: `.caption-regular`, `.caption-bold`, `.caption-link` (Small text).

### **Buttons**
Use the `.btn` base class with size and variant modifiers.
- **Sizes**: `.btn-sm`, `.btn-md`, `.btn-lg`.
- **Variants**:
    - `.btn-primary`: Main Call-to-Action.
    - `.btn-outline`: Secondary actions.
    - `.btn-neutral`: Gray/Neutral actions.
    - `.btn-ghost`: Text-only buttons (transparent).
    - `.btn-icon`: Circular icon-only buttons.

### **Helpers & Utilities**
- **Text Truncation**: `.truncate-1-line`, `.truncate-2-lines`.
- **Object Fit**: `.object-cover`, `.object-contain`.
- **Shadows**: `.shadow-md`.
- **Wrappers**: `.buttonWrapperLeft`, `.buttonWrapperCenter`, `.buttonWrapperRight`.
