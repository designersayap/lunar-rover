import { useState } from "react";
import styles from "../page.module.css";
import BasePopover from "./base-popover";

export default function ThemePickerPopover({
    isOpen,
    onClose,
    onSelectTheme,
    currentTheme,
    themes = [],
    position,
    className = ""
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedThemeId, setSelectedThemeId] = useState(currentTheme || "milku");

    const filteredThemes = themes.filter(theme =>
        theme.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <BasePopover
            isOpen={isOpen}
            onClose={onClose}
            position={position}
            className={`${styles.themePickerPopover} ${className}`}
            width={320}
        >
            {/* Content */}
            <div className={`${styles.popoverContent} ${styles.themePickerContent}`}>
                {/* Search */}
                <div className={styles.themePickerSearchContainer}>
                    <input
                        type="text"
                        placeholder="Search brand"
                        className={`${styles.formInput} ${styles.searchBar}`}
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
                                onChange={() => {
                                    setSelectedThemeId(theme.id);
                                    onSelectTheme(theme.id);
                                }}
                                className={styles.themeOptionInput}
                            />
                            <span className="caption-regular">{theme.name}</span>
                        </label>
                    ))}
                </div>
            </div>
        </BasePopover>
    );
}
