'use client';

import { BarChart3, TrendingUp, Package, CheckCircle2 } from 'lucide-react';
import { MetricCard } from '@/presentation/components/MetricCard';
import { ShipmentCard } from '@/presentation/components/ShipmentCard';
import { demoShipments, shipmentMetrics } from '@/presentation/data/appData';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const metrics = shipmentMetrics;
  const recentShipments = demoShipments.slice(0, 3);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Bienvenido al Centro de Control de Logística</p>
        </div>
        <div className={styles.dateTime}>
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      <div className={styles.metricsGrid}>
        <MetricCard
          icon={<Package size={24} />}
          label="Total de Cargamentos"
          value={metrics.totalShipments}
          trend={12}
          color="amber"
        />
        <MetricCard
          icon={<TrendingUp size={24} />}
          label="En Tránsito"
          value={metrics.inTransit}
          trend={8}
          color="blue"
        />
        <MetricCard
          icon={<CheckCircle2 size={24} />}
          label="Entregados"
          value={metrics.delivered}
          trend={15}
          color="green"
        />
        <MetricCard
          icon={<BarChart3 size={24} />}
          label="Eficiencia"
          value={`${Math.round((metrics.delivered / metrics.totalShipments) * 100)}%`}
          trend={5}
          color="green"
        />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Cargamentos Recientes</h2>
          <a href="/shipments" className={styles.viewAll}>
            Ver todos →
          </a>
        </div>

        <div className={styles.shipmentsGrid}>
          {recentShipments.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </div>
      </div>

      <div className={styles.analyticsSection}>
        <div className={styles.analyticsCard}>
          <h3 className={styles.analyticsTitle}>Actividad del Sistema</h3>
          <div className={styles.chartPlaceholder}>
            📊 Gráfico de actividad en tiempo real
          </div>
        </div>

        <div className={styles.analyticsCard}>
          <h3 className={styles.analyticsTitle}>Performance</h3>
          <div className={styles.performanceMetrics}>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Velocidad Promedio</span>
              <span className={styles.metricValue}>85 km/h</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Tiempo Medio Entrega</span>
              <span className={styles.metricValue}>2.3 días</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Tasa Exitosa</span>
              <span className={styles.metricValue}>99.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
