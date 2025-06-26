import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Plus, 
  Search,
  Filter,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const Community = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const discussions = [
    {
      id: 1,
      title: 'Emergency Preparedness Checklist for Earthquake Season',
      author: 'Sarah Chen',
      role: 'NGO Representative',
      time: '2 hours ago',
      replies: 12,
      category: 'Preparedness',
      status: 'active'
    },
    {
      id: 2,
      title: 'San Andreas Fault Recent Activity - Community Alert',
      author: 'Dr. Michael Rodriguez',
      role: 'Government Official',
      time: '4 hours ago',
      replies: 28,
      category: 'Alert',
      status: 'urgent'
    },
    {
      id: 3,
      title: 'Volunteer Opportunities for Emergency Response Training',
      author: 'Emma Thompson',
      role: 'Citizen',
      time: '1 day ago',
      replies: 8,
      category: 'Volunteering',
      status: 'active'
    },
    {
      id: 4,
      title: 'Post-Earthquake Recovery Resources and Support',
      author: 'Red Cross California',
      role: 'NGO Representative',
      time: '2 days ago',
      replies: 15,
      category: 'Recovery',
      status: 'resolved'
    }
  ];

  const members = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      role: 'Seismologist',
      organization: 'USGS',
      location: 'San Francisco, CA',
      contributions: 45,
      status: 'online'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Emergency Coordinator',
      organization: 'FEMA',
      location: 'Los Angeles, CA',
      contributions: 32,
      status: 'offline'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      role: 'Community Volunteer',
      organization: 'Local Resident',
      location: 'Sacramento, CA',
      contributions: 28,
      status: 'online'
    },
    {
      id: 4,
      name: 'Red Cross Team',
      role: 'Disaster Relief',
      organization: 'American Red Cross',
      location: 'California',
      contributions: 67,
      status: 'online'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Increased Seismic Activity',
      message: 'Moderate earthquake activity detected in the San Francisco Bay Area. Stay prepared.',
      time: '1 hour ago',
      location: 'San Francisco Bay Area'
    },
    {
      id: 2,
      type: 'info',
      title: 'Emergency Drill Scheduled',
      message: 'Community-wide earthquake drill scheduled for next Thursday at 2:00 PM.',
      time: '3 hours ago',
      location: 'Statewide'
    },
    {
      id: 3,
      type: 'success',
      title: 'Relief Supplies Delivered',
      message: 'Emergency supplies successfully distributed to affected communities in Riverside County.',
      time: '6 hours ago',
      location: 'Riverside County'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'resolved': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Clock className="h-5 w-5 text-blue-500" />;
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Community Hub</h1>
              <p className="text-gray-600">Connect with fellow citizens, NGOs, and government officials</p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Post</span>
            </button>
          </div>
        </motion.div>

        {/* Quick Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{alert.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{alert.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{alert.time}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'discussions', name: 'Discussions', icon: MessageCircle },
                { id: 'members', name: 'Members', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Filter */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Search ${activeTab}...`}
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'discussions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(discussion.status)}`}>
                            {discussion.category}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{discussion.time}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{discussion.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>By {discussion.author}</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {discussion.role}
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{discussion.replies} replies</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'members' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-4"
              >
                {members.map((member) => (
                  <div key={member.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <div className={`h-2 w-2 rounded-full ${
                            member.status === 'online' ? 'bg-green-400' : 'bg-gray-300'
                          }`} />
                        </div>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <p className="text-sm text-gray-500">{member.organization}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500 flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{member.location}</span>
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {member.contributions} contributions
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Community;