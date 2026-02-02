export const runtime = 'edge';

import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json({
        error: 'Not Implemented on Edge Runtime',
        content: null
    }, { status: 501 });
}
