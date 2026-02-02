'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import {
    getAllBlogsAdmin,
    getCategories,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    createCategory,
    verifyToken,
} from '../../../lib/api';
import MarkdownEditor from '../../../components/MarkdownEditor';
import styles from '../../../styles/AdminDashboard.module.css';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showEditor, setShowEditor] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        metaTitle: '',
        metaDescription: '',
        keywords: '',
        canonicalUrl: '',
        ogImage: '',
        category: '',
        status: 'draft',
    });

    const [categoryForm, setCategoryForm] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                router.push('/admin/login');
                return;
            }

            await verifyToken();
            await loadData();
        } catch (error) {
            console.error('Auth error:', error);
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            router.push('/admin/login');
        }
    };

    const loadData = async () => {
        try {
            const [blogsRes, categoriesRes] = await Promise.all([
                getAllBlogsAdmin(),
                getCategories(),
            ]);

            setBlogs(blogsRes.data || []);
            setCategories(categoriesRes.data || []);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
    };

    const handleNewBlog = () => {
        setEditingBlog(null);
        setFormData({
            title: '',
            content: '',
            excerpt: '',
            metaTitle: '',
            metaDescription: '',
            keywords: '',
            canonicalUrl: '',
            ogImage: '',
            category: categories[0]?._id || '',
            status: 'draft',
        });
        setShowEditor(true);
    };

    const handleEditBlog = async (blog) => {
        try {
            const response = await getBlogById(blog._id);
            const blogData = response.data;

            setEditingBlog(blogData);
            setFormData({
                title: blogData.title,
                content: blogData.content,
                excerpt: blogData.excerpt || '',
                metaTitle: blogData.metaTitle || '',
                metaDescription: blogData.metaDescription || '',
                keywords: blogData.keywords?.join(', ') || '',
                canonicalUrl: blogData.canonicalUrl || '',
                ogImage: blogData.ogImage || '',
                category: blogData.category._id,
                status: blogData.status,
            });
            setShowEditor(true);
        } catch (error) {
            alert('Error loading blog: ' + error.message);
        }
    };

    const handleDeleteBlog = async (blogId) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        try {
            await deleteBlog(blogId);
            await loadData();
            alert('Blog deleted successfully!');
        } catch (error) {
            alert('Error deleting blog: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const blogData = {
                ...formData,
                keywords: formData.keywords.split(',').map((k) => k.trim()).filter(Boolean),
            };

            if (editingBlog) {
                await updateBlog(editingBlog._id, blogData);
                alert('Blog updated successfully!');
            } else {
                await createBlog(blogData);
                alert('Blog created successfully!');
            }

            setShowEditor(false);
            await loadData();
        } catch (error) {
            alert('Error saving blog: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();

        try {
            await createCategory(categoryForm);
            setCategoryForm({ name: '', description: '' });
            setShowCategoryForm(false);
            await loadData();
            alert('Category created successfully!');
        } catch (error) {
            alert('Error creating category: ' + error.message);
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>📝</span>
                        <h1>Admin Dashboard</h1>
                    </div>
                    <div className={styles.headerActions}>
                        <Link href="/" className="btn btn-ghost">
                            View Site
                        </Link>
                        <button onClick={handleLogout} className="btn btn-secondary">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className={styles.main}>
                <div className={styles.container}>
                    {!showEditor ? (
                        <>
                            {/* Stats */}
                            <div className={styles.stats}>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>📄</div>
                                    <div className={styles.statInfo}>
                                        <h3>{blogs.length}</h3>
                                        <p>Total Blogs</p>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>✅</div>
                                    <div className={styles.statInfo}>
                                        <h3>{blogs.filter((b) => b.status === 'published').length}</h3>
                                        <p>Published</p>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>📝</div>
                                    <div className={styles.statInfo}>
                                        <h3>{blogs.filter((b) => b.status === 'draft').length}</h3>
                                        <p>Drafts</p>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>🏷️</div>
                                    <div className={styles.statInfo}>
                                        <h3>{categories.length}</h3>
                                        <p>Categories</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className={styles.actions}>
                                <button onClick={handleNewBlog} className="btn btn-primary">
                                    + New Blog Post
                                </button>
                                <button
                                    onClick={() => setShowCategoryForm(!showCategoryForm)}
                                    className="btn btn-secondary"
                                >
                                    + New Category
                                </button>
                            </div>

                            {/* Category Form */}
                            {showCategoryForm && (
                                <div className={styles.categoryForm}>
                                    <h3>Create New Category</h3>
                                    <form onSubmit={handleCreateCategory}>
                                        <div className="form-group">
                                            <label className="form-label">Category Name</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={categoryForm.name}
                                                onChange={(e) =>
                                                    setCategoryForm({ ...categoryForm, name: e.target.value })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-textarea"
                                                value={categoryForm.description}
                                                onChange={(e) =>
                                                    setCategoryForm({ ...categoryForm, description: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className={styles.formActions}>
                                            <button type="submit" className="btn btn-primary">
                                                Create Category
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowCategoryForm(false)}
                                                className="btn btn-ghost"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Blogs List */}
                            <div className={styles.blogsList}>
                                <h2>All Blog Posts</h2>
                                {blogs.length > 0 ? (
                                    <div className={styles.table}>
                                        {blogs.map((blog) => (
                                            <div key={blog._id} className={styles.blogItem}>
                                                <div className={styles.blogInfo}>
                                                    <h3>{blog.title}</h3>
                                                    <div className={styles.blogMeta}>
                                                        <span className={`badge ${blog.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                                                            {blog.status}
                                                        </span>
                                                        <span>{blog.category?.name}</span>
                                                        <span>
                                                            {blog.updatedAt
                                                                ? format(new Date(blog.updatedAt), 'MMM dd, yyyy')
                                                                : 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={styles.blogActions}>
                                                    {blog.status === 'published' && (
                                                        <Link
                                                            href={`/blog/${blog.slug}`}
                                                            target="_blank"
                                                            className="btn btn-ghost"
                                                        >
                                                            View
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={() => handleEditBlog(blog)}
                                                        className="btn btn-secondary"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBlog(blog._id)}
                                                        className="btn btn-danger"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles.emptyState}>
                                        <p>No blog posts yet. Create your first one!</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        /* Editor Form */
                        <div className={styles.editor}>
                            <div className={styles.editorHeader}>
                                <h2>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
                                <button onClick={() => setShowEditor(false)} className="btn btn-ghost">
                                    ← Back to List
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className={styles.editorForm}>
                                <div className="form-group">
                                    <label className="form-label">Title *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category *</label>
                                    <select
                                        className="form-select"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Content *</label>
                                    <MarkdownEditor
                                        value={formData.content}
                                        onChange={(value) => setFormData({ ...formData, content: value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Excerpt</label>
                                    <textarea
                                        className="form-textarea"
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        placeholder="Brief summary of the blog post..."
                                    />
                                </div>

                                {/* SEO Fields */}
                                <div className={styles.seoSection}>
                                    <h3>SEO Settings</h3>

                                    <div className="form-group">
                                        <label className="form-label">Meta Title</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.metaTitle}
                                            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                            placeholder="Leave empty to use blog title"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Meta Description</label>
                                        <textarea
                                            className="form-textarea"
                                            value={formData.metaDescription}
                                            onChange={(e) =>
                                                setFormData({ ...formData, metaDescription: e.target.value })
                                            }
                                            placeholder="Leave empty to use excerpt"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Keywords (comma-separated)</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.keywords}
                                            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                            placeholder="seo, blog, web development"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Canonical URL</label>
                                        <input
                                            type="url"
                                            className="form-input"
                                            value={formData.canonicalUrl}
                                            onChange={(e) =>
                                                setFormData({ ...formData, canonicalUrl: e.target.value })
                                            }
                                            placeholder="https://example.com/blog/post-slug"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">OG Image URL</label>
                                        <input
                                            type="url"
                                            className="form-input"
                                            value={formData.ogImage}
                                            onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                                            placeholder="https://example.com/images/og-image.jpg"
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>

                                <div className={styles.formActions}>
                                    <button type="submit" className="btn btn-primary">
                                        {editingBlog ? 'Update Blog' : 'Create Blog'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditor(false)}
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
