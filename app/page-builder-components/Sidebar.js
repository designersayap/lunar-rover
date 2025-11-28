import { useState, useMemo, useEffect } from "react";
import {
    ChevronUpIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
    LightBulbIcon,
} from "@heroicons/react/24/solid";
import styles from "../page.module.css";
import { searchComponents, searchAnalytics } from "./utils/search";

const ANALYTICS_SECTIONS = [
    {
        id: 'google',
        title: 'Google Analytics',
        type: 'input',
        key: 'googleAnalyticsId',
        placeholder: 'i.e GTM-NNZFKBLC',
        tooltip: 'Generate this in the Google Cloud Console under APIs & Services > Credentials > Create Credentials > API Key.'
    },
    {
        id: 'tiktok',
        title: 'TikTok Ads',
        type: 'textarea',
        key: 'tikTokPixel',
        placeholder: 'paste your script here'
    },
    {
        id: 'meta',
        title: 'Meta Ads',
        type: 'textarea',
        key: 'metaPixel',
        placeholder: 'paste your script here'
    },
    {
        id: 'hotjar',
        title: 'Hotjar Analytics',
        type: 'textarea',
        key: 'hotjarId',
        placeholder: 'paste your script here'
    }
];

export default function Sidebar({
    activeTab,
    setActiveTab,
    componentLibrary,
    openCategories,
    toggleCategory,
    addComponent,
    selectedComponentForConfig,
    analyticsData,
    setAnalyticsData
}) {
    const [elementSearch, setElementSearch] = useState("");
    const [analyticsSearch, setAnalyticsSearch] = useState("");

    const filteredLibrary = useMemo(() =>
        searchComponents(elementSearch, componentLibrary),
        [elementSearch, componentLibrary]
    );

    const filteredAnalyticsSections = useMemo(() =>
        searchAnalytics(analyticsSearch, ANALYTICS_SECTIONS),
        [analyticsSearch]
    );

    // Auto-open first category when searching
    useEffect(() => {
        if (elementSearch) {
            const categories = Object.keys(filteredLibrary);
            if (categories.length > 0) {
                toggleCategory(categories[0], true);
            }
        }
    }, [filteredLibrary, elementSearch, toggleCategory]);

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarSection}>
                <h2 className={`h5 ${styles.sidebarTitle}`}>Configuration</h2>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === "elements" ? styles.tabActive : styles.tabInactive}`}
                        onClick={() => setActiveTab("elements")}
                    >
                        Elements
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "analytics" ? styles.tabActive : styles.tabInactive}`}
                        onClick={() => setActiveTab("analytics")}
                    >
                        Analytics
                    </button>
                </div>
            </div>

            {activeTab === "elements" ? (
                <>
                    {/* Search */}
                    <input
                        className={styles.searchBar}
                        type="text"
                        placeholder="Search elements"
                        value={elementSearch}
                        onChange={(e) => setElementSearch(e.target.value)}
                    />

                    <div className={styles.separator} />

                    {Object.keys(filteredLibrary).length === 0 ? (
                        <div className={styles.sidebarEmptyState}>
                            No elements found
                        </div>
                    ) : (
                        Object.entries(filteredLibrary).map(([category, components], index, array) => (
                            <div key={category} className={styles.categoryWrapper}>
                                <div
                                    className={styles.categorySummary}
                                    onClick={() => toggleCategory(category)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            toggleCategory(category);
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                >
                                    {category}
                                    {openCategories[category] ? (
                                        <ChevronUpIcon style={{
                                            width: "12px",
                                            height: "12px",
                                            color: "var(--content-neutral--body)",
                                            transition: "transform 0.2s"
                                        }} />
                                    ) : (
                                        <ChevronDownIcon style={{
                                            width: "12px",
                                            height: "12px",
                                            color: "var(--content-neutral--body)",
                                            transition: "transform 0.2s"
                                        }} />
                                    )}
                                </div>
                                <div className={`${styles.accordionContent} ${openCategories[category] ? styles.accordionContentOpen : ''}`}>
                                    <div className={styles.accordionInner}>
                                        <div className={styles.componentGrid}>
                                            {components.map((comp) => (
                                                <button
                                                    key={comp.id}
                                                    onClick={(e) => addComponent(comp, e)}
                                                    className={`${styles.sidebarButton} ${selectedComponentForConfig?.id === comp.id ? styles.sidebarButtonSelected : ''}`}
                                                >
                                                    <div className={styles.sidebarButtonImageWrapper}>
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
                                                    <p className="caption-regular" style={{
                                                        fontSize: "var(--typography-font-size-80)",
                                                        color: "var(--content-neutral--caption)"
                                                    }}>
                                                        {comp.name}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {index < array.length - 1 && (
                                    <div className={styles.separator} />
                                )}
                            </div>
                        ))
                    )}
                </>
            ) : (
                <div className={styles.analyticsContainer}>
                    {/* Search Type */}
                    <input
                        className={styles.searchBar}
                        type="text"
                        placeholder="Search type"
                        value={analyticsSearch}
                        onChange={(e) => setAnalyticsSearch(e.target.value)}
                    />

                    <div className={styles.separator} />

                    {filteredAnalyticsSections.length === 0 ? (
                        <div className={styles.sidebarEmptyState}>
                            No analytics found
                        </div>
                    ) : (
                        filteredAnalyticsSections.map((section, index) => (
                            <div key={section.id}>
                                <div className={styles.analyticsSection}>
                                    <div className={styles.analyticsHeader}>
                                        <h3 className={`caption-bold ${styles.analyticsTitle}`}>{section.title}</h3>
                                        {section.tooltip && (
                                            <div
                                                className={styles.helpIconWrapper}
                                                data-tooltip={section.tooltip}
                                                data-tooltip-position="top"
                                                data-tooltip-align="right"
                                            >
                                                <LightBulbIcon className={styles.helpIcon} />
                                            </div>
                                        )}
                                    </div>
                                    {section.type === 'input' ? (
                                        <input
                                            type="text"
                                            className={styles.analyticsInput}
                                            placeholder={section.placeholder}
                                            value={analyticsData[section.key]}
                                            onChange={(e) => setAnalyticsData({ ...analyticsData, [section.key]: e.target.value })}
                                        />
                                    ) : (
                                        <textarea
                                            className={styles.analyticsTextarea}
                                            placeholder={section.placeholder}
                                            value={analyticsData[section.key]}
                                            onChange={(e) => setAnalyticsData({ ...analyticsData, [section.key]: e.target.value })}
                                        />
                                    )}
                                </div>
                                {index < filteredAnalyticsSections.length - 1 && (
                                    <div className={styles.separator} />
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
