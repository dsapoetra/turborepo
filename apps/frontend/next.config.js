/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Enable the experimental app directory feature
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
