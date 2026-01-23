import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function GET(request) {
    // Diagnostic endpoint to verify the route is accessible
    return NextResponse.json({ status: 'ok', message: 'Upload route is active' });
}

export async function POST(request) {
    console.log("DEBUG: Final Upload Route Hit");

    const body = await request.json();

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname) => {
                console.error('Generating token Final with allowOverwrite: true');

                return {
                    allowedContentTypes: ['application/json'],
                    // Allow overwriting for staging files to keep URLs predictable
                    addRandomSuffix: false,
                    allowOverwrite: true,
                    cacheControlMaxAge: 0, // Disable caching to ensure updates are seen immediately
                    tokenPayload: JSON.stringify({
                        // optional payload to save metadata in database if needed
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Callback after upload is complete
                console.log('Upload completed:', blob.url);
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 } // The webhook will retry 5 times automatically if the status code is 500
        );
    }
}
