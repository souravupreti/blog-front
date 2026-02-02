/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'images.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/api/sitemap.xml`,
            },
            {
                source: '/robots.txt',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/api/robots.txt`,
            },
        ];
    },
};

module.exports = nextConfig;
