'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminSidebar.module.css';

const navItems = [
  { href: '/admin/products/add', label: 'Add Products', icon: '➕' },
  { href: '/admin/products', label: 'List Products', icon: '📋' },
  { href: '/admin/orders', label: 'Orders', icon: '📦' },
  { href: '/admin/banner', label: 'Banner Update', icon: '🖼️' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <nav>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin/products/add' && pathname.startsWith(item.href) && item.href !== '/admin/products/add');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
