import BuilderText from "../page-builder-components/utils/BuilderText";

/**
 * Centered Header Section - Title and Subtitle Only
 */
export default function GlobalHeaderTitleDescription({ title = "Title", subtitle = "Subtitle", onUpdate }) {
    return (
        <section className="global-header-title-description">
            <div className="container-grid">
                <div className="grid align-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className="text-center">
                            <BuilderText
                                initialText={title}
                                onUpdate={onUpdate}
                                propName="title"
                                as="h2"
                                className="h2"
                                style={{ marginBottom: "var(--gap-sm)" }}
                            />
                            <BuilderText
                                initialText={subtitle}
                                onUpdate={onUpdate}
                                propName="subtitle"
                                as="p"
                                className="body-regular"
                                style={{ color: "var(--content-neutral--caption)" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
