#!/bin/bash

# QuakeConnect Setup Script
# This script helps you set up the QuakeConnect application quickly

echo "🌍 QuakeConnect - Citizen Earthquake Response System Setup"
echo "=========================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB or set up MongoDB Atlas."
    echo "   Local MongoDB: mongod --dbpath /path/to/data"
    echo "   MongoDB Atlas: https://www.mongodb.com/atlas"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ MongoDB is running"
fi

# Setup Backend
echo ""
echo "🔧 Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install backend dependencies"
        exit 1
    fi
else
    echo "✅ Backend dependencies already installed"
fi

# Create uploads directory
mkdir -p uploads
echo "✅ Created uploads directory"

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend..."
cd ../frontend/quakeconnect-frontend

# Check if pnpm is available, otherwise use npm
if command -v pnpm &> /dev/null; then
    PACKAGE_MANAGER="pnpm"
else
    PACKAGE_MANAGER="npm"
    echo "📝 pnpm not found, using npm"
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies with $PACKAGE_MANAGER..."
    $PACKAGE_MANAGER install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install frontend dependencies"
        exit 1
    fi
else
    echo "✅ Frontend dependencies already installed"
fi

# Go back to root directory
cd ../..

# Create environment files
echo ""
echo "⚙️  Creating environment configuration..."

# Backend .env
if [ ! -f "backend/.env" ]; then
    cat > backend/.env << EOF
MONGODB_URI=mongodb://localhost:27017/quakeconnect
PORT=5000
SESSION_SECRET=quakeconnect-secret-key-change-in-production
NODE_ENV=development
EOF
    echo "✅ Created backend/.env"
else
    echo "✅ Backend .env already exists"
fi

# Frontend .env
if [ ! -f "frontend/quakeconnect-frontend/.env" ]; then
    cat > frontend/quakeconnect-frontend/.env << EOF
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=QuakeConnect
EOF
    echo "✅ Created frontend/.env"
else
    echo "✅ Frontend .env already exists"
fi

# Create start scripts
echo ""
echo "📝 Creating start scripts..."

# Start backend script
cat > start-backend.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting QuakeConnect Backend..."
cd backend
npm start
EOF
chmod +x start-backend.sh

# Start frontend script
cat > start-frontend.sh << 'EOF'
#!/bin/bash
echo "🎨 Starting QuakeConnect Frontend..."
cd frontend/quakeconnect-frontend
if command -v pnpm &> /dev/null; then
    pnpm run dev --host
else
    npm run dev -- --host
fi
EOF
chmod +x start-frontend.sh

# Start both script
cat > start-all.sh << 'EOF'
#!/bin/bash
echo "🌍 Starting QuakeConnect (Full Stack)..."

# Start backend in background
echo "🚀 Starting backend..."
cd backend
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend..."
cd ../frontend/quakeconnect-frontend
if command -v pnpm &> /dev/null; then
    pnpm run dev --host
else
    npm run dev -- --host
fi

# Kill backend when frontend stops
kill $BACKEND_PID 2>/dev/null
EOF
chmod +x start-all.sh

echo "✅ Created start scripts"

# Setup complete
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📋 Next Steps:"
echo "1. Make sure MongoDB is running"
echo "2. Start the application:"
echo "   • Full stack: ./start-all.sh"
echo "   • Backend only: ./start-backend.sh"
echo "   • Frontend only: ./start-frontend.sh"
echo ""
echo "🌐 Access URLs:"
echo "   • Frontend: http://localhost:5173"
echo "   • Backend API: http://localhost:5000"
echo ""
echo "📚 Documentation:"
echo "   • README.md - Complete project documentation"
echo "   • DEPLOYMENT.md - Production deployment guide"
echo ""
echo "🆘 Emergency Features:"
echo "   • Report incidents"
echo "   • Real-time alerts"
echo "   • Volunteer coordination"
echo "   • Interactive emergency map"
echo ""
echo "Happy coding! 🚀"

