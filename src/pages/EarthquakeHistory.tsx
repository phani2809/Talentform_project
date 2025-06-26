import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Activity, 
  Filter,
  Download,
  Search,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const EarthquakeHistory = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30days');
  const [magnitudeFilter, setMagnitudeFilter] = useState('all');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Mock historical earthquake data
  const historicalData = [
    { date: '2024-12-01', magnitude: 4.2, location: 'Los Angeles, CA', depth: 10, time: '14:30', casualties: 0, damage: 'Minor' },
    { date: '2024-11-28', magnitude: 3.8, location: 'San Francisco, CA', depth: 15, time: '09:15', casualties: 0, damage: 'None' },
    { date: '2024-11-25', magnitude: 5.1, location: 'San Diego, CA', depth: 8, time: '22:45', casualties: 2, damage: 'Moderate' },
    { date: '2024-11-20', magnitude: 3.2, location: 'Sacramento, CA', depth: 12, time: '06:20', casualties: 0, damage: 'None' },
    { date: '2024-11-18', magnitude: 4.6, location: 'Fresno, CA', depth: 18, time: '11:30', casualties: 0, damage: 'Minor' },
    { date: '2024-11-15', magnitude: 2.9, location: 'Oakland, CA', depth: 7, time: '16:45', casualties: 0, damage: 'None' },
    { date: '2024-11-12', magnitude: 3.5, location: 'San Jose, CA', depth: 14, time: '13:20', casualties: 0, damage: 'None' },
    { date: '2024-11-08', magnitude: 4.8, location: 'Santa Barbara, CA', depth: 11, time: '19:15', casualties: 1, damage: 'Minor' },
  ];

  const magnitudeTrendData = [
    { month: 'Jun', avg: 3.2, max: 4.1, count: 12 },
    { month: 'Jul', avg: 3.5, max: 4.8, count: 15 },
    { month: 'Aug', avg: 3.1, max: 4.2, count: 18 },
    { month: 'Sep', avg: 3.8, max: 5.1, count: 9 },
    { month: 'Oct', avg: 3.3, max: 4.6, count: 14 },
    { month: 'Nov', avg: 3.7, max: 5.1, count: 16 },
    { month: 'Dec', avg: 3.9, max: 4.2, count: 8 },
  ];

  const depthMagnitudeData = historicalData.map(eq => ({
    depth: eq.depth,
    magnitude: eq.magnitude,
    location: eq.location
  }));

  const stats = [
    { title: 'Total Earthquakes', value: '156', change: '+12% from last month', color: 'blue' },
    { title: 'Average Magnitude', value: '3.4', change: '+0.2 from average', color: 'green' },
    { title: 'Highest Magnitude', value: '5.1', change: 'San Diego, Nov 25', color: 'orange' },
    { title: 'Affected Areas', value: '23', change: 'Counties in California', color: 'purple' },
  ];

  const getMagnitudeColor = (magnitude: number) => {
    if (magnitude >= 5.0) return 'text-red-600 bg-red-100';
    if (magnitude >= 4.0) return 'text-orange-600 bg-orange-100';
    if (magnitude >= 3.0) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getDamageColor = (damage: string) => {
    switch (damage.toLowerCase()) {
      case 'major': return 'text-red-600 bg-red-100';
      case 'moderate': return 'text-orange-600 bg-orange-100';
      case 'minor': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Earthquake History</h1>
              <p className="text-gray-600">Comprehensive historical earthquake data and analysis</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 3 Months</option>
                <option value="1year">Last Year</option>
                <option value="all">All Time</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Activity className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Magnitude Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Magnitude Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={magnitudeTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="avg" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Average Magnitude"
                />
                <Line 
                  type="monotone" 
                  dataKey="max" 
                  stroke="#F97316" 
                  strokeWidth={2}
                  name="Max Magnitude"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Depth vs Magnitude */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Depth vs Magnitude</h3>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart data={depthMagnitudeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="depth" name="Depth (km)" />
                <YAxis dataKey="magnitude" name="Magnitude" />
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  labelFormatter={(label) => `Location: ${depthMagnitudeData[label]?.location || 'N/A'}`}
                />
                <Scatter dataKey="magnitude" fill="#3B82F6" />
              </ScatterChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Earthquake List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Earthquakes</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search earthquakes..."
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Magnitude
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Depth
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Damage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historicalData.map((earthquake, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{earthquake.date}</div>
                          <div className="text-sm text-gray-500">{earthquake.time}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{earthquake.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMagnitudeColor(earthquake.magnitude)}`}>
                        M {earthquake.magnitude}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {earthquake.depth} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {earthquake.casualties > 0 ? `${earthquake.casualties} casualties` : 'No casualties'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDamageColor(earthquake.damage)}`}>
                        {earthquake.damage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default EarthquakeHistory;