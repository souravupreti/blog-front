import Link from 'next/link';
import { getBlogs } from '../lib/api';
import BlogCard from '../components/BlogCard';
import styles from '../styles/Home.module.css';

export const metadata = {
    title: 'Home - Latest Blog Posts',
    description: 'Discover the latest blog posts on web development, SEO, and technology trends.',
};

async function getLatestBlogs() {
    try {
        const data = await getBlogs({ limit: 6 });
        return data.data || [];
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
}

export default async function HomePage() {
    const blogs = await getLatestBlogs();

    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Welcome to <span className="text-gradient">SEO Blog</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Discover insights on web development, SEO strategies, and the latest technology trends.
                            Your journey to digital excellence starts here.
                        </p>
                        <div className={styles.heroActions}>
                            <Link href="/blog" className="btn btn-primary">
                                Explore Blog
                            </Link>
                            <Link href="/about" className="btn btn-secondary">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Posts Section */}
            <section className="section">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Latest Posts</h2>
                        <p className={styles.sectionSubtitle}>
                            Stay updated with our newest articles and insights
                        </p>
                    </div>

                    {blogs.length > 0 ? (
                        <>
                            <div className={styles.blogGrid}>
                                {blogs.map((blog) => (
                                    <BlogCard key={blog._id} blog={blog} />
                                ))}
                            </div>

                            <div className={styles.viewAllContainer}>
                                <Link href="/blog" className="btn btn-primary">
                                    View All Posts
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📝</div>
                            <h3>No posts yet</h3>
                            <p>Check back soon for new content!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className={`section ${styles.features}`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Why Choose Our Blog?</h2>
                        <p className={styles.sectionSubtitle}>
                            Built with modern technologies for optimal performance
                        </p>
                    </div>

                    <div className={styles.featureGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🚀</div>
                            <h3>Lightning Fast</h3>
                            <p>Server-side rendering ensures blazing fast page loads and optimal performance.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🔍</div>
                            <h3>SEO Optimized</h3>
                            <p>Every page is optimized for search engines with proper meta tags and structured data.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>📱</div>
                            <h3>Fully Responsive</h3>
                            <p>Beautiful design that works perfectly on all devices, from mobile to desktop.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>✨</div>
                            <h3>Modern Design</h3>
                            <p>Clean, professional interface with smooth animations and intuitive navigation.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
