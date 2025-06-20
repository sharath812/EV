import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useVehicles } from '../contexts/VehicleContext';
import { 
  Battery, 
  Car, 
  Calendar, 
  MapPin, 
  Settings, 
  Trash2, 
  Clock,
  Zap,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getVehicleById, deleteVehicle, getChargingSessionsByVehicle } = useVehicles();

  const vehicle = id ? getVehicleById(id) : undefined;
  const chargingSessions = id ? getChargingSessionsByVehicle(id) : [];

  if (!vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle not found</h2>
          <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist.</p>
          <Link
            to="/vehicles"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicles
          </Link>
        </div>
      </div>
    );
  }

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

  const handleDeleteVehicle = () => {
    if (window.confirm(`Are you sure you want to delete ${vehicle.make} ${vehicle.model}? This action cannot be undone.`)) {
      deleteVehicle(vehicle.id);
      navigate('/vehicles');
    }
  };

  const totalChargingCost = chargingSessions.reduce((sum, session) => sum + session.cost, 0);
  const totalEnergyAdded = chargingSessions.reduce((sum, session) => sum + session.energyAdded, 0);
  const averageChargingCost = chargingSessions.length > 0 ? totalChargingCost / chargingSessions.length : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            to="/vehicles"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-gray-600">{vehicle.color} • VIN: {vehicle.vin}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/vehicles/${vehicle.id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Settings className="h-4 w-4 mr-2" />
            Edit
          </Link>
          <button
            onClick={handleDeleteVehicle}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vehicle Status */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vehicle Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Battery className={`h-6 w-6 mr-3 ${getBatteryColor(vehicle.batteryLevel).split(' ')[0]}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Battery Level</p>
                      <p className="text-2xl font-bold text-gray-900">{vehicle.batteryLevel}%</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getBatteryColor(vehicle.batteryLevel)}`}>
                    {vehicle.batteryLevel >= 80 ? 'Excellent' : 
                     vehicle.batteryLevel >= 50 ? 'Good' : 
                     vehicle.batteryLevel >= 20 ? 'Low' : 'Critical'}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Range</p>
                      <p className="text-2xl font-bold text-gray-900">{vehicle.currentRange} mi</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Max: {vehicle.maxRange} mi</p>
                    <p className="text-xs text-gray-400">
                      {Math.round((vehicle.currentRange / vehicle.maxRange) * 100)}% of max
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Car className="h-6 w-6 mr-3 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <p className="text-lg font-semibold text-gray-900 capitalize">{vehicle.chargingStatus}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getChargingStatusColor(vehicle.chargingStatus)}`}>
                    {vehicle.chargingStatus}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-6 w-6 mr-3 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Odometer</p>
                      <p className="text-2xl font-bold text-gray-900">{vehicle.odometer.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">miles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charging History */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Charging History</h2>
            
            {chargingSessions.length === 0 ? (
              <div className="text-center py-8">
                <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No charging sessions recorded yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {chargingSessions.slice(0, 10).map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{session.location}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(session.startTime).toLocaleDateString()} at{' '}
                          {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${session.cost.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{session.energyAdded.toFixed(1)} kWh</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">
                          {session.startBatteryLevel}% → {session.endBatteryLevel}%
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          session.chargingSpeed === 'fast' ? 'bg-green-100 text-green-700' :
                          session.chargingSpeed === 'rapid' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {session.chargingSpeed}
                        </span>
                      </div>
                      {session.endTime && (
                        <span className="text-gray-500">
                          Duration: {Math.round((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / (1000 * 60))} min
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Vehicle Specs */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Battery Capacity</span>
                <span className="font-medium">{vehicle.batteryCapacity} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Efficiency</span>
                <span className="font-medium">{vehicle.efficiency} mi/kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Range</span>
                <span className="font-medium">{vehicle.maxRange} miles</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Charge</span>
                <span className="font-medium">
                  {new Date(vehicle.lastChargeDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Charging Stats */}
          {chargingSessions.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Charging Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Sessions</p>
                    <p className="font-semibold text-gray-900">{chargingSessions.length}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Energy</p>
                    <p className="font-semibold text-gray-900">{totalEnergyAdded.toFixed(1)} kWh</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Cost</p>
                    <p className="font-semibold text-gray-900">${totalChargingCost.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Average per session</p>
                  <p className="font-semibold text-gray-900">${averageChargingCost.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;