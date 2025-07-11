# QuakeConnect - Citizen Earthquake Response System

A responsive, user-friendly website for earthquake emergency response that connects citizens, volunteers, and emergency responders to create a comprehensive earthquake response network.

## 🎯 Project Overview

QuakeConnect is a full-stack web application designed to:
- Allow citizens to report earthquake incidents
- Deliver real-time alerts about seismic activity
- Show a dashboard with real-time map data of reported incidents
- Enable users to sign up as volunteers and coordinate aid distribution
- Provide a comprehensive emergency response platform

## 🛠️ Technology Stack

### Frontend
- **React.js** - Modern JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Leaflet.js** - Interactive maps
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling

## 🎨 Design Features

### Theme & Colors
- **Primary Color**: Orange (#ff6b35) - Emergency/Safety theme
- **Background**: White
- **Text**: Black and dark gray
- **Accent Colors**: Green for success, Red for alerts

### Responsive Design
- Mobile-first approach
- Fully responsive for mobile, tablet, and desktop
- Touch-friendly interface
- Optimized for emergency situations

### User Interface
- Intuitive icons for reporting, alerts, and safety
- Card-based layout for alerts and reports
- Interactive map with pins and heatmaps
- Clean, professional emergency-themed design

## 📱 Pages & Features

### 1. Landing Page
- Introduction to QuakeConnect
- "Report Earthquake" and "Get Alerts" call-to-action buttons
- Map preview showing live earthquake zones
- Login and signup functionality
- Statistics display (24/7 response, 1000+ volunteers, 50+ cities)

### 2. Dashboard (Post-Login)
- Overview of system statistics
- Interactive map with real-time incident markers
- Recent reports and alerts
- Quick action buttons
- Navigation to all features

### 3. Report Page
- Incident reporting form with:
  - Location auto-detection
  - Incident type selection
  - Damage level assessment
  - Contact information
  - Photo/video upload capability
  - Description field

### 4. Alerts Page
- Real-time feed of earthquake alerts
- Location, time, and magnitude information
- Filtering by region and intensity
- Severity-based color coding
- Interactive alert details

### 5. Volunteer Page
- Volunteer registration form
- Skills and preferred area selection
- Active missions display
- Volunteer statistics and achievements
- Response time tracking

### 6. About Page
- Project mission and vision
- How the system works
- Team information
- Technical specifications
- Contact information

## 🗺️ Map Integration

### Features
- **Leaflet.js** integration for interactive maps
- Real-time incident markers with custom icons
- Alert markers with severity-based styling
- Popup information for each incident
- Auto-fitting bounds for optimal viewing
- Responsive map sizing

### Marker Types
- **Report Markers**: Orange circles for citizen reports
- **Alert Markers**: Red pulsing circles for active alerts
- **Custom Popups**: Detailed information for each marker

## 🔐 Authentication System

### Simple Node.js + MongoDB Authentication
- No JWT tokens - uses express-session
- Password hashing with bcryptjs
- Session-based user management
- Role-based access (Citizen, Volunteer, Emergency Responder)
- Secure password storage

## 📁 Project Structure

```
quakeconnect/
├── backend/
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   └── uploads/               # File upload directory
├── frontend/
│   └── quakeconnect-frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/        # Reusable UI components
│       │   │   └── Map.jsx    # Map component
│       │   ├── contexts/
│       │   │   └── AuthContext.jsx
│       │   ├── pages/
│       │   │   ├── LandingPage.jsx
│       │   │   ├── Dashboard.jsx
│       │   │   ├── ReportPage.jsx
│       │   │   ├── AlertsPage.jsx
│       │   │   ├── VolunteerPage.jsx
│       │   │   └── AboutPage.jsx
│       │   ├── assets/        # Images and static files
│       │   └── App.jsx        # Main app component
│       ├── index.html
│       ├── package.json       # Frontend dependencies
│       └── tailwind.config.js
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or pnpm package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd quakeconnect/backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB:
   - Install MongoDB locally or create a MongoDB Atlas account
   - Update the MongoDB connection string in `server.js` if needed
   - Default connection: `mongodb://localhost:27017/quakeconnect`

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd quakeconnect/frontend/quakeconnect-frontend
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm run dev --host
# or
npm run dev -- --host
```

The frontend will run on `http://localhost:5173`

### Database Setup

The application will automatically create the necessary collections in MongoDB:
- `users` - User accounts and authentication
- `reports` - Earthquake incident reports
- `alerts` - Emergency alerts and notifications
- `volunteers` - Volunteer registrations and information

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create new report
- `GET /api/reports/:id` - Get specific report

### Alerts
- `GET /api/alerts` - Get all alerts
- `POST /api/alerts` - Create new alert (admin only)

### Volunteers
- `GET /api/volunteers` - Get all volunteers
- `POST /api/volunteers` - Register as volunteer

## 🌐 Deployment Options

### Frontend Deployment
- Build the React app: `pnpm run build`
- Deploy the `dist` folder to any static hosting service
- Recommended: Vercel, Netlify, or GitHub Pages

### Backend Deployment
- Deploy to cloud platforms like Heroku, Railway, or DigitalOcean
- Set up MongoDB Atlas for production database
- Configure environment variables for production

### Full-Stack Deployment
- Use platforms like Railway or Render for full-stack deployment
- Configure CORS settings for production domains
- Set up SSL certificates for secure connections

## 🔒 Security Features

- Password hashing with bcryptjs
- Session-based authentication
- CORS protection
- Input validation and sanitization
- Secure file upload handling
- Protection against common web vulnerabilities

## 📱 Mobile Optimization

- Touch-friendly interface design
- Responsive breakpoints for all screen sizes
- Mobile-first CSS approach
- Optimized map interactions for touch devices
- Fast loading times on mobile networks

## 🎯 Target Audience

- **General Public**: Citizens reporting earthquake incidents
- **Volunteers**: Community members offering assistance
- **NGO Workers**: Organizations coordinating relief efforts
- **Emergency Responders**: Professional emergency services
- **Local Authorities**: Government emergency management

## 🤝 Contributing

This project is designed to be easily extensible. Key areas for enhancement:
- Real-time notifications with WebSockets
- Integration with official earthquake monitoring APIs
- Advanced mapping features and layers
- Mobile app development
- Multi-language support

## 📞 Support

For questions or support:
- Email: info@quakeconnect.org
- Emergency: 911
- Location: San Francisco, CA

## 📄 License

This project is developed for emergency response purposes and community safety.

---

**Built with ❤️ for community resilience and emergency preparedness**

