# Component Guidelines

All components in `app/template-components` must support inline editing and dynamic property updates. Follow these guidelines when creating new components.

## 1. Use `BuilderText` for Text Content

Instead of hardcoding text or using standard HTML tags for text (like `h1`, `p`, `span`), use the `BuilderText` component.

```javascript
import BuilderText from "@/app/page-builder-components/utils/builder-text";

// ...

<BuilderText
    tagName="h2"
    className={styles.title}
    content={title}
    onChange={(val) => onUpdate && onUpdate({ title: val })}
/>
```

## 2. Accept Props for Content

Components should accept props for all dynamic content (text, images, links, etc.) and provide default values.

```javascript
export default function MyComponent({
    title = "Default Title",
    description = "Default Description",
    onUpdate // Callback for updates
}) {
    // ...
}
```

## 3. Implement `onUpdate` Callback

The `onUpdate` prop is a function provided by the parent to update the component's state. It expects an object with the updated properties.

```javascript
const handleUpdate = (key, value) => {
    if (onUpdate) {
        onUpdate({ [key]: value });
    }
};

// Usage
<BuilderText
    // ...
    onChange={(val) => handleUpdate("title", val)}
/>
```

## 4. Handle Array/Object Updates

For complex state like arrays (e.g., lists of features) or objects, ensure you update the specific item correctly.

```javascript
const handleFeatureUpdate = (index, key, value) => {
    if (!onUpdate) return;
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [key]: value };
    onUpdate({ features: newFeatures });
};
```

## 5. Example Component Structure

```javascript
import React from 'react';
import styles from './MyComponent.module.css';
import BuilderText from "@/app/page-builder-components/utils/builder-text";

export default function MyComponent({
    title = "Default Title",
    items = [{ label: "Item 1" }, { label: "Item 2" }],
    onUpdate
}) {
    return (
        <div className={styles.container}>
            <BuilderText
                tagName="h2"
                content={title}
                onChange={(val) => onUpdate && onUpdate({ title: val })}
            />
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <BuilderText
                            tagName="span"
                            content={item.label}
                            onChange={(val) => {
                                const newItems = [...items];
                                newItems[index] = { ...newItems[index], label: val };
                                onUpdate && onUpdate({ items: newItems });
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
```
