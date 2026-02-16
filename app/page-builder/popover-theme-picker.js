import { useState } from "react";
import { MagnifyingGlassIcon, SwatchIcon, CheckIcon } from "@heroicons/react/24/outline";
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
                <div className={styles.themePickerSearchContainer}>
                    <div className={styles.searchInputWrapper}>
                        <MagnifyingGlassIcon className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search brand"
                            className={`${styles.formInput} ${styles.searchBar}`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.popoverList}>
                    {filteredThemes.map(theme => {
                        const isSelected = selectedThemeId === theme.id;
                        return (
                            <button
                                key={theme.id}
                                className={`${styles.listItem} ${isSelected ? styles.listItemActive : ''}`}
                                onClick={() => {
                                    setSelectedThemeId(theme.id);
                                    onSelectTheme(theme.id);
                                }}
                            >
                                <SwatchIcon className={styles.listItemIcon} />
                                <span className={`${styles.captionRegular} ${styles.listItemLabel}`}>{theme.name}</span>
                                {isSelected && <CheckIcon className={styles.listItemAction} />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </BasePopover>
    );
}
