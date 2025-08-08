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

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for PostgreSQL)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd book-store-app
```

### 2. Start the Database

```bash
# Start PostgreSQL and pgAdmin using Docker Compose
docker-compose up -d

# Verify containers are running
docker-compose ps
```

**Database Access:**
- **PostgreSQL**: `localhost:5432`
  - Username: `postgres`
  - Password: `password`
  - Database: `bookstore`
- **pgAdmin**: http://localhost:5050
  - Email: `admin@bookstore.com`
  - Password: `admin`

### 3. Setup Backend (NestJS)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run start:dev
```

The backend API will be available at: http://localhost:3001

### 4. Setup Frontend (React)

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at: http://localhost:3000

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
npm run start:dev

# Production build
npm run build
npm run start:prod

# Run tests
npm run test
```

### Frontend Development

```bash
cd frontend

# Development mode
npm start

# Production build
npm run build

# Run tests
npm test
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
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

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
