/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // Xuất thành static site
  basePath: "/woman-day", // Đường dẫn tương ứng với GitHub Pages repo
  images: {
    unoptimized: true, // Hỗ trợ ảnh khi xuất static site
    domains: [
      "images.unsplash.com",
      "www.transparenttextures.com",
      "i.pinimg.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.transparenttextures.com",
        pathname: "/patterns/**",
      },
    ],
  },
};

module.exports = nextConfig;
