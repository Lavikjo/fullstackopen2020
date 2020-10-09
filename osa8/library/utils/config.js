require("dotenv").config()

const MONGODB_URL = process.env.MONGODB_URL
const JWT_SECRET = process.env.JWT_SECRET

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  MONGODB_URL = process.env.TEST_MONGODB_URL
}

module.exports = {
  MONGODB_URL,
  JWT_SECRET
}
