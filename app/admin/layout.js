'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar';
import { useAuth } from '@/context/AuthContext';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace('/');
    }
  }, [user, isAdmin, loading]);

  if (loading || !user || !isAdmin) return null;

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
