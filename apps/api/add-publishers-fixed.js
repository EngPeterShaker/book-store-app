require('dotenv').config({ path: '.env.supabase' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://tmytkcwtghcexpdbudki.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRteXRrY3d0Z2hjZXhwZGJ1ZGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Mjk5NzQsImV4cCI6MjA3MDQwNTk3NH0.ZvbEGx6Q01-uS27CTo8mnDkvNf2FtY3eLDbbzhw6M9M';

const supabase = createClient(supabaseUrl, supabaseKey);

// Publishers to add
const PUBLISHERS_TO_ADD = [
  'Hachette Book Group',
  'HarperCollins Publishers',
  'Macmillan Publishers',
  'Penguin Random House',
  'Oxford University Press',
  'Cambridge University Press',
  'Wiley',
  'Elsevier',
  'Pearson',
  'McGraw-Hill Education',
  'Houghton Mifflin Harcourt',
  'Cengage Learning',
  'Bloomsbury Publishing',
  'Farrar, Straus and Giroux',
  'Little, Brown and Company'
];

async function addPublishers() {
  console.log('Adding publishers...');
  console.log('Using Supabase URL:', supabaseUrl);

  for (const publisherName of PUBLISHERS_TO_ADD) {
    try {
      // Check if publisher exists
      const { data: existingPublisher, error: checkError } = await supabase
        .from('publishers')
        .select('id, name')
        .eq('name', publisherName)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error(`Error checking publisher ${publisherName}:`, checkError.message);
        continue;
      }

      if (!existingPublisher) {
        // Create publisher
        const { data: newPublisher, error: publisherError } = await supabase
          .from('publishers')
          .insert([{
            name: publisherName,
            is_active: true
          }])
          .select()
          .single();

        if (publisherError) {
          console.error(`Error creating publisher ${publisherName}:`, publisherError.message);
        } else {
          console.log(`✓ Created publisher: ${publisherName} (ID: ${newPublisher.id})`);
        }
      } else {
        console.log(`- Publisher ${publisherName} already exists (ID: ${existingPublisher.id})`);
      }
    } catch (error) {
      console.error(`Error processing publisher ${publisherName}:`, error.message);
    }
  }

  console.log('Finished adding publishers!');
}

// Test connection first
async function testConnection() {
  try {
    const { data, error } = await supabase.from('publishers').select('count').limit(1);
    if (error) {
      console.error('Connection test failed:', error.message);
      return false;
    }
    console.log('✓ Database connection successful');
    return true;
  } catch (error) {
    console.error('Connection test failed:', error.message);
    return false;
  }
}

async function main() {
  const connected = await testConnection();
  if (!connected) {
    console.error('Cannot proceed without database connection');
    return;
  }

  await addPublishers();
}

main();
