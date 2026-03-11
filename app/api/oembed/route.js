import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const tiktokUrl = searchParams.get('url');

        if (!tiktokUrl) {
            return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
        }

        let targetUrl = tiktokUrl;
        // Normalize player URL to standard video URL
        if (tiktokUrl.includes('/player/v1/')) {
            const videoId = tiktokUrl.split('/player/v1/')[1]?.split('?')[0];
            if (videoId) {
                targetUrl = `https://www.tiktok.com/v/${videoId}`;
            }
        }

        const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(targetUrl)}`;
        const fetchOptions = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/html',
                'Referer': 'https://www.tiktok.com/'
            },
            redirect: 'follow'
        };

        // Handle short URLs by expanding them first
        if (tiktokUrl.includes('vt.tiktok.com/') || tiktokUrl.includes('vm.tiktok.com/') || tiktokUrl.includes('/t/')) {
            try {
                const headRes = await fetch(tiktokUrl, { ...fetchOptions, method: 'HEAD' });
                if (headRes.url && headRes.url !== tiktokUrl) {
                    targetUrl = headRes.url;
                }
            } catch (e) {
                console.error("Short URL expansion failed:", e);
            }
        }

        try {
            const response = await fetch(oembedUrl, fetchOptions);
            if (response.ok) {
                const data = await response.json();
                return NextResponse.json(data);
            }
        } catch (e) {
            console.error("TikTok oEmbed fetch error:", e);
        }

        // FALLBACK: Scrape the page
        try {
            console.warn(`Attempting fallback scrape for: ${targetUrl}`);
            const pageRes = await fetch(targetUrl, fetchOptions);
            if (pageRes.ok) {
                const html = await pageRes.text();
                // Regex for common title/desc/image sources
                const ogTitle = html.match(/<meta property="og:title" content="(.*?)"/i);
                const ogDesc = html.match(/<meta property="og:description" content="(.*?)"/i);
                const ogImage = html.match(/<meta property="og:image" content="(.*?)"/i);
                const titleTag = html.match(/<title>(.*?)<\/title>/i);

                if (ogTitle || titleTag) {
                    const finalTitle = (ogTitle ? ogTitle[1] : titleTag[1])
                        .replace(/ \| TikTok/gi, '')
                        .replace(/TikTok - /gi, '')
                        .trim();

                    return NextResponse.json({
                        title: finalTitle || 'TikTok Video',
                        description: ogDesc ? ogDesc[1].trim() : 'Watch this video on TikTok',
                        thumbnail_url: ogImage ? ogImage[1] : '',
                        author_name: 'TikTok Creator'
                    });
                }
            }
        } catch (e) {
            console.error("TikTok Scrape error:", e);
        }

        return NextResponse.json({
            error: 'Could not fetch metadata',
            title: 'TikTok Video',
            description: 'TikTok Video Description'
        });

    } catch (error) {
        console.error('oEmbed Proxy Server Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
