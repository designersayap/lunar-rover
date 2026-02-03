import "@/app/lib/s3-fix"; // 1. Run Polyfills Module First
import { S3Client } from "@aws-sdk/client-s3";
import { FetchHttpHandler } from "@aws-sdk/fetch-http-handler";
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';

// Lazy Singleton to prevent hoisting issues
let s3ClientInstance = null;

function getClient() {
    if (s3ClientInstance) return s3ClientInstance;

    console.log("[S3 Client] Initializing Lazy Client...");

    // 2. Runtime Polyfill Check (Double Safety)
    if (typeof globalThis !== 'undefined') {
        if (!globalThis.DOMParser) {
            console.warn("[S3 Client] DOMParser missing in global scope. Patching now.");
            globalThis.DOMParser = DOMParser;
        }
        if (!globalThis.XMLSerializer) {
            globalThis.XMLSerializer = XMLSerializer;
        }
    }

    // 3. Instantiate Client
    s3ClientInstance = new S3Client({
        region: process.env.B2_REGION,
        endpoint: process.env.B2_ENDPOINT,
        credentials: {
            accessKeyId: process.env.B2_KEY_ID,
            secretAccessKey: process.env.B2_APP_KEY,
        },
        // Ensure compatibility with Edge Runtime
        requestHandler: new FetchHttpHandler(),
    });

    return s3ClientInstance;
}

// Proxy object to maintain API compatibility with "import S3 from ..."
const S3 = {
    send: (command) => getClient().send(command),
    config: {}, // Mock config if needed
};

export default S3;
