import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar';
import styles from './admin.module.css';

export const metadata = {
  title: 'Admin Panel - BamBha',
};

export default function AdminLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoB}>B</span>am<span className={styles.logoB}>B</span>ha
        </Link>
        <Link href="/" className={styles.logoutBtn}>Logout</Link>
      </header>
      <div className={styles.body}>
        <AdminSidebar />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
