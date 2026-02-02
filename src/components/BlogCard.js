import Link from 'next/link';
import { format } from 'date-fns';
import styles from '../styles/BlogCard.module.css';

export default function BlogCard({ blog }) {
    return (
        <Link href={`/blog/${blog.slug}`} className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <span className={styles.category}>{blog.category?.name || 'Uncategorized'}</span>
                    <span className={styles.date}>
                        {blog.publishedAt ? format(new Date(blog.publishedAt), 'MMM dd, yyyy') : 'Draft'}
                    </span>
                </div>

                <h3 className={styles.title}>{blog.title}</h3>

                <p className={styles.excerpt}>
                    {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                </p>

                <div className={styles.cardFooter}>
                    <span className={styles.readMore}>
                        Read More
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}
