# Database Seeding Instructions

This guide explains how to populate your book store database with sample data.

## Prerequisites

1. Make sure PostgreSQL is running (via Docker or local installation)
2. The backend application should be able to connect to the database

## Backend Seeding

### 1. Install Dependencies
```bash
cd backend
yarn install
```

### 2. Run the Seed Script
```bash
yarn seed
```

## Frontend Seeding

### 1. Install Dependencies
```bash
cd frontend
yarn install
```

### 2. Run the Seed Script
```bash
yarn seed
```

## Production Seeding

For production environments, use the production seed script:

```bash
cd backend
yarn seed:prod
```

## Manual Seeding

If you prefer to seed manually or need to customize the data:

1. **Start the backend server:**
   ```bash
   cd backend
   yarn start:dev
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
