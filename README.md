# Book Store App

A **full-stack serverless book store application** built with **NestJS** (backend) and **React** (frontend), featuring **multiple serverless deployment strategies** and **cloud-native architecture**.

## 🏗️ **Serverless Architecture**

**Fully serverless, cloud-native implementation** with multiple deployment options:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React SPA     │    │  Vercel/AWS      │    │   Supabase      │
│  (Static Files) │────│  Serverless      │────│   Database      │
│                 │    │  Functions       │    │  (Serverless)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

**Key Features:**
- ✅ **Pay-per-execution** - Zero idle costs
- ✅ **Auto-scaling** - 0 to 1000+ concurrent requests
- ✅ **Global edge deployment** - <50ms worldwide
- ✅ **Multiple deployment options** - Vercel, AWS Lambda, or hybrid
- ✅ **Zero infrastructure management** - No servers to maintain

### **Technology Stack:**
- **Backend**: NestJS with serverless functions, TypeScript, Supabase integration
- **Frontend**: React SPA with TypeScript and modern UI components  
- **Database**: Supabase (serverless PostgreSQL) with real-time capabilities
- **Deployment**: Vercel monolithic (recommended) or AWS Lambda

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- Yarn package manager
- PostgreSQL database
- Vercel account

### **Local Development**

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo>
   cd book-store-app
   
   # Install root dependencies
   corepack yarn install
   
   # Install backend dependencies
   cd backend && corepack yarn install
   
   # Install frontend dependencies  
   cd ../frontend && corepack yarn install
   ```

2. **Set up database:**
   ```bash
   # Copy environment template
   cp backend/.env.example backend/.env
   
   # Update with your database credentials
   # Then run migrations and seed
   cd backend
   corepack yarn start:dev
   ```

3. **Start development servers:**
   ```bash
   # Terminal 1 - Backend (NestJS)
   cd backend
   corepack yarn start:dev
   
   # Terminal 2 - Frontend (React)
   cd frontend  
   corepack yarn start
   ```

4. **Access the app:**
   - Backend API: http://localhost:3001
   - Frontend: http://localhost:3000

## 🚀 **Serverless Deployment**

This project supports **multiple serverless deployment strategies**:

### **Option 1: Vercel Monolithic** (Recommended - Production)
```bash
# Single command deploys both frontend and backend
vercel --prod

# ✅ Production: https://book-store-xyz.vercel.app
# 🌐 Frontend: Static files from edge
# ⚡ Backend: Serverless functions at /api/*
```

### **Option 2: AWS Lambda + CloudFront**
```bash
# Deploy backend to AWS Lambda
cd backend && corepack yarn sls:deploy

# Deploy frontend separately
cd frontend && REACT_APP_API_URL=your-lambda-url corepack yarn build
```

### **Option 3: Hybrid Multi-Cloud**
```bash
# Backend on AWS Lambda
cd backend && corepack yarn sls:deploy

# Frontend on Vercel
cd frontend && vercel --prod
```

### **Serverless Benefits:**
- 💰 **Cost**: ~$0/month (free tiers)
- 🚀 **Performance**: <50ms global response times  
- 🔄 **Scaling**: 0 to 1000+ requests automatically
- 🛠️ **Maintenance**: Zero server management
- 🌍 **Global**: Edge locations worldwide

📜 **See [Serverless Deployment Guide](./docs/deployment/DEPLOYMENT_SERVERLESS.md) for comprehensive serverless guide.**

## 📝 **Project Structure**

```
book-store-app/
├── backend/                 # NestJS API (Serverless)
│   ├── src/
│   │   ├── books/          # Book CRUD operations
│   │   ├── config/         # Database & Supabase configuration
│   │   ├── dto/            # Data transfer objects
│   │   ├── lambda.ts       # AWS Lambda handler
│   │   └── main.vercel.ts  # Vercel serverless handler
│   ├── serverless.yml      # AWS Lambda configuration
│   └── package.json        # Dependencies & scripts
├── frontend/                # React SPA (Static)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   └── types/          # TypeScript definitions
│   └── package.json        # Dependencies & scripts
├── docs/                    # 📚 Documentation
│   ├── deployment/         # Deployment strategies
│   ├── guides/             # Setup & configuration
│   ├── troubleshooting/    # Problem-solving
│   ├── archive/           # Historical docs
│   ├── WARP.md            # Project configuration
│   └── README.md          # Documentation index
├── vercel.json              # Monolithic deployment config
└── README.md                # Main project documentation
```

## 🛠️ **Available Scripts**

### **Backend (`cd backend`)**
```bash
corepack yarn start:dev      # Start development server
corepack yarn build          # Build for production
corepack yarn test           # Run tests
corepack yarn seed           # Seed database
```

### **Frontend (`cd frontend`)**
```bash
corepack yarn start          # Start development server
corepack yarn build          # Build for production
corepack yarn test           # Run tests
```

## 🌍 **Environment Variables**

### **Backend**
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=bookstore
DB_SSL=false
NODE_ENV=development
```

### **Frontend**
```bash
REACT_APP_API_URL=http://localhost:3001
```

## 🧪 **Testing**

```bash
# Backend tests
cd backend
corepack yarn test

# Frontend tests  
cd frontend
corepack yarn test
```

## 📚 **API Endpoints**

- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `POST /books` - Create new book
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book
- `GET /books/search?q=query` - Search books

## 🔧 **Technologies Used**

- **Backend**: NestJS, TypeScript, TypeORM, PostgreSQL
- **Frontend**: React, TypeScript, CSS3
- **Deployment**: Vercel, Serverless Functions
- **Package Manager**: Yarn

## 📖 **Documentation**

📚 **[Complete Documentation](./docs/)** - Comprehensive guides and resources

### **Quick Links:**
- 🚀 **[Serverless Deployment Guide](./docs/deployment/DEPLOYMENT_SERVERLESS.md)** - Primary deployment strategy
- 📋 **[Database Seeding](./docs/guides/DATABASE_SEEDING.md)** - Sample data setup
- 🔧 **[AWS Setup Guide](./docs/guides/AWS_SETUP_GUIDE.md)** - Lambda deployment
- 🏗️ **[WARP Configuration](./docs/WARP.md)** - Development environment
- 🔧 **[Troubleshooting](./docs/troubleshooting/)** - Common issues and fixes

### **Documentation Structure:**
```
docs/
├── deployment/          # Deployment strategies and guides
├── guides/             # Setup and configuration guides  
├── troubleshooting/    # Problem-solving and fixes
├── archive/           # Historical and deprecated docs
├── WARP.md           # Project configuration
└── README.md         # Documentation index
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.
