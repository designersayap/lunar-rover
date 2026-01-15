"use client";

import { useState, useCallback, useRef } from "react";

export function useDragDrop({ onReorder }) {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dropTargetIndex, setDropTargetIndex] = useState(null);

    const dragImageRef = useRef(null);
    const dragThumbnailRef = useRef(null);
    const dragNameRef = useRef(null);
    const dragImageWrapperRef = useRef(null);

    const handleDragStart = useCallback((e, index, name, thumbnail, data = {}) => {
        setDraggedIndex({ index, ...data });
        e.dataTransfer.effectAllowed = "move";

        if (dragImageRef.current) {
            if (dragThumbnailRef.current) dragThumbnailRef.current.src = thumbnail || "";
            if (dragNameRef.current) dragNameRef.current.innerText = name || "Section";

            // Toggle visibility of image wrapper based on thumbnail presence
            if (dragImageWrapperRef.current) {
                dragImageWrapperRef.current.style.display = thumbnail ? "flex" : "none";
            }

            e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
        }
    }, []);

    const handleDragOver = useCallback((e, index, data = {}) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        // Check if indices AND parentIds match (if present)
        const isSameItem = draggedIndex?.index === index && draggedIndex?.parentId === data?.parentId;

        if (!isSameItem) {
            setDropTargetIndex({ index, ...data });
        }
    }, [draggedIndex]);

    const handleDragEnd = useCallback(() => {
        setDraggedIndex(null);
        setDropTargetIndex(null);
    }, []);

    const handleDrop = useCallback((e, index, data = {}) => {
        e.preventDefault();
        const from = draggedIndex;
        const to = { index, ...data };

        // Only allow reordering within same parent
        if (from && from.parentId === to.parentId && from.index !== to.index) {
            onReorder?.(from, to);
        }
        handleDragEnd();
    }, [draggedIndex, handleDragEnd, onReorder]);

    return {
        draggedIndex,
        dropTargetIndex,
        setDraggedIndex,
        dragImageRef,
        dragThumbnailRef,
        dragNameRef,
        dragImageWrapperRef,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleDrop
    };
}
