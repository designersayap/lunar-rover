"use client";

import React from 'react';
import styles from './lacto-message-box.module.css';

/**
 * Lacto Message Box Component
 * A centered message box with title, description, and action buttons.
 */
export default function LactoMessageBox() {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid justify-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-12">
                        <div className={styles.container}>
                            <div className={`${styles.contentWrapper} shadow-md`}>
                                <div className={styles.textWrapper}>
                                    <h2 className={`h2 ${styles.title}`}>Title</h2>
                                    <p className={`body-regular ${styles.description}`}>Description</p>
                                </div>

                                <div className={styles.buttonWrapper}>
                                    <button className="btn btn-primary btn-lg">
                                        Label
                                    </button>
                                    <button className="btn btn-outline btn-lg">
                                        Label
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
