import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  MapPin, 
  Phone, 
  Heart,
  Zap,
  Globe
} from 'lucide-react';

const LandingPage = () => {
  const { login, register } = useAuth();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    userType: 'citizen' 
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    const result = await login(loginData.email, loginData.password);
    
    if (!result.success) {
      setMessage({ type: 'error', text: result.message });
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    const result = await register(registerData);
    
    if (!result.success) {
      setMessage({ type: 'error', text: result.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">QuakeConnect</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</a>
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                  Citizen Earthquake
                  <span className="text-primary block">Response System</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect, report, and respond to earthquake emergencies in your community. 
                  Join thousands of citizens helping to build a safer, more resilient world.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="emergency-gradient text-white hover:opacity-90 transition-opacity">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Report Emergency
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Heart className="mr-2 h-5 w-5" />
                  Become a Volunteer
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-gray-600">Emergency Response</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-gray-600">Active Volunteers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-gray-600">Cities Covered</div>
                </div>
              </div>
            </div>

            {/* Right Column - Auth Forms */}
            <div className="lg:pl-8">
              <Card className="w-full max-w-md mx-auto shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Join QuakeConnect</CardTitle>
                  <CardDescription>
                    Sign in to your account or create a new one
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {message.text && (
                    <Alert className={`mb-4 ${message.type === 'error' ? 'border-red-500 text-red-700' : 'border-green-500 text-green-700'}`}>
                      <AlertDescription>{message.text}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Sign In</TabsTrigger>
                      <TabsTrigger value="register">Sign Up</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="space-y-4">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="your@email.com"
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Password</Label>
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                            required
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full emergency-gradient text-white"
                          disabled={loading}
                        >
                          {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="register" className="space-y-4">
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Full Name</Label>
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="John Doe"
                            value={registerData.name}
                            onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="your@email.com"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Password</Label>
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="user-type">I am a</Label>
                          <select
                            id="user-type"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={registerData.userType}
                            onChange={(e) => setRegisterData({...registerData, userType: e.target.value})}
                          >
                            <option value="citizen">Citizen</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="responder">Emergency Responder</option>
                          </select>
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full emergency-gradient text-white"
                          disabled={loading}
                        >
                          {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              How QuakeConnect Helps
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects citizens, volunteers, and emergency responders 
              to create a comprehensive earthquake response network.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold">Report Incidents</h4>
              <p className="text-gray-600">
                Quickly report earthquake damage, injuries, or hazards in your area
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold">Real-time Alerts</h4>
              <p className="text-gray-600">
                Receive instant notifications about seismic activity and emergency updates
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold">Live Dashboard</h4>
              <p className="text-gray-600">
                View real-time maps of reported incidents and response activities
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold">Volunteer Network</h4>
              <p className="text-gray-600">
                Connect with trained volunteers and coordinate relief efforts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Simple. Fast. Effective.
            </h3>
            <p className="text-xl text-gray-600">
              Three easy steps to make a difference in your community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold">Sign Up</h4>
              <p className="text-gray-600">
                Create your account and join the QuakeConnect community
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold">Report & Alert</h4>
              <p className="text-gray-600">
                Report incidents or receive alerts about earthquake activity
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold">Respond & Help</h4>
              <p className="text-gray-600">
                Coordinate with volunteers and responders to provide aid
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">QuakeConnect</span>
              </div>
              <p className="text-gray-400">
                Building resilient communities through citizen-powered earthquake response.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Platform</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Report Incident</a></li>
                <li><a href="#" className="hover:text-white transition-colors">View Alerts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Volunteer</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Resources</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Contact</h5>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Emergency: 911</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>info@quakeconnect.org</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 QuakeConnect. All rights reserved. Built for emergency response.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

