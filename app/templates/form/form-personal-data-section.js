"use client";

import { createUpdateHandler } from "../utils/component-helpers";
import FormPersonalData from "./form-personal-data";
import BuilderText from "../../page-builder/utils/builder/builder-text";
import BuilderSection from "../../page-builder/utils/builder/builder-section";
import { getContainerClasses } from "@/app/page-builder/utils/section-utils";
import styles from "./form.module.css";

export default function FormPersonalDataSection(props) {
    const {
        onUpdate,
        sectionId,
        className = "",
        fullWidth,
        removePaddingLeft,
        removePaddingRight
    } = props;

    const update = createUpdateHandler(onUpdate);

    return (
        <BuilderSection
            tagName="section"
            className={`${styles.container} ${className}`}
            id={sectionId}
            sectionId={sectionId}
            onUpdate={onUpdate}
            fullWidth={fullWidth}
            innerContainer={!fullWidth}
            removePaddingLeft={removePaddingLeft}
            removePaddingRight={removePaddingRight}
        >
            <div className="grid">
                <div className="col-mobile-4 col-tablet-8 col-desktop-12">
                    <div className={styles.formWrapper}>
                        <FormPersonalData
                            {...props}
                            update={update}
                            onUpdate={onUpdate}
                            className=""
                        />
                    </div>
                </div>
            </div>
        </BuilderSection>
    );
}
