import styles from "./terra-banner-hero-with-search.module.css";

/**
 * Hero Banner Component with Search
 * Displays a centered hero section with title, subtitle, and search input
 */
export default function TerraBannerHeroWithSearch() {
    return (
        <main className={`${styles.hero} imagePlaceholder-5-4`}>
            {/* Grid Container */}
            <div className="container-grid">
                <div className="grid">
                    {/* Content Column - Centered on desktop */}
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>

                        {/* Hero Title */}
                        <h1 className={`h1 ${styles.heroTitle}`}>
                            Title
                        </h1>

                        {/* Hero Subtitle */}
                        <p className={`subheader-h1 ${styles.heroSubtitle}`}>
                            Description
                        </p>

                        {/* Search Form */}
                        <form className={styles.searchForm}>
                            <input
                                type="text"
                                placeholder="Search product"
                                className={styles.searchInput}
                            />
                            <button
                                type="submit"
                                className={`btn btn-primary btn-icon btn-sm ${styles.searchButton}`}
                            >
                                <span className="material-icons-round" style={{ fontSize: "20px" }}>search</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
