import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicles } from '../contexts/VehicleContext';
import { Car, AlertCircle } from 'lucide-react';

const AddVehicle: React.FC = () => {
  const navigate = useNavigate();
  const { addVehicle } = useVehicles();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    vin: '',
    batteryCapacity: 75,
    maxRange: 300,
    currentRange: 250,
    batteryLevel: 80,
    chargingStatus: 'idle' as const,
    odometer: 0,
    efficiency: 4.0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.make || !formData.model || !formData.vin) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.vin.length < 10) {
      setError('VIN must be at least 10 characters long');
      return;
    }

    addVehicle({
      ...formData,
      lastChargeDate: new Date().toISOString(),
    });

    navigate('/vehicles');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Car className="h-6 w-6 text-green-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Add New Vehicle</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Add your electric vehicle to start tracking its performance and charging history.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700">
                Make *
              </label>
              <input
                type="text"
                id="make"
                name="make"
                required
                value={formData.make}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Tesla, BMW, Nissan"
              />
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                Model *
              </label>
              <input
                type="text"
                id="model"
                name="model"
                required
                value={formData.model}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Model 3, i3, Leaf"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Pearl White, Midnight Black"
              />
            </div>
          </div>

          <div>
            <label htmlFor="vin" className="block text-sm font-medium text-gray-700">
              VIN (Vehicle Identification Number) *
            </label>
            <input
              type="text"
              id="vin"
              name="vin"
              required
              value={formData.vin}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="17-character VIN"
              maxLength={17}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="batteryCapacity" className="block text-sm font-medium text-gray-700">
                Battery Capacity (kWh)
              </label>
              <input
                type="number"
                id="batteryCapacity"
                name="batteryCapacity"
                value={formData.batteryCapacity}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                min="10"
                max="200"
                step="0.1"
              />
            </div>

            <div>
              <label htmlFor="maxRange" className="block text-sm font-medium text-gray-700">
                Maximum Range (miles)
              </label>
              <input
                type="number"
                id="maxRange"
                name="maxRange"
                value={formData.maxRange}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                min="50"
                max="500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="currentRange" className="block text-sm font-medium text-gray-700">
                Current Range (miles)
              </label>
              <input
                type="number"
                id="currentRange"
                name="currentRange"
                value={formData.currentRange}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                min="0"
                max={formData.maxRange}
              />
            </div>

            <div>
              <label htmlFor="batteryLevel" className="block text-sm font-medium text-gray-700">
                Current Battery Level (%)
              </label>
              <input
                type="number"
                id="batteryLevel"
                name="batteryLevel"
                value={formData.batteryLevel}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="chargingStatus" className="block text-sm font-medium text-gray-700">
                Charging Status
              </label>
              <select
                id="chargingStatus"
                name="chargingStatus"
                value={formData.chargingStatus}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="idle">Idle</option>
                <option value="charging">Charging</option>
                <option value="disconnected">Disconnected</option>
              </select>
            </div>

            <div>
              <label htmlFor="odometer" className="block text-sm font-medium text-gray-700">
                Odometer (miles)
              </label>
              <input
                type="number"
                id="odometer"
                name="odometer"
                value={formData.odometer}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                min="0"
              />
            </div>
          </div>

          <div>
            <label htmlFor="efficiency" className="block text-sm font-medium text-gray-700">
              Efficiency (miles per kWh)
            </label>
            <input
              type="number"
              id="efficiency"
              name="efficiency"
              value={formData.efficiency}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              min="1"
              max="10"
              step="0.1"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/vehicles')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;