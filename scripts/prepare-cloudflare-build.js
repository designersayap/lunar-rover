const fs = require('fs');
const path = require('path');

// This script runs before the Cloudflare build to remove routes that are not compatible with Edge runtime
// Specifically, the UAT preview route uses Node.js filesystem APIs which are not available in Edge runtime

const isCloudflare = process.env.CF_PAGES === '1';

if (isCloudflare) {
    console.log('Detected Cloudflare environment. preparing build...');

    const uatRoutePath = path.join(process.cwd(), 'app', 'api', 'uat-preview', 'route.js');

    if (fs.existsSync(uatRoutePath)) {
        try {
            fs.unlinkSync(uatRoutePath);
            console.log('Successfully removed app/api/uat-preview/route.js for Cloudflare build');
        } catch (error) {
            console.error('Error removing UAT route file:', error);
            process.exit(1);
        }
    } else {
        console.log('UAT route file not found, skipping removal');
    }
} else {
    console.log('Not running in Cloudflare environment, skipping build preparation');
}
