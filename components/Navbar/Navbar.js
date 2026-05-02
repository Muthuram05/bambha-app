'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      // Fetch products once when search opens
      if (products.length === 0) {
        fetch('/api/products')
          .then(r => r.json())
          .then(({ data }) => setProducts(data || []));
      }
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSearchOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(p => {
      // Match product name
      if (p.name?.toLowerCase().includes(q)) return true;
      // Match weight options (handles both string and object formats)
      const weights = p.weights || [];
      return weights.some(w => {
        const label = typeof w === 'object' ? w.weight : ((() => { try { return JSON.parse(w).weight; } catch { return w; } })());
        return label?.toLowerCase().includes(q);
      });
    });
  }, [query, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      router.push(`/products/${results[0].id}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <img src="/images/logo.png" alt="BamBha" className={styles.logoImg} />
          </Link>

          <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
            <li><Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>Home</Link></li>
            <li><Link href="/products" className={`${styles.navLink} ${pathname.startsWith('/products') ? styles.active : ''}`}>Product</Link></li>
            <li><Link href="/contact" className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}>Contact us</Link></li>
            {isAdmin && <li><Link href="/admin" className={`${styles.navLink} ${pathname.startsWith('/admin') ? styles.active : ''}`}>Admin Panel</Link></li>}
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
            <form onSubmit={handleSubmit}>
              <div className={styles.searchInputRow}>
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search by product name or weight (e.g. 250)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className={styles.searchSubmit} aria-label="Submit search">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </button>
              </div>
            </form>

            <div className={styles.searchDropdown}>
              {query.trim() === '' ? (
                <p className={styles.noRecent}>Start typing to search products…</p>
              ) : results.length === 0 ? (
                <p className={styles.noRecent}>No products found for "{query}"</p>
              ) : (
                <ul className={styles.resultList}>
                  {results.map(p => {
                    const weights = (p.weights || []).map(w => {
                      if (typeof w === 'object') return w.weight;
                      try { return JSON.parse(w).weight; } catch { return w; }
                    }).filter(Boolean);
                    return (
                      <li key={p.id}>
                        <Link
                          href={`/products/${p.id}`}
                          className={styles.resultItem}
                          onClick={() => setSearchOpen(false)}
                        >
                          {p.main_image && (
                            <img src={p.main_image} alt={p.name} className={styles.resultImg} />
                          )}
                          <div className={styles.resultInfo}>
                            <p className={styles.resultName}>{p.name}</p>
                            {weights.length > 0 && (
                              <p className={styles.resultWeights}>{weights.join(' · ')}</p>
                            )}
                          </div>
                          <p className={styles.resultPrice}>Rs.{p.price}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
