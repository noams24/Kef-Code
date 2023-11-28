/** @type {import('next').NextConfig} */
const config = require("./src/config/config.json");

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      type: "asset/resource",
      parser: { dataUrlCondition: { maxSize: 100000 } },
    })
    return config
  },
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  images: {
    domains: ['uploadthing.com', 'lh3.googleusercontent.com', "i.ibb.co", "utfs.io"],
  },
};

module.exports = nextConfig;
