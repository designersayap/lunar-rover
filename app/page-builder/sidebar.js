import { useState, useMemo, useEffect, memo } from "react";
import {
    PlusIcon,
    CursorArrowRaysIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    TrashIcon,
    ArrowUturnLeftIcon,
    Square2StackIcon,
    StopIcon,
    FolderOpenIcon,
    FolderIcon,
    ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/outline";
import { TrashIcon as TrashIconSolid, FolderOpenIcon as FolderOpenIconSolid, FolderIcon as FolderIconSolid, ArrowLeftStartOnRectangleIcon as ArrowLeftStartOnRectangleIconSolid } from "@heroicons/react/24/solid";
import styles from "../page.module.css";
import { componentLibrary } from "./content/component-library";
import { isComponentSticky, getValueAt } from "./utils/component-manager";
import SidebarAnalyticsTab from "./sidebar-analytics-tab";
import FloatingMergeButton from "./utils/builder/floating-merge-button";

// Helpers
const sanitizeId = (value) => value.toLowerCase().trimStart().replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+/, '');
const sanitizeIdFinal = (value) => sanitizeId(value).replace(/-+$/, '');

const getComponentDef = (id) => {
    for (const category of Object.values(componentLibrary)) {
        const found = category.find(c => c.id === id);
        if (found) return found;
    }
    return null;
};

