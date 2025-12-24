/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "realestate.mew-club.io"], // backend domain যোগ করলাম
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://realestate.mew-club.io/api/:path*',
      },
    ]
  },
};

export default nextConfig;
