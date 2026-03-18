
const fs = require('fs');
const path = require('path');

const SOURCE_DIRS = [
    'app/templates',
    'app/page-builder',
    'app/foundation',
    'public/fonts'
];

function getFontMetadata(allFiles) {
    const fonts = {};
    allFiles.forEach(file => {
        if (file.path.startsWith('public/fonts/') && file.isBinary) {
            const parts = file.path.split('/');
            if (parts.length >= 4) {
                const family = parts[2].replace(/_/g, ' ');
                if (!fonts[family]) fonts[family] = [];
                
                const filename = parts[parts.length - 1];
                let weight = "400";
                let style = "normal";

                if (filename.toLowerCase().includes('bold')) weight = "700";
                if (filename.toLowerCase().includes('medium')) weight = "500";
                if (filename.toLowerCase().includes('semibold')) weight = "600";
                if (filename.toLowerCase().includes('light')) weight = "300";
                if (filename.toLowerCase().includes('thin')) weight = "100";
                if (filename.toLowerCase().includes('black')) weight = "900";
                if (filename.toLowerCase().includes('italic')) style = "italic";

                fonts[family].push({
                    path: `../fonts/${filename}`,
                    weight,
                    style,
                    originalPath: file.path
                });
            }
        }
    });
    return fonts;
}

const OUTPUT_FILE = 'app/api/export-component/component-map.js';

// Helper to recursively read directory
function readDirRecursive(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            readDirRecursive(filePath, fileList);
        } else {
            // Include relevant files for export (js, css, images, fonts)
            const ext = path.extname(file).toLowerCase();
            const isBinary = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.pdf', '.ttf', '.woff', '.woff2'].includes(ext);
            const isText = ['.js', '.css', '.json', '.md', '.txt'].includes(ext);

            if (isBinary || isText) {
                const relativePath = filePath.replace(/\\/g, '/'); // Normalize paths

                let content;
                if (isBinary) {
                    content = fs.readFileSync(filePath, 'base64');
                } else {
                    content = fs.readFileSync(filePath, 'utf8');
                }

                fileList.push({
                    path: relativePath,
                    content: content,
                    isBinary: isBinary
                });
            }
        }
    });

    return fileList;
}

function generateMap() {
    console.log('Generating component map for Edge Runtime compatibility...');

    const allFiles = [];

    SOURCE_DIRS.forEach(dir => {
        readDirRecursive(dir, allFiles);
    });

    const map = {};
    allFiles.forEach(file => {
        map[file.path] = {
            content: file.content,
            isBinary: file.isBinary
        };
    });

    // Add Font Metadata
    map['__fonts__'] = getFontMetadata(allFiles);

    // Ensure directory exists
    const outDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    // Write as ES Module
    const fileContent = `const componentMap = ${JSON.stringify(map, null, 2)};\nexport default componentMap;`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`Generated component map with ${Object.keys(map).length} files at ${OUTPUT_FILE}`);
}

generateMap();
