const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server")
const mongoose = require("mongoose")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")
const config = require("./utils/config")
const jwt = require("jsonwebtoken")

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.find({}).length,
    authorCount: async () => await Author.find({}).length,
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find({}).populate("author")
        return books
      }
      const author = await Author.find({ name: args.author })
      if (author.length !== 0) {
        return await Book.find({ genres: args.genre, author: author }).populate(
          "author"
        )
      } else {
        return await Book.find({ genres: args.genre }).populate("author")
      }
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
  },
  Author: {
    bookCount: (root, args) => {
      return Book.countDocuments({ author: root._id })
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("Not authenticated")

      const author = await Author.findOne({ name: args.author })
      try {
        if (author === null) {
          const newAuthor = new Author({ name: args.author, born: null })
          await newAuthor.save()
          const book = new Book({ ...args, author: newAuthor })
          await book.save()
          return book.populate("author")
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
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("Not authenticated")

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
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
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
