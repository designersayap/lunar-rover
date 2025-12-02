import styles from "./terra-banner-hero-with-search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { componentDefaults } from "../content/component-defaults";

import BuilderText from "@/app/page-builder-components/utils/builder-text";

/**
 * TerraBannerHeroWithSearch Component
 */
export default function TerraBannerHeroWithSearch({
    title = componentDefaults["hero-search"].title,
    subtitle = componentDefaults["hero-search"].subtitle,
    placeholder = componentDefaults["hero-search"].placeholder,
    showSearchBar = true,
    onUpdate,
    sectionId
}) {
    return (
        <main className={styles.hero}>
            {/* Grid Container */}
            <div className="container-grid">
                <div className="grid">
                    {/* Content Column */}
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>

                        {/* Hero Title */}
                        <BuilderText
                            tagName="h1"
                            className={`h1 ${styles.heroTitle}`}
                            content={title}
                            onChange={(val) => onUpdate && onUpdate({ title: val })}
                            sectionId={sectionId}
                        />

                        {/* Hero Subtitle */}
                        <BuilderText
                            tagName="p"
                            className={`subheader-h1 ${styles.heroSubtitle}`}
                            content={subtitle}
                            onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
                            sectionId={sectionId}
                        />

                        {/* Search Bar */}
                        {showSearchBar && (
                            <div className={styles.searchContainer}>
                                <input
                                    type="text"
                                    className={`body-regular ${styles.searchInput}`}
                                    placeholder={placeholder}
                                    onChange={(e) => onUpdate && onUpdate({ placeholder: e.target.value })}
                                />
                                <button
                                    id={sectionId ? `${sectionId}-btn-primary` : undefined}
                                    className={`btn btn-primary btn-icon btn-md ${styles.searchButton}`}
                                >
                                    <MagnifyingGlassIcon className="icon" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
