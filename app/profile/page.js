'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useAuth } from '@/context/AuthContext';
import styles from './profile.module.css';

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  if (loading || !user) return null;

  const firstName = user.user_metadata?.first_name || '';
  const lastName = user.user_metadata?.last_name || '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'User';
  const initials = [firstName[0], lastName[0]].filter(Boolean).join('').toUpperCase() || user.email[0].toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.card}>
          {/* Avatar */}
          <div className={styles.avatar}>{initials}</div>
          <h1 className={styles.name}>{fullName}</h1>
          <p className={styles.email}>{user.email}</p>

          <div className={styles.divider} />

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{user.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Account created</span>
              <span className={styles.infoValue}>
                {new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email confirmed</span>
              <span className={`${styles.infoValue} ${user.email_confirmed_at ? styles.confirmed : styles.pending}`}>
                {user.email_confirmed_at ? 'Verified' : 'Pending verification'}
              </span>
            </div>
          </div>

          <button className={styles.signOutBtn} onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
