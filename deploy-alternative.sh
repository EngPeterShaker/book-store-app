#!/bin/bash

# Alternative Deployment Script for BookStore App
# Deploys to platforms without SSO restrictions

echo "🚀 Alternative Deployment Options for BookStore App"
echo ""

# Option 1: Netlify (Frontend) + Railway (Backend)
echo "📋 Option 1: Netlify + Railway"
echo "Frontend: npx netlify-cli deploy --prod --dir=build"
echo "Backend: railway deploy"
echo ""

# Option 2: Render (Full Stack)
echo "📋 Option 2: Render (Connect GitHub repo)"
echo "1. Connect your GitHub repo to Render"
echo "2. Deploy backend as Web Service"
echo "3. Deploy frontend as Static Site"
echo ""

# Option 3: DigitalOcean App Platform
echo "📋 Option 3: DigitalOcean App Platform"
echo "1. Connect GitHub repo to DigitalOcean"
echo "2. Auto-deploy both frontend and backend"
echo ""

# Option 4: AWS Amplify (Frontend) + Lambda (Backend)
echo "📋 Option 4: AWS (Already configured)"
echo "cd backend && yarn sls:deploy --stage production"
echo "Frontend: AWS Amplify or S3 + CloudFront"
echo ""

# Test local deployment first
echo "🧪 Test Locally First:"
echo "Backend: cd backend && yarn start:dev"
echo "Frontend: cd frontend && npm start"
echo ""
echo "Access your app at: http://localhost:3000"
echo "API available at: http://localhost:3001"
