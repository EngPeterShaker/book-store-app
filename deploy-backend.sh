#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo "🚀 Starting Backend Deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed. Please install it first:"
    echo "yarn global add vercel"
    exit 1
fi

# Navigate to backend directory
cd backend

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    print_error "vercel.json not found in backend directory"
    exit 1
fi

print_info "Building backend..."
corepack yarn build

if [ $? -ne 0 ]; then
    print_error "Backend build failed"
    exit 1
fi

print_info "Deploying backend to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    print_success "Backend deployment completed successfully!"
    print_info "Backend is now running with mock data (DB_DISABLED=true)"
    print_info "Backend URL: https://backend-nlz3qt6e9-engpetershakers-projects.vercel.app"
    print_info "Test API: curl https://backend-nlz3qt6e9-engpetershakers-projects.vercel.app/books"
    print_info "You can now deploy your frontend separately"
else
    print_error "Backend deployment failed"
    exit 1
fi
