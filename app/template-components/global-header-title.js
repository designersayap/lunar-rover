import styles from "./global-header-title.module.css";

/**
 * Centered Header Section - Title Only
 */
import BuilderText from "../page-builder-components/utils/BuilderText";

export default function GlobalHeaderTitle({ title = "Title", onUpdate }) {
    return (
        <section className="global-header-title">
            <div className="container-grid">
                <div className="grid align-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <BuilderText
                            initialText={title}
                            onUpdate={onUpdate}
                            propName="title"
                            as="h2"
                            className="h2 text-center"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
