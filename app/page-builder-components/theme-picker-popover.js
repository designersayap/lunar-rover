import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "../page.module.css";



export default function ThemePickerPopover({
    isOpen,
    onClose,
    onSelectTheme,
    currentTheme,
    themes = [],
    position
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedThemeId, setSelectedThemeId] = useState(currentTheme || "milku");

    if (!isOpen) return null;

    const filteredThemes = themes.filter(theme =>
        theme.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = () => {
        onSelectTheme(selectedThemeId);
        onClose();
    };

    // Calculate constrained position
    let popoverStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: 0,
        pointerEvents: "auto"
    };

    if (position && typeof window !== 'undefined') {
        const popoverWidth = 320;
        const padding = 16;
        const windowWidth = window.innerWidth;
        const minLeft = popoverWidth / 2 + padding;
        const maxLeft = windowWidth - popoverWidth / 2 - padding;
        const constrainedLeft = Math.max(minLeft, Math.min(position.left, maxLeft));

        popoverStyle = {
            ...popoverStyle,
            top: `${position.top}px`,
            left: `${constrainedLeft}px`,
            transform: "translateX(-50%)"
        };
    }

    return (
        <div className={styles.popoverOverlay} style={{ pointerEvents: "none" }}>
            <div
                className={`${styles.popoverContainer} ${styles.themePickerPopover}`}
                style={popoverStyle}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Content */}
                <div className={`${styles.popoverContent} ${styles.themePickerContent}`}>
                    {/* Search */}
                    <div className={styles.themePickerSearchContainer}>
                        <input
                            type="text"
                            placeholder="Search brand"
                            className={styles.searchBar}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Theme List */}
                    <div className={styles.themeList}>
                        {filteredThemes.map(theme => (
                            <label
                                key={theme.id}
                                className={`${styles.themeOption} ${selectedThemeId === theme.id ? styles.themeOptionSelected : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="theme"
                                    value={theme.id}
                                    checked={selectedThemeId === theme.id}
                                    onChange={() => setSelectedThemeId(theme.id)}
                                    className={styles.themeOptionInput}
                                />
                                <span className="caption-regular">{theme.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className={`${styles.popoverFooter} ${styles.themePickerFooter}`}>
                    <button
                        className={`btn btn-primary btn-sm ${styles.themePickerButton}`}
                        onClick={handleSelect}
                    >
                        Choose Themes
                    </button>
                </div>
            </div>
        </div>
    );
}
