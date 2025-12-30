"use client";

import { useState, useCallback, useRef } from "react";

export function useDragDrop({ onReorder }) {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dropTargetIndex, setDropTargetIndex] = useState(null);

    const dragImageRef = useRef(null);
    const dragThumbnailRef = useRef(null);
    const dragNameRef = useRef(null);

    const handleDragStart = useCallback((e, index, name, thumbnail) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";

        if (dragImageRef.current) {
            if (dragThumbnailRef.current) dragThumbnailRef.current.src = thumbnail || "";
            if (dragNameRef.current) dragNameRef.current.innerText = name || "Section";
            e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
        }
    }, []);

    const handleDragOver = useCallback((e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (draggedIndex !== index) {
            setDropTargetIndex(index);
        }
    }, [draggedIndex]);

    const handleDragEnd = useCallback(() => {
        setDraggedIndex(null);
        setDropTargetIndex(null);
    }, []);

    const handleDrop = useCallback((e, index) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== index) {
            onReorder?.(draggedIndex, index);
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
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleDrop
    };
}
