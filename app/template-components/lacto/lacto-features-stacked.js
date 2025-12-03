"use client";

import React from 'react';
import styles from './lacto-features-stacked.module.css';
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";
import BuilderImage from "@/app/page-builder-components/utils/builder-image";
import { componentDefaults } from "../content/component-defaults";

/**
 * Lacto Features Stacked (Image Top)
 * Stacked layout with image on top, followed by text and CTA
 */
export default function LactoFeaturesStacked({
    title = componentDefaults["lacto-features-stacked"].title,
    subtitle = componentDefaults["lacto-features-stacked"].subtitle,
    buttonText = componentDefaults["lacto-features-stacked"].buttonText,
    buttonId,
    buttonStyle = "primary", // primary, neutral, ghost, outline, link
    buttonSize = "md", // sm, md, lg
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
                            <BuilderImage className="imagePlaceholder-16-9" style={{ height: "auto" }} />

                            {/* Text Wrapper */}
                            <div className={styles.textWrapper}>
                                <BuilderText
                                    tagName="h2"
                                    className={`h2 ${styles.title}`}
                                    content={title}
                                    onChange={(val) => onUpdate && onUpdate({ title: val })}
                                    sectionId={sectionId}
                                />
                                <BuilderText
                                    tagName="p"
                                    className={`subheader-h2 ${styles.subtitle}`}
                                    content={subtitle}
                                    onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
                                    sectionId={sectionId}
                                />
                            </div>

                            {/* Call to Action */}
                            <BuilderButton
                                label={buttonText}
                                href="#"
                                suffix="cta"
                                sectionId={sectionId}
                                className="btn btn-primary btn-lg"
                                onLabelChange={(val) => onUpdate && onUpdate({ buttonText: val })}
                                id={buttonId}
                                onIdChange={(val) => onUpdate && onUpdate({ buttonId: val })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
