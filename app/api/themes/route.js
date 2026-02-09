
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force this route to be static so it runs at build time.
// This allows us to use 'fs' to read the directory, which isn't available in the Edge Runtime.
export const dynamic = 'force-static';

export async function GET() {
    // This will run during the build process
    const themesDir = path.join(process.cwd(), "public/themes");

    try {
        const files = await fs.promises.readdir(themesDir);

        const themes = files
            .filter(file => file.endsWith(".css") && file !== "theme.css")
            .map(file => {
                const id = file.replace(".css", "");
                const name = id
                    .split("-")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                return {
                    id,
                    name,
                    path: `/themes/${file}`
                };
            });

        return NextResponse.json(themes);
    } catch (error) {
        console.error("Error reading themes directory:", error);
        // Even if it fails build-time, we return 500. 
        // In a real static build, this might cause the build to fail if unhandled, 
        // but returning JSON is safer for the generated output.
        return NextResponse.json({ error: "Failed to load themes" }, { status: 500 });
    }
}
