import HeaderSection from "./header-section";
import { componentDefaults } from "./data";
export default function GlobalHeaderTitle({
    title = componentDefaults["header-title"].title,
    onUpdate,
    sectionId
}) {
    return (
        <HeaderSection
            title={title}

            sectionId={sectionId}
        />
    );
}
