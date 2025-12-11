
import { useState, useMemo } from "react";
import {
    PlusIcon,
    CursorArrowRaysIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    TrashIcon,
    ArrowUturnLeftIcon
} from "@heroicons/react/24/outline";
import { TrashIcon as TrashIconSolid } from "@heroicons/react/24/solid";
import styles from "../page.module.css";
import { componentLibrary } from "./content/component-library";
import SidebarAnalyticsTab from "./sidebar-analytics-tab";


export default function Sidebar({
    activeTab,
    setActiveTab,
    analyticsData,
    setAnalyticsData,
    selectedComponents,
    updateSectionId,
    updateComponent,
    onAddClick,
    activeElementId,
    setActiveElementId,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    draggedIndex,
    dropTargetIndex,
    isAddPopoverOpen,
    removeComponent
}) {
    const [layerSearch, setLayerSearch] = useState("");
    const [expandedSections, setExpandedSections] = useState({});

    // Toggle section expand/collapse
    const toggleSection = (uniqueId) => {
        setExpandedSections(prev => ({
            ...prev,
            [uniqueId]: !prev[uniqueId]
        }));
    };

    // ID Sanitization: Enforce URL-friendly format (lowercase, hyphens)
    // - Replaces spaces with dashes
    // - Removes duplicate dashes
    // - Allows trailing dashes so users can type naturally before blur
    const sanitizeId = (value) => value.toLowerCase().trimStart().replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+/, '');

    // ID Finalization: Cleanup when user finishes typing (removes trailing dashes)
    const sanitizeIdFinal = (value) => sanitizeId(value).replace(/-+$/, '');

    // Helper to find component definition
    const getComponentDef = (id) => {
        for (const category of Object.values(componentLibrary)) {
            const found = category.find(c => c.id === id);
            if (found) return found;
        }
        return null;
    };

    // Search Filtering Logic
    // Matches against: Component Name, Section ID, or any Child Element (Button/Image/Link) properties
    const filteredComponents = useMemo(() => {
        if (!layerSearch.trim()) return selectedComponents;
        const searchLower = layerSearch.toLowerCase();
        return selectedComponents.filter(comp => {
            if (comp.name?.toLowerCase().includes(searchLower)) return true;
            if (comp.sectionId?.toLowerCase().includes(searchLower)) return true;
            const def = getComponentDef(comp.id);
            const buttons = def?.buttons || [];
            const images = def?.images || [];
            const links = def?.links || [];
            const allChildren = [...buttons, ...images, ...links];
            return allChildren.some(child => {
                const currentId = comp.props?.[child.propId] || (comp.sectionId ? `${comp.sectionId}-${child.suffix}` : '');
                return child.label?.toLowerCase().includes(searchLower) || currentId.toLowerCase().includes(searchLower);
            });
        });
    }, [selectedComponents, layerSearch]);

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarSection}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === "elements" ? styles.tabActive : styles.tabInactive} `}
                        onClick={() => setActiveTab("elements")}
                    >
                        Layers
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "analytics" ? styles.tabActive : styles.tabInactive} `}
                        onClick={() => setActiveTab("analytics")}
                    >
                        Analytics
                    </button>
                </div>
            </div>

            {activeTab === "elements" ? (
                <>
                    {/* Search Bar + Add Button */}
                    <div className={styles.searchRow}>
                        <div className={styles.searchInputWrapper}>
                            <MagnifyingGlassIcon className={styles.searchIcon} />
                            <input
                                type="text"
                                className={`${styles.formInput} ${styles.searchBar} `}
                                placeholder="Search layers"
                                value={layerSearch}
                                onChange={(e) => setLayerSearch(e.target.value)}
                            />
                        </div>
                        <button
                            className={`${styles.generatorButton} ${styles.sidebarAddButton} ${isAddPopoverOpen ? styles.generatorButtonActive : ''} `}
                            data-tooltip="Add Layer"
                            onClick={(e) => onAddClick(e.currentTarget.getBoundingClientRect())}
                        >
                            <PlusIcon className={styles.sidebarAddIcon} />
                        </button>
                    </div>

                    <div className={styles.treeContainer}>
                        {filteredComponents.length === 0 ? (
                            <div className={styles.sidebarEmptyState}>
                                {selectedComponents.length === 0 ? "No layers added" : "No matching layers"}
                            </div>
                        ) : (
                            filteredComponents.map((comp) => {
                                const def = getComponentDef(comp.id);
                                const allButtons = def?.buttons || [];
                                const allImages = (def?.images || []).map(img => ({ ...img, type: 'image' }));
                                const allLinks = (def?.links || []).map(link => ({ ...link, type: 'link' }));
                                const allChildren = [...allButtons, ...allImages, ...allLinks];
                                const isActive = activeElementId === comp.sectionId;
                                const originalIndex = selectedComponents.findIndex(c => c.uniqueId === comp.uniqueId);

                                // Child Filtering:
                                // If search matches specific children, show only those.
                                // If search matches the parent, show ALL children.
                                const searchLower = layerSearch.toLowerCase().trim();
                                const filteredChildren = searchLower
                                    ? allChildren.filter(child => {
                                        const currentId = comp.props?.[child.propId] || (comp.sectionId ? `${comp.sectionId}-${child.suffix}` : '');
                                        return child.label?.toLowerCase().includes(searchLower) || currentId.toLowerCase().includes(searchLower);
                                    })
                                    : allChildren;

                                // Check if parent itself matches (show all children if parent matches)
                                const parentMatches = !searchLower ||
                                    comp.name?.toLowerCase().includes(searchLower) ||
                                    comp.sectionId?.toLowerCase().includes(searchLower);

                                const childrenToShow = parentMatches ? allChildren : filteredChildren;

                                // Visual Drag Feedback:
                                // Determine where to show the "drop line" (above or below) based on drag direction
                                const isDragDown = draggedIndex !== null && draggedIndex < originalIndex;
                                const isTarget = dropTargetIndex === originalIndex;

                                return (
                                    <div
                                        key={comp.uniqueId}
                                        className={styles.treeGroup}
                                        draggable={handleDragStart ? "true" : "false"}
                                        onDragStart={(e) => handleDragStart && handleDragStart(e, originalIndex, comp.name)}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => handleDragOver && handleDragOver(e, originalIndex)}
                                        onDrop={(e) => handleDrop && handleDrop(e, originalIndex)}
                                        style={{
                                            opacity: draggedIndex === originalIndex ? 0.5 : 1,
                                            borderTop: isTarget && !isDragDown ? '2px solid var(--brand-color-300)' : 'none',
                                            borderBottom: isTarget && isDragDown ? '2px solid var(--brand-color-300)' : 'none',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {/* Component Header - shows ID directly */}
                                        <div
                                            className={`${styles.treeRow} ${isActive ? styles.treeRowActive : ''} `}
                                            onClick={() => setActiveElementId && setActiveElementId(comp.sectionId)}
                                        >
                                            <button
                                                className={styles.treeChevron}
                                                style={{ visibility: childrenToShow.length > 0 ? 'visible' : 'hidden' }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (childrenToShow.length > 0) toggleSection(comp.uniqueId);
                                                }}
                                            >
                                                <ChevronRightIcon
                                                    className={`${styles.treeChevronIcon} ${expandedSections[comp.uniqueId] ? styles.treeChevronExpanded : ''} `}
                                                />
                                            </button>
                                            <input
                                                type="text"
                                                value={comp.sectionId || ''}
                                                onChange={(e) => updateSectionId(comp.uniqueId, sanitizeId(e.target.value))}
                                                onBlur={(e) => {
                                                    const finalValue = sanitizeIdFinal(e.target.value);
                                                    if (!finalValue.trim()) {
                                                        updateSectionId(comp.uniqueId, comp.sectionId || 'section');
                                                    } else {
                                                        updateSectionId(comp.uniqueId, finalValue);
                                                    }
                                                }}
                                                onFocus={() => setActiveElementId && setActiveElementId(comp.sectionId)}
                                                onClick={(e) => e.stopPropagation()}
                                                className={styles.treeInputInline}
                                            />
                                            <button
                                                className={styles.sidebarDeleteButton}
                                                data-tooltip="Delete Layer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeComponent && removeComponent(comp.uniqueId);
                                                }}
                                            >
                                                <TrashIcon className={`${styles.treeDeleteIcon} ${styles.iconOutline}`} />
                                                <TrashIconSolid className={`${styles.treeDeleteIcon} ${styles.iconSolid}`} />
                                            </button>
                                        </div>

                                        {/* Nested Children - collapsible */}
                                        {expandedSections[comp.uniqueId] && (
                                            <div className={styles.treeChildren}>
                                                {childrenToShow.map((child, childIndex) => {
                                                    // Normalize sectionId by removing trailing dashes to prevent double-dash
                                                    const normalizedSectionId = comp.sectionId?.replace(/-+$/, '') || '';
                                                    const currentId = comp.props?.[child.propId] || (normalizedSectionId ? `${normalizedSectionId}-${child.suffix}` : '');
                                                    const isChildActive = activeElementId === currentId;

                                                    // Extract suffix from currentId (part after normalizedSectionId-)
                                                    const prefix = normalizedSectionId ? `${normalizedSectionId}-` : '';
                                                    // Strip leading dashes from suffix to handle legacy corrupted data
                                                    const rawSuffix = currentId.startsWith(prefix) ? currentId.slice(prefix.length) : currentId;
                                                    const suffix = rawSuffix.replace(/^-+/, '');

                                                    return (
                                                        <div
                                                            key={childIndex}
                                                            className={`${styles.treeRow} ${isChildActive ? styles.treeRowActive : ''} ${styles.treeRowNested} `}
                                                            onClick={() => setActiveElementId && setActiveElementId(currentId)}
                                                        >
                                                            <div
                                                                className={styles.treeIconWrapper}
                                                                style={{ opacity: comp.props?.[child.visibleProp] === false ? 0.25 : 1 }}
                                                            >
                                                                {/* Generic icon or specific based on type */}
                                                                <CursorArrowRaysIcon className={styles.treeIcon} />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={suffix}
                                                                onChange={(e) => {
                                                                    const newFullId = prefix + sanitizeId(e.target.value);
                                                                    updateComponent(comp.uniqueId, { [child.propId]: newFullId });
                                                                }}
                                                                onBlur={(e) => {
                                                                    if (!e.target.value.trim()) {
                                                                        updateComponent(comp.uniqueId, { [child.propId]: prefix + child.suffix });
                                                                    }
                                                                }}
                                                                onFocus={() => setActiveElementId && setActiveElementId(currentId)}
                                                                onClick={(e) => e.stopPropagation()}
                                                                className={styles.treeInputInline}
                                                                style={{ opacity: comp.props?.[child.visibleProp] === false ? 0.25 : 1 }}
                                                            />
                                                            {child.visibleProp && (
                                                                comp.props?.[child.visibleProp] === false ? (
                                                                    <button
                                                                        className={styles.sidebarDeleteButton}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            updateComponent(comp.uniqueId, { [child.visibleProp]: true });
                                                                        }}
                                                                    >
                                                                        <ArrowUturnLeftIcon className={`${styles.treeDeleteIcon}`} />
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className={styles.sidebarDeleteButton}
                                                                        data-tooltip="Delete Layer"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();

                                                                            // Guard Rail: Prevent user from deleting the last accordion item
                                                                            // A dialog must have at least one active item to function correctly
                                                                            if (comp.id === 'dialog-accordion') {
                                                                                const visibleCount = allChildren.filter(c => comp.props?.[c.visibleProp] !== false).length;
                                                                                if (visibleCount <= 1) {
                                                                                    alert("At least one accordion item must remain visible.");
                                                                                    return;
                                                                                }
                                                                            }

                                                                            // Guard Rail: Terra Testimony must have at least 3 items
                                                                            if (comp.id === 'terra-testimony') {
                                                                                const visibleCount = allChildren.filter(c => comp.props?.[c.visibleProp] !== false).length;
                                                                                if (visibleCount <= 3) {
                                                                                    alert("At least 3 testimony cards must remain visible.");
                                                                                    return;
                                                                                }
                                                                            }

                                                                            // Calculate current visibility state properly
                                                                            const isVisible = comp.props?.[child.visibleProp] !== false;

                                                                            // If we are hiding it and it's currently selected, deselect it immediately
                                                                            if (isVisible && activeElementId === currentId) {
                                                                                setActiveElementId(null);
                                                                            }

                                                                            updateComponent(comp.uniqueId, { [child.visibleProp]: false });
                                                                        }}
                                                                        style={{
                                                                            opacity: (
                                                                                (comp.id === 'dialog-accordion' && allChildren.filter(c => comp.props?.[c.visibleProp] !== false).length <= 1) ||
                                                                                (comp.id === 'terra-testimony' && allChildren.filter(c => comp.props?.[c.visibleProp] !== false).length <= 3)
                                                                            ) ? 0.3 : 1,
                                                                            cursor: (
                                                                                (comp.id === 'dialog-accordion' && allChildren.filter(c => comp.props?.[c.visibleProp] !== false).length <= 1) ||
                                                                                (comp.id === 'terra-testimony' && allChildren.filter(c => comp.props?.[c.visibleProp] !== false).length <= 3)
                                                                            ) ? 'not-allowed' : 'pointer'
                                                                        }}
                                                                    >
                                                                        <TrashIcon className={`${styles.treeDeleteIcon} ${styles.iconOutline}`} />
                                                                        <TrashIconSolid className={`${styles.treeDeleteIcon} ${styles.iconSolid}`} />
                                                                    </button>
                                                                )
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )
                                        }
                                    </div>
                                );
                            })
                        )}
                    </div>
                </>
            ) : (
                <SidebarAnalyticsTab
                    analyticsData={analyticsData}
                    setAnalyticsData={setAnalyticsData}
                />
            )
            }
        </div >
    );
}
