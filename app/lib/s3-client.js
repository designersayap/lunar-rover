import "@/app/lib/s3-fix"; // MUST BE FIRST IMPORT
import { S3Client } from "@aws-sdk/client-s3";
import { FetchHttpHandler } from "@aws-sdk/fetch-http-handler";

if (process.env.NODE_ENV === 'development') {
    console.log('S3 Client: Disabling TLS verification for Dev');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// Lazy Initialization Pattern to avoid Hoisting Race Conditions
let s3ClientInstance = null;

export const getS3Client = () => {
    if (s3ClientInstance) return s3ClientInstance;

    // 1. Force Polyfills (Again, just to be sure)
    const { DOMParser, XMLSerializer } = require('@xmldom/xmldom');

    // Patch Global
    if (typeof globalThis !== 'undefined') {
        if (!globalThis.DOMParser) globalThis.DOMParser = DOMParser;
        if (!globalThis.XMLSerializer) globalThis.XMLSerializer = XMLSerializer;
    }

    console.log("[S3 Client] Lazy Initializing S3 Client...");

    const { S3Client } = require("@aws-sdk/client-s3");
    const { FetchHttpHandler } = require("@aws-sdk/fetch-http-handler");

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
};

// Fallback for default import (legacy compatibility if needed, but discouraged)
export default {
    send: (cmd) => getS3Client().send(cmd)
};
