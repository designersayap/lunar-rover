"use client";

import { SquaresPlusIcon } from "@heroicons/react/24/solid";

export default function FloatingMergeButton({ selectedCount, onMerge }) {
    if (selectedCount < 2) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'var(--background-neutral--neutral-strong)',
            padding: '12px 24px',
            borderRadius: 'var(--round-100)',
            boxShadow: 'var(--shadow--lg)',
            color: 'var(--content-neutral--body-invert)',
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>
                {selectedCount} layers selected
            </span>
            <div style={{ width: 1, height: 16, backgroundColor: 'var(--border-neutral--subtle-invert)' }} />
            <button
                onClick={onMerge}
                className="btn-ghost-neutral-invert"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    color: 'inherit'
                }}
            >
                <SquaresPlusIcon style={{ width: 20, height: 20 }} />
                Merge to Scroll Group
            </button>
            <style jsx>{`
                @keyframes slideUp {
                    from { transform: translate(-50%, 100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
