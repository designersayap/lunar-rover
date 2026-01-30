import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import S3 from '@/app/lib/s3-client';

export async function POST(request) {
    try {
        const { pathname, contentType } = await request.json();

        if (!pathname) {
            return NextResponse.json({ error: 'Missing pathname' }, { status: 400 });
        }

        const bucketName = process.env.B2_BUCKET_NAME;

        // Ensure strictly relative path, though S3 handles keys broadly.
        const key = pathname.startsWith('/') ? pathname.slice(1) : pathname;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: contentType || 'application/json',
        });

        // Generate pre-signed URL (valid for 5 minutes)
        const uploadUrl = await getSignedUrl(S3, command, { expiresIn: 300 });

        // Construct public URL
        // Note: This assumes standard path-style access or logic. 
        // For B2 if the endpoint includes the scheme (https://...), we use it.
        const url = `${process.env.B2_ENDPOINT}/${bucketName}/${key}`;

        return NextResponse.json({
            uploadUrl,
            url
        });

    } catch (error) {
        console.error('Error generating signed URL:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
