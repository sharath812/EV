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
  stationId?: string;
  startTime: string;
  endTime?: string;
  startBatteryLevel: number;
  endBatteryLevel?: number;
  energyAdded: number;
  cost: number;
  location: string;
  chargingSpeed: 'slow' | 'fast' | 'rapid';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: string;
}

export interface ChargingStation {
  id: string;
  name: string;
  location: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'online' | 'offline' | 'maintenance';
  connectorType: 'CCS' | 'CHAdeMO' | 'Tesla' | 'Type2';
  maxPower: number; // kW
  currentPower: number; // kW
  pricePerKwh: number;
  isOccupied: boolean;
  currentSession?: string; // session ID
  totalSessions: number;
  totalEnergyDelivered: number;
  revenue: number;
  lastMaintenance: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  sessionId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
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

export interface StationMetrics {
  totalStations: number;
  activeStations: number;
  totalSessions: number;
  totalRevenue: number;
  averageSessionDuration: number;
  peakUsageHour: number;
  energyDelivered: number;
  utilizationRate: number;
}