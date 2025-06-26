import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Shield, 
  Users, 
  BarChart3, 
  Globe, 
  Zap,
  ArrowRight,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: 'Real-time Alerts',
      description: 'Get instant notifications about seismic activities and potential earthquake risks in your area.'
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Connect with citizens, NGOs, and government agencies for coordinated disaster response.'
    },
    {
      icon: BarChart3,
      title: 'Data Analytics',
      description: 'Access comprehensive earthquake statistics, historical data, and predictive insights.'
    },
    {
      icon: Shield,
      title: 'Emergency Response',
      description: 'Quick access to emergency contacts, evacuation routes, and safety protocols.'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Monitor earthquake activities worldwide with detailed geographic information.'
    },
    {
      icon: Zap,
      title: 'Prediction Model',
      description: 'Advanced AI-powered earthquake prediction based on seismic patterns and data analysis.'
    }
  ];

  const stats = [
    { value: '500+', label: 'Communities Protected' },
    { value: '10,000+', label: 'Active Users' },
    { value: '50+', label: 'Partner Organizations' },
    { value: '99.9%', label: 'Alert Accuracy' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EarthGuard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Protect Communities from
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"> Earthquakes</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Advanced earthquake monitoring and community-based disaster response platform. 
              Connect, prepare, and respond together with real-time alerts and predictive analytics.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Join the Community</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="#features" 
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 rounded-r-lg">
          <div className="flex items-center justify-center space-x-6 text-red-700">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span className="font-medium">Emergency: 911</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">Current Risk: Low</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Last Update: 2 min ago</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Disaster Management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with community collaboration 
              to provide the most effective earthquake response system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="p-3 bg-gradient-to-r from-blue-100 to-orange-100 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens, NGOs, and government agencies working together 
            to build safer, more resilient communities.
          </p>
          <Link 
            to="/signup" 
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Start Protecting Your Community</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">EarthGuard</span>
              </div>
              <p className="text-gray-600">
                Protecting communities through advanced earthquake monitoring and response coordination.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
                <li><Link to="/community" className="hover:text-blue-600">Community</Link></li>
                <li><Link to="/predictions" className="hover:text-blue-600">Predictions</Link></li>
                <li><Link to="/history" className="hover:text-blue-600">History</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-blue-600">Emergency Contacts</a></li>
                <li><a href="#" className="hover:text-blue-600">Training Materials</a></li>
                <li><a href="#" className="hover:text-blue-600">API Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Report Issue</a></li>
                <li><a href="#" className="hover:text-blue-600">Feedback</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2025 EarthGuard. All rights reserved. Protecting communities worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;