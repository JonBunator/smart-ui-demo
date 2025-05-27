import type { NextConfig } from "next";

const nextConfig: NextConfig = {

};

module.exports = {
    output: "standalone",
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
