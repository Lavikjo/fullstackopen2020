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
  return blogs.length === 0 ? null :
    blogs.reduce((current, next) =>
      next.likes > current.likes ? next : current
    )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
