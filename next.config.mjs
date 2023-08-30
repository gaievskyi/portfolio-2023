// @ts-check

import "./env/client.mjs"
import "./env/server.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
    typedRoutes: true,
    serverActionsBodySizeLimit: 1000,
  },
}

export default nextConfig
