import { useState, useEffect } from 'react';
import { ChevronRightIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import styles from "../page.module.css";

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                            color: '#22c55e',
                            position: 'absolute',
                            right: '8px',
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
                            color: '#ef4444',
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                    />
                )}
            </div>

            {value && status === 'valid' && (
                <div style={{
                    marginTop: '4px',
                    padding: '8px',
                    border: '1px solid var(--grey-200)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--grey-50)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img
                        src={value}
                        alt="Preview"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100px',
                            objectFit: 'contain',
                            borderRadius: '4px'
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
                    borderColor: status === 'error' ? '#ef4444' : undefined
                }}
            />
            {value && status === 'valid' && (
                <CheckCircleIcon
                    style={{
                        width: '18px',
                        height: '18px',
                        color: '#22c55e',
                        position: 'absolute',
                        right: '8px',
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
                        color: '#ef4444',
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                />
            )}
        </div>
    );
};

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
                inputType: 'image', // Explicit type
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
