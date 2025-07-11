# QuakeConnect Deployment Guide

This guide provides step-by-step instructions for deploying QuakeConnect in different environments.

## 🚀 Quick Start (Development)

### 1. Prerequisites
```bash
# Install Node.js (v16+)
# Install MongoDB locally or set up MongoDB Atlas
# Install pnpm (recommended) or npm
```

### 2. Clone and Setup
```bash
# Navigate to the project directory
cd quakeconnect

# Setup Backend
cd backend
npm install
npm start &

# Setup Frontend (in new terminal)
cd ../frontend/quakeconnect-frontend
pnpm install
pnpm run dev --host
```

### 3. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🌐 Production Deployment

### Option 1: Railway (Recommended for Full-Stack)

#### Backend Deployment
1. Create a Railway account at railway.app
2. Connect your GitHub repository
3. Create a new project and select your backend folder
4. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   SESSION_SECRET=your_secret_key
   ```
5. Deploy automatically on push

#### Frontend Deployment
1. Build the frontend:
   ```bash
   cd frontend/quakeconnect-frontend
   pnpm run build
   ```
2. Deploy the `dist` folder to Vercel or Netlify
3. Update API base URL in frontend to point to Railway backend

### Option 2: Separate Hosting

#### Backend (Heroku/Railway/DigitalOcean)
```bash
# Add to package.json in backend
{
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": "16.x"
  }
}
```

#### Frontend (Vercel/Netlify)
```bash
# Build command
pnpm run build

# Output directory
dist

# Environment variables
VITE_API_URL=https://your-backend-url.com
```

### Option 3: Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/quakeconnect
    depends_on:
      - mongo

  frontend:
    build: ./frontend/quakeconnect-frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for Production)
1. Create account at mongodb.com/atlas
2. Create a new cluster
3. Add database user and whitelist IP addresses
4. Get connection string and update in backend

### Local MongoDB
```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB
mongod --dbpath /path/to/data/directory
```

## 🔧 Environment Configuration

### Backend Environment Variables
```bash
# .env file in backend directory
MONGODB_URI=mongodb://localhost:27017/quakeconnect
PORT=5000
SESSION_SECRET=your-super-secret-session-key
NODE_ENV=production
```

### Frontend Environment Variables
```bash
# .env file in frontend directory
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=QuakeConnect
```

## 🔒 Security Checklist

### Production Security
- [ ] Use HTTPS for all connections
- [ ] Set secure session secrets
- [ ] Configure CORS for specific domains
- [ ] Enable MongoDB authentication
- [ ] Set up proper firewall rules
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging

### CORS Configuration
```javascript
// In server.js
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

## 📊 Monitoring & Maintenance

### Health Checks
```javascript
// Add to server.js
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});
```

### Logging
```javascript
// Add logging middleware
const morgan = require('morgan');
app.use(morgan('combined'));
```

### Database Backups
```bash
# MongoDB backup
mongodump --uri="mongodb://localhost:27017/quakeconnect" --out=/backup/path

# Restore
mongorestore --uri="mongodb://localhost:27017/quakeconnect" /backup/path/quakeconnect
```

## 🚨 Emergency Deployment

For critical emergency situations:

1. **Quick Deploy Script**:
```bash
#!/bin/bash
# quick-deploy.sh
git pull origin main
cd backend && npm install && pm2 restart quakeconnect-backend
cd ../frontend/quakeconnect-frontend && pnpm install && pnpm run build
# Deploy built files to CDN/static hosting
```

2. **Rollback Plan**:
```bash
# Keep previous version tagged
git tag -a v1.0.0 -m "Stable version"
# Rollback if needed
git checkout v1.0.0
```

## 📱 Mobile Considerations

### Progressive Web App (PWA)
- Add service worker for offline functionality
- Configure manifest.json for mobile installation
- Optimize for emergency scenarios with poor connectivity

### Performance Optimization
- Enable gzip compression
- Optimize images and assets
- Use CDN for static files
- Implement caching strategies

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check backend CORS configuration
   - Verify frontend API URL

2. **Database Connection**:
   - Verify MongoDB is running
   - Check connection string format
   - Ensure network access

3. **Build Failures**:
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

### Debug Commands
```bash
# Check backend logs
npm run dev  # Development mode with detailed logs

# Check frontend build
pnpm run build --debug

# Test API endpoints
curl http://localhost:5000/api/health
```

## 📞 Support

For deployment issues:
- Check logs first
- Verify all environment variables
- Test locally before deploying
- Contact support: info@quakeconnect.org

---

**Remember: This is an emergency response system. Test thoroughly before production deployment.**

