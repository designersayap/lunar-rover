import { useState, useEffect, useCallback, useRef } from "react";
import { useToast, useDragDrop } from "@/app/page-builder/utils/hooks";
import { getThemes } from "@/app/page-builder/utils/get-themes";
import { componentLibrary } from "@/app/page-builder/content/component-library";
import {
    loadTemplate,
    saveTemplate,
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
    ungroupComponent
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
    const [activeTab, setActiveTab] = useState("elements");

    // Popover & Overlay State
    const [activePopoverId, setActivePopoverId] = useState(null);
    const [popoverPositions, setPopoverPositions] = useState({});

    // Selection State
    const [activeElementId, setActiveElementId] = useState(null);

    // ==================== HOOKS ====================

    // Toast Notifications
    const { toast: toaster, showToast } = useToast();

    // Drag and Drop Logic
    const dragDrop = useDragDrop({
        onReorder: (from, to) => {
            setSelectedComponents(prev => reorderComponents(prev, from, to));
        }
    });

    const {
        draggedIndex,
        dropTargetIndex,
        setDraggedIndex,
        dragImageRef,
        dragThumbnailRef,
        dragNameRef,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleDrop
    } = dragDrop;

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
        const themeLink = document.getElementById("theme-stylesheet");
        if (themeLink && themes.length) {
            const theme = themes.find(t => t.id === selectedThemeId);
            themeLink.href = theme?.path || "/themes/theme.css";
        }
    }, [selectedThemeId, themes]);

    // Load saved template on mount
    useEffect(() => {
        const saved = loadTemplate(componentLibrary);
        if (saved) {
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
        // 1. Load preference from localStorage
        const savedState = localStorage.getItem("lunar_sidebar_visible");

        if (savedState !== null) {
            setIsSidebarVisible(savedState === "true");
        } else {
            // Default behavior if no preference
            setIsSidebarVisible(window.innerWidth >= 1024);
        }

        isInitialized.current = true;

        // 2. Smarter Resize Handler
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarVisible(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Save state to localStorage
    useEffect(() => {
        if (isInitialized.current) {
            localStorage.setItem("lunar_sidebar_visible", isSidebarVisible);
        }
    }, [isSidebarVisible]);

    // ==================== ACTION HANDLERS ====================

    // Theme
    const handleThemeSelect = useCallback((themeId) => {
        setSelectedThemeId(themeId);
        showToast(`Theme switched to ${themeId}`);
    }, [showToast]);


    // Components
    const addComponent = useCallback((componentData, category) => {
        const sectionId = generateSectionId(category);
        setSelectedComponents(prev => addComponentToList(prev, componentData, sectionId));
        showToast(`${componentData.name} added`);
    }, [showToast]);

    const removeComponent = useCallback((uniqueId) => {
        const comp = selectedComponents.find(c => c.uniqueId === uniqueId);
        if (comp) {
            showToast(`${comp.name} deleted`, "delete");
            setSelectedComponents(prev => removeComponentFromList(prev, uniqueId));
        }
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

    const handleDirectExport = useCallback(async () => {
        try {
            showToast("Preparing export...", "info");
            const activeThemePath = themes.find(t => t.id === selectedThemeId)?.path || "/themes/theme.css";

            await handleExportNextjs(selectedComponents, activeThemePath, {
                download: true,
                savePreview: true,
                analytics: analyticsData
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
            activeTab,
            activePopoverId,
            popoverPositions,
            activeElementId,
            toaster,
            dragDrop
        },
        actions: {
            setAnalyticsData,
            setIsSidebarVisible,
            setActiveTab,
            setActiveElementId,
            setActivePopoverId,
            setPopoverPositions,
            handleThemeSelect,
            handleExport,
            handleStaging,
            handleDirectExport,
            addComponent,
            removeComponent,
            updateComponent,
            updateSectionId,
            handleGroup,
            handleUngroup,
            handleAddClick,
            closePopover,
            togglePopover,
            setSelectedComponents
        }
    };
}
