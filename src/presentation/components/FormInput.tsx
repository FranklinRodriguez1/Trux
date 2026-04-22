'use client';

import { InputHTMLAttributes, ReactNode } from 'react';
import styles from './FormInput.module.css';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export function FormInput({ label, error, icon, ...props }: FormInputProps) {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <input
          className={`${styles.input} ${error ? styles.error : ''} ${icon ? styles.withIcon : ''}`}
          {...props}
        />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
