/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/reachers-battlefield-map",
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
