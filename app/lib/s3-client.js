import { S3Client } from "@aws-sdk/client-s3";

// WORKAROUND: Allow self-signed certs for corporate proxy (Dev only)
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}


const S3 = new S3Client({
    region: process.env.B2_REGION,
    endpoint: process.env.B2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.B2_KEY_ID,
        secretAccessKey: process.env.B2_APP_KEY,
    },
});

export default S3;
