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
    if (!portalRoot) return null;
    return createPortal(
        <div className={styles.container}>
            <div className={`container-grid container-full`}>
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
