
const fs = require('fs');
const path = require('path');

// Mock NextResponse
const NextResponse = {
    json: (data) => data
};

// Mock Request
const createRequest = (filePath) => ({
    json: async () => ({ filePath })
});

// We need to read the route.js file and eval it or strip exports because it uses ES module syntax 'export async function POST'
// and we are likely running in a CommonJS node environment in the shell.
// Alternatively, we can just copy the relevant cleaning logic into this script to test it. 
// BUT, to be sure, it's better to test the exact code.
// Let's try to mock the environment to require the file? 
// Or better, let's just Read route.js, extract the cleaning function body, and run it.

async function runTest() {
    const routePath = path.join(process.cwd(), 'app/api/export-component/route.js');
    let routeCode = fs.readFileSync(routePath, 'utf8');

    // Quick hack to make it runnable: remove imports, wrap in a function we can call
    // We only want the body of POST.

    // We need to ensure we run the EXACT regex logic.
    // Let's just create a simplified version that *copies* the file content cleaning part.
    // Actually, I can just copy the file content of header-title-button.js and run the replacements on it manually using the regex from route.js
    // ensuring I copy-paste the regex EXACTLY.

    // BUT the best way is to load the module.
    // Let's rely on the user's `npm run dev`? I can't interact with it.

    // Let's try to use the `regex_test.js` approach again but deeper.
    // I will read `header-title-button.js` content.
    // I will read `route.js` content.
    // I will extract the regexes from `route.js` using regex (meta!) or just manual inspection?
    // Manual inspection is prone to error.

    // Let's try to create a module that imports the code. Use .mjs extension.
    // app/api is using ES exports.
}

// SIMPLER APPROACH:
// I will write a script that has the Cleaning Logic copied specifically or imported.
// Since I can't easily import a next.js route file in a standalone node script without transpilation issues usually,
// I will verify the regex by copying the *current* content of route.js logic into the script.
// Wait, I can read the file route.js, and evaluate the code?
// Too risky.

// Let's just create a script that takes the logic I *think* is there (by reading the file first to be sure) and runs it.
// I will read `route.js` now to confirm it HAS the changes I made.
console.log("Checking route.js content...");
const routeContent = fs.readFileSync('app/api/export-component/route.js', 'utf8');

if (!routeContent.includes('idMatch')) {
    console.error("FAIL: route.js does NOT contain 'idMatch'. The changes were lost or not applied??");
} else {
    console.log("PASS: route.js contains 'idMatch'.");
}

if (!routeContent.includes('src="')) {
    console.error("FAIL: route.js does NOT contain src literal check.");
} else {
    console.log("PASS: route.js contains src literal check.");
}

// Now let's try to simulate the cleaning on the actual file content.
const componentPath = 'app/page-builder-components/utils/builder/builder-button.js';
let content = fs.readFileSync(componentPath, 'utf8');

// --- APPLY CLEANING LOGIC FROM ROUTE.JS ---
// I am pasting the RELEVANT logic here to test it.
// Copy/Paste from what I *intended* to write.

// 1. Remove callbacks
const builderCallbacks = [
    'onIdChange', 'onLabelChange', 'onVisibilityChange',
    'onHrefChange', 'onVariantChange', 'onLinkTypeChange',
    'onTargetDialogIdChange', 'onIsPortraitChange', 'onMobileRatioChange',
    'onChange'
];
const callbackPattern = `(${builderCallbacks.join('|')})={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}`;
const callbackRegex = new RegExp(callbackPattern, 'g');
content = content.replace(callbackRegex, '');

