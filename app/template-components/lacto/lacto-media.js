"use client";

import React from 'react';
import styles from './lacto-media.module.css';
import BuilderImage from "@/app/page-builder-components/utils/builder-image";
import { componentDefaults } from "../content/component-defaults";

/**
 * Lacto Media Component
 * Displays a large media element with 21:9 aspect ratio
 */
export default function LactoMedia({
    image = componentDefaults["lacto-media"].image
}) {
    return (
        <section className={styles.section}>
            <div className="container-grid">
                <div className="grid justify-center">
                    <div className="col-mobile-2 col-tablet-8 col-desktop-8 offset-desktop-2">
                        <BuilderImage src={image} className={`imagePlaceholder-21-9 ${styles.media}`} style={{ height: "auto" }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
