import type { NextConfig } from "next";

const nextConfig: NextConfig = {

};

module.exports = {
    async redirects() {
        return [
            {
                source: '/survey',
                destination: '/survey/bookings',
                permanent: true,
            },
        ]
    },
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
