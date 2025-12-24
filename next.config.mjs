/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  source: "/(.*)",
  headers: [
    {
      key: "Content-Security-Policy",
      value: "frame-ancestors *;",
    },
    {
      key: "X-Frame-Options",
      value: "ALLOWALL",
    },
  ],
}

export default nextConfig
