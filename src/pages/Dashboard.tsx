import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  MapPin, 
  Clock,
  Activity,
  Shield
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Mock earthquake data for the last 30 days
  const earthquakeData = [
    { date: '12/1', magnitude: 2.1, count: 3 },
    { date: '12/2', magnitude: 1.8, count: 5 },
    { date: '12/3', magnitude: 3.2, count: 2 },
    { date: '12/4', magnitude: 2.5, count: 4 },
    { date: '12/5', magnitude: 1.9, count: 6 },
    { date: '12/6', magnitude: 4.1, count: 1 },
    { date: '12/7', magnitude: 2.8, count: 3 },
  ];

  const recentEarthquakes = [
    { id: 1, magnitude: 4.2, location: 'Los Angeles, CA', time: '2 hours ago', depth: '10 km' },
    { id: 2, magnitude: 3.1, location: 'San Francisco, CA', time: '4 hours ago', depth: '15 km' },
    { id: 3, magnitude: 2.8, location: 'San Diego, CA', time: '6 hours ago', depth: '8 km' },
    { id: 4, magnitude: 3.5, location: 'Sacramento, CA', time: '8 hours ago', depth: '12 km' },
  ];

  const predictions = [
    { location: 'San Andreas Fault', probability: 75, timeframe: 'Next 7 days', magnitude: '3.0-4.0' },
    { location: 'Hayward Fault', probability: 45, timeframe: 'Next 14 days', magnitude: '2.5-3.5' },
    { location: 'Calaveras Fault', probability: 30, timeframe: 'Next 30 days', magnitude: '2.0-3.0' },
  ];

  const stats = [
    {
      title: 'Current Risk Level',
      value: 'Moderate',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+5% from last week'
    },
    {
      title: 'Recent Earthquakes',
      value: '24',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: 'Last 30 days'
    },
    {
      title: 'Community Members',
      value: '1,247',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+12% this month'
    },
    {
      title: 'Emergency Contacts',
      value: '8',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: 'All verified'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-blue-100 mb-4">
              Here's your earthquake monitoring dashboard for {user.location}
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Last updated: 2 minutes ago</span>
              </div>
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
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Earthquake Magnitude Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Earthquake Magnitude Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={earthquakeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="magnitude" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Earthquake Frequency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Earthquake Count</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={earthquakeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#F97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Earthquakes and Predictions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Earthquakes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Earthquakes</h3>
            <div className="space-y-4">
              {recentEarthquakes.map((earthquake) => (
                <div key={earthquake.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        earthquake.magnitude >= 4 ? 'bg-red-100 text-red-700' :
                        earthquake.magnitude >= 3 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        M {earthquake.magnitude}
                      </span>
                      <span className="font-medium text-gray-900">{earthquake.location}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Depth: {earthquake.depth} • {earthquake.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Earthquake Predictions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Predictions</h3>
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{prediction.location}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      prediction.probability >= 70 ? 'bg-red-100 text-red-700' :
                      prediction.probability >= 50 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {prediction.probability}% chance
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Magnitude: {prediction.magnitude} • {prediction.timeframe}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;