// Remove icons
content = content.replace(/(iconRight|iconLeft)={((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}/g, '');

// BuilderButton Logic
const builderButtonRegex = /<BuilderButton([\s\S]*?)\/>/g;
content = content.replace(builderButtonRegex, (match, attrs) => {
    // ... logic ...
    const labelMatch = attrs.match(/label={((?:[^{}]|{[^}]*})*)}/);
    const label = labelMatch ? `{${labelMatch[1]}}` : 'Label';

    const hrefMatch = attrs.match(/href={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/href="([^"]+)"/);
    let hrefRaw = hrefMatch ? (hrefMatch[0].startsWith('href="') ? `"${hrefMatch[1]}"` : hrefMatch[1]) : '""';

    const linkTypeMatch = attrs.match(/linkType={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/linkType="([^"]+)"/);
    const targetIdMatch = attrs.match(/targetDialogId={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/targetDialogId="([^"]+)"/);

    const classNameMatch = attrs.match(/className={((?:[^{}]|{[^}]*})*)}/);
    const classNameStringMatch = attrs.match(/className="([^"]+)"/);

    const keyMatch = attrs.match(/key={((?:[^{}]|{[^}]*})*)}/);
    let keyAttr = '';
    if (keyMatch) keyAttr = ` key={${keyMatch[1]}}`;

    const suffixMatch = attrs.match(/suffix="([^"]+)"/);
    const suffix = suffixMatch ? suffixMatch[1] : '';

    const idMatch = attrs.match(/id={((?:[^{}]|{[^}]*})*)}/) || attrs.match(/id="([^"]+)"/);

    let idExpr = 'undefined';
    if (idMatch) {
        if (idMatch[0].startsWith('id="')) idExpr = `"${idMatch[1]}"`;
        else idExpr = idMatch[1];
    }

    // Implement Builder ID fallback logic: id || (sectionId + suffix)
    // Using a safe check for sectionId existence to avoid reference errors
    let finalIdAttr = '';
    if (suffix) {
        // Logic: Use provided ID, or generate from sectionId + suffix
        // We assume sectionId is available in the component scope (standard for these components)
        const fallback = `(typeof sectionId !== 'undefined' && sectionId ? \`\${sectionId}-${suffix}\` : undefined)`;
        const combined = idExpr !== 'undefined' ? `(${idExpr} || ${fallback})` : fallback;
        finalIdAttr = ` id={${combined}}`;
    } else if (idExpr !== 'undefined') {
        // No suffix, just use ID if present
        finalIdAttr = ` id={${idExpr}}`;
    }

    let className = '';
    if (classNameMatch) {
        className = ` className={${classNameMatch[1]}}`;
    } else if (classNameStringMatch) {
        className = ` className="${classNameStringMatch[1]}"`;
    }

    let finalHrefExp = '';

    const getExpr = (matchObj) => {
        if (!matchObj) return 'null';
        if (matchObj[0].startsWith('linkType="') || matchObj[0].startsWith('targetDialogId="')) return `"${matchObj[1]}"`;
        return matchObj[1];
    };

    const linkTypeExpr = getExpr(linkTypeMatch);
    const targetIdExpr = getExpr(targetIdMatch);

    let hrefExpr = hrefRaw;
    if (hrefRaw.startsWith('"')) {
        // It's a string literal like "#"
        // Keep it as is
    } else {
        // It's an expression content or empty
        // If empty or "", default to "#"
        if (hrefRaw === '""' || hrefRaw === '') hrefExpr = '"#"';
        else hrefExpr = `(${hrefRaw} || "#")`;
    }

    if (linkTypeExpr !== 'null' && targetIdExpr !== 'null') {
        const targetHash = `'#' + ${targetIdExpr}`;
        finalHrefExp = `{(\n                   (${linkTypeExpr} === 'dialog' && ${targetIdExpr})\n                     ? ${targetHash}\n                     : ${hrefExpr}\n                )}`;

        const onClickLogic = ` onClick={(e) => { if (${linkTypeExpr} === 'dialog' && ${targetIdExpr}) { window.location.hash = ${targetHash}; } }}`;

        return `<Link href=${finalHrefExp}${className}${keyAttr}${finalIdAttr}${onClickLogic}>${label}</Link>`;
    } else {
        finalHrefExp = hrefExpr.startsWith('"') ? hrefExpr : `{${hrefExpr}}`;
        return `<Link href=${finalHrefExp}${className}${keyAttr}${finalIdAttr}>${label}</Link>`;
    }
});

console.log("\n--- PROCESSED CONTENT SNAPSHOT ---");
console.log(content.substring(0, 5000));
