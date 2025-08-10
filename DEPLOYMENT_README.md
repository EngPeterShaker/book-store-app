# 🚀 Book Store App - Complete Deployment Guide

## Overview
This guide covers the complete setup for auto-deploying your book store app to Vercel with GitHub integration, automated testing, and production-ready configurations.

## ✨ What's Been Set Up

### 1. **Vercel Configuration**
- ✅ Root `vercel.json` with proper build commands
- ✅ Backend and frontend build configurations
- ✅ API routing setup
- ✅ Production environment handling

### 2. **Backend Production Setup**
- ✅ Database configuration for production
- ✅ Environment-aware TypeORM setup
- ✅ Production seed script
- ✅ Vercel entry point (`vercel.ts`)
- ✅ Build scripts for Vercel

### 3. **Frontend Production Setup**
- ✅ Auto-detection of production environment
- ✅ Dynamic API URL configuration
- ✅ Build optimization for Vercel

### 4. **Automation Tools**
- ✅ GitHub Actions workflow for CI/CD
- ✅ Deployment script (`deploy-vercel.sh`)
- ✅ Environment variable management

## 🚀 Quick Start Deployment

### Prerequisites
1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally
   ```bash
   npm i -g vercel
   ```
3. **GitHub Repository**: Ensure your code is pushed to GitHub

### Step 1: Link Your Project
```bash
# From your project root
vercel link
```

### Step 2: Set Environment Variables
```bash
# Add database configuration
vercel env add DB_HOST production
vercel env add DB_PASSWORD production
vercel env add DB_USERNAME production
vercel env add DB_NAME production
vercel env add DB_SSL production
```

### Step 3: Deploy
```bash
# Use the deployment script
./deploy-vercel.sh

# Or deploy manually
vercel --prod
```

## 🔧 Configuration Details

### Environment Variables Required
```bash
# Database
DB_HOST=your-postgres-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
DB_SSL=true

# Environment
NODE_ENV=production
```

### Build Process
1. **Backend**: `npm run vercel-build` → `dist/vercel.js`
2. **Frontend**: `npm run build` → `build/` directory
3. **Deployment**: Vercel serves both from the same domain

## 📊 GitHub Actions Integration

### Automatic Deployment
- **Push to main**: Triggers automatic deployment
- **Pull Request**: Runs tests only
- **Deployment**: Only after successful tests

### Setup GitHub Secrets
1. Go to your GitHub repository
2. **Settings** → **Secrets and variables** → **Actions**
3. Add `VERCEL_TOKEN`:
   - Get token from [Vercel Account Settings](https://vercel.com/account/tokens)
   - Add as repository secret

## 🛠️ Available Commands

### Deployment Script
```bash
./deploy-vercel.sh [command]

Commands:
  deploy     Deploy to Vercel (default)
  status     Check deployment status
  logs       Show deployment logs
  open       Open project in browser
  env        Show environment variables
  add-env    Add environment variable
  help       Show help message
```

### Vercel CLI Commands
```bash
vercel --prod          # Deploy to production
vercel ls              # List deployments
vercel logs            # Show logs
vercel open            # Open in browser
vercel env ls          # List environment variables
```

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Recommended)
1. **Vercel Dashboard** → **Storage** → **Create Database**
2. Choose **Postgres**
3. Copy connection details to environment variables

### Option 2: External Database
- **Supabase**: Free tier available
- **Railway**: Easy PostgreSQL hosting
- **AWS RDS**: Enterprise solution

## 🔍 Monitoring & Debugging

### Vercel Dashboard
- **Functions**: Monitor backend performance
- **Analytics**: Track frontend usage
- **Logs**: View function execution logs

### Local Testing
```bash
# Test backend locally
cd backend
npm run start:dev

# Test frontend locally
cd frontend
npm start

# Test production build
cd backend && npm run vercel-build
cd frontend && npm run build
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check build logs
vercel logs

# Verify dependencies
npm install
cd backend && npm install
cd frontend && npm install
```

#### Database Connection Issues
- Verify environment variables are set
- Check database accessibility from Vercel
- Ensure SSL is configured correctly

#### Frontend API Issues
- Verify API routes are working
- Check CORS configuration
- Ensure environment variables are correct

### Debug Commands
```bash
# Check deployment status
./deploy-vercel.sh status

# View recent logs
./deploy-vercel.sh logs

# Verify environment
./deploy-vercel.sh env
```

## 📈 Performance Optimization

### Backend
- **Function timeout**: Set to 30 seconds
- **Memory**: Optimize database queries
- **Caching**: Implement Redis if needed

### Frontend
- **Build optimization**: React production build
- **Static assets**: Proper caching headers
- **Bundle size**: Monitor with build analyzer

## 🔐 Security Considerations

- ✅ Environment variables encrypted
- ✅ Database credentials secure
- ✅ CORS properly configured
- ✅ Input validation enabled
- ✅ No sensitive data in code

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [NestJS Deployment](https://docs.nestjs.com/deployment)
- [React Production Build](https://create-react-app.dev/docs/production-build)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review Vercel deployment logs
3. Verify environment variables
4. Test locally first
5. Check GitHub Actions workflow

---

**Happy Deploying! 🎉**
