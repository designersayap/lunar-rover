import { useState, useEffect, useCallback, useRef } from "react";
import { useDragDrop } from "@/app/page-builder/utils/hooks";
import { showToast } from "@/app/page-builder/utils/toast";
import { getThemes } from "@/app/page-builder/utils/get-themes";
import { componentLibrary } from "@/app/page-builder/content/component-library";
import {
    loadTemplate,
    saveTemplate,
    clearTemplate,
    DEFAULT_ANALYTICS
} from "@/app/page-builder/utils/template-storage";
import {
    addComponentToList,
    removeComponentFromList,
    generateSectionId,
    updateComponentProps,
    updateComponentSectionId,
    reorderComponents,
    groupComponents,
    ungroupComponent,
    findComponentById
} from "@/app/page-builder/utils/component-manager";
import { handleExportNextjs } from "@/app/page-builder/utils/export-nextjs";
import { calculatePopoverPosition } from "@/app/page-builder/utils/builder/builder-controls";

export function useTemplateLogic() {
    // ==================== STATE MANAGEMENT ====================

    // Data Sources
    const [selectedComponents, setSelectedComponents] = useState([]);
    const [analyticsData, setAnalyticsData] = useState(DEFAULT_ANALYTICS);

    // Theme Selection
    const [themes, setThemes] = useState([]);
    const [selectedThemeId, setSelectedThemeId] = useState("theme");

    // Interface Visibility State
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("elements");

    // Popover & Overlay State
    const [activePopoverId, setActivePopoverId] = useState(null);
    const [popoverPositions, setPopoverPositions] = useState({});

    // Selection State
    const [activeElementId, _setActiveElementId] = useState(null);
    const [selectedElementIds, setSelectedElementIds] = useState([]);

    const setActiveElementId = useCallback((id) => {
        _setActiveElementId(id);
        if (id) {
            setSelectedElementIds([id]);
        } else {
            setSelectedElementIds([]);
        }
    }, []);

    const toggleElementSelection = useCallback((id, multi) => {
        if (multi) {
            setSelectedElementIds(prev => {
                const isSelected = prev.includes(id);
                const newSelection = isSelected
                    ? prev.filter(item => item !== id)
                    : [...prev, id];

                if (newSelection.length === 1) {
                    _setActiveElementId(newSelection[0]);
                } else {
                    _setActiveElementId(null);
                }

                return newSelection;
            });
        } else {
            setSelectedElementIds([id]);
            _setActiveElementId(id);
        }
    }, []);

    // ==================== HOOKS ====================


    // Drag and Drop Logic
    const dragDrop = useDragDrop({
        onReorder: (from, to) => {
            setSelectedComponents(prev => reorderComponents(prev, from, to));
        }
    });

    // ==================== DOM REFERENCES ====================

    const togglePopover = useCallback((id, position) => {
        if (position) {
            setPopoverPositions(prev => ({ ...prev, [id]: position }));
        }
        setActivePopoverId(prev => prev === id ? null : id);
    }, []);

    const closePopover = useCallback(() => {
        setActivePopoverId(null);
    }, []);

    // ==================== INITIALIZATION & SIDE EFFECTS ====================

    // Load themes on mount
    useEffect(() => {
        getThemes().then(setThemes);
    }, []);

    // Apply theme stylesheet
    useEffect(() => {
        let themeLink = document.getElementById("theme-stylesheet");

        // Dynamic injection to avoid server-side preload warnings
        if (!themeLink) {
            themeLink = document.createElement("link");
            themeLink.id = "theme-stylesheet";
            themeLink.rel = "stylesheet";
            document.head.appendChild(themeLink);
        }

        if (themes.length) {
            const theme = themes.find(t => t.id === selectedThemeId);
            const newPath = theme?.path || "/themes/theme.css";

            // Only update if different to prevent "resource preloaded but not used" warning
            // accessing .getAttribute('href') gives the literal string, .href gives absolute URL
            // We compare against the literal string we set.
            if (themeLink.getAttribute('href') !== newPath) {
                themeLink.href = newPath;
            }
        }
    }, [selectedThemeId, themes]);

    // Load saved template on mount
    useEffect(() => {
        const saved = loadTemplate(componentLibrary);
        if (saved) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedComponents(saved.components);
            setAnalyticsData(saved.analytics);
        }
    }, []);

    // Auto-save template (debounced)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            saveTemplate(selectedComponents, analyticsData);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [selectedComponents, analyticsData]);

    // Responsive sidebar & Persistence
    const isInitialized = useRef(false);

    useEffect(() => {
        // 1. Initial Check
        if (typeof window !== 'undefined') {
            // Default behavior if no preference
            setIsSidebarVisible(window.innerWidth >= 1024);
        }

        isInitialized.current = true;

        // 2. Smarter Resize Handler
        // Removed auto-hide for < 1024px as requested for tablet/mobile bottom sheet support
        // Added auto-close for Bottom Sheet when resizing to desktop (> 1024px)
        const handleResize = () => {
            // Logic removed to prevent auto-hiding sidebar on resize
            if (window.innerWidth >= 1024) {
                setIsBottomSheetOpen(false);
            }
        };

        // 3. Global Click Handler (Click Outside)
        const handleWindowClick = (e) => {
            // Ignore clicks on UI elements (popovers, overlays, sidebar) based on data attribute
            if (e.target.closest('[data-builder-ui]')) return;

            // Only deselect if we actually have a selection to avoid unnecessary renders
            if (activeElementId || activePopoverId) {
                setActiveElementId(null);
                setActivePopoverId(null);
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('click', handleWindowClick);
        };
    }, [activeElementId, activePopoverId]);

    // Save state to localStorage
    useEffect(() => {
        if (isInitialized.current) {
            localStorage.setItem("lunar_sidebar_visible", isSidebarVisible);
        }
    }, [isSidebarVisible]);

    // ==================== ACTION HANDLERS ====================

    const handleThemeSelect = useCallback((themeId) => {
        setSelectedThemeId(themeId);
        showToast(`Theme switched to ${themeId}`);
    }, [showToast]);

    // Sidebar Toggle
    const toggleSidebar = useCallback(() => {
        if (window.innerWidth < 1024) {
            setIsBottomSheetOpen(prev => !prev);
        } else {
            setIsSidebarVisible(prev => !prev);
        }
    }, []);


    // Components
    const addComponent = useCallback((componentData, category) => {
        const sectionId = generateSectionId(category);
        setSelectedComponents(prev => addComponentToList(prev, componentData, sectionId));
        showToast(`${componentData.name} added`);
    }, [showToast]);

    const removeComponent = useCallback((uniqueId) => {
        const comp = findComponentById(selectedComponents, uniqueId);
        if (comp) {
            showToast(`${comp.name} deleted`, "delete");
        }
        setSelectedComponents(prev => removeComponentFromList(prev, uniqueId));
    }, [selectedComponents, showToast]);


    const updateComponent = useCallback((uniqueId, newProps) => {
        setSelectedComponents(prev => updateComponentProps(prev, uniqueId, newProps));
    }, []);

    const updateSectionId = useCallback((uniqueId, newId) => {
        setSelectedComponents(prev => updateComponentSectionId(prev, uniqueId, newId));
    }, []);

    const handleGroup = useCallback((idsToGroup) => {
        setSelectedComponents(prev => groupComponents(prev, idsToGroup));
        showToast("Layers grouped");
    }, [showToast]);

    const handleUngroup = useCallback((groupId) => {
        setSelectedComponents(prev => ungroupComponent(prev, groupId));
        showToast("Layers ungrouped");
    }, [showToast]);

    // Popover / Export
    const handleExport = useCallback((position) => {
        togglePopover('export', position);
    }, [togglePopover]);

    const handleStaging = useCallback((position) => {
        togglePopover('staging', position);
    }, [togglePopover]);

    const handleNotificationClick = useCallback((position) => {
        togglePopover('notifications', position);
    }, [togglePopover]);

    const handleReset = useCallback(() => {
        if (!confirm('Reset all data? This will clear all components and analytics.')) return;
        setSelectedComponents([]);
        setAnalyticsData(DEFAULT_ANALYTICS);
        clearTemplate();
    }, [showToast]);

    const handleDirectExport = useCallback(async () => {
        try {
            const selectedBrand = themes.find(t => t.id === selectedThemeId)?.name || "Lunar";
            const activeThemePath = themes.find(t => t.id === selectedThemeId)?.path || "/themes/theme.css";

            // Prepare analytics with brand prefix for the exported site
            const exportAnalytics = { ...analyticsData };
            const currentTitle = exportAnalytics.websiteTitle || "";

            if (!currentTitle.startsWith(`${selectedBrand} `)) {
                exportAnalytics.websiteTitle = currentTitle
                    ? `${selectedBrand} ${currentTitle}`
                    : selectedBrand;
            }

            await handleExportNextjs(selectedComponents, activeThemePath, {
                download: true,
                analytics: exportAnalytics,
                silent: true
            });
            showToast("Export completed successfully");
        } catch (error) {
            console.error("Export failed", error);
            showToast("Export failed", "error");
        }
    }, [selectedComponents, themes, selectedThemeId, analyticsData, showToast]);

    // Add Component Popover
    const handleAddClick = useCallback((rect) => {
        if (rect) {
            const position = calculatePopoverPosition(rect, { padding: 4 });
            // Adjust for BasePopover centering (it applies translateX(-50%))
            // calculation returns left edge, so we add width/2 to get center
            position.left += 181;
            togglePopover('components', position);
        } else {
            togglePopover('components');
        }
    }, [togglePopover]);


    return {
        state: {
            selectedComponents,
            analyticsData,
            themes,
            selectedThemeId,
            isSidebarVisible,
            isBottomSheetOpen,
            activeTab,
            activePopoverId,
            popoverPositions,
            activeElementId,
            selectedElementIds,
            dragDrop
        },
        actions: {
            setAnalyticsData,
            setAnalyticsData,
            setIsSidebarVisible,
            setIsBottomSheetOpen,
            toggleSidebar,
            setActiveTab,
            setActiveElementId,
            toggleElementSelection,
            setActivePopoverId,
            setPopoverPositions,
            handleThemeSelect,
            handleExport,
            handleStaging,
            handleDirectExport,
            handleReset,
            addComponent,
            removeComponent,
            updateComponent,
            updateSectionId,
            handleGroup,
            handleUngroup,
            handleAddClick,
            closePopover,
            togglePopover,
            setSelectedComponents,
            handleNotificationClick
        }
    };
}
