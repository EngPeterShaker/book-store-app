const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://tmytkcwtghcexpdbudki.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRteXRrY3d0Z2hjZXhwZGJ1ZGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3ODIyNDUsImV4cCI6MjA0ODM1ODI0NX0.1p8Lk0G3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3';

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

  for (const publisherName of PUBLISHERS_TO_ADD) {
    try {
      // Check if publisher exists
      const { data: existingPublisher } = await supabase
        .from('publishers')
        .select('id, name')
        .eq('name', publisherName)
        .single();

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

addPublishers();
