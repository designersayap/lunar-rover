import { notFound } from "next/navigation";
import { Suspense } from 'react';
import StagingClientPage from "./staging-client-page";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { slug } = await params;

    // Server-side fetching disabled due to proxy issues.
    // Metadata can be updated client-side if needed.
    return {
        title: `Staging: ${slug}`,
        robots: "noindex, nofollow"
    };
}

export default async function Page({ params }) {
    const { slug } = await params;

    // Server-side fetching disabled due to proxy issues.
    // Client-side component will handle data fetching via dataUrl.
    const stagingData = null;

    // If server-side fetch fails (e.g. proxy), we pass null and let the client fetch it via dataUrl
    // if (!stagingData) {
    //    return notFound();
    // }

    // Pass activeThemePath if available, currently hardcoded in client or passed via props

    return (
        <Suspense fallback={<div>Loading Page...</div>}>
            <StagingClientPage
                initialData={stagingData}
                folderName={slug}
                activeThemePath="/themes/theme.css"
            />
        </Suspense>
    );
}
