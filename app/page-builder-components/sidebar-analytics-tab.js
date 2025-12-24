import { useState } from 'react';
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import styles from "../page.module.css";

const ANALYTICS_GROUPS = [
    {
        title: "General",
        items: [
            {
                id: 'website-title',
                title: 'Page Title',
                type: 'input',
                key: 'websiteTitle',
                tooltip: 'The main title of your website that appears in browser tabs and search results.'
            },
            {
                id: 'favicon',
                title: 'Favicon',
                type: 'input',
                key: 'favicon',
                placeholder: 'Image URL',
                tooltip: 'The icon that appears in the browser tab.'
            }
        ]
    },
    {
        title: "SEO Configuration",
        items: [

            {
                id: 'canonical-url',
                title: 'Canonical URL',
                type: 'input',
                key: 'canonicalUrl',
                placeholder: 'https://example.com',
                tooltip: 'The authoritative URL of the page (link rel="canonical").'
            },
            {
                id: 'meta-description',
                title: 'Meta Description',
                type: 'textarea',
                key: 'metaDescription',
                tooltip: 'This description will appear in search engine results.'
            },
            {
                id: 'meta-keywords',
                title: 'Meta Keywords',
                type: 'textarea',
                key: 'metaKeywords',
                tooltip: 'Keywords relevant to your website content, separated by commas.'
            },
            {
                id: 'meta-tag',
                title: 'Meta Tag',
                type: 'textarea',
                key: 'metaTag',
                tooltip: 'Additional custom meta tags.'
            }
        ]
    },
    {
        title: "Open Graph Settings",
        items: [
            {
                id: 'og-title',
                title: 'Open Graph Title',
                type: 'input',
                key: 'ogTitle',
                tooltip: 'The title of your object as it should appear within the graph.'
            },
            {
                id: 'og-description',
                title: 'Open Graph Description',
                type: 'textarea',
                key: 'ogDescription',
                tooltip: 'A one to two sentence description of your object.'
            },
            {
                id: 'og-image',
                title: 'Open Graph Image',
                type: 'input',
                key: 'ogImage',
                placeholder: 'Image URL',
                tooltip: 'An image URL which should represent your object within the graph.'
            }
        ]
    },
    {
        title: "Analytics & Scripts",
        items: [
            {
                id: 'google',
                title: 'Google Tag Manager',
                type: 'input',
                key: 'googleTagManagerId',
                placeholder: 'i.e GTM-NNZFKBLC',
                tooltip: 'Generate this in the Google Cloud Console under APIs & Services > Credentials > Create Credentials > API Key.'
            },
            {
                id: 'clarity',
                title: 'Microsoft Clarity',
                type: 'input',
                key: 'microsoftClarityId',
                placeholder: 'Project ID',
                tooltip: 'Your Microsoft Clarity Project ID.'
            },
            {
                id: 'tiktok',
                title: 'TikTok Ads',
                type: 'input',
                key: 'tikTokPixel'
            },
            {
                id: 'meta-ads',
                title: 'Meta Ads',
                type: 'input',
                key: 'metaPixel'
            }
        ]
    }
];

function AnalyticsAccordion({ group, analyticsData, setAnalyticsData }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={styles.categoryWrapper}>
            <div
                className={styles.categoryHeader}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '16px 0',
                    color: 'var(--grey-200)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <span className="caption-bold">{group.title}</span>
                <ChevronRightIcon
                    style={{
                        width: '16px',
                        height: '16px',
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s'
                    }}
                />
            </div>

            <div className={`${styles.accordionContent} ${isOpen ? styles.accordionContentOpen : ''}`}>
                <div className={styles.accordionInner}>
                    <div style={{ paddingLeft: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {group.items.map((section) => (
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
            </div>
        </div>
    );
}

/**
 * SidebarAnalyticsTab: Analytics configuration form.
 */
export default function SidebarAnalyticsTab({ analyticsData, setAnalyticsData }) {
    return (
        <div className={styles.analyticsContainer}>
            <div className={styles.analyticsSection}>
                {ANALYTICS_GROUPS.map((group, index) => (
                    <AnalyticsAccordion
                        key={index}
                        group={group}
                        analyticsData={analyticsData}
                        setAnalyticsData={setAnalyticsData}
                    />
                ))}
            </div>
        </div>
    );
}
