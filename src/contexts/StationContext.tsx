import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChargingStation, Payment, StationMetrics } from '../types';
import { useAuth } from './AuthContext';

interface StationContextType {
  stations: ChargingStation[];
  payments: Payment[];
  metrics: StationMetrics;
  addStation: (station: Omit<ChargingStation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateStation: (id: string, updates: Partial<ChargingStation>) => void;
  deleteStation: (id: string) => void;
  getStationById: (id: string) => ChargingStation | undefined;
  addPayment: (payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePayment: (id: string, updates: Partial<Payment>) => void;
  getPaymentsByUser: (userId: string) => Payment[];
  simulateRealTimeData: () => void;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export const useStations = () => {
  const context = useContext(StationContext);
  if (context === undefined) {
    throw new Error('useStations must be used within a StationProvider');
  }
  return context;
};

interface StationProviderProps {
  children: ReactNode;
}

export const StationProvider: React.FC<StationProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [metrics, setMetrics] = useState<StationMetrics>({
    totalStations: 0,
    activeStations: 0,
    totalSessions: 0,
    totalRevenue: 0,
    averageSessionDuration: 0,
    peakUsageHour: 14,
    energyDelivered: 0,
    utilizationRate: 0,
  });

  useEffect(() => {
    // Initialize mock data
    const storedStations = localStorage.getItem('chargingStations');
    const storedPayments = localStorage.getItem('payments');

    if (storedStations) {
      setStations(JSON.parse(storedStations));
    } else {
      const mockStations: ChargingStation[] = [
        {
          id: 'station-1',
          name: 'Downtown Supercharger',
          location: 'Downtown Plaza',
          address: '123 Main St, Downtown',
          coordinates: { lat: 40.7128, lng: -74.0060 },
          status: 'online',
          connectorType: 'CCS',
          maxPower: 150,
          currentPower: 120,
          pricePerKwh: 0.35,
          isOccupied: true,
          currentSession: 'session-1',
          totalSessions: 1247,
          totalEnergyDelivered: 45680,
          revenue: 15988.00,
          lastMaintenance: '2024-12-15T10:00:00Z',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-12-21T15:30:00Z',
        },
        {
          id: 'station-2',
          name: 'Mall Charging Hub',
          location: 'Shopping Center',
          address: '456 Commerce Blvd, Mall District',
          coordinates: { lat: 40.7589, lng: -73.9851 },
          status: 'online',
          connectorType: 'CCS',
          maxPower: 100,
          currentPower: 0,
          pricePerKwh: 0.32,
          isOccupied: false,
          totalSessions: 892,
          totalEnergyDelivered: 32150,
          revenue: 10288.00,
          lastMaintenance: '2024-12-10T14:00:00Z',
          createdAt: '2024-02-01T00:00:00Z',
          updatedAt: '2024-12-21T15:30:00Z',
        },
        {
          id: 'station-3',
          name: 'Highway Rest Stop',
          location: 'Interstate 95',
          address: 'Mile Marker 45, I-95 North',
          coordinates: { lat: 40.6892, lng: -74.0445 },
          status: 'online',
          connectorType: 'Tesla',
          maxPower: 250,
          currentPower: 180,
          pricePerKwh: 0.42,
          isOccupied: true,
          currentSession: 'session-2',
          totalSessions: 2156,
          totalEnergyDelivered: 78920,
          revenue: 33146.40,
          lastMaintenance: '2024-12-18T09:00:00Z',
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: '2024-12-21T15:30:00Z',
        },
        {
          id: 'station-4',
          name: 'Office Complex Charger',
          location: 'Business District',
          address: '789 Corporate Dr, Business Park',
          coordinates: { lat: 40.7505, lng: -73.9934 },
          status: 'maintenance',
          connectorType: 'Type2',
          maxPower: 22,
          currentPower: 0,
          pricePerKwh: 0.28,
          isOccupied: false,
          totalSessions: 456,
          totalEnergyDelivered: 12340,
          revenue: 3455.20,
          lastMaintenance: '2024-12-20T16:00:00Z',
          createdAt: '2024-03-01T00:00:00Z',
          updatedAt: '2024-12-21T15:30:00Z',
        },
      ];
      setStations(mockStations);
      localStorage.setItem('chargingStations', JSON.stringify(mockStations));
    }

    if (storedPayments) {
      setPayments(JSON.parse(storedPayments));
    } else {
      const mockPayments: Payment[] = [
        {
          id: 'payment-1',
          sessionId: '1',
          userId: 'demo-user-123',
          amount: 12.50,
          currency: 'USD',
          status: 'completed',
          paymentMethod: 'credit_card',
          transactionId: 'txn_1234567890',
          createdAt: '2024-12-20T08:30:00Z',
          updatedAt: '2024-12-20T08:30:00Z',
        },
        {
          id: 'payment-2',
          sessionId: '2',
          userId: 'demo-user-123',
          amount: 18.75,
          currency: 'USD',
          status: 'completed',
          paymentMethod: 'apple_pay',
          transactionId: 'txn_0987654321',
          createdAt: '2024-12-18T23:30:00Z',
          updatedAt: '2024-12-18T23:30:00Z',
        },
        {
          id: 'payment-3',
          sessionId: '3',
          userId: 'demo-user-123',
          amount: 22.40,
          currency: 'USD',
          status: 'completed',
          paymentMethod: 'google_pay',
          transactionId: 'txn_1122334455',
          createdAt: '2024-12-21T15:45:00Z',
          updatedAt: '2024-12-21T15:45:00Z',
        },
      ];
      setPayments(mockPayments);
      localStorage.setItem('payments', JSON.stringify(mockPayments));
    }
  }, []);

  useEffect(() => {
    // Calculate metrics
    const activeStations = stations.filter(s => s.status === 'online').length;
    const totalSessions = stations.reduce((sum, s) => sum + s.totalSessions, 0);
    const totalRevenue = stations.reduce((sum, s) => sum + s.revenue, 0);
    const energyDelivered = stations.reduce((sum, s) => sum + s.totalEnergyDelivered, 0);
    const occupiedStations = stations.filter(s => s.isOccupied).length;
    const utilizationRate = activeStations > 0 ? (occupiedStations / activeStations) * 100 : 0;

    setMetrics({
      totalStations: stations.length,
      activeStations,
      totalSessions,
      totalRevenue,
      averageSessionDuration: 45, // minutes
      peakUsageHour: 14, // 2 PM
      energyDelivered,
      utilizationRate,
    });
  }, [stations]);

  const addStation = (stationData: Omit<ChargingStation, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newStation: ChargingStation = {
      ...stationData,
      id: `station-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedStations = [...stations, newStation];
    setStations(updatedStations);
    localStorage.setItem('chargingStations', JSON.stringify(updatedStations));
  };

  const updateStation = (id: string, updates: Partial<ChargingStation>) => {
    const updatedStations = stations.map(station =>
      station.id === id
        ? { ...station, ...updates, updatedAt: new Date().toISOString() }
        : station
    );
    
    setStations(updatedStations);
    localStorage.setItem('chargingStations', JSON.stringify(updatedStations));
  };

  const deleteStation = (id: string) => {
    const updatedStations = stations.filter(station => station.id !== id);
    setStations(updatedStations);
    localStorage.setItem('chargingStations', JSON.stringify(updatedStations));
  };

  const getStationById = (id: string): ChargingStation | undefined => {
    return stations.find(station => station.id === id);
  };

  const addPayment = (paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: `payment-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedPayments = [...payments, newPayment];
    setPayments(updatedPayments);
    localStorage.setItem('payments', JSON.stringify(updatedPayments));
  };

  const updatePayment = (id: string, updates: Partial<Payment>) => {
    const updatedPayments = payments.map(payment =>
      payment.id === id
        ? { ...payment, ...updates, updatedAt: new Date().toISOString() }
        : payment
    );
    
    setPayments(updatedPayments);
    localStorage.setItem('payments', JSON.stringify(updatedPayments));
  };

  const getPaymentsByUser = (userId: string): Payment[] => {
    return payments.filter(payment => payment.userId === userId);
  };

  const simulateRealTimeData = () => {
    setStations(prevStations => 
      prevStations.map(station => ({
        ...station,
        currentPower: station.isOccupied 
          ? Math.floor(Math.random() * station.maxPower * 0.8) + station.maxPower * 0.2
          : 0,
        updatedAt: new Date().toISOString(),
      }))
    );
  };

  const value: StationContextType = {
    stations,
    payments,
    metrics,
    addStation,
    updateStation,
    deleteStation,
    getStationById,
    addPayment,
    updatePayment,
    getPaymentsByUser,
    simulateRealTimeData,
  };

  return <StationContext.Provider value={value}>{children}</StationContext.Provider>;
};