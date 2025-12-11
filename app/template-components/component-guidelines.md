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

## 2. Standard Dialog Structure

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

## 3. Sidebar Configuration (`component-library.js`)

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

## 4. Default Values (`data.js`)

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
