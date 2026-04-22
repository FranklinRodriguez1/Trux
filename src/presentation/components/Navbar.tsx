'use client';

import { Bell, Settings } from 'lucide-react';
import { dashboardUser } from '@/presentation/data/appData';
import styles from './Navbar.module.css';

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.navLeft}>
          <h1 className={styles.title}>Trux Logistics</h1>
        </div>

        <div className={styles.navRight}>
          <button className={styles.iconBtn} title="Notificaciones">
            <Bell size={20} />
            <span className={styles.badge}>3</span>
          </button>
          <button className={styles.iconBtn} title="Configuración">
            <Settings size={20} />
          </button>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>JR</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{dashboardUser.fullName}</div>
              <div className={styles.userRole}>{dashboardUser.roleLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
