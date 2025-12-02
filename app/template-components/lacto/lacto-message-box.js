"use client";

import React from 'react';
import styles from './lacto-message-box.module.css';
import BuilderText from "@/app/page-builder-components/utils/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder-button";

import { componentDefaults } from "../content/component-defaults";

/**
 * Lacto Message Box Component
 * A centered message box with title, description, and action buttons.
 */
export default function LactoMessageBox({
    title = componentDefaults["lacto-message-box"].title,
    subtitle = componentDefaults["lacto-message-box"].subtitle,
    primaryButtonText = componentDefaults["lacto-message-box"].primaryButtonText,
    secondaryButtonText = componentDefaults["lacto-message-box"].secondaryButtonText,
    primaryButtonStyle = "primary",
    secondaryButtonStyle = "outline",
    buttonSize = "lg",
    onUpdate,
    sectionId
}) {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid justify-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className={styles.container}>
                            <div className={`${styles.contentWrapper} shadow-md`}>
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
                                        className={`body-regular ${styles.description}`}
                                        content={subtitle}
                                        onChange={(val) => onUpdate && onUpdate({ subtitle: val })}
                                        sectionId={sectionId}
                                    />
                                </div>

                                <div className={styles.buttonWrapper}>
                                    <BuilderButton
                                        label={primaryButtonText}
                                        href="#"
                                        sectionId={sectionId}
                                        className={`btn btn-${primaryButtonStyle} btn-${buttonSize}`}
                                        onLabelChange={(val) => onUpdate && onUpdate({ primaryButtonText: val })}
                                    />
                                    <BuilderButton
                                        label={secondaryButtonText}
                                        href="#"
                                        sectionId={sectionId}
                                        className={`btn btn-${secondaryButtonStyle} btn-${buttonSize}`}
                                        onLabelChange={(val) => onUpdate && onUpdate({ secondaryButtonText: val })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
