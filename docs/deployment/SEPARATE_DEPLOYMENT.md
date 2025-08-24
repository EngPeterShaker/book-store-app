# Separate Deployment Guide

This project is configured for **separate deployments** on Vercel, meaning your backend (NestJS API) and frontend (React app) will be deployed as separate projects with different URLs.

## 🏗️ **Architecture**

- **Backend**: NestJS API deployed as serverless functions
- **Frontend**: React app deployed as static files
- **Database**: PostgreSQL (configured separately)

## 🚀 **Deployment Steps**

### **Step 1: Deploy Backend**

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Deploy using the script:**
   ```bash
   ./deploy-backend.sh
   ```
   
   Or manually:
   ```bash
   corepack yarn build
   vercel --prod
   ```

3. **Note the backend URL** (e.g., `https://your-backend.vercel.app`)

### **Step 2: Deploy Frontend**

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Set the backend API URL:**
   ```bash
   # In Vercel dashboard or via environment variable
   REACT_APP_API_URL=https://your-backend.vercel.app
   ```

3. **Deploy using the script:**
   ```bash
   ./deploy-frontend.sh
   ```
   
   Or manually:
   ```bash
   corepack yarn build
   vercel --prod
   ```

## 🔧 **Configuration Files**

### **Backend (`backend/vercel.json`)**
```json
{
  "version": 2,
  "buildCommand": "yarn vercel-build",
  "installCommand": "yarn install",
  "functions": {
    "dist/vercel.js": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/dist/vercel.js"
    }
  ]
}
```

### **Frontend (`frontend/vercel.json`)**
```json
{
  "version": 2,
  "buildCommand": "yarn build",
  "installCommand": "yarn install",
  "outputDirectory": "build",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🌍 **Environment Variables**

### **Backend Environment Variables**
Set these in your **backend Vercel project**:
```bash
DB_HOST=your-database-host
DB_PORT=5432
DB_USERNAME=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
DB_SSL=true
NODE_ENV=production
```

### **Frontend Environment Variables**
Set these in your **frontend Vercel project**:
```bash
REACT_APP_API_URL=https://your-backend.vercel.app
NODE_ENV=production
```

## 🔗 **Connecting Frontend to Backend**

1. **Deploy backend first** and note the URL
2. **Set `REACT_APP_API_URL`** in frontend environment variables
3. **Deploy frontend** - it will now call your backend API

## 📱 **Testing**

- **Backend**: Test API endpoints at `https://your-backend.vercel.app/books`
- **Frontend**: Visit `https://your-frontend.vercel.app` and verify it connects to backend

## 🚨 **Important Notes**

- **Separate Projects**: Backend and frontend are completely separate Vercel projects
- **Different URLs**: They will have different domains/URLs
- **CORS**: Backend is configured to allow requests from any origin
- **Database**: Configure database connection in backend environment variables

## 🆘 **Troubleshooting**

### **Frontend can't connect to backend:**
- Verify `REACT_APP_API_URL` is set correctly
- Check backend is deployed and accessible
- Ensure backend CORS settings allow frontend domain

### **Backend deployment fails:**
- Check database connection settings
- Verify all environment variables are set
- Check build logs for TypeScript errors

### **Frontend deployment fails:**
- Verify `yarn build` works locally
- Check for missing dependencies
- Ensure `vercel.json` is in frontend directory
