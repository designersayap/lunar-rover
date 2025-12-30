import { componentDefaults } from "../content/data";
import HeaderSection from "./header-section";

/**
 * Centered Header Section - Title with Description
 */
export default function GlobalHeaderTitleTitleDescription({
    title = componentDefaults["header-title-description"].title,
    subtitle = componentDefaults["header-title-description"].subtitle,
    onUpdate,
    sectionId
}) {
    return (
        <HeaderSection
            title={title}
            titleStyle={{ marginBottom: "var(--gap-md)" }}
            subtitle={subtitle}
            onUpdate={onUpdate}
            sectionId={sectionId}
        />
    );
}
