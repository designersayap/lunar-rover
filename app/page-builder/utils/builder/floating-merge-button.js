"use client";

import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import styles from "@/app/page.module.css";

export default function FloatingMergeButton({ selectedCount, onMerge }) {
    if (selectedCount < 2) return null;

    return (
        <div className={styles.floatingMergeContainer}>
            <div className={styles.floatingMergeContent}>
                <span className={styles.floatingMergeText}>
                    {selectedCount} selected
                </span>
                <div className={styles.verticalDivider} />
                <button
                    onClick={onMerge}
                    className={`${styles.generatorButton} ${styles.topBarButtonWide}`}
                    style={{
                        color: 'white', // Ensure text contrast on dark button
                        border: 'none',
                        height: '28px', // Match topbar height var
                        width: 'auto', // Override max-width if needed to fit text, but user asked for "wide button" design. 
                        maxWidth: 'none'
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
