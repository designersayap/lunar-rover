import HeaderSection from "./header-section";
import { componentDefaults } from "./content/data";

/**
 * Centered Header Section - Title Only
 */
export default function GlobalHeaderTitle({
    title = componentDefaults["header-title"].title,
    onUpdate,
    sectionId
}) {
    return (
        <HeaderSection
            title={title}
            onUpdate={onUpdate}
            sectionId={sectionId}
        />
    );
}
