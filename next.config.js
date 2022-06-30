/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const withTM = require("next-transpile-modules")(["oak-js-library"]);
module.exports = withTM({
  nextConfig,
});
