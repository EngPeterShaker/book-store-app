# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A full-stack MERN book store application with NestJS TypeScript backend and React TypeScript frontend, deployed as a **single monolithic application** on Vercel with CI/CD automation.

## Development Commands

### Setup & Installation
```bash
# Install all dependencies (root, backend, frontend)
corepack yarn install
cd backend && corepack yarn install
cd ../frontend && corepack yarn install

# Start PostgreSQL database
docker-compose up -d

# Copy environment template (if needed)
cp backend/.env.example backend/.env
```

### Development Servers
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start separately:
# Backend (port 3001)
cd backend && corepack yarn start:dev

# Frontend (port 3000) 
cd frontend && corepack yarn start
```

### Database Management
```bash
# Seed the database with sample data
cd backend && corepack yarn seed

# Production seeding
cd backend && corepack yarn seed:prod

# Access pgAdmin: http://localhost:5050
# Credentials: admin@bookstore.com / admin
```

### Testing
```bash
# Backend tests
cd backend && corepack yarn test
cd backend && corepack yarn test:watch
cd backend && corepack yarn test:cov
cd backend && corepack yarn test:e2e

# Frontend tests
cd frontend && corepack yarn test
cd frontend && corepack yarn test -- --coverage
```

### Build & Production
```bash
# Build backend
cd backend && corepack yarn build

# Build frontend
cd frontend && corepack yarn build

# Build frontend with production API URL
cd frontend && REACT_APP_API_URL=/api yarn build
```

### Deployment
```bash
# Deploy entire application as one project
vercel --prod

# Current production URL: https://book-store-q53k5qw8j-engpetershakers-projects.vercel.app
# API available at: /api/books

# CI/CD: Automatic deployment on git push to main/master
# GitHub Actions workflow handles testing and deployment

# Manual deployment with custom API URL
REACT_APP_API_URL=/api vercel --prod

# AWS Lambda deployment (alternative)
cd backend && corepack yarn sls:deploy
cd backend && corepack yarn sls:offline  # local testing
```

### Code Quality
```bash
# Backend linting and formatting
cd backend && corepack yarn lint
cd backend && corepack yarn format

# Frontend uses React Scripts built-in ESLint
```

## Architecture Overview

### Monorepo Structure
- **Root**: Contains deployment scripts and Docker configuration
- **backend/**: NestJS API with TypeORM and PostgreSQL
- **frontend/**: React SPA with TypeScript and CSS3

### Key Architectural Decisions

**Framework Choices:**
- Backend: NestJS 11.x with Express 5.x, targeting Node.js 18+
- Frontend: React 19.x with React Router 7.x
- Database: PostgreSQL 15 with TypeORM 0.3.x
- Package Manager: Yarn with corepack

**Deployment Strategy:**
- Monolithic Vercel deployment (single project)
- Backend deployed as serverless functions at `/api/*` routes
- Frontend deployed as static files with SPA routing
- CI/CD automation via GitHub Actions
- Alternative AWS Lambda deployment via Serverless Framework

**Database Patterns:**
- Entity-first approach with TypeORM decorators
- Repository pattern through NestJS dependency injection
- Auto-synchronization enabled (development only)
- Seeding scripts for sample data

**API Design:**
- RESTful endpoints following HTTP standards
- DTO validation with class-validator
- CORS configured for cross-origin requests
- Centralized error handling and logging

### Frontend Architecture

**Component Organization:**
- Functional components with React hooks
- Component-scoped CSS files (component.css pattern)
- TypeScript interfaces for type safety
- Centralized API service layer with Axios

**State Management:**
- React built-in state management
- Context API prepared for global state
- Type-safe API integration with custom hooks

**Styling System:**
- Pure CSS3 (no preprocessors)
- Design tokens for colors, spacing, typography
- Responsive design with mobile-first approach
- Primary breakpoint at 768px

### Backend Architecture

**Service Layer:**
- Domain-driven service organization
- Dependency injection via NestJS decorators
- Validation pipes for request processing
- Exception filters for error handling

**Data Layer:**
- TypeORM entities with validation decorators
- Repository pattern for data access
- Query builder for complex operations
- Connection pooling for performance

## Environment Configuration

### Backend Environment Variables
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=bookstore
DB_SSL=false
NODE_ENV=development
```

### Frontend Environment Variables
```bash
REACT_APP_API_URL=http://localhost:3001
```

## Testing Patterns

### Backend Testing
- Jest with TypeScript support (ts-jest)
- NestJS testing utilities for dependency injection
- Supertest for HTTP endpoint testing
- Coverage reports via `test:cov` command

### Frontend Testing
- React Testing Library with Jest DOM
- User event simulation for interaction testing
- Component testing with proper mocking patterns
- Coverage available via React Scripts

## Common Development Tasks

### Adding New API Endpoints
1. Create/update entity in `backend/src/entities/`
2. Add DTO classes in `backend/src/dto/`
3. Implement service logic in appropriate service class
4. Add controller methods with validation decorators
5. Update frontend service layer and TypeScript types

### Database Schema Changes
1. Modify TypeORM entities with proper decorators
2. Run application to auto-sync schema (development)
3. For production, consider migration files
4. Update seeding scripts if needed

### Frontend Component Development
1. Create component in appropriate `frontend/src/components/` subdirectory
2. Add component-specific CSS file
3. Use existing design tokens and spacing patterns
4. Implement TypeScript interfaces for props
5. Add unit tests following React Testing Library patterns

## Troubleshooting

### Database Connection Issues
```bash
# Restart PostgreSQL container
docker-compose restart postgres

# Check container status
docker-compose ps

# View database logs
docker-compose logs postgres
```

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install:all

# Clear TypeScript cache
cd backend && npx tsc --build --clean
cd frontend && rm -rf build/
```

### Deployment Issues
```bash
# Validate deployment configuration
cd backend && corepack yarn validate:deployment

# Check Vercel deployment logs
vercel logs [deployment-url]
```

## CI/CD Pipeline

### GitHub Actions Workflow
The project includes an automated CI/CD pipeline that:

1. **Runs on every push** to `main` or `master` branch
2. **Tests both frontend and backend** with full coverage
3. **Builds the application** with production settings
4. **Deploys to Vercel** automatically if tests pass

### Setting up CI/CD

1. **Add Vercel Token to GitHub Secrets:**
   - Go to Vercel → Settings → Tokens
   - Generate a new token
   - Add to GitHub repository secrets as `VERCEL_TOKEN`

2. **Configure Vercel Project:**
   ```bash
   # Link project to Vercel (run once)
   vercel link
   ```

3. **Workflow automatically triggers on:**
   - Push to main/master branch
   - Pull requests to main/master

### Manual Deployment
If you need to deploy manually:
```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

### Monitoring Deployments
- **GitHub Actions**: Check the "Actions" tab in your repository
- **Vercel Dashboard**: Monitor deployments at vercel.com
- **Logs**: Use `vercel logs` to view function logs
