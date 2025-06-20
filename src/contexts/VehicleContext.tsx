import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Vehicle, ChargingSession } from '../types';
import { useAuth } from './AuthContext';

interface VehicleContextType {
  vehicles: Vehicle[];
  chargingSessions: ChargingSession[];
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
  addChargingSession: (session: Omit<ChargingSession, 'id'>) => void;
  getChargingSessionsByVehicle: (vehicleId: string) => ChargingSession[];
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};

interface VehicleProviderProps {
  children: ReactNode;
}

export const VehicleProvider: React.FC<VehicleProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [chargingSessions, setChargingSessions] = useState<ChargingSession[]>([]);

  useEffect(() => {
    if (user) {
      // Load user's vehicles from localStorage
      const storedVehicles = localStorage.getItem(`vehicles_${user.id}`);
      const storedSessions = localStorage.getItem(`chargingSessions_${user.id}`);
      
      if (storedVehicles) {
        setVehicles(JSON.parse(storedVehicles));
      } else {
        // Add some mock data for demo purposes
        const mockVehicles: Vehicle[] = [
          {
            id: '1',
            userId: user.id,
            make: 'Tesla',
            model: 'Model 3',
            year: 2023,
            color: 'Pearl White',
            vin: '5YJ3E1EA4PF123456',
            batteryCapacity: 75,
            currentRange: 245,
            maxRange: 310,
            chargingStatus: 'idle',
            batteryLevel: 78,
            lastChargeDate: '2024-12-20T08:30:00Z',
            odometer: 15420,
            efficiency: 4.2,
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-12-20T08:30:00Z',
          },
        ];
        setVehicles(mockVehicles);
        localStorage.setItem(`vehicles_${user.id}`, JSON.stringify(mockVehicles));
      }
      
      if (storedSessions) {
        setChargingSessions(JSON.parse(storedSessions));
      } else {
        // Add some mock charging sessions
        const mockSessions: ChargingSession[] = [
          {
            id: '1',
            vehicleId: '1',
            startTime: '2024-12-20T08:00:00Z',
            endTime: '2024-12-20T08:30:00Z',
            startBatteryLevel: 65,
            endBatteryLevel: 78,
            energyAdded: 9.75,
            cost: 12.50,
            location: 'Supercharger - Downtown',
            chargingSpeed: 'fast',
          },
          {
            id: '2',
            vehicleId: '1',
            startTime: '2024-12-18T19:00:00Z',
            endTime: '2024-12-18T23:30:00Z',
            startBatteryLevel: 25,
            endBatteryLevel: 85,
            energyAdded: 45,
            cost: 18.75,
            location: 'Home Charger',
            chargingSpeed: 'slow',
          },
        ];
        setChargingSessions(mockSessions);
        localStorage.setItem(`chargingSessions_${user.id}`, JSON.stringify(mockSessions));
      }
    }
  }, [user]);

  const addVehicle = (vehicleData: Omit<Vehicle, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;
    
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedVehicles = [...vehicles, newVehicle];
    setVehicles(updatedVehicles);
    localStorage.setItem(`vehicles_${user.id}`, JSON.stringify(updatedVehicles));
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    if (!user) return;
    
    const updatedVehicles = vehicles.map(vehicle =>
      vehicle.id === id
        ? { ...vehicle, ...updates, updatedAt: new Date().toISOString() }
        : vehicle
    );
    
    setVehicles(updatedVehicles);
    localStorage.setItem(`vehicles_${user.id}`, JSON.stringify(updatedVehicles));
  };

  const deleteVehicle = (id: string) => {
    if (!user) return;
    
    const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id);
    setVehicles(updatedVehicles);
    localStorage.setItem(`vehicles_${user.id}`, JSON.stringify(updatedVehicles));
  };

  const getVehicleById = (id: string): Vehicle | undefined => {
    return vehicles.find(vehicle => vehicle.id === id);
  };

  const addChargingSession = (sessionData: Omit<ChargingSession, 'id'>) => {
    if (!user) return;
    
    const newSession: ChargingSession = {
      ...sessionData,
      id: Date.now().toString(),
    };
    
    const updatedSessions = [...chargingSessions, newSession];
    setChargingSessions(updatedSessions);
    localStorage.setItem(`chargingSessions_${user.id}`, JSON.stringify(updatedSessions));
  };

  const getChargingSessionsByVehicle = (vehicleId: string): ChargingSession[] => {
    return chargingSessions.filter(session => session.vehicleId === vehicleId);
  };

  const value: VehicleContextType = {
    vehicles,
    chargingSessions,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleById,
    addChargingSession,
    getChargingSessionsByVehicle,
  };

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
};