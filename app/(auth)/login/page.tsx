'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import { FormInput } from '@/presentation/components/FormInput';
import { Button } from '@/presentation/components/Button';
import { saveFrontendSession } from '@/presentation/lib/session';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: 'demo@trux.com',
    password: 'password123',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Completa correo y contrasena para continuar');
      return;
    }

    setLoading(true);
    setError(null);
    saveFrontendSession(formData.email.trim());
    router.push('/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.canvas}></div>

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span>📦</span>
            <span>TRUX</span>
          </div>
          <h1 className={styles.title}>Command Center</h1>
          <p className={styles.subtitle}>Sistema de Logística Inteligente</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            type="email"
            label="Correo Electrónico"
            placeholder="admin@trux.com"
            icon={<Mail size={18} />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <FormInput
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          {error && <div className={styles.errorBanner}>{error}</div>}

          <Button type="submit" fullWidth size="lg" loading={loading}>
            Acceder al Sistema
          </Button>

          <div className={styles.divider}>
            <span>¿Nuevo usuario?</span>
          </div>

          <Link href="/register" className={styles.registerLink}>
            <Button variant="secondary" fullWidth size="lg" type="button">
              Crear Cuenta Empresarial
            </Button>
          </Link>
        </form>

        <div className={styles.footer}>
          <p className={styles.demoText}>
            Credenciales demo visuales: demo@trux.com / password123
          </p>
        </div>
      </div>

      <div className={styles.particles}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{ '--i': i } as React.CSSProperties}></div>
        ))}
      </div>
    </div>
  );
}
