import styles from "./terra-banner-hero-with-search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import BuilderText from "@/app/page-builder-components/utils/builder-text";

/**
 * Hero Banner Component with Search
 */
export default function TerraBannerHeroWithSearch({
    showSearchBar = true,
    title = "Find Your Perfect Space",
    description = "Search for the best workspaces in your area.",
    placeholder = "Search location...",
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
                        />

                        {/* Hero Subtitle */}
                        <BuilderText
                            tagName="p"
                            className={`subheader-h1 ${styles.heroSubtitle}`}
                            content={description}
                            onChange={(val) => onUpdate && onUpdate({ description: val })}
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
