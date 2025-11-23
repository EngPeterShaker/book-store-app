# Restructure book-store-app as Monorepo with React Native Mobile App
## Problem Statement
The current project is a monolithic MERN application with React web frontend and NestJS backend. We need to add a React Native mobile app alongside the existing web app while enabling code sharing for business logic, types, and API clients.
## Current State
* Root directory contains deployment scripts, Docker config, and package.json
* `frontend/` contains React 19.x web app with TypeScript
* `backend/` contains NestJS 11.x API with TypeORM and PostgreSQL
* Uses Yarn with corepack
* Deployed as monolithic Vercel application with CI/CD
* Web app uses React Router 7.x, Axios for API calls, pure CSS3 styling
## Proposed Changes
### 1. Install Turborepo and Configure Monorepo
* Install Turborepo at root level
* Create `turbo.json` configuration for build pipeline
* Update root `package.json` with workspace configuration
* Configure Yarn workspaces to manage dependencies across packages
### 2. Restructure Existing Code
* Move `frontend/` to `apps/web/`
* Move `backend/` to `apps/api/`
* Keep deployment scripts, Docker compose, and configs at root
* Update all internal path references and import statements
### 3. Create Shared Packages
Create `packages/` directory with shared code:
* `packages/shared-types/` - TypeScript interfaces and types (User, Book, Plan, Event, etc.)
* `packages/api-client/` - Axios-based API client with typed methods
* `packages/utils/` - Common utility functions (date formatting, validation helpers)
* `packages/i18n/` - Translation keys and language utilities (en/ar support)
### 4. Initialize React Native Mobile App
* Create `apps/mobile/` using React Native CLI or Expo
* Configure TypeScript with strict mode
* Set up React Navigation for routing
* Install dependencies: React Native, React Navigation, Axios
* Configure Metro bundler to resolve shared packages
### 5. Extract Shared Code from Web App
Refactor existing web app to use shared packages:
* Move TypeScript interfaces from `apps/web/src/types/` to `packages/shared-types/`
* Extract API service layer from web to `packages/api-client/`
* Move translation keys from `LanguageContext` to `packages/i18n/`
* Update web app imports to reference shared packages
### 6. Configure Mobile App with Shared Code
* Import shared types in mobile components
* Use `packages/api-client/` for all API calls
* Integrate `packages/i18n/` for bilingual support (en/ar with RTL)
* Create mobile-specific UI components (no Tailwind, use React Native StyleSheet)
### 7. Update Build and Development Scripts
* Update root `package.json` scripts to use Turbo commands
* Configure Turbo pipeline for parallel builds (web, mobile, api)
* Add workspace-level commands: `turbo dev`, `turbo build`, `turbo test`
* Update individual app scripts to work within monorepo
### 8. Update CI/CD Pipeline
* Modify `.github/workflows/` to handle monorepo structure
* Configure separate build/deploy steps for web and API
* Add mobile app build validation (no deployment yet)
* Ensure Turbo caching works in CI environment
### 9. Update Documentation
* Update `docs/WARP.md` with new monorepo structure
* Document workspace commands and development workflow
* Add mobile app setup instructions
* Update troubleshooting section for monorepo issues
### 10. Verify All Systems
* Test web app builds and runs correctly
* Test API starts and connects to database
* Test mobile app builds for iOS/Android
* Verify shared packages are properly imported
* Run all existing tests for web and API
* Confirm Vercel deployment still works for web/API
### 11. Deployment Roadmap
#### Phase 1: Development Environment
* Local PostgreSQL via Docker Compose (already configured)
* Local API server on port 3001 (apps/api)
* Local web dev server on port 3000 (apps/web)
* Mobile dev via Expo Go or React Native CLI (iOS Simulator/Android Emulator)
* All apps connect to local API and database
#### Phase 2: Staging/Production Database
* Option A: Supabase PostgreSQL (already integrated in backend code)
    * Create Supabase project
    * Configure connection string in environment variables
    * Run migrations/seeding against Supabase database
* Option B: Railway/Render PostgreSQL
    * Provision managed PostgreSQL instance
    * Update connection credentials
* Option C: Vercel Postgres (if staying with Vercel ecosystem)
    * Enable Vercel Postgres integration
    * Configure connection pooling
