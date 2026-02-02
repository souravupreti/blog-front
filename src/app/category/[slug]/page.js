import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '../../../lib/api';
import BlogCard from '../../../components/BlogCard';
import styles from '../../../styles/Category.module.css';

export async function generateMetadata({ params }) {
    try {
        const { slug } = params;
        const response = await getCategoryBySlug(slug);
        const category = response.data.category;

        if (!category) {
            return {
                title: 'Category Not Found',
            };
        }

        return {
            title: `${category.name} - Blog Category`,
            description: category.description || `Browse all blog posts in the ${category.name} category`,
        };
    } catch (error) {
        return {
            title: 'Category Not Found',
        };
    }
}

async function getCategoryData(slug, searchParams) {
    try {
        const page = searchParams?.page || 1;
        const response = await getCategoryBySlug(slug, { page, limit: 12 });
        return response.data;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}

export default async function CategoryPage({ params, searchParams }) {
    const { slug } = params;
    const data = await getCategoryData(slug, searchParams);

    if (!data || !data.category) {
        notFound();
    }

    const { category, blogs, totalPages, currentPage } = data;

    return (
        <div className={styles.categoryPage}>
            <section className={styles.header}>
                <div className="container">
                    <div className={styles.headerContent}>
                        <h1 className={styles.title}>{category.name}</h1>
                        {category.description && (
                            <p className={styles.description}>{category.description}</p>
                        )}
                        <div className={styles.breadcrumb}>
                            <Link href="/">Home</Link>
                            <span>/</span>
                            <Link href="/blog">Blog</Link>
                            <span>/</span>
                            <span>{category.name}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {blogs.length > 0 ? (
                        <>
                            <div className={styles.blogGrid}>
                                {blogs.map((blog) => (
                                    <BlogCard key={blog._id} blog={blog} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className={styles.pagination}>
                                    {currentPage > 1 && (
                                        <Link
                                            href={`/category/${slug}?page=${currentPage - 1}`}
                                            className={styles.paginationBtn}
                                        >
                                            ← Previous
                                        </Link>
                                    )}

                                    <div className={styles.pageNumbers}>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <Link
                                                key={page}
                                                href={`/category/${slug}?page=${page}`}
                                                className={page === currentPage ? styles.pageNumberActive : styles.pageNumber}
                                            >
                                                {page}
                                            </Link>
                                        ))}
                                    </div>

                                    {currentPage < totalPages && (
                                        <Link
                                            href={`/category/${slug}?page=${currentPage + 1}`}
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
                            <h3>No posts in this category yet</h3>
                            <p>Check back soon for new content!</p>
                            <Link href="/blog" className="btn btn-primary mt-md">
                                View All Posts
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
