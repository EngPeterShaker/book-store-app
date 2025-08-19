#!/usr/bin/env node

/**
 * Backend Deployment Validation Script
 * Validates that all deployment configurations are correct
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Backend Deployment Configuration...\n');

let hasErrors = false;

function error(message) {
  console.error(`❌ ${message}`);
  hasErrors = true;
}

function success(message) {
  console.log(`✅ ${message}`);
}

function warning(message) {
  console.warn(`⚠️  ${message}`);
}

// Check if required files exist
const requiredFiles = [
  'dist/src/main.js',
  'dist/src/lambda.js', 
  'dist/api/[...].js',
  'package.json',
  'vercel.json',
  'serverless.yml'
];

console.log('📁 Checking required files...');
for (const file of requiredFiles) {
  if (fs.existsSync(path.join(__dirname, file))) {
    success(`Found ${file}`);
  } else {
    error(`Missing ${file}`);
  }
}

// Validate package.json
console.log('\n📦 Validating package.json...');
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));
  
  if (pkg.dependencies['@vercel/node']) {
    success('Vercel dependency found');
  } else {
    error('Missing @vercel/node dependency');
  }
  
  if (pkg.dependencies['@codegenie/serverless-express']) {
    success('Serverless Express dependency found');
  } else {
    error('Missing @codegenie/serverless-express dependency');
  }
} catch (e) {
  error('Could not read package.json');
}

// Validate vercel.json
console.log('\n⚡ Validating vercel.json...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json')));
  
  if (vercelConfig.builds && vercelConfig.builds[0].src === 'api/[...].ts') {
    success('Vercel build configuration is correct');
  } else {
    error('Vercel build configuration is incorrect');
  }
  
  if (vercelConfig.routes || vercelConfig.rewrites) {
    success('Vercel routing configuration found');
  } else {
    warning('No Vercel routing configuration found');
  }
} catch (e) {
  error('Could not read or parse vercel.json');
}

// Validate serverless.yml
console.log('\n☁️  Validating serverless.yml...');
try {
  const serverlessConfig = fs.readFileSync(path.join(__dirname, 'serverless.yml'), 'utf8');
  
  if (serverlessConfig.includes('handler: dist/lambda.handler')) {
    success('Serverless handler configuration is correct');
  } else {
    error('Serverless handler configuration is incorrect');
  }
  
  if (serverlessConfig.includes('nodejs20.x')) {
    success('Node.js runtime version is correct');
  } else {
    warning('Consider updating to nodejs20.x runtime');
  }
} catch (e) {
  error('Could not read serverless.yml');
}

// Check environment variables
console.log('\n🔧 Validating environment configuration...');
const envFiles = ['.env', '.env.production', '.env.serverless.example'];
for (const envFile of envFiles) {
  if (fs.existsSync(path.join(__dirname, envFile))) {
    success(`Found ${envFile}`);
  } else {
    warning(`Missing ${envFile} (may not be required)`);
  }
}

// Final result
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error('❌ Deployment validation FAILED');
  console.error('Please fix the errors above before deploying.');
  process.exit(1);
} else {
  console.log('✅ Deployment validation PASSED');
  console.log('Your backend is ready for deployment!');
}
