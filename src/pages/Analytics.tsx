import React, { useState } from 'react';
import { useStations } from '../contexts/StationContext';
import { useVehicles } from '../contexts/VehicleContext';
import { 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Clock, 
  Users, 
  Battery,
  BarChart3,
  PieChart,
  Calendar,
  Download
} from 'lucide-react';

const Analytics: React.FC = () => {
  const { stations, metrics, payments } = useStations();
  const { chargingSessions } = useVehicles();
  const [timeRange, setTimeRange] = useState('7d');

  // Calculate analytics data
  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);
  const completedPayments = payments.filter(p => p.status === 'completed').length;
  const paymentSuccessRate = payments.length > 0 ? (completedPayments / payments.length) * 100 : 0;
  
  const revenueByMonth = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15200 },
    { month: 'Mar', revenue: 18900 },
    { month: 'Apr', revenue: 22100 },
    { month: 'May', revenue: 25800 },
    { month: 'Jun', revenue: 28400 },
    { month: 'Jul', revenue: 31200 },
    { month: 'Aug', revenue: 29800 },
    { month: 'Sep', revenue: 33500 },
    { month: 'Oct', revenue: 36200 },
    { month: 'Nov', revenue: 38900 },
    { month: 'Dec', revenue: 42100 },
  ];

  const usageByHour = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    sessions: Math.floor(Math.random() * 50) + 10,
  }));

  const connectorTypeData = [
    { type: 'CCS', count: 45, percentage: 45 },
    { type: 'Tesla', count: 30, percentage: 30 },
    { type: 'CHAdeMO', count: 15, percentage: 15 },
    { type: 'Type2', count: 10, percentage: 10 },
  ];

  const exportData = () => {
    const data = {
      metrics,
      stations: stations.length,
      payments: payments.length,
      totalRevenue: totalPayments,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ev-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into your EV charging network</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button
            onClick={exportData}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${metrics.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Energy Delivered</p>
              <p className="text-2xl font-bold text-gray-900">{(metrics.energyDelivered / 1000).toFixed(1)}MWh</p>
              <p className="text-xs text-blue-600 mt-1">+8.3% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalSessions.toLocaleString()}</p>
              <p className="text-xs text-purple-600 mt-1">+15.2% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Session Duration</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.averageSessionDuration}min</p>
              <p className="text-xs text-orange-600 mt-1">-2.1% from last month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {revenueByMonth.slice(-6).map((data, index) => (
              <div key={data.month} className="flex items-center">
                <div className="w-12 text-sm text-gray-600">{data.month}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(data.revenue / 45000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-20 text-sm font-medium text-gray-900 text-right">
                  ${(data.revenue / 1000).toFixed(1)}k
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage by Hour */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Usage by Hour</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-12 gap-1 h-32">
            {usageByHour.map((data) => (
              <div key={data.hour} className="flex flex-col items-center">
                <div className="flex-1 w-full flex items-end">
                  <div
                    className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${(data.sessions / 60) * 100}%` }}
                    title={`${data.hour}:00 - ${data.sessions} sessions`}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {data.hour % 6 === 0 ? `${data.hour}h` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connector Types */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Connector Types</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {connectorTypeData.map((data, index) => (
              <div key={data.type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                    }`}
                  ></div>
                  <span className="text-sm text-gray-700">{data.type}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{data.count}</div>
                  <div className="text-xs text-gray-500">{data.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Analytics */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Payment Analytics</h3>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className="text-lg font-bold text-green-600">{paymentSuccessRate.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Total Payments</span>
              <span className="text-lg font-bold text-gray-900">{payments.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Avg Payment</span>
              <span className="text-lg font-bold text-gray-900">
                ${payments.length > 0 ? (totalPayments / payments.length).toFixed(2) : '0.00'}
              </span>
            </div>
          </div>
        </div>

        {/* Station Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Stations</h3>
            <Battery className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {stations
              .sort((a, b) => b.revenue - a.revenue)
              .slice(0, 5)
              .map((station, index) => (
                <div key={station.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{station.name}</div>
                      <div className="text-xs text-gray-500">{station.totalSessions} sessions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">${station.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;