#### Phase 3: Backend (API) Deployment
* Current: Vercel Serverless Functions at `/api/*` routes
* Deployment process:
    * Push code to main branch triggers GitHub Actions
    * CI builds and tests backend
    * Vercel deploys as serverless functions
    * Environment variables configured in Vercel dashboard
* Alternative options (if Vercel limitations arise):
    * AWS Lambda via Serverless Framework (already configured in backend)
    * Railway/Render/Fly.io for traditional Node.js hosting
#### Phase 4: Frontend (Web) Deployment
* Current: Vercel static hosting with SPA routing
* Deployment process:
    * Build optimized production bundle with `REACT_APP_API_URL=/api`
    * Deploy static files to Vercel CDN
    * Configure SPA routing rules in vercel.json
    * Auto-deployed via GitHub Actions on push to main
* Production URL: [https://book-store-q53k5qw8j-engpetershakers-projects.vercel.app](https://book-store-q53k5qw8j-engpetershakers-projects.vercel.app)
#### Phase 5: Mobile App Deployment
* iOS Deployment:
    * Enroll in Apple Developer Program ($99/year)
    * Configure app signing and provisioning profiles
    * Build release version via Xcode or EAS Build
    * Submit to App Store Connect for review
    * TestFlight beta testing before production release
* Android Deployment:
    * Create Google Play Developer account ($25 one-time)
    * Generate signed APK/AAB with release keystore
    * Build via Android Studio or EAS Build
    * Upload to Google Play Console
    * Internal/closed testing track before production
* Expo Application Services (EAS) recommended for simplified builds:
    * `eas build --platform ios --profile production`
    * `eas build --platform android --profile production`
    * `eas submit` for automated store submissions
* Mobile app connects to production API URL (configured via environment)
#### Phase 6: CI/CD Pipeline Updates
* Update `.github/workflows/deploy.yml` for monorepo:
    * Add Turborepo caching
    * Separate jobs for web, api, mobile validation
    * Deploy web and api to Vercel on main branch push
    * Build and validate mobile apps (no auto-deployment to stores)
* Environment-specific deployments:
    * Main branch → production
    * Develop branch → staging environment
    * Pull requests → preview deployments
#### Phase 7: Monitoring and Maintenance
* Backend monitoring:
    * Vercel function logs and analytics
    * Database connection pooling and query performance
    * Error tracking (Sentry, LogRocket, or similar)
* Frontend monitoring:
    * Vercel Analytics for web performance
    * React error boundaries with error reporting
* Mobile monitoring:
    * Crashlytics for crash reporting
    * Analytics for user behavior (Firebase, Amplitude)
* Health checks and uptime monitoring (UptimeRobot, Pingdom)
#### Deployment Checklist Summary
1. Database: Provision and migrate Supabase/Railway PostgreSQL
2. API: Deploy to Vercel serverless (or alternative hosting)
3. Web: Deploy to Vercel static hosting with CDN
4. Mobile iOS: Build, sign, submit to App Store via TestFlight
5. Mobile Android: Build, sign, submit to Google Play Console
6. CI/CD: Update GitHub Actions for monorepo structure
7. Environment variables: Configure for each deployment target
8. Monitoring: Set up error tracking and analytics
9. Domain: Configure custom domain if needed (optional)
10. SSL: Ensure HTTPS for API and web (Vercel provides by default)
## Implementation Notes
* Use Turborepo for build orchestration (lightweight, fast)
* Maintain existing tech stack: React 19, NestJS 11, TypeScript, PostgreSQL
* Keep Yarn with corepack as package manager
* Mobile app styling will use React Native StyleSheet (not Tailwind)
* Shared packages should be framework-agnostic where possible
* API client should work identically in web and mobile
* Translation system must support RTL for Arabic on both platforms
* Vercel deployment strategy remains monolithic (web + API)
* Mobile app deployment will be separate (App Store, Google Play)
* File structure:
```warp-runnable-command
book-store-app/
├── apps/
│   ├── web/          # React web app (formerly frontend/)
│   ├── mobile/       # React Native mobile app (new)
│   └── api/          # NestJS backend (formerly backend/)
├── packages/
│   ├── shared-types/ # TypeScript types
│   ├── api-client/   # API service layer
│   ├── utils/        # Common utilities
│   └── i18n/         # Translations
├── package.json      # Root workspace config
├── turbo.json        # Turborepo config
├── docker-compose.yml
├── vercel.json
└── docs/
```
