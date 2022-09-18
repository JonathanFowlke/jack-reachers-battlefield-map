/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/jack-reachers-battlefield-map",
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
