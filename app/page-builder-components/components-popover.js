import { useState, useMemo, useEffect } from "react";
import {
    MagnifyingGlassIcon
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
            <div style={{ padding: '12px 16px' }}>
                <div className={styles.searchInputWrapper}>
                    <MagnifyingGlassIcon className={styles.searchIcon} />
                    <input
                        className={`${styles.formInput} ${styles.searchBar}`}
                        type="text"
                        placeholder="Search elements"
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
                    Object.entries(filteredLibrary).map(([category, components]) => (
                        <div key={category} className={styles.categoryWrapper}>
                            <div className={styles.categoryHeader} style={{ cursor: 'default' }}>
                                <span className="caption-regular">{category}</span>
                            </div>
                            <div className={styles.popoverGrid}>
                                {components.map((comp) => (
                                    <button
                                        key={comp.id}
                                        onClick={(e) => {
                                            addComponent(comp, category, e);
                                        }}
                                        className={styles.popoverCard}
                                    >
                                        <div className={styles.cardImageWrapper}>
                                            <img
                                                src={comp.thumbnail}
                                                alt={comp.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        </div>
                                        <div className={styles.cardContent}>
                                            <p className={`${styles.cardTitle} caption-regular`}>
                                                {comp.name}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </BasePopover>
    );
}
