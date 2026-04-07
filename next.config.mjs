


// 'unsafe-inline' is required by Next.js for injecting critical CSS and
// inline event handlers during SSR. 'unsafe-eval' is required in development
// for hot module replacement; in production Next.js still needs it for some
// module evaluation. These are standard Next.js requirements.
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob: https://live.tv2000.it https://streaming.telepace.it https://streaming.telepadrepio.it https://smvlive.vaticannews.va https://ewtn-lh.akamaihd.net https://streaming.trbc.it https://edge.api.brightcove.com https://shalomworld.cdnvideo.ru https://shoutcast.radiomaria.it",
      "connect-src 'self' https://live.tv2000.it https://streaming.telepace.it https://streaming.telepadrepio.it https://smvlive.vaticannews.va https://ewtn-lh.akamaihd.net https://streaming.trbc.it https://edge.api.brightcove.com https://shalomworld.cdnvideo.ru https://shoutcast.radiomaria.it",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  experimental: {},
};

export default nextConfig;
