/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
    basePath,
    reactStrictMode: false,
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
};

module.exports = nextConfig;
