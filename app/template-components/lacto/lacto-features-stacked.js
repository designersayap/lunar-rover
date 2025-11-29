"use client";

import React from 'react';
import styles from './lacto-features-stacked.module.css';
import BuilderText from "../../page-builder-components/utils/BuilderText";

/**
 * Lacto Features Stacked (Image Top)
 * Stacked layout with image on top, followed by text and CTA
 */
export default function LactoFeaturesStacked({
    title = "Fresh from the Farm",
    description = "Our products are sourced directly from local farms to ensure the highest quality and freshness.",
    buttonText = "Shop Now",
    onUpdate
}) {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid align-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-6">
                        <div className="imagePlaceholder-4-3"></div>
                    </div>
                    <div className="col-mobile-2 col-tablet-8 col-desktop-6">
                        <div className={styles.content}>
                            <BuilderText
                                initialText={title}
                                onUpdate={onUpdate}
                                propName="title"
                                as="h2"
                                className={`h2 ${styles.title}`}
                            />
                            <BuilderText
                                initialText={description}
                                onUpdate={onUpdate}
                                propName="description"
                                as="p"
                                className={`body-regular ${styles.description}`}
                            />
                            <button className="btn btn-primary btn-md">
                                <BuilderText
                                    initialText={buttonText}
                                    onUpdate={onUpdate}
                                    propName="buttonText"
                                    as="span"
                                    style={{ minWidth: "10px", display: "inline-block" }}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
