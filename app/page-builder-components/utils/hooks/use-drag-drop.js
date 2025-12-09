"use client";

import { useState, useCallback, useRef } from "react";

/**
 * Custom hook for drag and drop functionality
 * Handles:
 * - Drag state management
 * - Custom drag image
 * - Drop target tracking
 * 
 * @param {Object} options - Hook options
 * @param {Function} options.onReorder - Callback when items are reordered
 * @returns {Object} Hook state and helpers
 */
export function useDragDrop({ onReorder }) {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dropTargetIndex, setDropTargetIndex] = useState(null);

    // Refs for custom drag image
    const dragImageRef = useRef(null);
    const dragThumbnailRef = useRef(null);
    const dragNameRef = useRef(null);

    // Start dragging
    const handleDragStart = useCallback((e, index, name, thumbnail) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";

        if (dragImageRef.current) {
            if (dragThumbnailRef.current) dragThumbnailRef.current.src = thumbnail || "";
            if (dragNameRef.current) dragNameRef.current.innerText = name || "Section";
            e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
        }
    }, []);

    // Drag over target
    const handleDragOver = useCallback((e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (draggedIndex !== index) {
            setDropTargetIndex(index);
        }
    }, [draggedIndex]);

    // End dragging
    const handleDragEnd = useCallback(() => {
        setDraggedIndex(null);
        setDropTargetIndex(null);
    }, []);

    // Drop on target
    const handleDrop = useCallback((e, index) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== index) {
            onReorder?.(draggedIndex, index);
        }
        handleDragEnd();
    }, [draggedIndex, handleDragEnd, onReorder]);

    return {
        // State
        draggedIndex,
        dropTargetIndex,
        setDraggedIndex,
        // Refs
        dragImageRef,
        dragThumbnailRef,
        dragNameRef,
        // Handlers
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleDrop
    };
}
