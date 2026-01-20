import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function SidebarMobile({ isOpen, onClose, children, title = "Menu" }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Wait for animation
            document.body.style.overflow = '';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div className={`${styles.mobileSidebarOverlay} ${isOpen ? styles.mobileSidebarOpen : ''}`} onClick={onClose} style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
            <div
                className={`${styles.mobileSidebarSheet} ${isOpen ? styles.mobileSidebarSheetOpen : ''}`}
                onClick={e => e.stopPropagation()}
            >
                <div className={styles.mobileSidebarContent}>
                    {children}
                </div>
            </div>
        </div>
    );
}

