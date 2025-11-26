import styles from "./terra-banner-hero-with-button.module.css";

/**
 * Hero Banner Component with Button
 * Displays a centered hero section with title, subtitle, and CTA button
 */
export default function TerraBannerHeroWithButton() {
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

                        {/* CTA Button */}
                        <button className={`btn btn-primary btn-md ${styles.ctaButton}`}>
                            <span className="material-icons-round" style={{ fontSize: "20px" }}>auto_awesome</span>
                            Get Started
                            <span className="material-icons-round" style={{ fontSize: "20px" }}>arrow_right_alt</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
