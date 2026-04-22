'use client';

import { User, Building2, Globe, Save, Bell } from 'lucide-react';
import { FormInput } from '@/presentation/components/FormInput';
import { Button } from '@/presentation/components/Button';
import { dashboardUser, notificationPreferences } from '@/presentation/data/appData';
import styles from './profile.module.css';

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Perfil de Empresa</h1>
        <p className={styles.subtitle}>Gestiona tu información y preferencias</p>
      </div>

      <div className={styles.content}>
        {/* Sección de información personal */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <User size={20} />
            <h2 className={styles.cardTitle}>Información Personal</h2>
          </div>

          <form className={styles.form}>
            <div className={styles.formRow}>
              <FormInput
                type="text"
                label="Nombre Completo"
                placeholder="Juan Rodríguez García"
                defaultValue={dashboardUser.fullName}
              />
              <FormInput
                type="email"
                label="Correo Electrónico"
                placeholder="juan@empresa.com"
                defaultValue={dashboardUser.email}
              />
            </div>

            <div className={styles.formRow}>
              <FormInput
                type="tel"
                label="Teléfono"
                placeholder="+34 912 345 678"
                defaultValue={dashboardUser.phone}
              />
              <FormInput
                type="text"
                label="Puesto"
                placeholder="Administrador"
                defaultValue={dashboardUser.roleLabel}
              />
            </div>

            <Button variant="primary" size="lg" type="submit">
              <Save size={18} />
              Guardar Cambios
            </Button>
          </form>
        </div>

        {/* Sección de información empresarial */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Building2 size={20} />
            <h2 className={styles.cardTitle}>Información Empresarial</h2>
          </div>

          <form className={styles.form}>
            <div className={styles.formRow}>
              <FormInput
                type="text"
                label="Nombre de la Empresa"
                placeholder="Mi Empresa Logística"
                defaultValue={dashboardUser.company}
              />
              <FormInput
                type="text"
                label="Tipo de Empresa"
                placeholder="Logística y Transporte"
                defaultValue={dashboardUser.businessType}
              />
            </div>

            <div className={styles.formRow}>
              <FormInput
                type="text"
                label="País"
                placeholder="España"
                defaultValue={dashboardUser.country}
              />
              <FormInput
                type="text"
                label="Ciudad"
                placeholder="Madrid"
                defaultValue={dashboardUser.city}
              />
            </div>

            <div className={styles.formRow}>
              <FormInput
                type="text"
                label="Dirección"
                placeholder="Calle Principal, 123"
                defaultValue={dashboardUser.address}
              />
              <FormInput
                type="text"
                label="Código Postal"
                placeholder="28000"
                defaultValue={dashboardUser.postalCode}
              />
            </div>

            <FormInput
              type="text"
              label="Sitio Web"
              placeholder="https://empresa.com"
              icon={<Globe size={18} />}
              defaultValue={dashboardUser.website}
            />

            <Button variant="primary" size="lg" type="submit">
              <Save size={18} />
              Guardar Información
            </Button>
          </form>
        </div>

        {/* Matriz de Notificaciones */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Bell size={20} />
            <h2 className={styles.cardTitle}>Preferencias de Notificaciones</h2>
          </div>

          <div className={styles.notificationMatrix}>
            {notificationPreferences.map((preference) => (
              <div key={preference.id} className={styles.notificationItem}>
                <label className={styles.checkboxContainer}>
                  <input type="checkbox" defaultChecked={preference.enabled} />
                  <span className={styles.checkbox}></span>
                  <div className={styles.notificationContent}>
                    <div className={styles.notificationTitle}>{preference.title}</div>
                    <div className={styles.notificationDesc}>{preference.description}</div>
                  </div>
                </label>
              </div>
            ))}

            <Button variant="primary" size="lg" type="submit">
              <Save size={18} />
              Guardar Preferencias
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
