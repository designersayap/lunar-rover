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

        // Auto-link on paste
        if (!disableLinkPaste) {
            const selection = window.getSelection();
            if (selection.toString().length > 0) {
                // Simple regex for URL validation (http/https required)
                const urlRegex = /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i;

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
                    // Check for alpha numbered list "a. "
                    const alphaMatch = text.slice(0, offset).match(/^([a-z])\.\s*$/); // matches "a.", "b.", etc.

                    if (bulletMatch || alphaMatch) {
                        e.preventDefault();

                        // Remove the trigger characters
                        const triggerLength = (bulletMatch || alphaMatch)[0].length;
                        range.setStart(textNode, offset - triggerLength + 1); // +1 because we haven't typed the space yet, but we want to replace the trigger chars

                        // Let's refine the range removal
                        const charsToRemove = (bulletMatch || alphaMatch)[1].length + 1; // trigger char(s) + the dot for alpha


                        if (bulletMatch && bulletMatch[0] === "*") { // simplified check
                            // Remove the '*'
                            range.setStart(textNode, offset - 1);
                            range.setEnd(textNode, offset);
                            range.deleteContents();

                            document.execCommand('insertUnorderedList');
                        } else if (alphaMatch) {
                            // Remove the 'a.'
                            const trigger = alphaMatch[0]; // e.g. "a."
                            range.setStart(textNode, offset - trigger.length);
                            range.setEnd(textNode, offset);
                            range.deleteContents();

                            document.execCommand('insertOrderedList');

                            const selection = window.getSelection();
                            if (selection.rangeCount > 0) {
                                const newNode = selection.anchorNode;
                                // find closest ol
                                let current = newNode;
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
    // We intentionally return TRUE here if all other visual props are equal.
    return true;
};

export default memo(BuilderTextComponent, arePropsEqual);
