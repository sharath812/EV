export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  vin: string;
  batteryCapacity: number;
  currentRange: number;
  maxRange: number;
  chargingStatus: 'charging' | 'idle' | 'disconnected';
  batteryLevel: number;
  lastChargeDate: string;
  odometer: number;
  efficiency: number; // miles per kWh
  createdAt: string;
  updatedAt: string;
}

export interface ChargingSession {
  id: string;
  vehicleId: string;
  startTime: string;
  endTime?: string;
  startBatteryLevel: number;
  endBatteryLevel?: number;
  energyAdded: number;
  cost: number;
  location: string;
  chargingSpeed: 'slow' | 'fast' | 'rapid';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}