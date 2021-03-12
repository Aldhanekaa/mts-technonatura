const withPWA = require("next-pwa");
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

const NODE_ENV = process.env.NODE_ENV;
const dualENV = {
  production: {
    PUBLIC_URL: "https://mts-technonatura.vercel.app"
  },
  development: {
    PUBLIC_URL: "http://localhost:3000"
  }
};

const env = { ...dualENV[NODE_ENV], isProduction: NODE_ENV === "production" };

// next.js configuration
const nextConfig = {
  pageExtensions: [
    "page.js",
    "page.tsx",
    "page.jsx",
    "cPage.tsx",
    "api.js",
    "api.ts",
    "_app.js",
    "_document.js"
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/sitemap-robots-generator")(env.PUBLIC_URL);
    }
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    return config;
  },
  env
};

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        inlineImageLimit: 8192,
        imagesFolder: "images",
        imagesName: "[name]-[hash].[ext]",
        handleImages: ["jpeg", "png", "webp"],
        removeOriginalExtension: false,
        optimizeImages: true,
        optimizeImagesInDev: false,
        mozjpeg: {
          quality: 80
        },
        optipng: {
          optimizationLevel: 3
        },
        pngquant: false,
        webp: {
          preset: "default",
          quality: 75
        },
        responsive: {
          adapter: require("responsive-loader/sharp")
        }
      }
    ],
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === "development",
          register: true,
          scope: "/",
          sw: "service-worker.js",
          dest: "public"
        }
      }
    ],
    [
      withCss,
      [
        withPurgeCss({
          purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer,
          purgeCssPaths: ["pages/**/*", "components/**/*"],
          purgeCss: {
            whitelist: () => whitelist
          }
        })
      ]
    ]
  ],
  nextConfig
);
