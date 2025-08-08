# Database Seeding Instructions

This guide explains how to populate your book store database with sample data.

## Prerequisites

1. Make sure PostgreSQL is running (via Docker or local installation)
2. The backend application should be able to connect to the database

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Start the database:**
   ```bash
   docker-compose up -d postgres
   ```

2. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

3. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

4. **Run the seeding script:**
   ```bash
   npm run seed
   ```

### Option 2: Manual Setup

1. **Ensure PostgreSQL is running on:**
   - Host: localhost
   - Port: 5432
   - Database: bookstore
   - Username: postgres
   - Password: password

2. **Navigate to the backend directory and run:**
   ```bash
   cd backend
   npm install
   npm run seed
   ```

## What the Seeding Script Does

The seeding script will:

- ✅ Check if the database already contains books
- ✅ Add 15 sample books with diverse genres if the database is empty
- ✅ Skip seeding if books already exist (to prevent duplicates)
- ✅ Provide detailed output showing which books were added

## Sample Data Included

The script populates the database with 15 popular books including:

- **Classic Fiction**: The Great Gatsby, To Kill a Mockingbird, Pride and Prejudice
- **Fantasy**: Harry Potter, The Hobbit, Lord of the Rings
- **Science Fiction**: 1984, Dune, Brave New World
- **Thrillers**: Gone Girl, The Da Vinci Code, The Girl with the Dragon Tattoo
- **Non-Fiction**: Sapiens
- **And more...**

Each book includes:
- Title and Author
- Description
- ISBN (unique identifier)
- Price and Stock quantity
- Genre and Publication date
- Timestamps (created/updated)

## Verification

After running the seed script, you can verify the data by:

1. **Starting the backend server:**
   ```bash
   npm run start:dev
   ```

2. **Making a GET request to the books API:**
   ```bash
   curl http://localhost:3001/books
   ```

3. **Or using the frontend application** to browse the books

## Troubleshooting

### "Database connection failed"
- Ensure PostgreSQL is running
- Check the connection settings in `backend/.env`
- Verify database credentials

### "Books already exist"
- The script is designed to prevent duplicate data
- If you want to reset, manually clear the books table first

### "Permission denied"
- Make sure the PostgreSQL user has appropriate permissions
- Check that the database 'bookstore' exists

## Database Schema

The books table includes the following fields:
- `id` (Primary Key, Auto-increment)
- `title` (String, Required)
- `author` (String, Required)
- `description` (Text, Optional)
- `isbn` (String, Unique, Required)
- `price` (Decimal, Required)
- `stock` (Integer, Default: 0)
- `genre` (String, Optional)
- `publishedDate` (Date, Optional)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## Custom Seeding

To add your own sample data, modify the `sampleBooks` array in `backend/src/seed.ts`.

---

🎉 **Success!** Your book store database should now be populated with sample books and ready for testing!
