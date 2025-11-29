"use client";

import React from 'react';
import styles from './lacto-message-box.module.css';

/**
 * Lacto Message Box Component
 * A centered message box with title, description, and action buttons.
 */
import BuilderText from "../../page-builder-components/utils/BuilderText";

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
                                </div>

                                <div className={styles.buttonWrapper}>
                                    <button className="btn btn-primary btn-lg">
                                        <BuilderText
                                            initialText={primaryButtonText}
                                            onUpdate={onUpdate}
                                            propName="primaryButtonText"
                                            as="span"
                                            style={{ minWidth: "10px", display: "inline-block" }}
                                        />
                                    </button>
                                    <button className="btn btn-outline btn-lg">
                                        <BuilderText
                                            initialText={secondaryButtonText}
                                            onUpdate={onUpdate}
                                            propName="secondaryButtonText"
                                            as="span"
                                            style={{ minWidth: "10px", display: "inline-block" }}
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
