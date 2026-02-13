import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-js";
import { DOMParser } from "@xmldom/xmldom";

// Configuration
const REGION = process.env.B2_REGION;
const ENDPOINT = process.env.B2_ENDPOINT;
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
async function sendS3Request(method, key, queryParams = {}, body = null, extraHeaders = {}) {
    // Construct URL
    const endpointUrl = new URL(ENDPOINT.startsWith('http') ? ENDPOINT : `https://${ENDPOINT}`);
    endpointUrl.pathname = `/${BUCKET}/${key}`;

    // Construct Query Object for Signer
    const query = {};
    Object.keys(queryParams).forEach(k => {
        endpointUrl.searchParams.append(k, queryParams[k]);
        query[k] = queryParams[k];
    });

    // Prepare Request Object for Signing
    // host header is required
    const headers = {
        host: endpointUrl.host,
        ...extraHeaders
    };

    if (body && !headers['content-type']) {
        headers['content-type'] = 'application/json';
    }

    const request = {
        method: method,
        protocol: endpointUrl.protocol,
        hostname: endpointUrl.hostname,
        path: endpointUrl.pathname, // Signer handles canonical query independently
        query: query,
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
    async listObjects(prefix, delimiter = null) {
        const queryParams = {
            'list-type': '2',
            'prefix': prefix,
            'max-keys': '1000'
        };

        if (delimiter) {
            queryParams.delimiter = delimiter;
        }

        const response = await sendS3Request('GET', '', queryParams);

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

        const commonPrefixes = [];
        const prefixNodes = doc.getElementsByTagName('CommonPrefixes');
        for (let i = 0; i < prefixNodes.length; i++) {
            const node = prefixNodes[i];
            const prefixNode = node.getElementsByTagName('Prefix')[0];
            if (prefixNode) {
                commonPrefixes.push({
                    Prefix: prefixNode.textContent
                });
            }
        }

        return { Contents: contents, CommonPrefixes: commonPrefixes };
    },

    async getJson(key) {
        const response = await sendS3Request('GET', key);
        return await response.json();
    },

    async putJson(key, data) {
        const body = JSON.stringify(data);
        await sendS3Request('PUT', key, {}, body);
        return true;
    },

    async putObject(key, body, contentType) {
        await sendS3Request('PUT', key, {}, body, { 'content-type': contentType });
        return true;
    },

    async deleteObject(key) {
        await sendS3Request('DELETE', key);
        return true;
    },

    /**
     * Generates a pre-signed URL for client-side uploads/downloads
     */
    async getPresignedUrl(method, key, expiresIn = 300, contentType = 'application/json') {
        const endpointUrl = new URL(ENDPOINT.startsWith('http') ? ENDPOINT : `https://${ENDPOINT}`);
        endpointUrl.pathname = `/${BUCKET}/${key}`;

        const headers = {
            host: endpointUrl.host,
        };

        // For PUT (uploads), we might need to sign the content-type if the client sends it
        if (method === 'PUT' && contentType) {
            headers['content-type'] = contentType;
        }

        const request = {
            method: method,
            protocol: endpointUrl.protocol,
            hostname: endpointUrl.hostname,
            path: endpointUrl.pathname,
            query: {},
            headers: headers,
        };

        const url = await signer.presign(request, { expiresIn });
        return url;
    }
};
