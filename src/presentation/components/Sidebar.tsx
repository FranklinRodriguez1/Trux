'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  MapPin,
  User,
  LogOut,
} from 'lucide-react';
import { clearFrontendSession } from '@/presentation/lib/session';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/shipments', label: 'Cargamentos', icon: Package },
    { href: '/tracking', label: 'Monitoreo', icon: MapPin },
    { href: '/profile', label: 'Perfil', icon: User },
  ];

  const handleLogout = () => {
    clearFrontendSession();
    router.push('/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoText}>
          <span className={styles.logoIcon}>📦</span>
          <span className={styles.logoName}>TRUX</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={20} />
          <span>Salir</span>
        </button>
      </div>
    </aside>
  );
}
