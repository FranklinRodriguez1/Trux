'use client';

import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { ShipmentCard } from '@/presentation/components/ShipmentCard';
import { Button } from '@/presentation/components/Button';
import { FormInput } from '@/presentation/components/FormInput';
import { demoShipments } from '@/presentation/data/appData';
import styles from './shipments.module.css';

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showNewShipmentForm, setShowNewShipmentForm] = useState(false);

  const filteredShipments = demoShipments.filter((s) => {
    const matchesSearch =
      s.truckingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.origin.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.destination.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Cargamentos</h1>
          <p className={styles.subtitle}>Gestión de envíos y solicitudes</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setShowNewShipmentForm(!showNewShipmentForm)}>
          <Plus size={20} />
          Nuevo Cargamento
        </Button>
      </div>

      {showNewShipmentForm && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Solicitar Nuevo Cargamento</h2>
          <form className={styles.form}>
            <div className={styles.formGrid}>
              <FormInput
                type="text"
                label="Número de Referencia"
                placeholder="ej: REF-2026-001"
              />
              <FormInput
                type="text"
                label="Ciudad de Origen"
                placeholder="ej: Madrid"
              />
            </div>
            <div className={styles.formGrid}>
              <FormInput
                type="text"
                label="Ciudad de Destino"
                placeholder="ej: Barcelona"
              />
              <FormInput
                type="number"
                label="Peso (kg)"
                placeholder="5000"
              />
            </div>
            <div className={styles.formGrid}>
              <FormInput
                type="text"
                label="Descripción"
                placeholder="ej: Componentes electrónicos"
              />
              <FormInput
                type="date"
                label="Fecha Estimada de Entrega"
              />
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Detalles adicionales..."
              rows={3}
            ></textarea>
            <div className={styles.formActions}>
              <Button type="submit" variant="primary">
                Guardar Propuesta
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowNewShipmentForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por número, ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <Filter size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Todos los Estados</option>
            <option value="pending">Pendiente</option>
            <option value="in-transit">En Tránsito</option>
            <option value="delivered">Entregado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      </div>

      <div className={styles.resultsHeader}>
        <p className={styles.resultCount}>
          {filteredShipments.length} cargamento(s) encontrado(s)
        </p>
      </div>

      <div className={styles.shipmentsGrid}>
        {filteredShipments.length > 0 ? (
          filteredShipments.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>📦</p>
            <h3>No se encontraron cargamentos</h3>
            <p>Ajusta los filtros de busqueda o crea un nuevo cargamento</p>
          </div>
        )}
      </div>
    </div>
  );
}
