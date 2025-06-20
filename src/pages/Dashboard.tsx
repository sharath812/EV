import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useVehicles } from '../contexts/VehicleContext';
import { Battery, Car, Clock, MapPin, Plus, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { vehicles, chargingSessions } = useVehicles();

  const totalVehicles = vehicles.length;
  const averageBatteryLevel = vehicles.length > 0 
    ? Math.round(vehicles.reduce((sum, v) => sum + v.batteryLevel, 0) / vehicles.length)
    : 0;
  const totalMiles = vehicles.reduce((sum, v) => sum + v.odometer, 0);
  const recentSessions = chargingSessions.slice(-5);

  const getChargingStatusColor = (status: string) => {
    switch (status) {
      case 'charging': return 'text-green-600 bg-green-100';
      case 'idle': return 'text-blue-600 bg-blue-100';
      case 'disconnected': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 50) return 'text-yellow-600';
    if (level >= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your electric vehicle fleet
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Car className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">{totalVehicles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Battery className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Battery Level</p>
              <p className="text-2xl font-bold text-gray-900">{averageBatteryLevel}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Miles</p>
              <p className="text-2xl font-bold text-gray-900">{totalMiles.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Charging Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{chargingSessions.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vehicle Overview */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Your Vehicles</h2>
              <Link
                to="/add-vehicle"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Vehicle
              </Link>
            </div>
          </div>
          <div className="p-6">
            {vehicles.length === 0 ? (
              <div className="text-center py-8">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No vehicles added yet</p>
                <Link
                  to="/add-vehicle"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Vehicle
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-500">{vehicle.color}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getChargingStatusColor(vehicle.chargingStatus)}`}>
                          {vehicle.chargingStatus}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Battery className={`h-4 w-4 mr-1 ${getBatteryColor(vehicle.batteryLevel)}`} />
                          <span className="text-sm text-gray-600">{vehicle.batteryLevel}%</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="text-sm text-gray-600">{vehicle.currentRange} mi</span>
                        </div>
                      </div>
                      <Link
                        to={`/vehicles/${vehicle.id}`}
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Charging Sessions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Charging Sessions</h2>
          </div>
          <div className="p-6">
            {recentSessions.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No charging sessions yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentSessions.map((session) => {
                  const vehicle = vehicles.find(v => v.id === session.vehicleId);
                  return (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle'}
                          </h4>
                          <p className="text-sm text-gray-500">{session.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ${session.cost.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session.energyAdded.toFixed(1)} kWh
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                        <span>
                          {session.startBatteryLevel}% → {session.endBatteryLevel}%
                        </span>
                        <span className="capitalize">{session.chargingSpeed} charging</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;