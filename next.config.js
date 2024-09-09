/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nsdr.b-cdn.net', 'images.unsplash.com', 'plus.unsplash.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig