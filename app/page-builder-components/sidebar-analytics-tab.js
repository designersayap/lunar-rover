import styles from "../page.module.css";

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

/**
 * SidebarAnalyticsTab: Analytics configuration form.
 */
export default function SidebarAnalyticsTab({ analyticsData, setAnalyticsData }) {
    return (
        <div className={styles.analyticsContainer}>
            <div className={styles.analyticsSection}>
                {ANALYTICS_SECTIONS.map((section) => (
                    <div key={section.id} className={styles.analyticsRow}>
                        <div className={styles.analyticsHeader} data-tooltip={section.tooltip || undefined}>
                            <label className={`caption-bold ${styles.formInputTitle}`}>{section.title}</label>
                        </div>
                        {section.type === 'input' ? (
                            <input
                                type="text"
                                className={styles.formInput}
                                placeholder={section.placeholder}
                                value={analyticsData[section.key] || ""}
                                onChange={(e) => setAnalyticsData({ ...analyticsData, [section.key]: e.target.value })}
                            />
                        ) : (
                            <textarea
                                className={`${styles.formInput} ${styles.formTextarea} ${styles.analyticsTextarea}`}
                                placeholder={section.placeholder}
                                value={analyticsData[section.key] || ""}
                                onChange={(e) => setAnalyticsData({ ...analyticsData, [section.key]: e.target.value })}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
