import {
    ChevronUpIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
    QuestionMarkCircleIcon
} from "@heroicons/react/24/solid";
import styles from "../page.module.css";

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
                    />

                    <div className={styles.separator} />

                    {/* Component Categories */}
                    {Object.entries(componentLibrary).map(([category, components], index, array) => (
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
                    ))}
                </>
            ) : (
                <div className={styles.analyticsContainer}>
                    {/* Search Type */}
                    <input
                        className={styles.searchBar}
                        type="text"
                        placeholder="Search type"
                    />

                    <div className={styles.separator} />

                    {/* Google Analytics */}
                    <div className={styles.analyticsSection}>
                        <div className={styles.analyticsHeader}>
                            <h3 className={`caption-bold ${styles.analyticsTitle}`}>Google Analytics</h3>
                            <div
                                className={styles.helpIconWrapper}
                                data-tooltip="Generate this in the Google Cloud Console under APIs & Services > Credentials > Create Credentials > API Key."
                                data-tooltip-position="top"
                                data-tooltip-align="right"
                            >
                                <QuestionMarkCircleIcon className={styles.helpIcon} />
                            </div>
                        </div>
                        <input
                            type="text"
                            className={styles.analyticsInput}
                            placeholder="i.e GTM-NNZFKBLC"
                            value={analyticsData.googleAnalyticsId}
                            onChange={(e) => setAnalyticsData({ ...analyticsData, googleAnalyticsId: e.target.value })}
                        />
                    </div>

                    <div className={styles.separator} />

                    {/* TikTok Ads */}
                    <div className={styles.analyticsSection}>
                        <h3 className={`caption-bold ${styles.analyticsTitle}`}>TikTok Ads</h3>
                        <textarea
                            className={styles.analyticsTextarea}
                            placeholder="paste your script here"
                            value={analyticsData.tikTokPixel}
                            onChange={(e) => setAnalyticsData({ ...analyticsData, tikTokPixel: e.target.value })}
                        />
                    </div>

                    <div className={styles.separator} />

                    {/* Meta Ads */}
                    <div className={styles.analyticsSection}>
                        <h3 className={`caption-bold ${styles.analyticsTitle}`}>Meta Ads</h3>
                        <textarea
                            className={styles.analyticsTextarea}
                            placeholder="paste your script here"
                            value={analyticsData.metaPixel}
                            onChange={(e) => setAnalyticsData({ ...analyticsData, metaPixel: e.target.value })}
                        />
                    </div>

                    <div className={styles.separator} />

                    {/* Hotjar Analytics */}
                    <div className={styles.analyticsSection}>
                        <h3 className={`caption-bold ${styles.analyticsTitle}`}>Hotjar Analytics</h3>
                        <textarea
                            className={styles.analyticsTextarea}
                            placeholder="paste your script here"
                            value={analyticsData.hotjarId}
                            onChange={(e) => setAnalyticsData({ ...analyticsData, hotjarId: e.target.value })}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
