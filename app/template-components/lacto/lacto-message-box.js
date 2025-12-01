"use client";

import React from 'react';
import styles from './lacto-message-box.module.css';
import BuilderText from "@/app/page-builder-components/utils/builder-text";

/**
 * Lacto Message Box Component
 * A centered message box with title, description, and action buttons.
 */
export default function LactoMessageBox({
    title = "Title",
    description = "Description",
    primaryButtonText = "Label",
    secondaryButtonText = "Label",
    onUpdate
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
                                    />
                                    <BuilderText
                                        tagName="p"
                                        className={`body-regular ${styles.description}`}
                                        content={description}
                                        onChange={(val) => onUpdate && onUpdate({ description: val })}
                                    />
                                </div>

                                <div className={styles.buttonWrapper}>
                                    <button className="btn btn-primary btn-lg">
                                        <BuilderText
                                            tagName="span"
                                            content={primaryButtonText}
                                            onChange={(val) => onUpdate && onUpdate({ primaryButtonText: val })}
                                        />
                                    </button>
                                    <button className="btn btn-outline btn-lg">
                                        <BuilderText
                                            tagName="span"
                                            content={secondaryButtonText}
                                            onChange={(val) => onUpdate && onUpdate({ secondaryButtonText: val })}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
