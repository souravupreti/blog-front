import '../styles/globals.css';
import Layout from '../components/Layout';

export const metadata = {
    title: {
        default: 'SEO Blog - Professional Blog Platform',
        template: '%s | SEO Blog',
    },
    description: 'A professional blog platform optimized for SEO, built with Next.js and modern web technologies.',
    keywords: ['blog', 'SEO', 'Next.js', 'web development', 'content management'],
    authors: [{ name: 'SEO Blog' }],
    creator: 'SEO Blog',
    publisher: 'SEO Blog',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'SEO Blog',
        title: 'SEO Blog - Professional Blog Platform',
        description: 'A professional blog platform optimized for SEO',
        images: [
            {
                url: '/images/og-default.jpg',
                width: 1200,
                height: 630,
                alt: 'SEO Blog',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SEO Blog - Professional Blog Platform',
        description: 'A professional blog platform optimized for SEO',
        images: ['/images/og-default.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
