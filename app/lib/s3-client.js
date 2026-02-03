import { S3Client } from "@aws-sdk/client-s3";
import { FetchHttpHandler } from "@aws-sdk/fetch-http-handler";

if (process.env.NODE_ENV === 'development') {
    console.log('S3 Client: Disabling TLS verification for Dev');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const S3 = new S3Client({
    region: process.env.B2_REGION,
    endpoint: process.env.B2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.B2_KEY_ID,
        secretAccessKey: process.env.B2_APP_KEY,
    },
    // Ensure compatibility with Edge Runtime (Cloudflare Workers / Vercel Edge)
    requestHandler: new FetchHttpHandler(),
});

export default S3;
