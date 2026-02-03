// Force disable TLS verification for local dev (Edge Runtime fix)
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  webpack: (config, { isServer }) => {
    // Only polyfill on server/edge builds
    if (isServer) {
      // Use ProvidePlugin to inject DOMParser/XMLSerializer into every module that needs it
      const webpack = require('webpack');
      config.plugins.push(
        new webpack.ProvidePlugin({
          DOMParser: ['@xmldom/xmldom', 'DOMParser'],
          XMLSerializer: ['@xmldom/xmldom', 'XMLSerializer'],
        })
      );
    }
    return config;
  }
};
/* commit comment: repair paste link type missing */
export default nextConfig;
