import React from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../contexts/VehicleContext';
import { Battery, Car, Calendar, MapPin, Plus, Settings, Trash2 } from 'lucide-react';

const Vehicles: React.FC = () => {
  const { vehicles, deleteVehicle } = useVehicles();

  const getBatteryColor = (level: number) => {
    if (level >= 80) return 'text-green-600 bg-green-100';
    if (level >= 50) return 'text-yellow-600 bg-yellow-100';
    if (level >= 20) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getChargingStatusColor = (status: string) => {
    switch (status) {
      case 'charging': return 'text-green-600 bg-green-100';
      case 'idle': return 'text-blue-600 bg-blue-100';
      case 'disconnected': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleDeleteVehicle = (vehicleId: string, vehicleName: string) => {
    if (window.confirm(`Are you sure you want to delete ${vehicleName}? This action cannot be undone.`)) {
      deleteVehicle(vehicleId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Vehicles</h1>
          <p className="text-gray-600 mt-2">
            Manage your electric vehicle fleet
          </p>
        </div>
        <Link
          to="/add-vehicle"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Vehicle
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-12">
          <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles yet</h3>
          <p className="text-gray-500 mb-6">
            Add your first electric vehicle to get started with tracking and management.
          </p>
          <Link
            to="/add-vehicle"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Your First Vehicle
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-gray-600">{vehicle.color}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/vehicles/${vehicle.id}/edit`}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Edit vehicle"
                    >
                      <Settings className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id, `${vehicle.make} ${vehicle.model}`)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete vehicle"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Battery className={`h-5 w-5 mr-2 ${getBatteryColor(vehicle.batteryLevel).split(' ')[0]}`} />
                      <span className="text-sm text-gray-600">Battery Level</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getBatteryColor(vehicle.batteryLevel)}`}>
                      {vehicle.batteryLevel}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Range</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {vehicle.currentRange} / {vehicle.maxRange} mi
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Car className="h-5 w-5 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Status</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getChargingStatusColor(vehicle.chargingStatus)}`}>
                      {vehicle.chargingStatus}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Odometer</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {vehicle.odometer.toLocaleString()} mi
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>VIN: {vehicle.vin.slice(-6)}</span>
                    <span>Efficiency: {vehicle.efficiency} mi/kWh</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/vehicles/${vehicle.id}`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vehicles;