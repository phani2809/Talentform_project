import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Brain, 
  AlertTriangle, 
  MapPin, 
  Calendar,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';

const Predictions = () => {
  const { user } = useAuth();
  const [selectedModel, setSelectedModel] = useState('ai-ensemble');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Mock prediction data
  const predictions = [
    {
      id: 1,
      location: 'San Andreas Fault Zone',
      coordinates: '34.0522°N, 118.2437°W',
      probability: 78,
      timeframe: 'Next 7 days',
      magnitudeRange: '3.5 - 4.2',
      confidence: 85,
      model: 'AI Ensemble',
      factors: ['Increased seismic activity', 'Tectonic plate stress', 'Historical patterns'],
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      location: 'Hayward Fault',
      coordinates: '37.7749°N, 122.4194°W',
      probability: 52,
      timeframe: 'Next 14 days',
      magnitudeRange: '2.8 - 3.6',
      confidence: 72,
      model: 'Machine Learning',
      factors: ['Ground deformation', 'Micro-earthquakes', 'Stress accumulation'],
      lastUpdated: '4 hours ago'
    },
    {
      id: 3,
      location: 'Calaveras Fault',
      coordinates: '37.3382°N, 121.8863°W',
      probability: 34,
      timeframe: 'Next 30 days',
      magnitudeRange: '2.5 - 3.2',
      confidence: 68,
      model: 'Statistical Model',
      factors: ['Seasonal patterns', 'Fault slip rate', 'Regional activity'],
      lastUpdated: '6 hours ago'
    }
  ];

  // Mock trend data for probability over time
  const probabilityTrend = [
    { date: '12/1', sanAndreas: 45, hayward: 32, calaveras: 28 },
    { date: '12/2', sanAndreas: 52, hayward: 38, calaveras: 25 },
    { date: '12/3', sanAndreas: 58, hayward: 42, calaveras: 31 },
    { date: '12/4', sanAndreas: 65, hayward: 48, calaveras: 29 },
    { date: '12/5', sanAndreas: 71, hayward: 51, calaveras: 33 },
    { date: '12/6', sanAndreas: 75, hayward: 49, calaveras: 35 },
    { date: '12/7', sanAndreas: 78, hayward: 52, calaveras: 34 },
  ];

  // Risk distribution data
  const riskData = [
    { name: 'High Risk', value: 25, color: '#EF4444' },
    { name: 'Medium Risk', value: 45, color: '#F97316' },
    { name: 'Low Risk', value: 30, color: '#10B981' }
  ];

  // Model accuracy data
  const modelAccuracy = [
    { model: 'AI Ensemble', accuracy: 87, predictions: 156 },
    { model: 'Machine Learning', accuracy: 82, predictions: 203 },
    { model: 'Statistical Model', accuracy: 76, predictions: 189 },
    { model: 'Physics-Based', accuracy: 79, predictions: 134 }
  ];

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-red-600 bg-red-100 border-red-200';
    if (probability >= 50) return 'text-orange-600 bg-orange-100 border-orange-200';
    if (probability >= 30) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-green-600 bg-green-100 border-green-200';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">AI Earthquake Predictions</h1>
              <p className="text-purple-100 mb-4">
                Advanced machine learning models for earthquake forecasting and risk assessment
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Brain className="h-4 w-4" />
                  <span>4 Active Models</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4" />
                  <span>87% Average Accuracy</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4" />
                  <span>Real-time Analysis</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">78%</div>
              <div className="text-purple-200">Highest Risk</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Active Predictions', value: '12', icon: TrendingUp, color: 'blue' },
            { title: 'High Risk Areas', value: '3', icon: AlertTriangle, color: 'red' },
            { title: 'Model Accuracy', value: '87%', icon: Brain, color: 'green' },
            { title: 'Updates Today', value: '24', icon: BarChart3, color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Probability Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Probability Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={probabilityTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sanAndreas" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="San Andreas Fault"
                />
                <Line 
                  type="monotone" 
                  dataKey="hayward" 
                  stroke="#F97316" 
                  strokeWidth={2}
                  name="Hayward Fault"
                />
                <Line 
                  type="monotone" 
                  dataKey="calaveras" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Calaveras Fault"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {riskData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Predictions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Current Predictions</h3>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Models</option>
                <option value="ai-ensemble">AI Ensemble</option>
                <option value="machine-learning">Machine Learning</option>
                <option value="statistical">Statistical Model</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{prediction.location}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getProbabilityColor(prediction.probability)}`}>
                        {prediction.probability}% probability
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{prediction.coordinates}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{prediction.timeframe}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <TrendingUp className="h-4 w-4" />
                        <span>M {prediction.magnitudeRange}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}% confidence
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Contributing Factors:</h5>
                      <div className="flex flex-wrap gap-2">
                        {prediction.factors.map((factor, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Model: {prediction.model}</span>
                      <span>Updated: {prediction.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Model Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Performance</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modelAccuracy.map((model, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{model.model}</h4>
                  <span className={`text-sm font-medium ${getConfidenceColor(model.accuracy)}`}>
                    {model.accuracy}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${model.accuracy}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{model.predictions} predictions made</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Predictions;