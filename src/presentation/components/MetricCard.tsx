'use client';

import { ReactNode } from 'react';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  trend?: number;
  color?: 'amber' | 'green' | 'red' | 'blue';
}

export function MetricCard({ icon, label, value, trend, color = 'amber' }: MetricCardProps) {
  return (
    <div className={`${styles.card} ${styles[`color-${color}`]}`}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
        {trend !== undefined && (
          <div className={`${styles.trend} ${trend >= 0 ? styles.positive : styles.negative}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
}
