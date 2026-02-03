import { DOMParser, XMLSerializer } from '@xmldom/xmldom';

// Lazy Singleton
let s3ClientInstance = null;

async function getClient() {
    if (s3ClientInstance) return s3ClientInstance;

    console.log("[S3 Client] Initializing via Dynamic Import...");

    // 1. Force Polyfills (Guaranteed to run before SDK load)
    if (typeof globalThis !== 'undefined') {
        if (!globalThis.DOMParser) {
            console.log("[S3 Client] Patching global DOMParser...");
            globalThis.DOMParser = DOMParser;
        }
        if (!globalThis.XMLSerializer) {
            globalThis.XMLSerializer = XMLSerializer;
        }
    }

    // 2. Dynamic Import (Barrier for Hoisting)
    const { S3Client } = await import("@aws-sdk/client-s3");
    const { FetchHttpHandler } = await import("@aws-sdk/fetch-http-handler");

    // 3. Instantiate
    s3ClientInstance = new S3Client({
        region: process.env.B2_REGION,
        endpoint: process.env.B2_ENDPOINT,
        credentials: {
            accessKeyId: process.env.B2_KEY_ID,
            secretAccessKey: process.env.B2_APP_KEY,
        },
        requestHandler: new FetchHttpHandler(),
    });

    return s3ClientInstance;
}

// Proxy object
const S3 = {
    send: async (command) => {
        const client = await getClient();
        return client.send(command);
    },
    config: {},
};

export default S3;
