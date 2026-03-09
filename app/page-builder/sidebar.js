import { useState, memo } from "react";
import {
    PlusIcon,
    CursorArrowRaysIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    TrashIcon,
    ArrowUturnLeftIcon,
    FolderOpenIcon,
    FolderIcon,
    ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/outline";
import { TrashIcon as TrashIconSolid, ArrowLeftStartOnRectangleIcon as ArrowLeftStartOnRectangleIconSolid } from "@heroicons/react/24/solid";
import styles from "../page.module.css";
import { componentLibrary } from "./content/component-library";
import { isComponentSticky, getValueAt } from "./utils/component-manager";
import SidebarAnalyticsTab from "./sidebar-analytics-tab";
import FloatingMergeButton from "./utils/builder/floating-merge-button";
import Tooltip from "./tooltip";

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
    const allChildren = [...allImages, ...allTexts, ...allButtons, ...allLinks];

    const isActive = activeElementId === comp.sectionId || activeElementId === comp.uniqueId;
    const isGroup = comp.id === 'scroll-group';
    const groupChildren = isGroup ? (comp.props.components || []) : [];

    const isSelected = selectedIds.includes(comp.uniqueId);

    return (
        <div
            draggable
            onDragStart={(e) => {
                e.stopPropagation();
                handleDragStart && handleDragStart(e, index, comp.name, isGroup ? null : def?.thumbnail, { parentId, uniqueId: comp.uniqueId });
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
                paddingLeft: depth * 4
            }}
            className={`${styles.treeGroup} ${dropTargetIndex?.index === index && dropTargetIndex?.parentId === parentId ? styles.borderTopBrand : ''}`}
        >
            <div
                className={`${styles.listItem} ${isActive || isSelected ? styles.listItemActive : ''}`}
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
                            <FolderOpenIcon className={styles.treeIcon} />
                        ) : (
                            <FolderIcon className={styles.treeIcon} />
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
                        <Tooltip content="Ungroup" position="top">
                            <button
                                className={styles.sidebarDeleteButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onUngroup && onUngroup(comp.uniqueId);
                                }}
                            >
                                <ArrowLeftStartOnRectangleIcon className={`${styles.treeDeleteIcon} ${styles.iconOutline}`} />
                                <ArrowLeftStartOnRectangleIconSolid className={`${styles.treeDeleteIcon} ${styles.iconSolid}`} />
                            </button>
                        </Tooltip>
                    )}

                    <Tooltip content="Delete Layer" position="top">
                        <button
                            className={styles.sidebarDeleteButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                removeComponent && removeComponent(comp.uniqueId);
                            }}
                        >
                            <TrashIcon className={`${styles.treeDeleteIcon} ${styles.iconOutline}`} />
                            <TrashIconSolid className={`${styles.treeDeleteIcon} ${styles.iconSolid}`} />
                        </button>
                    </Tooltip>
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
                    {(() => {
                        const renderInternalItem = (child, childIndex, currentDepth, parentContext = {}) => {
                            const propParts = child.propId.split('.');
                            const itemPath = propParts.slice(0, -1).join('.');
                            const item = itemPath ? getValueAt(comp.props, itemPath) : null;
                            const exists = propParts.length > 1 ? !!item : true;

                            if (!exists) return null;

                            // Filter logic: Check if this item matches all parent context requirements
                            const contextEntries = Object.entries(parentContext);
                            if (contextEntries.length > 0 && item) {
                                const matchesContext = contextEntries.every(([key, value]) => item[key] === value);
                                if (!matchesContext) return null;
                            }

                            const normalizedSectionId = comp.sectionId?.replace(/-+$/, '') || '';
                            const currentId = getValueAt(comp.props, child.propId) || (normalizedSectionId ? `${normalizedSectionId}-${child.suffix}` : '');
                            const isChildActive = activeElementId === currentId;
                            const prefix = normalizedSectionId ? `${normalizedSectionId}-` : '';
                            const rawSuffix = currentId.startsWith(prefix) ? currentId.slice(prefix.length) : currentId;
                            const suffix = rawSuffix.replace(/^-+/, '');
                            const hasChildren = child.children && child.children.length > 0;
                            const isExpanded = expandedSections[`${comp.uniqueId}-${child.propId}`];

                            // Prepare context for children based on provideContext metadata
                            const nextContext = { ...parentContext };
                            if (child.provideContext) {
                                Object.entries(child.provideContext).forEach(([contextKey, propKey]) => {
                                    // If propKey is provided, get value from props, else use child.propId if not specified
                                    const value = getValueAt(comp.props, propKey || child.propId);
                                    nextContext[contextKey] = value;
                                });
                            }

                            return (
                                <div key={`${child.propId}-${childIndex}`}>
                                    <div
                                        className={`${styles.listItem} ${isChildActive ? styles.listItemActive : ''} ${styles.treeRowNested}`}
                                        style={{ paddingLeft: currentDepth * 4 + 8 }}
                                        onClick={() => setActiveElementId && setActiveElementId(currentId)}
                                    >
                                        <div
                                            className={styles.treeIconWrapper}
                                            style={{
                                                opacity: getValueAt(comp.props, child.visibleProp) === false ? 0.25 : 1,
                                                cursor: hasChildren ? 'pointer' : 'default'
                                            }}
                                            onClick={(e) => {
                                                if (hasChildren) {
                                                    e.stopPropagation();
                                                    toggleSection(`${comp.uniqueId}-${child.propId}`);
                                                }
                                            }}
                                        >
                                            {hasChildren ? (
                                                <FolderIcon className={styles.treeIcon} />
                                            ) : (
                                                <CursorArrowRaysIcon className={styles.treeIcon} />
                                            )}
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
                                                <Tooltip content={getValueAt(comp.props, child.visibleProp) === false ? "Show" : "Hide"} position="top">
                                                    {(() => {
                                                        const isDeleteDisabled = (() => {
                                                            if (!child.visibleProp || child.allowHideIfMoreThan === undefined) return false;
                                                            const parts = child.visibleProp.split('.');
                                                            if (parts.length < 2) return false;
                                                            const list = comp.props[parts[0]];
                                                            if (!Array.isArray(list)) return false;
                                                            const visibleItems = list.filter(item => item.visible !== false);
                                                            return visibleItems.length <= child.allowHideIfMoreThan;
                                                        })();

                                                        return (
                                                            <button
                                                                className={styles.sidebarDeleteButton}
                                                                disabled={isDeleteDisabled}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    const currentVal = getValueAt(comp.props, child.visibleProp) ?? true;
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
                                                        );
                                                    })()}
                                                </Tooltip>
                                            )}
                                        </div>
                                    </div>
                                    {hasChildren && isExpanded && (
                                        <div className={styles.treeChildren}>
                                            {child.children.map((subChild, subIndex) => renderInternalItem(subChild, subIndex, currentDepth + 1, nextContext))}

                                            {/* Add Action Link */}
                                            {child.addAction && (
                                                <div
                                                    className={styles.treeAddLink}
                                                    style={{ paddingLeft: (currentDepth + 1) * 4 + 8 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const { targetList, defaults, idPattern, label } = child.addAction;
                                                        const currentList = getValueAt(comp.props, targetList) || [];

                                                        // Merge parent context and defaults
                                                        const newDefaults = { ...defaults, ...nextContext };

                                                        // Handle ID patterns if provided (e.g. {categoryId}-{index})
                                                        if (idPattern) {
                                                            let newId = idPattern;
                                                            Object.entries(nextContext).forEach(([k, v]) => {
                                                                newId = newId.replace(`{${k}}`, v);
                                                            });
                                                            newId = newId.replace('{index}', currentList.length);

                                                            // Specific field to update (usually cardId or id)
                                                            const idField = child.addAction.idField || 'cardId';
                                                            newDefaults[idField] = newId;
                                                        }

                                                        updateComponent(comp.uniqueId, {
                                                            [targetList]: [...currentList, newDefaults]
                                                        });
                                                    }}
                                                >
                                                    <span>{child.addAction.label || 'Add item'}</span>
                                                    <PlusIcon className={styles.treeAddIcon} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        };

                        // Filter top-level items: only those that are NOT children of another item
                        const topLevelInternalItems = allChildren.filter(item => {
                            return !allChildren.some(parent => parent.children?.some(c => c.propId === item.propId));
                        });

                        const internalItems = topLevelInternalItems.map((child, index) => renderInternalItem(child, index, depth + 1));

                        return (
                            <>
                                {internalItems}
                                {def.addAction && (
                                    <div
                                        className={styles.treeAddLink}
                                        style={{ paddingLeft: (depth + 1) * 4 + 8 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const { targetList, defaults, idPattern, label } = def.addAction;
                                            const currentList = getValueAt(comp.props, targetList) || [];

                                            const newDefaults = { ...defaults };

                                            if (idPattern) {
                                                let newId = idPattern.replace('{index}', currentList.length);
                                                const idField = def.addAction.idField || 'cardId';
                                                newDefaults[idField] = newId;
                                            }

                                            updateComponent(comp.uniqueId, {
                                                [targetList]: [...currentList, newDefaults]
                                            });
                                        }}
                                    >
                                        <span>{def.addAction.label || 'Add item'}</span>
                                        <PlusIcon className={styles.treeAddIcon} />
                                    </div>
                                )}
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
});

ComponentTreeItem.displayName = 'ComponentTreeItem';

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
    toggleElementSelection,
    className = ""
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
        <div className={`${styles.sidebar} ${className}`} data-builder-ui="true">
            <div>
                <div className={styles.tabs}>
                    <Tooltip content="Layers" position="bottom">
                        <button
                            className={`${styles.tab} ${activeTab === "elements" ? styles.tabActive : styles.tabInactive}`}
                            onClick={() => setActiveTab("elements")}
                        >
                            Layers
                        </button>
                    </Tooltip>
                    <Tooltip content="SEO Configuration" position="bottom">
                        <button
                            className={`${styles.tab} ${activeTab === "seo" ? styles.tabActive : styles.tabInactive}`}
                            onClick={() => setActiveTab("seo")}
                        >
                            SEO
                        </button>
                    </Tooltip>
                    <Tooltip content="Open Graph Settings" position="bottom">
                        <button
                            className={`${styles.tab} ${activeTab === "opengraph" ? styles.tabActive : styles.tabInactive}`}
                            onClick={() => setActiveTab("opengraph")}
                        >
                            Open Graph
                        </button>
                    </Tooltip>
                    <Tooltip content="Analytics" position="bottom">
                        <button
                            className={`${styles.tab} ${activeTab === "analytics" ? styles.tabActive : styles.tabInactive}`}
                            onClick={() => setActiveTab("analytics")}
                        >
                            Analytics
                        </button>
                    </Tooltip>
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
                        <Tooltip content="Add Layer" position="bottom">
                            <button
                                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnIcon} ${isAddPopoverOpen ? styles.btnSecondaryActive : ''}`}
                                onClick={(e) => onAddClick(e.currentTarget.getBoundingClientRect())}
                            >
                                <PlusIcon className={styles.iconSmall} />
                            </button>
                        </Tooltip>
                    </div>

                    <div className={styles.treeContainer}>
                        {/* Logic to split pinned vs other, but using new renderer */}
                        {(() => {
                            const { pinnedComps, otherComps } = (() => {
                                // Deduplicate components
                                const uniqueComps = [];
                                const seenIds = new Set();

                                selectedComponents.forEach(comp => {
                                    if (comp.uniqueId && !seenIds.has(comp.uniqueId)) {
                                        seenIds.add(comp.uniqueId);
                                        uniqueComps.push(comp);
                                    }
                                });

                                const pinnedComps = uniqueComps.filter(c => isComponentSticky(c));
                                const otherComps = uniqueComps.filter(c => !isComponentSticky(c));

                                return { pinnedComps, otherComps };
                            })();

                            if (selectedComponents.length === 0) return <div className={styles.sidebarEmptyState}>No layers added</div>;

                            return (
                                <>
                                    {pinnedComps.length > 0 && (
                                        <div className={styles.categoryWrapper} style={{ marginBottom: 'var(--pb-space-md)' }}>
                                            <div className={`${styles.captionRegular} ${styles.pinnedLayersHeader}`}>Pinned Layers</div>
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
                                            <div className={`${styles.captionRegular} ${styles.pageLayersHeader}`}>Page Layers</div>
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
                    tab={activeTab}
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

Sidebar.displayName = 'Sidebar';
