import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import BuilderText from "@/app/page-builder-components/utils/builder/builder-text";
import BuilderButton from "@/app/page-builder-components/utils/builder/builder-button";
import styles from "./banner-information.module.css";

export default function BannerInformation({
    title = "Information Banner",

    // Button Props
    buttonText = "Label",
    buttonUrl = "",
    buttonLinkType = "url",
    buttonTargetDialogId = "",
    buttonId,
    buttonVisible = true,

    onUpdate,
    sectionId,
    className = "",
    isVisible = true,
}) {
    const [isClosed, setIsClosed] = useState(false);

    if (isClosed || isVisible === false) return null;

    return (
        <div

            className={`${styles.banner} z-xl ${className}`}
            data-section-id={sectionId}
        >
            <div className={styles.content}>
                <BuilderText
                    tagName="p"
                    className={`body-regular ${styles.title}`}
                    content={title}
                    onChange={(val) => onUpdate?.({ title: val })}
                    sectionId={sectionId}
                />
                <BuilderButton
                    label={buttonText}
                    href={buttonUrl}
                    isVisible={buttonVisible}
                    sectionId={sectionId}
                    className="btn btn-neutral btn-md"
                    onLabelChange={(val) => onUpdate?.({ buttonText: val })}
                    onHrefChange={(val) => onUpdate?.({ buttonUrl: val })}
                    onVisibilityChange={(val) => onUpdate?.({ buttonVisible: val })}
                    linkType={buttonLinkType}
                    onLinkTypeChange={(val) => onUpdate?.({ buttonLinkType: val })}
                    targetDialogId={buttonTargetDialogId}
                    onTargetDialogIdChange={(val) => onUpdate?.({ buttonTargetDialogId: val })}
                    id={buttonId}
                    onIdChange={(val) => onUpdate?.({ buttonId: val })}
                    suffix="button"
                />
            </div>

            <div className={styles.actions}>

                <button
                    className="btn btn-icon btn-neutral btn-sm"
                    onClick={() => setIsClosed(true)}
                    aria-label="Close banner"
                >
                    <XMarkIcon style={{ width: 20, height: 20 }} />
                </button>
            </div>
        </div>
    );
}
