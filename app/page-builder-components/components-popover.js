import { useState, useMemo, useEffect } from "react";
import {
    ChevronUpIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import styles from "../page.module.css";
import { searchComponents } from "./utils/search";
import BasePopover from "./utils/base-popover";

export default function ComponentsPopover({
    componentLibrary,
    openCategories,
    toggleCategory,
    addComponent,
    isOpen,
    onClose,
    position
}) {
    const [elementSearch, setElementSearch] = useState("");

    const filteredLibrary = useMemo(() =>
        searchComponents(elementSearch, componentLibrary),
        [elementSearch, componentLibrary]
    );

    useEffect(() => {
        if (elementSearch) {
            const categories = Object.keys(filteredLibrary);
            if (categories.length > 0) {
                toggleCategory(categories[0], true);
            }
        }
    }, [filteredLibrary, elementSearch, toggleCategory]);

    return (
        <BasePopover
            isOpen={isOpen}
            onClose={onClose}
            position={position}
            className={styles.componentsPopover}
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
                            <div
                                className={styles.categoryHeader}
                                onClick={() => toggleCategory(category)}
                            >
                                <span className="caption-bold">{category}</span>
                                {openCategories[category] ? (
                                    <ChevronUpIcon style={{ width: "12px", height: "12px" }} />
                                ) : (
                                    <ChevronDownIcon style={{ width: "12px", height: "12px" }} />
                                )}
                            </div>
                            <div className={`${styles.accordionContent} ${openCategories[category] ? styles.accordionContentOpen : ''}`}>
                                <div className={styles.accordionInner}>
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
                                                    <p className={styles.cardTitle}>
                                                        {comp.name}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </BasePopover>
    );
}
