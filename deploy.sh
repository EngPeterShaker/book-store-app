#!/bin/bash

# BookStore App Deployment Script
# Usage: ./deploy.sh [aws|vercel] [stage]

PLATFORM=${1:-vercel}
STAGE=${2:-dev}

echo "🚀 Deploying BookStore App to $PLATFORM ($STAGE environment)"

case $PLATFORM in
  "aws")
    echo "📦 Deploying to AWS Lambda..."
    
    # Build and deploy backend
    echo "🔨 Building backend..."
    cd backend
    yarn build
    
    echo "☁️ Deploying to AWS Lambda..."
    if [ "$STAGE" = "prod" ]; then
      npx serverless deploy --stage production
    else
      npx serverless deploy --stage dev
    fi
    
    # Get the API Gateway URL
    API_URL=$(npx serverless info --stage $STAGE | grep -o 'https://[^[:space:]]*')
    echo "✅ Backend deployed to: $API_URL"
    
    # Build and deploy frontend
    cd ../frontend
    echo "🔨 Building frontend with API_URL: $API_URL"
    REACT_APP_API_URL=$API_URL yarn build
    
    echo "📤 Deploying frontend to S3..."
    # Note: You'll need to replace with your actual S3 bucket name
    aws s3 sync build/ s3://bookstore-frontend-$STAGE --delete
    
    echo "✅ Deployment complete!"
    echo "Frontend: https://bookstore-frontend-$STAGE.s3-website-us-east-1.amazonaws.com"
    echo "Backend: $API_URL"
    ;;
    
  "vercel")
    echo "📦 Deploying to Vercel..."
    
    # Deploy backend
    echo "☁️ Deploying backend to Vercel..."
    cd backend
    yarn build
    
    if [ "$STAGE" = "prod" ]; then
      vercel --prod --yes
    else
      vercel --yes
    fi
    
    # Get backend URL (you'll need to capture this from Vercel output)
    echo "📝 Please note the backend URL from the Vercel output above"
    
    # Deploy frontend
    cd ../frontend
    echo "☁️ Deploying frontend to Vercel..."
    
    if [ "$STAGE" = "prod" ]; then
      vercel --prod --yes
    else
      vercel --yes
    fi
    
    echo "✅ Deployment complete!"
    echo "Don't forget to set REACT_APP_API_URL in Vercel dashboard"
    ;;
    
  *)
    echo "❌ Invalid platform. Use 'aws' or 'vercel'"
    exit 1
    ;;
esac

echo "🎉 Deployment finished!"
