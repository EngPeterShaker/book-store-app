# Book Store App - Monorepo Setup Complete

## ✅ What's Been Done

### 1. Monorepo Structure
```
book-store-app/
├── apps/
│   ├── web/          # React web app (formerly frontend/)
│   ├── mobile/       # React Native mobile app (NEW!)
│   └── api/          # NestJS backend (formerly backend/)
├── packages/
│   ├── shared-types/ # TypeScript interfaces (Book, User, Plan, Event, etc.)
│   ├── api-client/   # Axios-based API client with typed methods
│   ├── utils/        # Common utilities (date formatting, validation, etc.)
│   └── i18n/         # Translations (en/ar support with RTL)
├── package.json      # Root workspace config
├── turbo.json        # Turborepo config
└── vercel.json       # Updated for monorepo
```

### 2. Shared Packages Created
- **@book-store/shared-types**: TypeScript types for all entities
- **@book-store/api-client**: Unified API client for web and mobile
- **@book-store/utils**: Date formatting, validation, currency formatting
- **@book-store/i18n**: Bilingual translations (English/Arabic with RTL support)

### 3. Mobile App Initialized
- React Native with Expo
- TypeScript configured
- Metro bundler configured for monorepo
- Imports all shared packages
- Demo app fetches books from API with language toggle

### 4. Configuration Updates
- Turborepo installed and configured
- Yarn workspaces enabled
- Vercel deployment config updated for `apps/web` and `apps/api`
- All apps use consistent naming: `@book-store/*`

## 🚀 Quick Start

### Install Dependencies
```bash
corepack yarn install
```

### Development
```bash
# Start all apps (web, mobile, api)
npm run dev

# Start individual apps
cd apps/api && corepack yarn dev      # Backend on :3001
cd apps/web && npm run dev            # Web on :3000
cd apps/mobile && npm run dev         # Mobile via Expo
```

### Build
```bash
# Build all apps
npm run build

# Build individual apps
npx turbo build --filter=@book-store/api
npx turbo build --filter=@book-store/web
```

### Mobile Development
```bash
cd apps/mobile

# Start Expo
npm run dev

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 📦 Shared Package Usage

### In Web App (apps/web)
```typescript
import { Book, User } from '@book-store/shared-types';
import { createApiClient } from '@book-store/api-client';
import { formatCurrency } from '@book-store/utils';
import { translations } from '@book-store/i18n';

const apiClient = createApiClient(process.env.REACT_APP_API_URL!);
const books = await apiClient.getBooks();
```

### In Mobile App (apps/mobile)
```typescript
import { Book } from '@book-store/shared-types';
import { createApiClient } from '@book-store/api-client';
import { formatDate } from '@book-store/utils';
import { translations, isRTL } from '@book-store/i18n';

const apiClient = createApiClient(process.env.EXPO_PUBLIC_API_URL!);
const books = await apiClient.getBooks();
```

## 🎯 Next Steps

### 1. Extract Existing Code to Shared Packages
Currently web app has its own types and API calls. Move them to shared packages:
- Move `apps/web/src/types/*` → `packages/shared-types/`
- Move `apps/web/src/services/*` → use `packages/api-client/`
- Move translation keys → `packages/i18n/`

### 2. Build Mobile Features
- Implement authentication
- Add book listing and details screens
- Implement user management screens
- Add plans/events management

### 3. Testing
```bash
npm run test           # Run all tests
cd apps/api && corepack yarn test:e2e  # API tests
cd apps/web && npm test                 # Web tests
```

### 4. Deployment

#### Web & API (Vercel)
```bash
vercel --prod  # Deploys both web and API
```
- Web: Static hosting + CDN
- API: Serverless functions at /api/*

#### Mobile (iOS)
1. Enroll in Apple Developer Program ($99/year)
2. Configure signing
3. Build: `eas build --platform ios --profile production`
4. Submit: `eas submit --platform ios`

#### Mobile (Android)
1. Create Google Play account ($25 one-time)
2. Generate keystore
3. Build: `eas build --platform android --profile production`
4. Submit to Google Play Console

## ✅ Verified Working
- ✅ API builds successfully (`apps/api`)
- ✅ Web builds successfully (`apps/web`)
- ✅ Mobile app created with shared packages (`apps/mobile`)
- ✅ Turborepo configured
- ✅ Vercel deployment config updated
- ✅ Yarn workspaces linking packages

## 🔧 Troubleshooting

### Metro bundler issues (mobile)
```bash
cd apps/mobile
rm -rf node_modules .expo
cd ../..
corepack yarn install
cd apps/mobile
npm start -- --clear
```

### TypeScript issues with shared packages
Shared packages use `"main": "./src/index.ts"` for direct TS imports in monorepo.
This avoids build step during development.

### Vercel deployment
Ensure `REACT_APP_API_URL=/api` is set during web build for production.

## 📝 Important Notes
- Database still uses Docker Compose locally (PostgreSQL)
- Production database should be Supabase/Railway/Vercel Postgres
- Mobile app connects to same API as web app
- All apps share types, API client, utils, and translations
- Mobile app uses React Native StyleSheet (not Tailwind)
