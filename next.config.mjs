/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true';
const basePath = isGithubPages ? '/AURELIA' : '';

const nextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'lucide-react', '@designcodeio/threeui'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
