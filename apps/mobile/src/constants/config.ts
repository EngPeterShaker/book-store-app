// Environment configuration for the mobile app

const ENV = {
  dev: {
    apiUrl: 'http://localhost:3001',
  },
  staging: {
    apiUrl: 'https://book-store-q53k5qw8j-engpetershakers-projects.vercel.app/api',
  },
  prod: {
    apiUrl: 'https://book-store-q53k5qw8j-engpetershakers-projects.vercel.app/api',
  },
};

const getEnvVars = () => {
  // Default to dev environment
  // In production, this should be configured via app.config.js or environment variables
  const environment = process.env.NODE_ENV || 'dev';
  
  if (environment === 'production') {
    return ENV.prod;
  } else if (environment === 'staging') {
    return ENV.staging;
  } else {
    return ENV.dev;
  }
};

export default getEnvVars();
