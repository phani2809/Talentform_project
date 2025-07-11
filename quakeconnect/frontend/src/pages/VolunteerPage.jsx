import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { 
  Shield, 
  Users, 
  ArrowLeft,
  Heart,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Award,
  Loader2
} from 'lucide-react';

const VolunteerPage = () => {
  const { user } = useAuth();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    skills: '',
    preferredArea: '',
    availability: '',
    phone: ''
  });

  const API_BASE_URL = 'http://localhost:5000/api';

  const skillOptions = [
    'First Aid/CPR',
    'Medical Training',
    'Search and Rescue',
    'Construction/Engineering',
    'Communications',
    'Transportation',
    'Food Service',
    'Childcare',
    'Translation',
    'Technology Support',
    'Logistics',
    'Administrative Support'
  ];

  const availabilityOptions = [
    'Weekdays',
    'Weekends',
    'Evenings',
    'Emergency Response (24/7)',
    'Flexible'
  ];

  useEffect(() => {
    fetchVolunteers();
    checkVolunteerStatus();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/volunteers`);
      setVolunteers(response.data.volunteers);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkVolunteerStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/volunteers`);
      const userVolunteer = response.data.volunteers.find(v => v.userEmail === user?.email);
      setIsRegistered(!!userVolunteer);
    } catch (error) {
      console.error('Error checking volunteer status:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(`${API_BASE_URL}/volunteers`, formData);
      setMessage({ type: 'success', text: 'Volunteer registration successful!' });
      setIsRegistered(true);
      fetchVolunteers();
      
      // Reset form
      setFormData({
        skills: '',
        preferredArea: '',
        availability: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error registering volunteer:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Registration failed' 
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const formatJoinDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard"
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-gray-900">QuakeConnect</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Network</h1>
          <p className="text-gray-600">
            Join our community of volunteers helping to respond to earthquake emergencies and support affected communities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            {!isRegistered ? (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-6 w-6 text-primary mr-2" />
                    Become a Volunteer
                  </CardTitle>
                  <CardDescription>
                    Register to join our emergency response volunteer network
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {message.text && (
                    <Alert className={`mb-6 ${message.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
                      <AlertDescription className={message.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                        {message.type === 'success' && <CheckCircle className="h-4 w-4 inline mr-2" />}
                        {message.text}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills & Qualifications</Label>
                      <Textarea
                        id="skills"
                        name="skills"
                        placeholder="List your relevant skills, certifications, and experience (e.g., First Aid certified, construction experience, bilingual, etc.)"
                        rows={3}
                        value={formData.skills}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="text-sm text-gray-500">
                        <p className="font-medium mb-1">Suggested skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {skillOptions.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredArea">Preferred Service Area</Label>
                      <Input
                        id="preferredArea"
                        name="preferredArea"
                        placeholder="e.g., Downtown area, specific neighborhoods, or 'Anywhere in the city'"
                        value={formData.preferredArea}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <select
                        id="availability"
                        name="availability"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formData.availability}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select your availability</option>
                        {availabilityOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Award className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-700">
                          <p className="font-semibold">Volunteer Benefits</p>
                          <ul className="mt-1 space-y-1">
                            <li>• Training and certification opportunities</li>
                            <li>• Community recognition and awards</li>
                            <li>• Networking with emergency professionals</li>
                            <li>• Making a real difference in your community</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={submitLoading}
                      className="w-full emergency-gradient text-white"
                    >
                      {submitLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Registering...
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4 mr-2" />
                          Register as Volunteer
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-green-200">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Thank You for Volunteering!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You are now registered as a volunteer in our emergency response network. 
                    We'll contact you when volunteer assistance is needed in your area.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Update Information
                    </Button>
                    <Button className="emergency-gradient text-white">
                      <Star className="h-4 w-4 mr-2" />
                      View Training Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Missions */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-6 w-6 text-primary mr-2" />
                  Active Missions
                </CardTitle>
                <CardDescription>
                  Current volunteer opportunities and emergency response activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-orange-900">Emergency Shelter Support</h4>
                        <p className="text-sm text-orange-700 mt-1">
                          Volunteers needed to help set up and manage emergency shelters in the downtown area.
                        </p>
                        <div className="flex items-center mt-2 text-sm text-orange-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Downtown Community Center</span>
                        </div>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        Urgent
                      </Badge>
                    </div>
                  </div>

                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-blue-900">Medical Supply Distribution</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Help distribute medical supplies and first aid kits to affected neighborhoods.
                        </p>
                        <div className="flex items-center mt-2 text-sm text-blue-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Various locations</span>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Active
                      </Badge>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <Button variant="outline">
                      View All Missions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Volunteer Network */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  Volunteer Network
                </CardTitle>
                <CardDescription>
                  {volunteers.length} active volunteers in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteers.slice(0, 5).map((volunteer) => (
                    <div key={volunteer._id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {volunteer.userName?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {volunteer.userName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {volunteer.preferredArea}
                        </p>
                        <p className="text-xs text-gray-400">
                          Joined {formatJoinDate(volunteer.createdAt)}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {volunteer.availability}
                      </Badge>
                    </div>
                  ))}
                  
                  {volunteers.length > 5 && (
                    <div className="text-center">
                      <Button variant="outline" size="sm">
                        View All Volunteers
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Volunteers</span>
                    <span className="font-semibold">{volunteers.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Missions</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="font-semibold text-green-600">&lt; 30 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Coverage Area</span>
                    <span className="font-semibold">50+ locations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Make a Difference
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Every volunteer makes our community more resilient and prepared for emergencies.
                </p>
                <Button size="sm" className="emergency-gradient text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolunteerPage;

