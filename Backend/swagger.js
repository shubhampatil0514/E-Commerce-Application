const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce',
      version: '1.0.0',
      description: 'API',
    },
  },
  apis: ['./routes/user.js','./routes/product.js','./routes/order.js ','./routes/admin.js']
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
