import { DOMParser, XMLSerializer } from '@xmldom/xmldom';

console.log("[S3 Fix] Loading Polyfills for Edge Runtime...");

if (typeof globalThis !== 'undefined') {
    globalThis.DOMParser = DOMParser;
    globalThis.XMLSerializer = XMLSerializer;
    console.log("[S3 Fix] Patched globalThis");
}

if (typeof self !== 'undefined') {
    self.DOMParser = DOMParser;
    self.XMLSerializer = XMLSerializer;
    console.log("[S3 Fix] Patched self");
}

if (typeof window !== 'undefined') {
    window.DOMParser = DOMParser;
    window.XMLSerializer = XMLSerializer;
    console.log("[S3 Fix] Patched window");
}

// Special check for verify
try {
    new globalThis.DOMParser().parseFromString('<test/>', 'text/xml');
    console.log("[S3 Fix] DOMParser verification success");
} catch (e) {
    console.error("[S3 Fix] DOMParser verification failed:", e);
}
