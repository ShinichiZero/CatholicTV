


const isProd = process.env.NODE_ENV === "production";
const repoName = "CatholicTV";
const basePath = isProd ? `/${repoName}` : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {},
};

export default nextConfig;
