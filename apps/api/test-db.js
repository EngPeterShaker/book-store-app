const { createConnection } = require('typeorm');

async function testConnection() {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST || 'aws-0-us-west-1.pooler.supabase.com',
      port: parseInt(process.env.DB_PORT || '6543'),
      username: process.env.DB_USERNAME || 'postgres.tmytkcwtghcexpdbudki',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE || 'postgres',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      logging: false,
    });

    const result = await connection.query('SELECT COUNT(*) as count FROM books');
    console.log('Database connection successful!');
    console.log('Total books in database:', result[0].count);
    
    const sampleBooks = await connection.query('SELECT id, title FROM books LIMIT 5');
    console.log('Sample books:', sampleBooks);
    
    await connection.close();
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
}

testConnection();
