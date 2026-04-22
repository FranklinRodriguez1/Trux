'use client';

import Link from 'next/link';
import { MapPin, Calendar, Weight, Package } from 'lucide-react';
import { Shipment } from '@/presentation/data/appData';
import styles from './ShipmentCard.module.css';

interface ShipmentCardProps {
  shipment: Shipment;
}

export function ShipmentCard({ shipment }: ShipmentCardProps) {
  return (
    <Link href={`/tracking?id=${shipment.id}`}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.truckingNumber}>{shipment.truckingNumber}</div>
          <div className={`${styles.status} ${styles[`status-${shipment.status}`]}`}>
            {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
          </div>
        </div>

        <div className={styles.routes}>
          <div className={styles.location}>
            <MapPin size={16} />
            <div>
              <div className={styles.locationLabel}>De:</div>
              <div className={styles.locationValue}>{shipment.origin.city}</div>
            </div>
          </div>
          <div className={styles.arrow}>→</div>
          <div className={styles.location}>
            <MapPin size={16} />
            <div>
              <div className={styles.locationLabel}>Para:</div>
              <div className={styles.locationValue}>{shipment.destination.city}</div>
            </div>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detail}>
            <Package size={16} />
            <span>{shipment.description}</span>
          </div>
          <div className={styles.detail}>
            <Weight size={16} />
            <span>{shipment.weight} kg</span>
          </div>
          <div className={styles.detail}>
            <Calendar size={16} />
            <span>{new Date(shipment.estimatedDelivery).toLocaleDateString('es-ES')}</span>
          </div>
        </div>

        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${shipment.progress}%` }}
            ></div>
          </div>
          <span className={styles.progressText}>{shipment.progress}%</span>
        </div>
      </div>
    </Link>
  );
}
