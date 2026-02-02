'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../../lib/api';
import styles from '../../../styles/AdminLogin.module.css';

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await login(formData);

            if (response.success) {
                // Store token
                localStorage.setItem('adminToken', response.token);
                localStorage.setItem('adminUser', JSON.stringify(response.user));

                // Redirect to dashboard
                router.push('/admin/dashboard');
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.loginHeader}>
                        <div className={styles.logo}>
                            <span className={styles.logoIcon}>🔐</span>
                            <h1>Admin Login</h1>
                        </div>
                        <p className={styles.subtitle}>Sign in to manage your blog</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        {error && (
                            <div className={styles.error}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M10 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M10 14H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-input"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                autoFocus
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-input"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className={styles.spinner}></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className={styles.loginFooter}>
                        <p>
                            <a href="/">← Back to Home</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
