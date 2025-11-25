import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "./terra-banner-hero-with-search.module.css";

/**
 * Hero Banner Component with Search
 * Displays a centered hero section with title, subtitle, and search input
 */
export default function TerraBannerHeroWithSearch() {
    return (
        <main className={styles.hero}>
            {/* Grid Container */}
            <div className="container-grid">
                <div className="grid">
                    {/* Content Column - Centered on desktop */}
                    <div className={`col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2 ${styles.content}`}>

                        {/* Hero Title */}
                        <h1 className={`h1 ${styles.heroTitle}`}>
                            Elevate your
                            <br />
                            product's modern
                            <br />
                            appeal
                        </h1>

                        {/* Hero Subtitle */}
                        <p className={`subheader-h1 ${styles.heroSubtitle}`}>
                            Build your website with Staples into a lot more minimalist
                            <br />
                            and modern with ease and speed
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
                                className={`btn btn-brand-solid btn-icon btn-sm ${styles.searchButton}`}
                            >
                                <MagnifyingGlassIcon className={styles.icon} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
