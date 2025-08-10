# 🚀 Serverless Deployment Guide

This guide covers multiple serverless deployment options for your BookStore MERN application.

## 📋 Prerequisites

- AWS CLI configured (for AWS Lambda)
- Vercel CLI installed (for Vercel deployment)
- Production database (PostgreSQL) - see database options below

## 🔧 Database Options for Production

### Option 1: AWS RDS PostgreSQL
```bash
# Create RDS PostgreSQL instance via AWS Console or CLI
aws rds create-db-instance \
    --db-instance-identifier bookstore-prod \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username admin \
    --master-user-password yourpassword \
    --allocated-storage 20 \
    --db-name bookstore
```

### Option 2: Supabase (Recommended for ease)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get connection details from Settings > Database

### Option 3: ElephantSQL
1. Go to [elephantsql.com](https://elephantsql.com)
2. Create a free PostgreSQL database
3. Get connection URL

---

## 🚀 Deployment Options

## Option 1: AWS Lambda with Serverless Framework

### Setup AWS Credentials
```bash
# Install AWS CLI and configure
aws configure
# Enter your AWS Access Key ID, Secret, Region (us-east-1), and output format (json)
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

## 🔗 Additional Resources

- [Serverless Framework Documentation](https://www.serverless.com/framework/docs/)
- [Vercel Documentation](https://vercel.com/docs)
- [NestJS Serverless Guide](https://docs.nestjs.com/faq/serverless)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)

## 💡 Quick Start Commands

### For AWS Lambda:
```bash
# Backend
cd backend && npm run sls:deploy

# Frontend  
cd frontend && REACT_APP_API_URL=your-lambda-url npm run build
```

### For Vercel:
```bash
# Backend
cd backend && vercel --prod

# Frontend
cd frontend && vercel --prod
```
