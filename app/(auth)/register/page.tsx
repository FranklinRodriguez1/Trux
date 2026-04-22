'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Building2, Phone } from 'lucide-react';
import { FormInput } from '@/presentation/components/FormInput';
import { Button } from '@/presentation/components/Button';
import { saveFrontendSession } from '@/presentation/lib/session';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    company: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasEmptyField = Object.values(formData).some((value) => !value.trim());
    if (hasEmptyField) {
      setError('Completa todos los campos para crear la cuenta visual');
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
          <h1 className={styles.title}>Crear Cuenta Empresarial</h1>
          <p className={styles.subtitle}>Únete a la red de logística inteligente</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            type="text"
            label="Nombre Completo"
            placeholder="Juan Rodríguez García"
            icon={<User size={18} />}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />

          <FormInput
            type="email"
            label="Correo Electrónico"
            placeholder="empresa@trux.com"
            icon={<Mail size={18} />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <FormInput
            type="text"
            label="Empresa"
            placeholder="Mi Empresa Logística"
            icon={<Building2 size={18} />}
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />

          <FormInput
            type="tel"
            label="Teléfono"
            placeholder="+34 912 345 678"
            icon={<Phone size={18} />}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
            Crear Cuenta
          </Button>

          <div className={styles.divider}>
            <span>¿Ya tienes cuenta?</span>
          </div>

          <Link href="/login" className={styles.loginLink}>
            <Button variant="secondary" fullWidth size="lg" type="button">
              Volver al Acceso
            </Button>
          </Link>
        </form>
      </div>

      <div className={styles.particles}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{ '--i': i } as React.CSSProperties}></div>
        ))}
      </div>
    </div>
  );
}
