# 🚀 Backend Deployment Guide - FIXED

This guide covers the fixed backend deployment process for both Vercel and AWS Lambda after resolving the critical deployment issues.

## ✅ Issues Fixed

1. **Vercel Configuration Mismatch**: Fixed `vercel.json` to properly route requests
2. **Database Environment Variables**: Resolved inconsistency between `DB_NAME` and `DB_DATABASE`
3. **NestJS Integration**: Replaced mock API handler with proper NestJS integration  
4. **Build Configuration**: Fixed TypeScript compilation and output directory structure
5. **Runtime Version**: Updated serverless configuration to Node.js 20
6. **Database Synchronization**: Enabled auto-sync for production deployment

## 🔧 Pre-Deployment Setup

### 1. Validate Configuration
```bash
cd backend
yarn validate:deployment
```

This command will:
- Build the application
- Check all required files exist
- Validate configuration files
- Verify dependencies

### 2. Environment Variables

#### For Vercel Deployment:
Set these in your Vercel dashboard or via CLI:
```bash
DB_HOST=your-database-host
DB_PORT=5432
DB_USERNAME=your-username  
DB_PASSWORD=your-password
DB_DATABASE=your-database-name
NODE_ENV=production
```

#### For AWS Lambda Deployment:
Create `.env.production` or set environment variables:
```bash
export DB_HOST=your-database-host
export DB_PORT=5432
export DB_USERNAME=your-username
export DB_PASSWORD=your-password
export DB_DATABASE=your-database-name
```

## 🚀 Deployment Options

### Option 1: Vercel Deployment

```bash
cd backend

# Build and validate
yarn validate:deployment

# Deploy to Vercel
vercel --prod
```

The deployment uses:
- **Entry Point**: `api/[...].ts` → `src/vercel.ts`
- **Framework**: NestJS with Express adapter
- **Runtime**: Node.js (automatic)
- **Database**: Auto-sync enabled, seeding on first run

### Option 2: AWS Lambda Deployment

```bash
cd backend

# Build and validate
yarn validate:deployment

# Deploy to AWS
yarn sls:deploy --stage production
```

The deployment uses:
- **Entry Point**: `dist/lambda.handler`
- **Framework**: Serverless Framework 4.x
- **Runtime**: Node.js 20.x
- **Memory**: 512MB, 30s timeout

### Option 3: Automated Script Deployment

```bash
# From project root
./deploy.sh vercel prod    # For Vercel
./deploy.sh aws prod       # For AWS Lambda
```

## 🗄️ Database Setup

### Supported Databases

1. **Vercel Postgres** (Recommended for Vercel deployment)
2. **Supabase** (Free tier available)
3. **AWS RDS** (For AWS Lambda deployment)
4. **PlanetScale** (Serverless MySQL alternative)

### Database Configuration

The application automatically:
- Creates tables on first run (`synchronize: true`)
- Seeds sample data in production
- Handles connection pooling
- Supports SSL connections

### Sample Environment Configuration

```bash
# Supabase Example
DB_HOST=db.abc123def.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_DATABASE=postgres
DB_SSL=true

# AWS RDS Example  
DB_HOST=mydb.abc123.us-east-1.rds.amazonaws.com
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_DATABASE=bookstore
DB_SSL=true
```

## 🔍 Troubleshooting

### Common Issues

1. **"Database connection failed"**
   - Verify environment variables are set correctly
   - Check database host accessibility
   - Ensure SSL configuration matches database requirements

2. **"Module not found" errors**
   - Run `yarn validate:deployment` to check build
   - Ensure all dependencies are installed
   - Verify TypeScript compilation succeeded

3. **"Function timeout" (AWS Lambda)**
   - Increase timeout in `serverless.yml`
   - Check database connection latency
   - Optimize cold start performance

4. **CORS issues**
   - Verify frontend URL is allowed in CORS configuration
   - Check that all HTTP methods are enabled
   - Test with browser dev tools

### Debugging Commands

```bash
# Test local build
yarn build

# Validate deployment configuration
yarn validate:deployment

# Test serverless offline
yarn sls:offline

# View serverless logs (AWS)
npx serverless logs -f api --stage production

# Test Vercel function locally
vercel dev
```

## 🔐 Security Considerations

### Production Checklist

- [ ] Database uses SSL encryption
- [ ] Environment variables are secure
- [ ] CORS is configured for specific domains  
- [ ] Database credentials use least privilege
- [ ] API endpoints have proper validation
- [ ] Logging doesn't expose sensitive data

### Recommended Security Settings

```bash
# Additional environment variables
DB_SSL=true
CORS_ORIGIN=https://your-frontend-domain.com
LOG_LEVEL=error
```

## 📊 Monitoring & Maintenance

### Health Check Endpoint
The API includes a built-in health check:
```
GET /health
```

### Database Management
- Automatic table creation on deployment
- Sample data seeding in production
- Connection pooling handled automatically
- No manual migrations required (development mode)

### Performance Tips
- Database queries are optimized with TypeORM
- API responses include proper caching headers
- GZIP compression enabled by default
- Cold start optimization for serverless functions

## ✅ Deployment Verification

After deployment, verify these endpoints work:

```bash
# Health check
curl https://your-api-domain.com/

# Books API
curl https://your-api-domain.com/books

# Create book (POST)
curl -X POST https://your-api-domain.com/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Book","author":"Test Author","isbn":"123456789","price":9.99}'
```

## 🆘 Support

If you encounter issues:

1. Run `yarn validate:deployment` first
2. Check the deployment logs in your platform
3. Verify environment variables are set correctly
4. Test database connectivity separately
5. Review the troubleshooting section above

The backend deployment is now fully functional and production-ready! 🎉
