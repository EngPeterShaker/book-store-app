# 📚 BookStore App

A full-stack MERN application for managing a book store inventory, built with React (TypeScript) frontend and NestJS backend, using PostgreSQL as the database.

## 🚀 Features

- **Book Management**: Create, read, update, and delete books
- **Search & Filter**: Search books by title/author and filter by genre
- **Modern UI**: Responsive design with a clean, professional interface
- **Type Safety**: Full TypeScript support on both frontend and backend
- **Database**: PostgreSQL with TypeORM for robust data management
- **API**: RESTful API with input validation and error handling

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript
- **React Router** for navigation
- **Axios** for API communication
- **CSS3** with modern styling

### Backend
- **NestJS** with TypeScript
- **TypeORM** for database operations
- **PostgreSQL** database
- **Class Validator** for input validation
- **CORS** enabled for cross-origin requests

### Database
- **PostgreSQL 15**
- **pgAdmin** for database administration

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Yarn package manager
- PostgreSQL database

### Installation

1. **Install dependencies:**
   ```bash
   # Install root dependencies
   yarn install
   
   # Install backend dependencies
   cd backend
   yarn install
   
   # Install frontend dependencies
   cd ../frontend
   yarn install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy environment template
   cp env.example .env
   
   # Edit .env with your database credentials
   ```

3. **Start development servers:**
   ```bash
   # Backend (from backend directory)
   yarn start:dev
   
   # Frontend (from frontend directory)
   yarn start
   ```

## 📁 Project Structure

```
book-store-app/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── books/          # Books module
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entities/       # Database entities
│   │   ├── app.module.ts   # Main app module
│   │   └── main.ts         # Application entry point
│   ├── .env                # Environment variables
│   └── package.json
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript interfaces
│   │   ├── App.tsx         # Main app component
│   │   └── index.tsx       # Application entry point
│   └── package.json
├── docker-compose.yml      # PostgreSQL setup
└── README.md
```

## 🔗 API Endpoints

### Books API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Get all books |
| GET | `/books?search=query` | Search books by title/author |
| GET | `/books?genre=genre` | Filter books by genre |
| GET | `/books/:id` | Get book by ID |
| POST | `/books` | Create new book |
| PATCH | `/books/:id` | Update book |
| DELETE | `/books/:id` | Delete book |

### Example Book Object

```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic American novel...",
  "isbn": "978-0-7432-7356-5",
  "price": 12.99,
  "stock": 25,
  "genre": "Fiction",
  "publishedDate": "1925-04-10",
  "createdAt": "2024-08-08T10:30:00Z",
  "updatedAt": "2024-08-08T10:30:00Z"
}
```

## 🎨 Features Overview

### Book List
- Grid layout with book cards
- Search functionality
- Genre filtering
- Responsive design

### Book Details
- Full book information display
- Stock status indication
- Action buttons (Edit/Delete)

### Add/Edit Book
- Form validation
- All book fields supported
- User-friendly interface

### Search & Filter
- Real-time search by title/author
- Genre-based filtering
- Clear search functionality

## 🔧 Development

### Backend Development

```bash
cd backend

# Development mode
yarn start:dev

# Production build
yarn build
yarn start:prod

# Run tests
yarn test
```

### Frontend Development

```bash
cd frontend

# Development mode
yarn start

# Production build
yarn build

# Run tests
yarn test
```

## 🚀 Deployment

### Environment Variables

Update the backend `.env` file for production:

```env
# Database Configuration
DB_HOST=your-production-db-host
DB_PORT=5432
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_DATABASE=bookstore

# Application Configuration
PORT=3001
NODE_ENV=production
```

### Build for Production

```bash
# Backend
cd backend
yarn build

# Frontend
cd frontend
yarn build
```

## 📋 Available Scripts

### Backend (NestJS)
- **Development**: `yarn start:dev` - Start with hot reload
- **Production**: `yarn start:prod` - Start production server
- **Build**: `yarn build` - Build for production
- **Testing**: `yarn test` - Run unit tests

### Frontend (React)
- **Development**: `yarn start` - Start development server
- **Production**: `yarn build` - Build for production
- **Testing**: `yarn test` - Run tests

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL container is running: `docker-compose ps`
   - Check connection details in `.env` file

2. **Port Already in Use**
   - Frontend (3000): `lsof -ti:3000 | xargs kill -9`
   - Backend (3001): `lsof -ti:3001 | xargs kill -9`
   - PostgreSQL (5432): Stop other PostgreSQL instances

3. **CORS Issues**
   - Ensure backend CORS is configured for frontend URL
   - Check frontend API base URL in `services/api.ts`

### Reset Database

```bash
# Stop containers
docker-compose down

# Remove volumes (⚠️ This will delete all data)
docker-compose down -v

# Start fresh
docker-compose up -d
```

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Coding! 🚀**
