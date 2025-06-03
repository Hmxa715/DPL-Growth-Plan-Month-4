const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');

const { getAllBooks, getBookByIsbn } = require('../models/db');

// Define the Book type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    publicationYear: { type: GraphQLInt },
    isbn: { type: GraphQLString }
  })
});

// Define the Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve: async () => {
        try {
          return await getAllBooks();
        } catch (err) {
          throw new Error('Error fetching books: ' + err.message);
        }
      }
    },
    book: {
      type: BookType,
      args: {
        isbn: { type: GraphQLString }
      },
      resolve: async (_, args) => {
        try {
          const book = await getBookByIsbn(args.isbn);
          if (!book) {
            throw new Error('Book not found');
          }
          return book;
        } catch (err) {
          throw new Error('Error fetching book: ' + err.message);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
