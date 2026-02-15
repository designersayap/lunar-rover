"use client";

import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import styles from "../../../page.module.css";

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
                    className={`${styles.btn} ${styles.btnSecondary} ${styles.topBarButtonWide}`}
                >
                    <SquaresPlusIcon className={styles.iconSmall} />
                    <span className={`${styles.topBarButtonText} truncate-1-line`}>Create Group</span>
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
