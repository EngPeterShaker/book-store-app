# BookStore App - Project Context Document

## Project Overview
A full-stack MERN application for managing a book store inventory, built with modern technologies and optimized for serverless deployment. The application features a React TypeScript frontend with NestJS TypeScript backend, using PostgreSQL for data persistence.

## Framework & Runtime Architecture

### Frontend Framework
- **React 19.1.1** with TypeScript 4.9.5
- **React Router 7.8.0** for navigation
- **React Scripts 5.0.1** for build tooling
- **Node.js >= 18.0.0** requirement

### Backend Framework  
- **NestJS 11.0.1** with TypeScript 5.7.3
- **Express 5.1.0** as the underlying HTTP server
- **TypeORM 0.3.25** for database ORM
- **PostgreSQL 15** with pgAdmin for database management
- **Node.js >= 18.0.0** requirement

### Build & Module System
- **Backend**: ES2023 target, ESM modules with nodenext resolution
- **Frontend**: ES5 target, ESNext modules with DOM libraries
- **Package Manager**: Yarn 1.22.0+ required

## Testing Architecture

### Frontend Testing
- **Testing Library**: React Testing Library 16.3.0 + Jest DOM 6.6.4
- **Test Runner**: Jest (via React Scripts)
- **User Interaction**: @testing-library/user-event 13.5.0
- **Setup**: setupTests.ts configures jest-dom matchers
- **Coverage**: Available via `yarn test -- --coverage`

### Backend Testing
- **Framework**: Jest 30.0.0 with TypeScript support (ts-jest)
- **NestJS Testing**: @nestjs/testing 11.0.1 for dependency injection
- **Supertest**: HTTP testing for E2E tests
- **Test Organization**: `*.spec.ts` pattern, separate e2e config
- **Scripts**: `test`, `test:watch`, `test:cov`, `test:debug`, `test:e2e`

## CSS Architecture & Design System

### Styling Approach
- **Pure CSS** with CSS3 features (no preprocessors)
- **Component-scoped stylesheets** (component.css pattern)
- **CSS Reset**: Universal box-sizing, margin/padding reset
- **Typography**: System font stack (-apple-system, BlinkMacSystemFont, etc.)

### Design Tokens
- **Color Palette**:
  - Primary Gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
  - Success: `#28a745` / `#218838`
  - Danger: `#dc3545` / `#c82333`
  - Info: `#17a2b8` / `#138496`
  - Background: `#f8f9fa`
  - Text: `#333` primary, `#666` secondary, `#888` muted

- **Spacing System**: rem-based with consistent padding/margin patterns
- **Border Radius**: 5px standard, 8px for cards, 12px for components
- **Box Shadows**: Layered approach (2px/4px/8px/16px with rgba opacity)

### Responsive Strategy
- **Mobile-first approach** with max-width breakpoints
- **Primary breakpoint**: 768px for mobile/desktop split
- **Grid System**: CSS Grid with auto-fit/minmax patterns
- **Container**: 1200px max-width with 2rem horizontal padding

### Component Styling Patterns
- **Card Components**: White background, rounded corners, hover transforms
- **Form Elements**: Consistent padding (0.75rem), border styling, focus states
- **Buttons**: Gradient backgrounds, hover transformations, consistent sizing
- **Navigation**: Flex layouts with gap spacing

## Git Workflow & Version Control

### Repository Structure
- **Single repository** with frontend and backend in subdirectories
- **Main branch** only (no feature branches currently)
- **Remote**: Origin pointing to main repository

### Commit History Pattern
- **Conventional commits** with descriptive messages
- **Recent commits**:
  - `ccd1b3a`: fix vercel json
  - `68cbd2f`: extra steps  
  - `c8a4d28`: vercel deployments
  - `14cb75c`: books deployment
  - `a910b5a`: Initial commit

### Deployment Integration
- **Git-based deployment** via Vercel and AWS Lambda
- **Build triggers** on main branch pushes
- **Environment-specific** configurations

## Package Management & Dependencies

### Dependency Strategy
- **Yarn** as primary package manager
- **Exact version pinning** for major dependencies
- **Latest stable versions** for framework dependencies
- **Security-focused** dependency selection

### Key Dependencies
**Frontend**:
- `axios ^1.11.0` for HTTP client
- `react-router-dom ^7.8.0` for routing  
- `@testing-library/*` suite for testing

**Backend**:
- `@nestjs/*` suite for framework
- `typeorm ^0.3.25` for database ORM
- `class-validator ^0.14.2` for validation
- `pg ^8.16.3` for PostgreSQL driver

