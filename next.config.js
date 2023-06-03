/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;

//https://github.com/vercel/next.js/issues/44273
//https://github.com/kkomelin/isomorphic-dompurify/issues/54
