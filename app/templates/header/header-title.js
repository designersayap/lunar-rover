import HeaderSection from "./header-section";
import { componentDefaults } from "../content/data";
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
