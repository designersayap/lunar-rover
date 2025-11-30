import styles from "./terra-banner-hero-with-button.module.css";
import { SparklesIcon } from "@heroicons/react/24/outline";

import BuilderText from "@/app/page-builder-components/utils/BuilderText";

export default function TerraBannerHeroWithButton({
    showButton = true,
    title = "Hero Title",
    description = "Hero description goes here.",
    buttonText = "Get Started",
    onUpdate
}) {
    return (
        <main className={`${styles.hero} imagePlaceholder-5-4`}>
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

                        {/* CTA Button */}
                        {showButton && (
                            <button className={`btn btn-primary btn-md ${styles.ctaButton}`}>
                                <SparklesIcon width={20} height={20} />
                                <BuilderText
                                    tagName="span"
                                    content={buttonText}
                                    onChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
