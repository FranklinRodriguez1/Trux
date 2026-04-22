'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Navigation, Timer, Truck, AlertCircle } from 'lucide-react';
import { demoShipments } from '@/presentation/data/appData';
import styles from './tracking.module.css';

function TrackingContent() {
  const searchParams = useSearchParams();
  const shipmentId = searchParams.get('id');
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(shipmentId);
  const activeShipmentId = selectedShipmentId ?? shipmentId ?? demoShipments[0]?.id ?? null;
  const selectedShipment = useMemo(
    () => demoShipments.find((shipment) => shipment.id === activeShipmentId) ?? null,
    [activeShipmentId]
  );

  if (!selectedShipment) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <AlertCircle size={48} />
          <h2>No se encontró el cargamento</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Monitoreo en Tiempo Real</h1>
        <p className={styles.subtitle}>Seguimiento de cargamento {selectedShipment.truckingNumber}</p>
      </div>

      <div className={styles.content}>
        {/* Mapa */}
        <div className={styles.mapSection}>
          <div className={styles.map}>
            <div className={styles.mapPlaceholder}>
              🗺️ Mapa de Monitoreo (Integración con Google Maps / Mapbox)
              <div className={styles.locationMarkers}>
                <div className={styles.origin}>📍 Origen: {selectedShipment.origin.city}</div>
                <div className={styles.current}>
                  🚚 Actual: {selectedShipment.currentLocation?.city || 'En tránsito'}
                </div>
                <div className={styles.destination}>
                  🎯 Destino: {selectedShipment.destination.city}
                </div>
              </div>
            </div>

            <div className={styles.pulseAnimation}>
              <div className={styles.pulse}></div>
              <div className={styles.pulseRing}></div>
            </div>
          </div>

          <div className={styles.routeInfo}>
            <div className={styles.routeItem}>
              <MapPin size={20} />
              <div>
                <div className={styles.routeLabel}>Origen</div>
                <div className={styles.routeValue}>{selectedShipment.origin.address}</div>
                <div className={styles.routeDetail}>
                  {selectedShipment.origin.city}, {selectedShipment.origin.country}
                </div>
              </div>
            </div>

            <div className={styles.arrow}>→</div>

            <div className={styles.routeItem}>
              <Navigation size={20} />
              <div>
                <div className={styles.routeLabel}>Destino</div>
                <div className={styles.routeValue}>{selectedShipment.destination.address}</div>
                <div className={styles.routeDetail}>
                  {selectedShipment.destination.city}, {selectedShipment.destination.country}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel lateral */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.cardTitle}>Estado del Cargamento</h3>

            <div className={`${styles.status} ${styles[`status-${selectedShipment.status}`]}`}>
              {selectedShipment.status.charAt(0).toUpperCase() + selectedShipment.status.slice(1)}
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Número de Cargamento</span>
                <span className={styles.infoValue}>{selectedShipment.truckingNumber}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Peso</span>
                <span className={styles.infoValue}>{selectedShipment.weight} kg</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Volumen</span>
                <span className={styles.infoValue}>{selectedShipment.volume} m³</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Descripción</span>
                <span className={styles.infoValue}>{selectedShipment.description}</span>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <span>Progreso de Entrega</span>
                <span className={styles.progressPercent}>{selectedShipment.progress}%</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${selectedShipment.progress}%` }}
                ></div>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.driverInfo}>
              <Truck size={18} />
              <div>
                <div className={styles.driverLabel}>Conductor Asignado</div>
                <div className={styles.driverName}>{selectedShipment.driver || 'Por asignar'}</div>
              </div>
            </div>

            <div className={styles.timelineSection}>
              <Timer size={18} />
              <div>
                <div className={styles.timelineLabel}>Tiempo Estimado de Entrega</div>
                <div className={styles.timelineValue}>
                  {new Date(selectedShipment.estimatedDelivery).toLocaleDateString('es-ES')}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.notificationsCard}>
            <h3 className={styles.cardTitle}>Notificaciones Recientes</h3>
            <div className={styles.notificationsList}>
              <div className={styles.notification}>
                <span className={styles.notificationTime}>Hace 2 horas</span>
                <p>Cargamento en tránsito hacia el destino</p>
              </div>
              <div className={styles.notification}>
                <span className={styles.notificationTime}>Hace 5 horas</span>
                <p>Cargamento recolectado desde el origen</p>
              </div>
              <div className={styles.notification}>
                <span className={styles.notificationTime}>Hace 1 día</span>
                <p>Solicitud de cargamento confirmada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.shipmentsListSection}>
        <h3 className={styles.listTitle}>Otros Cargamentos Activos</h3>
        <div className={styles.shipmentsList}>
          {demoShipments.map((shipment) => (
            <div
              key={shipment.id}
              className={`${styles.shipmentItem} ${
                shipment.id === selectedShipment.id ? styles.selected : ''
              }`}
              onClick={() => setSelectedShipmentId(shipment.id)}
            >
              <div className={styles.itemHeader}>
                <span className={styles.itemNumber}>{shipment.truckingNumber}</span>
                <span className={`${styles.itemStatus} ${styles[`status-${shipment.status}`]}`}>
                  {shipment.status}
                </span>
              </div>
              <div className={styles.itemRoute}>
                {shipment.origin.city} → {shipment.destination.city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrackingLoadingFallback() {
  return (
    <div className={styles.container}>
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
        Cargando informacion de tracking...
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<TrackingLoadingFallback />}>
      <TrackingContent />
    </Suspense>
  );
}
