const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Talentform-project';
let db;

// Connect to MongoDB
MongoClient.connect(MONGODB_URI)
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db('quakeconnect');
  })
  .catch(error => console.error('MongoDB connection error:', error));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'quakeconnect-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Create uploads directory
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Authentication required' });
  }
};

// Routes

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name, userType } = req.body;
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      email,
      password: hashedPassword,
      name,
      userType: userType || 'citizen',
      createdAt: new Date()
    };
    
    const result = await db.collection('users').insertOne(user);
    
    // Set session
    req.session.userId = result.insertedId;
    req.session.userEmail = email;
    req.session.userName = name;
    req.session.userType = userType || 'citizen';
    
    res.json({ 
      message: 'User registered successfully',
      user: { id: result.insertedId, email, name, userType: userType || 'citizen' }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Set session
    req.session.userId = user._id;
    req.session.userEmail = user.email;
    req.session.userName = user.name;
    req.session.userType = user.userType;
    
    res.json({ 
      message: 'Login successful',
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name, 
        userType: user.userType 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// User Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});

// Get current user
app.get('/api/user', requireAuth, async (req, res) => {
  try {
    const user = await db.collection('users').findOne(
      { _id: req.session.userId },
      { projection: { password: 0 } }
    );
    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Report earthquake incident
app.post('/api/reports', requireAuth, upload.single('media'), async (req, res) => {
  try {
    const { location, incidentType, damageLevel, description, latitude, longitude } = req.body;
    
    const report = {
      userId: req.session.userId,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      location,
      incidentType,
      damageLevel,
      description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      mediaFile: req.file ? req.file.filename : null,
      status: 'pending',
      createdAt: new Date()
    };
    
    const result = await db.collection('reports').insertOne(report);
    res.json({ 
      message: 'Report submitted successfully',
      reportId: result.insertedId 
    });
  } catch (error) {
    console.error('Report submission error:', error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

// Get all reports
app.get('/api/reports', requireAuth, async (req, res) => {
  try {
    const reports = await db.collection('reports')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ reports });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ error: 'Failed to get reports' });
  }
});

// Create alert
app.post('/api/alerts', requireAuth, async (req, res) => {
  try {
    const { title, message, severity, location, latitude, longitude } = req.body;
    
    const alert = {
      title,
      message,
      severity,
      location,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      createdBy: req.session.userId,
      createdAt: new Date(),
      isActive: true
    };
    
    const result = await db.collection('alerts').insertOne(alert);
    res.json({ 
      message: 'Alert created successfully',
      alertId: result.insertedId 
    });
  } catch (error) {
    console.error('Alert creation error:', error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
});

// Get all alerts
app.get('/api/alerts', async (req, res) => {
  try {
    const alerts = await db.collection('alerts')
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ alerts });
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ error: 'Failed to get alerts' });
  }
});

// Volunteer registration
app.post('/api/volunteers', requireAuth, async (req, res) => {
  try {
    const { skills, preferredArea, availability, phone } = req.body;
    
    const volunteer = {
      userId: req.session.userId,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      skills,
      preferredArea,
      availability,
      phone,
      status: 'active',
      createdAt: new Date()
    };
    
    const result = await db.collection('volunteers').insertOne(volunteer);
    res.json({ 
      message: 'Volunteer registration successful',
      volunteerId: result.insertedId 
    });
  } catch (error) {
    console.error('Volunteer registration error:', error);
    res.status(500).json({ error: 'Failed to register volunteer' });
  }
});

// Get all volunteers
app.get('/api/volunteers', requireAuth, async (req, res) => {
  try {
    const volunteers = await db.collection('volunteers')
      .find({ status: 'active' })
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ volunteers });
  } catch (error) {
    console.error('Get volunteers error:', error);
    res.status(500).json({ error: 'Failed to get volunteers' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

