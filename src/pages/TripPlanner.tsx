import React, { useState, useEffect } from 'react';
import { useStations } from '../contexts/StationContext';
import { useVehicles } from '../contexts/VehicleContext';
import { 
  MapPin, 
  Navigation, 
  Route, 
  Zap, 
  Clock, 
  DollarSign,
  Battery,
  AlertCircle,
  CheckCircle,
  Car,
  Target,
  Play
} from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface TripStop {
  id: string;
  stationId: string;
  location: Location;
  stationName: string;
  distanceFromStart: number;
  chargingTime: number;
  cost: number;
  batteryLevelBefore: number;
  batteryLevelAfter: number;
}

const TripPlanner: React.FC = () => {
  const { stations } = useStations();
  const { vehicles } = useVehicles();
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [tripStops, setTripStops] = useState<TripStop[]>([]);
  const [nearbyStations, setNearbyStations] = useState<any[]>([]);
  const [isPlanning, setIsPlanning] = useState(false);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Current Location'
          };
          setCurrentLocation(location);
          findNearbyStations(location);
          setLocationError('');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your current location. Please enable location services.');
          // Fallback to NYC coordinates for demo
          const fallbackLocation = {
            lat: 40.7128,
            lng: -74.0060,
            address: 'New York, NY (Demo Location)'
          };
          setCurrentLocation(fallbackLocation);
          findNearbyStations(fallbackLocation);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  const findNearbyStations = (location: Location) => {
    // Calculate distance to all stations and find nearby ones
    const stationsWithDistance = stations.map(station => {
      const distance = calculateDistance(
        location.lat,
        location.lng,
        station.coordinates.lat,
        station.coordinates.lng
      );
      return { ...station, distance };
    });

    // Sort by distance and take closest 10
    const nearby = stationsWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);

    setNearbyStations(nearby);
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const planTrip = async () => {
    if (!startLocation || !endLocation || !selectedVehicle) {
      alert('Please fill in all required fields');
      return;
    }

    setIsPlanning(true);

    // Simulate trip planning with predefined route (NY to Vegas)
    const vehicle = vehicles.find(v => v.id === selectedVehicle);
    if (!vehicle) return;

    // Mock route with charging stops
    const mockStops: TripStop[] = [
      {
        id: 'stop-1',
        stationId: 'station-1',
        location: { lat: 40.7589, lng: -75.9851, address: 'Philadelphia, PA' },
        stationName: 'Philadelphia Supercharger',
        distanceFromStart: 95,
        chargingTime: 30,
        cost: 18.50,
        batteryLevelBefore: 45,
        batteryLevelAfter: 85,
      },
      {
        id: 'stop-2',
        stationId: 'station-2',
        location: { lat: 39.2904, lng: -76.6122, address: 'Baltimore, MD' },
        stationName: 'Baltimore Charging Hub',
        distanceFromStart: 195,
        chargingTime: 25,
        cost: 22.75,
        batteryLevelBefore: 35,
        batteryLevelAfter: 80,
      },
      {
        id: 'stop-3',
        stationId: 'station-3',
        location: { lat: 38.9072, lng: -77.0369, address: 'Washington, DC' },
        stationName: 'DC Fast Charger',
        distanceFromStart: 230,
        chargingTime: 35,
        cost: 28.90,
        batteryLevelBefore: 25,
        batteryLevelAfter: 90,
      },
      {
        id: 'stop-4',
        stationId: 'station-4',
        location: { lat: 35.2271, lng: -80.8431, address: 'Charlotte, NC' },
        stationName: 'Charlotte Supercharger',
        distanceFromStart: 545,
        chargingTime: 40,
        cost: 32.40,
        batteryLevelBefore: 20,
        batteryLevelAfter: 95,
      },
      {
        id: 'stop-5',
        stationId: 'station-5',
        location: { lat: 33.4484, lng: -84.3917, address: 'Atlanta, GA' },
        stationName: 'Atlanta Charging Station',
        distanceFromStart: 875,
        chargingTime: 45,
        cost: 38.75,
        batteryLevelBefore: 15,
        batteryLevelAfter: 100,
      },
      {
        id: 'stop-6',
        stationId: 'station-6',
        location: { lat: 32.7767, lng: -96.7970, address: 'Dallas, TX' },
        stationName: 'Dallas Mega Charger',
        distanceFromStart: 1385,
        chargingTime: 35,
        cost: 42.50,
        batteryLevelBefore: 10,
        batteryLevelAfter: 95,
      },
      {
        id: 'stop-7',
        stationId: 'station-7',
        location: { lat: 35.6870, lng: -105.9378, address: 'Santa Fe, NM' },
        stationName: 'Santa Fe Supercharger',
        distanceFromStart: 1885,
        chargingTime: 30,
        cost: 28.90,
        batteryLevelBefore: 25,
        batteryLevelAfter: 85,
      },
      {
        id: 'stop-8',
        stationId: 'station-8',
        location: { lat: 35.1495, lng: -114.5573, address: 'Kingman, AZ' },
        stationName: 'Kingman Charging Hub',
        distanceFromStart: 2385,
        chargingTime: 25,
        cost: 24.75,
        batteryLevelBefore: 30,
        batteryLevelAfter: 80,
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setTripStops(mockStops);
    setIsPlanning(false);
  };

  const totalDistance = 2500; // NY to Vegas approximate distance
  const totalChargingTime = tripStops.reduce((sum, stop) => sum + stop.chargingTime, 0);
  const totalCost = tripStops.reduce((sum, stop) => sum + stop.cost, 0);
  const estimatedDrivingTime = Math.round(totalDistance / 65); // Assuming 65 mph average

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Trip Planner</h1>
        <p className="text-gray-600 mt-2">Plan your EV journey with optimal charging stops</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trip Planning Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Plan Your Trip</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <input
                  type="text"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  placeholder="New York, NY"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <input
                  type="text"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                  placeholder="Las Vegas, NV"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle
                </label>
                <select
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={planTrip}
                disabled={isPlanning}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isPlanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Planning Route...
                  </>
                ) : (
                  <>
                    <Route className="h-4 w-4 mr-2" />
                    Plan Trip
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Current Location */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Location</h3>
              <button
                onClick={getCurrentLocation}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Refresh location"
              >
                <Navigation className="h-4 w-4" />
              </button>
            </div>
            
            {locationError ? (
              <div className="flex items-center text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                {locationError}
              </div>
            ) : currentLocation ? (
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                {currentLocation.address}
              </div>
            ) : (
              <div className="flex items-center text-gray-500 text-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                Getting location...
              </div>
            )}
          </div>
        </div>

        {/* Trip Results */}
        <div className="lg:col-span-2">
          {tripStops.length > 0 ? (
            <div className="space-y-6">
              {/* Trip Summary */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Trip Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{totalDistance}</p>
                    <p className="text-sm text-gray-600">Miles</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{estimatedDrivingTime}h</p>
                    <p className="text-sm text-gray-600">Driving Time</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{totalChargingTime}m</p>
                    <p className="text-sm text-gray-600">Charging Time</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">${totalCost.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Charging Cost</p>
                  </div>
                </div>
              </div>

              {/* Charging Stops */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Charging Stops</h2>
                <div className="space-y-4">
                  {tripStops.map((stop, index) => (
                    <div key={stop.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-green-600">{index + 1}</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{stop.stationName}</h3>
                            <p className="text-sm text-gray-600">{stop.location.address}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {stop.distanceFromStart} miles from start
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">${stop.cost.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">{stop.chargingTime} minutes</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Battery className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-gray-600">
                              {stop.batteryLevelBefore}% → {stop.batteryLevelAfter}%
                            </span>
                          </div>
                        </div>
                        <button className="text-green-600 hover:text-green-700 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Nearby Stations */
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Nearby Charging Stations</h2>
              {nearbyStations.length > 0 ? (
                <div className="space-y-4">
                  {nearbyStations.map((station) => (
                    <div key={station.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{station.name}</h3>
                          <p className="text-sm text-gray-600">{station.location}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {station.distance.toFixed(1)} miles away
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            station.status === 'online' ? 'bg-green-100 text-green-800' :
                            station.status === 'offline' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {station.status}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <p className="font-medium">{station.connectorType}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Power:</span>
                          <p className="font-medium">{station.maxPower} kW</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Price:</span>
                          <p className="font-medium">${station.pricePerKwh}/kWh</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className={`text-sm ${
                          station.isOccupied ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {station.isOccupied ? 'Occupied' : 'Available'}
                        </div>
                        <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                          Get Directions
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No nearby stations found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;