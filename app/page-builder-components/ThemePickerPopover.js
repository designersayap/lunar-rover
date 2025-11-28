import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "../page.module.css";



export default function ThemePickerPopover({
    isOpen,
    onClose,
    onSelectTheme,
    currentTheme,
    themes = []
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

    return (
        <div className={styles.popoverOverlay} onClick={onClose}>
            <div
                className={`${styles.popoverContainer} ${styles.themePickerPopover}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={styles.popoverHeader}>
                    <h3 className={`body-bold ${styles.popoverTitle}`}>
                        Choose Your Brand
                    </h3>
                    <button
                        className={styles.popoverClose}
                        onClick={onClose}
                    >
                        <XMarkIcon style={{ width: "20px", height: "20px" }} />
                    </button>
                </div>

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
