/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  experimental: {
    externalDir: true,
    runtime: 'nodejs',
  },
  async rewrites() {
    return [
      {
        source: `${'/server'}/:ctrl*`,
        destination: `${process.env.BACKEND_URL}/:ctrl*`,
      },
    ]
  },
}

module.exports = nextConfig
