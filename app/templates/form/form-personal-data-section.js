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
            className={styles.container}
            sectionId={sectionId}
            onUpdate={onUpdate}
            innerContainer={true}
        >
            <div className="grid">
                <div className="col-mobile-4 col-tablet-6 offset-tablet-1 col-desktop-6 offset-desktop-3">
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
