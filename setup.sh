#!/bin/bash

# ===========================================
# FitForge Frontend Setup Script
# ===========================================
# This script sets up the development environment for new team members

set -e  # Exit on error

echo "==========================================="
echo "🚀 FitForge Frontend Setup"
echo "==========================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "ℹ️  $1"
}

# Step 1: Check prerequisites
echo "📋 Step 1/4: Checking prerequisites..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js $NODE_VERSION found"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

NPM_VERSION=$(npm --version)
print_success "npm $NPM_VERSION found"

echo ""

# Step 2: Install dependencies
echo "📥 Step 2/4: Installing dependencies..."
echo ""

npm install

print_success "Dependencies installed"

echo ""

# Step 3: Set up environment variables
echo "🔧 Step 3/4: Setting up environment variables..."
echo ""

if [ -f ".env" ]; then
    print_warning ".env file already exists. Skipping creation."
    print_info "If you need to reset it, copy from .env.example"
else
    cp .env.example .env
    print_success ".env file created from .env.example"
    print_info "Default API URL: http://localhost:8000"
fi

echo ""

# Step 4: Verify setup
echo "✅ Step 4/4: Verifying setup..."
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    print_success "node_modules directory found"
else
    print_error "node_modules not found. Dependencies may not have installed correctly."
    exit 1
fi

# Check if .env exists
if [ -f ".env" ]; then
    print_success ".env file exists"
else
    print_error ".env file not found."
    exit 1
fi

echo ""
echo "==========================================="
echo "✅ Setup Complete!"
echo "==========================================="
echo ""
echo "🎉 Your FitForge frontend is ready to go!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Make sure the backend is running:"
echo "   cd ../fitforge-backend"
echo "   source venv/bin/activate"
echo "   uvicorn app.main:app --reload"
echo ""
echo "2. Start the development server:"
echo "   npm run dev"
echo ""
echo "3. Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "📚 Useful commands:"
echo ""
echo "  • Start dev server:    npm run dev"
echo "  • Build for production: npm run build"
echo "  • Run linter:          npm run lint"
echo "  • Run tests:           npm run test"
echo ""
echo "📖 Check out:"
echo "  • README.md - Project overview and documentation"
echo "  • Backend API docs - http://localhost:8000/docs"
echo ""
echo "Happy coding! 🚀"
echo ""
