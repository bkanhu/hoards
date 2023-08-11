/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'assets.acme.com',
      'res.cloudinary.com',
      'tailwindui.com',
      'fakestoreapi.com',
      'avatar.vercel.sh',
      'i.dummyjson.com',
      'images.unsplash.com',
    ],
  },
};

module.exports = nextConfig;
