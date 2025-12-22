# Book Store Mobile App

React Native mobile application for the Book Store, built with Expo.

## Prerequisites

- Node.js 18+
- Yarn (via corepack)
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

## Installation

```bash
# From the mobile directory
cd apps/mobile

# Install dependencies (if not already installed from root)
corepack yarn install
```

## Development

### Start Development Server

```bash
# Start Expo development server
corepack yarn dev

# Or use specific platforms
corepack yarn ios      # Open in iOS Simulator
corepack yarn android  # Open in Android Emulator
corepack yarn web      # Open in web browser
```

### Environment Configuration

The app uses environment-based API configuration:

- **Development**: `http://localhost:3001` (local backend)
- **Staging**: Vercel staging URL
- **Production**: Vercel production URL

Configuration is in `src/constants/config.ts`.

## Project Structure

```
apps/mobile/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Loading.tsx
│   │   └── SearchBar.tsx
│   ├── screens/         # Screen components
│   │   ├── Home.tsx
│   │   ├── BooksList.tsx
│   │   ├── BookDetails.tsx
│   │   └── BookForm.tsx
│   ├── navigation/      # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── contexts/        # React Context providers
│   │   └── ApiContext.tsx
│   ├── constants/       # Constants and theme
│   │   ├── theme.ts
│   │   └── config.ts
│   ├── hooks/          # Custom React hooks
│   └── utils/          # Utility functions
├── assets/             # Images, fonts, etc.
├── App.tsx            # Root component
├── app.json           # Expo configuration
├── eas.json           # EAS Build configuration
└── package.json
```

## Features

### Implemented
- ✅ Book listing with search functionality
- ✅ Book details view
- ✅ Add new books
- ✅ Edit existing books
- ✅ Delete books
- ✅ Pull-to-refresh
- ✅ Loading states and error handling
- ✅ Form validation
- ✅ Navigation with React Navigation
- ✅ Themed UI matching web app colors
- ✅ API integration with shared packages
- ✅ **Internationalization (English & Arabic)**
- ✅ **RTL (Right-to-Left) layout support**
- ✅ **Language switcher component**
- ✅ **Persistent language preference**
- ✅ **Settings screen**

### TODO
- ⏳ Publishers management screens
- ⏳ User authentication
- ⏳ Offline support with local caching
- ⏳ Push notifications
- ⏳ Image upload for book covers
- ⏳ Dark mode support

## Shared Packages

The mobile app uses shared packages from the monorepo:

- `@book-store/shared-types` - TypeScript interfaces and types
- `@book-store/api-client` - API client with typed methods
- `@book-store/utils` - Common utility functions
- `@book-store/i18n` - Internationalization utilities

## Testing

```bash
# Run tests
corepack yarn test

# Run tests with coverage
corepack yarn test -- --coverage

# Run tests in watch mode
corepack yarn test -- --watch
```

## Building for Production

### Using EAS Build (Recommended)

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Configure EAS project (first time only)
eas build:configure

# Build for iOS
eas build --platform ios --profile production

# Build for Android
eas build --platform android --profile production

# Build for both platforms
eas build --platform all --profile production
```

### Local Builds

#### iOS

```bash
# Create iOS build
npx expo run:ios --configuration Release
```

#### Android

```bash
# Create Android APK
npx expo run:android --variant release
```

## Deployment

### App Store (iOS)

1. Build production version using EAS Build
2. Submit to App Store:
   ```bash
   eas submit --platform ios
   ```
3. Configure app metadata in App Store Connect
4. Submit for review

### Google Play (Android)

1. Build production AAB using EAS Build
2. Submit to Google Play:
   ```bash
   eas submit --platform android
   ```
3. Configure app metadata in Google Play Console
4. Submit for review

## Troubleshooting

### Metro bundler issues

```bash
# Clear Metro bundler cache
npx expo start -c
```

### Dependency issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules
corepack yarn install

# Check for Expo compatibility issues
npx expo install --check
```

### iOS Simulator issues

```bash
# Reset iOS Simulator
xcrun simctl erase all
```

### Android Emulator issues

```bash
# Clean Android build
cd android && ./gradlew clean
```

## Theme

The app uses a consistent theme matching the web application:

- **Primary Color**: #15616D (Teal)
- **Secondary Color**: #FF7D00 (Orange)
- **Accent Color**: #FFEAA7 (Light Yellow)

See `src/constants/theme.ts` for complete theme configuration.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test on both iOS and Android
4. Submit a pull request

## License

Proprietary - All rights reserved
