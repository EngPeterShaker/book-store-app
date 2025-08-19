# Book Store App

A full-stack book store application built with **NestJS** (backend) and **React** (frontend), designed for deployment on **Vercel**.

## 🏗️ **Architecture**

- **Backend**: NestJS API with TypeScript, TypeORM, and PostgreSQL
- **Frontend**: React app with TypeScript and modern UI components
- **Database**: PostgreSQL with automatic seeding
- **Deployment**: Separate Vercel projects for backend and frontend

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

## 🚀 **Deployment**

This project uses **separate deployments** on Vercel:

- **Backend**: Deployed as serverless functions
- **Frontend**: Deployed as static files

### **Deploy Backend:**
```bash
./deploy-backend.sh
```

### **Deploy Frontend:**
```bash
./deploy-frontend.sh
```

📖 **See [SEPARATE_DEPLOYMENT.md](./SEPARATE_DEPLOYMENT.md) for detailed deployment instructions.**

## 📁 **Project Structure**

```
book-store-app/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── books/          # Book CRUD operations
│   │   ├── entities/        # TypeORM entities
│   │   ├── dto/            # Data transfer objects
│   │   └── config/         # Database configuration
│   ├── vercel.json         # Backend Vercel config
│   └── package.json
├── frontend/                # React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service
│   │   └── types/          # TypeScript types
│   ├── vercel.json         # Frontend Vercel config
│   └── package.json
├── deploy-backend.sh        # Backend deployment script
├── deploy-frontend.sh       # Frontend deployment script
└── README.md
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

- [Separate Deployment Guide](./SEPARATE_DEPLOYMENT.md)
- [Database Seeding](./DATABASE_SEEDING.md)
- [AWS Setup Guide](./AWS_SETUP_GUIDE.md)
- [Serverless Deployment](./DEPLOYMENT_SERVERLESS.md)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.
