import styles from "./terra-banner-hero-with-search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

/**
 * Hero Banner Component with Search
 */
export default function TerraBannerHeroWithSearch({ showSearchBar = true }) {
    return (
        <main className={styles.hero}>
            {/* Grid Container */}
            <div className="container-grid">
                <div className="grid">
                    {/* Content Column */}
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>

                        {/* Hero Title */}
                        <h1 className={`h1 ${styles.heroTitle}`}>
                            Title
                        </h1>

                        {/* Hero Subtitle */}
                        <p className={`subheader-h1 ${styles.heroSubtitle}`}>
                            Description
                        </p>

                        {/* Search Bar */}
                        {showSearchBar && (
                            <div className={styles.searchContainer}>
                                <input
                                    type="text"
                                    className={`body-regular ${styles.searchInput}`}
                                    placeholder="Search product"
                                />
                                <button className={`btn btn-primary btn-icon btn-md ${styles.searchButton}`}>
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
