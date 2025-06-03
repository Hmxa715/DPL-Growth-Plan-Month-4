const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Book Management API",
    version: "1.0.0",
    description: "A simple REST API to manage books using node.js and SQLite"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server"
    }
  ],
   paths: {
    '/graphql': {
      post: {
        tags: ['GraphQL'],
        summary: 'GraphQL endpoint',
        description:
          'This is a single endpoint that accepts all GraphQL queries and serves the GraphiQL interface in the browser.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                    example: '{ books { title author } }',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful GraphQL query execution',
          },
        },
      },
    },
    // ... other REST endpoints
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"] // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
