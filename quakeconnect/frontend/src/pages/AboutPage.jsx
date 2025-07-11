import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  ArrowLeft,
  Target,
  Users,
  Globe,
  Heart,
  Award,
  Zap,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react';

const AboutPage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Rapid Response",
      description: "Enable citizens to quickly report earthquake incidents and receive immediate assistance coordination."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Network",
      description: "Connect volunteers, emergency responders, and citizens in a unified response network."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Real-time Alerts",
      description: "Deliver instant notifications about seismic activity and emergency situations in your area."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Volunteer Coordination",
      description: "Efficiently organize and deploy volunteer resources where they're needed most."
    }
  ];

  const stats = [
    { number: "24/7", label: "Emergency Response" },
    { number: "1000+", label: "Active Volunteers" },
    { number: "50+", label: "Cities Covered" },
    { number: "< 5min", label: "Average Response Time" }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Emergency Response Coordinator",
      description: "20+ years in disaster management and emergency response planning."
    },
    {
      name: "Michael Rodriguez",
      role: "Technology Director",
      description: "Expert in crisis communication systems and real-time data processing."
    },
    {
      name: "Dr. Emily Johnson",
      role: "Community Outreach Lead",
      description: "Specialist in community resilience and volunteer network development."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link 
                to={isAuthenticated ? "/dashboard" : "/"}
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                {isAuthenticated ? "Back to Dashboard" : "Back to Home"}
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-gray-900">QuakeConnect</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About QuakeConnect
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              QuakeConnect is a citizen-powered earthquake response system that connects communities, 
              volunteers, and emergency responders to create a more resilient and prepared society. 
              Our platform enables rapid incident reporting, real-time alerts, and coordinated response efforts.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To build resilient communities through technology-enabled citizen engagement, 
              rapid response coordination, and comprehensive emergency preparedness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Impact by Numbers</h2>
            <p className="text-xl opacity-90">
              See how QuakeConnect is making a difference in communities worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How QuakeConnect Works</h2>
            <p className="text-xl text-gray-600">
              A simple, three-step process to connect and respond
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Report & Alert</h3>
                <p className="text-gray-600">
                  Citizens report earthquake incidents through our mobile-friendly platform. 
                  Real-time alerts are sent to relevant responders and volunteers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Coordinate Response</h3>
                <p className="text-gray-600">
                  Emergency responders and volunteers receive location-based notifications 
                  and coordinate their response efforts through our dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Provide Aid</h3>
                <p className="text-gray-600">
                  Volunteers and responders provide immediate assistance, medical aid, 
                  and support to affected communities based on real-time needs assessment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">
              Dedicated professionals working to make communities safer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Built for Reliability
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                QuakeConnect is built using modern, reliable technologies designed to work 
                even in challenging conditions. Our system is optimized for speed, 
                accessibility, and resilience.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Real-time data processing and alerts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Mobile-first responsive design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Secure data handling and privacy protection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Offline capability for critical functions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Integration with emergency services</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </Card>
              <Card className="p-4 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">&lt; 2s</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </Card>
              <Card className="p-4 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">256-bit</div>
                <div className="text-sm text-gray-600">Encryption</div>
              </Card>
              <Card className="p-4 text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Have questions or want to learn more about QuakeConnect?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Line</h3>
                <p className="text-gray-600 mb-2">For immediate emergencies</p>
                <p className="text-primary font-semibold">911</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">General Inquiries</h3>
                <p className="text-gray-600 mb-2">Questions and support</p>
                <p className="text-primary font-semibold">info@quakeconnect.org</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Headquarters</h3>
                <p className="text-gray-600 mb-2">Visit our main office</p>
                <p className="text-primary font-semibold">San Francisco, CA</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make Your Community Safer?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of citizens, volunteers, and responders working together 
            to build more resilient communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link to="/">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                    Get Started Today
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Learn More
                </Button>
              </>
            ) : (
              <>
                <Link to="/report">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                    Report an Incident
                  </Button>
                </Link>
                <Link to="/volunteer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    Become a Volunteer
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

