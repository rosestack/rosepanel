/**
 * @type {import("next").NextConfig}
 **/
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["src"],
  },
  transpilePackages: [
    "@rosepanel/api",
  ],
  reactStrictMode: false,
};

export default nextConfig;