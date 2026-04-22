'use client';

export type ShipmentStatus = 'pending' | 'in-transit' | 'delivered' | 'cancelled';

export interface ShipmentLocation {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
}

export interface Shipment {
  id: string;
  truckingNumber: string;
  status: ShipmentStatus;
  origin: ShipmentLocation;
  destination: ShipmentLocation;
  currentLocation?: ShipmentLocation;
  weight: number;
  volume: number;
  description: string;
  driver?: string;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
}

export interface DashboardUser {
  id: string;
  email: string;
  fullName: string;
  company: string;
  roleLabel: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  businessType: string;
  website?: string;
}

export interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export const dashboardUser: DashboardUser = {
  id: 'demo-user',
  email: 'demo@trux.com',
  fullName: 'Juan Rodriguez',
  company: 'Trux Logistics Inc',
  roleLabel: 'Administrador',
  phone: '+34 912 345 678',
  country: 'Espana',
  city: 'Madrid',
  address: 'Calle Principal, 123',
  postalCode: '28000',
  businessType: 'Logistica y Transporte',
  website: 'https://trux.example',
};

export const demoShipments: Shipment[] = [
  {
    id: '1',
    truckingNumber: 'TRX-2026-001',
    status: 'in-transit',
    origin: {
      latitude: 40.4168,
      longitude: -3.7038,
      address: 'Calle Gran Via, 1',
      city: 'Madrid',
      country: 'Espana',
    },
    destination: {
      latitude: 41.3851,
      longitude: 2.1734,
      address: 'Paseo de Gracia, 100',
      city: 'Barcelona',
      country: 'Espana',
    },
    currentLocation: {
      latitude: 40.85,
      longitude: -2.5,
      address: 'Autopista A-3, Km 250',
      city: 'Tarancon',
      country: 'Espana',
    },
    weight: 5000,
    volume: 50,
    description: 'Componentes electronicos',
    driver: 'Carlos Lopez',
    estimatedDelivery: '2026-04-23T16:00:00.000Z',
    createdAt: '2026-04-22T09:00:00.000Z',
    updatedAt: '2026-04-22T12:30:00.000Z',
    progress: 65,
  },
  {
    id: '2',
    truckingNumber: 'TRX-2026-002',
    status: 'pending',
    origin: {
      latitude: 39.4699,
      longitude: -0.3763,
      address: 'Avda. Blasco Ibanez, 150',
      city: 'Valencia',
      country: 'Espana',
    },
    destination: {
      latitude: 37.3891,
      longitude: -5.9845,
      address: 'Calle Sierpes, 1',
      city: 'Sevilla',
      country: 'Espana',
    },
    weight: 3000,
    volume: 30,
    description: 'Maquinaria industrial',
    estimatedDelivery: '2026-04-24T17:00:00.000Z',
    createdAt: '2026-04-22T08:00:00.000Z',
    updatedAt: '2026-04-22T08:00:00.000Z',
    progress: 0,
  },
  {
    id: '3',
    truckingNumber: 'TRX-2026-003',
    status: 'delivered',
    origin: {
      latitude: 43.2632,
      longitude: -2.9345,
      address: 'Gran Via, 50',
      city: 'Bilbao',
      country: 'Espana',
    },
    destination: {
      latitude: 42.6026,
      longitude: -8.2453,
      address: 'Rua do Franco, 1',
      city: 'Santiago de Compostela',
      country: 'Espana',
    },
    weight: 2000,
    volume: 20,
    description: 'Paquetes varios',
    driver: 'Maria Garcia',
    estimatedDelivery: '2026-04-20T10:00:00.000Z',
    createdAt: '2026-04-12T10:00:00.000Z',
    updatedAt: '2026-04-20T10:00:00.000Z',
    progress: 100,
  },
];

export const shipmentMetrics = {
  totalShipments: demoShipments.length,
  inTransit: demoShipments.filter((shipment) => shipment.status === 'in-transit').length,
  delivered: demoShipments.filter((shipment) => shipment.status === 'delivered').length,
  cancelled: demoShipments.filter((shipment) => shipment.status === 'cancelled').length,
};

export const notificationPreferences: NotificationPreference[] = [
  {
    id: 'shipment-updates',
    title: 'Actualizaciones de Cargamentos',
    description: 'Recibe notificaciones cuando hay cambios en el estado de tus cargamentos.',
    enabled: true,
  },
  {
    id: 'system-alerts',
    title: 'Alertas del Sistema',
    description: 'Notificaciones de mantenimiento y eventos importantes del sistema.',
    enabled: true,
  },
  {
    id: 'email',
    title: 'Notificaciones por Email',
    description: 'Recibe resumenes y avisos directamente en tu correo.',
    enabled: false,
  },
  {
    id: 'push',
    title: 'Notificaciones Push',
    description: 'Recibe alertas instantaneas en tu navegador.',
    enabled: true,
  },
  {
    id: 'weekly',
    title: 'Reportes Semanales',
    description: 'Recibe analisis y estadisticas cada semana.',
    enabled: true,
  },
  {
    id: 'sms',
    title: 'Notificaciones SMS',
    description: 'Recibe mensajes de texto para alertas criticas.',
    enabled: false,
  },
];
