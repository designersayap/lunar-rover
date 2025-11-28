"use client";

import React from 'react';
import styles from './lacto-features-stacked.module.css';

/**
 * Lacto Features Stacked (Image Top)
 * Stacked layout with image on top, followed by text and CTA
 */
export default function LactoFeaturesStacked() {
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
                                <h2 className={`h2 ${styles.title}`}>
                                    Mulai Dari Milku Hari Jadi Milikku
                                </h2>
                                <p className={`subheader-h2 ${styles.description}`}>
                                    Susu Sapi belgia Asli dengan Nutrisi Esensial Protein, Kalsium, Vitamin D, dan Zinc.
                                </p>
                            </div>

                            {/* Call to Action */}
                            <button className="btn btn-md btn-primary">
                                Eksplor Milku!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
