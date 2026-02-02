import Link from 'next/link';
import { getBlogs, getCategories } from '../../lib/api';
import BlogCard from '../../components/BlogCard';
import styles from '../../styles/BlogList.module.css';

export const metadata = {
    title: 'Blog - All Posts',
    description: 'Browse all blog posts on web development, SEO, and technology.',
};

async function getBlogData(searchParams) {
    try {
        const page = searchParams?.page || 1;
        const category = searchParams?.category || '';

        const [blogsData, categoriesData] = await Promise.all([
            getBlogs({ page, limit: 12, category }),
            getCategories(),
        ]);

        return {
            blogs: blogsData.data || [],
            categories: categoriesData.data || [],
            totalPages: blogsData.totalPages || 1,
            currentPage: blogsData.currentPage || 1,
        };
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return {
            blogs: [],
            categories: [],
            totalPages: 1,
            currentPage: 1,
        };
    }
}

export default async function BlogListPage({ searchParams }) {
    const { blogs, categories, totalPages, currentPage } = await getBlogData(searchParams);
    const selectedCategory = searchParams?.category || '';

    return (
        <div className={styles.blogList}>
            <section className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Blog</h1>
                    <p className={styles.subtitle}>
                        Explore our collection of articles on web development, SEO strategies, and technology insights
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Category Filter */}
                    {categories.length > 0 && (
                        <div className={styles.filterSection}>
                            <h3 className={styles.filterTitle}>Filter by Category</h3>
                            <div className={styles.categoryFilter}>
                                <Link
                                    href="/blog"
                                    className={!selectedCategory ? styles.categoryActive : styles.category}
                                >
                                    All Posts
                                </Link>
                                {categories.map((cat) => (
                                    <Link
                                        key={cat._id}
                                        href={`/blog?category=${cat.slug}`}
                                        className={selectedCategory === cat.slug ? styles.categoryActive : styles.category}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Blog Grid */}
                    {blogs.length > 0 ? (
                        <>
                            <div className={styles.blogGrid}>
                                {blogs.map((blog) => (
                                    <BlogCard key={blog._id} blog={blog} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className={styles.pagination}>
                                    {currentPage > 1 && (
                                        <Link
                                            href={`/blog?page=${currentPage - 1}${selectedCategory ? `&category=${selectedCategory}` : ''}`}
                                            className={styles.paginationBtn}
                                        >
                                            ← Previous
                                        </Link>
                                    )}

                                    <div className={styles.pageNumbers}>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <Link
                                                key={page}
                                                href={`/blog?page=${page}${selectedCategory ? `&category=${selectedCategory}` : ''}`}
                                                className={page === currentPage ? styles.pageNumberActive : styles.pageNumber}
                                            >
                                                {page}
                                            </Link>
                                        ))}
                                    </div>

                                    {currentPage < totalPages && (
                                        <Link
                                            href={`/blog?page=${currentPage + 1}${selectedCategory ? `&category=${selectedCategory}` : ''}`}
                                            className={styles.paginationBtn}
                                        >
                                            Next →
                                        </Link>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📝</div>
                            <h3>No posts found</h3>
                            <p>
                                {selectedCategory
                                    ? 'No posts in this category yet. Try another category!'
                                    : 'No blog posts available at the moment. Check back soon!'}
                            </p>
                            {selectedCategory && (
                                <Link href="/blog" className="btn btn-primary mt-md">
                                    View All Posts
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
