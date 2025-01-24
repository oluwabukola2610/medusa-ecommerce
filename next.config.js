/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
      },
    ],
  }
};

module.exports = nextConfig;