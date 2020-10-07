const { ApolloServer, gql, UserInputError } = require("apollo-server")
const mongoose = require("mongoose")
const Book = require("./models/book")
const Author = require("./models/author")
const config = require("./utils/config")

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    author: Author!
    published: Int!
    title: String!
    genres: [String!]!
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.find({}).length,
    authorCount: async () => await Author.find({}).length,
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find({}).populate('author')
        console.log(books)
        return books
      }
      const author = await Author.find({name: args.author})
      return await Book.find({ genre: args.genre, author: author }).populate('author')
    },

    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      try {
        console.log(author)
        if (author === null) {
          const newAuthor = new Author({ name: args.author, born: null, bookCount: 0 })
          await newAuthor.save()
          const book = new Book({ ...args, author: newAuthor })
          await book.save()
        } else {
          author.bookCount += 1
          await author.save()
        }

        
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const book = new Book({ ...args, author: author })
      await book.save()
      
      return book.populate("author")
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

console.log("connecting to", config.MONGODB_URL)

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
