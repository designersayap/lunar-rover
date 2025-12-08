
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

const ANALYTICS_SECTIONS = [
    {
        id: 'meta-description',
        title: 'Meta Description',
        type: 'textarea',
        key: 'metaDescription',
        tooltip: 'This description will appear in search engine results.'
    },
    {
        id: 'google',
        title: 'Google Tag Manager',
        type: 'input',
        key: 'googleTagManagerId',
        placeholder: 'i.e GTM-NNZFKBLC',
        tooltip: 'Generate this in the Google Cloud Console under APIs & Services > Credentials > Create Credentials > API Key.'
    },
    {
        id: 'tiktok',
        title: 'TikTok Ads',
        type: 'input',
        key: 'tikTokPixel'
    },
    {
        id: 'meta',
        title: 'Meta Ads',
        type: 'input',
        key: 'metaPixel'
    },
    {
        id: 'hotjar',
        title: 'Hotjar Analytics',
        type: 'input',
        key: 'hotjarId'
    }
];

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

    // Sanitize ID: replace spaces with dashes
    const sanitizeId = (value) => value.replace(/\s+/g, '-');

    // Helper to find component definition
    const getComponentDef = (id) => {
        for (const category of Object.values(componentLibrary)) {
            const found = category.find(c => c.id === id);
            if (found) return found;
        }
        return null;
    };

    // Filter layers based on search
    const filteredComponents = useMemo(() => {
        if (!layerSearch.trim()) return selectedComponents;
        const searchLower = layerSearch.toLowerCase();
        return selectedComponents.filter(comp => {
            if (comp.name?.toLowerCase().includes(searchLower)) return true;
            if (comp.sectionId?.toLowerCase().includes(searchLower)) return true;
            const def = getComponentDef(comp.id);
            const buttons = def?.buttons || [];
            return buttons.some(btn => {
                const currentId = comp.props?.[btn.propId] || (comp.sectionId ? `${comp.sectionId}-${btn.suffix}` : '');
                return btn.label?.toLowerCase().includes(searchLower) || currentId.toLowerCase().includes(searchLower);
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
                                const isActive = activeElementId === comp.sectionId;
                                const originalIndex = selectedComponents.findIndex(c => c.uniqueId === comp.uniqueId);

                                // Filter buttons if search is active
                                const searchLower = layerSearch.toLowerCase().trim();
                                const filteredButtons = searchLower
                                    ? allButtons.filter(btn => {
                                        const currentId = comp.props?.[btn.propId] || (comp.sectionId ? `${comp.sectionId}-${btn.suffix}` : '');
                                        return btn.label?.toLowerCase().includes(searchLower) || currentId.toLowerCase().includes(searchLower);
                                    })
                                    : allButtons;

                                // Check if parent itself matches (show all children if parent matches)
                                const parentMatches = !searchLower ||
                                    comp.name?.toLowerCase().includes(searchLower) ||
                                    comp.sectionId?.toLowerCase().includes(searchLower);

                                const buttonsToShow = parentMatches ? allButtons : filteredButtons;

                                // Determine drag direction relative to this item
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
                                                style={{ visibility: buttonsToShow.length > 0 ? 'visible' : 'hidden' }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (buttonsToShow.length > 0) toggleSection(comp.uniqueId);
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
                                                    if (!e.target.value.trim()) {
                                                        updateSectionId(comp.uniqueId, comp.sectionId || 'section');
                                                    }
                                                }}
                                                onFocus={() => setActiveElementId && setActiveElementId(comp.sectionId)}
                                                onClick={(e) => e.stopPropagation()}
                                                className={styles.treeInputInline}
                                            />
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
                                        </div>

                                        {/* Nested Buttons - collapsible */}
                                        {expandedSections[comp.uniqueId] && buttonsToShow.map((btn, btnIndex) => {
                                            const currentId = comp.props?.[btn.propId] || (comp.sectionId ? `${comp.sectionId}-${btn.suffix}` : '');
                                            const isBtnActive = activeElementId === currentId;

                                            // Extract suffix from currentId (part after sectionId-)
                                            const prefix = comp.sectionId ? `${comp.sectionId}-` : '';
                                            const suffix = currentId.startsWith(prefix) ? currentId.slice(prefix.length) : currentId;

                                            return (
                                                <div
                                                    key={btnIndex}
                                                    className={`${styles.treeRow} ${isBtnActive ? styles.treeRowActive : ''} ${styles.treeRowNested} `}
                                                    onClick={() => setActiveElementId && setActiveElementId(currentId)}
                                                >
                                                    <div className={styles.treeIconWrapper}>
                                                        <CursorArrowRaysIcon className={styles.treeIcon} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={suffix}
                                                        onChange={(e) => {
                                                            const newFullId = prefix + sanitizeId(e.target.value);
                                                            updateComponent(comp.uniqueId, { [btn.propId]: newFullId });
                                                        }}
                                                        onBlur={(e) => {
                                                            if (!e.target.value.trim()) {
                                                                updateComponent(comp.uniqueId, { [btn.propId]: prefix + btn.suffix });
                                                            }
                                                        }}
                                                        onFocus={() => setActiveElementId && setActiveElementId(currentId)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className={styles.treeInputInline}
                                                    />
                                                    {btn.visibleProp && (
                                                        comp.props?.[btn.visibleProp] === false ? (
                                                            <button
                                                                className={styles.sidebarDeleteButton}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    updateComponent(comp.uniqueId, { [btn.visibleProp]: true });
                                                                }}
                                                            >
                                                                <ArrowUturnLeftIcon className={`${styles.treeDeleteIcon}`} />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className={styles.sidebarDeleteButton}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    updateComponent(comp.uniqueId, { [btn.visibleProp]: false });
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
                                );
                            })
                        )}
                    </div>
                </>
            ) : (
                <div className={styles.analyticsContainer}>
                    <div className={styles.analyticsSection}>
                        {ANALYTICS_SECTIONS.map((section) => (
                            <div key={section.id} className={styles.analyticsRow}>
                                <div className={styles.analyticsHeader}>
                                    <label className={`caption - bold ${styles.formInputTitle} `}>{section.title}</label>
                                </div>
                                {section.type === 'input' ? (
                                    <input
                                        type="text"
                                        className={`${styles.formInput} `}
                                        placeholder={section.placeholder}
                                        value={analyticsData[section.key]}
                                        onChange={(e) => setAnalyticsData({ ...analyticsData, [section.key]: e.target.value })}
                                    />
                                ) : (
                                    <textarea
                                        className={`${styles.formInput} ${styles.formTextarea} ${styles.analyticsTextarea} `}
                                        placeholder={section.placeholder}
                                        value={analyticsData[section.key]}
                                        onChange={(e) => setAnalyticsData({ ...analyticsData, [section.key]: e.target.value })}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
