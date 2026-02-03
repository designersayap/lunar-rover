import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-js";
import { DOMParser } from "@xmldom/xmldom";

// Configuration
const REGION = process.env.B2_REGION; // e.g., us-west-004
const ENDPOINT = process.env.B2_ENDPOINT; // e.g., https://s3.us-west-004.backblazeb2.com
const BUCKET = process.env.B2_BUCKET_NAME;
const ACCESS_KEY = process.env.B2_KEY_ID;
const SECRET_KEY = process.env.B2_APP_KEY;

// Create Signer
const signer = new SignatureV4({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
    },
    region: REGION,
    service: "s3",
    sha256: Sha256,
});

/**
 * Manually signs and fetches a request to S3
 */
async function sendS3Request(method, key, queryParams = {}, body = null) {
    // Construct URL
    // Endpoint usually includes protocol. If not, add it.
    const endpointUrl = new URL(ENDPOINT.startsWith('http') ? ENDPOINT : `https://${ENDPOINT}`);
    // Path: /<bucket>/<key>
    endpointUrl.pathname = `/${BUCKET}/${key}`;

    // Add Query Params
    Object.keys(queryParams).forEach(k => endpointUrl.searchParams.append(k, queryParams[k]));

    // Prepare Request Object for Signing
    // host header is required
    const headers = {
        host: endpointUrl.host,
    };

    if (body) {
        headers['content-type'] = 'application/json';
    }

    const request = {
        method: method,
        protocol: endpointUrl.protocol,
        hostname: endpointUrl.hostname,
        path: endpointUrl.pathname + endpointUrl.search,
        headers: headers,
        body: body,
    };

    // Sign
    const signedRequest = await signer.sign(request);

    // Fetch
    const response = await fetch(endpointUrl.toString(), {
        method: signedRequest.method,
        headers: signedRequest.headers,
        body: signedRequest.body,
        cache: 'no-store'
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`S3 Error ${response.status}: ${text}`);
    }

    return response;
}

export const S3Manual = {
    /**
     * Lists objects in the bucket with a prefix
     * Returns generic "Contents" array similar to SDK
     */
    async listObjects(prefix) {
        // GET /?list-type=2&prefix=...
        const response = await sendS3Request('GET', '', {
            'list-type': '2',
            'prefix': prefix,
            'max-keys': '1000'
        });

        const xmlText = await response.text();

        // Manual XML Parsing using xmldom (Safe in Edge)
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, "text/xml");

        const contents = [];
        const contentNodes = doc.getElementsByTagName('Contents');

        for (let i = 0; i < contentNodes.length; i++) {
            const node = contentNodes[i];
            const keyNode = node.getElementsByTagName('Key')[0];
            const lastModNode = node.getElementsByTagName('LastModified')[0];

            if (keyNode) {
                contents.push({
                    Key: keyNode.textContent,
                    LastModified: lastModNode ? new Date(lastModNode.textContent) : new Date(),
                });
            }
        }

        return { Contents: contents };
    },

    /**
     * Puts a JSON object
     */
    async putJson(key, data) {
        const body = JSON.stringify(data);
        await sendS3Request('PUT', key, {}, body);
        return true;
    },

    /**
     * Deletes objects
     * Note: S3 DeleteMultiple is weird (POST with XML). 
     * We will use simple DeleteObject loop for now as it is safer to implement manually.
     */
    async deleteObject(key) {
        await sendS3Request('DELETE', key);
        return true;
    }
};
