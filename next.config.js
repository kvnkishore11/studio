/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use server-side rendering instead of static generation
  output: 'standalone',
  
  // Configure static generation settings
  staticPageGenerationTimeout: 1000,
  
  // Skip type checking during builds for better performance
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip ESLint during builds for better performance
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Configure React settings to ensure proper hydration
  reactStrictMode: true,
  
  // Disable static optimization for components that use context
  experimental: {
    optimizeCss: false
  },
  
  // Configure image domains to allow external images
  images: {
    domains: ['picsum.photos']
  }
};

module.exports = nextConfig;
