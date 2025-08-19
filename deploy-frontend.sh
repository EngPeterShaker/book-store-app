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

echo "🚀 Starting Frontend Deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed. Please install it first:"
    echo "yarn global add vercel"
    exit 1
fi

# Navigate to frontend directory
cd frontend

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    print_error "vercel.json not found in frontend directory"
    exit 1
fi

print_info "Building frontend..."
corepack yarn build

if [ $? -ne 0 ]; then
    print_error "Frontend build failed"
    exit 1
fi

print_info "Deploying frontend to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    print_success "Frontend deployment completed successfully!"
    print_info "Remember to update REACT_APP_API_URL to point to your backend URL"
else
    print_error "Frontend deployment failed"
    exit 1
fi
