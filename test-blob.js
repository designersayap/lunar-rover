require('dotenv').config({ path: '.env.local' });
const { list } = require('@vercel/blob');

async function test() {
    console.log("Testing connection with token:", process.env.BLOB_READ_WRITE_TOKEN ? "Found" : "Missing");
    try {
        const { blobs } = await list({ prefix: 'staging/' });
        console.log("Success! Found blobs:", blobs.length);
        console.log(blobs);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
