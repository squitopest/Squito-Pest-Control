/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  allowedDevOrigins: ["192.168.1.238"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "gsbakbeoaurgzoodqpgt.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
    ],
  },

  async headers() {
    // HSTS: production deploys only (skip Vercel preview to avoid pinning preview URLs).
    const isVercelProduction = process.env.VERCEL_ENV === "production";
    const isLocalProductionBuild =
      process.env.NODE_ENV === "production" && process.env.VERCEL !== "1";
    const hstsHeaders =
      isVercelProduction || isLocalProductionBuild
        ? [
            {
              key: "Strict-Transport-Security",
              value: "max-age=31536000",
            },
          ]
        : [];

    return [
      {
        // Apply security headers to every route
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=(self)",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          ...hstsHeaders,
        ],
      },
    ];
  },
};

module.exports = nextConfig;
