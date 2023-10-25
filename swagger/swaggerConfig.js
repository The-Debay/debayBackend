// swaggerConfig.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // specify the OpenAPI version
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'Description of your API',
    },
  },
  apis: ['../routes/*.js'], // Specify the path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;