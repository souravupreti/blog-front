export default function robots() {
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pencilpost.vercel.app';
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/admin/',
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
