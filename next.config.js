// File: /next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  poweredByHeader: false,
  
  // Performance optimizations
  compress: true,
  optimizeFonts: true,
  
  // Image optimizations
  images: {
    domains: ['api.placeholder.com', 'placehold.co'],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL || 'localhost:3000',
    NEXT_PUBLIC_SHOW_DEV_NOTICE: process.env.NEXT_PUBLIC_SHOW_DEV_NOTICE || 'false',
    NEXT_PUBLIC_DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    NEXT_PUBLIC_DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
  },
  
  // Minimal experimental features to prevent hanging
  experimental: {
    optimizeCss: false, // Disable to prevent CSS processing issues
    scrollRestoration: true
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {
      properties: ['^data-testid$']
    } : false,
    styledComponents: false
  },

  // Headers for caching and security
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        }
      ]
    },
    {
      source: '/images/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    },
    {
      source: '/_next/static/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    },
    {
      source: '/favicon.ico',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400'
        }
      ]
    }
  ],

  webpack: (config, { dev, isServer, webpack, nextRuntime }) => {
    // Basic fallbacks for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false
      };
    }

    // Markdown loader
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    // Simple performance hints
    config.performance = {
      hints: false, // Disable to prevent hanging on size calculations
    };

    return config;
  },
};

module.exports = nextConfig;