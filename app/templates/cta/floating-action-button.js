import styles from "./floating-action-button.module.css";
import BuilderImage from "../../page-builder/utils/builder/builder-image";

import { createUpdateHandler } from "../utils/component-helpers";

export default function FloatingActionButton({
    imageId,
    image,
    imageVisible,
    linkType,
    url,
    targetDialogId,
    openInNewTab,
    onUpdate,
    sectionId,
    linkId
}) {
    const update = createUpdateHandler(onUpdate);

    return (
        <div className={styles.fabContainer}>
            <div className={styles.iconWrapper}>
                <BuilderImage
                    id={imageId}
                    src={typeof image === 'object' && image?.src ? image.src : image}
                    isVisible={imageVisible}
                    onSrcChange={update('image')}
                    onIdChange={update('imageId')}
                    onVisibilityChange={update('imageVisible')}
                    className={`${styles.fabImage} ${styles.passiveImage} imagePlaceholder-1-1`}
                    sectionId={sectionId}
                    suffix="icon"
                    showLinkControls={true}

                    // Link props passed directly to Image
                    linkType={linkType}
                    href={url}
                    targetDialogId={targetDialogId}
                    openInNewTab={openInNewTab}

                    onLinkTypeChange={update('linkType')}
                    onHrefChange={update('url')}
                    onTargetDialogIdChange={update('targetDialogId')}
                    onOpenInNewTabChange={update('openInNewTab')}
                />
            </div>
        </div>
    );
}
