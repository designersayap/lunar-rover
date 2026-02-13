import { useState, useMemo, useEffect } from "react";
import {
    MagnifyingGlassIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import styles from "../page.module.css";
import { searchComponents } from "./utils/component-manager";
import BasePopover from "./base-popover";

export default function ComponentsPopover({
    componentLibrary,
    addComponent,
    isOpen,
    onClose,
    position,
    className = ""
}) {
    const [elementSearch, setElementSearch] = useState("");

    const filteredLibrary = useMemo(() =>
        searchComponents(elementSearch, componentLibrary),
        [elementSearch, componentLibrary]
    );

    useEffect(() => {
    }, [filteredLibrary, elementSearch]);

    return (
        <BasePopover
            isOpen={isOpen}
            onClose={onClose}
            position={position}
            className={`${styles.componentsPopover} ${className}`}
            width={362}
        >
            <div className={styles.popoverHeaderCustom}>
                <span className={styles.popoverTitleCustom}>Add</span>
                <button onClick={onClose} className={styles.closeButtonCustom}>
                    <XMarkIcon className={styles.closeIconCustom} />
                </button>
            </div>
            <div style={{ padding: 'var(--pb-space-sm) var(--pb-space-lg) 0' }}>
                <div className={styles.searchInputWrapper}>
                    <MagnifyingGlassIcon className={styles.searchIcon} />
                    <input
                        className={`${styles.formInput} ${styles.searchBar}`}
                        type="text"
                        placeholder="Search Section"
                        value={elementSearch}
                        onChange={(e) => setElementSearch(e.target.value)}
                        autoFocus
                    />
                </div>
            </div>

            <div className={styles.popoverContent} style={{ maxHeight: '400px', overflowY: 'auto', padding: 0 }}>
                {Object.keys(filteredLibrary).length === 0 ? (
                    <div className={styles.sidebarEmptyState}>
                        No elements found
                    </div>
                ) : (
                    <div className={styles.popoverList}>
                        {Object.values(filteredLibrary).flatMap(components => components).map((comp) => (
                            <button
                                key={comp.id}
                                onClick={(e) => {
                                    // Find category for this component (since we flattened the list)
                                    const category = Object.keys(filteredLibrary).find(cat =>
                                        filteredLibrary[cat].some(c => c.id === comp.id)
                                    );
                                    addComponent(comp, category, e);
                                }}
                                className={styles.popoverCard}
                            >
                                <img
                                    src={comp.thumbnail}
                                    alt={comp.name}
                                    style={{
                                        width: "52px",
                                        height: "52px",
                                        objectFit: "contain",
                                        flexShrink: 0
                                    }}
                                />
                                <div className={styles.cardContent}>
                                    <p className={`${styles.cardTitle} caption-regular`}>
                                        {comp.name}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </BasePopover>
    );
}
