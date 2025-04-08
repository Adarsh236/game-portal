import { IMAGES_PATTERN } from '@game-portal/constants/brands/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: IMAGES_PATTERN,
  },
};

export default nextConfig;
