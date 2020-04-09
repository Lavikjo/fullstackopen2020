// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((current, next) =>
      next.likes > current.likes ? next : current
    )
}

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? null
    : Object.entries(blogs
      .reduce((sum, item) => {
        const key = item.author
        const currentSum = sum[key] || 0
        sum[key] = currentSum + 1
        return sum
      }, {}))
      .map(([key, value]) => {
        return { author: key, blogs: value }
      })
      .reduce((current, next) =>
        next.blogs > next.blogs ? next : current)
}

const mostLikes = (blogs) => {
  return blogs.length === 0
    ? null
    : Object.entries(blogs
      .reduce((sum, item) => {
        const key = item.author
        const currentSum = sum[key] || 0
        sum[key] = currentSum + item.likes
        return sum
      }, {}))
      .map(([key, value]) => {
        return { author: key, likes: value }
      })
      .reduce((current, next) =>
        next.likes > next.likes ? next : current)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
