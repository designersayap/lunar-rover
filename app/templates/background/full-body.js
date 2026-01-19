import { createUpdateHandler } from "../utils/component-helpers";
import BuilderImage from "@/app/page-builder/utils/builder/builder-image";
const DEFAULT_PLACEHOLDER_IMAGE = "https://res.cloudinary.com/difjtkwvg/image/upload/v1765455555/placeholder_falj5i.svg";
import styles from "./full-body.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState, useContext } from "react"; // Added useContext
import { BuilderSelectionContext } from "@/app/page-builder/utils/builder/builder-controls"; // Added import

export default function BackgroundFullBody({ image, imageId, imageVisible, sectionId, uniqueId, onUpdate }) {
    const update = createUpdateHandler(onUpdate);
    const [mounted, setMounted] = useState(false);
    const { activeElementId } = useContext(BuilderSelectionContext); // Get context

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    // Check if the overall section or component is selected
    const isSectionActive = activeElementId === sectionId || activeElementId === uniqueId;

    const portalRoot = document.getElementById("canvas-background-root");
    if (!portalRoot) return null;
    return createPortal(
        <div className={styles.container}>
            <div className={`container-grid container-full`} style={{ height: '100%' }}>
                <BuilderImage
                    src={image}
                    isActive={isSectionActive ? true : undefined} // Pass active state if section is active, otherwise let it handle itself
                    onSrcChange={update('image')}
                    alt="Background Image"
                    className={styles.image}
                    isVisible={imageVisible}
                    sectionId={sectionId}
                    id={imageId}
                    onIdChange={update('imageId')}
                    suffix="bg"
                    showLinkControls={false}
                    style={{ objectPosition: 'top center' }}
                    alwaysShowSrc={true}
                />
            </div>
        </div>,
        portalRoot
    );
}
