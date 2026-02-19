import { AwsClient } from 'aws4fetch';
import { Resend } from 'resend';

export default {
    // Scheduled Cron Job (8 AM)
    async scheduled(event, env, ctx) {
        console.log("Cron trigger fired at:", new Date().toISOString());
        ctx.waitUntil(checkAndSendSummary(env));
    },

    // Manual Trigger (Visit the URL)
    async fetch(request, env, ctx) {
        const result = await checkAndSendSummary(env);
        return new Response(result, { status: 200 });
    }
};

async function checkAndSendSummary(env) {
    try {
        // 1. Initialize Clients
        const apiKey = env.RESEND_API_KEY;
        console.log("Debug: API Key present?", !!apiKey);
        if (apiKey) {
            console.log("Debug: API Key length:", apiKey.length);
            console.log("Debug: API Key start:", apiKey.substring(0, 3) + "...");
        } else {
            console.error("Debug: API KEY IS MISSING!");
            return "Error: RESEND_API_KEY is missing from Cloudflare secrets.";
        }

        const resend = new Resend(apiKey);
        const aws = new AwsClient({
            accessKeyId: env.B2_KEY_ID,
            secretAccessKey: env.B2_APP_KEY,
            service: 's3',
            region: 'us-east-005',
        });

        // 2. Fetch Notifications
        const bucketUrl = env.B2_ENDPOINT; // Make sure this has /lunar-app at the end!
        const fileUrl = `${bucketUrl}/notifications/notifications.json`;

        console.log("Fetching from:", fileUrl);
        const response = await aws.fetch(fileUrl);

        if (!response.ok) {
            const errorMsg = `Failed to fetch notifications: ${response.status} ${response.statusText}`;
            console.error(errorMsg);
            return errorMsg;
        }

        const data = await response.json();
        const notifications = data.notifications || [];

        // 3. Filter Unread
        const unread = notifications.filter(n => !n.read);

        if (unread.length === 0) {
            console.log("No unread notifications. Skipping email.");
            return "No unread notifications. Email skipped.";
        }

        // 4. Format Email
        const emailHtml = `
            <h1>Good Morning!</h1>
            <p>You have <strong>${unread.length}</strong> unread notifications on Lunar.</p>
            <hr />
            <ul>
                ${Object.entries(
            unread.reduce((acc, n) => {
                const key = n.folderName || 'System';
                if (!acc[key]) {
                    acc[key] = { count: 0, latestTimestamp: n.timestamp };
                }
                acc[key].count += (n.count || 1);
                if (new Date(n.timestamp) > new Date(acc[key].latestTimestamp)) {
                    acc[key].latestTimestamp = n.timestamp;
                }
                return acc;
            }, {})
        ).map(([folderName, data]) => `
                    <li style="margin-bottom: 15px;">
                        <strong>${folderName}</strong>: ${data.count} changes has been made
                        <div style="color: #666; font-size: 12px; margin-top: 4px;">
                            ${new Date(data.latestTimestamp).toLocaleString('en-US', {
            month: 'numeric', day: 'numeric', year: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
        })}
                        </div>
                    </li>
                `).join('')}
            </ul>
            <p>
                <a href="https://lunaaar.pages.dev" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    Open Builder
                </a>
            </p>
        `;

        // 5. Send Email
        const recipients = env.EMAIL_TO.split(',').map(email => email.trim());
        const { data: emailData, error } = await resend.emails.send({
            from: env.EMAIL_FROM || 'onboarding@resend.dev',
            to: recipients,
            subject: `Lunar: ${unread.length} Unread Notifications`,
            html: emailHtml,
        });

        if (error) {
            console.error("Failed to send email:", error);
            return `Failed to send email: ${JSON.stringify(error)}`;
        } else {
            console.log("Email sent successfully:", emailData);
            return `Email sent successfully to ${recipients.join(', ')}! Check your inboxes.`;
        }

    } catch (err) {
        console.error("Error in worker:", err);
        return `Error: ${err.message}`;
    }
}
