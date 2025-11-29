import styles from "./terra-banner-hero-with-search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import BuilderText from "../../page-builder-components/utils/BuilderText";

/**
 * Hero Banner Component with Search
 */
export default function TerraBannerHeroWithSearch({
    showSearchBar = true,
    title = "Find exactly what you need",
    description = "Search through thousands of resources, articles, and tutorials to help you build better.",
    onUpdate
}) {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid justify-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-8">
                        <div className={styles.contentWrapper}>
                            <BuilderText
                                initialText={title}
                                onUpdate={onUpdate}
                                propName="title"
                                as="h1"
                                className={`h1 ${styles.title}`}
                            />
                            <BuilderText
                                initialText={description}
                                onUpdate={onUpdate}
                                propName="description"
                                as="p"
                                className={`subheader-h1 ${styles.description}`}
                            />

                            {/* Search Bar */}
                            {showSearchBar && (
                                <div className={styles.searchWrapper}>
                                    <div className={styles.inputGroup}>
                                        <MagnifyingGlassIcon className={styles.searchIcon} />
                                        <input
                                            type="text"
                                            placeholder="Search for anything..."
                                            className={styles.searchInput}
                                        />
                                    </div>
                                    <button className="btn btn-primary btn-lg">
                                        Search
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
