import styles from "./terra-banner-hero-with-button.module.css";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function TerraBannerHeroWithButton({ showButton = true }) {
    return (
        <main className={`${styles.hero} imagePlaceholder-5-4`}>
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

                        {/* CTA Button */}
                        {showButton && (
                            <button className={`btn btn-primary btn-md ${styles.ctaButton}`}>
                                <SparklesIcon width={20} height={20} />
                                Button
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
