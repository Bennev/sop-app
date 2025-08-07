import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: "/_offline",
  },
});

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {},
};

module.exports = () => {
  const plugins = [withPWA];
  return plugins.reduce((acc, next) => next(acc), nextConfig);
};
