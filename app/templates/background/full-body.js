import { createUpdateHandler } from "../utils/component-helpers";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
import styles from "./full-body.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState, useContext } from "react"; // Added useContext
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls"; // Added import

export default function FullBody({ image, imageId, imageVisible, sectionId, onUpdate }) {
    const update = createUpdateHandler(onUpdate);
    const [mounted, setMounted] = useState(false);
    const { activeElementId } = useContext(BuilderSelectionContext); // Get context

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    // Check if the overall section is selected
    const isSectionActive = activeElementId === sectionId;

    const portalRoot = document.getElementById("canvas-background-root");
    if (!portalRoot) return null;
    return createPortal(
        <div className={styles.container}>
            <div className={`container-grid container-full`} style={{ height: '100%' }}>
                <BuilderImage
                    src={image}
                    isActive={isSectionActive} // Pass active state
                    onSrcChange={update('image')}
                    alt="Background Image"
                    className={styles.image}
                    isVisible={imageVisible}
                    sectionId={sectionId}
                    id={imageId}
                    onIdChange={update('imageId')}
                    suffix="full-body-bg"
                    showLinkControls={false}
                    style={{ objectPosition: 'top center' }}
                />
            </div>
        </div>,
        portalRoot
    );
}
