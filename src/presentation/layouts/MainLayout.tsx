'use client';

import { Sidebar } from '@/presentation/components/Sidebar';
import { Navbar } from '@/presentation/components/Navbar';
import styles from './MainLayout.module.css';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <Navbar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
