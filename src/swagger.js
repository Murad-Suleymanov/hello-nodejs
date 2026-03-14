const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Hello Node.js API',
    version: '1.0.0',
    description: 'Node.js API with Swagger documentation',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Development' },
  ],
  paths: {
    '/api/hello': {
      get: {
        summary: 'Say hello',
        parameters: [
          {
            name: 'name',
            in: 'query',
            schema: { type: 'string', default: 'World' },
          },
        ],
        responses: {
          200: {
            description: 'Greeting message',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string' } },
                },
              },
            },
          },
        },
      },
    },
    '/api/items': {
      get: {
        summary: 'List items',
        responses: {
          200: {
            description: 'List of items',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          name: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create item',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: { name: { type: 'string' } },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Item created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request - name required',
          },
        },
      },
    },
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          200: {
            description: 'Service is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerSpec;
