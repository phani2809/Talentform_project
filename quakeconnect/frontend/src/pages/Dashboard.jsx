import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import Map from '../components/Map';
import axios from 'axios';
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  MapPin, 
  Bell,
  LogOut,
  Menu,
  X,
  Activity,
  Clock,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalReports: 0,
    activeAlerts: 0,
    volunteers: 0,
    recentReports: [],
    alerts: []
  });

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [reportsRes, alertsRes, volunteersRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/reports`),
        axios.get(`${API_BASE_URL}/alerts`),
        axios.get(`${API_BASE_URL}/volunteers`)
      ]);

      setStats({
        totalReports: reportsRes.data.reports.length,
        activeAlerts: alertsRes.data.alerts.length,
        volunteers: volunteersRes.data.volunteers.length,
        recentReports: reportsRes.data.reports.slice(0, 5),
        alerts: alertsRes.data.alerts
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Activity, current: true },
    { name: 'Report Incident', href: '/report', icon: AlertTriangle, current: false },
    { name: 'View Alerts', href: '/alerts', icon: Bell, current: false },
    { name: 'Volunteer', href: '/volunteer', icon: Users, current: false },
    { name: 'About', href: '/about', icon: MapPin, current: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">QuakeConnect</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    item.current
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">QuakeConnect</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    item.current
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.userType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Welcome back, {user?.name}
                  </h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Here's what's happening in your emergency response network
                  </p>
                </div>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalReports}</div>
                    <p className="text-xs text-muted-foreground">
                      Incident reports submitted
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.activeAlerts}</div>
                    <p className="text-xs text-muted-foreground">
                      Current emergency alerts
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Volunteers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.volunteers}</div>
                    <p className="text-xs text-muted-foreground">
                      Active volunteer network
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Link to="/report">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="flex items-center p-6">
                      <AlertTriangle className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold">Report Incident</h3>
                        <p className="text-sm text-gray-600">Submit earthquake report</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/alerts">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="flex items-center p-6">
                      <Bell className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold">View Alerts</h3>
                        <p className="text-sm text-gray-600">Check emergency alerts</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/volunteer">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="flex items-center p-6">
                      <Users className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold">Volunteer</h3>
                        <p className="text-sm text-gray-600">Join response efforts</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex items-center p-6">
                    <MapPin className="h-8 w-8 text-primary mr-4" />
                    <div>
                      <h3 className="font-semibold">Live Map</h3>
                      <p className="text-sm text-gray-600">View incident locations</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Live Map */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-6 w-6 text-primary mr-2" />
                      Live Incident Map
                    </CardTitle>
                    <CardDescription>
                      Real-time view of reported incidents and active alerts in your area
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Map 
                      reports={stats.recentReports} 
                      alerts={stats.alerts}
                      height="400px"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Recent Reports
                    </CardTitle>
                    <CardDescription>
                      Latest incident reports in your area
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stats.recentReports.length > 0 ? (
                        stats.recentReports.map((report, index) => (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {report.incidentType} - {report.damageLevel}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {report.location}
                              </p>
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-4">No recent reports</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      System Status
                    </CardTitle>
                    <CardDescription>
                      Current system health and performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Response Network</span>
                        <span className="text-sm text-green-600 font-medium">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Alert System</span>
                        <span className="text-sm text-green-600 font-medium">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Volunteer Network</span>
                        <span className="text-sm text-green-600 font-medium">Ready</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Emergency Services</span>
                        <span className="text-sm text-green-600 font-medium">Connected</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

