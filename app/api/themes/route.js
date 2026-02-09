import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
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
        return NextResponse.json({ error: "Failed to load themes" }, { status: 500 });
    }
}
