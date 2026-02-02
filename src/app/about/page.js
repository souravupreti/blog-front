import styles from '../../styles/About.module.css';

export const metadata = {
    title: 'About Us',
    description: 'Learn more about our SEO blog platform and our mission to deliver quality content.',
};

export default function AboutPage() {
    return (
        <div className={styles.about}>
            <section className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>About SEO Blog</h1>
                    <p className={styles.subtitle}>
                        Building the future of content publishing with modern web technologies
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.content}>
                        <div className={styles.section}>
                            <h2>Our Mission</h2>
                            <p>
                                We're dedicated to creating a professional blogging platform that combines cutting-edge
                                web technologies with SEO best practices. Our goal is to help content creators reach
                                their audience effectively while maintaining exceptional performance and user experience.
                            </p>
                        </div>

                        <div className={styles.section}>
                            <h2>Technology Stack</h2>
                            <p>
                                Built with modern, production-ready technologies to ensure optimal performance,
                                scalability, and search engine optimization:
                            </p>
                            <ul className={styles.techList}>
                                <li>
                                    <strong>Next.js 14</strong> - React framework with server-side rendering for optimal SEO
                                </li>
                                <li>
                                    <strong>Node.js & Express</strong> - Robust backend API with RESTful architecture
                                </li>
                                <li>
                                    <strong>MongoDB</strong> - Flexible NoSQL database for content management
                                </li>
                                <li>
                                    <strong>Markdown</strong> - Simple yet powerful content editing experience
                                </li>
                            </ul>
                        </div>

                        <div className={styles.section}>
                            <h2>SEO Features</h2>
                            <p>
                                Every aspect of this platform is optimized for search engines:
                            </p>
                            <ul className={styles.featureList}>
                                <li>✅ Server-side rendering for all pages</li>
                                <li>✅ Dynamic meta tags and Open Graph support</li>
                                <li>✅ Automatic sitemap.xml generation</li>
                                <li>✅ Optimized robots.txt configuration</li>
                                <li>✅ Clean, semantic HTML structure</li>
                                <li>✅ Fast load times and Core Web Vitals optimization</li>
                                <li>✅ Mobile-responsive design</li>
                                <li>✅ Structured data markup</li>
                            </ul>
                        </div>

                        <div className={styles.section}>
                            <h2>Performance First</h2>
                            <p>
                                We believe that performance is a feature. Our platform is built with speed in mind,
                                utilizing modern optimization techniques including code splitting, lazy loading,
                                and efficient caching strategies to deliver content to users as quickly as possible.
                            </p>
                        </div>

                        <div className={styles.section}>
                            <h2>Get in Touch</h2>
                            <p>
                                Have questions or feedback? We'd love to hear from you. Reach out through our
                                social media channels or check out the source code to see how everything works.
                            </p>
                            <div className={styles.contactLinks}>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    View on GitHub
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                    Follow on Twitter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
