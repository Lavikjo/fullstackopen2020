const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        author: "timo",
        title: "kirjoitus",
        likes: 3,
        url: "http://kirjoitus.com",
      },
    ]

    expect(listHelper.totalLikes(blogs)).toBe(3)
  })

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        author: "timo",
        title: "kirjoitus",
        likes: 3,
        url: "http://kirjoitus.com",
        _id: "5a422aa71b54a676234d17f8",
        __v: 0
      },
      {
        author: "simo",
        title: "kiroitus",
        likes: 6,
        url: "http://kiroitus.com",
        _id: "5a422aa71b54a676234d17f2",
        __v: 0
      },
    ]

    expect(listHelper.totalLikes(blogs)).toBe(9)
  })
})


describe("favorite blog", () => {
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })

  test("when list has only one blog, function returns that", () => {
    const blogs = [
      {
        author: "timo",
        title: "kirjoitus",
        likes: 3,
        url: "http://kirjoitus.com",
      },
    ]

    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[0])
  })

  test("returns correct favourite", () => {
    const blogs = [
      {
        author: "timo",
        title: "kirjoitus",
        likes: 3,
        url: "http://kirjoitus.com",
        _id: "5a422aa71b54a676234d17f8",
        __v: 0
      },
      {
        author: "simo",
        title: "kiroitus",
        likes: 6,
        url: "http://kiroitus.com",
        _id: "5a422aa71b54a676234d17f2",
        __v: 0
      }
    ]

    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[1])
  })

  test("multiple favourites", () => {
    const blogs = [
      {
        author: "timo",
        title: "kirjoitus",
        likes: 3,
        url: "http://kirjoitus.com",
        _id: "5a422aa71b54a676234d17f8",
        __v: 0
      },
      {
        author: "simo",
        title: "kiroitus",
        likes: 6,
        url: "http://kiroitus.com",
        _id: "5a422aa71b54a676234d17f2",
        __v: 0
      },
      {
        author: "vino",
        title: "kiritus",
        likes: 6,
        url: "http://kiritus.com",
        _id: "5a422aa71b54a676234d17f5",
        __v: 0
      },
    ]

    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[1] || blogs[2])
  })
})
