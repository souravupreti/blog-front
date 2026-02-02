import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogBySlug } from '../../../lib/api';
import styles from '../../../styles/BlogPost.module.css';

export async function generateMetadata({ params }) {
    try {
        const { slug } = params;
        const response = await getBlogBySlug(slug);
        const blog = response.data;

        if (!blog) {
            return {
                title: 'Blog Not Found',
            };
        }

        return {
            title: blog.metaTitle || blog.title,
            description: blog.metaDescription || blog.excerpt,
            keywords: blog.keywords,
            authors: [{ name: blog.author }],
            openGraph: {
                title: blog.metaTitle || blog.title,
                description: blog.metaDescription || blog.excerpt,
                type: 'article',
                publishedTime: blog.publishedAt,
                authors: [blog.author],
                images: [
                    {
                        url: blog.ogImage || '/images/og-default.jpg',
                        width: 1200,
                        height: 630,
                        alt: blog.title,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: blog.metaTitle || blog.title,
                description: blog.metaDescription || blog.excerpt,
                images: [blog.ogImage || '/images/og-default.jpg'],
            },
            alternates: {
                canonical: blog.canonicalUrl || `/blog/${blog.slug}`,
            },
        };
    } catch (error) {
        return {
            title: 'Blog Not Found',
        };
    }
}

async function getBlog(slug) {
    try {
        const response = await getBlogBySlug(slug);
        return response.data;
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
}

export default async function BlogPostPage({ params }) {
    const { slug } = params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    return (
        <article className={styles.blogPost}>
            {/* Header */}
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.headerContent}>
                        <Link href={`/category/${blog.category.slug}`} className={styles.category}>
                            {blog.category.name}
                        </Link>

                        <h1 className={styles.title}>{blog.title}</h1>

                        <div className={styles.meta}>
                            <div className={styles.metaItem}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <span>{format(new Date(blog.publishedAt), 'MMMM dd, yyyy')}</span>
                            </div>

                            <div className={styles.metaItem}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 11C11.6569 11 13 9.65685 13 8C13 6.34315 11.6569 5 10 5C8.34315 5 7 6.34315 7 8C7 9.65685 8.34315 11 10 11Z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M3 18C3 15.2386 6.13401 13 10 13C13.866 13 17 15.2386 17 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <span>{blog.author}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className={styles.content}>
                <div className="container">
                    <div className={styles.contentWrapper}>
                        <div className="markdown-content">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {blog.content}
                            </ReactMarkdown>
                        </div>

                        {/* Tags */}
                        {blog.keywords && blog.keywords.length > 0 && (
                            <div className={styles.tags}>
                                <h3 className={styles.tagsTitle}>Tags</h3>
                                <div className={styles.tagsList}>
                                    {blog.keywords.map((keyword, index) => (
                                        <span key={index} className={styles.tag}>
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className={styles.navigation}>
                            <Link href="/blog" className="btn btn-secondary">
                                ← Back to Blog
                            </Link>
                            <Link href={`/category/${blog.category.slug}`} className="btn btn-ghost">
                                More in {blog.category.name}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
