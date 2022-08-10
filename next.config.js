/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    next_apikey: process.env.API_KEY,
    next_hosturl: process.env.HOST_URL,
  },
  env: {
    next_apikey: process.env.API_KEY,
    next_hosturl: process.env.HOST_URL,
  },
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"],
  },
  swcMinify: true,
};

module.exports = nextConfig;
