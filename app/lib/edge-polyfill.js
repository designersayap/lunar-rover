import { DOMParser, XMLSerializer } from '@xmldom/xmldom';

if (typeof globalThis.DOMParser === 'undefined') {
    globalThis.DOMParser = DOMParser;
}

if (typeof globalThis.XMLSerializer === 'undefined') {
    globalThis.XMLSerializer = XMLSerializer;
}

// Extract Node, Element, and Document from a created instance since they aren't exported directly
try {
    const doc = new DOMParser().parseFromString('<xml></xml>', 'text/xml');

    if (typeof globalThis.Node === 'undefined' && doc.ownerDocument && doc.ownerDocument.defaultView) {
        // If xmldom supported a window/view, we'd get it here. 
        // But xmldom is often minimal. Let's check constructor.
    }

    // Fallback: Manually mock Node constants if we can't get the Function
    // xmldom nodes usually have the constants on the instance, but the AWS SDK might check `globalThis.Node.ELEMENT_NODE`
    if (typeof globalThis.Node === 'undefined') {
        globalThis.Node = {
            ELEMENT_NODE: 1,
            ATTRIBUTE_NODE: 2,
            TEXT_NODE: 3,
            CDATA_SECTION_NODE: 4,
            ENTITY_REFERENCE_NODE: 5,
            ENTITY_NODE: 6,
            PROCESSING_INSTRUCTION_NODE: 7,
            COMMENT_NODE: 8,
            DOCUMENT_NODE: 9,
            DOCUMENT_TYPE_NODE: 10,
            DOCUMENT_FRAGMENT_NODE: 11,
            NOTATION_NODE: 12
        };
    }
} catch (e) {
    console.error('Failed to polyfill Node constants:', e);
}

// Ensure it's treated as a side-effect import
export default {};
