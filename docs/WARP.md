# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A full-stack book store application with:
- **Backend**: NestJS TypeScript API with PostgreSQL
- **Web Frontend**: React TypeScript SPA
- **Mobile App**: React Native with Expo
- **Shared Packages**: TypeScript types, API client, utilities, and i18n

Deployed as a **monorepo** using Turborepo. Web and API are deployed as a monolithic application on Vercel. Mobile app is deployed to iOS App Store and Google Play Store.

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
# Start web and API concurrently (from root)
npm run dev

# Or start separately:
# API (port 3001)
cd apps/api && corepack yarn start:dev

# Web (port 3000)
cd apps/web && corepack yarn start

# Mobile (Expo development server)
cd apps/mobile && corepack yarn dev
cd apps/mobile && corepack yarn ios      # iOS Simulator
cd apps/mobile && corepack yarn android  # Android Emulator
```

### Database Management
```bash
# Seed the database with sample data
cd apps/api && corepack yarn seed

# Production seeding
cd apps/api && corepack yarn seed:prod

# Access pgAdmin: http://localhost:5050
# Credentials: admin@bookstore.com / admin
```

### Testing
```bash
# API tests
cd apps/api && corepack yarn test
cd apps/api && corepack yarn test:watch
cd apps/api && corepack yarn test:cov
cd apps/api && corepack yarn test:e2e

# Web tests
cd apps/web && corepack yarn test
cd apps/web && corepack yarn test -- --coverage

# Mobile tests
cd apps/mobile && corepack yarn test
cd apps/mobile && corepack yarn test -- --coverage
```

### Build & Production
```bash
# Build API
cd apps/api && corepack yarn build

# Build web
cd apps/web && corepack yarn build

# Build web with production API URL
cd apps/web && REACT_APP_API_URL=/api yarn build

# Mobile production builds (via EAS)
cd apps/mobile && eas build --platform ios --profile production
cd apps/mobile && eas build --platform android --profile production
```

### Deployment
```bash
# Web + API: Deploy to Vercel
vercel --prod

# Current production URL: https://book-store-q53k5qw8j-engpetershakers-projects.vercel.app
# API available at: /api/books

# CI/CD: Automatic deployment on git push to main/master
# GitHub Actions workflow handles testing and deployment

# Mobile: Deploy to app stores (via EAS)
cd apps/mobile
eas build --platform ios --profile production
eas submit --platform ios

eas build --platform android --profile production
eas submit --platform android

# AWS Lambda deployment (alternative for API)
cd apps/api && corepack yarn sls:deploy
cd apps/api && corepack yarn sls:offline  # local testing
```

### Code Quality
```bash
# API linting and formatting
cd apps/api && corepack yarn lint
cd apps/api && corepack yarn format

# Web uses React Scripts built-in ESLint
# Mobile uses Expo's built-in linting
```

## Architecture Overview

### Monorepo Structure
- **Root**: Contains deployment scripts, Docker configuration, and workspace management
- **apps/api/**: NestJS API with TypeORM and PostgreSQL
- **apps/web/**: React SPA with TypeScript and CSS3
- **apps/mobile/**: React Native mobile app with Expo
- **packages/**: Shared packages (types, API client, utils, i18n)

### Key Architectural Decisions

**Framework Choices:**
- API: NestJS 11.x with Express 5.x, targeting Node.js 18+
- Web: React 19.x with React Router 7.x
- Mobile: React Native 0.81.x with Expo 54.x
- Database: PostgreSQL 15 with TypeORM 0.3.x
- Package Manager: Yarn with corepack
- Monorepo: Turborepo for build orchestration

**Deployment Strategy:**
- Web + API: Monolithic Vercel deployment (single project)
- API deployed as serverless functions at `/api/*` routes
- Web deployed as static files with SPA routing
- Mobile: iOS App Store and Google Play Store via EAS Build
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

### Mobile App Architecture

**Framework and Tools:**
- React Native 0.81.x with Expo 54.x
- React Navigation 7.x for routing
- TypeScript with strict mode
- StyleSheet for styling (no CSS preprocessors)

**Navigation:**
- Stack navigator for screen transitions
- Type-safe navigation with TypeScript
- Consistent header styling with app theme

**State Management:**
- React Context API for global state
- Custom hooks for data fetching
- API client from shared packages

**Styling:**
- Theme constants matching web app
- React Native StyleSheet API
- Responsive design with platform-specific code
- Primary color: #15616D (teal)

**Features:**
- Book management (list, details, add, edit, delete)
- Search functionality
- Pull-to-refresh
- Form validation
- Error handling and loading states
- Offline-ready architecture (in progress)

### Web Frontend Architecture

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
