# Component Guidelines

All components in `app/template-components` must support inline editing, dynamic property updates, and the project's architectural standards.

## 1. Core Builder Components

Use these primitives instead of standard HTML tags to enable builder functionality (ID generation, overlay, editing).

### `BuilderText`
For all editable text content.
```javascript
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
// ...
<BuilderText
    tagName="h2"
    className={styles.title}
    content={title}
    onChange={(val) => onUpdate?.({ title: val })}
    sectionId={sectionId}
/>
```

### `BuilderImage`
For images with upload/replacement support.
```javascript
import BuilderImage from "@/app/page-builder-components/utils/builder/builder-image";
// ...
<BuilderImage
    className={`${styles.imageContainer} imagePlaceholder-16-9`}
    src={image}
    id={imageId}
    sectionId={sectionId}
    isVisible={imageVisible}
    onIdChange={(val) => onUpdate?.({ imageId: val })}
    suffix="image"
/>
```

### `BuilderLink`
For links or list items that need ID/visibility management.
```javascript
import BuilderLink from "@/app/page-builder-components/utils/builder/builder-link";
// ...
<BuilderLink
    label={item.label}
    href={item.url}
    id={item0Id}
    isVisible={item0Visible}
    onVisibilityChange={(val) => onUpdate?.({ item0Visible: val })}
    onIdChange={(val) => onUpdate?.({ item0Id: val })}
    // ...other props
/>
```

### `BuilderElement`
For generic elements (like accordion items or wrappers) that need ID generation/synchronization but don't fit into the above categories.
```javascript
import BuilderElement from "@/app/page-builder-components/utils/builder/builder-element";
// ...
<BuilderElement
    tagName="div"
    sectionId={sectionId}
    id={item0Id}
    elementProps="accordion-0"
    onIdChange={(val) => onUpdate?.({ item0Id: val })}
>
    {/* Content */}
</BuilderElement>
```

---

## 2. Standard Dialog Structure

All dialog components **must** use `DialogSection` to ensure consistency.
**Structure Order:** Floating Close Button -> Image -> Title -> Description -> Content.

`DialogSection` handles the layout automatically when you pass props:

```javascript
import DialogSection from "./dialog-section";

export default function MyDialog({
    title, description, image, imageId, imageVisible, sectionId, isOpen, onUpdate
}) {
    return (
        <DialogSection
            title={title}
            description={description}
            image={image}
            imageId={imageId}
            imageVisible={imageVisible}
            sectionId={sectionId}
            isOpen={isOpen}
            onUpdate={onUpdate}
        >
            {/* Custom Content Children (e.g., List, Accordion) */}
        </DialogSection>
    );
}
```

---

## 3. Visibility & Soft Deletion

To allow users to "delete" items from the sidebar (without permanently breaking the structure), implementing "soft deletion" via visibility props.

1.  **Props**: Accept an `isVisible` prop (e.g., `item0Visible`).
2.  **Conditional Rendering**: Only render the item if `isVisible !== false`.
3.  **Sidebar Config**: In `component-library.js`, map the `visibleProp` in the `links` array.

```javascript
// component-library.js
links: [
    { label: "Item 1", propId: "item0Id", suffix: "item-0", visibleProp: "item0Visible" }
]
```

---

## 4. Configuration & Defaults

### `component-library.js`
Defines how the component appears in the sidebar.
-   **`config`**: Fields for the properties panel (e.g., items list).
-   **`links`**: Individual elements shown as layers in the sidebar (for selection/deletion).

### `data.js`
Defines the initial default values for all props. Ensure new props (like `image`, `imageId`) have defaults here.
