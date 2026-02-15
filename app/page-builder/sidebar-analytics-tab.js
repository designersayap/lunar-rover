import { useState, useEffect } from 'react';
import {
    QuestionMarkCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CheckCircleIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import styles from "../page.module.css";
import Tooltip from "./tooltip";

// Helper component for Image Inputs with Preview & Validation
const ImagePreviewInput = ({ section, value, onChange }) => {
    const [status, setStatus] = useState('idle'); // idle, valid, error

    useEffect(() => {
        if (!value) {
            setStatus('idle');
            return;
        }
        const img = new Image();
        img.src = value;
        img.onload = () => setStatus('valid');
        img.onerror = () => setStatus('error');
    }, [value]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--pb-space-sm)' }}>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    className={styles.formInput}
                    placeholder={section.placeholder}
                    value={value}
                    onChange={onChange}
                    style={{ paddingRight: '32px' }} // Space for icon
                />
                {value && status === 'valid' && (
                    <CheckCircleIcon
                        style={{
                            width: '18px',
                            height: '18px',
                            color: 'var(--pb-success)',
                            position: 'absolute',
                            right: 'var(--pb-space-sm)',
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                    />
                )}
                {value && status === 'error' && (
                    <XCircleIcon
                        style={{
                            width: '18px',
                            height: '18px',
                            color: 'var(--pb-danger)',
                            position: 'absolute',
                            right: 'var(--pb-space-sm)',
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                    />
                )}
            </div>

            {value && status === 'valid' && (
                <div className={styles.imagePreviewContainer}>
                    <img
                        src={value}
                        alt="Preview"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100px',
                            objectFit: 'contain',
                            borderRadius: 'var(--pb-radius)'
                        }}
                    />
                </div>
            )}
        </div>
    );
};

// Helper component for Generic URL Inputs
const UrlInput = ({ section, value, onChange }) => {
    const [status, setStatus] = useState('idle'); // idle, valid, error

    useEffect(() => {
        if (!value) {
            setStatus('idle');
            return;
        }
        try {
            new URL(value); // This throws if invalid
            // check protocol
            if (value.startsWith('http://') || value.startsWith('https://')) {
                setStatus('valid');
            } else {
                setStatus('error');
            }
        } catch (_) {
            setStatus('error');
        }
    }, [value]);

    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                className={styles.formInput}
                placeholder={section.placeholder}
                value={value}
                onChange={onChange}
                style={{
                    paddingRight: '32px',
                    borderColor: status === 'error' ? 'var(--pb-danger)' : undefined
                }}
            />
            {value && status === 'valid' && (
                <CheckCircleIcon
                    style={{
                        width: '18px',
                        height: '18px',
                        color: 'var(--pb-success)',
                        position: 'absolute',
                        right: 'var(--pb-space-sm)',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                />
            )}
            {value && status === 'error' && (
                <XCircleIcon
                    style={{
                        width: '18px',
                        height: '18px',
                        color: 'var(--pb-danger)',
                        position: 'absolute',
                        right: 'var(--pb-space-sm)',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                />
            )}
        </div>
    );
};

const ANALYTICS_GROUPS = [
    /* General section removed */
    {
        title: "SEO Configuration",
        items: [

            {
                id: 'canonical-url',
                title: 'Canonical URL',
                type: 'input',
                inputType: 'url', // Explicit type
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
                placeholder: '<meta name="my-custom-tag" content="value" />',
                tooltip: 'Additional custom meta tags. Must be valid HTML tags (e.g. <meta ... />).'
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
                inputType: 'image', // Explicit type
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

/* AnalyticsAccordion removed as logic is now inline in SidebarAnalyticsTab */

/**
 * SidebarAnalyticsTab: Analytics configuration form.
 */
export default function SidebarAnalyticsTab({ analyticsData, setAnalyticsData, tab }) {
    // Determine which group to show based on the active tab
    const activeGroupTitle = {
        'seo': "SEO Configuration",
        'opengraph': "Open Graph Settings",
        'analytics': "Analytics & Scripts"
    }[tab];

    const activeGroup = ANALYTICS_GROUPS.find(g => g.title === activeGroupTitle);

    if (!activeGroup) return null;

    return (
        <div className={styles.analyticsContainer}>
            <div className={styles.analyticsSection}>
                <div className={styles.categoryWrapper}>
                    {/* Optional: Add a header or just show content? 
                        Tabs usually don't repeat the header if the tab itself is the header. 
                        But we might want some spacing. 
                    */}
                    <div className={styles.accordionContentOpen}>
                        <div className={styles.accordionInner}>
                            <div style={{ padding: 'var(--pb-space-lg) 0 0', display: 'flex', flexDirection: 'column', gap: 'var(--pb-space-lg)' }}>
                                {activeGroup.items.map((section) => (
                                    <div key={section.id} className={styles.analyticsRow}>
                                        <div className={styles.analyticsHeader}>
                                            <Tooltip content={section.tooltip} position="top">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <label className={styles.formInputTitle} style={{ marginBottom: 0 }}>{section.title}</label>
                                                    {section.tooltip && (
                                                        <QuestionMarkCircleIcon className={styles.iconXs} style={{ color: 'var(--pb-neutral-100)' }} />
                                                    )}
                                                </div>
                                            </Tooltip>
                                        </div>
                                        {section.type === 'input' ? (
                                            section.inputType === 'image' ? (
                                                <ImagePreviewInput
                                                    section={section}
                                                    value={analyticsData[section.key] || ""}
                                                    onChange={(e) => setAnalyticsData({ ...analyticsData, [section.key]: e.target.value })}
                                                />
                                            ) : section.inputType === 'url' ? (
                                                <UrlInput
                                                    section={section}
                                                    value={analyticsData[section.key] || ""}
                                                    onChange={(e) => setAnalyticsData({ ...analyticsData, [section.key]: e.target.value })}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    className={styles.formInput}
                                                    placeholder={section.placeholder}
                                                    value={analyticsData[section.key] || ""}
                                                    onChange={(e) => setAnalyticsData({ ...analyticsData, [section.key]: e.target.value })}
                                                />
                                            )
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
            </div>
        </div>
    );
}
