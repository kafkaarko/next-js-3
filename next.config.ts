import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "uwxjobqihddgifja.public.blob.vercel-storage.com",
      }
    ]
  }
  
};



export default nextConfig;
