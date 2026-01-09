"use client";

import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import styles from "@/app/page.module.css";

export default function FloatingMergeButton({ selectedCount, onMerge }) {
    if (selectedCount < 2) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            width: 'var(--w-sidebar)', // Match sidebar width to help centering context if needed, or just center relative to it.
            // Actually, simpler to just place it relative to viewport if we know sidebar location.
            // Assuming Sidebar is on Right (border-left).
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 100,
            pointerEvents: 'none', // Allow clicking through container, but button needs events.
            // Wait, if I put it in Sidebar component, it's spatially there.
        }}>
            <div style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--background-neutral--neutral-strong)',
                padding: '8px 16px',
                borderRadius: '8px',
                boxShadow: 'var(--shd-btn)',
                color: 'var(--content-neutral--body-invert)',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
                <span style={{ fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap' }}>
                    {selectedCount} selected
                </span>
                <div style={{ width: 1, height: 16, backgroundColor: 'var(--border-neutral--subtle-invert)' }} />
                <button
                    onClick={onMerge}
                    className={`${styles.generatorButton} ${styles.topBarButtonWide}`}
                    style={{
                        color: 'white', // Ensure text contrast on dark button
                        border: 'none',
                        height: '28px', // Match topbar height var
                        width: 'auto', // Override max-width if needed to fit text, but user asked for "wide button" design. 
                        // topBarButtonWide has max-width 134px. "Merge to Scroll Group" might be tight.
                        // Let's try to fit it.
                        maxWidth: 'none' // Actually, let's override the max-width to ensure text fits, while keeping the *style* (bg, radius, etc).
                    }}
                >
                    <SquaresPlusIcon style={{ width: 16, height: 16 }} />
                    <span>Create Group</span>
                </button>
                <style jsx>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
            </div>
        </div>
    );
}
