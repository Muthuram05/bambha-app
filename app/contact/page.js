'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './contact.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', form);
    setSent(true);
    setForm({ firstName: '', email: '', phone: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Contact</h1>

        <div className={styles.container}>
          {/* Left: Form */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Questions? Send us an email</h2>
            {sent && <p className={styles.success}>Message sent! We'll get back to you soon.</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />
              <textarea
                className={styles.textarea}
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
              <div className={styles.btnRow}>
                <button type="submit" className={styles.sendBtn}>Send</button>
              </div>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className={styles.infoSection}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <p className={styles.name}>Murugan s</p>

            <div className={styles.infoItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={styles.icon}>
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p>Sun mini makers 463, cheranmahadevi Road, pottai,<br />Tirunelveli - 627004</p>
            </div>

            <div className={styles.infoItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={styles.icon}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <p>8807035595</p>
            </div>

            <div className={styles.infoItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={styles.icon}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <p>bambhanaturals@gmail.com</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
