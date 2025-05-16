const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema de Reservas',
      version: '1.0.0',
      description: 'API para sistema de reservas con autenticación, administración y manejo de citas',
    },
    servers: [
      {
        url: 'http://localhost:3000',  // Cambia al dominio o puerto de tu servidor
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '663f9b738e3f2301d2a098d3' },
            name: { type: 'string', example: 'Ana Pérez' },
            email: { type: 'string', example: 'ana@example.com' },
            role: { type: 'string', example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Appointment: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6644e4b58e1c9d001fe209ac' },
            user: { type: 'string', example: '663f9b738e3f2301d2a098d3' },
            datetime: { type: 'string', format: 'date-time', example: '2025-05-20T15:30:00Z' },
            status: { type: 'string', example: 'active' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Availability: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6644e4b58e1c9d001fe209ac' },
            dayOfWeek: { type: 'integer', example: 1 },
            startTime: { type: 'string', example: '09:00' },
            endTime: { type: 'string', example: '17:00' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    tags: [
      { name: 'Autenticación' },
      { name: 'Usuarios' },
      { name: 'Citas' },
      { name: 'Admin' }
    ]
  },
  apis: ['./routes/*.js'], // Aquí va la ruta a tus archivos donde están los comentarios swagger
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;