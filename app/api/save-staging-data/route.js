import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const { folderName, componentId, updates } = await request.json();

        if (!folderName || !componentId || !updates) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const STAGING_DIR = path.join(process.cwd(), 'app', 'staging');

        // Security check
        if (!/^[a-zA-Z0-9-_]+$/.test(folderName)) {
            return NextResponse.json({ error: 'Invalid folder name' }, { status: 400 });
        }

        const targetDir = path.join(STAGING_DIR, folderName);
        const dataFilePath = path.join(targetDir, 'data.js');

        if (!fs.existsSync(dataFilePath)) {
            return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(dataFilePath, 'utf-8');

        // Extract JSON from "export const data = { ... };"
        // We look for the first occurrence of '{' and the last '}'
        const start = fileContent.indexOf('{');
        const end = fileContent.lastIndexOf('}');

        if (start === -1 || end === -1) {
            return NextResponse.json({ error: 'Invalid data file format' }, { status: 500 });
        }

        const jsonString = fileContent.substring(start, end + 1);
        let currentData = {};

        try {
            currentData = JSON.parse(jsonString);
        } catch (e) {
            console.error("Error parsing data.js JSON:", e);
            return NextResponse.json({ error: 'Failed to parse existing data' }, { status: 500 });
        }

        // Merge updates
        const componentData = currentData[componentId] || {};
        const newData = { ...componentData, ...updates };
        currentData[componentId] = newData;

        // Write back
        const newFileContent = `export const data = ${JSON.stringify(currentData, null, 4)};`;
        fs.writeFileSync(dataFilePath, newFileContent);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving staging data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
