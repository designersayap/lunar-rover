"use client";

import React from 'react';
import styles from './lacto-features-stacked.module.css';
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";

/**
 * Lacto Features Stacked (Image Top)
 * Stacked layout with image on top, followed by text and CTA
 */
export default function LactoFeaturesStacked({
    title = "Mulai Dari Milku Hari Jadi Milikku",
    description = "Susu Sapi belgia Asli dengan Nutrisi Esensial Protein, Kalsium, Vitamin D, dan Zinc.",
    buttonText = "Eksplor Milku!",
    onUpdate,
    sectionId
}) {
    return (
        <section className={styles.section}>
            <div className="container-grid ">
                <div className="grid justify-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2">
                        <div className={styles.contentWrapper}>
                            {/* Media */}
                            <div className="imagePlaceholder-16-9"></div>

                            {/* Text Wrapper */}
                            <div className={styles.textWrapper}>
                                <BuilderText
                                    tagName="h2"
                                    className={`h2 ${styles.title}`}
                                    content={title}
                                    onChange={(val) => onUpdate && onUpdate({ title: val })}
                                />
                                <BuilderText
                                    tagName="p"
                                    className={`subheader-h2 ${styles.description}`}
                                    content={description}
                                    onChange={(val) => onUpdate && onUpdate({ description: val })}
                                />
                            </div>

                            {/* Call to Action */}
                            <BuilderButton
                                label={buttonText}
                                href="#"
                                sectionId={sectionId}
                                className="btn btn-md btn-primary"
                                onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
