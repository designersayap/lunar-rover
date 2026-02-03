export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { S3Manual } from '@/app/lib/s3-manual';

export async function POST(request) {
    try {
        const { pathname, contentType } = await request.json();

        if (!pathname) {
            return NextResponse.json({ error: 'Missing pathname' }, { status: 400 });
        }

        const bucketName = process.env.B2_BUCKET_NAME;

        // Ensure strictly relative path, though S3 handles keys broadly.
        const key = pathname.startsWith('/') ? pathname.slice(1) : pathname;

        // Generate pre-signed URL (valid for 5 minutes)
        // Replaces getSignedUrl from SDK
        const uploadUrl = await S3Manual.getPresignedUrl('PUT', key, 300, contentType || 'application/json');

        // Construct public URL
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