// Extracted ComponentTreeItem
const ComponentTreeItem = memo(({
    comp,
    index,
    depth = 0,
    parentId = null,
    // Context Props
    activeElementId,
    setActiveElementId,
    selectedIds,
    handleSelectToggle,
    expandedSections,
    toggleSection,
    updateSectionId,
    updateComponent,
    onUngroup,
    removeComponent,
    // DnD Props
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    draggedIndex,
    dropTargetIndex
}) => {
    const def = getComponentDef(comp.id);
    const allButtons = def?.buttons || [];
    const allImages = (def?.images || []).map(img => ({ ...img, type: 'image' }));
    const allLinks = (def?.links || []).map(link => ({ ...link, type: 'link' }));
    const allTexts = (def?.texts || []).map(text => ({ ...text, type: 'text' }));
    const allChildren = [...allTexts, ...allButtons, ...allImages, ...allLinks];

    const isActive = activeElementId === comp.sectionId || activeElementId === comp.uniqueId;
    const isGroup = comp.id === 'scroll-group';
    const groupChildren = isGroup ? (comp.props.components || []) : [];

    const isSelected = selectedIds.includes(comp.uniqueId);

    return (
        <div
            className={styles.treeGroup}
            draggable
            onDragStart={(e) => {
                e.stopPropagation();
                handleDragStart && handleDragStart(e, index, comp.name, null, { parentId, uniqueId: comp.uniqueId });
            }}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => {
                e.stopPropagation();
                handleDragOver && handleDragOver(e, index, { parentId });
            }}
            onDrop={(e) => {
                e.stopPropagation();
                handleDrop && handleDrop(e, index, { parentId });
            }}
            style={{
                opacity: draggedIndex?.index === index && draggedIndex?.parentId === parentId ? 0.5 : 1,
                borderTop: dropTargetIndex?.index === index && dropTargetIndex?.parentId === parentId ? '2px solid var(--brand-color-300)' : 'none',
                paddingLeft: depth * 12
            }}
        >
            <div
                className={`${styles.treeRow} ${isActive || isSelected ? styles.treeRowActive : ''}`}
                onClick={(e) => {
                    if (e.metaKey || e.ctrlKey) {
                        e.stopPropagation();
                        // Handle toggle via props
                        handleSelectToggle(comp.uniqueId, true);
                    } else {
                        // Single select: Use uniqueId to ensure grouping works
                        setActiveElementId && setActiveElementId(comp.uniqueId);
                    }
                }}
            >

                {/* Expand/Collapse for Groups or Components with Children */}
                <button
                    className={styles.treeChevron}
                    style={{ visibility: (allChildren.length > 0 || groupChildren.length > 0) ? 'visible' : 'hidden' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSection(comp.uniqueId);
                    }}
                >
                    {isGroup ? (
                        expandedSections[comp.uniqueId] ? (
                            <FolderOpenIcon style={{ width: 14, height: 14, color: 'var(--grey-200)' }} />
                        ) : (
                            <FolderIcon style={{ width: 14, height: 14, color: 'var(--grey-200)' }} />
                        )
                    ) : (
                        <ChevronRightIcon
                            className={`${styles.treeChevronIcon} ${expandedSections[comp.uniqueId] ? styles.treeChevronExpanded : ''}`}
                        />
                    )}
                </button>

                {/* Component Icon / Name */}

                <input
                    type="text"
                    value={comp.sectionId || ''}
                    onChange={(e) => updateSectionId(comp.uniqueId, sanitizeId(e.target.value))}
                    onBlur={(e) => {
                        const finalValue = sanitizeIdFinal(e.target.value);
                        updateSectionId(comp.uniqueId, finalValue || comp.sectionId || 'section');
                    }}
                    onFocus={() => setActiveElementId && setActiveElementId(comp.sectionId)}
                    onMouseDown={(e) => {
                        if (e.metaKey || e.ctrlKey) {
                            e.preventDefault(); // Prevent focus
                            e.stopPropagation();
                        } else {
                            e.stopPropagation();
                        }
                    }}
                    onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onClick={(e) => {
                        if (e.metaKey || e.ctrlKey) {
                            e.stopPropagation();
                            handleSelectToggle(comp.uniqueId, true);
                        } else {
                            e.stopPropagation();
                        }
                    }}
                    className={styles.treeInputInline}
                    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                />

                {/* Actions */}
                <div className={styles.treeActions}>
                    {/* Ungroup Button */}
                    {isGroup && (
                        <button
                            className={styles.sidebarDeleteButton}
                            data-tooltip="Ungroup"
                            onClick={(e) => {
                                e.stopPropagation();
                                onUngroup && onUngroup(comp.uniqueId);
                            }}
                        >
                            <ArrowLeftStartOnRectangleIcon className={`${styles.treeDeleteIcon} ${styles.iconOutline}`} />
                            <ArrowLeftStartOnRectangleIconSolid className={`${styles.treeDeleteIcon} ${styles.iconSolid}`} />
                        </button>
                    )}

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
            </div>

            {/* Render Children (Configurable Props or Nested Components) */}
            {expandedSections[comp.uniqueId] && (
                <div className={styles.treeChildren}>
                    {/* Nested Components (Parallax Group) */}
                    {groupChildren.map((child, i) => (
                        <ComponentTreeItem
                            key={child.uniqueId}
                            comp={child}
                            index={i}
                            depth={depth + 1}
                            parentId={comp.uniqueId}
                            // Pass all context props down
                            activeElementId={activeElementId}
                            setActiveElementId={setActiveElementId}
                            selectedIds={selectedIds}
                            handleSelectToggle={handleSelectToggle}
                            expandedSections={expandedSections}
                            toggleSection={toggleSection}
                            updateSectionId={updateSectionId}
                            updateComponent={updateComponent}
                            onUngroup={onUngroup}
                            removeComponent={removeComponent}
                            handleDragStart={handleDragStart}
                            handleDragEnd={handleDragEnd}
                            handleDragOver={handleDragOver}
                            handleDrop={handleDrop}
                            draggedIndex={draggedIndex}
                            dropTargetIndex={dropTargetIndex}
                        />
                    ))}

                    {/* Internal Configurable Elements (Buttons, Text, etc.) */}
                    {allChildren.map((child, childIndex) => {
                        const normalizedSectionId = comp.sectionId?.replace(/-+$/, '') || '';
                        const currentId = getValueAt(comp.props, child.propId) || (normalizedSectionId ? `${normalizedSectionId}-${child.suffix}` : '');
                        const isChildActive = activeElementId === currentId;
                        const prefix = normalizedSectionId ? `${normalizedSectionId}-` : '';
                        const rawSuffix = currentId.startsWith(prefix) ? currentId.slice(prefix.length) : currentId;
                        const suffix = rawSuffix.replace(/^-+/, '');

                        return (
                            <div
                                key={`prop-${childIndex}`}
                                className={`${styles.treeRow} ${isChildActive ? styles.treeRowActive : ''} ${styles.treeRowNested}`}
                                style={{ paddingLeft: (depth + 1) * 12 + 24 }}
                                onClick={() => setActiveElementId && setActiveElementId(currentId)}
                            >
                                <div
                                    className={styles.treeIconWrapper}
                                    style={{ opacity: getValueAt(comp.props, child.visibleProp) === false ? 0.25 : 1 }}
                                >
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
                                    onMouseDown={(e) => {
                                        if (e.metaKey || e.ctrlKey) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        } else {
                                            e.stopPropagation();
                                        }
                                    }}
                                    onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                    onClick={(e) => {
                                        if (e.metaKey || e.ctrlKey) {
                                            e.stopPropagation();
                                            // For nested items, we toggle the parent? Or the item itself?
                                            // The item is part of the component props (text/button).
                                            // Usually we select the Component.
                                            // If we Cmd+Click a property row, we probably mean to select the Component.
                                            handleSelectToggle(comp.uniqueId, true);
                                        } else {
                                            e.stopPropagation();
                                        }
                                    }}
                                    className={styles.treeInputInline}
                                    style={{
                                        opacity: getValueAt(comp.props, child.visibleProp) === false ? 0.25 : 1,
                                        pointerEvents: isChildActive ? 'auto' : 'none'
                                    }}
                                />
                                {/* Actions */}
                                <div className={styles.treeActions}>
                                    {child.visibleProp && (
                                        <button
                                            className={styles.sidebarDeleteButton}
                                            data-tooltip={getValueAt(comp.props, child.visibleProp) === false ? "Show" : "Hide"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const currentVal = getValueAt(comp.props, child.visibleProp);
                                                updateComponent(comp.uniqueId, { [child.visibleProp]: !currentVal });
                                            }}
                                        >
                                            {getValueAt(comp.props, child.visibleProp) === false ? (
                                                <ArrowUturnLeftIcon className={`${styles.treeDeleteIcon}`} />
                                            ) : (
                                                <>
                                                    <TrashIcon className={`${styles.treeDeleteIcon} ${styles.iconOutline}`} />
                                                    <TrashIconSolid className={`${styles.treeDeleteIcon} ${styles.iconSolid}`} />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
});

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
    removeComponent,
    onGroup,
    onUngroup,
    selectedElementIds = [],
    toggleElementSelection
}) {
    const [layerSearch, setLayerSearch] = useState("");
    const [expandedSections, setExpandedSections] = useState({});

    // Handle multi-select toggle
    const handleSelectToggle = (uniqueId, multi) => {
        if (toggleElementSelection) {
            toggleElementSelection(uniqueId, multi); // Always multi if handled here via cmd click
        }
    };

    // Toggle section expand/collapse
    const toggleSection = (uniqueId) => {
        setExpandedSections(prev => ({
            ...prev,
            [uniqueId]: !prev[uniqueId]
        }));
    };

    // Props Bundle to pass to TreeItem
    const treeItemProps = {
        activeElementId,
        setActiveElementId,
        selectedIds: selectedElementIds, // Map global prop to local prop name expected by Item
        handleSelectToggle,
        expandedSections,
        toggleSection,
        updateSectionId,
        updateComponent,
        onUngroup,
        removeComponent,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
        draggedIndex,
        dropTargetIndex
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarSection}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === "elements" ? styles.tabActive : styles.tabInactive}`}
                        onClick={() => setActiveTab("elements")}
                    >
                        Layers
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "analytics" ? styles.tabActive : styles.tabInactive}`}
                        onClick={() => setActiveTab("analytics")}
                    >
                        Settings
                    </button>
                </div>
            </div>

            {activeTab === "elements" ? (
                <>
                    {/* Search Bar + Actions */}
                    <div className={styles.searchRow}>
                        <div className={styles.searchInputWrapper}>
                            <MagnifyingGlassIcon className={styles.searchIcon} />
                            <input
                                type="text"
                                className={`${styles.formInput} ${styles.searchBar}`}
                                placeholder="Search layers"
                                value={layerSearch}
                                onChange={(e) => setLayerSearch(e.target.value)}
                            />
                        </div>
                        <button
                            className={`${styles.generatorButton} ${styles.sidebarAddButton} ${isAddPopoverOpen ? styles.generatorButtonActive : ''}`}
                            data-tooltip="Add Layer"
                            onClick={(e) => onAddClick(e.currentTarget.getBoundingClientRect())}
                        >
                            <PlusIcon className={styles.sidebarAddIcon} />
                        </button>
                    </div>

                    <div className={styles.treeContainer}>
                        {/* Logic to split pinned vs other, but using new renderer */}
                        {(() => {
                            const pinnedComps = selectedComponents.filter(c => isComponentSticky(c));
                            const otherComps = selectedComponents.filter(c => !isComponentSticky(c));

                            if (selectedComponents.length === 0) return <div className={styles.sidebarEmptyState}>No layers added</div>;

                            return (
                                <>
                                    {pinnedComps.length > 0 && (
                                        <div className={styles.categoryWrapper} style={{ marginBottom: 12 }}>
                                            <div className={`caption-regular`} style={{ padding: '4px 0', color: 'var(--grey-300)' }}>Pinned Layers</div>
                                            {pinnedComps.map((comp, i) => (
                                                <ComponentTreeItem
                                                    key={comp.uniqueId}
                                                    comp={comp}
                                                    index={i}
                                                    parentId="main"
                                                    {...treeItemProps}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {otherComps.length > 0 && (
                                        <div className={styles.categoryWrapper}>
                                            <div className={`caption-regular`} style={{ padding: '4px 0', color: 'var(--grey-300)' }}>Page Layers</div>
                                            {otherComps.map((comp, i) => (
                                                // Adjusted index for global DnD if needed, but keeping local index for now
                                                <ComponentTreeItem
                                                    key={comp.uniqueId}
                                                    comp={comp}
                                                    index={pinnedComps.length + i}
                                                    parentId="main"
                                                    {...treeItemProps}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            )
                        })()}
                    </div>
                </>
            ) : (
                <SidebarAnalyticsTab
                    analyticsData={analyticsData}
                    setAnalyticsData={setAnalyticsData}
                />
            )}
            {/* Merge Button (Floats at bottom of sidebar) */}
            <FloatingMergeButton
                selectedCount={selectedElementIds.length}
                onMerge={() => handleSelectToggle && handleSelectToggle(null, false) || onGroup(selectedElementIds)} // Actually onGroup needs ids. onGroup is props.
            />
        </div>
    );
}
