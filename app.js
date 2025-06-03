require('dotenv').config();
const express = require('express');
const app = express();

const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema'); // path to the schema

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const bookRoutes = require('./routes/bookRoutes');

app.use(express.json());

//Swagger routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
app.use('/api/books', bookRoutes);

app.get('/test', (req, res) => {
  res.send('Test route works');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // enables the GraphiQL UI
}));

//404 middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'route not Found' });
});
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`GraphQL at http://localhost:${PORT}/graphql`);
});