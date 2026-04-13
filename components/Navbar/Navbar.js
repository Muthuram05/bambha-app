'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSearchOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <img src="/images/logo.png" alt="BamBha" className={styles.logoImg} />
          </Link>

          <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
            <li><Link href="/" className={styles.navLink}>Home</Link></li>
            <li><Link href="/products" className={styles.navLink}>Product</Link></li>
            <li><Link href="/contact" className={styles.navLink}>Contact us</Link></li>
            <li><Link href="/admin" className={styles.navLink}>Admin Panel</Link></li>
          </ul>

          <div className={styles.icons}>
            <button className={styles.iconBtn} aria-label="Search" onClick={() => setSearchOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            <Link href={user ? '/profile' : '/login'} className={styles.iconBtn} aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            <Link href="/cart" className={styles.cartBtn} aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
            </Link>
            <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className={styles.overlay} onClick={() => setSearchOpen(false)}>
          <div className={styles.searchBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSearchOpen(false)}>
              <span>Close</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className={styles.searchInputRow}>
              <input
                ref={inputRef}
                type="text"
                className={styles.searchInput}
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className={styles.searchSubmit} aria-label="Submit search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </div>
            <div className={styles.searchDropdown}>
              <p className={styles.noRecent}>No recent searches</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
