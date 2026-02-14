"use client";

import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <div className={styles.newsletterContent}>
            <h2 className={styles.sectionTitle}>Join the Conversation</h2>
            <p>Get the latest stories delivered straight to your inbox.</p>

            {status === 'success' ? (
                <div className={styles.successMessage}>
                    <p>✨ Thanks for subscribing! Welcome to the community.</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className={styles.btnLink}
                    >
                        Subscribe another email
                    </button>
                </div>
            ) : (
                <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className={styles.newsletterInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === 'loading'}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
            )}
        </div>
    );
}
