import { NextResponse } from 'next/server';

export async function GET() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://blog-production-e578.up.railway.app';
    try {
        const response = await fetch(`${API_URL}/api/sitemap.xml`, {
            headers: {
                'Content-Type': 'application/xml',
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            return new NextResponse('Error fetching sitemap', { status: response.status });
        }

        const sitemap = await response.text();

        return new NextResponse(sitemap, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
            },
        });
    } catch (error) {
        console.error('Sitemap fetch error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
