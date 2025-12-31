import { createUpdateHandler } from "../utils/component-helpers";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
import styles from "./full-body.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function FullBody({ image, imageId, imageVisible, sectionId, onUpdate }) {
    const update = createUpdateHandler(onUpdate);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    const portalRoot = document.getElementById("canvas-background-root");

    // Fallback: If root not found (e.g. in other contexts), return null or render inline (but inline might break layout)
    if (!portalRoot) return null;

    // We render the wrapper into the portal root
    // The previous implementation had a wrapper div with styles.container.
    // We keep that to maintain style structure.
    return createPortal(
        <div className={styles.container}>
            <div className={`container-grid container-full ${styles.imageWrapper}`}>
                <BuilderImage
                    src={image}
                    onSrcChange={update('image')}
                    alt="Background Image"
                    className={styles.image}
                    isVisible={imageVisible}
                    sectionId={sectionId}
                    id={imageId}
                    onIdChange={update('imageId')}
                    suffix="full-body-bg"
                    showLinkControls={false}
                />
            </div>
        </div>,
        portalRoot
    );
}
