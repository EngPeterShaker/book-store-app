// Load the compiled NestJS serverless handler
const handler = require('../apps/api/api/index.js');
module.exports = handler.default || handler;
