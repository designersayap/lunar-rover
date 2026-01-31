"use client";

import { useState, useEffect, useRef, memo } from "react";
import { createPortal } from "react-dom";
import { useIdSync } from "../hooks/use-id-sync";

function BuilderTextComponent({
    content = "",
    tagName = "p",
    className = "",
    style = {},
    onChange,
    multiline = true,
    placeholder = "Type here...",
    sectionId,
    suffix,
    noId = false,
    id,
    onIdChange,
    disableLinkPaste = false,
    ...props
}) {
    const [text, setText] = useState(content);
    const elementRef = useRef(null);



    // Use a ref for onChange to keep it stable
    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    });

    const firstClass = className.split(" ")[0] || tagName;
    const defaultSuffix = suffix || firstClass;

    const { elementId: generatedId } = useIdSync({
        id,
        sectionId,
        suffix: defaultSuffix,
        onIdChange
    });

    const elementId = noId ? undefined : generatedId;

    // Sync internal state if prop changes (undo/redo or initial load)
    useEffect(() => {
        if (elementRef.current && elementRef.current.innerHTML !== content) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setText(content);
            if (document.activeElement !== elementRef.current) {
                elementRef.current.innerHTML = content;
            }
        }
    }, [content]);

    const [isEditing, setIsEditing] = useState(false);

    const handleFocus = () => {
        setIsEditing(true);
    };

    const handleBlur = (e) => {
        setIsEditing(false);
        const newText = e.target.innerHTML;
        // Normalize &amp; to & to avoid double escaping in certain contexts
        const normalizedText = newText.replace(/&amp;/g, "&");

        setText(normalizedText);
        if (normalizedText !== content && onChangeRef.current) {
            onChangeRef.current(normalizedText);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const plainText = e.clipboardData.getData("text/plain");

        // Check for image URL
        const imageExtensionRegex = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
        const urlRegex = /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i;

        if (urlRegex.test(plainText) && imageExtensionRegex.test(plainText)) {
            document.execCommand("insertImage", false, plainText);
            return;
        }

        // Auto-link on paste
        if (!disableLinkPaste) {
            const selection = window.getSelection();
            if (selection.toString().length > 0) {
                if (urlRegex.test(plainText)) {
                    document.execCommand("createLink", false, plainText);
                    return;
                }
            }
        }

        document.execCommand("insertText", false, plainText);
    };

    const toggleBold = (targetClass) => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);

        if (targetClass) {
            let node = range.commonAncestorContainer;
            if (node.nodeType === 3) node = node.parentElement;

            let existingSpan = null;
            let current = node;
            while (current && current !== elementRef.current) {
                if (current.classList && current.classList.contains(targetClass)) {
                    existingSpan = current;
                    break;
                }
                current = current.parentElement;
            }

            if (existingSpan) {
                // Unwrap
                const parent = existingSpan.parentNode;
                while (existingSpan.firstChild) {
                    parent.insertBefore(existingSpan.firstChild, existingSpan);
                }
                parent.removeChild(existingSpan);
            } else {
                // Wrap
                if (range.collapsed) return;
                const span = document.createElement('span');
                span.className = targetClass;
                span.appendChild(range.extractContents());
                range.insertNode(span);

                selection.removeAllRanges();
                const newRange = document.createRange();
                newRange.selectNodeContents(span);
                selection.addRange(newRange);
            }
        } else {
            document.execCommand('bold');
        }
    };

    const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
            e.preventDefault();
            let targetClass = null;
            if (className.includes('body-regular')) targetClass = 'body-bold';
            else if (className.includes('caption-regular')) targetClass = 'caption-bold';

            toggleBold(targetClass);
            return;
        }

        if (multiline && e.key === " ") {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const textNode = range.startContainer;

                if (textNode.nodeType === 3) {
                    const text = textNode.textContent;
                    const offset = range.startOffset;

                    // Check for bullet list "* "
                    const bulletMatch = text.slice(0, offset).match(/^([*])\s*$/); // matches "*"
                    // Check for standard numbered list "1. "
                    const numberMatch = text.slice(0, offset).match(/^([0-9]+)\.\s*$/); // matches "1.", "10.", etc.
                    // Check for alpha numbered list "a. "
                    const alphaMatch = text.slice(0, offset).match(/^([a-z])\.\s*$/); // matches "a.", "b.", etc.

                    if (bulletMatch || numberMatch || alphaMatch) {
                        e.preventDefault();

                        // Common match object (re-evaluated to handle numberMatch)
                        const match = bulletMatch || numberMatch || alphaMatch;

                        // Remove the trigger characters
                        const triggerLength = match[0].length;
                        range.setStart(textNode, offset - triggerLength);
                        range.setEnd(textNode, offset);
                        range.deleteContents();

                        // Check nesting
                        let parentLi = textNode.parentNode;
                        while (parentLi && parentLi !== elementRef.current && parentLi.nodeName !== 'LI') {
                            parentLi = parentLi.parentNode;
                        }
                        const isInsideList = parentLi && parentLi.nodeName === 'LI';

                        if (isInsideList) {


                            // Nesting logic using Manual DOM Manipulation
                            const previousLi = parentLi.previousElementSibling;

                            if (previousLi) {
                                // Define target structure based on trigger
                                const targetTag = bulletMatch ? 'UL' : 'OL';
                                // 'a' for alpha, null for numeric/bullet
                                const targetType = alphaMatch ? 'a' : null;

                                let targetList = previousLi.lastElementChild;
                                let isCompatible = false;

                                // Check if the previous item already has a nested list we can append to
                                if (targetList && targetList.nodeName === targetTag) {
                                    if (targetTag === 'OL') {
                                        const currentType = targetList.getAttribute('type');
                                        // Strict compatibility check:
                                        // If we want alpha, existing must be alpha. 
                                        // If we want numeric (null/undefined), existing must be numeric (null/undefined).
                                        if (targetType === 'a') {
                                            isCompatible = currentType === 'a';
                                        } else {
                                            // We want standard numeric
                                            isCompatible = !currentType;
                                        }
                                    } else {
                                        // UL matches UL
                                        isCompatible = true;
                                    }
                                }

                                if (!isCompatible) {
                                    // Create a new nested list if none exists or it's incompatible
                                    targetList = document.createElement(targetTag);
                                    if (targetType) {
                                        targetList.setAttribute('type', targetType);
                                    }
                                    previousLi.appendChild(targetList);
                                }

                                // Move the current list item into the target list
                                targetList.appendChild(parentLi);
                                // Moving the node clears selection, so we must restore it to the correct position.
                                try {
                                    const newRange = document.createRange();
                                    // offset includes the trigger length which was deleted.
                                    newRange.setStart(textNode, offset - triggerLength);
                                    newRange.setEnd(textNode, offset - triggerLength);
                                    selection.removeAllRanges();
                                    selection.addRange(newRange);
                                } catch (err) {
                                    console.warn("Failed to restore selection after manual indent:", err);
                                }
                            }
                        } else {
                            // New list creation
                            if (bulletMatch) {
                                document.execCommand('insertUnorderedList');
                            } else {
                                document.execCommand('insertOrderedList');
                                if (alphaMatch) {
                                    // Fix for alpha
                                    const selection = window.getSelection();
                                    if (selection.rangeCount > 0) {
                                        let current = selection.anchorNode;
                                        while (current && current.nodeName !== 'OL') {
                                            current = current.parentNode;
                                            if (current === elementRef.current) break;
                                        }
                                        if (current && current.nodeName === 'OL') {
                                            current.setAttribute('type', 'a');
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!multiline && e.key === " ") {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const textNode = range.startContainer;

                if (textNode.nodeType === 3) {
                    const text = textNode.textContent;
                    const offset = range.startOffset;

                    // Check for bullet list "* "
                    const bulletMatch = text.slice(0, offset).match(/^([*])\s*$/); // matches "*"
                    // Check for standard numbered list "1. "
                    const numberMatch = text.slice(0, offset).match(/^([0-9]+)\.\s*$/); // matches "1.", "10.", etc.
                    // Check for alpha numbered list "a. "
                    const alphaMatch = text.slice(0, offset).match(/^([a-z])\.\s*$/); // matches "a.", "b.", etc.

                    if (bulletMatch || numberMatch || alphaMatch) {
                        e.preventDefault();

                        // Common match object (re-evaluated to handle numberMatch)
                        const match = bulletMatch || numberMatch || alphaMatch;

                        // Remove the trigger characters
                        const triggerLength = match[0].length;
                        range.setStart(textNode, offset - triggerLength);
                        range.setEnd(textNode, offset);
                        range.deleteContents();

                        // Check nesting
                        let parentLi = textNode.parentNode;
                        while (parentLi && parentLi !== elementRef.current && parentLi.nodeName !== 'LI') {
                            parentLi = parentLi.parentNode;
                        }
                        const isInsideList = parentLi && parentLi.nodeName === 'LI';

                        if (isInsideList) {


                            // Nesting logic

                            // Capture state before indent
                            const previousList = parentLi.parentNode;

                            document.execCommand('indent');

                            // Hybrid detection: 1. Check if parentLi moved. 2. Fallback to selection.
                            let newList = null;

                            // 1. Check if parentLi parent changed
                            if (parentLi && parentLi.parentNode && parentLi.parentNode !== previousList && (parentLi.parentNode.nodeName === 'UL' || parentLi.parentNode.nodeName === 'OL')) {
                                newList = parentLi.parentNode;
                            }

                            // 2. Fallback to selection if previous check failed or parentLi ref became stale
                            if (!newList) {
                                const selection = window.getSelection();
                                if (selection.rangeCount > 0) {
                                    let node = selection.anchorNode;
                                    while (node && node !== elementRef.current) {
                                        if (node.nodeName === 'UL' || node.nodeName === 'OL') {
                                            newList = node;
                                            break;
                                        }
                                        node = node.parentNode;
                                    }
                                }
                            }

                            // We must verify that the found list is indeed a NEW nested list.
                            if (newList && previousList && newList !== previousList) {
                                if (bulletMatch) {
                                    if (newList.nodeName !== 'UL') {
                                        const ul = document.createElement('ul');
                                        // Copy children
                                        while (newList.firstChild) ul.appendChild(newList.firstChild);
                                        newList.parentNode.replaceChild(ul, newList);
                                        // Note: replacing child might cause parentLi ref to be lost if it was inside newList
                                    } else {
                                        newList.removeAttribute('type');
                                    }
                                } else {
                                    // Ensure OL
                                    let ol = newList;
                                    if (newList.nodeName !== 'OL') {
                                        ol = document.createElement('ol');
                                        while (newList.firstChild) ol.appendChild(newList.firstChild);
                                        newList.parentNode.replaceChild(ol, newList);
                                    }

                                    // Set type
                                    if (alphaMatch) {
                                        ol.setAttribute('type', 'a');
                                    } else {
                                        // Explicitly remove type for standard numbering to ensure default behavior
                                        ol.removeAttribute('type');
                                    }
                                }
                            } else if (newList && !previousList) {
                                // Edge case usually not hit inside isInsideList
                            }
                        } else {
                            // New list creation
                            if (bulletMatch) {
                                document.execCommand('insertUnorderedList');
                            } else {
                                document.execCommand('insertOrderedList');
                                if (alphaMatch) {
                                    // Fix for alpha
                                    const selection = window.getSelection();
                                    if (selection.rangeCount > 0) {
                                        let current = selection.anchorNode;
                                        while (current && current.nodeName !== 'OL') {
                                            current = current.parentNode;
                                            if (current === elementRef.current) break;
                                        }
                                        if (current && current.nodeName === 'OL') {
                                            current.setAttribute('type', 'a');
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!multiline && e.key === "Enter") {
            e.preventDefault();
            e.target.blur();
        }
        if (e.key === "Escape") {
            e.preventDefault();
            e.target.blur();
        }
    };

    const Tag = tagName;

    // Filter out truncate classes if editing
    const activeClassName = isEditing
        ? className.split(' ').filter(c => !c.startsWith('truncate-')).join(' ')
        : className;

    // Check for truncation if enabled
    const [isTruncated, setIsTruncated] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (!props.tooltipIfTruncated) return;

        const checkTruncation = () => {
            const el = elementRef.current;
            if (el) {
                const isOverflowing =
                    el.scrollWidth > el.clientWidth + 2 ||
                    el.scrollHeight > el.clientHeight + 2;
                setIsTruncated(isOverflowing);
            }
        };

        checkTruncation();
        window.addEventListener('resize', checkTruncation);
        const timer = setTimeout(checkTruncation, 100);

        return () => {
            window.removeEventListener('resize', checkTruncation);
            clearTimeout(timer);
        };
    }, [text, props.tooltipIfTruncated, className, style]);

    const activeProps = { ...props };
    delete activeProps.tooltipIfTruncated;

    const handleMouseEnter = () => {
        if (!isTruncated || isEditing) return;

        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            setTooltipPos({
                top: rect.bottom + 8, // Gap
                left: rect.left + rect.width / 2
            });
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const tooltipContent = (isHovered && isTruncated && !isEditing) ? (
        <div className="z-system-modal-floating" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 0, overflow: 'visible', pointerEvents: 'none' }}>
            <div style={{
                position: 'absolute',
                top: tooltipPos.top,
                left: tooltipPos.left,
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--background-neutral--neutral-strong)',
                color: 'var(--content-neutral--body-invert)',
                padding: '4px 8px',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '12px',
                lineHeight: '1.4',
                fontFamily: 'var(--font-family-body)',
                fontWeight: 500,
                boxShadow: 'var(--shadow--md)',
                pointerEvents: 'none',
                maxWidth: '240px',
                wordWrap: 'break-word',
                textAlign: 'center',
                whiteSpace: 'normal',
                zIndex: 'inherit' // Inherits from z-system-modal-floating
            }}>
                {text}
            </div>
        </div>
    ) : null;

    return (
        <>
            <Tag
                id={elementId}
                ref={elementRef}
                className={`builder-text ${activeClassName} ${!text ? "empty-builder-text" : ""}`}
                style={{ ...style, outline: "none", cursor: "default", minWidth: "1em", minHeight: "1em" }}
                contentEditable
                suppressContentEditableWarning={true}
                suppressHydrationWarning={true}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-placeholder={placeholder}
                {...activeProps}
                dangerouslySetInnerHTML={{ __html: text }}
            />
            {tooltipContent && createPortal(tooltipContent, document.body)}
        </>
    );
}

// Compare props to avoid re-rendering while editing
const arePropsEqual = (prevProps, nextProps) => {
    // 1. Primitive props
    if (
        prevProps.content !== nextProps.content ||
        prevProps.tagName !== nextProps.tagName ||
        prevProps.className !== nextProps.className ||
        prevProps.placeholder !== nextProps.placeholder ||
        prevProps.sectionId !== nextProps.sectionId ||
        prevProps.suffix !== nextProps.suffix ||
        prevProps.noId !== nextProps.noId ||
        prevProps.id !== nextProps.id ||
        prevProps.multiline !== nextProps.multiline ||
        prevProps.disableLinkPaste !== nextProps.disableLinkPaste ||
        prevProps.tooltipIfTruncated !== nextProps.tooltipIfTruncated
    ) {
        return false;
    }

    // 2. Style (deep match)
    const prevStyle = prevProps.style || {};
    const nextStyle = nextProps.style || {};
    const prevKeys = Object.keys(prevStyle);
    const nextKeys = Object.keys(nextStyle);

    if (prevKeys.length !== nextKeys.length) return false;

    for (let key of prevKeys) {
        if (prevStyle[key] !== nextStyle[key]) return false;
    }

    // 3. Ignore onChange (handled by ref) and onIdChange (assuming stability or unimportant for render)
    return true;
};

export default memo(BuilderTextComponent, arePropsEqual);
