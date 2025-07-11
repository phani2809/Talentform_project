import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Upload,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Camera
} from 'lucide-react';

const ReportPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    location: '',
    latitude: '',
    longitude: '',
    incidentType: '',
    damageLevel: '',
    description: '',
    mediaFile: null
  });

  const API_BASE_URL = 'http://localhost:5000/api';

  const incidentTypes = [
    'Ground Shaking',
    'Building Damage',
    'Infrastructure Damage',
    'Landslide',
    'Liquefaction',
    'Fire',
    'Injury/Medical Emergency',
    'Trapped Person',
    'Utility Outage',
    'Other'
  ];

  const damageLevels = [
    'Minor',
    'Moderate',
    'Severe',
    'Critical'
  ];

  useEffect(() => {
    // Auto-detect location on component mount
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            latitude: latitude.toString(),
            longitude: longitude.toString()
          }));
          
          // Reverse geocoding to get address
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
            );
            // For demo purposes, we'll use a placeholder address
            setFormData(prev => ({
              ...prev,
              location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
            }));
          } catch (error) {
            setFormData(prev => ({
              ...prev,
              location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
            }));
          }
          setLocationLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationLoading(false);
          setMessage({ 
            type: 'error', 
            text: 'Unable to get your location. Please enter it manually.' 
          });
        }
      );
    } else {
      setLocationLoading(false);
      setMessage({ 
        type: 'error', 
        text: 'Geolocation is not supported by this browser.' 
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 10MB' });
        return;
      }
      setFormData(prev => ({
        ...prev,
        mediaFile: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = new FormData();
      submitData.append('location', formData.location);
      submitData.append('latitude', formData.latitude);
      submitData.append('longitude', formData.longitude);
      submitData.append('incidentType', formData.incidentType);
      submitData.append('damageLevel', formData.damageLevel);
      submitData.append('description', formData.description);
      
      if (formData.mediaFile) {
        submitData.append('media', formData.mediaFile);
      }

      const response = await axios.post(`${API_BASE_URL}/reports`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ type: 'success', text: 'Report submitted successfully!' });
      
      // Reset form
      setFormData({
        location: '',
        latitude: '',
        longitude: '',
        incidentType: '',
        damageLevel: '',
        description: '',
        mediaFile: null
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error submitting report:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to submit report' 
      });
    } finally {
      setLoading(false);
    }
  };

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
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Earthquake Incident</h1>
          <p className="text-gray-600">
            Help your community by reporting earthquake-related incidents, damage, or hazards.
            Your report will be shared with emergency responders and volunteers.
          </p>
        </div>

        {message.text && (
          <Alert className={`mb-6 ${message.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
            <AlertDescription className={message.type === 'error' ? 'text-red-700' : 'text-green-700'}>
              {message.type === 'success' && <CheckCircle className="h-4 w-4 inline mr-2" />}
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-primary mr-2" />
              Incident Report Form
            </CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help emergency responders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Location Information</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={getCurrentLocation}
                    disabled={locationLoading}
                    className="flex items-center space-x-2"
                  >
                    {locationLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4" />
                    )}
                    <span>{locationLoading ? 'Detecting...' : 'Auto-detect'}</span>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <Label htmlFor="location">Address/Description</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., 123 Main St, City"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      step="any"
                      placeholder="e.g., 37.7749"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      step="any"
                      placeholder="e.g., -122.4194"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Incident Details */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Incident Details</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="incidentType">Type of Incident</Label>
                    <select
                      id="incidentType"
                      name="incidentType"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={formData.incidentType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select incident type</option>
                      {incidentTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="damageLevel">Damage Level</Label>
                    <select
                      id="damageLevel"
                      name="damageLevel"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={formData.damageLevel}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select damage level</option>
                      {damageLevels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Please provide detailed information about the incident, including any injuries, hazards, or immediate needs..."
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Media Upload */}
              <div className="space-y-2">
                <Label htmlFor="media">Photo/Video (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    id="media"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="media" className="cursor-pointer">
                    <div className="space-y-2">
                      {formData.mediaFile ? (
                        <div className="flex items-center justify-center space-x-2 text-green-600">
                          <CheckCircle className="h-6 w-6" />
                          <span>{formData.mediaFile.name}</span>
                        </div>
                      ) : (
                        <>
                          <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                          <div className="text-gray-600">
                            <span className="font-medium text-primary">Click to upload</span> or drag and drop
                          </div>
                          <p className="text-sm text-gray-500">PNG, JPG, MP4 up to 10MB</p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="text-sm text-red-700">
                    <p className="font-semibold">Emergency Notice</p>
                    <p>If this is a life-threatening emergency, call 911 immediately. This form is for reporting earthquake-related incidents to help coordinate community response efforts.</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="emergency-gradient text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReportPage;

