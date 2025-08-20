#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo "🚀 Deploying Book Store App with Separate Architecture..."

# Deploy Backend First
print_info "Step 1: Deploying Backend..."
cd backend
corepack yarn build
if [ $? -ne 0 ]; then
    print_error "Backend build failed"
    exit 1
fi

BACKEND_URL=$(vercel --prod 2>&1 | grep -o 'https://backend-[^[:space:]]*' | head -1)
if [ -z "$BACKEND_URL" ]; then
    print_error "Failed to get backend URL"
    exit 1
fi

print_success "Backend deployed: $BACKEND_URL"

# Test Backend
print_info "Testing backend API..."
BOOK_COUNT=$(curl -s "$BACKEND_URL/books" | jq length 2>/dev/null)
if [ "$BOOK_COUNT" != "3" ]; then
    print_error "Backend API test failed"
    exit 1
fi
print_success "Backend API working: $BOOK_COUNT books available"

# Update Frontend Configuration
print_info "Step 2: Updating Frontend Configuration..."
cd ../frontend
cp vercel.json vercel.json.backup

# Update vercel.json with new backend URL
cat > vercel.json << EOF
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/\$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_API_URL": "$BACKEND_URL"
  }
}
EOF

# Deploy Frontend
print_info "Step 3: Deploying Frontend..."
corepack yarn build
if [ $? -ne 0 ]; then
    print_error "Frontend build failed"
    exit 1
fi

FRONTEND_URL=$(vercel --prod 2>&1 | grep -o 'https://frontend-[^[:space:]]*' | head -1)
if [ -z "$FRONTEND_URL" ]; then
    print_error "Failed to get frontend URL"
    exit 1
fi

print_success "Frontend deployed: $FRONTEND_URL"

# Final Summary
echo ""
echo "✅ DEPLOYMENT COMPLETE - SEPARATE ARCHITECTURE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_success "Backend API: $BACKEND_URL"
print_success "Frontend App: $FRONTEND_URL" 
print_success "Test API: curl $BACKEND_URL/books"
echo ""
print_info "Frontend is configured to use the separate backend"
print_info "CORS is configured to allow frontend domain"
echo ""
