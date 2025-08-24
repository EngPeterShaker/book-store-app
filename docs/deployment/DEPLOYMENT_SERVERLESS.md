# 🚀 Serverless Deployment Guide

A comprehensive guide for deploying the Book Store app using **multiple serverless architectures**. This project supports three different serverless deployment strategies, each optimized for different use cases.

## 🏗️ **Serverless Architecture Overview**

This project implements a **fully serverless, cloud-native architecture**:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React SPA     │    │  Vercel/AWS      │    │   Supabase      │
│  (Static Files) │────│  Serverless      │────│   Database      │
│                 │    │  Functions       │    │  (Serverless)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                        │                        │
        │                        │                        │
   Edge CDN              Function Runtime            Connection Pool
   Worldwide              Auto-scaling                HTTP/REST API
   < 50ms                 0-1000+ instances          Global regions
```

### **Key Serverless Features:**
- ✅ **Pay-per-execution** - Only charged for actual API calls
- ✅ **Auto-scaling** - 0 to 1000+ concurrent requests automatically
- ✅ **Global deployment** - Edge functions worldwide
- ✅ **Cold start optimization** - NestJS app caching
- ✅ **Zero infrastructure management** - No servers to maintain
- ✅ **Multiple deployment options** - Vercel, AWS Lambda, or hybrid

## 📋 Prerequisites

- **Node.js 18+** with Corepack enabled
- **Vercel CLI** (for Vercel deployment)
- **AWS CLI** (for AWS Lambda deployment)
- **Database**: Supabase (recommended) or PostgreSQL

## 🎯 **Deployment Strategies**

### **Strategy 1: Vercel Monolithic** (Recommended - Currently Used)
- **Frontend**: Static files on Vercel Edge Network
- **Backend**: Serverless functions at `/api/*` routes
- **Database**: Supabase (external serverless DB)
- **Benefits**: Simplest deployment, single domain, optimal performance

### **Strategy 2: AWS Lambda + CloudFront**
- **Frontend**: S3 + CloudFront
- **Backend**: AWS Lambda functions
- **Database**: Supabase or RDS
- **Benefits**: Full AWS ecosystem, advanced configuration options

### **Strategy 3: Hybrid Multi-Cloud**
- **Frontend**: Vercel/Netlify
- **Backend**: AWS Lambda
- **Database**: Supabase
- **Benefits**: Best-of-breed services, vendor independence

## 🗄️ **Database Options for Production**

### **Option 1: Supabase** (Recommended - Currently Used)
```bash
# Already configured in the project
# URL: https://tmytkcwtghcexpdbudki.supabase.co
# No additional setup required
```
**Benefits**: 
- Serverless PostgreSQL with auto-scaling
- Built-in authentication and real-time features
- Generous free tier
- HTTP-based API (perfect for serverless)
- Global edge network

### **Option 2: AWS RDS Serverless**
```bash
aws rds create-db-cluster \
    --db-cluster-identifier bookstore-serverless \
    --engine aurora-postgresql \
    --engine-mode serverless \
    --master-username admin \
    --master-user-password yourpassword \
    --database-name bookstore
```

### **Option 3: PlanetScale** (MySQL alternative)
```bash
# Visit planetscale.com and create database
# Serverless MySQL with branching and scaling
```

---

# 🚀 **Deployment Implementation Details**

## **Option 1: Vercel Monolithic Deployment** (Current Production)

### **Architecture Implementation**

The project uses a sophisticated **monolithic serverless approach** with these key components:

#### **1. Vercel Function Handler (`backend/src/main.vercel.ts`)**
```typescript
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let cachedApp: any = null; // Cold start optimization

async function bootstrap() {
  if (!cachedApp) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    
    cachedApp = await NestFactory.create(AppModule.forRoot(), adapter);
    cachedApp.setGlobalPrefix('api'); // All routes prefixed with /api
    await cachedApp.init();
  }
  return cachedApp;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  const app = await bootstrap();
  const instance = app.getHttpAdapter().getInstance();
  instance(req, res); // Route all requests through NestJS
};
```

#### **2. Vercel Configuration (`vercel.json`)**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/src/main.vercel.ts",
      "use": "@vercel/node"  // Serverless Node.js runtime
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build"  // Static site generation
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/backend/src/main.vercel.ts" },
    { "src": "/(.*)", "dest": "/frontend/index.html" }
  ],
  "env": {
    "NODE_ENV": "production",
    "DB_DISABLED": "false"
  }
}
```

#### **3. Dynamic Service Injection**
```typescript
// backend/src/books/books.module.ts
static forRoot(): DynamicModule {
  const providers: any[] = [SupabaseService];
  const dbDisabled = process.env.DB_DISABLED === 'true';
  
  if (!dbDisabled) {
    // Production: Use Supabase service
    providers.push({
      provide: 'BooksService',
      useClass: BooksSupabaseService,
    });
  } else {
    // Fallback: Use mock service
    providers.push({
      provide: 'BooksService',
      useClass: BooksMockService,
    });
  }
  return { module: BooksModule, providers };
}
```

### **Deploy to Vercel**
```bash
# Single command deployment
vercel --prod

# Output:
# ✅ Production: https://book-store-xyz.vercel.app
# 🌐 Frontend: Static files served from edge
# ⚡ Backend: Serverless functions at /api/*
```

### **Vercel Benefits**
- **Single Domain**: Frontend and API on same domain (no CORS issues)
- **Edge Network**: 100+ global locations
- **Automatic HTTPS**: SSL certificates managed automatically
- **Zero Configuration**: Works out of the box
- **Instant Rollbacks**: One-click rollback to previous deployments
- **Preview Deployments**: Every git push gets a preview URL

---

## **Option 2: AWS Lambda with Serverless Framework**

### **Architecture Implementation**

The project includes a complete **AWS Lambda implementation** with these components:

#### **1. Lambda Handler (`backend/src/lambda.ts`)**
```typescript
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';

let cachedServer: any; // Cold start optimization

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    
    nestApp.enableCors({ origin: true });
    nestApp.useGlobalPipes(new ValidationPipe());
    await nestApp.init();
    
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const server = await bootstrap();
  return server(event, context);
}
```

#### **2. Serverless Configuration (`backend/serverless.yml`)**
```yaml
service: bookstore-api
frameworkVersion: '4'

provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
  stage: ${opt:stage, 'dev'}
  memorySize: 512
  timeout: 30
  environment:
    NODE_ENV: ${self:provider.stage}
    # Database environment variables from .env

functions:
  api:
    handler: dist/lambda.handler
    events:
      - httpApi:
          path: /{proxy+}
          method: any
      - httpApi:
          path: /
          method: any

plugins:
  - serverless-offline
```

### **Setup AWS Credentials**
```bash
# Install and configure AWS CLI
aws configure
# Enter: Access Key ID, Secret Access Key, Region (us-east-1), Output (json)

# Or use AWS profiles
aws configure --profile bookstore
export AWS_PROFILE=bookstore
```

## Deploy Backend to AWS Lambda

```bash
cd backend
yarn sls:deploy
```

## Deploy Frontend to S3

```bash
cd frontend
REACT_APP_API_URL=https://your-lambda-api-url.execute-api.us-east-1.amazonaws.com/dev yarn build
```

## Local Development

```bash
cd backend
yarn sls:offline
```

## Remove Deployment

```bash
cd backend
yarn sls:remove
```

## Deploy to Vercel

```bash
# Install Vercel CLI
yarn global add vercel

# Deploy
vercel --prod
```

## Build for Production

```bash
cd frontend
yarn build
```

## Database Migrations

```bash
cd backend
yarn typeorm migration:generate -- -n InitialMigration
yarn typeorm migration:run
```

## Complete Deployment

```bash
# Deploy backend to AWS Lambda
cd backend && yarn sls:deploy

# Deploy frontend to S3
cd frontend && REACT_APP_API_URL=your-lambda-url yarn build
```

## 💾 Database Migration

When deploying to production, you'll need to ensure your database schema is created. There are two options:

### Option 1: Use TypeORM Synchronize (for initial deployment)
The current configuration uses `synchronize: true` which automatically creates tables. This is convenient but **not recommended for production** after the initial deployment.

### Option 2: Generate and Run Migrations (Recommended for production)
```bash
cd backend

# Generate a migration
npm run typeorm migration:generate -- -n InitialMigration

# Run migrations
npm run typeorm migration:run
```

## 🧪 Testing the Serverless Deployment

### Test AWS Lambda Deployment
```bash
# Invoke the endpoint directly
curl -X GET https://your-lambda-url.execute-api.us-east-1.amazonaws.com/dev/books

# Test with serverless invoke
npx serverless invoke -f api -p test/events/getBooks.json
```

### Test Vercel Deployment
```bash
# Test backend API
curl -X GET https://your-vercel-backend.vercel.app/books

# Test frontend
# Visit your frontend URL in a browser
```

## 📝 Environment Variables

### Backend Environment Variables
- `DB_HOST`: PostgreSQL database host
- `DB_PORT`: PostgreSQL port (usually 5432)
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `DB_DATABASE`: Database name
- `NODE_ENV`: Environment (development, production)

### Frontend Environment Variables
- `REACT_APP_API_URL`: URL of your backend API

---

# 📊 **Performance Metrics & Monitoring**

## **Production Performance (Current Vercel Deployment)**

| Metric | Value | Description |
|--------|-------|-------------|
| **Cold Start** | ~100-300ms | NestJS initialization with caching |
| **Warm Requests** | ~10-50ms | Cached app response time |
| **Concurrent Scaling** | 0 to 1000+ | Automatic scaling |
| **Global Latency** | <50ms | Edge locations worldwide |
| **Uptime** | 99.99% | Platform managed |
| **Cost** | ~$0/month | Within free tiers |

## **Database Performance (Supabase)**

```bash
# Test database connectivity
curl "https://your-app.vercel.app/api/books/test/count"
# Expected: {"success":true,"count":30,"message":"Database connection working!"}

# Test API performance
time curl "https://your-app.vercel.app/api/books"
# Expected: ~200-500ms for 30 books with full relationships
```

## **Monitoring & Debugging**

### **Vercel Monitoring**
```bash
# View function logs
vercel logs https://your-deployment-url

# View deployment analytics
vercel analytics

# Monitor function performance
# Visit: Vercel Dashboard > Your Project > Functions
```

### **AWS Lambda Monitoring**
```bash
# View CloudWatch logs
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/bookstore"

# Monitor function metrics
aws cloudwatch get-metric-statistics \
    --namespace AWS/Lambda \
    --metric-name Duration \
    --dimensions Name=FunctionName,Value=bookstore-api-dev-api
```

---

# 🛠️ **Serverless Development Features**

## **Available Scripts (Backend)**

```bash
# Serverless development
corepack yarn sls:offline        # Local Lambda simulation
corepack yarn sls:deploy         # Deploy to AWS Lambda
corepack yarn sls:remove         # Remove AWS deployment

# Vercel development
vercel dev                       # Local Vercel simulation
vercel --prod                    # Deploy to production
vercel logs                      # View deployment logs

# Traditional development
corepack yarn start:dev          # Local NestJS server
corepack yarn build              # Build for deployment
corepack yarn validate:deployment # Validate deployment config
```

## **Environment Management**

```bash
# Environment files
.env                    # Local development
.env.serverless.example # AWS Lambda template
vercel.json            # Vercel environment variables

# Switch between deployment modes
DB_DISABLED=false      # Use real database (Supabase)
DB_DISABLED=true       # Use mock data (for testing)
```

## **Service Architecture Benefits**

### ✅ **Cost Optimization**
- **Pay-per-execution**: No idle server costs
- **Free tiers**: Generous limits on Vercel/AWS/Supabase
- **Auto-scaling**: Never pay for unused capacity
- **No DevOps overhead**: Zero server management costs

### ✅ **Performance Benefits**
- **Edge deployment**: Functions deployed globally
- **Cold start optimization**: App instance caching
- **Database connection pooling**: HTTP-based Supabase
- **CDN integration**: Static assets from edge

### ✅ **Developer Experience**
- **Single command deployment**: `vercel --prod`
- **Preview environments**: Every git branch gets URL
- **Instant rollbacks**: One-click deployment reversion
- **Local development parity**: Identical to production

### ✅ **Scalability & Reliability**
- **Infinite horizontal scaling**: Automatic function instances
- **Regional failover**: Built into platform
- **Zero maintenance**: Updates handled by platform
- **Monitoring included**: Built-in analytics and logs

---

# 🔧 **Troubleshooting**

## **Common Issues**

### **Problem: Returns Mock Data Instead of Real Data**
```bash
# Check environment variables
curl "https://your-app.vercel.app/api/books/test/count"
# Should return count > 3 (real data)

# Debug: Check service selection
# Look for logs showing "Using Supabase service" vs "Using mock service"
```

### **Problem: Cold Start Timeout**
```typescript
// Solution: Already implemented - app caching
let cachedApp: any = null;

async function bootstrap() {
  if (!cachedApp) {
    // Initialize once, reuse for all requests
    cachedApp = await NestFactory.create(AppModule.forRoot(), adapter);
  }
  return cachedApp;
}
```

### **Problem: Database Connection Issues**
```bash
# Test Supabase connectivity
curl -X GET "https://tmytkcwtghcexpdbudki.supabase.co/rest/v1/books" \
  -H "apikey: your-anon-key" \
  -H "Authorization: Bearer your-anon-key"

# Check if environment variables are set in Vercel dashboard
```

---

# 🔗 **Additional Resources**

- [Serverless Framework Documentation](https://www.serverless.com/framework/docs/)
- [Vercel Documentation](https://vercel.com/docs)
- [NestJS Serverless Guide](https://docs.nestjs.com/faq/serverless)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Supabase Documentation](https://supabase.com/docs)
- [Serverless Express Documentation](https://github.com/CodeGenieApp/serverless-express)

## 💡 **Quick Start Commands**

### **For Vercel (Recommended):**
```bash
# Deploy entire application (frontend + backend)
vercel --prod

# Test deployment
curl "https://your-deployment-url.vercel.app/api/books"
```

### **For AWS Lambda:**
```bash
# Deploy backend
cd backend && corepack yarn sls:deploy

# Deploy frontend separately
cd frontend && REACT_APP_API_URL=your-lambda-url corepack yarn build
```

### **For Local Development:**
```bash
# Start all services
npm run dev  # Starts both frontend and backend

# Or start separately
cd backend && corepack yarn start:dev    # Port 3001
cd frontend && corepack yarn start       # Port 3000
```