**Development**:
- `typescript` with strict configuration
- `eslint` with Prettier integration
- `jest` for testing across both applications

### Serverless Dependencies
- `@codegenie/serverless-express` for AWS Lambda
- `@vercel/node` for Vercel functions
- `serverless` framework for AWS deployments

## Utility Functions & Shared Patterns

### API Service Layer
- **Centralized HTTP client** (frontend/src/services/api.ts)
- **Axios interceptors** for request/response logging in development
- **Environment-based configuration** (REACT_APP_API_URL)
- **TypeScript interfaces** for request/response types
- **Error handling** with proper HTTP status management

### Data Transfer Objects
- **Backend DTOs** with class-validator decorators
- **Frontend interfaces** matching backend contracts
- **Create/Update patterns** with optional fields
- **Validation rules** enforced at API boundaries

### Database Patterns
- **Entity-first approach** with TypeORM decorators
- **Repository pattern** through NestJS services
- **Query builder** for complex searches
- **Validation decorators** on entity properties

### Common Utilities
- **Type definitions** shared between frontend/backend
- **Environment configuration** handling
- **Date formatting** and string manipulation
- **Error boundary** patterns for React components

## Integration & External Service Patterns

### Database Integration
- **PostgreSQL** as primary database
- **TypeORM** for object-relational mapping
- **Connection pooling** configuration
- **Migration support** (though auto-sync currently used)
- **Docker containerization** for local development

### API Integration Architecture
- **RESTful API design** following HTTP standards
- **CORS configuration** for cross-origin requests
- **Input validation** on all endpoints
- **Error response** standardization
- **Query parameter** support for filtering/searching

### Authentication Strategy
- **Currently unauthenticated** (placeholder for future implementation)
- **Session management** infrastructure ready
- **CORS headers** configured for security

### External Service Readiness
- **AWS Lambda** integration via serverless framework
- **Vercel** deployment with edge functions
- **Database hosting** ready for cloud providers
- **CDN integration** prepared for static assets

## Deployment Architecture & Strategies

### Local Development
- **Docker Compose** for PostgreSQL + pgAdmin
- **Hot reload** for both frontend and backend
- **Environment variables** via .env files
- **Port configuration**: Frontend :3000, Backend :3001, DB :5432

### Serverless Deployment Options

#### AWS Lambda Deployment
- **Serverless Framework 4.18.0** configuration
- **API Gateway** integration for HTTP endpoints
- **Environment variables** injection
- **IAM roles** and permissions management
- **Build optimization** with package exclusions

#### Vercel Deployment  
- **Full-stack deployment** with edge functions
- **Automatic builds** on git push
- **Environment variable** management
- **CDN integration** for static assets
- **Custom domains** support

### Build Pipeline
- **TypeScript compilation** for both apps
- **Production optimization** with minification
- **Static asset** generation and optimization
- **Environment-specific** configurations

### Deployment Scripts
- **Automated deployment** via `deploy.sh`
- **Platform selection** (AWS/Vercel)
- **Environment staging** (dev/prod)
- **URL configuration** and injection

## Current Work Priorities & Development Focus

### Completed Foundation
✅ **Full CRUD functionality** for book management
✅ **Responsive UI** with modern design patterns  
✅ **Type-safe** development with TypeScript
✅ **Database integration** with proper ORM
✅ **Search and filtering** capabilities
✅ **Serverless deployment** configurations
✅ **Docker development** environment

### Immediate Enhancement Opportunities
- **Authentication system** implementation
- **Input validation** strengthening on frontend
- **Error handling** improvements across stack  
- **Test coverage** expansion
- **Performance optimization** for database queries
- **Security headers** and rate limiting

### Architecture Evolution Path
- **Microservices** separation potential
- **Caching layer** with Redis integration
- **File upload** capabilities for book covers
- **Advanced search** with full-text indexing
- **Real-time updates** via WebSockets
- **API versioning** strategy implementation

---

## Domain-Specific Implementation Guidelines

When working with this codebase, follow these established patterns:

1. **Component Architecture**: Use functional components with hooks, maintain clear separation between presentation and business logic
2. **State Management**: Leverage React's built-in state, consider Context for global state
3. **API Design**: Follow RESTful conventions, use DTOs for validation, implement proper error responses
4. **Database Operations**: Use TypeORM repositories, implement proper query optimization
5. **Styling**: Follow existing CSS patterns, use consistent spacing and color tokens
6. **Testing**: Write tests alongside development, maintain good coverage for business logic
7. **Deployment**: Use provided scripts, follow environment-specific configuration patterns

This context document should be updated as architectural decisions evolve and new patterns are established.
